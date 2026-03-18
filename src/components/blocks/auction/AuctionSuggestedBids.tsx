"use client";

import * as React from "react";
import { Button, Scale, Text } from "@/components/primitives";
import { cn } from "@/lib";
import { getProjectedRankForPrice } from "@/utils";
import { useAuctionContext } from "./AuctionContext";

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
      "useSuggestedBid must be used within AuctionSuggestedBids.Item",
    );
  }
  return context;
}

export interface AuctionSuggestedBidsProps {
  className?: string;
  count?: number;
  children: (context: SuggestedBidContextValue) => React.ReactNode;
}

function AuctionSuggestedBidsRoot({
  className,
  count = 4,
  children,
}: AuctionSuggestedBidsProps): React.ReactElement | null {
  const {
    minBidValue,
    tickConfig,
    tickSize,
    isAuctionEnded,
    bidValue,
    setBidValue,
    formatPrice,
    currencySymbol,
    bids,
    setShowBidPreview,
    lockedBid,
    userBids,
    mergedForRank,
    maxTotalItems,
  } = useAuctionContext();

  const lockedBidId = React.useMemo(() => {
    if (lockedBid === null) return null;
    const lockedUserBid = userBids.find(
      (ub) => ub.globalBidId === lockedBid.bidId,
    );
    return lockedUserBid?.id ?? null;
  }, [lockedBid, userBids]);

  const bidsForRankProjection = React.useMemo(() => {
    if (lockedBidId === null) return mergedForRank;
    return mergedForRank.filter((b) => b.id !== lockedBidId);
  }, [mergedForRank, lockedBidId]);

  const getProjectedRank = React.useCallback(
    (priceValue: bigint) => {
      return getProjectedRankForPrice(
        priceValue,
        bidsForRankProjection,
        maxTotalItems,
      );
    },
    [bidsForRankProjection, maxTotalItems],
  );

  if (isAuctionEnded) {
    return null;
  }

  const getTickSize = (value: bigint): bigint => {
    if (!tickConfig) return tickSize;
    return value > tickConfig.threshold
      ? tickConfig.largeTickSize
      : tickConfig.smallTickSize;
  };

  const effectiveMinBid =
    lockedBid !== null && lockedBid.priceValue > minBidValue
      ? lockedBid.priceValue
      : minBidValue;

  const highestBid =
    bids.length > 0 ? BigInt(bids[0].price) : effectiveMinBid * 3n;

  const leadingBid = highestBid + getTickSize(highestBid);
  const maxBid =
    leadingBid > effectiveMinBid ? leadingBid : effectiveMinBid * 3n;

  const selectedValue = bidValue;
  const disabled = isAuctionEnded;

  return (
    <Scale.Linear
      domain={[effectiveMinBid, maxBid]}
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
          const isSelected = v === selectedValue;
          const { rank: projectedRank, isWinning } = getProjectedRank(v);

          const contextValue: SuggestedBidContextValue = {
            value: v,
            display,
            position,
            index,
            isSelected,
            onSelect: () => {
              setBidValue(v);
              setShowBidPreview(true);
            },
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

interface AuctionSuggestedBidsItemProps {
  labels?: string[];
}

function AuctionSuggestedBidsItem({
  labels = ["Minimum", "Safe Entry", "Competitive", "Leading"],
}: AuctionSuggestedBidsItemProps): React.ReactElement {
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

interface AuctionSuggestedBidsComponent {
  Root: typeof AuctionSuggestedBidsRoot;
  Item: typeof AuctionSuggestedBidsItem;
}

export const AuctionSuggestedBids: AuctionSuggestedBidsComponent = {
  Root: AuctionSuggestedBidsRoot,
  Item: AuctionSuggestedBidsItem,
};

export { useSuggestedBid };
