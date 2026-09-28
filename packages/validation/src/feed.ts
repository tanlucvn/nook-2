import { feedTypeEnum } from "@nook/db";
import * as z from "zod";

// * Fields

export const feedIdSchema = z.uuid({ error: "Invalid feed id." });
export const feedUserIdSchema = z.string({ error: "User id must be a string." }).min(1, {
	error: "User id cannot be empty.",
});
export const feedUrlSchema = z.url({ error: "Invalid feed url." });
export const feedIconUrlSchema = z.url({ error: "Invalid icon url." }).nullable();
export const feedTitleSchema = z
	.string({ error: "Title must be a string." })
	.trim()
	.min(1, { error: "Title cannot be empty." })
	.max(200, { error: "Title must be 200 characters or fewer." });

export const feedTypeSchema = z.enum(feedTypeEnum.enumValues, {
	error: "Invalid feed type.",
});
export const feedCreatedAtSchema = z.coerce.date({ error: "Invalid created at date." });

// * Objects

export const selectFeedSchema = z.object({
	id: feedIdSchema,
	userId: feedUserIdSchema,
	type: feedTypeSchema,
	url: feedUrlSchema,
	title: feedTitleSchema,
	iconUrl: feedIconUrlSchema,
	createdAt: feedCreatedAtSchema,
});

export const createFeedSchema = z.object({
	url: feedUrlSchema,
	title: feedTitleSchema,
	type: feedTypeSchema.default("rss"),
});

export const syncFeedSchema = z.object({
	id: feedIdSchema,
});

export const deleteFeedSchema = z.object({
	id: feedIdSchema,
});

// * Types

export type SelectFeed = z.infer<typeof selectFeedSchema>;
export type CreateFeedInput = z.infer<typeof createFeedSchema>;
export type SyncFeedInput = z.infer<typeof syncFeedSchema>;
export type DeleteFeedInput = z.infer<typeof deleteFeedSchema>;
