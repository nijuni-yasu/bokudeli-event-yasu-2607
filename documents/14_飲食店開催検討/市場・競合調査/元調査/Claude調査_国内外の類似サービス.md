# 飲食店向けコミュニティSaaS / CRM / コミュニケーションサービス 国内外調査レポート（shokujii 追加機能検討用）

調査した範囲では、「飲食店×オンラインコミュニティ（掲示板・チャット）×メンバー主催の貸切イベント×月額サブスク課金」をひとつにまとめて提供するサービスは、国内にも海外にも見つかりませんでした。既存サービスはいずれも「CRM・ロイヤルティ」「サブスク会員券」「予約・イベントチケット」「汎用ファンコミュニティ」「ソーシャルダイニング」のどれか1〜2領域に特化しており、shokujiiが狙う組み合わせはホワイトスペースとみなしてよいと考えます。ただし空白には理由があります。過去の撤退事例は、需要の密度とイベント運営コストという構造的な難しさを示しています。

## TL;DR
- **一体型の先行サービスはない**：国内ではfavyサブスク（サブスク＋顧客管理）、レストラン★スター（会員アプリ＋アンケート＋グループ配信）、coorum（コメダ珈琲・タリーズのファンコミュニティ）が部分的に重なります。海外ではSevenRooms（CRM）、Tock（イベントチケット）、Table22（サブスク）、Dorsia（会員制予約）、Timeleft（ソーシャルダイニング）が該当します。「会員が自分で店を貸し切ってイベントを主催する」機能を店舗のコミュニティと課金に組み込んだ製品は確認できませんでした。
- **市場の評価は高い**：DoorDashはForm 10-Q（2025年第1四半期）によると、2025年5月3日にSevenRoomsを「approximately $1.2 billion in an all-cash transaction」で買収する契約を結び、FY2025年次報告書では2025年6月13日に完了、取得対価の公正価値は11.52億ドル（現金9.02億ドル＋繰延現金2.5億ドル）とされています。American Expressは2024年6月21日のプレスリリースで「American Express will acquire Tock for $400M in cash」と発表しました。Dorsia（5,040万ドル）、Blackbird（シリーズB 5,000万ドル）、Table22（シリーズA 1,100万ドル）など、「レストランと常連の関係」領域には大型の資金が流れています。
- **勝ち筋は「メンバー主催の貸切」をコアの差別化に据え、既存インフラの上に作ること**です。具体的には、LINEで通知、Stripe Connectで決済し、shokujiiの強みである食のインクルーシブ対応（アレルギー・宗教・ヴィーガン等）を組み合わせます。Dinner Lab、KitchHike、Timeleftの経験から得られる教訓は「イベント運営を自前で抱えない」「需要の密度が低い地域で広げすぎない」の2点です。

## Key Findings

1. **カテゴリは5つに分かれ、一体型はない。** 飲食店向けの既存サービスは、(A) CRM・ロイヤルティ・LINE販促、(B) 店舗サブスク・会員制、(C) 予約・イベントチケット・貸切スペース、(D) 汎用ファンコミュニティSaaS、(E) ソーシャルダイニング（ユーザー主催・マッチング型の食事会）に分かれます。それぞれの領域に有力なプレイヤーがいますが、A〜Eを横断する製品はありません。
2. **国内で最も近いのは「favyサブスク」と「レストラン★スター」。** どちらもサブスクまたは会員管理と配信機能を持ちますが、会員同士が交流する場（掲示板・チャット）と、会員主催の貸切イベントはありません。
3. **飲食の「ファンコミュニティ」は大手チェーンの専用サイトにとどまっている。** coorum上で運営されるコメダ珈琲「さんかく屋根の下」は、coorumの導入事例ページでコメダ カスタマーリレーション本部の松岡氏が「会員数が現在1万人ほど」と述べています（掲載日不明）。一方、日経ビジネスは「コメダ珈琲、ファンサイト会員3万人」と報じており、数字が食い違っています。タリーズ「TULLY'S community Hello!」もcoorum上にあります。これらは本部主導のブランドコミュニティで、個店が月額で使えるSaaSにはなっていません。
4. **海外の大手は「予約×CRM×イベント」を寡占化しつつある。** SevenRooms（13,000以上の施設）はDoorDash傘下に入りました。Resy（2019年買収）とTockはAmerican Express傘下にあり、Tockは同社の2024年6月21日のプレスリリースによると「reservation, table management and event ticketing tools to approximately 7,000 restaurants, wineries, and other bookable venues」を提供しています。ただし両陣営とも「店→顧客」の一方向型で、顧客同士のコミュニティや会員主催の機能は持っていません。
5. **メンバー主催型の需要は、ソーシャルダイニング領域で実証済み。** Tim FrinのSubstackに載ったCEO Maxime Barbierへのインタビューによると、Timeleftは2025年8月時点で「150,000 participants join dinners each month across more than 200 cities worldwide. Timeleft employs ~100 people and generates €18M in ARR after 20 months」という状態です。ただしこれは「プラットフォームが主催し、店は会場」というモデルで、店舗のコミュニティとして機能するものではありません。
6. **失敗事例の教訓は明確。** Dinner Labは2016年4月に閉鎖しました（TechCrunchによると閉鎖時点で31都市。同社声明は「we weren't able to turn the corner on creating a profitable enough enterprise to support our ambitions」）。KitchHikeは食事会事業から保育園留学へ転換し、Timeleftも都市数を絞り込んでいます。いずれもイベント運営コストと地域ごとの需要密度が壁になりました。\[1\]

## Details

### 1. 日本国内の類似サービス

#### (A) 飲食店向けCRM・会員アプリ・LINE販促

| サービス | 概要・対象 | shokujii予定機能との重なり | 料金 | 規模・実績 / 資金調達 | URL |
|---|---|---|---|---|---|
| レストラン★スター（アクティブ・メディア） | 飲食店専用の会員証アプリを作成し、運用まで支援。対象はチェーン〜個店 | アンケート、来店履歴に基づく会員の自動グループ分けと配信、サブスク・通販機能。掲示板・チャットはなし | 月額22,000円〜（税込）。初期費用は個別見積もり | 2016年6月リリース。3,000店以上・400万人以上が利用。継続率99%以上をうたう\[2\]\[3\]\[4\]\[5\] | res-star.com |
| ダイニー顧客管理（dinii） | モバイルオーダー・POS・CRMの統合。LINE公式アカウントを起点にする\[6\] | セグメント配信・ステップ配信。\[6\]コミュニティ機能はなし | 要問い合わせ | — | dinii.jp |
| Lターゲット | 飲食・流通店舗に特化したLINE CRM（LINE正規代理店）\[7\] | セグメント配信 | 要問い合わせ | — | — |
| GATE | 飲食店向け顧客管理。LINE連携、SMSアンケートの結果をスプレッドシートに反映\[8\] | アンケート、誕生日クーポン\[8\] | 要問い合わせ | — | — |
| 汎用LINE拡張（Lステップ、Liny、L Message、KUZEN、Mico Engage AI等） | LINE公式アカウントの配信・セグメント機能を強化 | 配信・アンケート | 月額数千〜数万円帯が中心 | — | 各社 |
| LINE公式アカウント「メンバーシップ」 | LINE公式アカウント上の月額有料会員機能 | **月額課金と会員限定オープンチャット（チャット）**。ただし特典のオープンチャットはアプリ内課金型のプランでのみ利用可能\[9\] | 例：飲食店で月額500円のプラン\[9\] | 個店でもすぐ始められる | — |

**考察**：国内の飲食CRMは「LINE上の配信」に集約されつつあります。店→顧客の一斉配信は飽和しており、顧客同士の交流は空白です。なお、LINEメンバーシップの「有料会員＋オープンチャット」は、shokujiiにとって最も手軽な代替手段になります。shokujiiは「LINEでできない貸切・グループ・イベント決済」で上回る必要があります。

#### (B) 店舗サブスク・会員制・ファンクラブ

| サービス | 概要 | 重なり | 料金 | 規模 / 資金調達 | URL |
|---|---|---|---|---|---|
| favyサブスク（株式会社favy） | 飲食店がサブスク（定額会員券）を販売・管理できる。自動継続課金、限定公開の「シークレット会員券」、会員数・解約率のリアルタイム表示、会員へのお知らせ配信\[10\] | **月額サブスク、会員限定の配信**。会員制店舗（例：年会費14,300円の完全会員制焼肉『29ON』）の運営にも使われる\[11\] | ライト 7,000円/月、ベーシック 15,000円/月（予約台帳・顧客管理・サブスク込み）\[12\] | 2,500店舗以上のサブスク導入を支援。6居酒屋・138店舗共通の『飲みホ定期券』に導入。2026年4月にシリーズDセカンドクローズ（SUMISEI INNOVATION FUND等）\[11\]\[13\]\[14\] | info.favy.jp/subscription/ |
| THE FAN | 都内の提携店に月額定額で通える、完全会員制の「通い放題レストラン」\[15\] | 月額サブスク | Makuakeでの先行販売 | 2025年10月にも更新あり\[15\] | makuake.com/project/the-fan/ |
| CAMPFIREコミュニティ | 月額課金型のオンラインサロン基盤。「フード・飲食店」カテゴリがある\[16\] | **月額課金とコミュニティ**（例：「飛空艇酒場 バッカニア ギルドメンバー会員カード」、日本酒コミュニティ「酒小町」）\[16\] | 無料で開設、手数料制 | — | community.camp-fire.jp |
| bitfan CLUB（SKIYAKI） | アーティスト・クリエイター・飲食店・企業向けのファンクラブ開設サービス\[17\] | 無料・有料会員\[17\] | 手数料制 | — | — |
| Fanicon（THECOO） | 月額制のファンクラブアプリ。チャット・掲示板・ライブ配信を備える\[18\]\[19\] | **月額課金とチャット** | ファン課金（例：月300〜500円帯）のレベニューシェア\[20\]\[21\] | 2018年に約3億円、2020年に約7.1億円を調達\[22\]\[23\] | fanicon.net |

**考察**：「サブスク課金」単体は、favyサブスクで機能的にもう成熟しています。favyは会員制焼肉など「会員制モデル」の事例を多く持っていますが、会員同士のコミュニティや会員主催の貸切はありません。CAMPFIREコミュニティやFaniconは「課金＋交流」を持つ一方、予約・貸切・飲食店向けのオペレーションがありません。

#### (C) 予約・顧客管理・貸切

| サービス | 概要 | 重なり | 料金 | 規模 / 資金調達 | URL |
|---|---|---|---|---|---|
| TableCheck | 予約・顧客管理SaaSとゲスト向け予約ポータル。有料の優先案内「FastPass」も提供 | CRM・予約・事前決済 | 要問い合わせ | 世界35か国・地域、約11,300店舗以上、18言語に対応。2025年3月にシリーズSで4.3億円（ひらまつ、ワンダーテーブル等）、2025年12月にデット7億円。累計調達17.89億円\[24\]\[25\]\[26\]\[27\] | tablecheck.com |
| スペースマーケット / インスタベース | 時間貸しのレンタルスペース。「レンタルレストラン」「貸切パーティー会場」カテゴリがある | **ユーザー主催の貸切**（オフ会・ファン交流会・間借り営業等） | 掲載は手数料制 | スペースマーケットの「レンタルレストラン」カテゴリは全国で約255件\[28\]\[29\]\[30\] | spacemarket.com / instabase.jp |

**考察**：「一般ユーザーが飲食店を貸し切る」行動はすでに存在し、スペースマーケットにはオフ会・ファン交流会向けの居酒屋貸切が並んでいます。\[28\]ただし「その店の常連コミュニティの中で、メンバーが貸切を企画し参加者を集める」仕組みは存在しません。ここがshokujiiの核になります。

#### (D) 汎用コミュニティSaaS（commune / OSIRO / coorum 等）の飲食店活用

| サービス | 飲食関連の事例 | 料金 | 規模 / 資金調達 |
|---|---|---|---|
| coorum（Asobica） | **コメダ珈琲「さんかく屋根の下」**（coorumの導入事例ではコメダの松岡氏が「会員数が現在1万人ほど」と発言する一方、日経ビジネスは「ファンサイト会員3万人」と報じており食い違いあり。前身は店舗で開催していたファンの集い「コメダ部」）、**タリーズ「TULLY'S community Hello!」**（クラブタリーズとSSO連携）、CoCo壱番屋「ココイチパレット」（未確認） | 非公開（月10万〜90万円とする二次情報があるが未検証）\[31\] | 2022年7月にシリーズCで27.2億円。累計調達は30億円超\[31\]\[32\] |
| commune（コミューン） | 飲食の事例は確認できず（おやつカンパニー、BEAMS等）\[33\]\[34\] | 非公開 | 2025年9月にシリーズCで総額55億円（エクイティ40億円＋ベンチャーデット15億円）。累計100万人以上の登録者\[35\] |
| OSIRO（オシロ） | 飲食の事例は確認できず。小売のウェルカムで実店舗の来店回数・購入金額が前年度比225%\[36\] | 初期費用＋月額の個別見積もり。導入まで1〜2か月\[37\] | 導入300超\[36\] |
| Mila | 本調査では該当サービスを特定できなかった | — | — |

**考察**：汎用コミュニティSaaSは、本部にマーケティング部門があるナショナルチェーン向けの価格帯（推定で月数十万円）と運用体制を前提にしています。個店・小規模チェーンが月数千〜数万円で使える「飲食店版commune」は存在しません。shokujiiの価格帯であれば、ここが参入余地になります。

#### (E) ソーシャルダイニング（ユーザー主催の食事会）

- **KitchHike（キッチハイク）**：2013年に「料理をつくる人と食べる人のマッチング」として始まりました。2016年に日常向けへ転換し、2017年には累計1万食を達成、メルカリ等から2億円を調達しています。\[38\]飲食店・レンタルスペースと料理人を結ぶ「みんなのキッチン」にも取り組みました。\[39\]現在の主力は「保育園留学」（約50地域、2,000家族以上）で、食事会事業は事実上の主力から外れています。\[40\]積水ハウスCVCやANAのCVCから調達し、本社も北海道厚沢部町へ移しています。\[40\]\[41\]\[42\]\[43\]\[44\]
- **Gourmate / LYMiN / Dine / DMA**：ユーザーが食事会を募集・参加するアプリや、審査制で6人テーブルと店を自動で組むアプリです。\[45\]\[46\]\[47\]\[48\]店舗側のコミュニティにはならず、イベントごとの課金が中心です。

### 2. 海外の類似サービス

#### (A) レストランCRM・ゲストエンゲージメント

| サービス | 概要 | 重なり | 料金 | 規模 / 資金調達・M&A |
|---|---|---|---|---|
| SevenRooms | 予約・席管理・ゲストCRM・マーケティング自動化\[49\] | CRM、イベント・体験の販売、セグメント配信 | 個別見積もり | 13,000以上のレストラン・ホテル等（Nobu、Marriott、Union Square Hospitality Group）。**DoorDashが買収**：Form 10-Q（2025年第1四半期）によると2025年5月3日に「approximately $1.2 billion in an all-cash transaction」で契約し、FY2025年次報告書によると2025年6月13日に完了（取得対価の公正価値は11.52億ドル、うち現金9.02億ドル＋繰延現金2.5億ドル）。買収前の調達額は約6,900万ドル |
| Tock | 予約・テーブル管理・**イベントチケット**。事前決済型のテイスティングメニューや体験を販売 | **オーナー主催イベントのチケット販売** | 月額サブスク（施設単位） | American Expressの2024年6月21日のプレスリリースによると、「approximately 7,000 restaurants, wineries, and other bookable venues」に予約・テーブル管理・イベントチケットのツールを提供。2021年にSquarespaceが買収し、**同プレスリリースで「American Express will acquire Tock for $400M in cash」と発表** |
| Resy / OpenTable | 予約ネットワーク | 予約・CRM | — | ResyはAmerican Expressが2019年に買収\[50\]\[51\] |
| Paytronix | ロイヤルティ・ギフト・オンライン注文・**サブスクプログラム**・AI CRM | サブスク、CRM | 個別見積もり（エンタープライズ向け） | 1,800以上のブランド、50,000以上の店舗（Panera Bread等）\[52\]\[53\]\[54\] |
| Thanx | カード連携型ロイヤルティ、**顧客フィードバック収集**、紹介、セグメント配信 | **アンケート・VOC**、CRM | 要問い合わせ | 中規模チェーン向け\[55\]\[56\] |
| Toast Loyalty / Square Loyalty | POS組み込み型のロイヤルティ | CRM | Square Loyaltyは月45ドル、Toast Loyaltyは月50ドル程度（比較サイトの記載） | POS利用店向け\[57\] |
| Bloom Intelligence | WiFi・POSデータを活用した飲食向けCRM・レビュー管理 | VOC・CRM | — | （本調査では詳細を確認できず） |

#### (B) メンバーシップ・サブスク・会員クラブ

| サービス | 概要 | 重なり | 料金 | 規模 / 資金調達 |
|---|---|---|---|---|
| Table22 | 個店向けのサブスク・メンバーシップ・予約販売基盤（パスタクラブ、カクテルクラブ、会員限定イベント招待など） | **月額サブスク、会員限定イベント** | 手数料型 | 2024年にLightspeed主導のシリーズAで1,100万ドル、累計2,400万ドル。米国38州で展開、コア顧客の月次継続率99%。Rose's Luxuryはサブスクと物販で「7桁ドル」の新規売上\[58\]\[59\]\[60\] |
| Dorsia | 会員制の予約アプリ。人気店の席を最低消費額の前払いで確保。会員限定イベントもある\[61\]\[62\] | **会員課金、プライベートテーブル** | 年175ドル（2026年時点で200ドル）〜Premium Plusの年25,000ドル\[62\]\[63\] | シード＋シリーズAで5,040万ドル（Index Ventures主導、評価額1.46億ドル）。会員約12.5万人、申請待ち約5万人。2024年に売上が3倍\[50\]\[64\] |
| Blackbird | Resy・Eater創業者のBen Leventhalによる、決済・ロイヤルティアプリ。ブロックチェーンを使い、$FLYトークンで還元。アプリから店にメッセージで予約できる\[65\]\[66\]\[67\] | ロイヤルティ、**会員ティア（Blackbird Club）**、店とのメッセージ | 店舗は通常月89ドル（TIME誌）\[67\] | 2025年4月にシリーズBで5,000万ドル（Spark Capital主導）、累計8,500万ドル。加盟店はFortuneでは600店超、FinTech Futuresでは1,000店と報道が食い違う（NY・SF・チャールストン）\[65\]\[68\] |

#### (C) ユーザー主催・ソーシャルダイニング

| サービス | 概要 | 料金モデル | 規模 |
|---|---|---|---|
| Timeleft | 毎週水曜に、性格診断をもとに見知らぬ6人をレストランでマッチング。バー・女性限定・ランニングにも拡張\[1\]\[69\]\[70\]\[71\] | 1回参加（例：クリーブランドで16ドル）またはサブスク\[69\]\[71\] | 2023年5月に開始（Typeform＋WhatsApp＋Stripeで検証）。CEO Maxime Barbierへのインタビュー（Tim FrinのSubstack）によると、2025年8月時点で「150,000 participants join dinners each month across more than 200 cities worldwide. Timeleft employs ~100 people and generates €18M in ARR after 20 months」。同インタビューでは「2024: Expanded to 320+ cities in one year」「2025: Scaled down to 200+ cities」とも説明。週約6,500回のディナーを開催し、提携レストランに週約100万ドルの売上をもたらすと自称 |
| Eatwith | ホストが自宅や店で食事会・料理教室を開く体験マーケットプレイス\[72\]\[73\] | ゲスト側に30%のサービス料（ホストは設定額の100%を受け取る）\[74\] | 130か国以上\[72\]\[75\]\[76\] |
| Dinner Lab（撤退事例） | 会員制のポップアップ・サパークラブ | 年会費125〜175ドル＋1食55〜95ドル | TechCrunchによると閉鎖時点で31都市。Silicon Bayou Newsによると2015年12月のDishcrawl買収時点で「around 75,000 members」。950万〜1,050万ドルを調達後、**2016年4月に閉鎖** |

#### (D) 汎用コミュニティSaaS（Circle、Mighty Networks、Discord）の飲食店活用

Discord向けの課金ツール（LaunchPass、Memberful、Discord Server Subscriptions等）を使えば、月額課金と限定チャットは技術的に実現できます。\[77\]\[78\]\[79\]ただし今回の調査では、レストランがこれらを常連コミュニティとして本格運用している公開事例は確認できませんでした。国内でも、札幌のコミュニティBARのように無料のLINEオープンチャットで顧客をつなぐ例はありますが、課金や貸切機能とは連動していません。\[80\]汎用ツールには予約・貸切・最低消費額・店舗決済の機能がないことが、飲食店で普及しない主な理由と考えられます。

### 3. 機能対応マトリクス

凡例：◎＝中核機能、○＝あり、△＝部分的・代替手段、×＝なし

| サービス | 掲示板・トーク・チャット | オーナー主催の貸切・イベント | **メンバー主催の貸切イベント** | 顧客向け月額サブスク | 店舗向けSaaS月額 | 顧客の声・アンケート | 会員内のサブグループ |
|---|---|---|---|---|---|---|---|
| favyサブスク | × | △（会員限定の告知） | × | ◎ | ○ | △ | △（限定会員券） |
| レストラン★スター | × | △（イベント配信） | × | ○ | ○ | ○ | ○（自動グループ配信） |
| LINEメンバーシップ＋オープンチャット | ○ | △ | × | ○ | ×（通数課金） | △ | △ |
| ダイニー / Lターゲット等のLINE CRM | × | △ | × | × | ○ | ○ | ○（セグメント） |
| ファンくる | × | × | × | × | ○ | ◎（覆面調査） | ×\[81\] |
| TableCheck | × | ○ | × | × | ○ | △ | △ |
| coorum / commune / OSIRO | ◎ | ○ | × | △（OSIROは月額会費に対応） | ○（高価格帯） | ◎ | ○ |
| CAMPFIREコミュニティ / Fanicon | ○ | △ | × | ◎ | ×（手数料） | △ | △ |
| スペースマーケット | × | × | ○（一般ユーザーの貸切） | × | ×（手数料） | ×（レビューのみ） | × |
| SevenRooms | × | ○ | × | × | ○ | ○ | ○（セグメント） |
| Tock | × | ◎（チケット） | × | × | ○ | △ | × |
| Table22 | × | ○（会員イベント） | × | ◎ | ×（手数料） | × | △ |
| Paytronix / Thanx | × | × | × | ○（Paytronix） | ○ | ○（Thanx） | ○ |
| Dorsia | × | ○ | △（会員が最低消費額で卓を確保） | ◎（年会費） | × | × | ○（ティア） |
| Blackbird | △（店とのメッセージ） | △ | × | △（Club） | ○（月89ドル） | × | ○（ティア） |
| Timeleft / Eatwith | △ | × | ○（プラットフォームまたはホストが主催） | ○（Timeleft） | × | ○（レビュー） | × |
| **shokujii（構想）** | ◎ | ◎ | ◎ | ◎ | ◎ | ◎ | ◎ |

**ホワイトスペースの結論**：
- 「メンバー主催の貸切イベント」の列が◎になるサービスは存在しません。スペースマーケット（店のコミュニティとは無関係）とDorsia（会員が卓を買うだけで、参加者を募る機能はない）が部分的に近い程度です。
- 「チャット」と「顧客向けサブスク」が同時に○以上になる製品は、汎用ファンクラブ（CAMPFIREコミュニティ・Fanicon）とLINEメンバーシップに限られます。これらには予約・貸切・店舗CRMがありません。
- 「店舗のコミュニティ × メンバー主催の貸切 × サブスク」の組み合わせは、国内外ともに未開拓です。

### 4. 先行事例から読み取れること（参考にすべき点）

- **Dorsiaの「最低消費額の前払い」**：会員主催の貸切に、そのまま応用できる課金ロジックです。店は売上の下限が保証され、主催者は参加者から割り勘で事前徴収できます。DorsiaはStripe ConnectとStripe Billingで、ティア別の年会費と店舗への翌日入金を実現しています。\[62\]Firebase構成のshokujiiとも相性のよい実装パターンです。
- **Table22の「サブスク＋会員限定イベント招待」**：個店向けの価格設定・継続課金・物販をパッケージ化し、月次継続率99%を達成しています。\[58\]\[59\]サブスクの特典に「会員限定イベント」を組み込む設計は参考になります。
- **favyの3類型（使い放題・割引・会員制）**：国内の飲食店が受け入れやすいサブスク設計のテンプレートとして使えます。会員制モデルは原価がかからず粗利が高い、とfavyは説明しています。\[11\]
- **コメダ「さんかく屋根の下」**：オフラインのファンの集い（コメダ部）からオンラインのコミュニティへ移った流れが、shokujiiの「オフラインの貸切イベント⇄オンラインのトークルーム」という循環の実例になります。\[82\]\[83\]
- **Timeleftの「オフライン体験をプロダクトとして設計する」思想**：毎週15,000〜20,000件のレビューを集めて品質を管理しています。\[1\]イベント後のアンケートを自動化することは、shokujiiの「顧客の声収集」機能と直結します。

### 5. 失敗・撤退事例と教訓

| 事例 | 何が起きたか | shokujiiへの教訓 |
|---|---|---|
| Dinner Lab（米国、2016年閉鎖） | 会員制ポップアップ・ディナーを31都市に広げたが、会場・シェフ・スタッフを自前で手配する運営コストで黒字化できなかった（同社声明：「we weren't able to turn the corner on creating a profitable enough enterprise to support our ambitions」、TechCrunch 2016年4月14日）。会員の課金壁を撤廃して集客を優先したが、追加調達に失敗 | **イベント運営を自社で抱えない**。会場・料理・オペレーションは加盟店が担い、shokujiiはツールと決済に徹する |
| KitchHike（日本、事業転換） | 旅行者マッチングでは伸びず、日常向けへ転換。2億円を調達し累計1万食を達成したが、その後は保育園留学へ主力を移した\[38\]\[39\] | 国内のC2Cソーシャルダイニングは単体ではスケールしにくい。**店舗側の課金（B）を収益の軸に**し、C2Cはその上の付加機能にとどめる |
| Timeleft（拡大後に縮小） | CEOインタビューによると「2024: Expanded to 320+ cities in one year」の後、「2025: Scaled down to 200+ cities」。小都市では参加者の密度が足りず「毎週同じ10人と食べることになり飽きる」状態になった | 会員主催イベントは**店舗単位でコミュニティの密度を保つ**ことが前提。シードとなる加盟店は一部の地域・業態に集中させる |
| Blackbird（論点） | 暗号資産トークンでの還元は話題を集めたが、利用者がトークンを使える店を見つけられないという指摘もある（TIME誌）\[67\] | 独自通貨やポイントの複雑さは避け、**円建てのサブスクとイベント決済をシンプルに** |

## Recommendations

1. **ポジショニング**：「個店・小規模チェーン向けの“常連コミュニティOS”」として、commune等のエンタープライズ型と、favyやLINEの配信・課金型との中間を取ります。訴求の軸は「常連が店を貸し切って仲間を連れてくる＝店にとっては集客コストゼロの貸切売上」とします。
2. **MVPの優先順位**：
   - ①会員主催の貸切イベントの作成（最低消費額・定員・参加費の事前決済と割り勘、キャンセルポリシー）
   - ②トークルーム（店舗全体とイベント単位）
   - ③顧客向け月額サブスク（favy型の3類型をテンプレート化）
   - ④イベント後のアンケート自動送信
   - ⑤サブグループ（例：「日本酒部」「グルテンフリー会」）
   
   掲示板は②の拡張で足ります。①を最初に作る理由は、競合のいない唯一の機能であり、店側が売上をすぐ実感できるからです。
3. **インクルーシブ食との接続（最大の差別化）**：shokujiiの既存資産を活かし、イベント作成時に参加者のアレルギー・ハラール・ヴィーガン等の要件を集め、店に自動共有します。「同じ食の制約を持つ人のグループ」を作れることは、汎用コミュニティにもCRMにもない固有の価値です。
4. **既存インフラに乗る**：LINEは通知と友だち獲得の入口として連携し、対抗はしません。決済はStripe ConnectとStripe Billingで店舗への入金とサブスクを処理します。LINEメンバーシップは代替手段なので、「LINEにはない貸切・割り勘・グループ」を明確に打ち出します。
5. **料金設計（参考値）**：
   - 店舗向けSaaS：月額5,000〜20,000円帯。favyのライト7,000円・ベーシック15,000円、レストラン★スターの22,000円〜を上限の目安にします。\[12\]
   - 取引手数料：貸切・イベント決済に5〜10%程度を上乗せします。Eatwithの30%は高単価な体験型の上限値と捉えます。\[74\]\[76\]
   - サブスク：顧客の会費に対する決済手数料を設けます。
6. **Go-to-market**：最初は一つの地域・一つの業態（例：都内のバー・ワインバー、ヴィーガン・ハラール対応店）に集中し、店舗あたり50〜100人のアクティブ会員という密度を優先します（Timeleftの教訓）。

## Caveats

- 「飲食店への月額サブスク課金機能」は、(a) shokujiiが店舗から月額利用料を取る、(b) 店舗が顧客から月額会費を取る、の両方に読めます。本レポートでは両方を機能として扱いました。
- coorum・commune・OSIRO・SevenRooms等の料金は非公開で、coorumの「月10万〜90万円」は出典の弱い二次情報です。\[31\]Toast・Squareの月額も比較サイトの記載に基づきます。
- Blackbirdの加盟店数は報道で600店超と1,000店に食い違いがあります。Timeleftの「レストランへ週約100万ドル」は同社の自己申告です。\[65\]\[68\]\[84\]
- ファンくるの「1万2000軒・年80万件」は掲載時期が不明確です。\[81\]favyの「有料会員6.5万人」はサービス開始から1年半時点の古い数値です。\[85\]
- Mila、Bloom Intelligence、Circle・Mighty Networksの飲食店事例、および国内の個別の貸切専用サービスについては、検索予算の制約で十分に検証できていません。「存在しない」と断定するものではなく、「今回の調査範囲では確認できなかった」という意味です。
- 将来の計画（Blackbird Clubの業界版拡張など）は発表段階のもので、実現は保証されていません。

## 出典

1. [Inside Timeleft's journey to connecting 150,000 diners monthly across 200+ cities](https://timfrin.substack.com/p/inside-timelefts-journey-to-connecting)
2. [レストラン★スターとは？](https://meetsmore.com/products/res-star)
3. [レストラン★スター（飲食店アプリ作成）の強みや事例、注目ポイントについて徹底リサーチ](https://www.shopowner-support.net/customer_attraction_information/online/restaurant-star/)
4. [飲食店アプリ作成サービス【レストラン★スター】開発～運用まで徹底サポート](https://res-star.com/)
5. [飲食店のファン倶楽部運営をサポート。飲食店オーナーと二人三脚で開発を進めた会員証アプリ「レストラン★スター」の開発の裏側と挑戦](https://prtimes.jp/story/detail/dxOWLqcL30x)
6. [飲食店におすすめのCRM（顧客管理システム）15選](https://meetsmore.com/product-services/customer-relationship-management/media/137033)
7. [LINE顧客管理（CRM）ツール12選！特徴や料金、口コミ評判を徹底比較 - 集客・広告戦略メディア「キャククル」](https://www.shopowner-support.net/customer_attraction_information/online/linebiz/line-crmtool/)
8. [飲食店向け顧客管理ソフト（CRM）13選。違いやできることは？](https://www.aspicjapan.org/asu/article/65122)
9. [LINE公式アカウントのメンバーシップ機能とは？会員制でLINEを運用する方法](https://linestep.jp/2023/01/29/line-membership/)
10. [飲食店がサブスク・顧客管理を始めるならfavyサブスク｜株式会社favy](https://info.favy.jp/subscription/index.html)
11. [【事例あり】飲食店サブスクを成功に導く３つの主要なモデルとは？ - favy公式ブログ favicon(ファビコン)](https://blog.favy.co.jp/12703/)
12. [favyで飲食店のPR・集客しませんか？｜株式会社favy](https://info.favy.jp/)
13. [favy｜STARTUP DB（スタートアップデータベース）](https://startup-db.com/companies/BXP5J5rURq7Gqo6L)
14. [6つの居酒屋、全138店舗でいつでも利用できる定額制飲み放題『飲みホ―定期券』がスタート！favyの”飲食店のためのサブスクツール”が導入決定！ - favy公式ブログ favicon(ファビコン)](https://blog.favy.co.jp/11418/)
15. [【飲食革命案件】究極のプレミアムレストラン会員権 遂に始動!!｜マクアケ - アタラシイものや体験の応援購入サービス](https://www.makuake.com/project/the-fan/)
16. [フード・飲食店のコミュニティ一覧 CAMPFIREコミュニティ](https://community.camp-fire.jp/projects/category/food)
17. [企業と「ファン」をつなげるオンラインコミュニティ。豊富な機能で構築・運用が簡単に](https://ampmedia.jp/2018/09/24/commune/)
18. [THECOO/エンタメ業界の構造に変化を起こす - ログミーファイナンス](https://finance.logmi.jp/articles/377860)
19. [ファンコミュニティとは？メリットや成功事例、おすすめサービスを紹介！](https://www.doorkeeper.jp/blog/how-to-build-your-fan-community?locale=en)
20. [会員制ファンコミュニティアプリ「fanicon」運営のTHECOOが総額3億円の資金調達を実施、コアなファンのコミュニティ形成を強化 - BRIDGE（ブリッジ）](https://thebridge.jp/2018/04/thecoo-funding)
21. [Faniconアプリ - App Store - Apple](https://apps.apple.com/jp/app/fanicon/id1194376496)
22. [エンタメテック「THECOO」がソニー・ミュージックなどから7.1億円調達](https://thebridge.jp/2020/07/fanicon-thecoo-fundraised)
23. [会員制ファンコミュニティアプリ「fanicon」を運営するTHECOO株式会社 総額約3億円の資金調達を実施](https://prtimes.jp/main/html/rd/p/000000064.000015650.html)
24. [TableCheck、デットファイナンスで7億円を調達——事業拡大とプロダクト強化を加速 - BRIDGE（ブリッジ）](https://thebridge.jp/2025/12/tablecheck-raises-700-million-yen-debt-financing)
25. [TableCheck｜STARTUP DB（スタートアップデータベース）](https://startup-db.com/companies/BXP5J5rUQXzGqo6L)
26. [TableCheckが総額4.3億円を資金調達、飲食業界のDXを加速へ](https://kepple.co.jp/articles/lr2m1fhphk)
27. [TableCheck、4.3億円の資金調達実施 (2025年3月31日) - エキサイトニュース](https://www.excite.co.jp/news/article/Prtimes_2025-03-31-23564-125/)
28. [【レンタルレストラン】おすすめTOP20｜パーティー・撮影に最適な貸切飲食店 - スペースマーケット](https://www.spacemarket.com/features/rental-restaurant)
29. [【東京都】【居酒屋のレンタルスペース】おすすめTOP20｜貸切OKで飲み会・撮影にも最適 - スペースマーケット](https://www.spacemarket.com/lists/rikerhgo26n7tn26fnfl2olc/)
30. [【全国版】飲食OKなイベントスペースおすすめTOP20｜インスタベース](https://www.instabase.jp/list/eating-event-hall)
31. [株式会社Asobica / coorum](https://www.firstcvc.jp/company/asobica.co.jp)
32. [Asobica｜STARTUP DB（スタートアップデータベース）](https://startup-db.com/companies/oY1lJ73U4EeJ35VB)
33. [おやつカンパニー、ユーザーコミュニティにcommmuneを導入](https://prtimes.jp/main/html/rd/p/000000187.000036356.html)
34. [commmune（コミューン）とは？特徴や機能、導入事例を紹介](https://media.weclip.link/customer-success/commmune/)
35. [コミューン、総額55億円の資金調達を実施。調達資金で「信頼起点経営」の社会実装を加速。信頼への投資が経済合理な未来へ。](https://communeinc.com/ja/news/2025sep03-2)
36. [ブランド向けページ](https://osiro.it/lp/community/)
37. [料金・価格](https://osiro.it/pricing)
38. [KitchHike（キッチハイク）がMistletoe・メルカリ等から２億円の資金調達。みんなで食べる「みん食」の普及を目指す。](https://prtimes.jp/main/html/rd/p/000000010.000006899.html)
39. [料理人とお店とユーザーをつなぐ「KitchHike」を体験してみた - 週刊アスキー](https://weekly.ascii.jp/elem/000/001/438/1438994/)
40. [株式会社キッチハイクとは？「保育園留学」で地方創生に挑む注目スタートアップ |](https://www.nvv.genai.co.jp/2025/04/kittihaiku/)
41. [2200人利用の「保育園留学」強化へ キッチハイクが東京→厚沢部に本社移転、雇用増加へ：北海道新聞デジタル](https://www.hokkaido-np.co.jp/article/1228633/)
42. [積水ハウス､｢保育園留学｣運営のキッチハイクに出資 滞在先を提供 - 日本経済新聞](https://www.nikkei.com/article/DGXZQOUF161HR0W5A410C2000000/)
43. [株式会社キッチハイク｜スピーダ スタートアップ情報リサーチ](https://initial.inc/companies/A-12145)
44. [キッチハイク、ANA・積水ハウスのCVCから資金調達── 地域共創型「保育園留学」拡大へ](https://thebridge.jp/2025/04/kitchhike-raises-funding-from-the-cvcs-of-ana-and-sekisui-house)
45. [ハウテレビジョン、男女6人を自動選定し食事会 背景に「マチアプ疲れ」 - 日本経済新聞](https://www.nikkei.com/article/DGXZQOUC08AP60Y6A600C2000000/)
46. [国内初、完全審査制ソーシャルダイニング「LYMiN」開始](https://prtimes.jp/main/html/rd/p/000000152.000026700.html)
47. [DMA｜食事をきっかけに新しい出会いが生まれるディナーマッチングアプリ](https://dma-app.com/)
48. [Gourmate（グルメイト）｜「食」を起点に、人がつながるソーシャルダイニングサービス](https://gourmate-welcome.com/)
49. [SevenRooms Acquisition, Valuation, Funding & Investors](https://multiples.vc/private-comps/sevenrooms)
50. [Investors bet \$50.4M on Miami-based Dorsia, a member-based reservation platform for top venues - Refresh Miami](https://refreshmiami.com/news/investors-bet-50-4m-on-miami-based-dorsia-a-member-based-reservation-platform-for-top-venues/)
51. [To Enhance Dining Platform, American Express Enters Agreement to Acquire Tock from Squarespace; Also Agrees to Acquire Rooam - Perishable News](https://perishablenews.com/retailfoodservice/to-enhance-dining-platform-american-express-enters-agreement-to-acquire-tock-from-squarespace-also-agrees-to-acquire-rooam/)
52. [Best Restaurant Loyalty Software in 2026: Compared & Ranked](https://www.paytronix.com/blog/best-restaurant-loyalty-software-comparison-guide)
53. [Best QSR loyalty program software in 2026: top 9 tools compared](https://www.voucherify.io/blog/top-9-loyalty-program-tools-for-quick-service-restaurants-qsrs-in-2025)
54. [3 Best Loyalty Program Software for Restaurants (2026 Comparison) - Daily Emerald](https://dailyemerald.com/185893/promotedposts/3-best-loyalty-program-software-for-restaurants-2026-comparison/)
55. [Top 33 Paytronix Alternatives in 2025](https://www.cuspera.com/products/paytronix-x-6710/alternatives)
56. [Best 10+ QSR loyalty software platforms](https://www.openloyalty.io/insider/qsr-loyalty-software-platforms)
57. [8 Best Restaurant Loyalty Program Apps in 2026 (Compared)](https://usebuildify.com/post/restaurant-loyalty-program-apps)
58. [Commerce Tools and Memberships for Independent Restaurants; Our Investment in Table22 — Forerunner Ventures](https://www.forerunnerventures.com/perspectives/better-commerce-tools-and-memberships-for-independent-restaurants-in-the-u-s)
59. [Table22 - Products, Competitors, Financials, Employees, Headquarters Locations](https://www.cbinsights.com/company/table22)
60. [Table22 Closes on \$11M Series A to Capitalize on Growth Momentum](https://www.citybiz.co/article/620425/table22-closes-on-11m-series-a-to-capitalize-on-growth-momentum/)
61. [Dorsia Membership Review: What It Involves and Who…](https://joinpearl.co/blogs/what-dorsia-actually-involves-how-it-works-and-who-its-for)
62. [Dorsia pays restaurant partners 60% faster with Stripe Connect](https://stripe.com/mx/customers/dorsia)
63. [Is Dorsia Worth It? The 2026 Membership Math](https://restaurantsforkings.com/blog/dorsia-membership-worth-it-2026)
64. [Dorsia Secures \$50.4M to Revolutionize the Global Hospitality Industry](https://resident.com/business-and-finance/2025/02/18/dorsia-secures-504m-to-revolutionize-the-global-hospitality-industry)
65. [Restaurant star Ben Leventhal raises another \$50 million ...](https://fortune.com/crypto/2025/04/08/blackbird-funding-ben-leventhal-restaurants/)
66. [Blackbird, Blockchain Restaurant Loyalty App, Goes Live With Flynet Mainnet](https://www.coindesk.com/tech/2025/02/26/blackbird-blockchain-restaurant-loyalty-app-goes-live-with-flynet-mainnet)
67. [Can Blackbird, Ben Leventhal's Crypto App, Save Restaurants?](https://time.com/7005516/crypto-ben-leventhal-blackbird-app-restaurants/)
68. [Blackbird secures \$50m Series B for US expansion](https://www.fintechfutures.com/venture-capital-funding/blackbird-secures-50m-series-b-for-us-expansion)
69. [A Cleveland Journey with Timeleft’s Social Dinners](https://clevelandmagazine.com/articles/a-cleveland-journey-with-timeleft-s-social-dinners/)
70. [Timeleft Algorithm: The Maestro of Your Dinners](https://timeleft.com/post/timeleft-algorithm-the-maestro-of-your-dinners/)
71. [Why Complete Strangers Are Meeting For Dinner Around The World Every Wednesday - Tasting Table](https://www.tastingtable.com/1859085/dinner-parties-with-strangers-timeleft/)
72. [Earn on Online Culinary Experiences With Eatwith — Travelpayouts](https://www.travelpayouts.com/blog/eatwith-affiliate-program/)
73. [Startup pitch: EatWith unites travelers around shared food experiences](https://www.phocuswire.com/Startup-pitch-EatWith-unites-travelers-around-shared-food-experiences)
74. [Does Eatwith charge a commission on the price I pay for my experience?](https://intercom.help/eatwith/en/articles/432396-does-eatwith-charge-a-commission-on-the-price-i-pay-for-my-experience)
75. [Eatwith - Food experiences - Apps on Google Play](https://play.google.com/store/apps/details?id=com.vizeat.android&hl=en_US)
76. [How much does it cost to host with Eatwith?](https://intercom.help/eatwith/en/articles/432349-how-much-does-it-cost-to-host-with-eatwith)
77. [Memberful for Discord](https://memberful.com/discord)
78. [Launch a paid Discord subscription service in 60 seconds](https://www.launchpass.com/discord/)
79. [Server Subscriptions for Members](https://support.discord.com/hc/en-us/articles/4415163187607-Server-Subscriptions-for-Members)
80. [札幌で飲もう!! 公式オープンチャット（LINE）開設のお知らせ](https://www.satsu-nomo.com/post/26328/)
81. [飲食No.１覆面調査サービス「ファンくる」がアップデート！「ファンくるクラウドCS」が新たにリリース、顧客満足度向上＆スタッフの成長に寄与する飲食店必須ツール - フードスタジアム フードスタジアム](https://food-stadium.com/special/26628/)
82. [「より多くのお客様が交流ができる」コミュニティを。株式会社コメダが運営する「さんかく屋根の下」がcoorumを選んだ理由。](https://coorum.jp/case/restaurant/komeda/)
83. [【コメダ珈琲店】コメダ公式コミュニティサイト「さんかく屋根の下」がオープン！［株式会社コメダ］［コメダ珈琲店（社員独立支援制度）］](https://web-repo.jp/information/1192)
84. [1 app, 5 strangers. A whole new kind of Wednesday](https://fooddrinklife.com/timeleft/)
85. [飲食店様向けのサブスクプラン「favyサブスク」より新プラン発表](https://ascii.jp/elem/000/004/043/4043714/)
