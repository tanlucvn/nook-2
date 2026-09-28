import * as p from "drizzle-orm/pg-core";
import { user } from "./auth";

export const feedTypeEnum = p.pgEnum("feed_type", ["rss", "podcast", "youtube", "twitter"]);

export const feed = p.pgTable(
	"feed",
	{
		id: p.uuid().primaryKey().defaultRandom(),
		userId: p
			.text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		type: feedTypeEnum().notNull(),
		url: p.text().notNull(),
		title: p.text().notNull(),
		iconUrl: p.text("icon_url"),
		createdAt: p.timestamp("created_at").notNull().defaultNow(),
	},
	// Chặn user subscribe trùng 1 url 2 lần
	(t) => [p.unique("feed_user_url_unique").on(t.userId, t.url)],
);

export const item = p.pgTable(
	"item",
	{
		id: p.uuid().primaryKey().defaultRandom(),
		feedId: p
			.uuid("feed_id")
			.notNull()
			.references(() => feed.id, { onDelete: "cascade" }),
		title: p.text().notNull(),
		url: p.text().notNull(),
		contentRaw: p.text("content_raw"),
		contentClean: p.text("content_clean"),
		publishedAt: p.timestamp("published_at"),
		fetchedAt: p.timestamp("fetched_at").notNull().defaultNow(),
		isRead: p.boolean("is_read").notNull().default(false),
		isFavorite: p.boolean("is_favorite").notNull().default(false),
	},
	// Cùng 1 feed không lưu trùng 1 url 2 lần -> dùng để dedup khi fetch RSS
	(t) => [p.unique("item_feed_url_unique").on(t.feedId, t.url)],
);

export const summary = p.pgTable("summary", {
	id: p.uuid().primaryKey().defaultRandom(),
	itemId: p
		.uuid("item_id")
		.notNull()
		.references(() => item.id, { onDelete: "cascade" }),
	summaryText: p.text("summary_text").notNull(),
	generatedAt: p.timestamp("generated_at").notNull().defaultNow(),
});

export const tag = p.pgTable(
	"tag",
	{
		id: p.uuid().primaryKey().defaultRandom(),
		userId: p
			.text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		name: p.text().notNull(),
	},
	// Tránh user tạo tag cùng tên
	(t) => [p.unique("tag_user_name_unique").on(t.userId, t.name)],
);

// Bảng nối many-to-many giữa item và tag
export const itemTag = p.pgTable(
	"item_tag",
	{
		itemId: p
			.uuid("item_id")
			.notNull()
			.references(() => item.id, { onDelete: "cascade" }),
		tagId: p
			.uuid("tag_id")
			.notNull()
			.references(() => tag.id, { onDelete: "cascade" }),
	},
	(t) => [p.primaryKey({ columns: [t.itemId, t.tagId] })],
);
