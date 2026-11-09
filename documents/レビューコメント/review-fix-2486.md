# ブランチ fix/2486 レビュー記録

**記載方針**: レビュワーのコメントは **原文**のまま（GitHub `body`。会話コメント先頭の `>` 引用は除く）。**該当コード**は `diff_hunk`（改変禁止）。評価・ステータス等の語彙は `/review-comments-evaluate` と同一。

### RC 一覧（サマリ）

| 対応 | RC | GitHub id | 評価 | ステータス | PRスコープ | ラベル | 種別 | 工数 | 要約 |
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [x] | RC-1 | 6732013407 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🔒 セキュリティ, 🐛 実害 | 🔧 微修正 | S | `bucket.exists()` は `storage.buckets.get` が必要で、実行 SA の権限に無い<br>`retention.ts` の `runBackupRetentionCleanup`<br>403 で Firestore 側の削除も始まらず関数全体が失敗する<br>付与済みの一覧権限で確かめ、404 だけをバケットなしとする形に修正済み |
| [x] | RC-2 | 6732013407 | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | S | 直前と同じ pageToken しか検出せず、A→B→A の循環では無限取得になる<br>`retention.ts` の `collectPrefixesFromPages`<br>循環すると再びタイムアウトまで一覧 API を叩き続ける<br>使用済み token を Set で持ち、再出現でエラーにする形に修正済み |
| [x] | RC-3 | 6732013407 | 👌 修正不要 | — | — | — | 👀 確認のみ | — | 本番の初回実行前に dry-run で削除対象を確認すべきという提案<br>本番 `FUNCTIONS_ENV` の運用<br>旧形式約870件の削除は 2026-11-02 に仕様どおり実施すると確認済み<br>コード変更は不要。dry-run の要否はマージ時に人が判断する |
| [x] | RC-4 | 5821566911 | 👌 修正不要 | — | — | — | 👀 確認のみ | — | Copilot review overview（目次と変更概要）<br>リンク先 `#discussion_r4509373132` は RC-6、`#discussion_r4509373157` は RC-7 で評価<br>目次自体に追加の修正要求はない |
| [x] | RC-5 | 4509365488 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🔒 セキュリティ, 🐛 実害 | 🔧 微修正 | S | `bucket.exists()` に必要な `storage.buckets.get` が Terraform の権限に無い<br>`retention.ts:304`。`terraform/storage.tf` と `service_account.tf` の付与ロール<br>403 でクリーンアップ全体が開始前に止まる<br>権限追加ではなく、一覧取得の 404 で判定する方式に修正済み |
| [x] | RC-6 | 4509373132 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🔒 セキュリティ, 🐛 実害 | 🔧 微修正 | S | `Bucket.exists()` が要求する権限が実行 SA に無く 403 になる<br>`retention.ts:304`<br>バケットがあっても Firestore 側の削除前に停止する<br>既存の一覧権限で確かめ、404 だけスキップする形に修正済み |
| [ ] | RC-7 | 4509373157 | 🟡 修正提案 | 未着手 | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | M | Storage バケット未作成時に Firestore 側を続行する分岐に回帰テストが無い<br>`retention.ts:312` の `runBackupRetentionCleanup`<br>分岐が消えてもテストが通ってしまう<br>Storage をモックした `runBackupRetentionCleanup` のテスト追加が必要。工数 M のため自動修正の対象外 |

---

## 評価セッション（2026-11-09 13:25・review-comments-evaluate）

- **評価日時**: 2026-11-09 13:25 JST
- **評価者**: Claude Code（`/review-comments-evaluate` auto）
- **ブランチ名**: `fix/2486`
- **PR**: #2488
- **Outdated 除外件数**: 0
- **レビュー非該当スキップ件数**: 3（6731967347 Codex サマリの接続案内、6731968665 レビュー依頼定型文、5821557572 Codex レビュー本文の接続案内のみ）
- **重複除外**: なし

### RC 一覧（サマリ）

| 対応 | RC | GitHub id | 評価 | ステータス | PRスコープ | ラベル | 種別 | 工数 | 要約 |
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [x] | RC-1 | 6732013407 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🔒 セキュリティ, 🐛 実害 | 🔧 微修正 | S | `bucket.exists()` は `storage.buckets.get` が必要で、実行 SA の権限に無い<br>`retention.ts` の `runBackupRetentionCleanup`<br>403 で Firestore 側の削除も始まらず関数全体が失敗する<br>付与済みの一覧権限で確かめ、404 だけをバケットなしとする形に修正済み |
| [x] | RC-2 | 6732013407 | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | S | 直前と同じ pageToken しか検出せず、A→B→A の循環では無限取得になる<br>`retention.ts` の `collectPrefixesFromPages`<br>循環すると再びタイムアウトまで一覧 API を叩き続ける<br>使用済み token を Set で持ち、再出現でエラーにする形に修正済み |
| [x] | RC-3 | 6732013407 | 👌 修正不要 | — | — | — | 👀 確認のみ | — | 本番の初回実行前に dry-run で削除対象を確認すべきという提案<br>本番 `FUNCTIONS_ENV` の運用<br>旧形式約870件の削除は 2026-11-02 に仕様どおり実施すると確認済み<br>コード変更は不要。dry-run の要否はマージ時に人が判断する |
| [x] | RC-4 | 5821566911 | 👌 修正不要 | — | — | — | 👀 確認のみ | — | Copilot review overview（目次と変更概要）<br>リンク先 `#discussion_r4509373132` は RC-6、`#discussion_r4509373157` は RC-7 で評価<br>目次自体に追加の修正要求はない |
| [x] | RC-5 | 4509365488 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🔒 セキュリティ, 🐛 実害 | 🔧 微修正 | S | `bucket.exists()` に必要な `storage.buckets.get` が Terraform の権限に無い<br>`retention.ts:304`。`terraform/storage.tf` と `service_account.tf` の付与ロール<br>403 でクリーンアップ全体が開始前に止まる<br>権限追加ではなく、一覧取得の 404 で判定する方式に修正済み |
| [x] | RC-6 | 4509373132 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🔒 セキュリティ, 🐛 実害 | 🔧 微修正 | S | `Bucket.exists()` が要求する権限が実行 SA に無く 403 になる<br>`retention.ts:304`<br>バケットがあっても Firestore 側の削除前に停止する<br>既存の一覧権限で確かめ、404 だけスキップする形に修正済み |
| [ ] | RC-7 | 4509373157 | 🟡 修正提案 | 未着手 | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | M | Storage バケット未作成時に Firestore 側を続行する分岐に回帰テストが無い<br>`retention.ts:312` の `runBackupRetentionCleanup`<br>分岐が消えてもテストが通ってしまう<br>Storage をモックした `runBackupRetentionCleanup` のテスト追加が必要。工数 M のため自動修正の対象外 |

---

**識別子**: RC-1（GitHub id: 6732013407）

**レビュワー**: Copilot

**指摘箇所**: PR トップレベル（本文で `functions/default/src/backup/retention.ts:304` を指定）

**該当コード（レビュー時点の diff）**:

（インライン指摘なし）

**レビュワーのコメント（原文）**:

- 🚨 **必須修正** [🔧微修正/S] — `functions/default/src/backup/retention.ts:304`: Terraform で管理する実行 SA の権限（`roles/storage.objectAdmin` / `roles/storage.objectViewer`）には `storage.buckets.get` が含まれず、`bucket.exists()` が 403 で失敗する可能性があります。Storage バケットが無い環境で false を得られず、Firestore の cleanup より前に関数全体が失敗するため、必要な権限を付与するか、403 は失敗として維持しつつ 404 のみを未作成として扱う方法に変更してください。

**コメント要約**: `bucket.exists()` は `storage.buckets.get` が必要で、実行 SA の権限に無い。`retention.ts` の `runBackupRetentionCleanup`。403 で Firestore 側の削除も始まらず関数全体が失敗する。付与済みの一覧権限で確かめ、404 だけをバケットなしとする形に修正済み。

**評価**: 🚨 必須修正

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🔒 セキュリティ, 🐛 実害

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: Terraform で付与しているのは `roles/storage.objectAdmin`（バケット単位）と `roles/storage.objectViewer` で、どちらも `storage.buckets.get` を含まない。本 PR で追加した `exists()` が原因で関数全体が止まり得るため必須。IAM を増やすより、既に必要な `storage.objects.list` で `getFiles({ maxResults: 1 })` を呼び、`code === 404` のときだけバケットなしとする方式にした（403 などは従来どおり失敗させる）。`isNotFoundError` のテストを追加し、Storage バケットの無い 2604 と、ある 2607 に対してローカル dry-run で挙動を確認した。

---

**識別子**: RC-2（GitHub id: 6732013407）

**レビュワー**: Copilot

**指摘箇所**: PR トップレベル（本文で `functions/default/src/backup/retention.ts:142-144` を指定）

**該当コード（レビュー時点の diff）**:

（インライン指摘なし）

**レビュワーのコメント（原文）**:

- 🟡 **修正提案** [🔧微修正/S] — `functions/default/src/backup/retention.ts:142-144`: 現状は直前の token との一致しか検出しません。`A → B → A` のように既出 token に戻る循環では再び無限取得になり得るため、既出 token 全体を Set で検出するのが安全です。

**コメント要約**: 直前と同じ pageToken しか検出せず、A→B→A の循環では無限取得になる。`retention.ts` の `collectPrefixesFromPages`。循環すると再びタイムアウトまで一覧 API を叩き続ける。使用済み token を Set で持ち、再出現でエラーにする形に修正済み。

**評価**: 🟡 修正提案

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🐛 実害

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: 本 PR の目的（無限ループの防止）に直結し、修正方針が一意で数行の変更のため条件付き自動修正の対象。循環ケースのテストを追加した。

---

**識別子**: RC-3（GitHub id: 6732013407）

**レビュワー**: Copilot

**指摘箇所**: PR トップレベル

**該当コード（レビュー時点の diff）**:

（インライン指摘なし）

**レビュワーのコメント（原文）**:

旧形式エクスポート約870件の削除は、説明にある確認済み方針どおりである限り指摘対象ではありません。ただし本番スケジュールの実行前に `BACKUP_RETENTION_DRY_RUN=true` を設定して削除対象を確認し、その後解除する必要があります。

**コメント要約**: 本番の初回実行前に dry-run で削除対象を確認すべきという提案。本番 `FUNCTIONS_ENV` の運用。旧形式約870件の削除は 2026-11-02 に仕様どおり実施すると確認済み。コード変更は不要。dry-run の要否はマージ時に人が判断する。

**評価**: 👌 修正不要

**ステータス**: —

**PRスコープ**: —

**ラベル**: —

**変更種別**: 👀 確認のみ

**想定工数**: —

**判断理由**: コードへの指摘ではなく本番運用の提案。削除方針は 2026-11-02 に確認済みで、`FUNCTIONS_ENV` の変更は人が行う作業のため、本 PR でのコード対応は不要。PR 本文の注意書きで判断材料を示している。

---

**識別子**: RC-4（GitHub id: 5821566911）

**レビュワー**: Copilot（copilot-pull-request-reviewer）

**指摘箇所**: PR レビュー本文

**該当コード（レビュー時点の diff）**:

（インライン指摘なし）

**レビュワーのコメント（原文）**:

### 🟡 Changes recommended

The bucket existence check requires `storage.buckets.get`, which the runtime service account’s assigned roles do not grant, causing a 403 that stops cleanup before Firestore deletions begin.

2 open issues

- High severity: [Bucket.exists() requires an ungranted storage.buckets.get permission](https://github.com/nijuniinc/bokudeli-event-new/pull/2488#discussion_r4509373132) · New
- Low severity: [Add regression coverage for Firestore cleanup when the bucket is absent](https://github.com/nijuniinc/bokudeli-event-new/pull/2488#discussion_r4509373157) · New

（以下、変更概要の表。指摘を含まないため省略）

**コメント要約**: Copilot review overview（目次と変更概要）。リンク先 `#discussion_r4509373132` は RC-6、`#discussion_r4509373157` は RC-7 で評価。目次自体に追加の修正要求はない。

**評価**: 👌 修正不要

**ステータス**: —

**PRスコープ**: —

**ラベル**: —

**変更種別**: 👀 確認のみ

**想定工数**: —

**判断理由**: リンク先 2 件はインライン取得結果に存在し、RC-6 / RC-7 で評価済み。目次自体に修正要求は無い。

---

**識別子**: RC-5（GitHub id: 4509365488）

**レビュワー**: Codex（chatgpt-codex-connector）

**指摘箇所**: `functions/default/src/backup/retention.ts:304`

**該当コード（レビュー時点の diff）**:

```diff
@@ -265,9 +300,17 @@ export const runBackupRetentionCleanup = async (): Promise<void> => {
     now: DateTime.now().setZone(BACKUP_TIMEZONE).toISO(),
   })
 
+  // Storage バックアップ用バケットが無い環境（development 等）でも Firestore 側の削除は続ける
+  const [storageBucketExists] = await new Storage().bucket(storageBucketName).exists()
```

**レビュワーのコメント（原文）**:

**<sub><sub>![P1 Badge](https://img.shields.io/badge/P1-orange?style=flat)</sub></sub>  バケット存在確認に必要な IAM 権限を併せて付与する**

Terraform に記述された権限のみを持つ実行サービスアカウントでは、この存在確認が 403 になり、Firestore 側を含むクリーンアップ全体が開始前に停止します。`terraform/storage.tf` の `storage_backups_compute_object_admin` は `roles/storage.objectAdmin`、`terraform/service_account.tf` のプロジェクト権限は `roles/storage.objectViewer` ですが、どちらもバケットメタデータ取得に必要な `storage.buckets.get` を含みません（[公式 IAM 権限一覧](https://docs.cloud.google.com/storage/docs/access-control/iam-roles)）。`bucket.exists()` の追加と同時に必要な権限を付与するか、既存のオブジェクト一覧取得で 404 を処理する方式にしてください。

Useful? React with 👍 / 👎.

**コメント要約**: `bucket.exists()` に必要な `storage.buckets.get` が Terraform の権限に無い。`retention.ts:304`。`terraform/storage.tf` と `service_account.tf` の付与ロール。403 でクリーンアップ全体が開始前に止まる。権限追加ではなく、一覧取得の 404 で判定する方式に修正済み。

**評価**: 🚨 必須修正

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🔒 セキュリティ, 🐛 実害

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: RC-1 と同じ不具合を別レビュワーが指摘したもの（GitHub id が異なるため別 RC）。提示された 2 案のうち、IAM を増やさない「一覧取得で 404 を処理する方式」を採用した。

---

**識別子**: RC-6（GitHub id: 4509373132）

**レビュワー**: Copilot

**指摘箇所**: `functions/default/src/backup/retention.ts:304`

**該当コード（レビュー時点の diff）**:

```diff
@@ -265,9 +300,17 @@ export const runBackupRetentionCleanup = async (): Promise<void> => {
     now: DateTime.now().setZone(BACKUP_TIMEZONE).toISO(),
   })
 
+  // Storage バックアップ用バケットが無い環境（development 等）でも Firestore 側の削除は続ける
+  const [storageBucketExists] = await new Storage().bucket(storageBucketName).exists()
```

**レビュワーのコメント（原文）**:

[must] `Bucket.exists()` が要求する `storage.buckets.get` は、実行用 Compute SA に付与された `roles/storage.objectAdmin`（`terraform/storage.tf:105-108`）と `roles/storage.objectViewer`（`terraform/service_account.tf:102-105`）には含まれません。追加権限のない環境では、バケットが存在していてもここで 403 となり、Firestore 側も削除開始前に停止します。既存のオブジェクト一覧権限で存在確認し、404 の場合だけ Storage 側をスキップするようにしてください。

**コメント要約**: `Bucket.exists()` が要求する権限が実行 SA に無く 403 になる。`retention.ts:304`。バケットがあっても Firestore 側の削除前に停止する。既存の一覧権限で確かめ、404 だけスキップする形に修正済み。

**評価**: 🚨 必須修正

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🔒 セキュリティ, 🐛 実害

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: RC-1 / RC-5 と同じ不具合。指摘どおり一覧権限で存在確認し、404 のときだけ Storage 側をスキップするよう修正した。

---

**識別子**: RC-7（GitHub id: 4509373157）

**レビュワー**: Copilot

**指摘箇所**: `functions/default/src/backup/retention.ts:312`

**該当コード（レビュー時点の diff）**:

```diff
@@ -265,9 +300,17 @@ export const runBackupRetentionCleanup = async (): Promise<void> => {
     now: DateTime.now().setZone(BACKUP_TIMEZONE).toISO(),
   })
 
+  // Storage バックアップ用バケットが無い環境（development 等）でも Firestore 側の削除は続ける
+  const [storageBucketExists] = await new Storage().bucket(storageBucketName).exists()
+  if (!storageBucketExists) {
+    logger.warn('Storage backup bucket not found; skipping Storage retention', { storageBucketName })
+  }
+
   for (const tier of TIER_PREFIXES) {
     await cleanupFirestoreTier(firestoreBucketName, tier, dryRun)
-    await cleanupStorageTier(storageBucketName, tier, dryRun)
+    if (storageBucketExists) {
+      await cleanupStorageTier(storageBucketName, tier, dryRun)
```

**レビュワーのコメント（原文）**:

[imo] 🟡 修正提案: Storage バケット未作成時に Firestore の削除を続行する修正には回帰テストがありません。追加された `backup.test.ts` はパス生成とページ収集のみを検証し、`runBackupRetentionCleanup` を呼んでいないため、この分岐が失われても成功します。Storage バケットが存在しない応答をモックし、Storage 側の一覧・削除を呼ばずに Firestore の各 tier と legacy 直下の保持数超過分が削除されるテストを追加してください。

**コメント要約**: Storage バケット未作成時に Firestore 側を続行する分岐に回帰テストが無い。`retention.ts:312` の `runBackupRetentionCleanup`。分岐が消えてもテストが通ってしまう。Storage をモックした `runBackupRetentionCleanup` のテスト追加が必要。工数 M のため自動修正の対象外。

**評価**: 🟡 修正提案

**ステータス**: 未着手

**PRスコープ**: 📌 スコープ内

**ラベル**: 🐛 実害

**変更種別**: 🔧 微修正

**想定工数**: M

**判断理由**: 指摘は妥当。ただし `@google-cloud/storage` の `Storage` を丸ごとモックし、複数 tier の一覧・存在確認・削除の応答を組み立てる必要があり工数 M のため、条件付き自動修正（S）の対象外。今回は判定部分を `isNotFoundError` として切り出してテストし、分岐全体の動作はローカル dry-run（Storage バケットなしの 2604 / ありの 2607）で確認した。テストを追加するかは人が判断する。
