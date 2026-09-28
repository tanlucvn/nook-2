export const USER_ID = "00000000-0000-0000-0000-000000000001";

export const FEED_IDS = {
	hackerNews: "10000000-0000-0000-0000-000000000001",
	theVerge: "10000000-0000-0000-0000-000000000002",
	vergeTech: "10000000-0000-0000-0000-000000000003",
	googleDevelopers: "10000000-0000-0000-0000-000000000004",
};

export const ITEM_IDS = {
	aiDevelopment: "20000000-0000-0000-0000-000000000001",
	developerTools: "20000000-0000-0000-0000-000000000002",
	webPlatform: "20000000-0000-0000-0000-000000000003",
	openSource: "20000000-0000-0000-0000-000000000004",
	reactUpdate: "20000000-0000-0000-0000-000000000005",
};

export const SUMMARY_IDS = {
	aiDevelopment: "30000000-0000-0000-0000-000000000001",
	developerTools: "30000000-0000-0000-0000-000000000002",
	webPlatform: "30000000-0000-0000-0000-000000000003",
};

export const TAG_IDS = {
	ai: "40000000-0000-0000-0000-000000000001",
	development: "40000000-0000-0000-0000-000000000002",
	web: "40000000-0000-0000-0000-000000000003",
	design: "40000000-0000-0000-0000-000000000004",
	opensource: "40000000-0000-0000-0000-000000000005",
};

export const ITEM_TAG_IDS = {
	aiDevelopmentAi: {
		itemId: ITEM_IDS.aiDevelopment,
		tagId: TAG_IDS.ai,
	},
	aiDevelopmentDevelopment: {
		itemId: ITEM_IDS.aiDevelopment,
		tagId: TAG_IDS.development,
	},
	developerToolsDevelopment: {
		itemId: ITEM_IDS.developerTools,
		tagId: TAG_IDS.development,
	},
	webPlatformWeb: {
		itemId: ITEM_IDS.webPlatform,
		tagId: TAG_IDS.web,
	},
	openSourceOpenSource: {
		itemId: ITEM_IDS.openSource,
		tagId: TAG_IDS.opensource,
	},
	reactUpdateDevelopment: {
		itemId: ITEM_IDS.reactUpdate,
		tagId: TAG_IDS.development,
	},
};

export const SAMPLE_FEEDS = [
	{
		id: FEED_IDS.hackerNews,
		userId: USER_ID,
		type: "rss",
		url: "https://hnrss.org/frontpage",
		title: "Hacker News",
		iconUrl: "https://news.ycombinator.com/favicon.ico",
		createdAt: new Date("2026-09-20T08:00:00Z"),
	},
	{
		id: FEED_IDS.theVerge,
		userId: USER_ID,
		type: "rss",
		url: "https://www.theverge.com/rss/index.xml",
		title: "The Verge",
		iconUrl: "https://www.theverge.com/favicon.ico",
		createdAt: new Date("2026-09-21T08:00:00Z"),
	},
	{
		id: FEED_IDS.vergeTech,
		userId: USER_ID,
		type: "rss",
		url: "https://www.theverge.com/tech/rss/index.xml",
		title: "The Verge Tech",
		iconUrl: "https://www.theverge.com/favicon.ico",
		createdAt: new Date("2026-09-22T08:00:00Z"),
	},
	{
		id: FEED_IDS.googleDevelopers,
		userId: USER_ID,
		type: "youtube",
		url: "https://www.youtube.com/feeds/videos.xml?channel_id=UC_x5XG1OV2P6uZZ5FSM9Ttw",
		title: "Google for Developers",
		iconUrl: "https://www.youtube.com/favicon.ico",
		createdAt: new Date("2026-09-23T08:00:00Z"),
	},
];

export const SAMPLE_ITEMS = [
	{
		id: ITEM_IDS.aiDevelopment,
		feedId: FEED_IDS.hackerNews,
		title: "The Future of AI Development",
		url: "https://example.com/articles/future-of-ai-development",
		contentRaw: "<p>AI is changing the way developers build software.</p>",
		contentClean: "AI is changing the way developers build software.",
		publishedAt: new Date("2026-09-26T08:00:00Z"),
		fetchedAt: new Date("2026-09-26T08:10:00Z"),
		isRead: false,
		isFavorite: true,
	},
	{
		id: ITEM_IDS.developerTools,
		feedId: FEED_IDS.hackerNews,
		title: "The Future of Developer Tools",
		url: "https://example.com/articles/future-of-developer-tools",
		contentRaw: "<p>Developer tools are evolving rapidly.</p>",
		contentClean: "Developer tools are evolving rapidly.",
		publishedAt: new Date("2026-09-25T14:30:00Z"),
		fetchedAt: new Date("2026-09-25T14:40:00Z"),
		isRead: true,
		isFavorite: false,
	},
	{
		id: ITEM_IDS.webPlatform,
		feedId: FEED_IDS.theVerge,
		title: "The Latest Web Platform Updates",
		url: "https://example.com/articles/web-platform-updates",
		contentRaw: "<p>The web platform continues to evolve.</p>",
		contentClean: "The web platform continues to evolve.",
		publishedAt: new Date("2026-09-24T10:00:00Z"),
		fetchedAt: new Date("2026-09-24T10:15:00Z"),
		isRead: false,
		isFavorite: false,
	},
	{
		id: ITEM_IDS.openSource,
		feedId: FEED_IDS.theVerge,
		title: "Why Open Source Software Matters",
		url: "https://example.com/articles/open-source",
		contentRaw: null,
		contentClean: null,
		publishedAt: new Date("2026-09-23T09:00:00Z"),
		fetchedAt: new Date("2026-09-23T09:15:00Z"),
		isRead: true,
		isFavorite: true,
	},
	{
		id: ITEM_IDS.reactUpdate,
		feedId: FEED_IDS.googleDevelopers,
		title: "What's New in Modern React Development",
		url: "https://example.com/articles/react-update",
		contentRaw: "<p>New patterns for building modern React applications.</p>",
		contentClean: "New patterns for building modern React applications.",
		publishedAt: new Date("2026-09-22T12:00:00Z"),
		fetchedAt: new Date("2026-09-22T12:10:00Z"),
		isRead: false,
		isFavorite: false,
	},
];

export const SAMPLE_SUMMARIES = [
	{
		id: SUMMARY_IDS.aiDevelopment,
		itemId: ITEM_IDS.aiDevelopment,
		summaryText:
			"Bài viết phân tích cách AI đang thay đổi quy trình phát triển phần mềm, từ viết code đến kiểm thử và tự động hóa.",
		generatedAt: new Date("2026-09-26T09:00:00Z"),
	},
	{
		id: SUMMARY_IDS.developerTools,
		itemId: ITEM_IDS.developerTools,
		summaryText:
			"Các công cụ dành cho developer đang tích hợp ngày càng nhiều tính năng AI để hỗ trợ coding, debugging và automation.",
		generatedAt: new Date("2026-09-25T16:00:00Z"),
	},
	{
		id: SUMMARY_IDS.webPlatform,
		itemId: ITEM_IDS.webPlatform,
		summaryText:
			"Bài viết tổng hợp những thay đổi đáng chú ý trong web platform và tác động của chúng đến việc phát triển ứng dụng web.",
		generatedAt: new Date("2026-09-24T11:00:00Z"),
	},
];

export const SAMPLE_TAGS = [
	{
		id: TAG_IDS.ai,
		userId: USER_ID,
		name: "AI",
	},
	{
		id: TAG_IDS.development,
		userId: USER_ID,
		name: "Development",
	},
	{
		id: TAG_IDS.web,
		userId: USER_ID,
		name: "Web",
	},
	{
		id: TAG_IDS.design,
		userId: USER_ID,
		name: "Design",
	},
	{
		id: TAG_IDS.opensource,
		userId: USER_ID,
		name: "Open Source",
	},
];

export const SAMPLE_ITEM_TAGS = [
	ITEM_TAG_IDS.aiDevelopmentAi,
	ITEM_TAG_IDS.aiDevelopmentDevelopment,
	ITEM_TAG_IDS.developerToolsDevelopment,
	ITEM_TAG_IDS.webPlatformWeb,
	ITEM_TAG_IDS.openSourceOpenSource,
	ITEM_TAG_IDS.reactUpdateDevelopment,
];
