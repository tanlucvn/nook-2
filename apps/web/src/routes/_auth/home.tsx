import { Button } from "@nook/ui/components/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@nook/ui/components/resizable";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import z from "zod";
import { ItemList } from "@/components/common/home/items/item-list";
import { HomeHeader } from "@/components/layouts/headers/home";
import { useItems } from "@/hooks/use-items";

const homeSearchSchema = z.object({
	feedId: z.uuid().optional(),
});

export const Route = createFileRoute("/_auth/home")({
	validateSearch: homeSearchSchema,
	errorComponent: ({ error }) => {
		const router = useRouter();
		return (
			<div className="error">
				<h2>Invalid Search Parameters</h2>
				<p>{error instanceof Error ? error.message : String(error)}</p>
				<Button onClick={() => router.navigate({ to: "/home", search: {} })}>Back to home</Button>
			</div>
		);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { feedId } = Route.useSearch();
	const { data: items = [], isLoading } = useItems({
		feedId,
		onlyUnread: true,
	});

	return (
		<ResizablePanelGroup orientation="horizontal">
			<ResizablePanel minSize="30%">
				<div className="flex h-dvh flex-1 flex-col">
					<HomeHeader />
					<main className="flex flex-1 flex-col overflow-y-auto">
						<div className="flex flex-1 flex-col py-4">
							<ItemList items={items} isLoading={isLoading} />
						</div>
					</main>
				</div>
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel minSize="55%">Two</ResizablePanel>
		</ResizablePanelGroup>
	);
}
