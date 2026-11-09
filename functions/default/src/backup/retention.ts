import { Storage } from '@google-cloud/storage'
import { DateTime } from 'luxon'
import { createModuleLogger } from '../utils/logger.js'
import {
  BACKUP_TIMEZONE,
  FIRESTORE_EXPORT_METADATA_SUFFIX,
  FIRESTORE_RETENTION,
  STORAGE_BACKUP_INPROGRESS_DIR,
  STORAGE_BACKUP_SUCCESS_MARKER,
  STORAGE_RETENTION,
  formatBackupDateLabel,
  getFirestoreBackupBucketName,
  getProjectId,
  getStorageBackupBucketName,
  isRetentionDryRun,
  type BackupTier,
} from './constants.js'

const logger = createModuleLogger('backup')

const TIER_PREFIXES: BackupTier[] = ['daily', 'weekly', 'monthly']

const LEGACY_EXPORT_FOLDER_PATTERN = /^\d{4}-\d{2}-\d{2}T/

export type RetentionEntry = {
  prefix: string
  sortKey: string
}

export const parseFirestoreExportFolderSortKey = (exportPrefix: string): string | null => {
  const folderName = exportPrefix.replace(/\/$/, '').split('/').pop()
  if (folderName == null || !LEGACY_EXPORT_FOLDER_PATTERN.test(folderName)) {
    return null
  }
  return folderName.slice(0, 10)
}

export const parseStorageBackupFolderSortKey = (tier: BackupTier, prefix: string): string | null => {
  const folderName = prefix.replace(/\/$/, '').split('/').pop()
  if (folderName == null) {
    return null
  }
  if (tier === 'monthly') {
    return /^\d{4}-\d{2}$/.test(folderName) ? folderName : null
  }
  return /^\d{4}-\d{2}-\d{2}$/.test(folderName) ? folderName : null
}

export const selectPrefixesToDelete = (entries: RetentionEntry[], keepCount: number): string[] => {
  if (entries.length <= keepCount) {
    return []
  }
  const sorted = [...entries].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
  return sorted.slice(0, sorted.length - keepCount).map((entry) => entry.prefix)
}

/** 仕様の「N 日分」保持: 同一日の複数 export は最新 1 件のみ代表として本数カウントし、古い同日分も削除対象に含める */
export const selectFirestoreExportPrefixesToDelete = (entries: RetentionEntry[], keepCount: number): string[] => {
  const bySortKey = new Map<string, RetentionEntry[]>()
  for (const entry of entries) {
    const group = bySortKey.get(entry.sortKey) ?? []
    group.push(entry)
    bySortKey.set(entry.sortKey, group)
  }

  const representativeEntries: RetentionEntry[] = []
  const staleSamePeriodPrefixes: string[] = []

  for (const group of bySortKey.values()) {
    const sorted = [...group].sort((a, b) => a.prefix.localeCompare(b.prefix))
    representativeEntries.push(sorted[sorted.length - 1])
    staleSamePeriodPrefixes.push(...sorted.slice(0, -1).map((entry) => entry.prefix))
  }

  const deletedRepresentatives = selectPrefixesToDelete(representativeEntries, keepCount)
  const deletedSortKeys = new Set(
    representativeEntries
      .filter((entry) => deletedRepresentatives.includes(entry.prefix))
      .map((entry) => entry.sortKey),
  )

  const toDelete = new Set<string>(staleSamePeriodPrefixes)
  for (const sortKey of deletedSortKeys) {
    for (const entry of bySortKey.get(sortKey) ?? []) {
      toDelete.add(entry.prefix)
    }
  }
  return [...toDelete]
}

export const isStorageBackupEligibleForRetention = (
  hasSuccessMarker: boolean,
  hasInprogressSubfolder: boolean,
  hasLegacyContent: boolean,
): boolean => {
  if (hasSuccessMarker) {
    return true
  }
  if (hasInprogressSubfolder) {
    return false
  }
  return hasLegacyContent
}

export const isIncompleteStorageBackupRun = (hasSuccessMarker: boolean, hasInprogressSubfolder: boolean): boolean =>
  !hasSuccessMarker && hasInprogressSubfolder

const getPrefixesFromApiResponse = (apiResponse: unknown): string[] => {
  if (typeof apiResponse !== 'object' || apiResponse == null || !('prefixes' in apiResponse)) {
    return []
  }
  const prefixes = apiResponse.prefixes
  if (!Array.isArray(prefixes)) {
    return []
  }
  return prefixes.filter((entry): entry is string => typeof entry === 'string')
}

export const getNextPageToken = (apiResponse: unknown): string | null => {
  if (typeof apiResponse !== 'object' || apiResponse == null || !('nextPageToken' in apiResponse)) {
    return null
  }
  const token = apiResponse.nextPageToken
  return typeof token === 'string' && token !== '' ? token : null
}

/**
 * ページを最後まで辿って prefix を集める。
 * getFiles の nextQuery は autoPaginate: false を落とし、2 ページ目以降で古い pageToken を返し続けるため使わない。
 * 次ページの有無は API レスポンスの nextPageToken だけで判定する。
 */
export const collectPrefixesFromPages = async (
  fetchPage: (pageToken: string | null) => Promise<unknown>,
): Promise<string[]> => {
  const collected: string[] = []
  const usedPageTokens = new Set<string>()
  let pageToken: string | null = null

  do {
    const apiResponse = await fetchPage(pageToken)
    collected.push(...getPrefixesFromApiResponse(apiResponse))
    const nextPageToken = getNextPageToken(apiResponse)
    if (nextPageToken != null) {
      if (usedPageTokens.has(nextPageToken)) {
        throw new Error('GCS list returned an already used pageToken')
      }
      usedPageTokens.add(nextPageToken)
    }
    pageToken = nextPageToken
  } while (pageToken != null)

  return collected
}

const listFolderPrefixes = async (bucketName: string, prefix: string): Promise<string[]> => {
  const bucket = new Storage().bucket(bucketName)
  return collectPrefixesFromPages(async (pageToken) => {
    const [, , apiResponse] = await bucket.getFiles({
      prefix,
      delimiter: '/',
      autoPaginate: false,
      ...(pageToken != null ? { pageToken } : {}),
    })
    return apiResponse
  })
}

export const buildFirestoreExportMetadataPath = (folderPrefix: string): string => {
  const normalizedPrefix = folderPrefix.endsWith('/') ? folderPrefix : `${folderPrefix}/`
  const folderName = normalizedPrefix.replace(/\/$/, '').split('/').pop() ?? ''
  return `${normalizedPrefix}${folderName}.${FIRESTORE_EXPORT_METADATA_SUFFIX}`
}

const hasFirestoreExportMetadata = async (bucketName: string, folderPrefix: string): Promise<boolean> => {
  const storage = new Storage()
  const [exists] = await storage.bucket(bucketName).file(buildFirestoreExportMetadataPath(folderPrefix)).exists()
  return exists
}

const deletePrefixRecursive = async (bucketName: string, prefix: string, dryRun: boolean): Promise<void> => {
  if (dryRun) {
    logger.info('Retention dry-run: would delete prefix', { bucketName, prefix })
    return
  }
  await new Storage().bucket(bucketName).deleteFiles({ prefix, force: true })
  logger.info('Deleted backup prefix', { bucketName, prefix })
}

const cleanupFirestoreTier = async (bucketName: string, tier: BackupTier, dryRun: boolean): Promise<void> => {
  const tierPrefix = `${tier}/`
  const prefixes = await listFolderPrefixes(bucketName, tierPrefix)
  const entries: RetentionEntry[] = []

  for (const prefix of prefixes) {
    if (!(await hasFirestoreExportMetadata(bucketName, prefix))) {
      logger.warn('Skipping Firestore export prefix without metadata', { prefix })
      continue
    }
    const sortKey = parseFirestoreExportFolderSortKey(prefix)
    if (sortKey == null) {
      continue
    }
    entries.push({ prefix, sortKey })
  }

  const toDelete = selectFirestoreExportPrefixesToDelete(entries, FIRESTORE_RETENTION[tier])
  for (const prefix of toDelete) {
    await deletePrefixRecursive(bucketName, prefix, dryRun)
  }
}

const cleanupLegacyFirestoreRootExports = async (bucketName: string, dryRun: boolean): Promise<void> => {
  const rootPrefixes = await listFolderPrefixes(bucketName, '')
  const legacyPrefixes = rootPrefixes.filter(
    (prefix) => !TIER_PREFIXES.some((tier) => prefix === `${tier}/` || prefix.startsWith(`${tier}/`)),
  )

  const entries: RetentionEntry[] = []
  for (const prefix of legacyPrefixes) {
    if (!(await hasFirestoreExportMetadata(bucketName, prefix))) {
      continue
    }
    const sortKey = parseFirestoreExportFolderSortKey(prefix)
    if (sortKey == null) {
      continue
    }
    entries.push({ prefix, sortKey })
  }

  const toDelete = selectFirestoreExportPrefixesToDelete(entries, FIRESTORE_RETENTION.daily)
  for (const prefix of toDelete) {
    await deletePrefixRecursive(bucketName, prefix, dryRun)
  }
}

const hasStorageBackupSuccessMarker = async (bucketName: string, runPrefix: string): Promise<boolean> => {
  const markerPath = `${runPrefix}${STORAGE_BACKUP_SUCCESS_MARKER}`
  const [exists] = await new Storage().bucket(bucketName).file(markerPath).exists()
  return exists
}

const hasStorageBackupInprogressSubfolder = async (bucketName: string, runPrefix: string): Promise<boolean> => {
  const subPrefixes = await listFolderPrefixes(bucketName, runPrefix)
  return subPrefixes.some((prefix) => prefix === `${runPrefix}${STORAGE_BACKUP_INPROGRESS_DIR}/`)
}

const hasLegacyStorageBackupContent = async (bucketName: string, runPrefix: string): Promise<boolean> => {
  const [files] = await new Storage().bucket(bucketName).getFiles({ prefix: runPrefix, maxResults: 1 })
  return files.length > 0
}

const cleanupStorageTier = async (bucketName: string, tier: BackupTier, dryRun: boolean): Promise<void> => {
  const tierPrefix = `${tier}/`
  const prefixes = await listFolderPrefixes(bucketName, tierPrefix)
  const entries: RetentionEntry[] = []

  const nowIso = DateTime.now().setZone(BACKUP_TIMEZONE).toISO() ?? ''
  const currentPeriodSortKey = formatBackupDateLabel(tier, nowIso)

  for (const prefix of prefixes) {
    const sortKey = parseStorageBackupFolderSortKey(tier, prefix)
    if (sortKey == null) {
      continue
    }

    const hasSuccessMarker = await hasStorageBackupSuccessMarker(bucketName, prefix)
    const hasInprogressSubfolder = await hasStorageBackupInprogressSubfolder(bucketName, prefix)

    if (isIncompleteStorageBackupRun(hasSuccessMarker, hasInprogressSubfolder)) {
      if (sortKey === currentPeriodSortKey) {
        logger.info('Skipping in-progress Storage backup run (current period)', { prefix, sortKey })
        continue
      }
      logger.warn('Deleting incomplete Storage backup run', { prefix })
      await deletePrefixRecursive(bucketName, prefix, dryRun)
      continue
    }

    const hasLegacyContent = hasSuccessMarker ? false : await hasLegacyStorageBackupContent(bucketName, prefix)

    if (!isStorageBackupEligibleForRetention(hasSuccessMarker, hasInprogressSubfolder, hasLegacyContent)) {
      continue
    }

    entries.push({ prefix, sortKey })
  }

  const toDelete = selectPrefixesToDelete(entries, STORAGE_RETENTION[tier])
  for (const prefix of toDelete) {
    await deletePrefixRecursive(bucketName, prefix, dryRun)
  }
}

export const isNotFoundError = (error: unknown): boolean =>
  typeof error === 'object' && error != null && 'code' in error && error.code === 404

/**
 * Bucket.exists() は storage.buckets.get が必要で、実行 SA（objectAdmin / objectViewer）には無い。
 * 付与済みの storage.objects.list で確かめ、404 のときだけ「バケットなし」とする。
 */
const hasStorageBackupBucket = async (bucketName: string): Promise<boolean> => {
  try {
    await new Storage().bucket(bucketName).getFiles({ maxResults: 1, autoPaginate: false })
    return true
  } catch (error) {
    if (isNotFoundError(error)) {
      return false
    }
    throw error
  }
}

export const runBackupRetentionCleanup = async (): Promise<void> => {
  const projectId = getProjectId()
  const dryRun = isRetentionDryRun()
  const firestoreBucketName = getFirestoreBackupBucketName(projectId)
  const storageBucketName = getStorageBackupBucketName(projectId)

  logger.info('Starting backup retention cleanup', {
    dryRun,
    firestoreBucketName,
    storageBucketName,
    now: DateTime.now().setZone(BACKUP_TIMEZONE).toISO(),
  })

  // Storage バックアップ用バケットが無い環境（development 等）でも Firestore 側の削除は続ける
  const storageBucketExists = await hasStorageBackupBucket(storageBucketName)
  if (!storageBucketExists) {
    logger.warn('Storage backup bucket not found; skipping Storage retention', { storageBucketName })
  }

  for (const tier of TIER_PREFIXES) {
    await cleanupFirestoreTier(firestoreBucketName, tier, dryRun)
    if (storageBucketExists) {
      await cleanupStorageTier(storageBucketName, tier, dryRun)
    }
  }

  await cleanupLegacyFirestoreRootExports(firestoreBucketName, dryRun)

  logger.info('Backup retention cleanup finished', { dryRun })
}
