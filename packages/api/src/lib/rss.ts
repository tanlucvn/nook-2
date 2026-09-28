import type { Database } from "@nook/db";
import { item } from "@nook/db";
import Parser from "rss-parser";

const parser = new Parser();

/**
 * Fetch 1 feed RSS theo url, lưu các item mới vào DB.
 * Dựa vào unique constraint (feedId, url) trên bảng item để dedup:
 * item đã tồn tại thì bỏ qua (onConflictDoNothing), không throw lỗi.
 */
export async function fetchAndStoreFeedItems(db: Database, feedId: string, feedUrl: string) {
	const parsed = await parser.parseURL(feedUrl);

	const rows = parsed.items
		.filter((entry) => Boolean(entry.link))
		.map((entry) => ({
			feedId,
			title: entry.title ?? "(no title)",
			url: entry.link as string,
			contentRaw: entry.content ?? entry["content:encoded"] ?? null,
			contentClean: entry.contentSnippet ?? null,
			publishedAt: entry.isoDate ? new Date(entry.isoDate) : null,
		}));

	if (rows.length === 0) {
		return { inserted: 0 };
	}

	try {
		const inserted = await db
			.insert(item)
			.values(rows)
			.onConflictDoNothing({ target: [item.feedId, item.url] })
			.returning({ id: item.id });
		return { inserted: inserted.length };
	} catch (e) {
		console.error("PG error:", (e as { cause?: unknown }).cause ?? e);
		throw e;
	}
}

/**
 * Fetch toàn bộ feed có type = "rss" trong DB.
 * Dùng cho cron job / script chạy định kỳ, không phải cho tRPC.
 */
export async function fetchAllRssFeeds(db: Database) {
	const feeds = await db.query.feed.findMany({
		where: { type: "rss" },
	});

	const results = await Promise.allSettled(feeds.map((f) => fetchAndStoreFeedItems(db, f.id, f.url)));

	return feeds.map((f, i) => {
		const result = results[i];
		return {
			feedId: f.id,
			title: f.title,
			ok: result?.status === "fulfilled",
			inserted: result?.status === "fulfilled" ? result.value.inserted : 0,
			error: result?.status === "rejected" ? String(result.reason) : null,
		};
	});
}
