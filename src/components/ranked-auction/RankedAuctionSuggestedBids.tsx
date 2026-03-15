"use client";

import * as React from "react";
import { Button, Scale, Text } from "@/components/primitives";
import { cn } from "@/lib";
import { useRankedAuctionContext } from "./RankedAuctionContext";

export interface SuggestedBidContextValue {
  value: bigint;
  display: string;
  position: number;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  disabled: boolean;
  projectedRank: number | null;
  isWinning: boolean;
}

const SuggestedBidContext =
  React.createContext<SuggestedBidContextValue | null>(null);

function useSuggestedBid(): SuggestedBidContextValue {
  const context = React.useContext(SuggestedBidContext);
  if (!context) {
    throw new Error(
      "useSuggestedBid must be used within RankedAuctionSuggestedBids.Item",
    );
  }
  return context;
}

export interface RankedAuctionSuggestedBidsProps {
  className?: string;
  count?: number;
  children: (context: SuggestedBidContextValue) => React.ReactNode;
}

function RankedAuctionSuggestedBidsRoot({
  className,
  count = 4,
  children,
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
    getProjectedRank,
  } = useRankedAuctionContext();

  if (isAuctionEnded) {
    return null;
  }

  const getTickSize = (value: bigint): bigint => {
    if (!tickConfig) return tickSizeWei;
    return value > tickConfig.threshold
      ? tickConfig.largeTickSize
      : tickConfig.smallTickSize;
  };

  const highestBidWei =
    bids.length > 0 ? BigInt(bids[0].price) : minBidWei * 3n;

  // Add a tick size to highest bid so the max suggestion is a leading bid
  const leadingBidWei = highestBidWei + getTickSize(highestBidWei);
  const maxBidWei = leadingBidWei > minBidWei ? leadingBidWei : minBidWei * 3n;

  const selectedWei = bidWei;
  const disabled = isAuctionEnded;

  return (
    <Scale.Linear
      domain={[minBidWei, maxBidWei]}
      getTickSize={getTickSize}
      snapMode="up"
      className={cn("grid grid-cols-2 gap-2", className)}
    >
      <Scale.Ticks count={count}>
        {(
          { value, position }: { value: bigint; position: number },
          index: number,
        ) => {
          const v = value;
          const display = `${formatPrice(v)} ${currencySymbol}`;
          const isSelected = v === selectedWei;
          const { rank: projectedRank, isWinning } = getProjectedRank(v);

          const contextValue: SuggestedBidContextValue = {
            value: v,
            display,
            position,
            index,
            isSelected,
            onSelect: () => setBidWei(v),
            disabled,
            projectedRank,
            isWinning,
          };

          return (
            <SuggestedBidContext.Provider value={contextValue}>
              {children(contextValue)}
            </SuggestedBidContext.Provider>
          );
        }}
      </Scale.Ticks>
    </Scale.Linear>
  );
}

interface RankedAuctionSuggestedBidsItemProps {
  labels?: string[];
}

function RankedAuctionSuggestedBidsItem({
  labels = ["Minimum", "Safe Entry", "Competitive", "Leading"],
}: RankedAuctionSuggestedBidsItemProps): React.ReactElement {
  const context = useSuggestedBid();
  const label = labels[context.index] ?? labels[labels.length - 1] ?? "Bid";

  return (
    <Button
      type="button"
      color="tertiary"
      active={context.isSelected}
      className="h-auto w-full items-start justify-between gap-2 px-3 py-2.5 text-left"
      disabled={context.disabled}
      onClick={context.onSelect}
      size="card"
    >
      <div className="flex flex-col">
        <Text color="secondary" size="1">
          {label}
        </Text>
        <Text>{context.display}</Text>
      </div>
      {context.projectedRank != null && (
        <span className="flex shrink-0 flex-col">
          <Text color="secondary" size="1">
            Rank
          </Text>
          <Text>#{context.projectedRank}</Text>
        </span>
      )}
    </Button>
  );
}

interface RankedAuctionSuggestedBidsComponent {
  Root: typeof RankedAuctionSuggestedBidsRoot;
  Item: typeof RankedAuctionSuggestedBidsItem;
}

export const RankedAuctionSuggestedBids: RankedAuctionSuggestedBidsComponent = {
  Root: RankedAuctionSuggestedBidsRoot,
  Item: RankedAuctionSuggestedBidsItem,
};

export { useSuggestedBid };
