import { feed } from "@nook/db";
import { createFeedSchema, deleteFeedSchema, selectFeedSchema, syncFeedSchema } from "@nook/validation";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import * as z from "zod";
import { protectedProcedure, router } from "../index";
import { fetchAndStoreFeedItems } from "../lib/rss";

export const feedRouter = router({
	list: protectedProcedure.output(z.array(selectFeedSchema)).query(async ({ ctx }) => {
		return await ctx.db.query.feed.findMany({
			where: { userId: ctx.session.user.id },
			orderBy: { createdAt: "desc" },
		});
	}),

	create: protectedProcedure
		.input(createFeedSchema)
		.output(selectFeedSchema)
		.mutation(async ({ input, ctx }) => {
			const [created] = await ctx.db
				.insert(feed)
				.values({
					userId: ctx.session.user.id,
					url: input.url,
					title: input.title,
					type: input.type,
				})
				.returning();

			if (!created) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to create feed",
				});
			}

			// Fetch ngay lần đầu để user thấy item luôn, không phải đợi cron
			if (created.type === "rss") {
				try {
					await fetchAndStoreFeedItems(ctx.db, created.id, created.url);
				} catch {
					// Feed tạo thành công dù fetch đầu tiên lỗi (url sai, feed sập...);
					// cron lần sau sẽ thử lại.
				}
			}

			return created;
		}),

	delete: protectedProcedure.input(deleteFeedSchema).mutation(async ({ input, ctx }) => {
		await ctx.db.delete(feed).where(and(eq(feed.id, input.id), eq(feed.userId, ctx.session.user.id)));
		return { success: true };
	}),

	sync: protectedProcedure.input(syncFeedSchema).mutation(async ({ input, ctx }) => {
		const found = await ctx.db.query.feed.findFirst({
			where: { id: input.id, userId: ctx.session.user.id },
		});

		if (!found) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Feed không tồn tại",
			});
		}

		return await fetchAndStoreFeedItems(ctx.db, found.id, found.url);
	}),
});
