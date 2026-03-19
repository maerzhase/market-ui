"use client";

import { cn } from "@m3000/market";
import Link from "next/link";
import type { ReactNode } from "react";

interface ComponentShowcaseProps {
  name: string;
  description: string;
  href: string;
  children: ReactNode;
  variant?: "default" | "large";
  className?: string;
}

export function ComponentShowcase({
  name,
  description,
  href,
  children,
  variant = "default",
  className,
}: ComponentShowcaseProps) {
  const isLarge = variant === "large";

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isLarge && "col-span-2",
        className,
      )}
    >
      {/* Demo Area - non-selectable, non-interactive */}
      <div
        role="presentation"
        className={cn(
          "pointer-events-none flex select-none items-center justify-center bg-muted/30 p-4",
          isLarge ? "min-h-32" : "min-h-24",
        )}
      >
        <div className="w-full max-w-xs">{children}</div>
      </div>

      {/* Content */}
      <div className="border-t border-border bg-background p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
