import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@nook/ui/components/sidebar";
import { Settings02 } from "@untitledui/icons";
import type React from "react";

export function NavSecondary({ ...props }: React.ComponentProps<typeof SidebarMenu>) {
	return (
		<SidebarMenu {...props}>
			<SidebarMenuItem>
				<SidebarMenuButton>
					<Settings02 />
					<span>Settings</span>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
