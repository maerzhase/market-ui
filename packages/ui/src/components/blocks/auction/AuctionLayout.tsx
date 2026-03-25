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
  const { isBiddingActive } = useAuctionContext();

  return (
    <div
      className={cn(
        "relative grid overflow-hidden grid-rows-[minmax(0,1fr)_minmax(0,1fr)]",
        isBiddingActive && "grid-rows-1",
        "lg:grid-cols-2 lg:grid-rows-1",
        className,
      )}
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
  const { isBiddingActive } = useAuctionContext();

  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 flex-col overflow-hidden",
        "border-border",
        "lg:border-r",
        isBiddingActive && "overflow-hidden",
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
  const { isBiddingActive } = useAuctionContext();

  return (
    <div
      className={cn(
        "flex min-h-0 grow flex-col p-6",
        isBiddingActive &&
        [
          "max-lg:overflow-hidden",
          "max-lg:[&>*:nth-child(n+3):not(:last-child)]:hidden",
          "max-lg:[&>*:last-child]:pointer-events-none",
          "max-lg:[&>*:last-child]:absolute",
          "max-lg:[&>*:last-child]:inset-x-6",
          "max-lg:[&>*:last-child]:bottom-6",
          "max-lg:[&>*:last-child]:top-28",
          "max-lg:[&>*:last-child]:min-h-0",
          "max-lg:[&>*:last-child]:overflow-hidden",
        ].join(" "),
        className,
      )}
    >
      {children}
    </div>
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
    <div
      className={cn(
        "hidden p-6 lg:block lg:min-h-0 lg:flex-1 lg:overflow-y-auto",
        className,
      )}
    >
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
  const { isBiddingActive } = useAuctionContext();

  return (
    <div
      className={cn(
        "grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto]",
        isBiddingActive &&
        "max-lg:absolute max-lg:inset-x-0 max-lg:bottom-0 max-lg:top-0 max-lg:z-20 max-lg:overflow-hidden max-lg:rounded-t-[1.75rem] max-lg:border-t max-lg:border-border max-lg:bg-background/95 max-lg:shadow-2xl max-lg:backdrop-blur-sm",
        className,
      )}
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
  const {
    isBiddingActive,
    startBidding,
    isAuctionEnded,
    setShowBidPreview,
  } = useAuctionContext();

  const handleStartBidding = () => {
    startBidding();
    setShowBidPreview(true);
  };

  return (
    <div
      className={cn(
        "row-start-2 rounded-t-[1.75rem] border-t border-border bg-background p-6 lg:rounded-xl",
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
