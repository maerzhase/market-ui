"use client";

import { cn } from "@m3000/market";
import {
	AnchorProvider,
	ScrollProvider,
	TOCItem,
	type TableOfContents,
} from "fumadocs-core/toc";
import { useRef } from "react";

export function DocsTableOfContents({ toc }: { toc: TableOfContents }) {
	const containerRef = useRef<HTMLDivElement>(null);

	if (!toc.length) {
		return null;
	}

	return (
		<aside className="hidden xl:block">
			<div className="sticky top-20 rounded-2xl border border-border bg-card p-4">
				<div className="mb-3 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
					On this page
				</div>
				<AnchorProvider toc={toc}>
					<ScrollProvider containerRef={containerRef}>
						<div ref={containerRef} className="max-h-[calc(100vh-8rem)] space-y-1 overflow-y-auto">
							{toc.map((item) => (
								<TOCItem
									key={item.url}
									href={item.url}
									className={cn(
										"block rounded-lg px-3 py-2 text-sm leading-5 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary",
									)}
									style={{
										paddingLeft: `${(item.depth - 2) * 0.8 + 0.75}rem`,
									}}
								>
									{item.title}
								</TOCItem>
							))}
						</div>
					</ScrollProvider>
				</AnchorProvider>
			</div>
		</aside>
	);
}
