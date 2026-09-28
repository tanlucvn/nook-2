import type { SelectItem } from "@nook/validation";
import { compareDesc, isSameDay, isSameWeek, startOfDay, startOfWeek, subDays } from "date-fns";

export type GroupKey = "today" | "yesterday" | "this_week" | "last_week" | "older";

export type Group = {
	key: GroupKey;
	label: string;
	items: SelectItem[];
};

const GROUP_META: Record<GroupKey, { label: string; order: number }> = {
	today: {
		label: "Today",
		order: 0,
	},
	yesterday: {
		label: "Yesterday",
		order: 1,
	},
	this_week: {
		label: "This week",
		order: 2,
	},
	last_week: {
		label: "Last week",
		order: 3,
	},
	older: {
		label: "Older",
		order: 4,
	},
};

export function groupItemsByDate(items: SelectItem[], now = new Date()): Group[] {
	const today = startOfDay(now);
	const yesterday = subDays(today, 1);

	const thisWeek = startOfWeek(now, {
		weekStartsOn: 1,
	});

	const lastWeek = subDays(thisWeek, 7);

	const groups: Record<GroupKey, SelectItem[]> = {
		today: [],
		yesterday: [],
		this_week: [],
		last_week: [],
		older: [],
	};

	for (const item of items) {
		const date = new Date(item.publishedAt);

		if (isSameDay(date, today)) {
			groups.today.push(item);
		} else if (isSameDay(date, yesterday)) {
			groups.yesterday.push(item);
		} else if (
			isSameWeek(date, now, {
				weekStartsOn: 1,
			})
		) {
			groups.this_week.push(item);
		} else if (
			isSameWeek(date, lastWeek, {
				weekStartsOn: 1,
			})
		) {
			groups.last_week.push(item);
		} else {
			groups.older.push(item);
		}
	}

	return (Object.keys(groups) as GroupKey[])
		.map((key) => ({
			key,
			label: GROUP_META[key].label,
			items: groups[key].sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))),
		}))
		.filter((group) => group.items.length > 0);
}
