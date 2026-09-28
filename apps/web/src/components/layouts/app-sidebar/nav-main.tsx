import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@nook/ui/components/sidebar";
import { Home05, SearchMd } from "@untitledui/icons";
import type React from "react";

export function NavMain({ ...props }: React.ComponentProps<typeof SidebarMenu>) {
	return (
		<SidebarMenu {...props}>
			<SidebarMenuItem>
				<SidebarMenuButton>
					<SearchMd />
					<span>Search</span>
				</SidebarMenuButton>
			</SidebarMenuItem>

			<SidebarMenuItem>
				<SidebarMenuButton>
					<Home05 />
					<span>Home</span>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
