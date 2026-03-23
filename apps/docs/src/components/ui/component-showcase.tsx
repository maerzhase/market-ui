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
  disabled?: boolean;
  badgeLabel?: string;
  allowDemoPointerEvents?: boolean;
}

export function ComponentShowcase({
  name,
  description,
  href,
  children,
  variant = "default",
  className,
  disabled = false,
  badgeLabel,
  allowDemoPointerEvents = false,
}: ComponentShowcaseProps) {
  const isLarge = variant === "large";
  const statusLabel = badgeLabel ?? "Soon";
  const rootClassName = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all",
    isLarge && "col-span-2",
    disabled
      ? "cursor-default border-border/80 bg-card/80 shadow-sm"
      : "hover:border-primary/50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    className,
  );

  const content = (
    <>
      {/* Demo Area - non-selectable by default */}
      <div
        role="presentation"
        className={cn(
          "flex flex-1 select-none items-center justify-center bg-muted/30 p-4",
          !allowDemoPointerEvents && "pointer-events-none",
          isLarge ? "min-h-32" : "min-h-24",
        )}
      >
        <div
          className={cn(
            "flex h-full w-full items-center justify-center",
            isLarge ? "max-w-4xl" : "max-w-xs",
          )}
        >
          {children}
        </div>
      </div>

      {/* Content */}
      <div className="border-t border-border bg-background p-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{name}</h3>
              {disabled && (
                <span className="rounded-full border border-amber-300/60 bg-amber-100/70 px-2 py-0.5 text-[0.66rem] font-semibold tracking-[0.12em] text-amber-800 uppercase">
                  {statusLabel}
                </span>
              )}
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  if (disabled) {
    return (
      <article
        aria-disabled="true"
        data-disabled="true"
        className={rootClassName}
      >
        {content}
      </article>
    );
  }

  return (
    <Link href={href} className={rootClassName}>
      {content}
    </Link>
  );
}
