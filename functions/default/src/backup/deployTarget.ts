/** sandbox（開発者ごとの検証環境）の GCP プロジェクト ID 接頭辞 */
const SANDBOX_PROJECT_ID_PREFIX = 'bokudeli-event-yasu-'

/**
 * バックアップ系 Scheduled Functions をデプロイするか。
 * sandbox ではバックアップが不要なため除外する。
 * プロジェクト ID が取れないときはデプロイする側に倒し、本番 / development のバックアップを消さない。
 */
export const shouldDeployBackupFunctions = (projectId: string | undefined): boolean =>
  projectId == null || !projectId.startsWith(SANDBOX_PROJECT_ID_PREFIX)
