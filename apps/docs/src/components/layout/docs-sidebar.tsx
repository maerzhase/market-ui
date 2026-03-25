"use client";

import { Text, cn } from "@m3000/market";
import type { Node, Root } from "fumadocs-core/page-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function nodeKey(node: Node, index: number): string {
	if ("url" in node) return node.url;
	return node.$id ?? `${node.type}-${index}`;
}

function nodeContainsCurrentPath(node: Node, pathname: string): boolean {
	if (node.type === "page") {
		return pathname === node.url || pathname.startsWith(`${node.url}/`);
	}

	if (node.type === "separator") {
		return false;
	}

	if (node.index && nodeContainsCurrentPath(node.index, pathname)) {
		return true;
	}

	return node.children.some((child) => nodeContainsCurrentPath(child, pathname));
}

function SidebarNode({
	node,
	pathname,
	depth,
}: {
	node: Node;
	pathname: string;
	depth: number;
}) {
	if (node.type === "separator") {
		return (
			<div className="pt-4 pb-2">
				<Text size="1" className="px-3 text-muted-foreground uppercase tracking-[0.16em]">
					{node.name}
				</Text>
			</div>
		);
	}

	if (node.type === "page") {
		const isActive = pathname === node.url;
		return (
			<Link
				href={node.url}
				className={cn(
					"block rounded-xl px-3 py-2 text-sm transition-colors",
					isActive
						? "bg-primary/10 font-medium text-primary"
						: "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
				)}
				style={{ paddingLeft: `${depth * 0.75 + 0.75}rem` }}
			>
				{node.name}
			</Link>
		);
	}

	const isOpen = node.defaultOpen ?? nodeContainsCurrentPath(node, pathname);

	return (
		<details open={isOpen} className="group">
			<summary
				className="cursor-pointer list-none rounded-xl px-3 py-2 text-sm font-medium text-foreground marker:hidden hover:bg-accent/40"
				style={{ paddingLeft: `${depth * 0.75 + 0.75}rem` }}
			>
				<div className="flex items-center justify-between gap-2">
					<span>{node.name}</span>
					<span className="text-xs text-muted-foreground transition-transform group-open:rotate-90">
						›
					</span>
				</div>
			</summary>
			<div className="mt-1 space-y-1">
				{node.index ? (
					<SidebarNode node={node.index} pathname={pathname} depth={depth + 1} />
				) : null}
				{node.children.map((child, index) => (
					<SidebarNode
						key={nodeKey(child, index)}
						node={child}
						pathname={pathname}
						depth={depth + 1}
					/>
				))}
			</div>
		</details>
	);
}

export function DocsSidebar({
	tree,
	mobile = false,
}: {
	tree: Root;
	mobile?: boolean;
}) {
	const pathname = usePathname();
	const content: ReactNode = (
		<div className="space-y-1">
			{tree.children.map((node, index) => (
				<SidebarNode
					key={nodeKey(node, index)}
					node={node}
					pathname={pathname}
					depth={0}
				/>
			))}
		</div>
	);

	if (mobile) {
		return (
			<details className="rounded-2xl border border-border bg-card">
				<summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-foreground marker:hidden">
					Browse documentation
				</summary>
				<div className="border-t border-border p-3">{content}</div>
			</details>
		);
	}

	return (
		<nav className="rounded-2xl border border-border bg-card p-3" aria-label="Docs sidebar">
			{content}
		</nav>
	);
}
