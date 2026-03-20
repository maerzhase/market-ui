"use client";

import { Button, cn } from "@m3000/market";
import { useSearchContext } from "fumadocs-ui/contexts/search";

type HeaderVariant = "site" | "docs";

interface HeaderSearchProps {
	variant?: HeaderVariant;
}

export function HeaderSearch({
	variant = "site",
}: HeaderSearchProps) {
	const { enabled, hotKey, setOpenSearch } = useSearchContext();

	if (!enabled) {
		return null;
	}

	return (
		<Button
			type="button"
			color="ghost"
			size="sm"
			onClick={() => setOpenSearch(true)}
			className={cn(
				"gap-2 border border-border/70 text-muted-foreground hover:text-foreground",
				variant === "docs" ? "bg-transparent" : "bg-background/60",
			)}
			aria-label="Open search"
		>
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="size-4"
			>
				<circle cx="11" cy="11" r="7" />
				<path d="m20 20-3.5-3.5" />
			</svg>
			<span className="sm:hidden">Search</span>
			<span className="hidden sm:inline">Search docs</span>
			<span className="hidden items-center gap-1 md:inline-flex">
				{hotKey.map((key, index) => (
					<kbd
						key={index}
						className="rounded border border-border/70 px-1.5 py-0.5 font-mono text-[11px] uppercase"
					>
						{key.display}
					</kbd>
				))}
			</span>
		</Button>
	);
}
