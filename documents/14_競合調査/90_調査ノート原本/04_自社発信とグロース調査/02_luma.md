# Luma(lu.ma → luma.com)の自社発信とグロースの相関

調査日: 2026-10-16。対象は Victor Pontis と Danqing Liu が 2020 年に創業したイベント・RSVP ツールの Luma(Luma AI / lumalabs.ai ではない)。既知事項は [02_グロースストーリー調査/03_luma_partiful_posh.md](../02_グロースストーリー調査/03_luma_partiful_posh.md) の `## 1. Luma` を引き継ぎ、本ファイルは「自社による発信の量・時期」と「成長指標の推移」の照合に絞る。

記法: [事実]=出典で確認 / [推測]=解釈 / [不明]=確認できず(推測で埋めない) / [自社主張]=Luma 自身または創業者の発言 / [二次]=報道・第三者 / [要約]=検索結果の要約のみで原典を直接読めていない / [要確認]=出典間で食い違う / [推計]=第三者ツールの推計値。

## 0. 取得上の制約(取れなかったページ)

- **Wayback Machine(web.archive.org)と archive.ph は本環境から取得不可**(WebFetch がドメインを拒否、`curl` も実行許可が下りなかった)。したがって **SNS フォロワー数の過去スナップショットは全て [不明]**。本ファイルのフォロワー数は 2026-10-16 の現在値のみ。
- **X(Twitter)**: x.com はログイン壁(HTTP 402)、syndication.twitter.com は空応答、Nitter は 2026-08〜09 に X Corp. から停止要求を受け停止中(nitter.net の 2026-10-10 告知)、xcancel.com は HTTP 451、Social Blade は 403。**@LumaHQ・@vpontis・@danliu のフォロワー数・開設日・投稿頻度は [不明]**。
- TikTok(JS 描画のみ)、YouTube(@lumahq の About はタイトル「LumaHQ - YouTube」しか取れず登録者数 [不明])、Notion の City Lead 募集ページ(JS 描画のみ)、AppFollow(タイムアウト)、Semrush の 2025-05 版ページ(404。検索要約のみ)。
- WebSearch は 25 回で打ち止め。以降は一次資料の直接取得に切り替えた。

## 1. Takeaway

1. [事実] Luma はプレスリリース配信・公式ブログ・changelog・公式ニュースレターを**持たない**(2020〜2026 でプレスリリース 0 件、luma.com/blog と /changelog は 404、ヘルプにも「What's New」なし)。創業者の「マーケに時間を使っていない」という主張は、**会社としての発信の無さ**については裏づけられる。
2. [事実] ただし発信ゼロではない。(a) 2020 年は創業者の Twitter 投稿 → TechCrunch、Substack 週次メモ(2020-04〜12 に 13 本前後)、Product Hunt 投稿、(b) 2023〜2025 年は創業者ブログ(pont.is)の Luma 関連記事 7 本と LinkedIn 投稿(14K フォロワー)、(c) 2024〜2026 年はヘルプの「Luma vs 競合」比較ページ 12 本(SEO 用の自社コンテンツ)、(d) 2026 年は Instagram(20.1K)に月 2 本程度。**「口コミのみ」ではなく「広告・PR・営業はせず、創業者個人の発信と製品内の導線・比較ページで補う」**と読むのが正確。
3. [推測] 成長指標と発信の時期は**一致しない**。2021〜2023 は創業者・会社とも発信がほぼ無い「静かな時期」だが、その間に AI ブーム(2023)、a16z Tech Week(2022〜)、非英語圏の自然発生(2023)が起き、2024 に「大きく伸びている」と創業者が述べる。伸びた**後**に City Leads 募集(2024-02)、40 言語対応(2024-08)、How Luma Works(2025-01)、Chief of Staff 募集(2025-11)と発信が増えている。発信は成長の原因というより結果・随伴に見える。
4. [事実] 外部要因が大きい。2020 コロナ(オンラインイベント特需)、2022〜 a16z Tech Week、2023〜 AI イベント増(Cerebral Valley 等が Luma を使用)、2024 Meetup 買収と値上げ、2025-12 Eventbrite 買収(→ Luma が移行キャンペーン)。Luma はこれらに**自社イベントや PR で乗った形跡がなく、製品機能(Tech Weeks カレンダー、多言語)と比較ページで受け止めた**。
5. [推計] 訪問数は 2025-01 の 5.1M/月 → 2025-03 7.5M → 2026-09 19.0M(Semrush、lu.ma)。2025-11 時点で「7 人・月数百万件の登録・黒字」(創業者 LinkedIn)。2026 年もアプリを週 1 本ペースで更新しており、「機能開発に投資し、発信は最小限」という配分は現在も続いている。

## 2. 発信の年表

| 年 | PR 件数 | 主な発信(SNS・ブログ・登壇・創業者個人) | 成長指標 | 他の要因(資金・外部ショック・提携) | 出典 |
|---|---|---|---|---|---|
| 2018〜2019 | 0 | [事実] Pontis は個人ブログ pont.is に 2018 年 8 本・2019 年 12 本(スクーター・書評。Luma 以前)。2018-09-23 から友人 6 人へ毎週日曜の近況メールを開始 | (創業前) | — | [pont.is](https://pont.is/)、[Weekly Update の記事 2020-04-20](https://pont.is/p/weekly-update) |
| 2020 | 0 | [事実] 2020-03 Pontis の Tweet → 2020-04-03 TechCrunch 掲載。2020-04-20「週次メールが人生を変えた」(受信者 40 人超、81 週継続)。2020-04-06〜12-07 Substack 週次メモ(公開分 13 本前後)。2020-07「Why We Turned Down YC」。2020-12-07 シード発表を自社 Substack と Tweet で告知、Luma Memberships を Product Hunt に投稿 | 2020-04-06 最大イベント RSVP 240 件超。2020-12 ホスト 1 万超・延べ参加者 50 万超 | **コロナでイベントがオンライン化**(2020-03〜)。$3M シード(Maven・Venrock、2020-12-07)。報道は TechCrunch と Crunchbase News の 2 本のみ | [no-yc](https://pont.is/p/no-yc)、[Substack 2020-04-06](https://victorp.substack.com/p/zmurl-launches-on-techcrunch)、[Substack 2020-12-07](https://victorp.substack.com/p/weekly-update-2020-12-07)、[Crunchbase News](https://news.crunchbase.com/startups/exclusive-luma-raises-3m-to-enable-business-growth-on-top-of-zoom/) |
| 2021 | 0 | [事実] Pontis の pont.is 投稿 0 本、Substack 更新停止(2020-12-07 が最後)。Liu は個人サイトに「Curator Economy(web3)」1 本。[要約] 2021-08 に「One Year Wiser」インタビュー出演(原典取得不可) | [不明] | コロナ継続。iOS アプリ公開は App ID(1546150895)から 2020-12 前後と推定 [推測] | [pont.is](https://pont.is/)、[danqing.xyz](https://danqing.xyz/)、[Substack archive](https://victorp.substack.com/archive?sort=new) |
| 2022 | 0 | [事実] pont.is 0 本。会社発信も確認できず | [不明] | **a16z が Tech Week を開始**(2022-08 LA: 1.6 万人・200 超イベント。2022-10 NYC)。使用プラットフォームは [不明] | [dot.LA 2023](https://dotla.beehiiv.com/p/a16zs-tech-week-will-return-los-angeles-june)、[Surface Area](https://surfacearea.beehiiv.com/p/tech-week-in-new-york) |
| 2023 | 0 | [事実] pont.is に Luma 関連 2 本(2023-04 SMS 不正の顛末、2023-06 SPF/DKIM 解説)。いずれも技術記事で宣伝性は低い | [自社主張] 2023 年頃から日本のテックイベント・オランダの社交クラブなど非英語イベントが自然発生 | **AI ブーム**: Cerebral Valley のハッカソンや Llama Lounge(2023-04 設立)が Luma で告知。Tech Week が SF・NYC に拡大。2023-04 SMS 不正攻撃(損失額非公表)。Meetup が 2023-10 に有料チケット開始 | [sms-fraud](https://pont.is/p/sms-fraud)、[translating-luma](https://pont.is/p/translating-luma)、[Cerebral Valley](https://cerebralvalley.notion.site/Cerebral-Valley-209139d8c5474e48b9275e1c17ba5531)、[Llama Lounge](https://luma.com/llamalounge) |
| 2024 | 0 | [事実] 2024-02-26 Pontis が LinkedIn で City Leads 募集(「今年は大きく伸びている」)。2024-08-08「40 言語に翻訳」記事。ヘルプの「Luma vs Meetup」比較ページ(料金確認日 2024-06-06) | [自社主張] 2024 初〜08 で非英語イベント 4 倍超、全体の約 20% | **Meetup を Bending Spoons が買収**(2024 初)、2024-06 主催者料金値上げ。Tech Week SF/LA 2024 は 850 超イベント [二次]。Partiful が Google Play 2024 年ベストアプリ。WhatsApp Events(2024-05) | [LinkedIn 投稿](https://www.linkedin.com/posts/vpontis_hi-were-seeing-a-lot-of-growth-with-luma-activity-7167977701897682945-Mkmg)、[translating-luma](https://pont.is/p/translating-luma)、[Luma vs Meetup](https://help.luma.com/p/luma-vs-meetup) |
| 2025 | 0 | [事実] 2025-01-07「How Luma Works」(数百万ユーザー・6 人・「ほぼ完全に口コミ」)。2025-02「Thoughts on Apple Invites」。LinkedIn でサポート職・Community Ops 募集、NY Tech Week カレンダー告知(〜2025-06)。2025-08-21「Job Applications in 2025」(Twitter と LinkedIn に求人投稿 → 1,260 人応募)。2025-11 頃 Chief of Staff 募集(「7 人・月数百万件の登録・黒字」)。2025-12 頃 Eventbrite からの移行キャンペーン(直近 $1k 売上のホストに Luma Plus 6 か月無料)。ヘルプ「Luma vs Eventbrite」(料金確認 2025-06-10) | [推計] 訪問 2025-01 5.12M → 02 5.56M → 03 7.54M(Semrush、lu.ma)。[自社主張] 2025-01 数百万ユーザー、2025-11 月数百万件の登録 | **a16z が NYC Tech Week 2025 の公式イベントに Partiful を必須化**。Apple Invites 公開(2025-02)。**Eventbrite を Bending Spoons が約 $500M で買収**(2025-12 頃発表)。Sacra が Luma を「プロ向けネットワーキングイベントの競合」と記述 | [how-luma-works](https://pont.is/p/how-luma-works)、[Pontis LinkedIn](https://www.linkedin.com/in/vpontis)、[job-applications-2025](https://pont.is/p/job-applications-2025)、[Sacra](https://sacra.com/chat/h/af237d7b-26f6-4eeb-b922-a0140762ada4/)、[ticketsignup 2025-12-09](https://info.ticketsignup.io/2025/12/09/eventbrite-acquired/) |
| 2026 | 0 | [事実] Instagram @luma_hq に 2026-04〜10 で 12 本程度(月 2 本)。iOS アプリを 2026-04-13〜10-06 に 25 版リリース(週 1 本ペース。リリースノートが実質の製品告知)。ヘルプ「Luma vs Partiful」(Partiful 料金確認 2026-09)。Liu が個人サイトに 2 本(Meta 批判・リスクテイク論。Luma の宣伝ではない) | [推計] 訪問 2026-07 14.27M → 08 14.14M → 09 18.98M(Semrush、lu.ma)。Similarweb luma.com は 2026-09 で世界ランク 1,997 位(3 か月で 2,597 → 1,997)。App Store 評価 4.9(19K 件) | Partiful が有料チケット開始(2026-06)。NYC Tech Week 2026 は約 5 万人・1,500 超イベント(プラットフォームは不明) | [Instagram](https://www.instagram.com/luma_hq/)、[App Store](https://apps.apple.com/us/app/luma-events-invites/id1546150895)、[Luma vs Partiful](https://help.luma.com/p/luma-vs-partiful)、[Semrush](https://www.semrush.com/website/lu.ma/overview/)、[Similarweb](https://www.similarweb.com/website/luma.com/) |

## 3. プレスリリース・製品告知(年別件数)

| 年 | Business Wire / PR Newswire | 自社 newsroom・changelog | 報道(自社起点のもの) | 製品アップデート告知の頻度 |
|---|---|---|---|---|
| 2020 | 0 | なし | 2(TechCrunch 2020-04-03、Crunchbase News 2020-12-07) | Substack 週次メモで随時(Zoom 連携 2020-08、Memberships 2020-12 など) |
| 2021 | 0 | なし | 0(確認できず) | [不明] |
| 2022 | 0 | なし | 0(確認できず) | [不明] |
| 2023 | 0 | なし | 0(確認できず) | pont.is に技術記事 2 本 |
| 2024 | 0 | なし | 0(確認できず) | pont.is に 1 本(40 言語)、LinkedIn 1 本(City Leads) |
| 2025 | 0 | なし | 0(Sacra・party.pro 等の第三者記事のみ) | pont.is 3 本、LinkedIn 8 本程度(求人・告知) |
| 2026 | 0 | なし | 0(確認できず) | iOS 25 版 / 約 6 か月(週 1)、Instagram 月 2 本 |

- [事実] Business Wire / PR Newswire の検索でヒットするのは全て Luma AI(lumalabs.ai)のもの。lu.ma / luma.com 名義のプレスリリースは 0 件。 — [Business Wire 検索結果](https://www.businesswire.com/news/home/20251202217704/en/Luma-AI-Opens-for-International-Business-With-Former-WPP-Executive-Jason-Day-Leading-New-London-Office)(Luma AI の例)
- [事実] `luma.com/blog`、`luma.com/changelog` は 404(2026-10-16)。luma.com のフッターには Instagram と X のみで、blog / press / newsletter / careers へのリンクは無い。 — [luma.com](https://luma.com/)
- [事実] help.luma.com に「What's New」はなく、機能変更の告知は個別記事(例「Update to Reminders on Luma」)に留まる。 — [help.luma.com](https://help.luma.com/)
- [事実] 製品告知の代替として、App Store のリリースノートが機能している(2026-04-13〜10-06 に 25 版。例: 2026-04-30 有料イベントの待機リスト、2026-09-14 ホスト向け Insights、2026-10-06 アラビア語・ヘブライ語対応)。年は App Store 表示に無いが、2026-06-12 版に「iOS 27 beta」の記載があるため 2026 年と判断 [推測]。 — [App Store](https://apps.apple.com/us/app/luma-events-invites/id1546150895)

## 4. 公式 SNS

| アカウント | 開設時期 | フォロワー数(時点) | 投稿頻度 | 出典 |
|---|---|---|---|---|
| X @LumaHQ | [不明] | [不明](x.com は 402、代替ミラーは全て停止) | [不明] | luma.com フッターと help.luma.com が x.com/LumaHQ をリンク — [luma.com](https://luma.com/)、[help.luma.com](https://help.luma.com/) |
| Instagram @luma_hq | [不明](過去スナップショット取得不可) | **20.1K**(2026-10-16)。フォロー 9 | 可視範囲で 2026-04-03〜10-14 に 12 本 → 月 2 本程度 [推測] | [Instagram](https://www.instagram.com/luma_hq/) |
| LinkedIn company/luma-hq | [不明] | [不明](ページにフォロワー数が出ない)。「View all 83 employees」表示 vs 会社規模「2-10 人」[要確認](83 は City Leads・契約者・元従業員の自己申告を含むと推測) | [不明](投稿が取得できず) | [LinkedIn](https://www.linkedin.com/company/luma-hq/)。注: `company/lumahq` は別会社(Transform) |
| Telegram t.me/luma | [不明] | 233 人(2026-10-16)。認証済み | [不明] | [t.me/luma](https://t.me/luma)(Instagram のプロフィールからリンク) |
| TikTok | [不明] | [不明](JS 描画のみ) | [不明] | — |
| YouTube @lumahq | [不明] | [不明](タイトル「LumaHQ - YouTube」は取得できたが数値なし) | [不明] | [YouTube](https://www.youtube.com/@lumahq/about) |

- [推測] 公式サイトが X と Instagram しか掲示していないこと、Telegram が 233 人であることから、公式 SNS は「運用している」が「成長の主経路として投資している」規模ではない。Instagram の 20.1K は、数百万ユーザー(自社主張)に対して小さい。

## 5. オウンドメディア

| 媒体 | 有無 | 内容・件数 | 開始時期・更新頻度 | 出典 |
|---|---|---|---|---|
| 公式ブログ(luma.com/blog) | **なし**(404) | — | — | [luma.com/blog](https://luma.com/blog) |
| changelog / newsroom | **なし**(404) | — | — | [luma.com/changelog](https://luma.com/changelog) |
| ヘルプセンター help.luma.com | あり | 12 セクション・約 180 掲載(重複除き約 150 記事)。Events 38、Making Money 18、Helpful Tips 25、Integrations 10(API・Zapier・Salesforce・HubSpot・SSO・MCP)、Enterprise 8、**Competitors 12** | 開始時期 [不明]。比較ページの料金確認日: Meetup 2024-06-06、Eventbrite 2025-06-10、Partiful 2026-09 → 2024〜2026 に継続更新 | [help.luma.com](https://help.luma.com/) |
| 比較ページ「Luma vs 〜」 | あり | 12 本: Eventbrite、Splash、DICE、Resident Advisor、Meetup、Partiful、Posh、Ticket Tailor、Humanitix、Cvent、Bizzabo、Whova | 2024〜2026(上記)。Meetup 版は Bending Spoons の値上げ、Partiful 版は 2026-06 の有料チケット開始を取り上げており、**競合の弱みが出た直後に書かれている** [推測] | [Luma vs Meetup](https://help.luma.com/p/luma-vs-meetup)、[Luma vs Eventbrite](https://help.luma.com/p/luma-vs-eventbrite)、[Luma vs Partiful](https://help.luma.com/p/luma-vs-partiful) |
| ホスト向けガイド | あり(ヘルプ内) | Tech Weeks(Use Cases)、イベント宣伝、SMS、バッジ印刷など | [不明] | [Tech Weeks](https://help.luma.com/p/tech-weeks) |
| 公式ニュースレター(会社発) | **確認できず** | Luma の「newsletter」はカレンダー購読者へホストが送る**製品機能**であり、会社発のニュースレターではない | — | [help.luma.com](https://help.luma.com/) Calendars セクション |
| Discover(luma.com/discover) | あり | 都市別のイベント発見ページ。SEO とゲスト→ホスト転換の入口 [推測] | [不明] | [luma.com](https://luma.com/) |

- [事実] ヘルプの比較ページはいずれも Luma 自身が書いた自社有利の内容で、「Why You Might Choose 〜」節を置いて中立を装う構成。Luma vs Eventbrite には Alo・NBA・Stripe が Eventbrite から移った、とある [自社主張]。 — [Luma vs Eventbrite](https://help.luma.com/p/luma-vs-eventbrite)
- [推測] Luma の「コンテンツマーケ」は実質この比較ページ群だけで、2024 年以降に集中している。発信の無さを埋めるのは「製品ページそのものが宣伝になる」設計(ホストのイベントページ → ゲスト → 次のホスト)で、ognotes も同じ構造を指摘する [二次]。 — [ognotes 2025-07-13](https://ognotes.substack.com/p/luma-the-tiny-wedge-that-quietly)

## 6. 創業者・経営者個人の発信

### 6.1 Victor Pontis(共同創業者)

| 媒体 | 内容 | 本数・期間 | 出典 |
|---|---|---|---|
| 個人ブログ pont.is | 全 44 本。年別: 2014:1、2015:1、2017:3、2018:8、2019:12、**2020:3、2021:0、2022:0、2023:4、2024:5、2025:7**。Luma 関連は 2020 no-yc、2023 sms-fraud・SPF/DKIM、2024 translating-luma、2025 how-luma-works・apple-invites・job-applications の 7 本 | 2014〜2025-08 | [pont.is](https://pont.is/) |
| 週次メール(私信) | 2018-09-23 に友人 6 人へ開始。2020-04-20 時点で 81 週継続、受信者 40 人超 | 2018-09〜(終了時期 [不明]) | [weekly-update](https://pont.is/p/weekly-update) |
| Substack(victorp.substack.com)週次メモ(公開版) | アーカイブ表示は 12 本(2020-07-13〜2020-12-07 の週次 11 本 + 2025-08-22 の Job Applications 転載)。ただし 2020-04-06「ZmURL launches on TechCrunch」(Weekly Update 2020-04-05)も存在するため、**公開分は 2020-04〜12 で 13 本以上**、2020-04〜07 の抜けはページング未取得の可能性 [要確認]。**2020-12-07 を最後に 2025-08 まで更新なし** | 2020-04-06〜2020-12-07(本体)、2025-08 に 1 本 | [Substack archive](https://victorp.substack.com/archive?sort=new)、[2020-04-06](https://victorp.substack.com/p/zmurl-launches-on-techcrunch) |
| X @vpontis | 2020-03 の Tweet が TechCrunch 掲載のきっかけ(「1 週間でアイデアから TechCrunch」)。2020-12 シード告知 Tweet。2025 年の求人を Twitter と LinkedIn に投稿。**フォロワー数は [不明]**(取得手段なし) | 2020〜2025 に活動を確認 | [no-yc](https://pont.is/p/no-yc)、[Substack 2020-12-07](https://victorp.substack.com/p/weekly-update-2020-12-07)、[job-applications-2025](https://pont.is/p/job-applications-2025) |
| LinkedIn | **14K フォロワー**(2026-10-16)。直近 1 年の投稿: How Luma Works 告知、Apple Invites 所感、サポート職募集、NY Tech Week カレンダー告知、Community Ops 募集、Chief of Staff 募集(約 11 か月前 ≒ 2025-11。「7 人で月数百万件の登録」「黒字」「$120k+」)、Eventbrite 移行オファー(約 10 か月前 ≒ 2025-12)。2024-02-26 の City Leads 募集も LinkedIn | 2024〜2026 | [LinkedIn vpontis](https://www.linkedin.com/in/vpontis)(相対日付は 2026-10-16 閲覧からの逆算) |
| ポッドキャスト・登壇 | **確認できず**。「Victor Pontis podcast」「Lenny's Podcast」「fireside / founder story」で検索したが該当なし。既知の「One Year Wiser」(2021-08、[要約])のみ | — | 検索 4 回で該当なし |

### 6.2 Danqing (Dan) Liu(共同創業者・CEO)

| 媒体 | 内容 | 出典 |
|---|---|---|
| 個人サイト danqing.xyz | エッセイ 3 本(2021「Curator Economy(web3)」、2026「Meta, the Anti-Utility Company」「Alex Honnold and Risk Taking」)、デザイン連載 3 本、Glow Wallet(Luma 内で作った Solana ウォレット)。Luma の宣伝記事は無い | [danqing.xyz](https://danqing.xyz/) |
| X @danliu | リンクあり。フォロワー数・投稿頻度 [不明] | [danqing.xyz](https://danqing.xyz/) |
| ポッドキャスト・登壇 | **確認できず**(検索 1 回。ヒットは全て Luma AI の Amit Jain) | — |

- [推測] 創業者の発信は「2020 年に集中 → 2021〜2022 空白 → 2023 から技術記事・経営記事 → 2025 以降は LinkedIn 中心」。量としては年 3〜7 本のブログ + LinkedIn 月 1 本程度で、Partiful の TikTok・PR や Posh の資金調達 PR と比べて明らかに少ない。
- [推測] 創業者の発信の内容は「宣伝」ではなく「運営の内側(SMS 不正、翻訳、採用選考、組織運営)」が中心。これはテック系ホストへの信頼形成には効くが、一般消費者向けの認知施策ではない。

## 7. 成長指標の時系列

| 時点 | 指標 | 値 | 信頼度 | 出典(既知分は引き継ぎ、★は本調査の追加) |
|---|---|---|---|---|
| 2020-04-06 | 最大イベントの RSVP | 240 件超 | [自社主張] | [Substack 2020-04-06](https://victorp.substack.com/p/zmurl-launches-on-techcrunch) |
| 2020-12-07 | ホスト / 延べ参加者 | 1 万超 / 50 万超 | [二次](創業者談を報道) | [Crunchbase News](https://news.crunchbase.com/startups/exclusive-luma-raises-3m-to-enable-business-growth-on-top-of-zoom/) |
| 2020-12 | 資金 | $3M シード(累計も $3M。以降の調達は確認できず) | [二次] | 同上、[CB Insights](https://www.cbinsights.com/compare/luma-2-vs-partiful) |
| 2023 頃 | 非英語イベント | 日本・オランダ等で自然発生 | [自社主張] | [translating-luma](https://pont.is/p/translating-luma) |
| 2024-01-10 ★ | 訪問(Statvoo 推計) | 約 541 人/日 | [推計・低信頼](他の推計と桁が合わず、採用しない) | [Statvoo](https://statvoo.com/lu.ma)([要約]) |
| 2024-02-26 | 成長の自己評価 | 「今年は lu.ma が大きく伸びている」 | [自社主張] | [LinkedIn](https://www.linkedin.com/posts/vpontis_hi-were-seeing-a-lot-of-growth-with-luma-activity-7167977701897682945-Mkmg) |
| 2024-08-08 | 非英語イベント | 2024 初比 4 倍超、全体の約 20% | [自社主張] | [translating-luma](https://pont.is/p/translating-luma) |
| 2025-01-07 | ユーザー / 従業員 | 数百万 / フルタイム 6 名 | [自社主張] | [how-luma-works](https://pont.is/p/how-luma-works) |
| 2025-01〜03 ★ | 月間訪問(lu.ma、Semrush) | 1 月 5.12M → 2 月 5.56M → 3 月 7.54M(2 月比 +35%) | [推計][要約](2025-05-02 更新版。原典ページは現在 404) | [Semrush 2025-05 版](https://sv.semrush.com/website/lu.ma/overview) |
| 2025-07-13 ★ | 従業員 | 10 名未満 | [二次] | [ognotes](https://ognotes.substack.com/p/luma-the-tiny-wedge-that-quietly) |
| 2025-08-21 ★ | 採用 | ops 職 1 名に 1,260 人応募(Twitter・LinkedIn 掲載) | [自社主張] | [job-applications-2025](https://pont.is/p/job-applications-2025) |
| 2025-11 頃 ★ | 従業員 / 登録数 / 収支 | 7 名 / 「月数百万件のイベント登録」 / 「黒字」 | [自社主張](LinkedIn 投稿、相対日付) | [LinkedIn vpontis](https://www.linkedin.com/in/vpontis) |
| 2026-03-12 ★ | App Store 順位 | 米 Lifestyle 無料 1 位(単発スナップショット。別の時点では 30 位圏外) | [推計][要確認] | 検索要約(apppricinglab / mwm.ai) |
| 2026-07〜09 ★ | 月間訪問(lu.ma、Semrush) | 7 月 14.27M → 8 月 14.14M → 9 月 18.98M(2026-10-14 更新)。国別: 米 23.7%、**バングラデシュ 17.9%(デスクトップ 99.9%)**、印 8.4%、英 5.4% | [推計]。バングラデシュ分はボット疑い [推測] | [Semrush](https://www.semrush.com/website/lu.ma/overview/) |
| 2026-09 ★ | 訪問・順位(luma.com、Similarweb) | 「直近 3 か月の総訪問」約 27M、前月比 +26%、世界 1,997 位(3 か月前 2,597 位)、米 1,389 位。米 47%、印 6.6%、英 6.1% | [推計](月次か 3 か月合計か表示が不明瞭) | [Similarweb](https://www.similarweb.com/website/luma.com/) |
| 2026-10-16 ★ | App Store 評価 | 4.9(19K 件)。以前の第三者表示は 11.3K / 15.6K 件(日付なし) | [事実](評価件数) | [App Store](https://apps.apple.com/us/app/luma-events-invites/id1546150895) |
| 2026-10-16 ★ | LinkedIn 社員表示 | 「83 employees」(会社規模欄は 2-10) | [要確認] | [LinkedIn luma-hq](https://www.linkedin.com/company/luma-hq/) |
| 日付なし | アプリ累計 DL | 25 万・月 3.5 万(ScreensDesign)/ 「月 200 万人がイベント登録」「2023→2024 で 5 倍」(party.pro、出典なし) | [推計・低信頼] | [ScreensDesign](https://screensdesign.com/showcase/luma-delightful-events)、[party.pro](https://old.party.pro/luma/) |
| — | ARR・売上 | **[不明]**。Sacra に Luma 単体の推計ページは無い(Partiful 関連ページで「競合」として言及のみ)。GetLatka の「Luma」は別会社 | — | [Sacra](https://sacra.com/chat/h/35da2362-7528-4b03-bd06-9385fac61729/) |

- [推測] 訪問数ベースでは 2025-01 → 2026-09 で約 3.7 倍(Semrush)。ただし Semrush と Similarweb でドメイン(lu.ma / luma.com)と集計方法が異なり、2026 年はバングラデシュ由来のデスクトップ流入(ボットの可能性)が含まれるため、実勢は Similarweb の米国比率(47%)側に近いと見る。
- [要確認] 「月数百万件の登録」(2025-11、創業者)と「月 200 万人が登録」(party.pro、出典なし)は桁として整合するが、party.pro は根拠を示していない。

## 8. 相関の読み

### 8.1 発信が多い時期と伸びた時期

| 期間 | 会社の発信 | 創業者の発信 | 成長の証拠 | 一致/不一致 |
|---|---|---|---|---|
| 2020 | Product Hunt 1 回、報道 2 本 | **多い**(Tweet → TechCrunch、週次メモ 13 本前後、ブログ 3 本) | ホスト 1 万・参加者 50 万(12 月) | **一致**(ただしコロナ特需と同時) |
| 2021〜2022 | 確認できず | **ほぼゼロ**(pont.is 0 本、Substack 停止) | [不明](公表値なし) | 判定不能。ただし 2024 年に「数百万ユーザー」へ到達しているため、この期間に土台が積み上がったはず [推測] |
| 2023 | なし | 技術記事 2 本 | 非英語圏で自然発生、AI イベント増 | **不一致**(発信は少ないが伸びの兆候) |
| 2024 | 比較ページ開始(Meetup) | City Leads 募集、40 言語記事 | 「大きく伸びている」、非英語 4 倍 | 一致に見えるが、**発信は伸びの後**(2 月に「伸びている」と言ってから募集) |
| 2025 | 比較ページ追加(Eventbrite) | How Luma Works、LinkedIn 月 1 本、求人 | 訪問 5.1M → 7.5M(1〜3 月)、黒字、7 人 | 緩い一致。発信は「採用」と「移行キャンペーン」が目的で、認知拡大が目的ではない |
| 2026 | Instagram 月 2 本、比較ページ(Partiful)、アプリ週 1 更新 | Liu のエッセイ 2 本(Luma 無関係) | 訪問 14M → 19M、世界 1,997 位 | 一致せず(発信量は横ばい、訪問は増) |

### 8.2 「口コミのみ」という創業者の主張の検証

- [事実] **裏づけられる点**: プレスリリース 0 件、公式ブログ・changelog・ニュースレターなし、有料広告の痕跡なし、ポッドキャスト・登壇の記録なし、公式 SNS は小規模(Instagram 20.1K、Telegram 233)。2025-01 時点で「営業・デモ・提携の余力がない」とも明言。 — [how-luma-works](https://pont.is/p/how-luma-works)
- [事実] **留保が要る点**: (1) 創業時は創業者の Twitter と TechCrunch 記事で点火しており、純粋な口コミではない。(2) 2024 年以降、競合の弱みに合わせた比較ページ(Meetup 値上げ、Eventbrite 買収、Partiful 有料化)を 12 本整備しており、これは SEO 型のコンテンツマーケ。(3) 2025-12 頃に Eventbrite からの移行オファー(Luma Plus 6 か月無料)を LinkedIn で打っており、これは小規模だがキャンペーン。(4) City Leads(2024-02〜)は「主催者獲得とキュレーション」を担う人的な獲得施策で、LinkedIn の「83 employees」表示はその広がりを示唆する [推測]。
- [推測] 正確には「**広告・PR・営業チームを持たず、製品内の導線(イベントページ → ゲスト → ホスト、Discover、カレンダー購読)と創業者個人の信用で獲得し、競合の失策時だけ比較ページと小さなオファーで刈り取る**」モデル。Luma が「発信していない」のは会社としての対外広報であって、創業者個人とヘルプセンターは発信している。

### 8.3 他の要因(相関と因果の区別)

| 要因 | 時期 | Luma への影響(推測) | 根拠 |
|---|---|---|---|
| コロナでイベントがオンライン化 | 2020-03〜 | 創業の動機そのもの。2020 年のホスト 1 万は特需込み | [TechCrunch](https://techcrunch.com/?p=1969955)、[Crunchbase News](https://news.crunchbase.com/startups/exclusive-luma-raises-3m-to-enable-business-growth-on-top-of-zoom/) |
| a16z Tech Week(2022-08 LA → 2023 SF・NYC → 2024 850 超イベント) | 2022〜 | 多数の主催者が同時にイベントページを作る「集約需要」。Luma は Tech Weeks 機能で受け止め、2025 年は NY Tech Week カレンダーを創業者が告知。2025 年の a16z による Partiful 必須化はマイナス要因 | [dot.LA](https://dotla.beehiiv.com/p/a16zs-tech-week-will-return-los-angeles-june)、[Tech Weeks](https://help.luma.com/p/tech-weeks)、[Sacra](https://sacra.com/chat/h/af237d7b-26f6-4eeb-b922-a0140762ada4/) |
| AI ブームでのテックイベント増 | 2023〜 | Cerebral Valley のハッカソン、Llama Lounge(2023-04 設立)などが Luma 上で開催。SF の AI コミュニティが Luma を標準にした [推測] | [Cerebral Valley](https://cerebralvalley.notion.site/Cerebral-Valley-209139d8c5474e48b9275e1c17ba5531)、[Llama Lounge](https://luma.com/llamalounge) |
| Meetup の Bending Spoons 買収と値上げ | 2024 初〜06 | Luma vs Meetup 比較ページ(2024-06-06 料金確認)で受け止め。移行数は [不明] | [Luma vs Meetup](https://help.luma.com/p/luma-vs-meetup)、[Appfigures](https://appfigures.com/resources/insights/the-company-squeezing-money-from-apps-you-used-to-love) |
| Eventbrite の Bending Spoons 買収(約 $500M) | 2025-12 頃 | 創業者が LinkedIn で移行オファー。比較ページも整備済み | [ticketsignup](https://info.ticketsignup.io/2025/12/09/eventbrite-acquired/)、[LinkedIn vpontis](https://www.linkedin.com/in/vpontis) |
| 非英語圏の自然発生 → 40 言語対応 | 2023 → 2024-08 | 製品対応が成長を加速(非英語 4 倍)。発信ではなく機能で伸びた例 | [translating-luma](https://pont.is/p/translating-luma) |
| Partiful の台頭(Google 2024 ベストアプリ、a16z 必須化、2026-06 有料化)・Apple Invites(2025-02) | 2024〜2026 | 比較報道で Luma の名が出る機会が増えた(Sacra、Business Insider 転載)。Luma 自身は Partiful 比較ページで応戦 | [Sacra](https://sacra.com/research/partiful)、[Luma vs Partiful](https://help.luma.com/p/luma-vs-partiful) |
| SMS 不正攻撃 | 2023-04 | コスト損失。成長への影響は [不明] | [sms-fraud](https://pont.is/p/sms-fraud) |

- [推測] **因果の整理**: 2020 年の立ち上がりは「創業者の発信 × コロナ特需」の掛け算で、発信単独の効果は切り分けられない。2023〜2024 年の伸びは「AI ブーム・Tech Week・競合の失策」という外部需要を、「製品の使いやすさ・多言語・Tech Weeks 機能」で受け止めた結果で、創業者の発信はその**後追い**(募集・事例共有)。2025〜2026 年は「競合の失策に合わせた比較ページと小オファー」が低コストな刈り取り施策として機能している可能性があるが、効果の数値は無い。

## 9. 候補の仕分け

### 「発信していないのに伸びた」候補
- [推測] **2021〜2023 の静かな時期**: 創業者ブログ 0〜2 本、会社発信なし。にもかかわらず 2024-02 に「大きく伸びている」、2025-01 に「数百万ユーザー」。ただし年次の数値が無いので、この期間の伸び方(線形か 2023 後半からの急伸か)は [不明]。外部要因(AI ブーム、Tech Week)の寄与が大きい。
- [事実] **40 言語対応(2024-08)**: 発信ではなく製品機能で非英語イベント 4 倍。Shokujii の「機能開発先行」の根拠として最も直接的な例。
- [推測] **2026 年の訪問増(14M → 19M)**: 発信量は横ばい(Instagram 月 2 本、創業者ブログ 0 本)で訪問は増。ただしボット流入の疑いがあり、確定できない。

### 「発信したのに伸びなかった」候補
- [事実・不明] **2020-12 の Product Hunt(Luma Memberships)**: 投稿したが効果の記述なし。Memberships 機能のその後の指標は [不明]。
- [推測] **公式 Instagram・Telegram**: 運用はしているが、Instagram 20.1K・Telegram 233 人で、ユーザー規模に比べて小さい。SNS の公式運用が成長に効いた形跡は無い(効いていないとも断定できない)。
- [不明] **City Leads(2024-02〜)**: 人的な獲得施策だが、成果の公表なし。

## 10. 未確認事項(Gaps)

- X の @LumaHQ・@vpontis・@danliu のフォロワー数・開設日・投稿頻度(全時点)。取得手段が無い。
- Instagram・LinkedIn・Telegram・YouTube の開設時期とフォロワー数の推移(Wayback が使えず)。
- 2021〜2023 の年別ホスト数・イベント数・ユーザー数(公表なし)。「静かな時期」にどの程度伸びたかが判定できない。
- 2020-04〜07 の Substack 週次メモの本数(アーカイブ表示が 12 本で切れている可能性)。
- City Leads の採用人数と成果、LinkedIn「83 employees」の内訳。
- ARR・売上(Sacra に Luma 単体の推計なし)。「黒字」は創業者の自己申告のみ。
- 2026 年の Semrush 訪問数に含まれるバングラデシュ流入の性質(ボットか実需か)。
- Tech Week の公式カレンダーがいつから Luma 上に置かれたか(2022〜2023 のプラットフォームは不明)。
- ポッドキャスト出演の有無(One Year Wiser 2021 以外は検索で見つからず。Lenny's Podcast 出演は確認できず)。
- 創業者の週次メール(私信)が現在も続いているか。

## 11. 出典一覧(URL + 日付)

### 一次(Luma・創業者)
- https://luma.com/ (2026-10-16 閲覧。フッターに Instagram・X のみ)
- https://luma.com/blog 、https://luma.com/changelog (2026-10-16。404)
- https://help.luma.com/ (2026-10-16。約 150 記事、比較ページ 12 本、What's New なし)
- https://help.luma.com/p/luma-vs-meetup (料金確認 2024-06-06)
- https://help.luma.com/p/luma-vs-eventbrite (料金確認 2025-06-10)
- https://help.luma.com/p/luma-vs-partiful (Partiful 料金確認 2026-09)
- https://help.luma.com/p/tech-weeks (2026-10-16)
- https://apps.apple.com/us/app/luma-events-invites/id1546150895 (2026-10-16。4.9 / 19K 件、版履歴)
- https://www.instagram.com/luma_hq/ (2026-10-16。20.1K)
- https://t.me/luma (2026-10-16。233 人)
- https://www.linkedin.com/company/luma-hq/ (2026-10-16)
- https://www.linkedin.com/in/vpontis (2026-10-16。14K フォロワー、投稿は相対日付)
- https://www.linkedin.com/posts/vpontis_hi-were-seeing-a-lot-of-growth-with-luma-activity-7167977701897682945-Mkmg (2024-02-26 と逆算)
- https://pont.is/ (2026-10-16。44 本の一覧)
- https://pont.is/p/weekly-update (2020-04-20)
- https://pont.is/p/no-yc (2020-07-28)
- https://pont.is/p/sms-fraud (2023-04-17)
- https://pont.is/p/translating-luma (2024-08-08)
- https://pont.is/p/how-luma-works (2025-01-07)
- https://pont.is/p/apple-invites (2025-02)
- https://pont.is/p/job-applications-2025 (2025-08-21)
- https://victorp.substack.com/archive?sort=new (2026-10-16 閲覧。12 本表示)
- https://victorp.substack.com/p/zmurl-launches-on-techcrunch (2020-04-06)
- https://victorp.substack.com/p/weekly-update-2020-12-07 (2020-12-07)
- https://danqing.xyz/ (2026-10-16)

### 報道・第三者
- https://techcrunch.com/?p=1969955 (2020-04-03)
- https://news.crunchbase.com/startups/exclusive-luma-raises-3m-to-enable-business-growth-on-top-of-zoom/ (2020-12-07)
- https://www.businesswire.com/news/home/20251202217704/en/Luma-AI-Opens-for-International-Business-With-Former-WPP-Executive-Jason-Day-Leading-New-London-Office (2025-12。Luma AI の例。lu.ma のリリースは 0 件)
- https://sacra.com/chat/h/35da2362-7528-4b03-bd06-9385fac61729/ (2025。Luma 単体の数値なし)
- https://sacra.com/chat/h/af237d7b-26f6-4eeb-b922-a0140762ada4/ (2025-10-22。a16z の Partiful 必須化)
- https://sacra.com/research/partiful (2025)
- https://ognotes.substack.com/p/luma-the-tiny-wedge-that-quietly (2025-07-13)
- https://old.party.pro/luma/ (初出 2023-05-25、更新 2026-03-26。出典なしの数値)
- https://www.semrush.com/website/lu.ma/overview/ (2026-10-14 更新。2026-07〜09)
- https://sv.semrush.com/website/lu.ma/overview (2025-05-02 更新版。検索要約のみ、現在 404)
- https://www.similarweb.com/website/luma.com/ (2026-09)
- https://statvoo.com/lu.ma (2024-01-10。低信頼)
- https://screensdesign.com/showcase/luma-delightful-events (日付なし)
- https://www.cbinsights.com/compare/luma-2-vs-partiful (2026 閲覧)
- https://dotla.beehiiv.com/p/a16zs-tech-week-will-return-los-angeles-june (2023)
- https://surfacearea.beehiiv.com/p/tech-week-in-new-york (2023)
- https://cerebralvalley.notion.site/Cerebral-Valley-209139d8c5474e48b9275e1c17ba5531 (2026-10 閲覧)
- https://luma.com/llamalounge (2023-04 設立と記載)
- https://appfigures.com/resources/insights/the-company-squeezing-money-from-apps-you-used-to-love (2024〜2025。Meetup 値上げ)
- https://info.ticketsignup.io/2025/12/09/eventbrite-acquired/ (2025-12-09)
- https://nitter.net/ (2026-10-10 告知。X ミラー停止の根拠)
