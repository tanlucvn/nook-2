import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@nook/ui/components/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
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
	SidebarMenuSkeleton,
	useSidebar,
} from "@nook/ui/components/sidebar";
import { Spinner } from "@nook/ui/components/spinner";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { BookOpen02, ChevronRight, DotsHorizontal, RefreshCcw01, Trash03 } from "@untitledui/icons";
import { useDeleteFeed, useFeeds, useSyncFeed, useSyncingFeedIds } from "@/hooks/use-feeds";

export function NavFeeds() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isMobile } = useSidebar();
	const { data: feeds = [], isLoading } = useFeeds();

	const { mutate: syncFeed } = useSyncFeed();
	const { mutate: deleteFeed, isPending: isDeleting } = useDeleteFeed();
	const syncingIds = useSyncingFeedIds();

	function handleSelectFeed(id: string) {
		const currentFeedId = location.search.feedId;

		// Nếu feed đang được chọn thì hủy chọn
		if (currentFeedId === id) {
			return navigate({ to: "/home" });
		}

		return navigate({ to: "/home", search: { feedId: id } });
	}

	function handleSyncFeed(id: string) {
		syncFeed({ id });
	}

	function handleDeleteFeed(id: string) {
		deleteFeed({ id });
	}

	return (
		<Collapsible defaultOpen className="group/collapsible">
			<SidebarGroup className="py-0 group-data-[collapsible=icon]:hidden">
				<SidebarGroupLabel
					className="hover:bg-muted hover:text-foreground"
					render={
						<CollapsibleTrigger>
							<span>Feeds</span>
							<ChevronRight className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
						</CollapsibleTrigger>
					}
				/>

				<CollapsibleContent className="pb-2">
					<SidebarGroupContent>
						<SidebarMenu>
							{isLoading
								? Array.from({ length: 5 }).map((_, i) => (
										<SidebarMenuItem key={i}>
											<SidebarMenuSkeleton />
										</SidebarMenuItem>
									))
								: feeds.map((f) => {
										const isSyncingThis = syncingIds.includes(f.id);

										return (
											<SidebarMenuItem key={f.id}>
												<SidebarMenuButton onClick={() => handleSelectFeed(f.id)}>
													{isSyncingThis ? <Spinner /> : <BookOpen02 />}
													<span>{f.title}</span>
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
														<DropdownMenuItem
															disabled={isSyncingThis}
															onClick={() => handleSyncFeed(f.id)}
														>
															<RefreshCcw01 className="text-muted-foreground" />
															<span>Sync</span>
														</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem
															variant="destructive"
															disabled={isDeleting}
															onClick={() => handleDeleteFeed(f.id)}
														>
															<Trash03 className="text-muted-foreground" />
															<span>Delete</span>
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</SidebarMenuItem>
										);
									})}
						</SidebarMenu>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
