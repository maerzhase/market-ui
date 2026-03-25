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
			<div className="sticky top-20 rounded-2xl border border-border bg-card p-3">
				<div className="mb-2 text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
					On this page
				</div>
				<AnchorProvider toc={toc}>
					<ScrollProvider containerRef={containerRef}>
						<div
							ref={containerRef}
							className="max-h-[calc(100vh-8rem)] overflow-y-auto"
						>
							{toc.map((item) => (
								<TOCItem
									key={item.url}
									href={item.url}
									className={cn(
										"block border-l border-transparent py-[0.1875rem] text-[0.78rem] leading-[1.1rem] text-muted-foreground transition-colors hover:border-border hover:text-foreground data-[active=true]:border-primary data-[active=true]:font-medium data-[active=true]:text-foreground",
									)}
									style={{
										paddingLeft: `${(item.depth - 2) * 0.6 + 0.7}rem`,
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
