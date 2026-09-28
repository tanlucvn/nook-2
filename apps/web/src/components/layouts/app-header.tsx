import { cn } from "@nook/ui/lib/utils";
import type React from "react";

export function AppHeader({ className, ...props }: React.ComponentProps<"header">) {
	return <header className={cn("flex h-(--header-height) items-center gap-2 border-b p-2", className)} {...props} />;
}
