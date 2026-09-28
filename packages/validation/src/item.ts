import * as z from "zod";
import { feedIdSchema } from "./feed";

// * Fields

export const itemIdSchema = z.uuid({
	error: "Invalid item id.",
});

export const itemFeedIdSchema = feedIdSchema;

export const itemTitleSchema = z
	.string({
		error: "Title must be a string.",
	})
	.trim()
	.min(1, {
		error: "Title cannot be empty.",
	})
	.max(500, {
		error: "Title must be 500 characters or fewer.",
	});

export const itemUrlSchema = z.url({
	error: "Invalid item url.",
});

export const itemContentRawSchema = z.string().nullable();

export const itemContentCleanSchema = z.string().nullable();

export const itemPublishedAtSchema = z.coerce.date().nullable();

export const itemFetchedAtSchema = z.coerce.date();

export const itemIsReadSchema = z.boolean();

export const itemIsFavoriteSchema = z.boolean();

// * Objects

export const selectItemSchema = z.object({
	id: itemIdSchema,
	feedId: itemFeedIdSchema,
	title: itemTitleSchema,
	url: itemUrlSchema,
	contentRaw: itemContentRawSchema,
	contentClean: itemContentCleanSchema,
	publishedAt: itemPublishedAtSchema,
	fetchedAt: itemFetchedAtSchema,
	isRead: itemIsReadSchema,
	isFavorite: itemIsFavoriteSchema,
});

export const listItemSchema = z.object({
	feedId: itemFeedIdSchema.optional(),
	onlyUnread: z.boolean().default(false),
});

export const markReadItemSchema = z.object({
	id: itemIdSchema,
	isRead: itemIsReadSchema,
});

export const toggleFavoriteItemSchema = z.object({
	id: itemIdSchema,
	isFavorite: itemIsFavoriteSchema,
});

// * Types

export type SelectItem = z.infer<typeof selectItemSchema>;
export type ListItemInput = z.infer<typeof listItemSchema>;
export type MarkReadItemInput = z.infer<typeof markReadItemSchema>;
export type ToggleFavoriteItemInput = z.infer<typeof toggleFavoriteItemSchema>;
