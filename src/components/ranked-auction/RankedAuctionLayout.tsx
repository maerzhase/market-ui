"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib";

export interface RankedAuctionLayoutProps {
  children: ReactNode;
  className?: string;
  height?: string | number;
}

export function RankedAuctionLayout({
  children,
  className,
  height = "calc(100vh - 4rem)",
}: RankedAuctionLayoutProps): React.ReactElement {
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn("grid overflow-hidden", "lg:grid-cols-2", className)}
      style={{ height: heightStyle }}
    >
      {children}
    </div>
  );
}

export interface RankedAuctionDetailsProps {
  children: ReactNode;
  className?: string;
}

export function RankedAuctionDetails({
  children,
  className,
}: RankedAuctionDetailsProps): React.ReactElement {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden",
        "border-border",
        "lg:border-r",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface RankedAuctionDetailsHeaderProps {
  children: ReactNode;
  className?: string;
}

export function RankedAuctionDetailsHeader({
  children,
  className,
}: RankedAuctionDetailsHeaderProps): React.ReactElement {
  return (
    <div className={cn("shrink-0 border-b border-border p-6", className)}>
      {children}
    </div>
  );
}

export interface RankedAuctionDetailsBodyProps {
  children: ReactNode;
  className?: string;
}

export function RankedAuctionDetailsBody({
  children,
  className,
}: RankedAuctionDetailsBodyProps): React.ReactElement {
  return (
    <div className={cn("min-h-0 flex-1 overflow-y-auto p-6", className)}>
      {children}
    </div>
  );
}

export interface RankedAuctionDetailsFooterProps {
  children: ReactNode;
  className?: string;
}

export function RankedAuctionDetailsFooter({
  children,
  className,
}: RankedAuctionDetailsFooterProps): React.ReactElement {
  return (
    <div className={cn("shrink-0 border-t border-border p-6", className)}>
      {children}
    </div>
  );
}

export interface RankedAuctionRankingsContainerProps {
  children: ReactNode;
  className?: string;
}

export function RankedAuctionRankingsContainer({
  children,
  className,
}: RankedAuctionRankingsContainerProps): React.ReactElement {
  return (
    <div
      className={cn("flex h-full min-h-0 flex-col overflow-hidden", className)}
    >
      {children}
    </div>
  );
}
