import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@nook/ui/components/sidebar";
import type React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { NavFeeds } from "./nav-feeds";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavTags } from "./nav-tags";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<NavMain />
			</SidebarHeader>

			<SidebarContent>
				<NavFeeds />
				<NavTags />
			</SidebarContent>

			<SidebarFooter>
				<ModeToggle />
				<NavSecondary />
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
