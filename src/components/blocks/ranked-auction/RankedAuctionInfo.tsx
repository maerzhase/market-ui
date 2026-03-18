"use client";

import { Text } from "@/components/primitives";
import { useRankedAuctionContext } from "./RankedAuctionContext";
import { RankedAuctionStatusTag } from "./RankedAuctionStatusTag";

export interface RankedAuctionInfoProps {
  className?: string;
}

export function RankedAuctionInfo({
  className,
}: RankedAuctionInfoProps): React.ReactElement {
  const { auction, isAuctionEnded, maxTotalItems } = useRankedAuctionContext();

  const editionsLabel =
    maxTotalItems === 1
      ? "1 curated edition"
      : `${maxTotalItems} curated editions`;

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2">
        <RankedAuctionStatusTag
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
