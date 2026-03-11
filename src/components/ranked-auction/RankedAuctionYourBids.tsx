"use client";

import { Text } from "@/components/primitives";
import { useRankedAuctionContext } from "./RankedAuctionContext";
import { RankedAuctionYourBidCard } from "./RankedAuctionYourBidCard";

export interface RankedAuctionYourBidsProps {
  className?: string;
}

export function RankedAuctionYourBids({
  className,
}: RankedAuctionYourBidsProps): React.ReactElement | null {
  const {
    userBids,
    getRankForBid,
    lockedBid,
    setLockedBid,
    isAuctionEnded,
    handleClaimEdition,
    formatPrice,
    currencySymbol,
  } = useRankedAuctionContext();

  if (userBids.length === 0) return null;

  const onLockForTopUp = (bidId: bigint, priceWei: bigint) => {
    setLockedBid({ bidId, priceWei });
  };

  const onCancelTopUp = () => setLockedBid(null);

  return (
    <div className={className}>
      <Text render={<h3 />} color="tertiary" className="mb-3 shrink-0">
        Your Bids ({userBids.length})
      </Text>
      <div className="-mr-1 min-h-0 flex-1 space-y-3 overflow-y-auto py-1 pr-1">
        {userBids.map((bid, index) => (
          <RankedAuctionYourBidCard
            key={index}
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
