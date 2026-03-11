"use client"

import { Button, Text } from "@/components/primitives"
import type { RankedAuctionUserBid } from "@/types"
import { formatDateTime } from "@/utils"

export interface RankedAuctionYourBidCardProps {
  bid: RankedAuctionUserBid
  getRankForBid: (bidId: string) => number | null
  lockedBidId: bigint | null
  onLockForTopUp: (bidId: bigint, priceWei: bigint) => void
  onCancelTopUp: () => void
  isAuctionEnded: boolean
  onClaim?: (bidId: string) => Promise<boolean>
  /** Format price for display */
  formatPrice?: (priceWei: bigint) => string
  /** Currency symbol */
  currencySymbol?: string
}

function getBidStatusLabel(
  status: RankedAuctionUserBid["status"],
  isWinning: boolean
): string {
  if (status === "claimed") return "Won & Claimed"
  if (isWinning) return "Winning"
  if (status === "refunded") return "Refunded"
  return "Outbid"
}

export function RankedAuctionYourBidCard({
  bid,
  getRankForBid,
  lockedBidId,
  onLockForTopUp,
  onCancelTopUp,
  isAuctionEnded,
  onClaim,
  formatPrice = w =>
    (Number(w) / 1e18).toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }),
  currencySymbol = "ETH",
}: RankedAuctionYourBidCardProps): React.ReactElement {
  const rank = getRankForBid(bid.id)
  const isLocked = lockedBidId !== null && bid.globalBidId === lockedBidId

  return (
    <div
      className={`
        rounded-xs border bg-grey-100 p-4
        dark:bg-grey-1000
        ${isLocked
          ? `
            border-success
            dark:border-success
          `
          : `
            border-transparent
            dark:border-transparent
          `
        }
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <Text size="1" color="tertiary">
          Rank #{rank ?? "—"}
        </Text>
        <Text size="1" color="tertiary" className="tabular-nums">
          {formatDateTime(bid.createdAt)}
        </Text>
      </div>
      <div className="flex justify-between">
        <Text size="2" className="mt-2">
          {formatPrice(bid.price)} {currencySymbol}
        </Text>
        <div className="mt-2 flex items-center gap-1.5">
          {bid.isWinning ? (
            <>
              <div className="size-4 rounded-full bg-success" aria-hidden />
              <Text size="2" className="text-success">
                {getBidStatusLabel(bid.status, bid.isWinning)}
              </Text>
            </>
          ) : (
            <>
              <div className="size-4 rounded-full bg-error" aria-hidden />
              <Text size="2" className="text-error">
                {getBidStatusLabel(bid.status, bid.isWinning)}
              </Text>
            </>
          )}
        </div>
      </div>
      {bid.status === "claimed" ? (
        <Text size="1" color="tertiary" className="mt-2">
          Claimed {bid.claimedAt ? formatDateTime(bid.claimedAt) : ""}
        </Text>
      ) : bid.isWinning && bid.status === "active" && onClaim ? (
        <Button
          color="secondary"
          className="mt-3 w-full"
          onClick={() => onClaim(bid.id)}
        >
          Claim Edition
        </Button>
      ) : null}
      {bid.isWinning && !isAuctionEnded ? (
        <div className="mt-3">
          <Button
            color="secondary"
            className="w-full"
            onClick={() =>
              isLocked
                ? onCancelTopUp()
                : onLockForTopUp(bid.globalBidId, bid.price)
            }
          >
            {isLocked ? "Cancel top-up" : "Top up"}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
