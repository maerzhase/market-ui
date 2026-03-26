"use client";

import { Text, cn } from "@m3000/market";
import type { Node, Root } from "fumadocs-core/page-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEventHandler } from "react";

const groupTitleClassName = "px-3 text-xs font-medium text-foreground";

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

  return node.children.some((child) =>
    nodeContainsCurrentPath(child, pathname),
  );
}

function shouldRenderNode(
  node: Node,
  depth: number,
  variant: "sidebar" | "drawer",
): boolean {
  if (
    variant === "drawer" &&
    node.type === "page" &&
    depth === 0 &&
    node.url === "/docs"
  ) {
    return false;
  }

  return true;
}

function SidebarNode({
  node,
  pathname,
  depth,
  onLinkClick,
  variant,
}: {
  node: Node;
  pathname: string;
  depth: number;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
  variant?: "sidebar" | "drawer";
}) {
  if (node.type === "separator") {
    return (
      <div className={cn(variant === "drawer" ? "pt-6 pb-2" : "pt-4 pb-2")}>
        <Text size="1" className={groupTitleClassName}>
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
        onClick={onLinkClick}
        className={cn(
          "block text-sm transition-colors",
          variant === "drawer"
            ? "rounded-lg px-3 py-2.5"
            : "rounded-xl px-3 py-2",
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
        className={cn(
          "cursor-pointer list-none text-sm font-medium text-foreground marker:hidden hover:bg-accent/40",
          variant === "drawer"
            ? "rounded-lg px-3 py-2.5"
            : "rounded-xl px-3 py-2",
        )}
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
          <SidebarNode
            node={node.index}
            pathname={pathname}
            depth={depth + 1}
            onLinkClick={onLinkClick}
            variant={variant}
          />
        ) : null}
        {node.children
          .filter((child) =>
            shouldRenderNode(child, depth + 1, variant ?? "sidebar"),
          )
          .map((child, index) => (
            <SidebarNode
              key={nodeKey(child, index)}
              node={child}
              pathname={pathname}
              depth={depth + 1}
              onLinkClick={onLinkClick}
              variant={variant}
            />
          ))}
      </div>
    </details>
  );
}

export function DocsSidebarContent({
  tree,
  onLinkClick,
  variant = "sidebar",
}: {
  tree: Root;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
  variant?: "sidebar" | "drawer";
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {tree.children
        .filter((node) => shouldRenderNode(node, 0, variant))
        .map((node, index) => (
          <SidebarNode
            key={nodeKey(node, index)}
            node={node}
            pathname={pathname}
            depth={0}
            onLinkClick={onLinkClick}
            variant={variant}
          />
        ))}
    </div>
  );
}

export function DocsSidebar({ tree }: { tree: Root }) {
  return (
    <nav
      className="rounded-2xl border border-border bg-card p-3"
      aria-label="Docs sidebar"
    >
      <DocsSidebarContent tree={tree} />
    </nav>
  );
}
