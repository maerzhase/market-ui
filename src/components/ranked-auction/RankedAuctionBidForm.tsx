"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { ReactNode } from "react";
import { Button, Separator, SteppedInput, Text } from "@/components/primitives";
import { cn } from "@/lib";
import { CursorGrowIcon } from "../primitives/SteppedInput";
import { useRankedAuctionContext } from "./RankedAuctionContext";
import { RankedAuctionSuggestedBids } from "./RankedAuctionSuggestedBids";

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
        <div className="rounded-xs bg-destructive-muted p-2 text-destructive">
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
          formatValue={(val) => Number(val) / 1e18}
          parseValue={(val) => BigInt(Math.round(val * 1e18))}
          disabled={isAuctionEnded}
          snapToTick="nearest"
        >
          <SteppedInput.Group>
            <SteppedInput.Decrement />
            <SteppedInput.ScrubArea>
              <SteppedInput.ScrubAreaCursor>
                <CursorGrowIcon />
              </SteppedInput.ScrubAreaCursor>
              <SteppedInput.Value>
                {({ value }) => `${formatPrice(value)} ${currencySymbol}`}
              </SteppedInput.Value>
            </SteppedInput.ScrubArea>
            <SteppedInput.Increment />
          </SteppedInput.Group>
        </SteppedInput.Root>
        <div className="flex flex-col gap-3 rounded-md border border-border p-4">
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
        <div className="flex w-full gap-2">
          <LayoutGroup>
            <AnimatePresence mode="popLayout">
              {lockedBid !== null && (
                <motion.div
                  key="cancel-button"
                  initial={{ opacity: 0, scaleX: 0.8 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  layout
                  className="grow"
                >
                  <Button
                    type="button"
                    color="tertiary"
                    className="w-full whitespace-nowrap"
                    onClick={() => setLockedBid(null)}
                  >
                    Cancel
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              layout="position"
              key="submit-button"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="grow"
            >
              <Button
                className="w-full"
                type="button"
                loading={isLoading}
                disabled={isAuctionEnded}
                onClick={handleSubmit}
              >
                <span>Place bid {bidDisplay}</span>
              </Button>
            </motion.div>
          </LayoutGroup>
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
  const { isAuctionEnded } = useRankedAuctionContext();

  if (isAuctionEnded) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Text size="2" weight="medium" color="primary">
        Quick picks
      </Text>
      <RankedAuctionSuggestedBids.Root count={4}>
        {() => (
          <RankedAuctionSuggestedBids.Item
            labels={["Minimum Bid", "Safe Entry", "Competitive", "Leading"]}
          />
        )}
      </RankedAuctionSuggestedBids.Root>
      <Separator color="subtle" label="or set your own" className="mb-2" />
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
