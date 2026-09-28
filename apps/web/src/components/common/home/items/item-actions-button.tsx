import { Button } from "@nook/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@nook/ui/components/dropdown-menu";
import type { SelectItem } from "@nook/validation";
import { DotsHorizontal, Trash04 } from "@untitledui/icons";
import type React from "react";

interface ItemActionsButtonProps {
	item: SelectItem;
}

export function ItemActionsButton({ item, ...props }: ItemActionsButtonProps & React.ComponentProps<typeof Button>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost-action" size="icon-sm" {...props}>
						<DotsHorizontal />
					</Button>
				}
			/>
			<DropdownMenuContent align="end" className="min-w-50">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Trash04 />
						<span>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
