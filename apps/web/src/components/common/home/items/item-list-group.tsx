import type { Group } from "@/lib/group-items-by-date";
import { ItemRow } from "./item-row";

interface ItemGroupProps {
	group: Group;
}

export function ItemListGroup({ group }: ItemGroupProps) {
	return (
		<div className="flex flex-col gap-2 px-2">
			<h3 className="cursor-default px-2.5 text-muted-foreground text-sm">{group.label}</h3>
			<div className="flex flex-col gap-1 pb-4">
				{group.items.map((item) => (
					<ItemRow key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}
