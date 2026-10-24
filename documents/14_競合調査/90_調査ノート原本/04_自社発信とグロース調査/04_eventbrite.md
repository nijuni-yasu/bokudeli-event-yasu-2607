# Eventbrite の自社発信と成長指標の突き合わせ(2006–2026)

調査日: 2026-10-16(再開後の追加取得は 2026-10-17 を含む)。目的は、Shokujii が「機能開発」と「プロモーション(自社発信)」のどちらを先に打つかを判断するために、Eventbrite の発信の量・時期と成長指標を年表で並べ、相関を読むこと。基本の年表・チャネル別施策・買収・資金調達は既存ノート [`02_グロースストーリー調査/01_eventbrite.md`](../02_グロースストーリー調査/01_eventbrite.md) にあり、本ノートは重複を避けて、発信と成長の突き合わせに絞る。既存ノート由来の数値は「(既存ノート由来)」と書き、引用元 URL もそちらを引き継ぐ。

凡例: [事実]=出典で確認 / [推測]=解釈 / [不明]=確認できず / [自社主張] / [二次]=報道・第三者 / [要約]=検索結果の要約のみ(本文未確認) / [要確認]=食い違い / [推計]=第三者推計または本ノートの算出。

## 1. 取得上の制約(取れなかったもの)

- Bash の curl(SEC 全文のダウンロード、Wayback CDX API)は実行許可が下りず使えなかった。SEC の 10-K は WebFetch(本文を 10 万字ずつ区切って要約する方式)で読んだ。そのため 10-K の文言は「原文の逐語」ではなく WebFetch の抜粋である。広告費の注記(Note の "Advertising expenses were …")は、FY2018・FY2019・FY2021・FY2023・FY2025 の本文では該当箇所に到達できなかった。広告費は検索結果に出た FY2019 10-K と FY2024 10-K の数値(2017–2019 と 2022–2024)のみ採用し、2020・2021・2025 は[不明]とした。
- Wayback Machine は CDX 一覧をブラウザ経由で取得でき、2009-01〜2022-12 の `twitter.com/eventbrite` スナップショットが月次でほぼ揃っていることまでは確認した。フォロワー数は 2009-09、2010-10、2012-01、2013-01、2014-12 の 5 時点を読めた。その後、2016-12 のスナップショットを開いた段階で、ブラウザ側が web.archive.org 上の JavaScript 実行を拒否したため、これ以降の Wayback 取得は止めた(2015・2016〜2019 のフォロワー数は[不明])。2022 年以降は JS 描画のため元から取れない想定。
- 投資家向けページ(`investors.eventbrite.com/news-events/press-releases`)は `eventbrite.com` のトップへ 307 リダイレクトされ、一覧を取得できなかった(旧ドメイン `investor.eventbrite.com` は検索結果に出るが一覧は未取得)。Business Wire の社別一覧も未取得。上場後のプレスリリースの年別件数は、代わりに「公式ニュースルーム(eventbrite.com/blog/press/newsroom/)」と「SEC への 8-K 提出数」で代用した(§4 に注意書き)。
- X(@eventbrite)の現在値、Facebook、LinkedIn(企業ページ)、TikTok、YouTube のフォロワー数・開設時期は取得できなかった(TikTok は読み込み待ち表示、YouTube と Social Blade は 403 または失敗)。Instagram のみ現在値を 1 点取得した。
- Julia Hartz の X アカウントのフォロワー数、Kevin Hartz の登壇一覧、Eventbrite ブログの開始日と総記事数は確認できなかった。
- 月間ユニークユーザー(UU)の時系列は、2009〜2010 の公式発言のほかに信頼できる系列が見つからなかった(§8)。

## 2. Takeaway

1. 初期(2006–2010)は、公式のプレスリリースは少数(確認できた範囲で年 1〜4 件)で、成長の主因は製品内の共有導線と Google・Facebook 経由の流入だった。Twitter は 2009 年時点では顧客対応・アフィリエイト告知・イベント出展の連絡に使われ、フォロワーは 2009-09 の 3,317 人から 2012-01 の 71,576 人へ増えた。[事実+推測]
2. 上場後の広告費(10-K の advertising expense)は売上比で 0.5%(2018)→1.4%(2019)→1.6%(2022)→4.1%(2023)→2.6%(2024)と、ごく小さい。広告費が最大だった 2023 年でも有料チケットは +7%、うち単価要因が大きく、翌 2024 年は広告費を絞ると -10%。ただし 2023-06 の手数料導入が同時に起きており、広告の効果を切り分けられない。[事実+推測]
3. 2023-05 の消費者向けキャンペーン「GTFO」と 2025-03 の「Get Into It」は、どちらも直後に全体の有料チケットを反転させたとは言えない(2024 年 -10%、2025 年 -6%)。同社が示した効果は「アプリ経由の有料チケット +11%(2025 Q1)」のみで、自社主張・費用不明。[事実+自社主張]
4. 発信の量そのものと成長の間に、一貫した正の相関は読み取れない。成長が速かった時期(2009–2010、2017)は、発信が少ない・または主に製品(共有・SEO・配信パートナー)に依存した時期で、他の要因(Facebook 連携、買収、コロナ後の回復、手数料)が大きい。[推測]
5. Shokujii への示唆: Eventbrite の実績から「発信(プロモーション)を先に打てば伸びる」という根拠は得られない。先に作るべきは、参加者が次の幹事になる導線と共有導線という製品側。発信は、その導線が機能し始めてからの増幅に位置づけるほうが、Eventbrite の履歴とは整合する。[推測]

## 3. 発信の年表

S&M は Sales, marketing and support(人件費・引当・無形資産償却を含み、純粋な広告費ではない)。広告費は 10-K の advertising expense。成長指標の有料チケットは paid tickets。2009〜2015 は非上場のため S&M・広告費は[不明]。プレスリリース件数の「確認」は本調査で見つけた範囲の下限であり、全数ではない(§4)。

| 年 | プレスリリース件数 | 主な発信(SNS・ブログ・登壇・創業者個人) | S&M 費(売上比)/広告費 | 成長指標 | 他の要因 | 出典 |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| 2006–2008 | 2008: 1 件確認(2008-06-02) | 創業者 3 人でブートストラップ。Twitter は 2009-01-02 のスナップショットがあり、それ以前から存在 | [不明] / [不明] | 「無償の有機成長、黒字」(2008-06、自社主張)。数値は[不明] | 2008 年の金融危機で機関投資家ラウンドが頓挫。2008-06 に European Founders Fund が最初の外部資金を主導 | [公式ブログ 2008-06-02](https://www.eventbrite.com/blog/?p=49650)、[既存ノート由来] |
| 2009 | 2 件確認(2009-11-04 Series C、2009-12-29 大晦日関連) | 2009-09: Twitter フォロワー 3,317(フォロー 3,051)。投稿は顧客対応(CoTweet)、アフィリエイト告知(新規主催者の紹介 1 件につき追加 $50)、TC50 出展(9/14–15)、障害の経過報告(9/9) | [不明] / [不明] | 月間 UU 300 万、前年比 3 桁成長、チケット売上見込み $100M 超(2009-11、自社主張) | Series C $6.5M(Sequoia)。TechCrunch が自社イベントで利用 | [Wayback 2009-09-19](https://web.archive.org/web/20090919190828/http://twitter.com/eventbrite)、[公式ブログ 2009-11-09](https://www.eventbrite.com/blog/?p=49641)、[Ticketnews 2009-12](https://www.ticketnews.com/2009/12/eventbrite-helps-event-organizers-promote-new-years-eve-parties/) |
| 2010 | 4 件以上確認(04-13 Q1 実績、09-23 Facebook 連携、10-06 Series D ほか) | 2010-10: Twitter フォロワー 12,725、ツイート累計 4,289、リスト 570。Q1 実績の PR は広報会社 LaunchSquad 経由。ソーシャル経由の流入は前年比 250% 超(2010-04、自社主張) | [不明] / [不明] | GTS $40.9M(Q1)、通年 約 $207M(二次)、11M 枚超 | 2010-09 に Facebook ログインで「友人が参加するイベント」を表示。Facebook が前四半期に Google を抜き最大の流入源に(2010-10)。Series D $20M | [公式ブログ 2010-04-13](https://www.eventbrite.com/blog/?p=49634)、[Wayback 2010-10-09](https://web.archive.org/web/20101009134309/http://twitter.com/eventbrite)、[既存ノート由来] |
| 2011 | [不明](ワイヤー配信は確認できず) | 2011-06 TechCrunch の Founder Stories 動画(創業者が Facebook・Twitter・LinkedIn を語る)。Twitter は snapshot が月次で存在 | [不明] / [不明] | 20M 枚/$360M(検索要約のみ、既存ノート由来)[要約] | Series E $50M(Tiger Global)。At the Door(iPad 決済)を 2011-03 に開始 | [TechCrunch 動画](https://techcrunch.com/video/eventbrite-founders-on-facebook-twitter-and-linkedin/517158379/)、[既存ノート由来] |
| 2012 | 2 件以上確認(06-18 累計 $1B、10-23 Social Commerce Report) | 2012-01: Twitter フォロワー 71,576(フォロー 5,943、リスト 1,499)。10-23 にデータ PR(Facebook 共有 1 回 $4.15) | [不明] / [不明] | 累計 GTS $1B(06)、2012 年 GTS $600M 見込み(自社) | ロンドン拠点、14 か国の現地語サイト。Vans Warped Tour 独占販売 | [Wayback 2012-01-03](https://web.archive.org/web/20120103140018/http://twitter.com/eventbrite)、[Vator 2012-06-18](https://vator.tv/2012-06-18-eventbrite-hits-major-milestone-1b-in-tickets-sold/)、[公式ブログ 2012-10-23](https://www.eventbrite.com/blog/?p=49597) |
| 2013 | 2 件以上確認(04-22 $60M、09 Lanyrd・Eventioz 買収) | 2013-01: Twitter フォロワー 125,316 | [不明] / [不明] | 累計 100M 枚(03)、累計 GTS $1.5B 超。2013 年 58M 枚/$960M との報道もある[要約・要確認] | 初の買収。Series F $60M | [Wayback 2013-01-17](https://web.archive.org/web/20130117143000/http://twitter.com/eventbrite)、[Hypebot](https://www.hypebot.com/who-needs-ticketmaster-diy-ticketer-eventbrite-sold-58-million-tickets-in-2013) |
| 2014 | 1 件以上確認(03-13 $60M・評価額 $1B 超報道) | 2014-07: TechCrunch が Julia と Kevin Hartz の Disrupt SF 登壇を告知。2014-12: Twitter フォロワー 187,117(プロフィールデータの先頭値。ページ本文に別の数値 6,357 も出るため[要確認]) | [不明] / [不明] | GTS $1B 超(2013 通年、既存ノート由来) | ベルリン拠点(報道)[要約] | [TechCrunch 2014-07-29](https://techcrunch.com/2014/07/29/eventbrites-power-duo-julia-and-kevin-hartz-will-speak-at-disrupt-sf)、[Wayback 2014-12-17](https://web.archive.org/web/20141217021929/https://twitter.com/eventbrite) |
| 2015 | [不明] | Event 構造化データ導入(既存ノート由来)。Twitter フォロワー[不明] | [不明] / [不明] | 年 200 万件超のイベント(2016-04 時点) | — | [既存ノート由来] |
| 2016 | [不明] | 2016-04 Julia Hartz が CEO(Fortune に独占インタビュー)。2016-06-20 に Berlin の Female Founders Forum 登壇。2016-07 Facebook で直接購入 | $48.4M(36.2%)/ [不明] | 有料 44.6M、純収益 $133.5M | Facebook 連携(「提携前の 2 倍」は自社主張) | [Fortune 2016-04-21](https://fortune.com/2016/04/21/eventbrite-ceo-julia-hartz)、[London Tech Week 登壇者紹介](https://londontechweek.com/speakers/julia-hartz)、[既存ノート由来] |
| 2017 | [不明] | 約 1,400 本のコンテンツを公開したのは 2018 年(下記)。2017 年は未確認 | $55.2M(27.4%)(FY2019 組替後 $59.7M・29.6%)/ $1.9M(0.9%) | 有料 71.0M(+59%)、純収益 $201.6M(+51%)、主催者 70 万超 | Ticketscript・Ticketfly 買収($201.1M)、Series G。広告費は FY2019 10-K の 3 年比較から | [FY2019 10-K 広告費(検索要約)](https://www.sec.gov/Archives/edgar/data/1475115/000147511520000021/eb-20191231.htm)、[既存ノート由来] |
| 2018 | [不明](8-K は 3 件=10〜11 月のみ) | 2018-09 NYSE 上場。10-K: 約 1,400 本のコンテンツを 5 言語・11 か国向けに公開(2018 年に公開した数) | $69.8M(23.9%)(組替後 $83.4M・28.6%)/ $1.6M(0.5%) | 有料 97.3M(+37%)、純収益 $291.6M(+45%)、主催者 79 万超 | 買収の貢献(上期成長の約 4 割)。Ticketfly の不正アクセス(06)と停止決定(11) | [FY2018 10-K](https://www.sec.gov/Archives/edgar/data/1475115/000147511519000007/ebform10-kx2018123118.htm)、[既存ノート由来] |
| 2019 | [不明](8-K 11 件) | Twitter のスナップショットは月次で存在(フォロワー数は[不明]) | $102.9M(31.5%)/ $4.6M(1.4%) | 有料 109.4M(+12%)、純収益 $326.8M(+12%)、主催者 94.9 万超 | Ticketfly 停止による移行ロス。株価が IPO 価格割れ | [FY2019 10-K](https://www.sec.gov/Archives/edgar/data/1475115/000147511520000021/eb-20191231.htm) |
| 2020 | [不明](8-K 18 件、コロナ関連の臨時開示が多い) | 4 月に営業の約 9 割を含む約 45% を解雇 | $84.3M(79%)/ [不明] | 有料 47.1M(-57%)、純収益 $106.0M(-68%) | コロナ | [既存ノート由来] |
| 2021 | [不明](8-K 9 件) | 2021-05-06 Boost 発表。2021-05-20/21 無料バーチャルサミット RECONVENE。Q4 に RECONVENE 4 回で 4,000 人超が登録 | $35.9M(19%)(引当戻し $39.5M を含む)/ [不明] | 有料 67.4M(+43%)、純収益 $187.1M(+77%)、作成者 約 66 万 | コロナ後の回復。Eventbrite 自身のチャネル(サイト・アプリ・メール・フォロー)が無料・有料チケットの約 25%($580M 超) | [Q4 2021 株主レター](https://www.sec.gov/Archives/edgar/data/1475115/000147511522000022/shareholderletter.htm)、[RECONVENE 告知 2021-04](https://www.eventbrite.com/blog/?p=49954)、[FY2021 10-K](https://www.sec.gov/Archives/edgar/data/1475115/000147511522000032/eb-20211231.htm) |
| 2022 | 公式ニュースルーム 15 件(9〜12 月のみ)、8-K 8 件 | 2022-09-08 Eventbrite Academy(13 コースの無料学習センター)。2022-11-16 に Trends Report 4 本を同日公開。2022-06 Eventbrite Ads | $49.3M(19%)/ $4.3M(1.6%) | 有料 87.1M(+29%)、純収益 $260.9M(+39%) | 回復の継続 | [Academy 紹介](https://www.eventbrite.com/blog/introducing-eventbrite-academy/)、[ニュースルーム p6・p7](https://www.eventbrite.com/blog/press/newsroom/page/6/)、[FY2024 10-K 広告費(検索要約)](https://www.sec.gov/Archives/edgar/data/1475115/000147511525000026/eb-20241231.htm) |
| 2023 | ニュースルーム 13 件、8-K 10 件 | 2023-05-02 消費者向けキャンペーン GTFO(Get The F** Out)。10 月・12 月にインフルエンサーと提携(Tyler Cameron、Paige DeSorbo・Hannah Berner)。2023-03 Fast Company「最も革新的な企業 50」 | $74.6M(23%)/ $13.3M(4.1%) | 有料 93.4M(+7%)、純収益 $326.1M(+25%)、単価 $3.00→$3.49 | 1 月値上げ、2023-06 主催者手数料(無料イベント含む) | [ニュースルーム p5](https://www.eventbrite.com/blog/press/newsroom/page/5/)、[FY2023 10-K](https://www.sec.gov/Archives/edgar/data/1475115/000147511524000042/eb-20231231.htm) |
| 2024 | ニュースルーム 20 件、8-K 9 件 | 2024-03 Elevate 春リリース、2024-07-16 TikTok 提携、LinkedIn 月次ニュースレター(Julia Hartz)。2024-09-04 に無料イベントの手数料を撤回 | $92.0M(28%)/ $8.3M(2.6%) | 有料 83.8M(-10%)、純収益 $325.1M(-0.3%) | 手数料の影響、チャージバック対応 +$14.1M(S&M に含む) | [ニュースルーム p3・p4](https://www.eventbrite.com/blog/press/newsroom/page/4/)、[Shorty Awards エントリ](https://shortyawards.com/10th-impact/will-update) |
| 2025 | ニュースルーム 20 件、8-K 11 件 | 2025-03-04 ブランド刷新・「Get Into It」・アプリ再構築・It-Lists を同日に公表(3 本)。2025-09-02 子会社 Britehouse。2025-11-18 の発表で月間平均アクティブユーザー 92M を記載 | $81.2M(28%)/ [不明] | 有料 78.9M(-6%)、純収益 $291.8M(-10%) | 撤回後も回復せず。2025-12 Bending Spoons が買収発表 | [ニュースルーム p2・p3](https://www.eventbrite.com/blog/press/newsroom/page/2/)、[FY2025 10-K](https://www.sec.gov/Archives/edgar/data/1475115/000147511526000005/eb-20251231.htm) |
| 2026(10 月まで) | ニュースルーム 11 件、8-K 3 件(3 月まで) | 2026-01 初の Social Study Report、毎月の Gen Z 向けトレンド PR、Substack「britegeist」(月次、2026 年 9 月ごろ開始) | [不明](非上場化) | [不明] | 2026-03-10 買収完了。新体制は SEO を優先5領域に含める | [ニュースルーム p1](https://www.eventbrite.com/blog/press/newsroom/)、[既存ノート由来] |

## 4. プレスリリース

### 4.1 年別件数

| 年 | 本調査で確認した件数 | 内訳・注意 |
| :-- | :-- | :-- |
| 2008 | 1 | 2008-06-02「Eventbrite Closes First Financing to Accelerate Growth」(公式ブログに再掲)[事実] |
| 2009 | 2 以上 | 11-04 Series C(TechCrunch 報道ほか)、12-29 大晦日関連(Ticketnews 掲載)[二次] |
| 2010 | 4 以上 | 04-13 Q1 実績(広報会社 LaunchSquad、PRWeb 配信)、09-23 Facebook 連携、10-06 Series D(Marketwire)ほか |
| 2011 | [不明] | ワイヤー配信は確認できず |
| 2012 | 2 以上 | 06-18 累計 $1B、10-23 Social Commerce Report |
| 2013 | 2 以上 | 04-22 $60M(公式ブログ)、09 買収 |
| 2014 | 1 以上 | 03-13 資金調達(報道) |
| 2015–2017 | [不明] | 検索では各年の件数を数えられる一覧が見つからなかった |
| 2018–2020 | [不明] | 8-K の提出数のみ把握(2018: 3、2019: 11、2020: 18。8-K/A を含む) |
| 2021 | [不明](8-K 9 件) | ニュースルームは 2021-11-22 の 1 件のみ表示 |
| 2022 | 15(9〜12 月) | 公式ニュースルーム。ニュースルームは 2021-11 から始まるため通年ではない |
| 2023 | 13 | 同上。うち 1 件は題名なし(2023-06-22) |
| 2024 | 20 | 同上 |
| 2025 | 20 | 同上 |
| 2026(10 月まで) | 11 | 同上 |

注意: 「ニュースルーム」件数は、資金・財務の公式リリースに加えて、トレンドレポート、パートナーシップ、人事発表、イベント企画を含む広報投稿の総数である。Business Wire の配信一覧とは同じではない。8-K は決算・財務イベントの開示で、プレスリリースとは別物(参考値)。ニュースルーム一覧は WebFetch の要約であり、各ページの項目は要約者が列挙した。

出典: ニュースルーム [p1](https://www.eventbrite.com/blog/press/newsroom/) / [p2](https://www.eventbrite.com/blog/press/newsroom/page/2/) / [p3](https://www.eventbrite.com/blog/press/newsroom/page/3/) / [p4](https://www.eventbrite.com/blog/press/newsroom/page/4/) / [p5](https://www.eventbrite.com/blog/press/newsroom/page/5/) / [p6](https://www.eventbrite.com/blog/press/newsroom/page/6/) / [p7](https://www.eventbrite.com/blog/press/newsroom/page/7/)(いずれも 2026-10-16 取得)。8-K 件数: [SEC EDGAR 提出一覧](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=1475115&type=8-K&dateb=&owner=include&count=100)(WebFetch 要約、2026-10-16 取得)。

### 4.2 上場前後の頻度の違い [推測]

- 初期(2008〜2014)は、確認できた範囲では年 1〜4 件で、中身は資金調達・マイルストーン(累計 $1B など)・データ PR(Social Commerce Report)にほぼ限られる。件数は[不明]な年が多く、少ないとは断定できない。
- 上場後は、決算に伴う開示(8-K)が年 8〜18 件の下地としてあり、2022 年以降は公式ニュースルームが月 1〜2 件のペースで、トレンドレポート、Gen Z 向け調査、ブランド・パートナー発表を出している(2024・2025 は各 20 件)。「調査データを PR 化する運用」は 2010 年の Social Commerce 型と同じ系譜で、2022 年以降に頻度が上がった。

### 4.3 主要リリース

| 日付 | 内容 | 出典 |
| :-- | :-- | :-- |
| 2008-06-02 | 最初の外部資金(European Founders Fund 主導)、サイト再公開。Kevin Hartz「非常に限られた資源で有機成長」、黒字と主張(額は非開示) | [公式ブログ](https://www.eventbrite.com/blog/?p=49650) |
| 2010-04-13 | Q1 の GTS $40.9M、ソーシャル経由の流入が前年比 250% 超、累計イベント 20 万超、Yelp 共同創業者が投資家・アドバイザーに。「最も成長の速いソーシャル・コマース企業」と自称 | [公式ブログ](https://www.eventbrite.com/blog/?p=49634) |
| 2010-10-06 | Series D $20M | [公式ブログ](https://www.eventbrite.com/blog/?p=49627) |
| 2012-10-23 | Social Commerce Report(データ PR) | [公式ブログ](https://www.eventbrite.com/blog/?p=49597) |
| 2021-04-21 | RECONVENE(5/20–21 開催)の告知 | [Business Wire](https://www.businesswire.com/news/home/20210421006043/en)、[公式ブログ](https://www.eventbrite.com/blog/?p=49954) |
| 2023-05-02 | 消費者向け新ブランドキャンペーン「GTFO(Get The F** Out)」 | [ニュースルーム p5](https://www.eventbrite.com/blog/press/newsroom/page/5/) |
| 2024-07-16 | TikTok 提携 | [ニュースルーム p4](https://www.eventbrite.com/blog/press/newsroom/page/4/) |
| 2024-09-04 | 無料イベントの手数料を撤回し、マーケティングツールを全主催者に開放 | 同上 |
| 2025-03-04 | ブランド刷新+アプリ再構築+「Get Into It」+It-Lists の 3 本同日リリース | [ニュースルーム p3](https://www.eventbrite.com/blog/press/newsroom/page/3/)、[Business Wire](https://www.businesswire.com/news/home/20250304175630/en/Get-Into-It-Eventbrites-Reimagined-App-Makes-Discovering-Your-Next-Favorite-Live-Experience-as-Enjoyable-as-Being-There) |

## 5. 公式 SNS

| アカウント | 開設時期 | フォロワー数(時点付き) | 投稿頻度の目安 | 出典 |
| :-- | :-- | :-- | :-- | :-- |
| X(@eventbrite、旧 Twitter) | 2009-01-02 の Wayback スナップショットが最古(開設は遅くともそれ以前)。正確な開設日は[不明] | 2009-09-19: 3,317(フォロー 3,051)/ 2010-10-09: 12,725(フォロー 4,790、リスト 570、ツイート累計 4,289)/ 2012-01-03: 71,576(フォロー 5,943、リスト 1,499)/ 2013-01-17: 125,316/ 2014-12-17: 187,117(プロフィールデータの先頭値。ページ本文には 6,357 という別の数値もあり[要確認])/ 2015 以降[不明]/ 現在[不明] | 2009-09 のスナップショットでは 9 月 9 日〜17 日の約 9 日間に約 20 投稿(1 日 2 件前後)[推測、単一ページからの概算]。2010-10 時点でツイート累計 4,289 | [Wayback 2009-09-19](https://web.archive.org/web/20090919190828/http://twitter.com/eventbrite)、[2010-10-09](https://web.archive.org/web/20101009134309/http://twitter.com/eventbrite)、[2012-01-03](https://web.archive.org/web/20120103140018/http://twitter.com/eventbrite)、[2013-01-17](https://web.archive.org/web/20130117143000/http://twitter.com/eventbrite)、[2014-12-17](https://web.archive.org/web/20141217021929/https://twitter.com/eventbrite) |
| Instagram(@eventbrite) | [不明] | 約 25.3 万(WebFetch 取得、2026-10 時点)。プロフィールに主催者向け別アカウント @eventbriteorganizers への誘導あり | 12 件以上の最近の投稿を確認、頻度は[不明] | [Instagram](https://www.instagram.com/eventbrite/) |
| Facebook | [不明] | [不明](2011〜2014 の検索でもページの「いいね」数は見つからなかった) | [不明] | — |
| LinkedIn(企業ページ) | [不明] | [不明] | [不明] | — |
| TikTok | [不明] | [不明](読み込み待ち表示で取得失敗)。2024-07-16 に TikTok と公式提携 | [不明] | [ニュースルーム p4](https://www.eventbrite.com/blog/press/newsroom/page/4/) |
| YouTube | [不明] | [不明](取得失敗) | [不明] | — |
| Julia Hartz(LinkedIn) | [不明] | 約 8.4 万(検索結果の表示、時点不明)[要約] | 月次ニュースレター(下記) | [LinkedIn](https://linkedin.com/in/juliahartz) |

補足:
- 公式サイトのフッターは Facebook、X、Instagram、LinkedIn、YouTube、TikTok を並べている(2026 年のニュースルーム由来)[要約]。
- 2012 年の Social Commerce Report では、収益への寄与は Twitter より Facebook が大きかった(2010 年: Facebook の共有 1 回あたり $2.52 に対し Twitter は $0.43、2012 年: $4.15 と $1.85。既存ノート由来)。つまり X のフォロワーが 12.7 千→125 千に増えた時期でも、収益を作っていたのは主に利用者の共有行動である。[推測]
- 2009-09 の X 投稿には、アフィリエイト(新規主催者を紹介すると 1 件ごとに追加 $50)の告知があり、公式アカウントが「紹介インセンティブの周知」にも使われていた。[事実]

## 6. オウンドメディア

| 項目 | 内容 | 時期・規模 | 出典 |
| :-- | :-- | :-- | :-- |
| 公式ブログ | 検索で確認できた日付つきの最古の記事は 2008-06-02(資金調達)。ブログの開始日は[不明]。現行ブログは 4 カテゴリ(Tips & Guides、News & Trends、Community、Tools & Features)。年別アーカイブ URL が全体一覧に解決され、268 ページ×9 件/ページ(約 2,400 件)と表示された[推計・要確認。全体の記事数かどうか未検証] | 2026-06 時点で 1 日に複数本の更新(6/16・6/18 に各複数) | [公式ブログ](https://www.eventbrite.com/blog/?p=49650)、[アーカイブ一覧](https://www.eventbrite.com/blog/2009/) |
| SEO 向けコンテンツ | 10-K FY2018: 「2018 年に約 1,400 本のコンテンツを公開」。5 言語に翻訳、11 か国向けに最適化。目的は主催者(クリエイター)に「質の高い専門記事がある場所」として認知され、イベント運営ツールとして見つけてもらうこと。**既存ノートの「約 1,400 本」は累計ではなく 2018 年 1 年間の公開数**と読むのが原文に近い | 2018 | [FY2018 10-K](https://www.sec.gov/Archives/edgar/data/1475115/000147511519000007/ebform10-kx2018123118.htm) |
| Eventbrite Academy | 2022-09-08 に公開。SNS・イベントマーケの無料オンデマンド学習センター。13 コース完了で「Event Marketing Expert」認定。受講者数は紹介記事には記載なし(検索要約には「開始 1 か月で 800 人超が受講」とあるが原本で未確認[要約]) | 2022-09 | [紹介記事](https://www.eventbrite.com/blog/introducing-eventbrite-academy/) |
| RECONVENE | 無料の 2 日間バーチャルサミット(2021-05-20/21、Priya Parker らが登壇)。参加者数は告知記事に記載なし。Q4 2021 に 4 回のセッションで 4,000 人超が登録。2022 年はイベント数を約 3 倍にし 20 万人到達を目標。サミット参加者は LTV が高く手数料の伸びが平均より 20% 大きい(自社主張。参加者が元々熱心である選択バイアスを含む) | 2021 | [告知](https://www.eventbrite.com/blog/?p=49954)、[Q4 2021 株主レター](https://www.sec.gov/Archives/edgar/data/1475115/000147511522000022/shareholderletter.htm) |
| Trends Report | 2022-11-16 に総合・音楽・フード・2023 予測の 4 本を同日公開 | 2022 | [ニュースルーム p6](https://www.eventbrite.com/blog/press/newsroom/page/6/) |
| Social Study Report | 2026-01-14 に「初の」ソーシャル調査レポート。以後毎月、Gen Z 向けトレンド PR を継続 | 2026 | [ニュースルーム p1](https://www.eventbrite.com/blog/press/newsroom/) |
| ニュースレター(主催者向け) | CEO の LinkedIn 月次ニュースレター「Small Business, Big Lessons」。応募エントリによると直近 90 日でフォロワー約 +300%、月間インプレッション平均約 30 万、読者「数万人」[自社主張。年・開始日は未記載、2024 年データを参照] | 2024 ごろ | [Shorty Awards](https://shortyawards.com/10th-impact/will-update) |
| ニュースレター(消費者向け) | 消費者向けのメール配信(「発見」経由が 2023 年に発券の 30% 超、既存ノート由来)。購読者数は[不明]。「Rally」「Discover」という名称の媒体は検索では確認できなかった | — | [既存ノート由来] |
| Substack「britegeist」 | 2026 年に開始した月次のライブ体験トレンドの解説(開始は 2026-09 ごろ、ニュースルームの「5 週間前」表記から) | 2026 | [ニュースルーム p1](https://www.eventbrite.com/blog/press/newsroom/) |
| Pulse Report | 検索では確認できなかった | — | [不明] |
| ポッドキャスト | 自社制作の番組は確認できなかった。CEO の出演はあり(§7) | — | — |

自社チャネルの寄与: Q4 2021 株主レターによれば、Eventbrite 自身のチャネル(サイト・アプリ・メール・フォロー)が 2021 年の無料・有料チケットの約 25%(主催者のチケット売上 $580M 超)を生み、2021 年の作成者の約 99% は「オーガニック検索・紹介・直接流入」で自己登録した。自社メディアの寄与は個別には分かれない。[事実、自社主張]

## 7. 創業者・経営者個人の発信

| 時期 | 人物 | 内容 | 出典 |
| :-- | :-- | :-- | :-- |
| 2010-03-30 | Kevin Hartz | Mixergy のインタビュー(流入順位、手数料設計、資金効率を語る) | [Mixergy](https://mixergy.com/?p=6825)(既存ノート由来) |
| 2011-06 | Julia・Kevin Hartz | TechCrunch の動画「Eventbrite founders on Facebook, Twitter and LinkedIn」(Founder Stories の記事は 2011-06-17) | [TechCrunch 動画](https://techcrunch.com/video/eventbrite-founders-on-facebook-twitter-and-linkedin/517158379/) |
| 2014-07 | Julia・Kevin Hartz | TechCrunch Disrupt SF 登壇の告知(登壇は 2014 年) | [TechCrunch 2014-07-29](https://techcrunch.com/2014/07/29/eventbrites-power-duo-julia-and-kevin-hartz-will-speak-at-disrupt-sf) |
| 2016-04 | Julia Hartz | CEO 就任。Fortune が独占インタビュー。以後の登壇は Fast Company Most Innovative Companies Summit、The Economist のイベント、The Information の Women in Tech 等(年は不明) | [Fortune](https://fortune.com/2016/04/21/eventbrite-ceo-julia-hartz)、[London Tech Week](https://londontechweek.com/speakers/julia-hartz) |
| 2016-06-20 | Julia Hartz | Berlin の Female Founders Forum に登壇 | 同上 |
| 2018-06 | Kevin Hartz | Founders Fund への参加(Fortune) | [Fortune](https://fortune.com/2018/06/07/kevin-hartz-founders-fund) |
| 2022-06 | Julia Hartz | Adam Mendler のポッドキャスト | [Adam Mendler](https://www.adammendler.com/blog/julia-hartz/)(既存ノート由来) |
| 2023-09-27 | Julia Hartz | Fortune「Leadership Next」ポッドキャスト、2023-10-02 に Fortune の別記事 | [Fortune](https://fortune.com/2023/09/27/eventbrite-ceo-julia-hartz-interview-pandemic-prices-public-tech-company/) |
| 2024 ごろ | Julia Hartz | LinkedIn の月次ニュースレター(上記)。LinkedIn Top Voice に認定(応募エントリの記載) | [Shorty Awards](https://shortyawards.com/10th-impact/will-update) |
| 2025-09-20 | Julia Hartz | Fox News Radio の番組に出演 | [Fox News Radio](https://radio.foxnews.com/2025/09/20/her-golden-ticket-out-of-a-warehouse-closet-julia-hartz-on-building-eventbrite) |
| 2026 | Julia Hartz | TechCrunch Build Mode(8 月)、Stay A While(2 月)等。検索結果では「元 CEO」と記載されるものがあり、去就は一次資料で未確認 | 検索要約[要約・要確認] |

- Kevin Hartz の X アカウントのフォロワー数は、第三者サイトで約 3.8 万(ページ下部)と 28.5 万(ページ見出し)が同時に出ており、俳優名との混同の可能性もあるため採用しない。[要確認]
- 創業者の発信が「成長前」にあったか「成長後」にあったかは、時期の根拠がそろわず判断できない。出演の多くは 2010 年以降(Series D 以降)や 2016 年以降(CEO 就任以降)で、成長期より後ろに分布している。[推測]
- Julia Hartz の CEO 就任(2016-04)の前後で、有料チケット(2016 年 44.6M→2017 年 71.0M)は伸びたが、同期間に Ticketscript・Ticketfly 買収、Facebook 販売連携もあり、個人の露出の寄与は切り分けられない。[推測]

## 8. 成長指標と S&M 費の時系列(2009–2025)

「既存」は既存ノートからの引き継ぎ、「新規」は本調査で追加した値。

| 年 | 有料チケット | 純収益 | S&M(売上比) | 広告費(売上比)[新規] | 広告費/S&M | 主催者(作成者)・訪問 | 出典 |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| 2009 | [不明] | [不明] | [不明] | [不明] | — | 月間 UU 300 万、主催者「数万」(2009-11) | 既存 |
| 2010 | 11M 枚超(二次、無料含む) | [不明] | [不明] | [不明] | — | 月間 460 万人訪問(2010-03、Hartz 発言) | 既存 |
| 2011–2015 | 年 36M 枚(2012、要約)、58M 枚(2013、要約)[要確認] | [不明] | [不明] | [不明] | — | 従業員 229 人(2013-04) | 既存+新規[要約] |
| 2016 | 44.6M | $133.5M | $48.4M(36.2%) | [不明] | — | — | 既存 |
| 2017 | 71.0M | $201.6M | $55.2M(27.4%)/組替後 $59.7M(29.6%) | $1.9M(0.9%) | 3.4%(組替前 S&M) | 主催者 70 万超 | 既存+新規(FY2019 10-K 3 年比較) |
| 2018 | 97.3M | $291.6M | $69.8M(23.9%)/組替後 $83.4M(28.6%) | $1.6M(0.5%) | 2.3%(組替前) | 主催者 79 万超、作成者 79 万 | 既存+新規 |
| 2019 | 109.4M | $326.8M | $102.9M(31.5%) | $4.6M(1.4%) | 4.5% | 作成者 94.9 万超 | 既存+新規 |
| 2020 | 47.1M | $106.0M | $84.3M(79%) | [不明] | — | — | 既存 |
| 2021 | 67.4M | $187.1M | $35.9M(19%) | [不明] | — | 作成者 約 66.2 万(有料イベントの作成者 約 14.1 万、Q4)、新規作成者 9 万 | 既存+新規(Q4 2021 株主レター) |
| 2022 | 87.1M | $260.9M | $49.3M(19%) | $4.3M(1.6%) | 8.7% | — | 既存+新規 |
| 2023 | 93.4M | $326.1M | $74.6M(23%) | $13.3M(4.1%) | 17.8% | 作成者 [不明] | 既存+新規 |
| 2024 | 83.8M | $325.1M | $92.0M(28%) | $8.3M(2.6%) | 9.0% | 有料作成者 368,000(-7%、既存) | 既存+新規 |
| 2025 | 78.9M | $291.8M | $81.2M(28%) | [不明] | — | 月間平均アクティブユーザー 92M(2025-11、プラットフォーム全体) | 既存+新規 |

- 広告費の出典: 2017–2019 は FY2019 10-K、2022–2024 は FY2024 10-K の会計方針表(いずれも検索結果の抜粋であり、本文は WebFetch で該当箇所に到達できなかった)[要約]。2020・2021・2025 は[不明]。売上比・広告費/S&M は本ノートの算出[推計]。
- 食い違い: ① 2018 年 S&M は FY2018 10-K で $69.8M、FY2019 10-K で $83.4M。FY2019 10-K は「2018 年に $13.6M、2017 年に $4.6M を組み替えた」と述べる。S&M に含まれる取得顧客関係の償却額(2017: $4.6M、2018: $10.2M、2019: $10.4M)と近く、償却費が S&M に移された可能性がある[推測]。② 2023 年の S&M 増加は、MD&A で「消費者向けキャンペーンに関するマーケ費が +$11.0M」「人件費関連 +$6.3M」。一方、広告費(advertising expense)は +$9.0M($4.3M→$13.3M)で、範囲が少し異なる。③ 2025 年の S&M 減少 -$10.8M は、チャージバック引当 -$10.1M が主因で、マーケ費の削減ではない。[事実]
- Web 訪問: Semrush の eventbrite.com 訪問数は 2025-10 で約 5,983 万、Sensor Tower の別指標は 2024 Q1 に月約 15 万のユニーク訪問(定義が異なり比較不可)[二次・要約・要確認]。2014〜2022 の月間 UU 時系列は取得できず[不明]。
- 主催者数の年別系列: 2016 以前は[不明]。2017〜2021 は上表のとおり(定義が「主催者」と「作成者」で揺れる)。

## 9. 相関の読み

前提: 以下は相関の観察で、因果の証明ではない。広告費・S&M は他の要因と同時に動いており、単独の効果は切り出せない。

### 9.1 初期(2006–2010): 発信は少数、成長は製品内の導線 [推測]

- 事実: 創業者 3 人が約 2 年ブートストラップし、最初の仮説は SEO(既存ノート由来)。2008-06 のリリースで Kevin Hartz は「非常に限られた資源で有機成長」と述べた(自社主張)。2009 年は前年比 3 桁成長、2010 年は GTS 約 $207M(二次)。Twitter は 2009-09 時点でフォロワー 3,317 人、2010-10 で 12,725 人と小さく、投稿の中身は顧客対応・アフィリエイト告知・イベント出展だった。
- 読み: 3 桁成長期のフォロワー数と広報は小さく、成長を牽引したのは(a) Google 自然検索、(b) Facebook 連携(2010-09 に友人の参加を表示、2010-10 には Facebook が最大の流入源)、(c) 参加者が次の主催者になる口コミ(2016 年調査で約 70%)といった製品内の導線である、という読みが整合する。SNS 公式アカウントの規模と GTS の伸びは同時期に上がっているが(X のフォロワーは 2010-10 の 12.7 千→2013-01 の 125 千で約 10 倍、GTS は 2010 年約 $207M→2013 年 $1B 超で約 5 倍)、フォロワーは「大きくなった結果」でもあり、逆因果を排除できない。
- 例外・補足: TechCrunch は Eventbrite の利用者でもあり(自社イベントで利用)、Series C 報道(2009-11)は露出になったが、露出の流入・登録への効果は[不明]。TC50 では booth と登録業務を役務で請け負い、現金のスポンサー費を避けた(既存ノート由来、2009-09 の X 投稿でも確認)。
- 他の要因: Facebook Connect(2008)・event graph(2010)、Series D(2010-10)で $20M を調達し人員を増やした時期と重なる、無料イベント主催者の有料転換(約 17%)、手数料が売れた分に連動する料金設計。

### 9.2 上場後(2018–2022): S&M 増減と有料チケット [推測]

- 事実: 売上比 S&M は 2016 年 36.2%→2017 年 27.4%(組替前)と下がる一方、有料チケットは +59%、純収益は +51%。2018 年は S&M が $69.8M(組替後 $83.4M)で有料 +37%。2019 年は S&M $102.9M(+23% 対組替後 2018 年)で有料 +12%(Ticketfly 停止の移行ロスと買収統合の影響を含む)。2020 年は COVID で有料 -57%。2021 年は引当戻し $39.5M と人員 40% 減で S&M が $35.9M まで低下したが、有料は +43%。2022 年は S&M $49.3M で有料 +29%。
- 読み: S&M 額と有料チケットの増減は、一貫した方向で連動していない。2017 年(S&M は伸びたが売上比は低下)に最も速く成長し、2021 年(S&M が 57% 減)でも回復で成長した。S&M は人件費・償却・引当を含むため、純粋なマーケ費ではなく、チケット数との関係は本来読みづらい。広告費だけを見ると、2018 年 $1.6M(売上比 0.5%)でも有料 +37% だった。広告費が 2019 年に約 3 倍($4.6M)になった年は成長が +12% に鈍ったが、これは Ticketfly 停止の影響が大きい。[推測]
- 他の要因: 買収(Ticketscript・Ticketfly で 2018 年上期成長の約 4 割)、Ticketfly の停止、COVID(2020)、イベント再開後の需要(2021–2022)、Facebook 販売連携(2016-07)。

### 9.3 2023–2025: 広告・キャンペーンと有料チケット [推測]

- 事実: 2023 年は広告費が $4.3M→$13.3M(+$9.0M)、MD&A では消費者向けキャンペーンのマーケ費が +$11.0M。2023-05-02 に GTFO キャンペーンを開始し、秋以降はインフルエンサーと提携。同時に 1 月の値上げと 6 月の主催者手数料(無料イベント含む)を導入した。有料チケットは +7%(87.1M→93.4M)だが、純収益は +25%(単価 $3.00→$3.49 が主因)。2024 年は広告費 $8.3M(-$5.0M)で有料 -10%、手数料は 2024-09-04 に撤回。2025 年は 2025-03-04 にブランド刷新と「Get Into It」を始め、有料 -6%、純収益 -10%。同社が示した効果は Q1 2025 の「アプリ経由の有料チケット +11%、アプリの月間利用者 +13%」のみ(自社主張)。
- 読み(a) 2023 年: 広告費 $9.0M の増分に対し、有料チケットの増分は 6.4M 枚。1 枚あたりの手数料収入(約 $3.49)と比べると、広告が直接取り戻した分があるとしても、他の要因(値上げ、主催者手数料、需要の回復)と区別できない。2023 年の +7% は、同年の主催者離れ(手数料)の影響を含みうる。
- 読み(b) 2024 年: 広告費を減らした年に有料が -10% になったが、同社は 2024 Q2 に「価格モデルと主催者手数料が、作成者の獲得・維持を阻害した」と認めており(既存ノート由来)、-10% の主因は広告ではなく主催者側の供給減と読むのが自然。
- 読み(c) 2025 年: ブランド刷新後も全体は -6% で、アプリ経由の +11% は全体の反転には至っていない。刷新の費用(広告費)は[不明]。キャンペーンは自社チャネル(SNS・コンテンツ・アプリ内)中心で、テレビ等のマス出稿は確認できない。2025-03 の発表は、ブランド、アプリ、It-Lists が同日に出ており、キャンペーン単独の効果は切り分けられない。
- 他の要因: 無料イベント主催者手数料(2023-06〜2024-09)、Facebook・Google・App Store への依存、AI による発見インターフェースの変化(10-K のリスク)、主催者の収益集中、2024 年のチャージバック増(S&M に影響)、買収決定前後の経営の不安定。

### 9.4 まとめ [推測]

| 局面 | 発信・広告の規模 | 成長 | 読み |
| :-- | :-- | :-- | :-- |
| 初期(2006–2010) | 小(PR は年 1〜4 件確認、X は 1.3 万人まで) | 非常に速い(3 桁成長) | 発信ではなく製品内の共有・検索・口コミが主因と整合。逆因果(大きくなったからフォロワーが増えた)も残る |
| 上場後(2018–2022) | 広告費は売上の 0.5〜1.6%、S&M は 19〜32% | 買収・COVID に支配され、発信量との対応は読めない | 発信量と成長の対応は一貫せず |
| 2023–2025 | 広告費が 4.1%→2.6%、ブランドキャンペーンを 2 回実施 | +7% → -10% → -6% | キャンペーン後に反転した証拠はなく、手数料と主催者側の供給が支配的 |

## 10. 「発信していないのに伸びた」「発信したのに伸びなかった」候補

### 発信が小さいのに伸びた [推測]
- 2008〜2010: 公式 PR は少数、X は 1 万人規模で GTS が 3 桁成長(上記)。
- 2018 年: 広告費 $1.6M(売上比 0.5%)で有料 +37%、純収益 +45%(買収を含む)。
- 2021〜2022 年: 広告費 $4.3M(2022、売上比 1.6%)で有料 +29%。COVID 後の需要回復が主因。

### 発信したのに伸びなかった [推測]
- 2019 年: 広告費が $1.6M→$4.6M と約 3 倍になったが、有料の伸びは +37%→+12%(ただし Ticketfly 停止の影響が大きい)。
- 2023 年: 広告費 $13.3M(売上比 4.1%)と GTFO・インフルエンサー提携を実施したが、有料 +7% に留まり、翌年に -10%(手数料の逆風が同時にあるため、広告の効果自体の有無は不明)。
- 2025 年: ブランド刷新+「Get Into It」+It-Lists を同日公開したが、通年は有料 -6%・純収益 -10%(アプリ経由 +11% は部分的な改善)。
- 2022〜2026 年: ニュースルームは年 20 件前後のトレンド PR を出す運用だが、同期間の有料チケットは 2023 年をピークに減少。PR の件数と成長は対応しない。[推測]

## 11. 未確認事項(Gaps)

- 2011・2015〜2017 のプレスリリース件数、投資家ページの全リリース一覧(上場後)。
- X の 2015〜2022 のフォロワー数(Wayback の 2016-12 以降は JS 実行の拒否により取得中止)、X・Facebook・LinkedIn(企業)・TikTok・YouTube の現在値と開設日。
- 2014-12 の X フォロワー数 187,117 の確認(ページ本文の 6,357 との食い違い)。
- ブログの開始日と総記事数、2000 年代の記事数・更新頻度。Pulse Report、Rally、Discover の実在確認。
- 広告費 2020・2021・2025、マーケ施策費(marketing programs)の総額、GTFO と「Get Into It」の費用と効果の一次データ。
- 月間 UU の時系列(2009〜2025)、主催者数の 2009〜2015 の系列。
- Julia・Kevin Hartz の登壇・出演の網羅、Julia Hartz の X アカウントと現在の役職。
- 2023-05 の GTFO キャンペーンの規模(テレビ・屋外の有無は検索では確認できず)。
- 2016-12 の Wayback ページ以降のスナップショット(フォロワー数)。

## 12. 出典一覧(取得日はすべて 2026-10-16〜17。個別ページの日付は本文に記載)

一次資料・公式:
- Eventbrite 公式ブログ 2008-06-02(初の資金調達): https://www.eventbrite.com/blog/?p=49650
- 公式ブログ 2009-11-09(Series C): https://www.eventbrite.com/blog/?p=49641
- 公式ブログ 2010-04-13(Q1 実績): https://www.eventbrite.com/blog/?p=49634
- 公式ブログ 2010-10-06(Series D): https://www.eventbrite.com/blog/?p=49627
- 公式ブログ 2012-10-23(Social Commerce Report): https://www.eventbrite.com/blog/?p=49597
- 公式ブログ RECONVENE 告知(2021-04): https://www.eventbrite.com/blog/?p=49954
- 公式ブログ Eventbrite Academy 紹介(2022-09-08): https://www.eventbrite.com/blog/introducing-eventbrite-academy/
- 公式ニュースルーム p1〜p7: https://www.eventbrite.com/blog/press/newsroom/ (page/2〜page/7)
- 公式ブログのアーカイブ一覧: https://www.eventbrite.com/blog/2009/
- Business Wire 2025-03-04(Get Into It): https://www.businesswire.com/news/home/20250304175630/en/Get-Into-It-Eventbrites-Reimagined-App-Makes-Discovering-Your-Next-Favorite-Live-Experience-as-Enjoyable-as-Being-There
- Business Wire 2025-11-18(Listener.com 提携と 1 年の振り返り。月間平均アクティブユーザー 92M の記載は検索要約): https://www.businesswire.com/news/home/20251118599275/en/Eventbrite-Announces-Listener.com-Partnership-and-Highlights-a-Year-of-
- Q4 2021 株主レター: https://www.sec.gov/Archives/edgar/data/1475115/000147511522000022/shareholderletter.htm
- 10-K FY2018: https://www.sec.gov/Archives/edgar/data/1475115/000147511519000007/ebform10-kx2018123118.htm
- 10-K FY2019: https://www.sec.gov/Archives/edgar/data/1475115/000147511520000021/eb-20191231.htm
- 10-K FY2021: https://www.sec.gov/Archives/edgar/data/1475115/000147511522000032/eb-20211231.htm
- 10-K FY2023: https://www.sec.gov/Archives/edgar/data/1475115/000147511524000042/eb-20231231.htm
- 10-K FY2024: https://www.sec.gov/Archives/edgar/data/1475115/000147511525000026/eb-20241231.htm
- 10-K FY2025: https://www.sec.gov/Archives/edgar/data/1475115/000147511526000005/eb-20251231.htm
- Q3 2023 10-Q(9 か月の S&M +$7.0M、検索要約): https://www.sec.gov/Archives/edgar/data/1475115/000147511523000166/eb-20230930.htm
- SEC 提出一覧(8-K): https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=1475115&type=8-K&dateb=&owner=include&count=100

Wayback Machine(X のスナップショット):
- 2009-09-19: https://web.archive.org/web/20090919190828/http://twitter.com/eventbrite
- 2010-10-09: https://web.archive.org/web/20101009134309/http://twitter.com/eventbrite
- 2012-01-03: https://web.archive.org/web/20120103140018/http://twitter.com/eventbrite
- 2013-01-17: https://web.archive.org/web/20130117143000/http://twitter.com/eventbrite
- 2014-12-17: https://web.archive.org/web/20141217021929/https://twitter.com/eventbrite
- CDX 一覧(2009-01〜2022-12 の月次スナップショットを確認): https://web.archive.org/cdx/search/cdx?url=twitter.com/eventbrite&output=json&filter=statuscode:200&collapse=timestamp:6&from=2009&to=2022

報道・第三者:
- TechCrunch 動画(創業者が Facebook・Twitter・LinkedIn を語る、2011): https://techcrunch.com/video/eventbrite-founders-on-facebook-twitter-and-linkedin/517158379/
- TechCrunch 2014-07-29(Disrupt SF 登壇): https://techcrunch.com/2014/07/29/eventbrites-power-duo-julia-and-kevin-hartz-will-speak-at-disrupt-sf
- Fortune 2016-04-21: https://fortune.com/2016/04/21/eventbrite-ceo-julia-hartz
- Fortune 2018-06-07: https://fortune.com/2018/06/07/kevin-hartz-founders-fund
- Fortune 2023-09-27 Leadership Next: https://fortune.com/2023/09/27/eventbrite-ceo-julia-hartz-interview-pandemic-prices-public-tech-company/
- Fox News Radio 2025-09-20: https://radio.foxnews.com/2025/09/20/her-golden-ticket-out-of-a-warehouse-closet-julia-hartz-on-building-eventbrite
- Shorty Awards エントリ(CEO ニュースレター、自己申告): https://shortyawards.com/10th-impact/will-update
- London Tech Week 登壇者紹介: https://londontechweek.com/speakers/julia-hartz
- Ticketnews(2009-12 大晦日関連): https://www.ticketnews.com/2009/12/eventbrite-helps-event-organizers-promote-new-years-eve-parties/
- Vator(2012-06-18 累計 $1B): https://vator.tv/2012-06-18-eventbrite-hits-major-milestone-1b-in-tickets-sold/
- Hypebot(2013 年 58M 枚、検索要約): https://www.hypebot.com/who-needs-ticketmaster-diy-ticketer-eventbrite-sold-58-million-tickets-in-2013
- Instagram: https://www.instagram.com/eventbrite/
- LinkedIn(Julia Hartz): https://linkedin.com/in/juliahartz
- Semrush(eventbrite.com): https://www.semrush.com/website/eventbrite.com/overview/
- Sensor Tower: https://sensortower.com/blog/2024-q1-es-leading-3-Experiences---Events-brands

既存ノート(引用元の流用): `documents/14_競合調査/90_調査ノート原本/02_グロースストーリー調査/01_eventbrite.md`
