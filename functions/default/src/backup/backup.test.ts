import { describe, expect, it } from 'vitest'
import { DateTime } from 'luxon'
import {
  formatBackupDateLabel,
  buildFirestoreExportOutputUriPrefix,
  buildStorageBackupRunPrefix,
  buildStorageBackupSuccessMarkerPath,
  buildStorageBackupWorkPrefix,
  getFirestoreExportUriPrefix,
  STORAGE_RETENTION,
} from './constants.js'
import {
  buildFirestoreExportMetadataPath,
  collectPrefixesFromPages,
  getNextPageToken,
  isNotFoundError,
  isIncompleteStorageBackupRun,
  isStorageBackupEligibleForRetention,
  parseFirestoreExportFolderSortKey,
  parseStorageBackupFolderSortKey,
  selectPrefixesToDelete,
  selectFirestoreExportPrefixesToDelete,
} from './retention.js'
import { buildStorageBackupDestinationPrefix } from './storageCopy.js'

describe('backup retention', () => {
  it('STORAGE_RETENTION matches spec (daily 7, weekly 4, monthly 6)', () => {
    expect(STORAGE_RETENTION).toEqual({ daily: 7, weekly: 4, monthly: 6 })
  })

  it('selectPrefixesToDelete keeps newest entries by sortKey', () => {
    const entries = [
      { prefix: 'daily/2026-06-01T02:00:00_1/', sortKey: '2026-06-01' },
      { prefix: 'daily/2026-06-02T02:00:00_2/', sortKey: '2026-06-02' },
      { prefix: 'daily/2026-06-03T02:00:00_3/', sortKey: '2026-06-03' },
    ]
    expect(selectPrefixesToDelete(entries, 2)).toEqual(['daily/2026-06-01T02:00:00_1/'])
  })

  it('selectFirestoreExportPrefixesToDelete dedupes same-day exports before keep count', () => {
    const entries = [
      { prefix: 'daily/2026-06-01T02:00:00.000/', sortKey: '2026-06-01' },
      { prefix: 'daily/2026-06-01T03:00:00.000/', sortKey: '2026-06-01' },
      { prefix: 'daily/2026-06-02T02:00:00.000/', sortKey: '2026-06-02' },
      { prefix: 'daily/2026-06-03T02:00:00.000/', sortKey: '2026-06-03' },
    ]
    expect(selectFirestoreExportPrefixesToDelete(entries, 2)).toEqual([
      'daily/2026-06-01T02:00:00.000/',
      'daily/2026-06-01T03:00:00.000/',
    ])
  })

  it('parseFirestoreExportFolderSortKey extracts date from export folder', () => {
    expect(parseFirestoreExportFolderSortKey('daily/2026-06-03T17:00:07_99530/')).toBe('2026-06-03')
    expect(parseFirestoreExportFolderSortKey('weekly/invalid/')).toBeNull()
  })

  it('parseStorageBackupFolderSortKey validates folder labels', () => {
    expect(parseStorageBackupFolderSortKey('daily', 'daily/2026-06-03/')).toBe('2026-06-03')
    expect(parseStorageBackupFolderSortKey('monthly', 'monthly/2026-06/')).toBe('2026-06')
    expect(parseStorageBackupFolderSortKey('monthly', 'monthly/2026-06-03/')).toBeNull()
  })

  it('isStorageBackupEligibleForRetention requires _SUCCESS for in-progress runs', () => {
    expect(isStorageBackupEligibleForRetention(true, true, false)).toBe(true)
    expect(isStorageBackupEligibleForRetention(false, true, false)).toBe(false)
    expect(isStorageBackupEligibleForRetention(false, false, true)).toBe(true)
    expect(isIncompleteStorageBackupRun(false, true)).toBe(true)
    expect(isIncompleteStorageBackupRun(true, true)).toBe(false)
  })
})

describe('backup retention listing', () => {
  it('buildFirestoreExportMetadataPath uses <folder>/<folder>.overall_export_metadata', () => {
    expect(buildFirestoreExportMetadataPath('daily/2026-11-02T02:00:08.874/')).toBe(
      'daily/2026-11-02T02:00:08.874/2026-11-02T02:00:08.874.overall_export_metadata',
    )
    expect(buildFirestoreExportMetadataPath('2026-08-14T17:00:08_1474/')).toBe(
      '2026-08-14T17:00:08_1474/2026-08-14T17:00:08_1474.overall_export_metadata',
    )
    expect(buildFirestoreExportMetadataPath('weekly/2026-11-01T02:30:00.000')).toBe(
      'weekly/2026-11-01T02:30:00.000/2026-11-01T02:30:00.000.overall_export_metadata',
    )
  })

  it('getNextPageToken reads nextPageToken from the API response only', () => {
    expect(getNextPageToken({ prefixes: [], nextPageToken: 'token-1' })).toBe('token-1')
    expect(getNextPageToken({ prefixes: [] })).toBeNull()
    expect(getNextPageToken({ nextPageToken: '' })).toBeNull()
    expect(getNextPageToken(null)).toBeNull()
  })

  it('collectPrefixesFromPages follows pages and stops when nextPageToken is absent', async () => {
    const pages: Record<string, unknown> = {
      first: { prefixes: ['daily/a/', 'daily/b/'], nextPageToken: 'token-2' },
      'token-2': { prefixes: ['daily/c/'] },
    }
    const requestedTokens: (string | null)[] = []

    const prefixes = await collectPrefixesFromPages(async (pageToken) => {
      requestedTokens.push(pageToken)
      return pages[pageToken ?? 'first']
    })

    expect(prefixes).toEqual(['daily/a/', 'daily/b/', 'daily/c/'])
    expect(requestedTokens).toEqual([null, 'token-2'])
  })

  it('collectPrefixesFromPages throws instead of looping on a repeated pageToken', async () => {
    await expect(
      collectPrefixesFromPages(async () => ({ prefixes: ['daily/a/'], nextPageToken: 'same-token' })),
    ).rejects.toThrow('already used pageToken')
  })

  it('collectPrefixesFromPages throws when pageTokens cycle back to an earlier one', async () => {
    const nextTokens: Record<string, string> = { first: 'token-a', 'token-a': 'token-b', 'token-b': 'token-a' }
    await expect(
      collectPrefixesFromPages(async (pageToken) => ({
        prefixes: [],
        nextPageToken: nextTokens[pageToken ?? 'first'],
      })),
    ).rejects.toThrow('already used pageToken')
  })

  it('isNotFoundError treats only 404 as a missing bucket', () => {
    expect(isNotFoundError({ code: 404, message: 'The specified bucket does not exist.' })).toBe(true)
    expect(isNotFoundError({ code: 403, message: 'Permission denied' })).toBe(false)
    expect(isNotFoundError(new Error('network'))).toBe(false)
    expect(isNotFoundError(null)).toBe(false)
  })
})

describe('backup paths', () => {
  it('getFirestoreExportUriPrefix includes tier prefix', () => {
    expect(getFirestoreExportUriPrefix('my-project', 'daily')).toBe('gs://my-project-firestore-backups/daily/')
  })

  it('buildFirestoreExportOutputUriPrefix appends run folder under tier', () => {
    const startedAt = DateTime.fromISO('2026-06-03T17:00:00', { zone: 'Asia/Tokyo' })
    expect(buildFirestoreExportOutputUriPrefix('my-project', 'daily', startedAt)).toBe(
      'gs://my-project-firestore-backups/daily/2026-06-03T17:00:00.000/',
    )
  })

  it('formatBackupDateLabel formats monthly as YYYY-MM', () => {
    expect(formatBackupDateLabel('monthly', '2026-06-03')).toBe('2026-06')
    expect(formatBackupDateLabel('daily', '2026-06-03')).toBe('2026-06-03')
  })

  it('buildStorageBackupDestinationPrefix uses JST schedule time', () => {
    expect(buildStorageBackupDestinationPrefix('daily', '2026-06-02T17:15:00.000Z')).toBe('daily/2026-06-03')
    expect(buildStorageBackupDestinationPrefix('monthly', '2026-05-31T18:15:00.000Z')).toBe('monthly/2026-06')
  })

  it('buildStorageBackupWorkPrefix and success marker paths', () => {
    expect(buildStorageBackupRunPrefix('daily', '2026-07-19')).toBe('daily/2026-07-19')
    expect(buildStorageBackupWorkPrefix('daily', '2026-07-19')).toBe('daily/2026-07-19/_inprogress')
    expect(buildStorageBackupSuccessMarkerPath('daily', '2026-07-19')).toBe('daily/2026-07-19/_SUCCESS')
  })
})
