import type { ListItemInput } from "@nook/validation";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";

export function useItems(input: ListItemInput) {
	return useQuery(trpc.item.list.queryOptions(input));
}
