# ブランチ fix/2490 レビュー記録

**記載方針**: レビュワーのコメントは原文のまま。該当コードは GitHub API の `diff_hunk`（改変禁止）。評価（不変）とステータス（可変）は `/review-comments-evaluate` の共通区分に従う。

### RC 一覧（サマリ）

| 対応 | RC | GitHub id | 評価 | ステータス | PRスコープ | ラベル | 種別 | 工数 | 要約 |
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [x] | RC-1 | 5822406255 | 👌 修正不要 | — | — | — | 👀 確認のみ | — | Copilot のレビュー概要。3件の open issue へのリンクと変更概要だけを載せた目次<br>リンク先 r4510055616 / r4510055642 / r4510055656 は RC-2 / RC-3 / RC-5 で評価済み<br>目次自体に追加の修正要求はない |
| [x] | RC-2 | 4510055616 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | S | 画面側で severity に warn を指定しても、Cloud Logging のレベルはサーバーの isClientErrorNoise が決める<br>`CartFormAnswer.vue` の reportStageError（売り切れ等を warn にする分岐）<br>想定内の売り切れ等も ERROR として残り、調査対象の失敗に混ざる。コメントも実態と合わない<br>理由を画面に出せる想定内の失敗は記録しないようにし、severity 指定をヘルパーから外した |
| [x] | RC-3 | 4510055642 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | S | 注文確定で注文が ordered になると in_cart の購読から対象が消え、watch が再実行される<br>`CartFormAnswer.vue` の loadOrderForm（cart item not found の記録）<br>正常な注文でも cart item not found が ERROR で残り、実際の失敗と混ざる<br>処理中（saving）と注文確定後（orderConfirmed）の消失は記録しないようにした |
| [x] | RC-4 | 4510041412 | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | S | RC-3 と同じく、注文確定でカートから対象が消えると form_load の ERROR が記録される<br>`CartFormAnswer.vue` の loadOrderForm<br>成功した注文のログが送信失敗の調査に混ざる<br>RC-3 と同じ修正（saving 中・確定後は記録しない）で解消 |
| [x] | RC-5 | 4510055656 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | S | 初回読み込みで cart が null から「対象を含まないカート」になっても cartItemKey は空文字のまま<br>`CartFormAnswer.vue` の watch（監視対象が cartItemKey だけ）<br>immediate 実行時は cart が null で記録されず、その後 watch が発火しないため対象欠落が記録されない<br>watch の監視対象を [cartItemKey, () => cart.value != null] に変更した |
| [x] | RC-6 | 5822449762 | 👌 修正不要 | — | — | — | 👀 確認のみ | — | Copilot の2周目レビュー概要。open issue は 0 件で、前回の3件（RC-2・RC-3・RC-5）は解消済みと判定<br>PR トップレベル（レビュー本文）<br>DEV ビルドでは送信されずテストもモックのため、sandbox で Cloud Logging への到達を確認してほしいという確認依頼のみ<br>コード修正の要求は無い。sandbox での到達確認は PR の確認事項（要確認）として残す |

---

## 評価セッション（2026-11-09 15:50・review-comments-evaluate）

- **評価日時**: 2026-11-09 15:50 JST
- **評価者**: Claude Code（`/review-comments-evaluate` auto モード）
- **ブランチ名**: `fix/2490`
- **PR**: #2491
- **REVIEW_REQUEST_SINCE**: 2026-11-09T06:34:50Z（partial: false）
- **Outdated 除外件数**: 0
- **レビュー非該当スキップ件数**: 4（レビュー依頼の定型文 1、Codex 接続案内のみのレビュー本文 5822388145、Codex Review Summary（状態のみ）1、Copilot のエラー返信 1）
- **重複除外**: なし

### RC 一覧（サマリ）

| 対応 | RC | GitHub id | 評価 | ステータス | PRスコープ | ラベル | 種別 | 工数 | 要約 |
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [x] | RC-1 | 5822406255 | 👌 修正不要 | — | — | — | 👀 確認のみ | — | Copilot のレビュー概要。3件の open issue へのリンクと変更概要だけを載せた目次<br>リンク先 r4510055616 / r4510055642 / r4510055656 は RC-2 / RC-3 / RC-5 で評価済み<br>目次自体に追加の修正要求はない |
| [x] | RC-2 | 4510055616 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | S | 画面側で severity に warn を指定しても、Cloud Logging のレベルはサーバーの isClientErrorNoise が決める<br>`CartFormAnswer.vue` の reportStageError（売り切れ等を warn にする分岐）<br>想定内の売り切れ等も ERROR として残り、調査対象の失敗に混ざる。コメントも実態と合わない<br>理由を画面に出せる想定内の失敗は記録しないようにし、severity 指定をヘルパーから外した |
| [x] | RC-3 | 4510055642 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | S | 注文確定で注文が ordered になると in_cart の購読から対象が消え、watch が再実行される<br>`CartFormAnswer.vue` の loadOrderForm（cart item not found の記録）<br>正常な注文でも cart item not found が ERROR で残り、実際の失敗と混ざる<br>処理中（saving）と注文確定後（orderConfirmed）の消失は記録しないようにした |
| [x] | RC-4 | 4510041412 | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | S | RC-3 と同じく、注文確定でカートから対象が消えると form_load の ERROR が記録される<br>`CartFormAnswer.vue` の loadOrderForm<br>成功した注文のログが送信失敗の調査に混ざる<br>RC-3 と同じ修正（saving 中・確定後は記録しない）で解消 |
| [x] | RC-5 | 4510055656 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 🔧 微修正 | S | 初回読み込みで cart が null から「対象を含まないカート」になっても cartItemKey は空文字のまま<br>`CartFormAnswer.vue` の watch（監視対象が cartItemKey だけ）<br>immediate 実行時は cart が null で記録されず、その後 watch が発火しないため対象欠落が記録されない<br>watch の監視対象を [cartItemKey, () => cart.value != null] に変更した |

---

**識別子**: RC-1（GitHub id: 5822406255）

**レビュワー**: Copilot（copilot-pull-request-reviewer）

**指摘箇所**: PR トップレベル（レビュー本文）

**該当コード（レビュー時点の diff）**:

（インライン指摘なし）

**レビュワーのコメント（原文）**:

<!-- ccr-overview-v2 -->

### 🟡 Changes recommended

初回読み込み後のカート対象欠落が検出されず、正常な注文処理中のカート消失や想定内の売り切れが誤って ERROR として記録される問題が残っています。

<details open>
<summary><strong>3 open issues</strong></summary>

- <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.svg"><img src="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.png" alt="Medium severity" width="62" height="18" align="texttop"></picture> [売り切れエラーをCloud LoggingでWARNに分類する](https://github.com/nijuniinc/bokudeli-event-new/pull/2491#discussion_r4510055616) · New
- <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.svg"><img src="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.png" alt="Medium severity" width="62" height="18" align="texttop"></picture> [注文保存中のカート消失をエラーとして記録しない](https://github.com/nijuniinc/bokudeli-event-new/pull/2491#discussion_r4510055642) · New
- <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.svg"><img src="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.png" alt="Medium severity" width="62" height="18" align="texttop"></picture> [初回読み込み完了時の対象欠落を監視する](https://github.com/nijuniinc/bokudeli-event-new/pull/2491#discussion_r4510055656) · New
</details>

<details>
<summary><strong>What changed in this PR</strong></summary>

フォーム回答・注文確定の失敗を調査できるよう、共有 UI の各処理段階から既存の `reportClientError` へ診断情報を送る変更です。#2490 に対応するログ追加で、#2412 の初回読み込み速度改善は対象外です。

**変更内容:**
- 段階名・Firebase エラーコード・イベントパスを付与する共通ヘルパーとテストを追加しています。
- フォーム読み込み、回答保存、注文前チェック、決済・注文確定に失敗記録を追加しています。
- カートのフォーム有無判定と事前チェックにも記録を追加し、既存の例外処理を維持しています。

| File | Description |
| ---- | ----------- |
| `base/​src/​utils/​reportFormFlowError.ts` | 段階・対象イベントを付与するエラー報告ヘルパーを追加。 |
| `base/​src/​utils/​reportFormFlowError.test.ts` | エラーコード、イベントパス、severity の受け渡しを検証。 |
| `base/​src/​components/​pages/​cart.vue` | フォーム有無判定・事前チェックの失敗を記録。 |
| `base/​src/​components/​forms/​CartFormAnswer.vue` | 回答・注文フローの各段階で失敗を記録し、既存の catch へ再送出。 |
</details>

<sub>Review effort: Balanced</sub>

**コメント要約**:

1. Copilot のレビュー概要。3件の open issue へのリンクと変更概要だけを載せた目次
2. リンク先 r4510055616 / r4510055642 / r4510055656 は RC-2 / RC-3 / RC-5 で評価済み
3. 目次自体に追加の修正要求はない

**評価**: 👌 修正不要

**ステータス**: —

**PRスコープ**: —

**ラベル**: —

**変更種別**: 👀 確認のみ

**想定工数**: —

**判断理由**: 目次のリンク先 3 件はすべてインライン取得結果にあり、RC-2・RC-3・RC-5 として評価した。概要自体に独立した修正要求は無い。

---

**識別子**: RC-2（GitHub id: 4510055616）

**レビュワー**: Copilot

**指摘箇所**: `base/src/components/forms/CartFormAnswer.vue:91`

**該当コード（レビュー時点の diff）**:

```diff
@@ -69,6 +70,38 @@ const showAlert = (message: string) => {
   isOpenAlert.value = true
 }
 
+const getOrderErrorMessage = (error: unknown): string | null => {
+  if (error instanceof FirebaseError && error.code === 'functions/failed-precondition') {
+    return getUserFacingFailedPreconditionMessage(error.message)
+  }
+  if (error instanceof Error) {
+    return getUserFacingFailedPreconditionMessage(error.message)
+  }
+  return null
+}
+
+type StageTarget = { event: { community_id: string; event_id: string } } | undefined
+
+// 売り切れ等の想定内の理由は warn、それ以外は error として記録する
+const reportStageError = (stage: FormFlowStage, error: unknown, item: StageTarget) => {
+  reportFormFlowError(error, {
+    component: 'CartFormAnswer',
+    stage,
+    target: item?.event,
+    severity: getOrderErrorMessage(error) != null ? 'warn' : 'error',
```

**レビュワーのコメント（原文）**:

[must] この `warn` 指定はサーバーで `client_severity` に保存されるだけで、Cloud Logging のレベルは `isClientErrorNoise` が決めています。売り切れの文言はその条件に含まれないため、想定内の売り切れも ERROR として記録されます。サーバー側で既知の注文制約エラーを限定して WARN に分類し、実際のログレベルを検証するテストを追加してください。

**コメント要約**:

1. 画面側で severity に warn を指定しても、Cloud Logging のレベルはサーバーの isClientErrorNoise が決める
2. `CartFormAnswer.vue` の reportStageError（売り切れ等を warn にする分岐）
3. 想定内の売り切れ等も ERROR として残り、調査対象の失敗に混ざる。コメントも実態と合わない
4. 理由を画面に出せる想定内の失敗は記録しないようにし、severity 指定をヘルパーから外した

**評価**: 🚨 必須修正

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🐛 実害

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: 指摘どおり client severity は client_severity として残るだけで、ログレベルには効かない。サーバー側の分類変更（clientErrorNoise と parse_logs.py の同期、ドキュメント更新）は functions に広がるため、本 PR では「getUserFacingFailedPreconditionMessage が返す想定内の失敗（売り切れ・上限・注文なし参加の制約）は記録しない」というクライアント側の修正で解消した。調査対象は理由不明の「送信できませんでした」系であり、理由を画面に出せる失敗は記録不要。あわせて reportFormFlowError から severity 引数を削除し、cart.vue の warn 指定も外した。

---

**識別子**: RC-3（GitHub id: 4510055642）

**レビュワー**: Copilot

**指摘箇所**: `base/src/components/forms/CartFormAnswer.vue:153`

**該当コード（レビュー時点の diff）**:

```diff
@@ -116,15 +149,21 @@ const loadOrderForm = async (isCancelled: () => boolean, preserveAlert = false)
   const item = cartItem.value
   if (item == null) {
     loading.value = false
+    // カート読み込み中（cart が null）は記録しない。読み込み後に対象が無いときだけ記録する
+    if (cart.value != null) {
```

**レビュワーのコメント（原文）**:

[must] 注文確定中に `in_cart` の購読から対象が消えると、Callable の応答・画面遷移より先に watch が再実行され、正常な注文にも `cart item not found` の ERROR が残ります。実際の読み込み失敗と混ざるため、少なくとも `saving` 中のカート消失は記録対象から除外してください。

**コメント要約**:

1. 注文確定で注文が ordered になると in_cart の購読から対象が消え、watch が再実行される
2. `CartFormAnswer.vue` の loadOrderForm（cart item not found の記録）
3. 正常な注文でも cart item not found が ERROR で残り、実際の失敗と混ざる
4. 処理中（saving）と注文確定後（orderConfirmed）の消失は記録しないようにした

**評価**: 🚨 必須修正

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🐛 実害

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: confirmOrderHandler はトランザクション commit 後に副作用を待ってから応答するため、Callable の応答より先にカート購読の更新が届く。saving 中と、confirmOrder 成功後に立てる非リアクティブなフラグ orderConfirmed で除外した。

---

**識別子**: RC-4（GitHub id: 4510041412）

**レビュワー**: Codex（chatgpt-codex-connector）

**指摘箇所**: `base/src/components/forms/CartFormAnswer.vue:154`

**該当コード（レビュー時点の diff）**:

```diff
@@ -116,15 +149,21 @@ const loadOrderForm = async (isCancelled: () => boolean, preserveAlert = false)
   const item = cartItem.value
   if (item == null) {
     loading.value = false
+    // カート読み込み中（cart が null）は記録しない。読み込み後に対象が無いときだけ記録する
+    if (cart.value != null) {
+      reportStageError('form_load', new Error('cart item not found'), undefined)
```

**レビュワーのコメント（原文）**:

**<sub><sub>![P2 Badge](https://img.shields.io/badge/P2-yellow?style=flat)</sub></sub>  注文確定による正常なカート消失をエラー記録から除外する**

注文確定後の Firestore 更新が Callable の応答より先に届くと、正常な注文でも `form_load` の ERROR が記録されます。`functions/default/src/memberOrders.ts` の `confirmOrderHandler` は注文を `ordered` に更新してから後続処理を待ちますが、`base/src/stores/currentUser.ts` のカート購読は `status == 'in_cart'` のみを対象としているため、その間に対象イベントがカートから消え、`cartItemKey` の watch がこの分岐を実行します。今回の目的である送信失敗の調査に成功時のログが混ざるため、注文確定中の正常な消失を区別して記録対象から除外してください。

Useful? React with 👍 / 👎.

<!-- codex-code-review-finding:v1 -->

**コメント要約**:

1. RC-3 と同じく、注文確定でカートから対象が消えると form_load の ERROR が記録される
2. `CartFormAnswer.vue` の loadOrderForm
3. 成功した注文のログが送信失敗の調査に混ざる
4. RC-3 と同じ修正（saving 中・確定後は記録しない）で解消

**評価**: 🟡 修正提案

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🐛 実害

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: 別レビュワーによる RC-3 と同内容の指摘（GitHub id が異なるため別 RC）。RC-3 の修正で解消した。

---

**識別子**: RC-5（GitHub id: 4510055656）

**レビュワー**: Copilot

**指摘箇所**: `base/src/components/forms/CartFormAnswer.vue:154`

**該当コード（レビュー時点の diff）**:

```diff
@@ -116,15 +149,21 @@ const loadOrderForm = async (isCancelled: () => boolean, preserveAlert = false)
   const item = cartItem.value
   if (item == null) {
     loading.value = false
+    // カート読み込み中（cart が null）は記録しない。読み込み後に対象が無いときだけ記録する
+    if (cart.value != null) {
+      reportStageError('form_load', new Error('cart item not found'), undefined)
```

**レビュワーのコメント（原文）**:

[must] 初回読み込みで `cart` が null から空カートや対象を含まないカートになっても、監視対象の `cartItemKey` は空文字のままです。immediate 実行時はこの条件が偽で、その後も watch が発火しないため、対象欠落が記録されません。181 行目の watch の監視対象を `[cartItemKey, () => cart.value != null]` に変更し、読み込み完了時にも検出してください。

**コメント要約**:

1. 初回読み込みで cart が null から「対象を含まないカート」になっても cartItemKey は空文字のまま
2. `CartFormAnswer.vue` の watch（監視対象が cartItemKey だけ）
3. immediate 実行時は cart が null で記録されず、その後 watch が発火しないため対象欠落が記録されない
4. watch の監視対象を [cartItemKey, () => cart.value != null] に変更した

**評価**: 🚨 必須修正

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🐛 実害

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: 指摘どおり。読み込み完了時に loadOrderForm が再実行されるが、表示は同じダイアログ（form_load_failed）が開き直るだけで、利用者に見える挙動は変わらない。

---

---

## 評価セッション（2026-11-09 16:00・review-comments-evaluate）

- **評価日時**: 2026-11-09 16:00 JST
- **評価者**: Claude Code（`/review-comments-evaluate` auto モード）
- **ブランチ名**: `fix/2490`
- **PR**: #2491（レビュー対象コミット `8e6573d9e`）
- **REVIEW_REQUEST_SINCE**: 2026-11-09T06:43:41Z（partial: false）
- **Outdated 除外件数**: 0（新規インラインなし）
- **レビュー非該当スキップ件数**: 3（レビュー依頼の定型文 6734003690、Codex「Didn't find any major issues」6734021280、Copilot の会話返信 6734038691（引用の後ろは「前回の3点は修正済み、新たな指摘なし」のみ））
- **重複除外**: なし

### RC 一覧（サマリ）

| 対応 | RC | GitHub id | 評価 | ステータス | PRスコープ | ラベル | 種別 | 工数 | 要約 |
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [x] | RC-6 | 5822449762 | 👌 修正不要 | — | — | — | 👀 確認のみ | — | Copilot の2周目レビュー概要。open issue は 0 件で、前回の3件（RC-2・RC-3・RC-5）は解消済みと判定<br>PR トップレベル（レビュー本文）<br>DEV ビルドでは送信されずテストもモックのため、sandbox で Cloud Logging への到達を確認してほしいという確認依頼のみ<br>コード修正の要求は無い。sandbox での到達確認は PR の確認事項（要確認）として残す |

---

**識別子**: RC-6（GitHub id: 5822449762）

**レビュワー**: Copilot（copilot-pull-request-reviewer）

**指摘箇所**: PR トップレベル（レビュー本文）

**該当コード（レビュー時点の diff）**:

（インライン指摘なし）

**レビュワーのコメント（原文）**:

<!-- ccr-overview-v2 -->

### 🔵 Needs a closer look

DEV ビルドでは送信されず、追加テストも reportClientError をモックしているため、sandbox での失敗再現と Cloud Logging への段階名・code・イベントパスの到達確認が必要です。

**No open issues** 🎉

<details>
<summary><strong>3 resolved since last review</strong></summary>

- <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.svg"><img src="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.png" alt="Medium severity" width="62" height="18" align="texttop"></picture> [初回読み込み完了時の対象欠落を監視する](https://github.com/nijuniinc/bokudeli-event-new/pull/2491#discussion_r4510055656)
- <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.svg"><img src="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.png" alt="Medium severity" width="62" height="18" align="texttop"></picture> [注文保存中のカート消失をエラーとして記録しない](https://github.com/nijuniinc/bokudeli-event-new/pull/2491#discussion_r4510055642)
- <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.svg"><img src="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.png" alt="Medium severity" width="62" height="18" align="texttop"></picture> [売り切れエラーをCloud LoggingでWARNに分類する](https://github.com/nijuniinc/bokudeli-event-new/pull/2491#discussion_r4510055616)
</details>

<sub>Review effort: Balanced</sub>

**コメント要約**:

1. Copilot の2周目レビュー概要。open issue は 0 件で、前回の3件（RC-2・RC-3・RC-5）は解消済みと判定
2. PR トップレベル（レビュー本文）
3. DEV ビルドでは送信されずテストもモックのため、sandbox で Cloud Logging への到達を確認してほしいという確認依頼のみ
4. コード修正の要求は無い。sandbox での到達確認は PR の確認事項（要確認）として残す

**評価**: 👌 修正不要

**ステータス**: —

**PRスコープ**: —

**ラベル**: —

**変更種別**: 👀 確認のみ

**想定工数**: —

**判断理由**: 概要のリンク先 3 件はすべて前セッションの RC で解消済み（RC-2・RC-3・RC-5）。残る指摘は sandbox での到達確認の依頼で、コード修正の要求ではない。reportClientError は DEV ビルドで送信しないため、確認は sandbox で失敗を起こして Cloud Logging を見る手作業になる。PR の確認事項に「要確認」として残す。
