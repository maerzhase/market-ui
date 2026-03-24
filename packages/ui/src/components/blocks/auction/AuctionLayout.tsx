"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/primitives";
import { cn } from "@/lib";
import { useAuctionContext } from "./AuctionContext";

export interface AuctionLayoutProps {
  children: ReactNode;
  className?: string;
  height?: string | number;
}

export function AuctionLayout({
  children,
  className,
  height = "calc(100vh - 4rem)",
}: AuctionLayoutProps): React.ReactElement {
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

export interface AuctionDetailsProps {
  children: ReactNode;
  className?: string;
}

export function AuctionDetails({
  children,
  className,
}: AuctionDetailsProps): React.ReactElement {
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

export interface AuctionDetailsHeaderProps {
  children: ReactNode;
  className?: string;
}

export function AuctionDetailsHeader({
  children,
  className,
}: AuctionDetailsHeaderProps): React.ReactElement {
  return (
    <div className={cn("flex grow flex-col p-6", className)}>{children}</div>
  );
}

export interface AuctionDetailsBodyProps {
  children: ReactNode;
  className?: string;
}

export function AuctionDetailsBody({
  children,
  className,
}: AuctionDetailsBodyProps): React.ReactElement {
  return (
    <div className={cn("min-h-0 flex-1 overflow-y-auto p-6", className)}>
      {children}
    </div>
  );
}

export interface AuctionDetailsFooterProps {
  children: ReactNode;
  className?: string;
}

export function AuctionDetailsFooter({
  children,
  className,
}: AuctionDetailsFooterProps): React.ReactElement {
  return (
    <div
      className={cn("mt-auto shrink-0 border-t border-border p-6", className)}
    >
      {children}
    </div>
  );
}

export interface AuctionRankingsContainerProps {
  children: ReactNode;
  className?: string;
}

export function AuctionRankingsContainer({
  children,
  className,
}: AuctionRankingsContainerProps): React.ReactElement {
  return (
    <div
      className={cn("flex h-full min-h-0 flex-col justify-between", className)}
    >
      {children}
    </div>
  );
}

export interface AuctionBiddingPanelProps {
  children: ReactNode;
  className?: string;
}

export function AuctionBiddingPanel({
  children,
  className,
}: AuctionBiddingPanelProps): React.ReactElement {
  const { isBiddingActive, startBidding, isAuctionEnded, setShowBidPreview } =
    useAuctionContext();

  const handleStartBidding = () => {
    startBidding();
    setShowBidPreview(true);
  };

  return (
    <div
      className={cn(
        "shrink-0 border-t border-border bg-background p-6 rounded-xl",
        className,
      )}
    >
      {!isBiddingActive ? (
        <Button
          className="w-full"
          size="lg"
          disabled={isAuctionEnded}
          onClick={handleStartBidding}
        >
          {isAuctionEnded ? "Auction Ended" : "Start Bidding"}
        </Button>
      ) : (
        children
      )}
    </div>
  );
}
