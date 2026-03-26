"use client";

import { Button, Drawer, cn } from "@m3000/market";
import type { Root } from "fumadocs-core/page-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconExternalLink, IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { siteLinks, siteTitle, siteVersion } from "@/app/layout.config";
import { DocsSidebarContent } from "@/components/layout/docs-sidebar";
import { HeaderSearch } from "@/components/layout/header-search";
import { ThemeToggle } from "@/components/layout/theme-toggle";

type HeaderVariant = "site" | "docs";

interface HeaderProps {
  variant?: HeaderVariant;
  docsTree?: Root;
}

function HeaderNavLinks({
  variant,
  className,
  onLinkClick,
}: {
  variant: HeaderVariant;
  className?: string;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {siteLinks.map((link) => {
        const isActive = !link.external && pathname?.startsWith(link.href);

        if (link.external) {
          return (
            <Button
              key={link.href}
              color="ghost"
              size="sm"
              nativeButton={false}
              className={cn(
                variant === "docs" &&
                  "text-muted-foreground hover:text-foreground",
              )}
              render={
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onLinkClick}
                />
              }
            >
              {link.label}
              <IconExternalLink className="size-3.5" aria-hidden />
            </Button>
          );
        }

        return (
          <Button
            key={link.href}
            color="ghost"
            size="sm"
            nativeButton={false}
            active={isActive}
            className={cn(
              variant === "docs" &&
                "text-muted-foreground hover:text-foreground",
            )}
            render={<Link href={link.href} onClick={onLinkClick} />}
          >
            {link.label}
          </Button>
        );
      })}
    </nav>
  );
}

function MobileHeaderMenu({ docsTree }: { docsTree?: Root }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuLinkClassName =
    "block rounded-lg px-3 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground";
  const groupTitleClassName = "px-3 text-xs font-medium text-foreground";

  return (
    <div className="lg:hidden">
      <Drawer
        open={open}
        onOpenChange={(nextOpen) => setOpen(nextOpen)}
        popupAriaLabel="Navigation menu"
        title="Navigation menu"
        description="Browse site links and documentation pages"
        trigger={
          <Button
            type="button"
            color="tertiary"
            size="sm"
            aria-label={open ? "Close menu" : "Open menu"}
            title={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <IconX className="size-4" aria-hidden />
            ) : (
              <IconMenu2 className="size-4" aria-hidden />
            )}
          </Button>
        }
        backdropClassName="bg-background/70"
        panelClassName="max-w-[25rem]"
      >
        <div className="relative flex h-full flex-col">
          <Button
            type="button"
            color="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute top-4 right-4 z-10"
          >
            <IconX className="size-4" aria-hidden />
          </Button>

          <div className="flex-1 space-y-8 overflow-y-auto px-4 py-5 pt-14">
            <section className="space-y-2">
              <p className={groupTitleClassName}>Menu</p>
              <nav className="space-y-1">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={cn(
                    menuLinkClassName,
                    pathname === "/" &&
                      "bg-primary/10 font-medium text-primary",
                  )}
                >
                  Home
                </Link>
                {siteLinks.map((link) => {
                  const isActive =
                    !link.external && pathname?.startsWith(link.href);

                  if (link.external) {
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className={cn(
                          menuLinkClassName,
                          "flex items-center justify-between gap-2",
                        )}
                      >
                        <span>{link.label}</span>
                        <IconExternalLink className="size-3.5" aria-hidden />
                      </a>
                    );
                  }

                  if (link.href === "/docs") {
                    return null;
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        menuLinkClassName,
                        isActive && "bg-primary/10 font-medium text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </section>

            {docsTree ? (
              <section className="space-y-1">
                <Link
                  href="/docs"
                  onClick={() => setOpen(false)}
                  className={cn(
                    menuLinkClassName,
                    pathname === "/docs" &&
                      "bg-primary/10 font-medium text-primary",
                  )}
                >
                  Getting started
                </Link>
                <DocsSidebarContent
                  tree={docsTree}
                  variant="drawer"
                  onLinkClick={() => setOpen(false)}
                />
              </section>
            ) : null}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export function Header({ variant = "site", docsTree }: HeaderProps) {
  const containerClassName =
    variant === "docs"
      ? "sticky top-0 z-40 h-14 w-full shrink-0 border-b border-border bg-background/95 sm:bg-background/80 sm:backdrop-blur-sm"
      : "sticky top-0 z-50 h-14 w-full shrink-0 border-b border-border bg-background/95 sm:bg-background/80 sm:backdrop-blur-sm";
  const innerClassName =
    variant === "docs"
      ? "flex h-full w-full min-w-0 items-center justify-between gap-3 px-4 md:px-6"
      : "mx-auto flex h-full max-w-[97rem] min-w-0 items-center justify-between gap-3 px-4 md:px-6";

  return (
    <header className={containerClassName}>
      <span className={innerClassName}>
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 overflow-hidden"
        >
          <span className="truncate font-semibold">{siteTitle}</span>
          <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary min-[375px]:inline-flex">
            {siteVersion}
          </span>
        </Link>

        <span className="flex shrink-0 items-center gap-2">
          <HeaderSearch variant={variant} />
          <ThemeToggle />
          <HeaderNavLinks
            variant={variant}
            className="hidden items-center gap-2 lg:flex"
          />
          <MobileHeaderMenu docsTree={docsTree} />
        </span>
      </span>
    </header>
  );
}
