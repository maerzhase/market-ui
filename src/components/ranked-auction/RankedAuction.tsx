"use client"

import type { ReactNode } from "react"
import type {
  RankableBid,
  RankedAuctionData,
  RankedAuctionFormatters,
  RankedAuctionUserBid,
} from "@/types"
import { RankedAuctionProvider } from "./RankedAuctionContext"

export interface RankedAuctionProps {
  auction: RankedAuctionData
  bids: RankableBid[]
  userBids: RankedAuctionUserBid[]
  onPlaceBid: (price: bigint, quantity: bigint) => Promise<boolean>
  onTopUpBid: (
    bidId: bigint,
    newPrice: bigint,
    additionalValue: bigint
  ) => Promise<boolean>
  onClaimEdition?: (bidId: string) => Promise<boolean>
  formatters?: RankedAuctionFormatters
  children: ReactNode
  className?: string
}

/**
 * Root component for a ranked auction interface.
 * Provides context and orchestrates the layout of child components.
 *
 * @example
 * ```tsx
 * <RankedAuction
 *   auction={auctionData}
 *   bids={bids}
 *   userBids={myBids}
 *   onPlaceBid={async (price, qty) => { /* wagmi call *\/ }}
 *   onTopUpBid={async (bidId, newPrice, value) => { /* wagmi call *\/ }}
 * >
 *   <RankedAuctionInfo />
 *   <RankedAuctionBidInput />
 *   <RankedAuctionRankings />
 *   <RankedAuctionYourBids />
 * </RankedAuction>
 * ```
 */
export function RankedAuction({
  auction,
  bids,
  userBids,
  onPlaceBid,
  onTopUpBid,
  onClaimEdition,
  formatters,
  children,
  className,
}: RankedAuctionProps): React.ReactElement {
  return (
    <RankedAuctionProvider
      auction={auction}
      bids={bids}
      userBids={userBids}
      onPlaceBid={onPlaceBid}
      onTopUpBid={onTopUpBid}
      onClaimEdition={onClaimEdition}
      formatters={formatters}
    >
      <div className={className}>{children}</div>
    </RankedAuctionProvider>
  )
}

export { useRankedAuctionContext } from "./RankedAuctionContext"
