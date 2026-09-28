import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "@nook/ui/components/item";
import { cn } from "@nook/ui/lib/utils";
import type { SelectItem } from "@nook/validation";
import { ItemActionsButton } from "./item-actions-button";

export function ItemRow({ item }: { item: SelectItem }) {
	return (
		<Item
			size="xs"
			className={cn(
				"cursor-default rounded-lg py-1 pr-1 ring-1 ring-transparent transition-none hover:bg-muted hover:ring-foreground/10",
				item.isRead && "opacity-70",
			)}
		>
			<ItemMedia>
				<span className="size-2.5 rounded-full bg-green-500" />
			</ItemMedia>
			<ItemContent className="min-w-0">
				<ItemTitle className="line-clamp-1">{item.title}</ItemTitle>
			</ItemContent>
			<ItemActions>
				<ItemActionsButton item={item} />
			</ItemActions>
		</Item>
	);
}
