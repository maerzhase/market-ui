"use client";

import { Button, Scale } from "@/components/primitives";
import { useRankedAuctionContext } from "./RankedAuctionContext";

export interface RankedAuctionSuggestedBidsProps {
  className?: string;
  /** Number of suggestion buttons to show (default: 3) */
  count?: number;
  /** Custom render function for each suggestion */
  render?: (context: {
    value: bigint;
    display: string;
    position: number;
    isSelected: boolean;
    onSelect: () => void;
    disabled: boolean;
  }) => React.ReactNode;
}

export function RankedAuctionSuggestedBids({
  className,
  count = 3,
  render,
}: RankedAuctionSuggestedBidsProps): React.ReactElement | null {
  const {
    minBidWei,
    tickConfig,
    tickSizeWei,
    isAuctionEnded,
    bidWei,
    setBidWei,
    formatPrice,
    currencySymbol,
    bids,
  } = useRankedAuctionContext();

  if (isAuctionEnded) {
    return null;
  }

  // Calculate the max of the scale domain
  // Use highest bid + some buffer, or 3x min bid if no bids yet
  const highestBidWei =
    bids.length > 0 ? BigInt(bids[0].price) : minBidWei * 3n;

  // Ensure max is at least min + reasonable buffer
  const maxBidWei = highestBidWei > minBidWei ? highestBidWei : minBidWei * 3n;

  // Get tick size for the scale
  const getTickSize = (value: bigint): bigint => {
    if (!tickConfig) return tickSizeWei;
    return value > tickConfig.threshold
      ? tickConfig.largeTickSize
      : tickConfig.smallTickSize;
  };

  const selectedWei = bidWei;
  const disabled = isAuctionEnded;

  return (
    <div className={className}>
      <Scale.Linear
        domain={[minBidWei, maxBidWei]}
        getTickSize={getTickSize}
        snapMode="up"
        className="flex flex-row justify-between gap-2"
      >
        <Scale.Ticks count={count}>
          {({ value, position }) => {
            const v = value as bigint;
            const display = `${formatPrice(v)} ${currencySymbol}`;
            const isSelected = v === selectedWei;

            if (render) {
              return render({
                value: v,
                display,
                position,
                isSelected,
                onSelect: () => setBidWei(v),
                disabled,
              });
            }

            return (
              <Button
                type="button"
                color={isSelected ? "secondary" : "tertiary"}
                className="flex-1"
                disabled={disabled}
                onClick={() => setBidWei(v)}
                aria-label={`Set bid to ${display}`}
                size="default"
              >
                {display}
              </Button>
            );
          }}
        </Scale.Ticks>
      </Scale.Linear>
    </div>
  );
}
