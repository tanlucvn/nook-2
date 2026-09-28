import { item } from "@nook/db";
import { listItemSchema, markReadItemSchema, selectItemSchema, toggleFavoriteItemSchema } from "@nook/validation";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { protectedProcedure, router } from "../index";

export const itemRouter = router({
	list: protectedProcedure
		.input(listItemSchema)
		.output(z.array(selectItemSchema))
		.query(async ({ input, ctx }) => {
			const ownFeeds = await ctx.db.query.feed.findMany({
				where: input.feedId
					? { id: input.feedId, userId: ctx.session.user.id }
					: { userId: ctx.session.user.id },
				columns: { id: true },
			});

			if (ownFeeds.length === 0) {
				return [];
			}

			const feedIds = ownFeeds.map((f) => f.id);

			return await ctx.db.query.item.findMany({
				where: {
					feedId: { in: feedIds },
					// isRead: input.onlyUnread ? false : undefined,
				},
				with: {
					feed: true,
					summaries: {
						orderBy: { generatedAt: "desc" },
						limit: 1,
					},
				},
				orderBy: { publishedAt: "desc" },
			});
		}),

	markRead: protectedProcedure.input(markReadItemSchema).mutation(async ({ input, ctx }) => {
		const found = await ctx.db.query.item.findFirst({
			where: { id: input.id },
			with: { feed: { columns: { userId: true } } },
		});

		if (!found || found.feed.userId !== ctx.session.user.id) {
			throw new TRPCError({ code: "NOT_FOUND", message: "Item không tồn tại" });
		}

		return await ctx.db.update(item).set({ isRead: input.isRead }).where(eq(item.id, input.id));
	}),

	toggleFavorite: protectedProcedure.input(toggleFavoriteItemSchema).mutation(async ({ input, ctx }) => {
		const found = await ctx.db.query.item.findFirst({
			where: { id: input.id },
			with: { feed: { columns: { userId: true } } },
		});

		if (!found || found.feed.userId !== ctx.session.user.id) {
			throw new TRPCError({ code: "NOT_FOUND", message: "Item không tồn tại" });
		}

		return await ctx.db.update(item).set({ isFavorite: input.isFavorite }).where(eq(item.id, input.id));
	}),
});
