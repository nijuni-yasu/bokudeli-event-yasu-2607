# **飲食店特化型コミュニティSaaSおよびCRM領域のグローバル市場動向と「shokujii」拡張機能の事業戦略**

## **1\. 飲食業界におけるCRMとコミュニティ化の必然性**

現代の飲食業界において、デジタルトランスフォーメーション（DX）の波は単なる業務効率化の枠を超え、顧客との持続的な関係構築（CRM：Customer Relationship Management）の領域へとパラダイムシフトを起こしている。従来の飲食店マーケティングは、「食べログ」や「ぐるなび」といったグルメサイトを中心とする新規顧客獲得に大きく依存してきた。しかし、これらのプラットフォームに対する送客手数料の高騰は店舗の利益を恒常的に圧迫しており、自社チャネルへの送客シフトはもはや避けて通れない経営課題となっている1。  
さらに、データに基づく残酷な現実として、飲食店の初回来店客の80〜90%は「2度と来ない（離脱する）」とされている2。マーケティングの定石である「1:5の法則（新規顧客の獲得コストは既存顧客の維持コストの5倍かかる）」や、パレートの法則（売上の80%は全体の20%の常連客が作る）が示す通り、飲食店の安定経営においては「新規集客」から「既存顧客の維持・ロイヤル化」へとリソースを再配分することが不可避である2。  
このような構造的な課題に加え、原材料費の高騰や深刻な人手不足が店舗運営を圧迫する中、テクノロジーを活用して「顧客との深い結びつき（エンゲージメント）」を生み出すソリューションが世界中で模索されている4。本レポートでは、「食事でつながる shokujii」の新規機能として検討されている「飲食店版コミュニティSaaS」の開発に向け、日本国内および海外における飲食店向けコミュニティSaaS、CRM管理サービス、コミュニケーションツールの市場動向を網羅的に調査・分析する。提示された要件（掲示板・トークルーム機能、飲食店／メンバー主催の貸切イベント、月額サブスク機能、VoC収集、細分化グループ作成）が、現在のグローバル市場でどのように実装され、どのような課題に直面しているのかを紐解き、持続可能なSaaSビジネスモデル（ユニットエコノミクス）を構築するための戦略的提言を行う。

## **2\. 「shokujii」の現状と拡張機能が目指すエコシステムの再定義**

本調査の前提となる「食事でつながる shokujii」は、現在「フードオーダーシステム」と「イベント集客ツール」を組み合わせた独自のWebサービスとして稼働している6。主催者は「注文するお店を選ぶだけ」で1分以内にイベントページを作成でき、参加者は「自分の食べたいメニューを選んで事前決済するだけ」でイベントに参加できる仕組みを提供している7。  
また、商品の提供形態としてデリバリー、テイクアウト、イートインのすべてを網羅し、決済方法も参加者個別のクレジットカード決済から主催者による請求書払いまで柔軟に対応している6。この既存の強固な基盤の上に、「飲食店版コミュニティSaaS」として、掲示板機能、双方向のイベント開催機能、サブスクリプション機能、VoC（顧客の声）収集機能を実装することは、単なるツールから「飲食店と顧客が共創するエコシステム」への劇的な進化を意味する。以降のセクションでは、これらの機能要件が世界の類似サービスにおいてどのように機能しているかを分析していく。

## **3\. 日本国内における飲食店向けCRMおよびコミュニティSaaSの市場動向**

日本国内の飲食店向けSaaS市場は、予約管理、POSレジ、モバイルオーダー、そしてCRM機能が相互に融合し合う激動のフェーズにある。特に、コミュニケーションインフラとして圧倒的な普及率を誇る「LINE」を基盤としたエコシステムが市場を牽引している。

### **3.1. LINEプラットフォームを基盤とする統合型CRMの台頭**

2026年6月に本格提供が開始された「LINEレストランプラス」は、国内の飲食SaaS市場における最大のゲームチェンジャーである。この動きの背景には、LINEヤフーが2026年1月に国内トップクラスのシェアを持つ予約管理システム「トレタ」を買収・子会社化した事実がある9。トレタは全国21,000店以上で導入されており、予約管理や配席管理において膨大なデータを保有している12。  
この買収と新サービスの展開が意味するのは、「予約」「店内オーダー（モバイルオーダー）」「決済」「来店後の販促（CRM）」という、これまで分断されていた顧客体験の完全なシームレス化である。ユーザーは新たにアプリをダウンロードすることなく、日常的に使用しているLINEアプリ上で予約から注文までを完結させる。一方、店舗側には「誰が・いつ・何を頼み・何回来店したか」というデータがトレタの台帳に蓄積される11。  
このデータの統合により、予約のキャンセルが出た際、来店履歴や利用頻度をもとに近くにいる常連客へ即座にLINEでメッセージや特典を配信し、空席を埋めるといった高度なCRMが、現場の負担なしに実現する11。実際の成功事例として、東京・恵比寿の日本料理店「賛否両論」では、トレタ予約台帳とLINE公式アカウントを組み合わせることで、グルメサイトを一切使用せず、LINEの友だち約4.8万人のロイヤルファンコミュニティを構築し、予約の56%をリピーターで埋める経営を実現している14。

### **3.2. モバイルオーダー起点のID連携と常連客可視化**

「ダイニー（dinii）」は、店内モバイルオーダーを起点とした顧客管理に特化し、急成長を遂げているSaaSである。従来の券売機や口頭注文では「誰が何回目か」を把握することは不可能に近かったが、ダイニーはQRコード読み取りと同時にLINEアカウントを連携させることで、すべての顧客をID化する15。  
これにより、行列の絶えない店舗であっても、ハンディ端末に顧客の来店回数や過去の注文履歴が表示されるため、スタッフが「いつもありがとうございます」といったパーソナライズされた接客を行うことが可能になる16。また、アンケート結果の収集や、特定のセグメントに対するピンポイントなメッセージ配信機能を有しており、ある店舗では毎月約2,000人ずつLINE会員数が増加し、売上が前年比120%に向上するなどの成果を上げている15。さらに、子ども食堂としての運営を通じて地域コミュニティのハブとなり、利益を5倍に伸ばした事例も存在する18。

### **3.3. サブスクリプションとロイヤルティプログラムの展開**

顧客の囲い込み手法として、定額制（サブスクリプション）を支援するSaaSも国内で独自の進化を遂げている。「favy（ファビー）」は、飲食店向けのサブスクリプションシステム（例：コーヒーの定額制など）を牽引してきたプレイヤーである。Bリーグチーム（宇都宮ブレックス、千葉ジェッツなど）と連携した飲食店応援サブスク「ジェッツパス」などを展開し、スポーツファンコミュニティと飲食を掛け合わせた事例を持つ19。しかし、定型のSaaS機能だけでは多様な飲食店の複雑なオペレーションに適合しきれないという課題に直面し、2026年8月より「標準機能＋個社カスタム開発（FDE型）」のハイブリッド型サービスへと舵を切っている21。この動向は、飲食現場へのSaaS導入において、柔軟なカスタマイズ性が強く求められていることを示唆している。  
また、「toypo（トイポ）」は、スタンプカードやサブスクチケットをアプリ上で発行し、来店日を起点とした自動クーポン配信（来店翌日、1週間後など）を行うCRMアプリである。再来店の習慣化からサブスク購入へ繋げる仕組みを構築し、顧客の定着を図っている23。

### **3.4. ブランド主導のファンコミュニティ構築**

より純粋な「コミュニティSaaS」として国内で圧倒的な実績を持つのが「Commune（コミューン）」である。飲食店特化ではないものの、ヤッホーブルーイング、カルビー、ベースフードといった食品・飲料メーカーにおいて、「熱狂的なファンとの共創」や「新商品アイデアの創出（VoCの活用）」を目的として多数導入されている25。  
Communeは、ユーザー同士の双方向コミュニケーションを促すUX設計に加え、Q\&A、イベント管理、ゲーミフィケーション（ポイントやバッジ付与によるモチベーション向上）機能を標準搭載している25。顧客の声をN1（個人）レベルで収集・分析することで、単なる情報発信にとどまらず、ファン自身がアンバサダーとなって新たな顧客を呼び込む「自走型マーケティング」の基盤を提供している25。

| サービス名 | 主要機能と特徴 | 飲食業界での活用状況 | 戦略的示唆 |
| :---- | :---- | :---- | :---- |
| **LINEレストランプラス** | 予約、オーダー、POS、LINE公式アカウントの完全統合 | 大規模チェーンから個店まで幅広く展開（トレタとの連携） | ネイティブアプリ不要のUXが国内での必須条件 |
| **ダイニー** | モバイルオーダー連動のID化、スタッフへの顧客情報通知 | 常連客の可視化とパーソナライズ接客によるLTV向上 | 現場スタッフの負担を減らすUIと即時性が重要 |
| **favy** | サブスクリプション管理、複数店舗の横断型事前決済 | コーヒー定額制やスポーツチーム連携。個社開発へシフト | 定型SaaSの限界と、現場オペレーションに合わせた柔軟性の必要性 |
| **Commune** | 掲示板、Q\&A、バッジ付与、VoC収集と分析 | D2Cメーカーのファンコミュニティが中心 | 顧客間のピアサポートがブランドへの愛着を深化させる |

国内市場の分析から得られる明確なインサイトは、エンドユーザーに対する心理的ハードル（摩擦）を下げるために、LINE連携などの既存インフラを活用することが不可欠であるという点だ。純粋な「掲示板による顧客同士の交流」を街の単独飲食店レベルで展開している事例はまだ少なく、データに基づく行動履歴の可視化と、それに応じた自動化されたおもてなし（CRM）が現在の主戦場となっている。

## **4\. 海外市場における次世代型顧客エンゲージメントの潮流**

海外、特に北米市場においては、レストランと顧客の直接的な関係構築（Direct to Consumer）を支援するプラットフォームがさらに高度に進化している。単なる割引ではなく、「体験のアップグレード」や「ブロックチェーン技術を用いた新しい所有経済（Web3）」への移行が見られる。

### **4.1. 体験価値のパーソナライズとイベント管理プラットフォーム**

アメリカ発の「SevenRooms（セブンルームス）」は、世界中のミシュラン星付きレストランや高級ホテルチェーンで導入されている「ゲスト体験・リテンションプラットフォーム」である27。SevenRoomsの最大の特徴は、単なる予約管理にとどまらず、顧客データ（CRM）をマーケティングと直結させている点にある。  
POSシステムと連携し、予約から注文内容、支出額、アレルギー、過去の座席の好みまでを一つのデータベースに集約する。これにより、現場スタッフに極めてパーソナライズされた接客を実現させる28。特筆すべきは、予約フローの中に「事前決済型のアドオン（アップグレード）」や「イベントチケットの販売」を組み込む機能である32。誕生日ケーキの事前予約、シャンパントーストの追加、あるいは「ドラァグ・ビンゴ」「ワインテイスティング」といった店舗主催イベントのチケットを、外部プラットフォームに頼らず自社システム内で販売できる32。データによれば、事前決済を伴う予約は、そうでない予約に比べて顧客1人あたりの消費額が50%以上増加し、導入店舗はオンライン決済ツールを通じて年間平均45,000米ドル以上の追加収益を生み出している33。  
さらに、特定のVIPやロイヤルカスタマーに対して優先的に予約の空き枠を通知する「Priority Alerts」機能や、高頻度顧客専用のダイレクトメッセージ回線である「Private Line」を提供し、特別感を演出している30。これは、shokujiiで検討されている「飲食店主催の貸切イベント機能」が、事前決済と組み合わさることで巨大な収益源になることを証明している。

### **4.2. Web3とトークンエコノミクスがもたらすロイヤルティ革命**

既存の「ポイントや割引」に依存したロイヤルティプログラムの限界を打破すべく登場したのが、グルメサイト「Eater」や予約システム「Resy」の共同創業者であるBen Leventhal氏が2022年に立ち上げた「Blackbird（ブラックバード）」である34。同社はa16z CryptoやSpark Capitalなどから累計約8,500万ドル（約120億円）を調達し、外食産業におけるWeb3の社会実装を牽引している37。  
Blackbirdは、顧客がレストランに設置されたNFC端末にスマートフォンをタップして「チェックイン」することで、NFTベースの会員ステータスを獲得し、ネットワーク共通の特典通貨である「\$FLYトークン」を得られる仕組みを提供する38。2024年にリリースされた「Blackbird Pay」は、独自開発のL3ブロックチェーン「Flynet（ArbitrumとBaseを基盤とする）」を利用した決済ネットワークであり、店舗に対して一律2%という極めて低い固定手数料で決済手段を提供している40。  
このプラットフォームの真髄は、消費者が自分自身の「外食履歴」というデータを自己所有し、ネットワーク全体（プラットフォーム、レストラン、消費者）のインセンティブを一致させるトークンエコノミクスを構築している点にある41。ガス代（トランザクション手数料）として機能する![][image1]FLYトークンを付与するなど、新しい金融エコシステムと飲食体験を融合させている38。

### **4.3. オンラインプラットフォームを活用した食のC2Cコミュニティ**

飲食に特化しているわけではないが、海外では「Mighty Networks」や「Circle.so」といったコミュニティ構築プラットフォームを利用して、食を中心としたクローズドなコミュニティが活発に運営されている。  
例えば、「Amie: Ladies Only Supper Club」は、女性限定のサッパークラブ（夕食会）コミュニティである。オンラインのMighty Networks上でメンバー同士が交流し、オフライン（現実世界）のレストランで親密な食事会を定期的に開催するというモデルを確立している43。また、「Connect 574」は地域のコミュニティポータルとして機能し、「フード・インタレスト・グループ」を通じてフードトラック巡りや飲食店でのイベントを企画している。有料の「Perks Pass（年額100ドル）」を購入するとイベント割引などの特典が得られる仕組みを導入している45。さらに、「The Gourmet Diva」のように、オンラインでの料理教室とコミュニティ内での交流を月額制で提供する事例も存在し、食というテーマが強力なコミュニティ形成の接着剤となることを示している46。  
海外の動向から得られる最大のインサイトは、「従来型の値引き（ディスカウント）によるロイヤルティプログラムは崩壊しつつある」という事実である。顧客は割引ではなく「認知されること（Recognition）」や「摩擦のない利便性」を求めており、ロイヤルティはチェックアウト時のクーポン付与ではなく、長期間のデータに基づいた関係性のなかで構築されるべきものと再定義されている38。

## **5\. サブスクリプションモデルにおける失敗要因とロイヤルティの再定義**

shokujiiの拡張機能として「飲食店への月額サブスク課金機能」が検討されているが、飲食業界におけるサブスクリプションは、導入のハードルが低い一方で、致命的な失敗に陥るケースが後を絶たない。その構造的な課題を分析することは、新機能の設計において不可欠である。

### **5.1. 飲食サブスクリプションの構造的課題と失敗事例**

デジタルコンテンツ（SaaSや動画配信）のサブスクリプションとは異なり、飲食サービスには提供のたびに物理的な原価（食材費・光熱費・人件費など）と座席の占有が発生する。

* **カニバリゼーションと座席の占有（牛角の事例）**：過去に焼肉チェーン「牛角」が実施した「食べ放題PASS（月額制）」は、SNS等で話題となり爆発的に売れたものの、対象店舗の予約がサブスク利用者で完全に埋まってしまう事態を招いた。結果として、利益率の高い一般客（新規客）の入店機会を奪うことになり、早期に販売終了へと追い込まれた48。  
* **ターゲット設定の誤り（AOKIの事例）**：アパレル業界の事例ではあるが、AOKIが提供したスーツのサブスクリプション「suitsbox」は、想定していたターゲット層（実店舗をよく利用する40代）とサービスが競合してしまい、既存の売り切り事業の収益を削る（カニバリゼーション）結果となり、わずか半年で撤退した48。  
* **新規獲得偏重によるLTV低下**：多くのサブスクリプションは、初期の安さで新規顧客を獲得しようとするが、その後のアフターフォローや提供価値のアップデートが欠如しているため、顧客はすぐに飽きて離脱する50。特にミールキットなどの分野では、最初の6ヶ月間で60%から70%の顧客が解約するというデータもあり、高いチャーンレート（解約率）が広告宣伝費を膨張させ、事業を赤字に追い込む51。

### **5.2. 真の顧客ロイヤルティと「割引」からの脱却**

米国におけるレストランのロイヤルティプログラムに関する調査（Tillster等）によれば、多くのプログラムが失敗する最大の理由は「行動ではなく取引（金額）のみを追跡していること」にある。企業は値引きを提供しているに過ぎず、顧客は「次のディール（安売り）」を待つように訓練されてしまっている47。  
真のロイヤルカスタマーは、価格競争に巻き込まれない安定した収益基盤である。彼らは多少の不満があっても継続的に利用し、積極的に周囲に推奨する傾向があるため、良質な口コミを通じた新規顧客獲得（集客コストの削減）に大きく貢献する3。したがって、shokujiiが提供すべきサブスクリプション機能は、「食べ放題・飲み放題」といった原価を削るディスカウントモデルではなく、「権利・体験（アクセス権）」に対する課金モデルでなければならない。

## **6\. 「shokujii」追加機能の実装要件に対する戦略的インサイトと評価**

これまでの市場調査と分析を踏まえ、shokujiiの追加機能として検討されている6つの要件について、具体的な実装戦略と評価を提示する。

### **6.1. 掲示板・トークルーム・チャット機能（コミュニケーション活性化）**

**【戦略的インサイト】** 飲食店と顧客（B2C）、および顧客同士（C2C）の双方向コミュニケーション基盤の構築である。Communeの成功事例が示す通り、顧客同士がメニューの美味しい食べ方を語り合ったり、イベントの振り返りを行うピアサポートは、ブランドへの愛着を飛躍的に高める25。しかし、単なる雑談掲示板は過疎化（誰も書き込まない状態）するリスクが高い。Mighty Networksの事例からも分かるように、コミュニティは「情報を得る場所」ではなく「共通の体験を共有する場所」として設計する必要がある55。 **【実装への提言】** 店舗スタッフ（シェフや店長）からの「裏話」「本日の特別な仕入れ情報」などの一次情報発信をトリガーとし、顧客が画像付きで「食べた感想」を投稿できるUIを構築する。また、投稿に対してポイントやバッジを付与するゲーミフィケーション機能を連動させることで、継続的な参加モチベーションを維持させるべきである。

### **6.2. 飲食店オーナーが主催する貸切イベント機能**

**【戦略的インサイト】** SevenRoomsの機能がこの要件の理想形を体現している32。通常営業とは異なる「生産者を招いた限定食事会」や「特別なワインペアリングディナー」を自社システム内でチケット販売できる機能は、利益率の高い前払い収益（キャッシュフローの改善）を店舗にもたらす。 **【実装への提言】** イベントの事前決済機能は必須である。ノーショー（無断キャンセル）を完全に防ぐと同時に、顧客単価を引き上げる効果がある。shokujiiの既存の強みである「参加者が各自でメニューを選んで事前決済する」仕組み8 は、イベント幹事（飲食店オーナー）の個別対応の負担を極限まで減らす強力な武器となる。

### **6.3. コミュニティメンバーが飲食店内での貸切イベントを開催**

**【戦略的インサイト】** この機能は、顧客を「消費する客」から「イベントを共創するアンバサダー（主催者）」へと昇華させる極めて革新的なアプローチである。「Amie: Ladies Only Supper Club」のように、ユーザーが主体となって特定のテーマで店舗を貸し切る仕組みをプラットフォームが支援する形となる43。 **【実装への提言】** 飲食店にとって最も難しい「新規顧客の獲得」を、常連客のネットワークにアウトソースする形となる。ロイヤルカスタマーが友人を連れてくる口コミ効果は、広告宣伝費をかけずに良質な新規顧客を獲得する最強のチャネルである3。店舗側には「コミュニティメンバー主催イベント専用の特別メニューや貸切枠」を簡易に設定・公開できる機能を提供し、メンバーがアプリ上で友人を招待できるリンク発行機能を実装すべきである。

### **6.4. 飲食店への月額サブスク課金機能**

**【戦略的インサイト】** 前述の通り、原価率を悪化させる「食べ飲み放題」のサブスクリプションは破綻のリスクが高い。飲食店のFLコスト（食材費＋人件費）を圧迫しない設計が求められる。 **【実装への提言】** 「権利・体験（アクセス権）」に対する課金モデルを推奨する。例えば、「月額会員限定の裏メニューの注文権」「貸切イベントへの優先予約権」「混雑時の優先案内権（SevenRoomsのPriority Alertsの概念30）」など、原価が低く、かつ顧客の自己重要感（VIP感）を満たすサブスクリプションを店舗が自由に設計できるテンプレートを用意する。

### **6.5. 顧客の声を収集・アンケート収集機能（VoC）**

**【戦略的インサイト】** VoC（Voice of Customer）の収集は、飲食店のサービス改善と商品開発において生命線となる。Communeでは、アンケートやコミュニティ内の会話からN1（個人）の解像度でインサイトを抽出し、新商品の共創に繋げている25。また、顧客からの直接的な感謝の声をスタッフにフィードバックすることで、モチベーション向上と離職防止に劇的な効果をもたらす4。 **【実装への提言】** 単なる5段階評価のアンケートではなく、イベント終了後や食事後に自動で「どの料理のどの部分が良かったか」「次回どのようなイベントを希望するか」を尋ねるチャットボット的なヒアリング機能を組み込む。収集した定性データをAIで抽出・構造化し、店舗側に「改善アクションの提案」としてダッシュボード表示させる機能を持たせることが、他社との強力な差別化となる。

### **6.6. 飲食店のメンバーの中でさらに細分化したグループ作成**

**【戦略的インサイト】** Mighty Networks等のコミュニティプラットフォームでは、全体コミュニティの中に「興味関心グループ（サブグループ）」を設ける機能が標準的である45。これは、多様な顧客を抱える大規模店舗や、多店舗展開するチェーンにおいて非常に有効である。 **【実装への提言】** 「自然派ワイン愛好会」「辛いもの部」「週末家族連れグループ」など、属性ごとのマイクロコミュニティを形成させる。これにより、全体のタイムラインのノイズを減らし、各ユーザーに関連性の高い情報のみを表示させることができるため、特定のイベント告知に対するコンバージョン率（参加率）が飛躍的に向上する。

## **7\. 持続可能なビジネスモデル構築に向けたユニットエコノミクス（LTV/CAC）の最適化**

「shokujii」の飲食店向けコミュニティSaaS機能をビジネスとして成立させるためには、SaaS提供者（貴社）と、SaaSを利用する飲食店（クライアント）の双方において、ユニットエコノミクス（単位あたりの採算性）が成立する設計が不可欠である。

### **7.1. SaaSベンダー（貴社）視点のユニットエコノミクス**

SaaSビジネスにおいて事業の健全性を示す最重要指標が、「LTV / CAC \> 3」である56。

* **LTV（Customer Lifetime Value：顧客生涯価値）**：1つの飲食店がshokujiiを契約してから解約するまでに支払う利益の総額。計算式は「ARPA（平均月間売上高）÷ チャーンレート（解約率）」である56。  
* **CAC（Customer Acquisition Cost：顧客獲得コスト）**：1つの飲食店を新規に獲得するために要した営業・マーケティング総費用を、新規獲得顧客数で割ったもの57。

仮に飲食店1店舗を獲得するためのCACが10万円である場合、その店舗からのLTVは最低でも30万円以上でなければならない。LTVを最大化するためには、チャーンレートを月次で3%未満に抑えることが一般的に求められる57。SaaSの解約を防ぐためには、「shokujiiを導入していることで、明確に売上が上がっている、あるいは工数が削減されている」という成功体験（カスタマーサクセス）を導入初期（オンボーディング期）に提供することが必須である。初期設定の煩雑さや「コミュニティが過疎化する」といった事態は即座にチャーンに直結するため、favyが行っているような個社別の導入サポートや、運用代行オプションの提供も視野に入れるべきである21。

| 指標 | SaaSベンダー（貴社）にとっての意味 | 健全性の目安 | 改善のための具体的アクション |
| :---- | :---- | :---- | :---- |
| **LTV / CAC 比率** | 事業全体の持続可能性と成長余力を示す | 3.0以上 | 顧客単価の引き上げ、営業プロセスの効率化、リファラル営業の強化 |
| **CAC回収期間** | 投下した獲得コストを何ヶ月で回収できるか | 12ヶ月以内 | オンボーディング期間の短縮、初期費用の適切な設定 |
| **チャーンレート** | 月間の解約率（機能や価値への不満の表れ） | 3%未満 | コミュニティ活性化の伴走支援、VoCに基づく機能の継続的アップデート |

### **7.2. 飲食店（クライアント）視点のLTV向上と集客コスト削減**

一方で、shokujiiを導入する飲食店側も、エンドユーザー（消費者）に対するユニットエコノミクスを成立させなければならない。飲食店のLTVは一般的に、「平均客単価 × 年間来店回数 × 通い続ける年数」で計算される2。新規顧客の80〜90%が離脱する現状において2、shokujiiのコミュニティ機能を通じて2回目、3回目の来店を促すことができれば、飲食店のLTVは劇的に向上する。  
さらに、コミュニティSaaSは飲食店のCAC削減に直結する。従来のグルメサイト依存では、新規顧客を獲得するたびに高い送客手数料（CAC）が発生し続ける。しかし、shokujiiのコミュニティ内で「メンバー主催イベント」や「良質な口コミ」が発生すれば、既存顧客が自発的に新規顧客を連れてくるようになり、店舗側のCACは実質的にゼロ（あるいはマイナス）に近づく3。  
貴社がshokujiiコミュニティSaaSを飲食店に販売する際の価格設定（月額利用料）は、この「向上したLTV」と「削減されたグルメサイト広告費」の差額から算出されるべきである。飲食店の利益増分に対して妥当な月額費用（あるいは決済手数料モデル）を設定することが、サービス普及の鍵となる。

## **8\. 総括と将来展望**

国内外の市場調査およびデータ分析の結果、「shokujii」が飲食店版コミュニティSaaSへと拡張することは、現在の外食産業が直面する「新規獲得コストの高騰」「スタッフの人手不足」「LTV向上への渇望」という三重苦を解決する極めて有望な戦略であると結論付ける。市場において成功を収めるために、以下の3点を戦略的提言とする。

> 1. **「ディスカウント」から「体験のアップグレード」へのシフト**  
>    国内外のサブスクリプション失敗事例および「SevenRooms」「Blackbird」の成功事例が示す通り、値引きや無料提供を前提としたシステムは長続きしない。shokujiiのサブスク機能・イベント機能は、顧客に対して「限定メニューへのアクセス」「優先予約」「貸切イベント開催権」といった「VIP体験（自己重要感の充足）」を提供するツールとして位置づけるべきである。  
> 2. **C2C（顧客間）イベントのプラットフォーム化による「CACフリー集客」の実現**  
>    「コミュニティメンバーが店舗で貸切イベントを開催できる機能」は、他の飲食SaaS（予約台帳やモバイルオーダー中心のツール）にはない、shokujii独自の強力な競争優位性となる。既存の強みである「参加者個別のメニュー選択と事前決済」を最大限に活かし、常連客が自らアンバサダーとなって友人や同僚を連れてくる「自走型集客エコシステム」を構築することが、最も効果的な差別化戦略である。  
> 3. **既存インフラとのシームレスな統合の検討**  
>    日本国内においては、独立したアプリへの登録・ログインは顧客にとって大きな摩擦となる。LINEプラットフォーム等との連携を活用し、顧客が極めて低いハードルでコミュニティに参加・決済できる導線設計（UI/UX）を組み込むことが、コミュニティの過疎化を防ぎ、導入店舗のチャーンレートを下げる必須条件となる。

「食事でつながる」というshokujiiのコアバリューは、テクノロジーによって分断されがちな現代において、人間本来の温かみと信頼関係を取り戻すための最も強力な触媒となる。適切なユニットエコノミクスの設計と、顧客体験を中心としたコミュニティ運営機能の実装により、shokujiiは次世代の飲食SaaS市場を強力に牽引する存在となり得る。

#### **引用文献**

> 1. 飲食店におすすめのCRM（顧客管理システム）15選 \- ミツモア, [https\://meetsmore.com/product-services/customer-relationship-management/media/137033](https://meetsmore.com/product-services/customer-relationship-management/media/137033)  
> 2. LTV計算とKPI設計で、感覚経営から脱却する飲食店の全手順 \- note, [https\://note.com/freejoblife\_shuu/n/nc7218a21a6a2](https://note.com/freejoblife_shuu/n/nc7218a21a6a2)  
> 3. 飲食店のロイヤルカスタマー育成を徹底解説 \- レストランスター, [https\://res-star.com/archives/column/loyal-customer](https://res-star.com/archives/column/loyal-customer)  
> 4. 【2026年最新】飲食店を悩ます5つの課題とは？解決のポイントと, [https\://www\.k-tenpo.com/column/369/](https://www.k-tenpo.com/column/369/)  
> 5. 飲食店の課題点と改善策：潰れない飲食店づくりポイント, [https\://magazine.fancrew.jp/issues-and-improvement-measures-for-restaurants](https://magazine.fancrew.jp/issues-and-improvement-measures-for-restaurants)  
> 6. ニジュウニ株式会社, [https\://nijuni.jp/](https://nijuni.jp/)  
> 7. 食事でつながるコミュニティサービス「shokujii」をリリース。食, [https\://prtimes.jp/main/html/rd/p/000000009.000052186.html](https://prtimes.jp/main/html/rd/p/000000009.000052186.html)  
> 8. shokujii コーポレート, [https\://corporate-lp.shokujii.jp/](https://corporate-lp.shokujii.jp/)  
> 9. LINEヤフー、飲食・理美容業界特化のパッケージサービス「LINE, [https\://www\.lycorp.co.jp/ja/news/release/020112/](https://www.lycorp.co.jp/ja/news/release/020112/)  
> 10. 飲食業界特化のパッケージサービス「LINEレストランプラス」を, [https\://foodpurpose.proguide.co.jp/article/C\_hBshCL](https://foodpurpose.proguide.co.jp/article/C_hBshCL)  
> 11. 外食DXに激震！LINEヤフーが放つ「LINEレストランプラス」と, [https\://www\.daisukemiwa.com/post/%E5%A4%96%E9%A3%9Fdx%E3%81%AB%E6%BF%80%E9%9C%87%EF%BC%81line%E3%83%A4%E3%83%95%E3%83%BC%E3%81%8C%E6%94%BE%E3%81%A4%E3%80%8Cline%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%83%97%E3%83%A9%E3%82%B9%E3%80%8D%E3%81%A8%E3%83%88%E3%83%AC%E3%82%BF%E8%B2%B7%E5%8F%8E%E3%81%AE%E8%A1%9D%E6%92%83](https://www.daisukemiwa.com/post/%E5%A4%96%E9%A3%9Fdx%E3%81%AB%E6%BF%80%E9%9C%87%EF%BC%81line%E3%83%A4%E3%83%95%E3%83%BC%E3%81%8C%E6%94%BE%E3%81%A4%E3%80%8Cline%E3%83%AC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%83%97%E3%83%A9%E3%82%B9%E3%80%8D%E3%81%A8%E3%83%88%E3%83%AC%E3%82%BF%E8%B2%B7%E5%8F%8E%E3%81%AE%E8%A1%9D%E6%92%83)  
> 12. トレタ予約台帳とは？機能・料金・連携POSレジ・グルメサイトを, [https\://pro-marketing.jp/restaurant/yoyaku/toreta/](https://pro-marketing.jp/restaurant/yoyaku/toreta/)  
> 13. LINEヤフーが描く「Connect One」戦略 LINEミニアプリとAIで, [https\://note.com/lycorp\_recruit/n/n324835d74128](https://note.com/lycorp_recruit/n/n324835d74128)  
> 14. LINEヤフーとトレタ、飲食店の集客・顧客管理課題をデジタルで, [https\://prtimes.jp/main/html/rd/p/000000100.000038464.html](https://prtimes.jp/main/html/rd/p/000000100.000038464.html)  
> 15. 顧客満足度と売上は比例する？アンケートを店舗改善に ... \- ダイニー, [https\://dinii.jp/casestudy/interview/case\_mostfun/](https://dinii.jp/casestudy/interview/case_mostfun/)  
> 16. ラーメン店でも効果を実証。スタッフ2名減×客単価100円 ... \- ダイニー, [https\://dinii.jp/casestudy/interview/unchi/](https://dinii.jp/casestudy/interview/unchi/)  
> 17. 系列店送客、アンケート活用など、11店舗で成功事例を創出。主体, [https\://dinii.jp/casestudy/interview/case\_bedreamers/](https://dinii.jp/casestudy/interview/case_bedreamers/)  
> 18. 外食SX CSVアワード2024レポート！社会課題に取り組み ... \- ダイニー, [https\://dinii.jp/casestudy/column/news\_20249419/](https://dinii.jp/casestudy/column/news_20249419/)  
> 19. 宇都宮ブレックスとfavyが協同で、飲食店を盛り上げるサブスク, [https\://www\.utsunomiyabrex.com/news/detail/id=17709](https://www.utsunomiyabrex.com/news/detail/id=17709)  
> 20. 月額500円（税込）で千葉県内の飲食店がお得に利用できるサブスク, [https\://chibajets.jp/news/detail/id=19074](https://chibajets.jp/news/detail/id=19074)  
> 21. favy、モバイルオーダー・サブスクSaaS導入企業向けに「FDE型, [https\://prtimes.jp/main/html/rd/p/000000357.000016506.html](https://prtimes.jp/main/html/rd/p/000000357.000016506.html)  
> 22. 外食×AI｜日報145｜favy、飲食店の現場に入り込む「FDE型」開発, [https\://note.com/hpn571/n/nb1dd4d157d9d](https://note.com/hpn571/n/nb1dd4d157d9d)  
> 23. 飲食店向け顧客管理ソフト（CRM）13選。違いやできることは？, [https\://www\.aspicjapan.org/asu/article/65122](https://www.aspicjapan.org/asu/article/65122)  
> 24. 【2026年】飲食店の集客ツールおすすめ20選｜選び方を解説, [https\://omiselab.toypo.me/restaurant-marketing-tool](https://omiselab.toypo.me/restaurant-marketing-tool)  
> 25. コミュニティ運営・顧客理解・VoC活用プラットフォーム, [https\://commune.co.jp/community/](https://commune.co.jp/community/)  
> 26. 導入事例一覧 | Commune（コミューン）｜コミュニティ運営・顧客, [https\://commune.co.jp/case/](https://commune.co.jp/case/)  
> 27. SevenRooms Pricing Overview \- G2, [https\://www\.g2.com/products/sevenrooms/pricing](https://www.g2.com/products/sevenrooms/pricing)  
> 28. SevenRooms Review: Pros, Cons, Features, and Pricing Explained, [https\://thehotelgm.com/tools/seven-rooms-review/](https://thehotelgm.com/tools/seven-rooms-review/)  
> 29. SEVENROOMS Reviews & Product Details \- Hotel Tech Report, [https\://hoteltechreport.com/food-and-beverage/restaurant-reservation-software/sevenrooms](https://hoteltechreport.com/food-and-beverage/restaurant-reservation-software/sevenrooms)  
> 30. NEW GUEST-FACING SEVENROOMS FEATURES MAKE IT, [https\://www\.prnewswire.com/news-releases/new-guest-facing-sevenrooms-features-make-it-easier-for-operators-to-reward-loyal-guests-and-personalize-communication-301999979.html](https://www.prnewswire.com/news-releases/new-guest-facing-sevenrooms-features-make-it-easier-for-operators-to-reward-loyal-guests-and-personalize-communication-301999979.html)  
> 31. SevenRooms | Square App Marketplace, [https\://squareup.com/jp/en/app-marketplace/app/sevenrooms](https://squareup.com/jp/en/app-marketplace/app/sevenrooms)  
> 32. SevenRooms Fab Five, [https\://sevenrooms.com/blog/fab-five/](https://sevenrooms.com/blog/fab-five/)  
> 33. How to Upgrade Your Guest Experience & Grow Revenue with, [https\://sevenrooms.com/blog/drive-revenue-online-payments/](https://sevenrooms.com/blog/drive-revenue-online-payments/)  
> 34. Blackbird Labs, Inc. | Companies | QED Investors, [https\://www\.qedinvestors.com/companies/blackbird-labs-inc](https://www.qedinvestors.com/companies/blackbird-labs-inc)  
> 35. Product Designer @ Blackbird Labs | Multicoin Capital Job Board, [https\://jobs.multicoin.capital/companies/blackbird-labs-2/jobs/52162802-product-designer](https://jobs.multicoin.capital/companies/blackbird-labs-2/jobs/52162802-product-designer)  
> 36. Can Blackbird, Ben Leventhal's Crypto App, Save Restaurants? \- TIME, [https\://time.com/7005516/crypto-ben-leventhal-blackbird-app-restaurants/](https://time.com/7005516/crypto-ben-leventhal-blackbird-app-restaurants/)  
> 37. \$85 million bet on dining Web3: How Blackbird is reconstructing the, [https\://www\.rootdata.com/news/278695](https://www.rootdata.com/news/278695)  
> 38. MetaMask Card x Blackbird: Exclusive crypto card dining benefits, [https\://metamask.io/news/metamask-card-blackbird-dining-benefits](https://metamask.io/news/metamask-card-blackbird-dining-benefits)  
> 39. Base: Bringing Future of Consumer Applications \- FP RESEARCH, [https\://research.4pillars.io/en/research/base](https://research.4pillars.io/en/research/base)  
> 40. Restaurant loyalty app Blackbird launches payment network, [https\://www\.restaurantbusinessonline.com/technology/restaurant-loyalty-app-blackbird-launches-payment-network](https://www.restaurantbusinessonline.com/technology/restaurant-loyalty-app-blackbird-launches-payment-network)  
> 41. Blackbird Flynet Explained: Onchain Restaurant Loyalty \- Conduit XYZ, [https\://www\.conduit.xyz/blog/blackbird-flynet-explained/](https://www.conduit.xyz/blog/blackbird-flynet-explained/)  
> 42. How Blackbird Is Unlocking Crypto's App Ecosystem | Ben Leventhal, [https\://solanacompass.com/learn/Lightspeed/how-blackbird-is-unlocking-cryptos-app-ecosystem-ben-leventhal-jesse-walden](https://solanacompass.com/learn/Lightspeed/how-blackbird-is-unlocking-cryptos-app-ecosystem-ben-leventhal-jesse-walden)  
> 43. Amie: Ladies Only Supper Club \- Apps on Google Play, [https\://play.google.com/store/apps/details?id=com.mightybell.amieladiesonlysupperclub](https://play.google.com/store/apps/details?id=com.mightybell.amieladiesonlysupperclub)  
> 44. Amie: Ladies Only Supper Club for iPhone \- AppBrain, [https\://www\.appbrain.com/appstore/amie-ladies-only-supper-club/ios-6777183202](https://www.appbrain.com/appstore/amie-ladies-only-supper-club/ios-6777183202)  
> 45. Frequently Asked Questions \- Connect 574, [https\://connect574.com/frequently-asked-questions/](https://connect574.com/frequently-asked-questions/)  
> 46. Join The Membership Gourmet Diva Inc., [https\://www\.thegourmetdiva.com/join-the-membership](https://www.thegourmetdiva.com/join-the-membership)  
> 47. Why Most Restaurant Loyalty Programs Fail in 2026 Data-Back, [https\://www\.uengage.io/spotlight/why-most-restaurant-loyalty-programs-fail-in-2026](https://www.uengage.io/spotlight/why-most-restaurant-loyalty-programs-fail-in-2026)  
> 48. 日本のサブスク成功事例 8 選と失敗事例 3 選を紹介 \- Stripe, [https\://stripe.com/jp/resources/more/subscription-case-studies-japan](https://stripe.com/jp/resources/more/subscription-case-studies-japan)  
> 49. サブスクリプションの失敗事例は？日本企業が撤退した事業5つと, [https\://www\.tsuhan-marketing.com/blog/subscription/failure\_case2020](https://www.tsuhan-marketing.com/blog/subscription/failure_case2020)  
> 50. サブスクリプションの失敗事例から学ぶ！失敗の原因と成功の, [https\://www\.robotpayment.co.jp/lab-blog/recurring/1151/](https://www.robotpayment.co.jp/lab-blog/recurring/1151/)  
> 51. 【徹底解剖】失敗に終わる「サブスク負け組」の共通点 \- ビジネス+IT, [https\://www\.sbbit.jp/article/cont1/35972](https://www.sbbit.jp/article/cont1/35972)  
> 52. 顧客ロイヤルティとは？顧客ロイヤルティを向上するメリットや, [https\://www\.creativehope.co.jp/invy/blog/customer-loyalty](https://www.creativehope.co.jp/invy/blog/customer-loyalty)  
> 53. ロイヤルティプログラムとは？種類とメリット、注意点、成功事例, [https\://www\.sprocket.bz/blog/202300308-loyalty\_program.html](https://www.sprocket.bz/blog/202300308-loyalty_program.html)  
> 54. 機能紹介 | Commune（コミューン）｜コミュニティ運営・顧客理解, [https\://commune.co.jp/function/](https://commune.co.jp/function/)  
> 55. Facebook vs Mighty Networks: Scared To Choose The Wrong, [https\://dianatower.com/facebook-vs-mighty-networks-scared-to-choose-the-wrong-platform-for-your-membership-community/](https://dianatower.com/facebook-vs-mighty-networks-scared-to-choose-the-wrong-platform-for-your-membership-community/)  
> 56. SaaSの公式「LTV/CAC \> 3x」ってなんでなの？分解して考えてみた。, [https\://www\.wantedly.com/companies/wantedly/post\_articles/136733](https://www.wantedly.com/companies/wantedly/post_articles/136733)  
> 57. LTV／CACとは？計算式・目安・改善方法をSaaS向けに解説, [https\://www\.hubspot.jp/products/service/ltv-cac](https://www.hubspot.jp/products/service/ltv-cac)  
> 58. ユニットエコノミクス（LTV/CAC）とは？計算方法から目安、重要性, [https\://scalebase.com/blog/sales-strategy/unit-economics-toha](https://scalebase.com/blog/sales-strategy/unit-economics-toha)  
> 59. CAC（顧客獲得単価）とは？LTVとの関係・改善方法・計算用, [https\://www\.shanon.co.jp/blog/entry/cac/](https://www.shanon.co.jp/blog/entry/cac/)  
> 60. 話題の店舗サブスクを始めるために必要な４つのポイント \- favicon, [https\://blog.favy.co.jp/17848/](https://blog.favy.co.jp/17848/)

[image1]: <data:image/png;base64,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>