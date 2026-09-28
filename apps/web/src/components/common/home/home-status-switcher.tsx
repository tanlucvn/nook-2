import { Button } from "@nook/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@nook/ui/components/dropdown-menu";
import { Archive, ChevronDown, Inbox01, Trash03 } from "@untitledui/icons";
import type React from "react";

const HOME_VIEW_OPTIONS: {
	value: "inbox" | "archives" | "trash";
	label: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
	{ value: "inbox", label: "Inbox", icon: Inbox01 },
	{ value: "archives", label: "Archives", icon: Archive },
	{ value: "trash", label: "Trash", icon: Trash03 },
];

export function HomeStatusSwitcher({ ...props }: React.ComponentProps<typeof Button>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="sm" {...props}>
						<span>Inbox</span>
						<ChevronDown data-icon="inline-end" className="opacity-50" />
					</Button>
				}
			/>
			<DropdownMenuContent align="start" className="min-w-44">
				<DropdownMenuGroup>
					{HOME_VIEW_OPTIONS.map(({ value: v, label, icon: Icon }) => (
						<DropdownMenuItem key={v} className="data-checked:bg-accent">
							<Icon />
							<span>{label}</span>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
