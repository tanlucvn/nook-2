import type React from "react";
import { HomeStatusSwitcher } from "@/components/common/home/home-status-switcher";
import { NewFeedButton } from "@/components/common/home/new-feed-button";
import { AppHeader } from "@/components/layouts/app-header";

export function HomeHeader({ ...props }: React.ComponentProps<typeof AppHeader>) {
	return (
		<AppHeader {...props}>
			<HomeStatusSwitcher />

			<div className="ml-auto flex items-center text-muted-foreground">
				<NewFeedButton />
			</div>
		</AppHeader>
	);
}
