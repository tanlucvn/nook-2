import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@nook/ui/components/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@nook/ui/components/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@nook/ui/components/sidebar";
import { ChevronRight, DotsHorizontal, Hash01, Trash03 } from "@untitledui/icons";
import { SAMPLE_TAGS } from "@/lib/seeds";

export function NavTags() {
	const { isMobile } = useSidebar();

	return (
		<Collapsible defaultOpen className="group/collapsible">
			<SidebarGroup className="py-0 group-data-[collapsible=icon]:hidden">
				<SidebarGroupLabel
					className="hover:bg-muted hover:text-foreground"
					render={
						<CollapsibleTrigger>
							<span>Tags</span>
							<ChevronRight className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
						</CollapsibleTrigger>
					}
				/>

				<CollapsibleContent className="pb-2">
					<SidebarGroupContent>
						<SidebarMenu>
							{SAMPLE_TAGS.map((t) => (
								<SidebarMenuItem key={t.id}>
									<SidebarMenuButton>
										<Hash01 />
										<span>{t.name}</span>
									</SidebarMenuButton>
									<DropdownMenu>
										<DropdownMenuTrigger
											render={
												<SidebarMenuAction showOnHover>
													<DotsHorizontal />
													<span className="sr-only">More</span>
												</SidebarMenuAction>
											}
										/>
										<DropdownMenuContent
											className="w-56 rounded-lg"
											side={isMobile ? "bottom" : "right"}
											align={isMobile ? "end" : "start"}
										>
											<DropdownMenuItem>
												<Trash03 className="text-muted-foreground" />
												<span>Delete</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
