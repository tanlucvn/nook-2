import { Button } from "@nook/ui/components/button";
import { Plus } from "@untitledui/icons";
import type React from "react";

export function NewFeedButton({ ...props }: React.ComponentProps<typeof Button>) {
	return (
		<Button variant="ghost" size="icon-sm" {...props}>
			<Plus />
		</Button>
	);
}
