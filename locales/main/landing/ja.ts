const ja = {
	hero: {
		badge: "搭載クラウドファンディング分析プラットフォーム",
		title:
			"9以上のクラウドファンディングプラットフォームからリアルデータを抽出",
		subtitle:
			"OCR/NLP強化による高度なウェブスクレイピング。Kickstarter、Indiegogo、Makuake、WadizなどからAIによる高精度なデータ抽出と自動エクスポート。",
	},
	features: {
		badge: "実際のプラットフォーム機能",
		title: "私たちが実際に提供するもの",
		subtitle:
			"AI強化と自動化ワークフローによる包括的なクラウドファンディングデータ抽出",
		cards: [
			{
				title: "マルチプラットフォームスクレイピング",
				desc: "9以上のプラットフォーム（Kickstarter、Indiegogo、Makuake、Wadiz、Campfire、FlyingV、GreenFunding、ZecZec、Machi-ya）からデータを抽出。カテゴリ別フィルタリング対応。",
			},
			{
				title: "AI OCR + NLP強化",
				desc: "高度なOCRが画像から不足データを抽出。NLPで作成者情報、資金情報、日付、連絡先を抽出。",
			},
			{
				title: "多言語サポート",
				desc: "日本語、韓国語、中国語、英語の自動翻訳。OCRはアジア言語に特化した前処理に対応。",
			},
			{
				title: "自動エクスポート",
				desc: "ワンクリックでGoogleスプレッドシートに自動フォーマットでエクスポート。CSVダウンロードや選択的データエクスポートも可能。",
			},
			{
				title: "リアルタイム分析",
				desc: "成功率、資金平均、プラットフォーム分布、カテゴリ傾向をインタラクティブなチャートとパフォーマンス指標で追跡。",
			},
			{
				title: "ユーザー固有データ",
				desc: "個別データ保存による安全なユーザー分離。検索履歴、保存プロジェクト、個人分析、完全な監査証跡。",
			},
		],
	},
	platforms: {
		title: "対応プラットフォーム",
		platforms: [
			{ name: "Kickstarter", region: "グローバル" },
			{ name: "Indiegogo", region: "グローバル" },
			{ name: "Makuake", region: "日本" },
			{ name: "Wadiz", region: "韓国" },
			{ name: "Campfire", region: "日本" },
			{ name: "FlyingV", region: "台湾" },
			{ name: "GreenFunding", region: "日本" },
			{ name: "ZecZec", region: "台湾" },
			{ name: "Machi-ya", region: "日本" },
		],
	},
	dataExtraction: {
		title: "包括的なデータ抽出",
		basicTitle: "基本スクレイピングデータ",
		aiTitle: "AI強化データ（OCR/NLP）",
		basicList: [
			"プロジェクト名と説明",
			"資金額と目標",
			"支援者数と達成率",
			"プロジェクトURLと画像",
			"カテゴリ・プラットフォーム情報",
		],
		aiList: [
			"作成者/オーナー情報",
			"連絡先・ウェブサイト",
			"SNSリンク",
			"キャンペーン開始/終了日",
			"精度の信頼スコア",
		],
	},
	pricing: {
		title: "シンプルな価格設定",
		subtitle:
			"ご利用目的に合わせて最適なプランをお選びください。すべてのプランに主要なスクレイピングとAI強化機能が含まれます。",
		plans: [
			{
				name: "スターター",
				price: "$29",
				period: "/月",
				desc: "個人研究者や小規模チームに最適",
				features: [
					"月1,000回の検索",
					"9以上の全プラットフォーム対応",
					"基本的なOCR強化",
					"Googleスプレッドシート出力",
					"検索履歴トラッキング",
				],
				button: "始める",
			},
			{
				name: "プロフェッショナル",
				price: "$99",
				period: "/月",
				desc: "成長中のビジネスや研究チームに最適",
				features: [
					"月10,000回の検索",
					"高度なAI NLP処理",
					"多言語OCRサポート",
					"優先サポート",
					"高度な分析ダッシュボード",
				],
				button: "始める",
				popular: "人気No.1",
			},
			{
				name: "エンタープライズ",
				price: "カスタム",
				period: "",
				desc: "大規模組織やカスタム要件向け",
				features: [
					"無制限の検索",
					"カスタムプラットフォーム連携",
					"専用サポート",
					"SLA保証",
					"APIアクセス",
				],
				button: "お問い合わせ",
			},
		],
	},
	stats: {
		title: "プラットフォーム統計",
		subtitle:
			"包括的なクラウドファンディング分析プラットフォームのリアルタイムデータ",
		loading: "データベースからリアルタイム統計を読み込み中...",
		activeUsers: "アクティブユーザー",
		totalSearches: "総検索数",
		projectsAnalyzed: "分析済みプロジェクト",
		dataExports: "データエクスポート",
		successRate: "成功率",
		avgSuccess: "プロジェクト平均成功率",
		avgFunding: "平均調達額",
		perProject: "成功プロジェクトあたり",
		topPlatforms: "人気プラットフォーム",
		mostAnalyzed: "最も分析されたプラットフォーム",
		topCategories: "人気カテゴリ",
		mostPopular: "最も人気のカテゴリ",
		basedOn: "{count}件の分析済みプロジェクトに基づく",
		calculatedFrom: "成功したキャンペーンから算出",
		recentActivity: "最近のアクティビティ",
		searchesThisWeek: "今週の検索数",
		newUsersThisWeek: "今週の新規ユーザー",
		totalProjects: "総プロジェクト数",
		totalExports: "データエクスポート",
	},
	testimonials: {
		title: "プロフェッショナルに信頼されています",
		subtitle:
			"数千人のプロフェッショナルがCrowdFund Proをリサーチ・分析に活用しています",
		trust: [
			{ value: "98%", label: "顧客満足度" },
			{ value: "24/7", label: "プラットフォーム稼働率" },
			{ value: "99.9%", label: "データ精度" },
			{ value: "50+", label: "対応国数" },
		],
	},
	cta: {
		title: "リアルなクラウドファンディングデータを抽出しませんか？",
		subtitle:
			"多くの研究者や企業がAI搭載プラットフォームを信頼し、包括的なクラウドファンディング分析に活用しています。",
		startTrial: "無料トライアルを始める",
		contactSales: "お問い合わせ",
	},
	footer: {
		companyDesc:
			"AI搭載OCR/NLP強化による高度なクラウドファンディング分析プラットフォーム。9以上のグローバルプラットフォームから包括的なデータを自動エクスポートで抽出。",
		featuresTitle: "プラットフォーム機能",
		features: [
			"AI OCR強化",
			"マルチプラットフォームスクレイピング",
			"自動エクスポート",
			"データセキュリティ",
		],
		platformsTitle: "対応プラットフォーム",
		globalPlatforms: "グローバルプラットフォーム",
		asianPlatforms: "アジアプラットフォーム",
		platforms: [
			"Kickstarter",
			"Indiegogo",
			"Makuake（日本）",
			"Wadiz（韓国）",
			"Campfire（日本）",
			"FlyingV（台湾）",
			"GreenFunding（日本）",
			"ZecZec（台湾）",
			"Machi-ya（日本）",
		],
		contactTitle: "お問い合わせ・会社情報",
		email: "support@crowdfundpro.com",
		phone: "+1 (555) 123-4567",
		address: "サンフランシスコ, CA",
		startTrial: "無料トライアルを始める",
		signIn: "サインイン",
		copyright: "© 2024 CrowdFund Pro. 無断転載を禁じます。",
		privacy: "プライバシーポリシー",
		terms: "利用規約",
		cookie: "クッキーポリシー",
		contact: "お問い合わせ",
	},
};
export default ja;
