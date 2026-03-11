"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib";
import { Button, Text } from "@/components/primitives";
import { useRankedAuctionContext } from "./RankedAuctionContext";
import { SteppedInput } from "@/components/primitives";
import { CursorGrowIcon } from "../primitives/SteppedInput";

interface BidFormContextValue {
  projectedRank: number | null;
  isWinning: boolean;
  bidWei: bigint;
  isLoading: boolean;
}

export function RankedAuctionBidFormRoot({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}): React.ReactElement {
  const {
    isAuctionEnded,
    minBidWei,
    tickConfig,
    tickSizeWei,
    lockedBid,
    setLockedBid,
    placeBidOperation,
    topUpOperation,
    handlePlaceBid,
    handleTopUp,
    getProjectedRank,
    bidWei,
    setBidWei,
    formatPrice,
    currencySymbol,
  } = useRankedAuctionContext();

  const effectiveMinBidWei =
    lockedBid !== null && lockedBid.priceWei > minBidWei
      ? lockedBid.priceWei
      : minBidWei;

  const getTickSize = (currentValue: bigint) => {
    if (!tickConfig) return tickSizeWei;
    return currentValue > tickConfig.threshold
      ? tickConfig.largeTickSize
      : tickConfig.smallTickSize;
  };

  const activeOperation =
    lockedBid !== null ? topUpOperation : placeBidOperation;
  const status = activeOperation.status;
  const errorMessage = activeOperation.error;

  const { rank: projectedRank, isWinning: isProjectedWinning } =
    getProjectedRank(bidWei);

  const bidDisplay = `${formatPrice(bidWei)} ${currencySymbol}`;

  const handleSubmit = async () => {
    const success =
      lockedBid !== null
        ? await handleTopUp(bidWei.toString())
        : await handlePlaceBid(bidWei.toString());
    if (success) setBidWei(effectiveMinBidWei);
  };

  const isLoading =
    status === "pending" || status === "confirming" || status === "indexing";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {status === "error" ? (
        <div className="rounded-xs bg-error/10 p-2 text-error">
          <Text size="1">{errorMessage}</Text>
        </div>
      ) : null}
      <fieldset
        disabled={isAuctionEnded}
        className="flex w-full flex-col gap-4"
      >
        <SteppedInput.Root
          value={bidWei}
          onChange={setBidWei}
          min={effectiveMinBidWei}
          getTickSize={getTickSize}
          formatValue={(val) => Number(val)}
          parseValue={(val) => {
            const [numStr] = val.toString().split(".");
            return BigInt(numStr || "0");
          }}
          disabled={isAuctionEnded}
        >
          <SteppedInput.Group>
            <SteppedInput.Decrement />
            <SteppedInput.ScrubArea>
              <SteppedInput.ScrubAreaCursor>
                <CursorGrowIcon />
              </SteppedInput.ScrubAreaCursor>
              <SteppedInput.Value>
                {({ displayValue }) =>
                  `${formatPrice(BigInt(displayValue))} ${currencySymbol}`
                }
              </SteppedInput.Value>
            </SteppedInput.ScrubArea>
            <SteppedInput.Increment />
          </SteppedInput.Group>
        </SteppedInput.Root>
        <div className="flex flex-col gap-3 rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <Text size="2" color="secondary">
              Projected rank
            </Text>
            <Text size="2" weight="medium">
              {projectedRank != null
                ? `#${projectedRank} of ${isAuctionEnded ? "N" : "N"}`
                : "N/A"}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text size="2" color="secondary">
              You'd pay
            </Text>
            <Text size="2" weight="medium">
              {bidDisplay}
            </Text>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {lockedBid !== null ? (
            <Button
              type="button"
              color="tertiary"
              className="flex-1"
              onClick={() => setLockedBid(null)}
            >
              Cancel
            </Button>
          ) : null}
          <Button
            type="button"
            loading={isLoading}
            disabled={isAuctionEnded}
            onClick={handleSubmit}
            className={lockedBid !== null ? "flex-1" : "w-full"}
          >
            Place bid {bidDisplay}
          </Button>
        </div>
      </fieldset>
    </div>
  );
}

export function RankedAuctionBidFormSuggestions({
  className,
}: {
  className?: string;
}): React.ReactElement | null {
  const {
    getSuggestedBids,
    isAuctionEnded,
    bidWei,
    setBidWei,
    formatPrice,
    currencySymbol,
  } = useRankedAuctionContext();

  const suggestionsWei = getSuggestedBids();
  const suggestions = suggestionsWei.map((value) => ({
    wei: value,
    display: `${formatPrice(value)} ${currencySymbol}`,
  }));

  if (suggestions.length === 0 || isAuctionEnded) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Text size="2" weight="medium" color="primary">
        Quick picks
      </Text>
      <div className="grid grid-cols-2 gap-2">
        {suggestions.map((suggestion) => {
          const isActive = suggestion.wei === bidWei;
          return (
            <Button
              key={suggestion.display}
              type="button"
              color={isActive ? "primary" : "secondary"}
              className="w-full"
              disabled={isAuctionEnded}
              onClick={() => setBidWei(suggestion.wei)}
              aria-label={`Set bid to ${suggestion.display}`}
              size="default"
            >
              {suggestion.display}
            </Button>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <div
          className="h-px min-w-0 flex-1 bg-neutral-200 dark:bg-neutral-800"
          aria-hidden
        />
        <Text size="1" color="tertiary" className="shrink-0">
          or set your own
        </Text>
        <div
          className="h-px min-w-0 flex-1 bg-neutral-200 dark:bg-neutral-800"
          aria-hidden
        />
      </div>
    </div>
  );
}

export const RankedAuctionBidForm: {
  Root: typeof RankedAuctionBidFormRoot;
  Suggestions: typeof RankedAuctionBidFormSuggestions;
} = {
  Root: RankedAuctionBidFormRoot,
  Suggestions: RankedAuctionBidFormSuggestions,
};
