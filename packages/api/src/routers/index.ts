import { publicProcedure, router } from "../index";
import { feedRouter } from "./feed";
import { itemRouter } from "./item";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	feed: feedRouter,
	item: itemRouter,
});
export type AppRouter = typeof appRouter;
