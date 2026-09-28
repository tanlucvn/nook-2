import type { SelectItem } from "@nook/validation";
import { groupItemsByDate } from "@/lib/group-items-by-date";
import { ItemListGroup } from "./item-list-group";

interface ItemListProps {
	items: SelectItem[];
	isLoading: boolean;
}

export function ItemList({ items, isLoading }: ItemListProps) {
	if (isLoading) {
		return <div>loading...</div>;
	}

	const groups = groupItemsByDate(items);

	return (
		<div className="flex w-full flex-col gap-4">
			{groups.map((g) => (
				<ItemListGroup key={g.key} group={g} />
			))}
		</div>
	);
}
