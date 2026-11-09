# ブランチ feat/2492 レビュー記録

記録フォーマットは `review-xxxx_template.md` に従う。

### RC 一覧（サマリ）

| 対応 | RC | GitHub id | 評価 | ステータス | PRスコープ | ラベル | 種別 | 工数 | 要約 |
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [x] | RC-1 | なし | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 📏 規約 | 🔧 微修正 | S | 画面からフォーム関連 Callable を呼ばなくなった<br>`base/src/apis/form.ts` の読み取り系ラッパーが未使用のまま残る<br>未使用 export が残り、どれが現役か分かりにくい<br>クライアント側ラッパーを削除（サーバーの関数は旧クライアント向けに残す） |
| [x] | RC-2 | なし | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 📏 規約 | 🔧 微修正 | S | 回答保存の呼び出しを注文確定に統合した<br>`base/src/utils/reportFormFlowError.ts` の段階 `save_attempt` が使われない<br>使われない段階名が型に残る<br>型とテストから `save_attempt` を外す |
| [x] | RC-3 | なし | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 📄 ドキュメントのみ | S | 新しい画面は回答を同送する confirmOrder と新しい Rules が前提<br>`base/src/components/forms/CartFormAnswer.vue` の送信と読み込み<br>本番で画面のデプロイが先に終わると、その間フォーム付きイベントの注文と回答画面が失敗する<br>デプロイ順（Rules → Functions → 画面）を PR 本文に明記。リリース手順での判断事項 |
| [x] | RC-4 | 6735992724 | 🚨 必須修正 | 📤 #2494 別Issue化 | 📤 スコープ外 | 🔒 セキュリティ | 🆕 新機能 | — | 一般ユーザーが自分の members 文書に manager を書けるため、管理者として回答を読める<br>`firestore.rules` の `communities/{c}/members/{uid}` の本人 create と、`isManager()` で許可した form_responses の read<br>emulator で再現。#2493 より前からの穴で、旧 Callable（requireCommunityManager）やイベント更新・letters にも影響<br>members の本人 create を制限する別 Issue #2494 に切り出す（作成フローの変更を伴うため） |
| [x] | RC-5 | 5823546310 | 👌 修正不要 | — | — | — | 👀 確認のみ | — | Copilot review overview（指摘3件の目次）<br>リンク先 `#discussion_r4510936069` / `r4510936122` / `r4510936160` は RC-8 / RC-10 / RC-7 で評価済み<br>目次自体に追加の修正要求はない |
| [x] | RC-6 | 4510923787 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害, 👤 UX | 🔧 微修正 | S | プロフィール（users/{uid}）の読み込み前にカートが揃うと、本人の ID が空のまま固定される<br>`CartFormAnswer.vue` の `loadOrderForm`<br>回答画面を直接開いた・再読み込みしたときに読み込み失敗のまま注文できない<br>Auth の UID を優先して使い、watch の依存にも追加した |
| [x] | RC-7 | 4510936160 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害, 👤 UX | 🔧 微修正 | S | RC-6 と同じ。プロフィール読み込み前に空の UID を固定して本人の回答読み込みが失敗する<br>`CartFormAnswer.vue` の `loadOrderForm` と読み込み watch<br>直接アクセス・再読み込みで回答画面が開けず、プロフィール取得後も復旧しない<br>RC-6 と同じ修正（Auth の UID を優先、watch 依存に追加）で対応 |
| [x] | RC-8 | 4510936069 | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 💾 データ | 🔧 微修正 | S | 回答一覧の集計に渡す注文を、コミュニティ ID とイベント ID で絞っていない<br>`EventFormResponsesPanel.vue` の `responses`（注文の購読は event_id だけで絞る）<br>別コミュニティに同じイベント ID があれば確定・取消の判定を誤る（ID 衝突はまれ）<br>両 ID で絞ってから集計するよう修正 |
| [x] | RC-9 | 4510923794 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 💾 データ | 🔧 微修正 | S | 同送する回答にフォーム ID が無く、版番号だけで照合している<br>`OrderFormSubmissionSchema` と `buildAttemptFromSubmission`<br>確認中に同じ版番号の別フォーム（複製は版 1）へ差し替えると、表示していないフォームの回答として確定される<br>`source_form_id` を必須で同送し、設定中フォームと違えば version_mismatch で再読み込みさせる |
| [x] | RC-10 | 4510936122 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 💾 データ | 🔧 微修正 | S | RC-9 と同じ。`form_submission` にフォーム ID が無く、別フォームへの差し替えを検知できない<br>`common/src/apis/form.ts` とサーバーの検証<br>任意設問への空回答などが検証を通り、表示していないフォームの回答として保存される<br>RC-9 と同じ修正（`source_form_id` の同送と照合、不一致は version_mismatch）で対応 |
| [x] | RC-11 | 6736222780 | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 🔒 セキュリティ | 🔧 微修正 | S | RC-4 の続き。回答の read で manager 経路に親コミュニティのテナント判定が無い<br>`firestore.rules` の `form_responses`（`isManager()` の許可）<br>#2494 が直るまで、企業テナント外のユーザーが自分を manager にすれば企業コミュニティの回答を読める<br>manager 経路に `canReadParentCommunity()` を追加し、テナント外 manager が読めない Rules テストを追加 |

---

## 評価セッション（2026-11-09 17:55・shokujii-code-review）

- **評価日時**: 2026-11-09 17:55 JST
- **評価者**: Claude Code（`/shokujii-code-review`）
- **ブランチ名**: `feat/2492`
- **PR**: 未作成
- **Outdated 除外件数**: 該当なし
- **レビュー非該当スキップ件数**: 該当なし
- **重複除外**: なし

### RC 一覧（サマリ）

| 対応 | RC | GitHub id | 評価 | ステータス | PRスコープ | ラベル | 種別 | 工数 | 要約 |
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [x] | RC-1 | なし | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 📏 規約 | 🔧 微修正 | S | 画面からフォーム関連 Callable を呼ばなくなった<br>`base/src/apis/form.ts` の読み取り系ラッパーが未使用のまま残る<br>未使用 export が残り、どれが現役か分かりにくい<br>クライアント側ラッパーを削除（サーバーの関数は旧クライアント向けに残す） |
| [x] | RC-2 | なし | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 📏 規約 | 🔧 微修正 | S | 回答保存の呼び出しを注文確定に統合した<br>`base/src/utils/reportFormFlowError.ts` の段階 `save_attempt` が使われない<br>使われない段階名が型に残る<br>型とテストから `save_attempt` を外す |
| [x] | RC-3 | なし | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害 | 📄 ドキュメントのみ | S | 新しい画面は回答を同送する confirmOrder と新しい Rules が前提<br>`base/src/components/forms/CartFormAnswer.vue` の送信と読み込み<br>本番で画面のデプロイが先に終わると、その間フォーム付きイベントの注文と回答画面が失敗する<br>デプロイ順（Rules → Functions → 画面）を PR 本文に明記。リリース手順での判断事項 |

---

**識別子**: RC-1（GitHub id: なし・エージェントレビュー）

**レビュワー**: Claude Code（shokujii-code-review）

**指摘箇所**: `base/src/apis/form.ts:1`

**該当コード（レビュー時点の diff）**:

```diff
 export const getOrderFormForCart = (input: GetOrderFormForCartRequest) => {
   const f = httpsCallable<GetOrderFormForCartRequest, GetOrderFormForCartResponse>(functions, 'getOrderFormForCart')
   return f(input)
 }
（listCommunityForms / getCommunityForm / getEventFormPresence / getEventFormConfig / saveOrderFormAttempt / listEventFormResponses / getEventFormResponse も同様に呼び出し元なし）
```

**レビュワーのコメント（原文）**:

🟡 **修正提案** [🔧微修正/S]: `base/src/apis/form.ts` の `getOrderFormForCart` / `saveOrderFormAttempt` / `listCommunityForms` / `getEventFormConfig` / `getEventFormPresence` / `listEventFormResponses` / `getCommunityForm` を、画面側でもう使っていません → 未使用のクライアント側ラッパーを削除します（サーバーの関数は古いクライアント向けに残します）。

**コメント要約**: 画面からフォーム関連 Callable を呼ばなくなった。`base/src/apis/form.ts` の読み取り系ラッパーが未使用のまま残る。未使用 export が残り、どれが現役か分かりにくい。クライアント側ラッパーを削除（サーバーの関数は旧クライアント向けに残す）。

**評価**: 🟡 修正提案

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 📏 規約

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: 置換後に未使用 export を残さない規約。サーバー側 Callable は古いバンドルのブラウザ向けに残すため削除しない。

---

**識別子**: RC-2（GitHub id: なし・エージェントレビュー）

**レビュワー**: Claude Code（shokujii-code-review）

**指摘箇所**: `base/src/utils/reportFormFlowError.ts:10`

**該当コード（レビュー時点の diff）**:

```diff
 export type FormFlowStage =
   | 'form_presence'
   | 'cart_gate'
   | 'form_load'
   | 'order_gate'
   | 'save_attempt'
   | 'stripe_checkout'
   | 'confirm_order'
```

**レビュワーのコメント（原文）**:

🟡 **修正提案** [🔧微修正/S]: `reportFormFlowError.ts` の段階 `save_attempt` が使われなくなりました → 型から外します。

**コメント要約**: 回答保存の呼び出しを注文確定に統合した。`base/src/utils/reportFormFlowError.ts` の段階 `save_attempt` が使われない。使われない段階名が型に残る。型とテストから `save_attempt` を外す。

**評価**: 🟡 修正提案

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 📏 規約

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: 回答の不備は画面とサーバーの検証で項目ごとに表示するため、保存段階の失敗記録は不要になった。

---

**識別子**: RC-3（GitHub id: なし・エージェントレビュー）

**レビュワー**: Claude Code（shokujii-code-review）

**指摘箇所**: `base/src/components/forms/CartFormAnswer.vue:166`

**該当コード（レビュー時点の diff）**:

```diff
+    // 設定・設問・本人の回答を Firestore から直接読む（Functions のコールドスタートを避ける。#2492）
+    const loaded = await runStage('form_load', item, async () => {
+      const { community_id: communityId, event_id: eventId } = item.event
+      const reference = isEnterpriseEvent ? null : await fetchEventFormReference(communityId, eventId)
...
-        form_attempt_id: attemptId,
+        form_submission: submission,
```

**レビュワーのコメント（原文）**:

🟡 **修正提案** [📋仕様追加/M]: 新しい画面は「回答を同送する confirmOrder」と「新しいルール」を前提にしています。本番で画面のデプロイが Functions やルールより先に終わると、その数分間はフォーム付きイベントの注文が失敗します → デプロイ順序（ルール → Functions → 画面）を PR に明記します。リリース手順で判断する事項なので、自動では修正しません。

**コメント要約**: 新しい画面は回答を同送する confirmOrder と新しい Rules が前提。`base/src/components/forms/CartFormAnswer.vue` の送信と読み込み。本番で画面のデプロイが先に終わると、その間フォーム付きイベントの注文と回答画面が失敗する。デプロイ順（Rules → Functions → 画面）を PR 本文に明記。リリース手順での判断事項。

**評価**: 🟡 修正提案

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🐛 実害

**変更種別**: 📄 ドキュメントのみ

**想定工数**: S

**判断理由**: 逆方向（古い画面 + 新しい Functions）は `form_attempt_id` 経路を残しているため動く。新しい画面が先に出る短い間だけが問題で、コードでの吸収は互換層を増やすため行わず、リリース時のデプロイ順で避ける。

---

## 評価セッション（2026-11-09 18:20・review-comments-evaluate）

- **評価日時**: 2026-11-09 18:20 JST
- **評価者**: Claude Code（`/review-comments-evaluate` auto）
- **ブランチ名**: `feat/2492`
- **PR**: #2493
- **REVIEW_REQUEST_SINCE**: 2026-11-09T08:45:39Z（partial: false）
- **Outdated 除外件数**: 0
- **レビュー非該当スキップ件数**: 3（6735884376 レビュー依頼の定型文 / 6735889722 Codex Review Summary の定型 / 5823531228 Codex レビュー本文の接続案内のみ）
- **重複除外**: なし

### RC 一覧（サマリ）

| 対応 | RC | GitHub id | 評価 | ステータス | PRスコープ | ラベル | 種別 | 工数 | 要約 |
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [x] | RC-4 | 6735992724 | 🚨 必須修正 | 📤 #2494 別Issue化 | 📤 スコープ外 | 🔒 セキュリティ | 🆕 新機能 | — | 一般ユーザーが自分の members 文書に manager を書けるため、管理者として回答を読める<br>`firestore.rules` の `communities/{c}/members/{uid}` の本人 create と、`isManager()` で許可した form_responses の read<br>emulator で再現。#2493 より前からの穴で、旧 Callable（requireCommunityManager）やイベント更新・letters にも影響<br>members の本人 create を制限する別 Issue #2494 に切り出す（作成フローの変更を伴うため） |
| [x] | RC-5 | 5823546310 | 👌 修正不要 | — | — | — | 👀 確認のみ | — | Copilot review overview（指摘3件の目次）<br>リンク先 `#discussion_r4510936069` / `r4510936122` / `r4510936160` は RC-8 / RC-10 / RC-7 で評価済み<br>目次自体に追加の修正要求はない |
| [x] | RC-6 | 4510923787 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害, 👤 UX | 🔧 微修正 | S | プロフィール（users/{uid}）の読み込み前にカートが揃うと、本人の ID が空のまま固定される<br>`CartFormAnswer.vue` の `loadOrderForm`<br>回答画面を直接開いた・再読み込みしたときに読み込み失敗のまま注文できない<br>Auth の UID を優先して使い、watch の依存にも追加した |
| [x] | RC-7 | 4510936160 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 🐛 実害, 👤 UX | 🔧 微修正 | S | RC-6 と同じ。プロフィール読み込み前に空の UID を固定して本人の回答読み込みが失敗する<br>`CartFormAnswer.vue` の `loadOrderForm` と読み込み watch<br>直接アクセス・再読み込みで回答画面が開けず、プロフィール取得後も復旧しない<br>RC-6 と同じ修正（Auth の UID を優先、watch 依存に追加）で対応 |
| [x] | RC-8 | 4510936069 | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 💾 データ | 🔧 微修正 | S | 回答一覧の集計に渡す注文を、コミュニティ ID とイベント ID で絞っていない<br>`EventFormResponsesPanel.vue` の `responses`（注文の購読は event_id だけで絞る）<br>別コミュニティに同じイベント ID があれば確定・取消の判定を誤る（ID 衝突はまれ）<br>両 ID で絞ってから集計するよう修正 |
| [x] | RC-9 | 4510923794 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 💾 データ | 🔧 微修正 | S | 同送する回答にフォーム ID が無く、版番号だけで照合している<br>`OrderFormSubmissionSchema` と `buildAttemptFromSubmission`<br>確認中に同じ版番号の別フォーム（複製は版 1）へ差し替えると、表示していないフォームの回答として確定される<br>`source_form_id` を必須で同送し、設定中フォームと違えば version_mismatch で再読み込みさせる |
| [x] | RC-10 | 4510936122 | 🚨 必須修正 | ✅ 対応済み | 📌 スコープ内 | 💾 データ | 🔧 微修正 | S | RC-9 と同じ。`form_submission` にフォーム ID が無く、別フォームへの差し替えを検知できない<br>`common/src/apis/form.ts` とサーバーの検証<br>任意設問への空回答などが検証を通り、表示していないフォームの回答として保存される<br>RC-9 と同じ修正（`source_form_id` の同送と照合、不一致は version_mismatch）で対応 |

---

**識別子**: RC-4（GitHub id: 6735992724）

**レビュワー**: Copilot

**指摘箇所**: PR トップレベル（`firestore.rules:357` を指摘）

**該当コード（レビュー時点の diff）**:

（インライン指摘なし）

**レビュワーのコメント（原文）**:

🚨 **必須修正** [🔧微修正/S] — `firestore.rules:357` で `isManager()` のみを根拠に回答を読めるため、別テナントのコミュニティでも回答一覧を取得できます。既存の `members/{uid}` 作成ルール（同ファイル 373 行付近）は本人による manager ロールの自己設定を制限していないため、この認可経路は実際に到達可能です。manager 経路にも `canReadParentCommunity()` を適用し、別テナント manager が読めない Rules テストを追加してください（本人・サポートの許可は維持）。

**コメント要約**: 一般ユーザーが自分の members 文書に manager を書けるため、管理者として回答を読める `firestore.rules` の `communities/{c}/members/{uid}` の本人 create と、`isManager()` で許可した form_responses の read emulator で再現。#2493 より前からの穴で、旧 Callable（requireCommunityManager）やイベント更新・letters にも影響 members の本人 create を制限する別 Issue #2494 に切り出す（作成フローの変更を伴うため）

**評価**: 🚨 必須修正

**ステータス**: 📤 #2494 別Issue化

**PRスコープ**: 📤 スコープ外

**ラベル**: 🔒 セキュリティ

**変更種別**: 🆕 新機能

**想定工数**: —

**判断理由**: emulator で「一般ユーザーが `{ roles: ["manager"] }` を自分で作成 → 他人の回答を get」が成功することを確認した。原因は members の本人 create に中身の制限が無いこと（#2493 以前から）。Copilot 案の `canReadParentCommunity()` 追加では同一テナント内の昇格を防げない。コミュニティ作成時に作成者が自分へ manager を書く既存フローがあり、影響範囲の確認と作成フローの変更が必要なため、自動修正の対象外として #2494 に切り出した。旧 Callable も同じ members 文書で判定しているため、本 PR で露出が広がるわけではない。

---

**識別子**: RC-5（GitHub id: 5823546310）

**レビュワー**: Copilot

**指摘箇所**: PR トップレベル（レビュー本文）

**該当コード（レビュー時点の diff）**:

（インライン指摘なし）

**レビュワーのコメント（原文）**:

<!-- ccr-overview-v2 -->

### 🟡 Changes recommended

フォームID未照合による別フォームへの回答保存、集計対象のコミュニティ・イベント未限定による注文状態の誤判定、プロフィール取得前のUID固定による回答読み込み失敗が残っています。

<details open>
<summary><strong>3 open issues</strong></summary>

- <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/high-v2-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/high-v2-light.svg"><img src="https://github.githubassets.com/static/images/icons/copilot-code-review/high-v2-light.png" alt="High severity" width="62" height="18" align="texttop"></picture> [注文集計でコミュニティIDとイベントIDを絞り込んでいない](https://github.com/nijuniinc/bokudeli-event-new/pull/2493#discussion_r4510936069) · New
- <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/high-v2-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/high-v2-light.svg"><img src="https://github.githubassets.com/static/images/icons/copilot-code-review/high-v2-light.png" alt="High severity" width="62" height="18" align="texttop"></picture> [回答送信時にフォームIDを照合していない](https://github.com/nijuniinc/bokudeli-event-new/pull/2493#discussion_r4510936122) · New
- <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-dark.svg"><source media="(prefers-color-scheme: light)" srcset="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.svg"><img src="https://github.githubassets.com/static/images/icons/copilot-code-review/medium-v2-light.png" alt="Medium severity" width="62" height="18" align="texttop"></picture> [プロフィール読み込み中にAuthのUIDを使っていない](https://github.com/nijuniinc/bokudeli-event-new/pull/2493#discussion_r4510936160) · New
</details>

<details>
<summary><strong>What changed in this PR</strong></summary>

フォーム関連4画面の読み取りを Firestore 直接取得へ移し、注文確定時に回答を同送することで、Functions のコールドスタートによる待ち時間を減らす変更です。旧クライアント向けの Callable と `form_attempt_id` 経路は維持しています。

**変更内容:**
- フォームの読み取り store を追加し、カート・イベント編集・回答一覧・回答画面へ適用しています。
- 回答の初期値と一覧集計を共通化し、注文確定時の回答検証・保存を統合しています。
- Firestore Rules と権限テスト、仕様書を直接読み取りに合わせて更新しています。

| File | Description |
| ---- | ----------- |
| `user/​src/​components/​manage/​event/​member.vue` | 回答一覧へ注文データを渡します。 |
| `tests/​firestore-rules/​src/​formCollections.test.ts` | フォーム・回答・下書きの読み取り権限を検証します。 |
| `functions/​default/​src/​utils/​formConfirm.ts` | 同送回答の検証と未保存の試行生成を追加します。 |
| `functions/​default/​src/​utils/​formConfirm.test.ts` | 同送回答の正常系・不備・版違いを検証します。 |
| `functions/​default/​src/​utils/​formAccess.ts` | 同送回答の入力解析を追加します。 |
| `functions/​default/​src/​stripe.ts` | Checkout 開始時に同送回答を処理します。 |
| `functions/​default/​src/​stores/​form.ts` | 保存前の試行 ID 発行を追加します。 |
| `functions/​default/​src/​memberOrders.ts` | 注文確定時に同送回答を処理します。 |
| `functions/​default/​src/​formOrder.ts` | 回答初期値の生成を共通処理へ移します。 |
| `functions/​default/​src/​formAdmin.ts` | フォーム要約と回答一覧の生成を共通化します。 |
| `firestore.rules` | テナント・本人・管理権限に応じた読み取りを許可します。 |
| `documents/​レビューコメント/​review-feat-2492.md` | セルフレビューと対応内容を記録します。 |
| `documents/​02_主催者獲得と継続/​01_フォーム機能_Issue957更新案.md` | 読み取り権限と回答送信経路の仕様を更新します。 |
| `common/​src/​utils/​orderFormAnswers.ts` | 回答初期値と参加状態別の一覧生成を共通化します。 |
| `common/​src/​utils/​orderFormAnswers.test.ts` | 初期値の優先順位と一覧集計を検証します。 |
| `common/​src/​utils/​communityFormSummary.ts` | フォーム選択用の要約を生成します。 |
| `common/​src/​apis/​stripe.ts` | Checkout リクエストへ同送回答の型を追加します。 |
| `common/​src/​apis/​order.ts` | 注文確定リクエストへ同送回答の型を追加します。 |
| `common/​src/​apis/​form.ts` | 同送回答と検証エラー詳細のスキーマを追加します。 |
| `base/​src/​utils/​reportFormFlowError.ts` | 廃止した回答保存段階をエラー分類から除きます。 |
| `base/​src/​utils/​reportFormFlowError.test.ts` | エラー分類の変更にテストを合わせます。 |
| `base/​src/​utils/​orderFormInvalidError.ts` | サーバーの回答検証エラーを解析します。 |
| `base/​src/​utils/​orderFormInvalidError.test.ts` | 回答検証エラーの識別を検証します。 |
| `base/​src/​stores/​eventForm.ts` | フォーム設定・設問・回答・下書きを直接取得します。 |
| `base/​src/​stores/​community.ts` | フォーム converter を再利用可能にします。 |
| `base/​src/​components/​pages/​cart.vue` | フォーム有無の判定を直接取得へ切り替えます。 |
| `base/​src/​components/​manage/​event/​EventFormResponsesPanel.vue` | 回答を直接取得し、注文データと集計します。 |
| `base/​src/​components/​forms/​CartFormAnswer.vue` | 直接読み取り・画面内検証・回答同送へ切り替えます。 |
| `base/​src/​components/​EventEdit.vue` | 既存フォーム購読と設定の直接取得を利用します。 |
| `base/​src/​apis/​form.ts` | 不要になったクライアント側 Callable ラッパーを削除します。 |
</details>

<sub>Review effort: Balanced</sub>

**コメント要約**: Copilot review overview（指摘3件の目次） リンク先 `#discussion_r4510936069` / `r4510936122` / `r4510936160` は RC-8 / RC-10 / RC-7 で評価済み 目次自体に追加の修正要求はない

**評価**: 👌 修正不要

**ステータス**: —

**PRスコープ**: —

**ラベル**: —

**変更種別**: 👀 確認のみ

**想定工数**: —

**判断理由**: リンク先 3 件はすべてインライン取得結果にあり、RC-7・RC-8・RC-10 で評価・対応した。目次そのものに修正要求は無い。

---

**識別子**: RC-6（GitHub id: 4510923787）

**レビュワー**: Codex

**指摘箇所**: `base/src/components/forms/CartFormAnswer.vue:163`

**該当コード（レビュー時点の diff）**:

```diff
@@ -155,20 +160,37 @@ const loadOrderForm = async (isCancelled: () => boolean, preserveAlert = false)
     showAlert($t('cart.form_load_failed'))
     return
   }
+  const userId = currentUser.value?.id ?? ''
```

**レビュワーのコメント（原文）**:

**<sub><sub>![P2 Badge](https://img.shields.io/badge/P2-yellow?style=flat)</sub></sub>  Firestore のユーザー文書の読み込み前でも認証 UID を使う**

回答画面を直接開き、ユーザー文書より先にカートの購読が完了した場合、`currentUser` はまだ `null` のため、ここで空の UID が固定されます。`useCurrentUserStore` のカート購読は Firebase Auth の UID で開始できる一方、`user` は別の非同期購読なので、この順序は発生し得ます。その後ユーザー文書が読み込まれても、読み込み用の `watch` はカートのキーと読み込み完了状態しか監視しておらず再実行されないため、フォーム取得失敗のまま注文できません。認証済みの UID を利用するか、ユーザーの読み込み完了を待って再取得してください。

Useful? React with 👍 / 👎.

<!-- codex-code-review-finding:v1 -->

**コメント要約**: プロフィール（users/{uid}）の読み込み前にカートが揃うと、本人の ID が空のまま固定される `CartFormAnswer.vue` の `loadOrderForm` 回答画面を直接開いた・再読み込みしたときに読み込み失敗のまま注文できない Auth の UID を優先して使い、watch の依存にも追加した

**評価**: 🚨 必須修正

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🐛 実害, 👤 UX

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: カートは Auth の UID で購読されるため、プロフィールより先に揃うことがある。旧実装は Callable 側で `request.auth.uid` を使っていたので起きなかった回帰。`firebaseUser.uid` を優先し、UID の確定を watch 依存に加えた。

---

**識別子**: RC-7（GitHub id: 4510936160）

**レビュワー**: Copilot

**指摘箇所**: `base/src/components/forms/CartFormAnswer.vue:163`

**該当コード（レビュー時点の diff）**:

```diff
@@ -155,20 +160,37 @@ const loadOrderForm = async (isCancelled: () => boolean, preserveAlert = false)
     showAlert($t('cart.form_load_failed'))
     return
   }
+  const userId = currentUser.value?.id ?? ''
```

**レビュワーのコメント（原文）**:

[must] 認証済みでも `users/{uid}` の購読が未完了なら `currentUser` は null です。カートは Auth の UID で独立して読み込まれるため、回答画面への直接アクセス・再読み込みでカートが先に揃うと、ここで空文字を固定して後続の読み込みが失敗します。watch の依存にも `currentUser` がないため、プロフィール取得後も復旧しません。Firestore の本人向け読み取りには、プロフィールの読み込みを待たずに確定している Auth の UID をフォールバックしてください。

**コメント要約**: RC-6 と同じ。プロフィール読み込み前に空の UID を固定して本人の回答読み込みが失敗する `CartFormAnswer.vue` の `loadOrderForm` と読み込み watch 直接アクセス・再読み込みで回答画面が開けず、プロフィール取得後も復旧しない RC-6 と同じ修正（Auth の UID を優先、watch 依存に追加）で対応

**評価**: 🚨 必須修正

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🐛 実害, 👤 UX

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: RC-6 と同一の不具合を別レビュワーが指摘（別 GitHub id のため別 RC）。同じ修正で解消。

---

**識別子**: RC-8（GitHub id: 4510936069）

**レビュワー**: Copilot

**指摘箇所**: `base/src/components/manage/event/EventFormResponsesPanel.vue:92`

**該当コード（レビュー時点の diff）**:

```diff
…（diff 先頭省略・25 行）
-  const formId = configResponse.data.config?.source_form_id ?? ''
-  if (formId === '') {
-    return null
-  }
-  const formResponse = await getCommunityForm({ community_id: communityId, form_id: formId })
-  const form = formResponse.data.form
-  return {
-    name: form.name,
-    description: form.description,
-    fields: omitHiddenFormFields(form.fields),
-  }
-}
-
+// 設定・設問・回答を Firestore から直接読み、注文状態と組み合わせて画面で集計する（Functions を経由しない。#2492）
 watch(
   () => [props.event.community_id, props.event.event_id, props.event.enterprise_id, retryKey.value],
   async (_key, _previousKey, onCleanup) => {
     let cancelled = false
     onCleanup(() => {
       cancelled = true
     })
-    responses.value = []
+    rawResponses.value = []
     assignedForm.value = null
     selected.value = null
     previewOpen.value = false
     loadFailed.value = false
-    loading.value = false
+    fetching.value = false
     if (props.event.enterprise_id != null && props.event.enterprise_id !== '') return
-    loading.value = true
+    fetching.value = true
     try {
-      const [ordered, canceled, form] = await Promise.all([
-        listEventFormResponses({
-          community_id: props.event.community_id,
-          event_id: props.event.event_id,
-          filter: 'confirmed',
-        }),
-        listEventFormResponses({
-          community_id: props.event.community_id,
-          event_id: props.event.event_id,
-          filter: 'canceled',
-        }),
-        loadAssignedForm(props.event.community_id, props.event.event_id),
+      // フォームが未設定でも、過去に設定していたときの回答は一覧に出す
+      const [reference, loaded] = await Promise.all([
+        fetchEventFormReference(props.event.community_id, props.event.event_id),
+        fetchEventFormResponses(props.event.community_id, props.event.event_id),
       ])
       if (!cancelled) {
-        responses.value = [...ordered.data.responses, ...canceled.data.responses]
-        assignedForm.value = form
+        rawResponses.value = loaded
+        assignedForm.value =
+          reference == null
+            ? null
+            : {
+                name: reference.form.name,
+                description: reference.form.description,
+                fields: omitHiddenFormFields(reference.form.fields),
+              }
       }
     } catch {
       if (!cancelled) loadFailed.value = true
     } finally {
-      if (!cancelled) loading.value = false
+      if (!cancelled) fetching.value = false
     }
   },
   { immediate: true },
 )
 
+const loading = computed(() => fetching.value || props.orders == null)
+
+/** 参加確定 → 取消の順。名前はユーザー store から引く（読み込み中は user_id） */
+const responses = computed<EventFormResponseListItem[]>(() => {
+  const rows = buildEventFormResponseRows({
+    responses: rawResponses.value,
+    orders: props.orders ?? [],
```

**レビュワーのコメント（原文）**:

[must] 集計前に注文を対象の `community_id` と `event_id` で絞ってください。`eventStore.orders` の購読はコミュニティを限定しないため（`base/src/stores/event.ts:553–560`）、同じイベント ID の別コミュニティに同じユーザーの確定注文があると、対象イベントでは取消済みでも一覧と CSV で「確定」と判定されます。ここで両 ID を照合すれば、旧 Callable と同じ集計範囲を保てます。

**コメント要約**: 回答一覧の集計に渡す注文を、コミュニティ ID とイベント ID で絞っていない `EventFormResponsesPanel.vue` の `responses`（注文の購読は event_id だけで絞る） 別コミュニティに同じイベント ID があれば確定・取消の判定を誤る（ID 衝突はまれ） 両 ID で絞ってから集計するよう修正

**評価**: 🟡 修正提案

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 💾 データ

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: イベント ID は自動 ID で衝突は現実的には起きにくいため 🟡 とした。旧 Callable はパスで限定していたので、同じ範囲に揃える数行の修正で対応した。

---

**識別子**: RC-9（GitHub id: 4510923794）

**レビュワー**: Codex

**指摘箇所**: `common/src/apis/form.ts:198`

**該当コード（レビュー時点の diff）**:

```diff
@@ -192,6 +192,40 @@ export type SaveOrderFormAttemptResponse = {
   issues?: FormValidationIssue[]
 }
 
+/** 注文確定（confirmOrder / createStripeCheckoutSession）に一緒に渡すフォーム回答 */
+export const OrderFormSubmissionSchema = z.object({
+  definition_version: z.number().int().positive(),
+  answers: z.array(FormAnswerInputSchema).max(FORM_FIELD_LIMITS.maxFields),
```

**レビュワーのコメント（原文）**:

**<sub><sub>![P2 Badge](https://img.shields.io/badge/P2-yellow?style=flat)</sub></sub>  同送する回答にフォーム ID を含めて照合する**

回答者が注文確認ダイアログを開いた後、管理者がイベントのフォームを同じ版番号の複製フォームへ差し替えると、旧フォームへの回答が新フォームの回答として確定されます。`duplicateCommunityForm` は設問・選択肢 ID を維持して版番号を 1 に戻すため、版番号と回答項目だけの検証では別フォームを識別できません。変更前は保存済み試行の `source_form_id` を `requireAttemptForLatestForm` で照合して、このタイミングの差し替えを拒否していました。`form_submission` に表示時のフォーム ID も含め、現在の参照先と異なる場合は再読み込みを要求してください。

Useful? React with 👍 / 👎.

<!-- codex-code-review-finding:v1 -->

**コメント要約**: 同送する回答にフォーム ID が無く、版番号だけで照合している `OrderFormSubmissionSchema` と `buildAttemptFromSubmission` 確認中に同じ版番号の別フォーム（複製は版 1）へ差し替えると、表示していないフォームの回答として確定される `source_form_id` を必須で同送し、設定中フォームと違えば version_mismatch で再読み込みさせる

**評価**: 🚨 必須修正

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 💾 データ

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: 旧経路は保存済み試行の `source_form_id` を `requireAttemptForLatestForm` で照合していたため、回帰にあたる。スキーマに `source_form_id` を追加し、サーバーで不一致を version_mismatch として返す。テストを追加した。

---

**識別子**: RC-10（GitHub id: 4510936122）

**レビュワー**: Copilot

**指摘箇所**: `common/src/apis/form.ts:199`

**該当コード（レビュー時点の diff）**:

```diff
@@ -192,6 +192,40 @@ export type SaveOrderFormAttemptResponse = {
   issues?: FormValidationIssue[]
 }
 
+/** 注文確定（confirmOrder / createStripeCheckoutSession）に一緒に渡すフォーム回答 */
+export const OrderFormSubmissionSchema = z.object({
+  definition_version: z.number().int().positive(),
+  answers: z.array(FormAnswerInputSchema).max(FORM_FIELD_LIMITS.maxFields),
+})
```

**レビュワーのコメント（原文）**:

[must] `form_submission` に `source_form_id` も含め、サーバーで設定中フォームの ID と照合してください。版番号はフォームごとの値なので、回答表示後や確認ダイアログ表示中に同じ版番号の別フォームへ差し替えると、任意設問への空回答などが検証を通り、表示していないフォームへの回答として保存されます。フォーム ID の不一致も `version_mismatch` として返し、回答画面を再読み込みできるようにしてください。

**コメント要約**: RC-9 と同じ。`form_submission` にフォーム ID が無く、別フォームへの差し替えを検知できない `common/src/apis/form.ts` とサーバーの検証 任意設問への空回答などが検証を通り、表示していないフォームの回答として保存される RC-9 と同じ修正（`source_form_id` の同送と照合、不一致は version_mismatch）で対応

**評価**: 🚨 必須修正

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 💾 データ

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: RC-9 と同一の指摘を別レビュワーが指摘（別 GitHub id のため別 RC）。同じ修正で解消。

---

## 評価セッション（2026-11-09 18:35・review-comments-evaluate）

- **評価日時**: 2026-11-09 18:35 JST
- **評価者**: Claude Code（`/review-comments-evaluate` auto・2周目）
- **ブランチ名**: `feat/2492`
- **PR**: #2493
- **REVIEW_REQUEST_SINCE**: 2026-11-09T09:01:46Z（partial: false）
- **Outdated 除外件数**: 0
- **レビュー非該当スキップ件数**: 2（6736162959 レビュー依頼の定型文 / 6736207980 Codex「Didn't find any major issues」）
- **重複除外**: なし

### RC 一覧（サマリ）

| 対応 | RC | GitHub id | 評価 | ステータス | PRスコープ | ラベル | 種別 | 工数 | 要約 |
|:----:|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [x] | RC-11 | 6736222780 | 🟡 修正提案 | ✅ 対応済み | 📌 スコープ内 | 🔒 セキュリティ | 🔧 微修正 | S | RC-4 の続き。回答の read で manager 経路に親コミュニティのテナント判定が無い<br>`firestore.rules` の `form_responses`（`isManager()` の許可）<br>#2494 が直るまで、企業テナント外のユーザーが自分を manager にすれば企業コミュニティの回答を読める<br>manager 経路に `canReadParentCommunity()` を追加し、テナント外 manager が読めない Rules テストを追加 |

---

**識別子**: RC-11（GitHub id: 6736222780）

**レビュワー**: Copilot

**指摘箇所**: PR トップレベル（`firestore.rules:357` を指摘）

**該当コード（レビュー時点の diff）**:

（インライン指摘なし）

**レビュワーのコメント（原文）**:

🚨 **必須修正** `firestore.rules:357` — `form_responses` の `isManager()` 許可に `canReadParentCommunity()` がなく、企業テナント外でも manager 判定だけで回答を読めます。`communities/{community}/members/{memberId}` の本人 create では本人が `roles` を設定できるため、この経路は到達可能です。manager 経路にも親コミュニティのテナント判定を適用し、テナント外 manager の Rules テストを追加してください。既存の #2494 の manager 自己設定問題に関連しますが、この直接 read ルール側にも境界が必要です。

**コメント要約**: RC-4 の続き。回答の read で manager 経路に親コミュニティのテナント判定が無い `firestore.rules` の `form_responses`（`isManager()` の許可） #2494 が直るまで、企業テナント外のユーザーが自分を manager にすれば企業コミュニティの回答を読める manager 経路に `canReadParentCommunity()` を追加し、テナント外 manager が読めない Rules テストを追加

**評価**: 🟡 修正提案

**ステータス**: ✅ 対応済み

**PRスコープ**: 📌 スコープ内

**ラベル**: 🔒 セキュリティ

**変更種別**: 🔧 微修正

**想定工数**: S

**判断理由**: RC-4 の続き。増えた点は、#2494（manager の自己設定）とは別に、直接 read のルール側にもテナント境界を求めていること。根本原因は #2494 で直すため 🟡 とした。条件 1 つの追加で、正規の manager（PF、または同じ企業テナント）とサポート・本人の読み取りは変わらないことを Rules テストで確認したため、本 PR で対応した。
