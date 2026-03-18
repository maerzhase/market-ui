"use client";

import { Text } from "@/components/primitives";
import { useAuctionContext } from "./AuctionContext";
import { AuctionYourBidCard } from "./AuctionYourBidCard";

export interface AuctionYourBidsProps {
  className?: string;
}

export function AuctionYourBids({
  className,
}: AuctionYourBidsProps): React.ReactElement | null {
  const {
    userBids,
    getRankForBid,
    lockedBid,
    setLockedBid,
    isAuctionEnded,
    handleClaimEdition,
    formatPrice,
    currencySymbol,
  } = useAuctionContext();

  if (userBids.length === 0) return null;

  const onLockForTopUp = (bidId: bigint, priceValue: bigint) => {
    setLockedBid({ bidId, priceValue });
  };

  const onCancelTopUp = () => setLockedBid(null);

  return (
    <div className={className}>
      <Text
        render={<h3 />}
        color="tertiary"
        className="mb-3 shrink-0"
        aria-label={`Your Bids (${userBids.length})`}
      >
        Your Bids ({userBids.length})
      </Text>
      <div className="-mr-1 min-h-0 flex-1 space-y-3 overflow-y-auto py-1 pr-1">
        {userBids.map((bid) => (
          <AuctionYourBidCard
            key={bid.id}
            bid={bid}
            getRankForBid={getRankForBid}
            lockedBidId={lockedBid?.bidId ?? null}
            onLockForTopUp={onLockForTopUp}
            onCancelTopUp={onCancelTopUp}
            isAuctionEnded={isAuctionEnded}
            onClaim={handleClaimEdition}
            formatPrice={formatPrice}
            currencySymbol={currencySymbol}
          />
        ))}
      </div>
    </div>
  );
}
