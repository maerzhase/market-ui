"use client";

import type { ReactNode } from "react";
import type {
  AuctionData,
  AuctionFormatters,
  AuctionUserBid,
  RankableBid,
} from "@/types";
import { AuctionProvider } from "./AuctionContext";

export interface AuctionProps {
  auction: AuctionData;
  bids: RankableBid[];
  userBids: AuctionUserBid[];
  onPlaceBid: (price: bigint, quantity: bigint) => Promise<boolean>;
  onTopUpBid: (
    bidId: bigint,
    newPrice: bigint,
    additionalValue: bigint,
  ) => Promise<boolean>;
  onClaimEdition?: (bidId: string) => Promise<boolean>;
  formatters?: AuctionFormatters;
  children: ReactNode;
  className?: string;
}

/**
 * Root component for an auction interface.
 * Provides context and orchestrates the layout of child components.
 *
 * @example
 * ```tsx
 * <Auction
 *   auction={auctionData}
 *   bids={bids}
 *   userBids={myBids}
 *   onPlaceBid={async (price, qty) => { /* wagmi call *\/ }}
 *   onTopUpBid={async (bidId, newPrice, value) => { /* wagmi call *\/ }}
 * >
 *   <AuctionInfo />
 *   <AuctionBidInput />
 *   <AuctionRankings />
 *   <AuctionYourBids />
 * </Auction>
 * ```
 */
export function Auction({
  auction,
  bids,
  userBids,
  onPlaceBid,
  onTopUpBid,
  onClaimEdition,
  formatters,
  children,
  className,
}: AuctionProps): React.ReactElement {
  return (
    <AuctionProvider
      auction={auction}
      bids={bids}
      userBids={userBids}
      onPlaceBid={onPlaceBid}
      onTopUpBid={onTopUpBid}
      onClaimEdition={onClaimEdition}
      formatters={formatters}
    >
      <div className={className}>{children}</div>
    </AuctionProvider>
  );
}

export { useAuctionContext } from "./AuctionContext";
