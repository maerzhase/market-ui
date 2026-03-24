"use client";

import { Button, Text } from "@/components/primitives";
import { cn } from "@/lib";
import type { AuctionUserBid } from "@/types";
import { formatDateTime } from "@/utils";

export interface AuctionYourBidCardProps {
  bid: AuctionUserBid;
  getRankForBid: (bidId: string) => number | null;
  lockedBidId: bigint | null;
  onLockForTopUp: (bidId: bigint, priceValue: bigint) => void;
  onCancelTopUp: () => void;
  isAuctionEnded: boolean;
  onClaim?: (bidId: string) => Promise<boolean>;
  formatPrice?: (priceValue: bigint) => string;
  currencySymbol?: string;
}

function getBidStatusLabel(
  status: AuctionUserBid["status"],
  isWinning: boolean,
): string {
  if (status === "claimed") return "Won & Claimed";
  if (isWinning) return "Winning";
  if (status === "refunded") return "Refunded";
  return "Outbid";
}

export function AuctionYourBidCard({
  bid,
  getRankForBid,
  lockedBidId,
  onLockForTopUp,
  onCancelTopUp,
  isAuctionEnded,
  onClaim,
  formatPrice = (v) =>
    (Number(v) / 1e18).toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }),
  currencySymbol = "USD",
}: AuctionYourBidCardProps): React.ReactElement {
  const rank = getRankForBid(bid.id);
  const isLocked = lockedBidId !== null && bid.globalBidId === lockedBidId;

  return (
    <div
      className={cn(
        "rounded-xs border bg-muted p-4",
        isLocked ? "border-success" : "border-transparent",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Text size="1" color="tertiary">
          Rank #{rank ?? "-"}
        </Text>
        <Text
          size="1"
          color="tertiary"
          className="tabular-nums"
          suppressHydrationWarning
        >
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
              <Text size="2" color="success">
                {getBidStatusLabel(bid.status, bid.isWinning)}
              </Text>
            </>
          ) : (
            <>
              <div className="size-4 rounded-full bg-destructive" aria-hidden />
              <Text size="2" color="error">
                {getBidStatusLabel(bid.status, bid.isWinning)}
              </Text>
            </>
          )}
        </div>
      </div>
      {bid.status === "claimed" ? (
        <Text
          size="1"
          color="tertiary"
          className="mt-2"
          suppressHydrationWarning
        >
          Claimed {bid.claimedAt ? formatDateTime(bid.claimedAt) : ""}
        </Text>
      ) : bid.isWinning && bid.status === "active" && onClaim ? (
        <Button
          color="secondary"
          className="mt-3 w-full"
          onClick={() => onClaim(bid.id)}
        >
          Claim
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
  );
}
