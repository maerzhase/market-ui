"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/primitives";
import { cn } from "@/lib";
import { useRankedAuctionContext } from "./RankedAuctionContext";

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
    <div className={cn("flex grow flex-col p-6", className)}>{children}</div>
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
    <div
      className={cn("mt-auto shrink-0 border-t border-border p-6", className)}
    >
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
      className={cn("flex h-full min-h-0 flex-col justify-between", className)}
    >
      {children}
    </div>
  );
}

// ----- Bidding Panel Components -----

export interface RankedAuctionBiddingPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container that shows the "Start Bidding" button or the bidding form
 * based on the isBiddingActive state.
 */
export function RankedAuctionBiddingPanel({
  children,
  className,
}: RankedAuctionBiddingPanelProps): React.ReactElement {
  const { isBiddingActive, startBidding, isAuctionEnded, setShowBidPreview } =
    useRankedAuctionContext();

  const handleStartBidding = () => {
    startBidding();
    setShowBidPreview(true);
  };

  return (
    <div
      className={cn(
        "shrink-0 border-t border-border bg-background p-6",
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
