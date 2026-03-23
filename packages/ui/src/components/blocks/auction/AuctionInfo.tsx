"use client";

import { Text } from "@/components/primitives";
import { useAuctionContext } from "./AuctionContext";
import { AuctionStatusTag } from "./AuctionStatusTag";

export interface AuctionInfoProps {
  className?: string;
}

export function AuctionInfo({
  className,
}: AuctionInfoProps): React.ReactElement {
  const { auction, isAuctionEnded, maxTotalItems } = useAuctionContext();

  const editionsLabel =
    maxTotalItems === 1 ? "1 item" : `${maxTotalItems} items`;

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2">
        <AuctionStatusTag
          opensAt={auction.opensAt}
          endsAt={auction.endsAt}
          background="transparent"
        />
      </div>
      {!isAuctionEnded ? (
        <Text size="2" color="tertiary" className="mt-2">
          Bid on one of {editionsLabel}. Top {maxTotalItems} bidders win and pay
          the lowest winning bid.
        </Text>
      ) : null}
    </div>
  );
}
