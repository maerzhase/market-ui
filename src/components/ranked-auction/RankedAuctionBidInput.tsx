"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";
import { Button, SteppedInput, Text } from "@/components/primitives";
import { CursorGrowIcon } from "../primitives/SteppedInput";
import { useRankedAuctionContext } from "./RankedAuctionContext";

export interface RankedAuctionBidInputProps {
  className?: string;
}

export function RankedAuctionBidInput({
  className,
}: RankedAuctionBidInputProps): React.ReactElement {
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

  useEffect(() => {
    setBidWei((prev) =>
      prev < effectiveMinBidWei ? effectiveMinBidWei : prev,
    );
  }, [effectiveMinBidWei, setBidWei]);

  const getTickSize = useCallback(
    (currentValue: bigint) => {
      if (!tickConfig) return tickSizeWei;
      return currentValue > tickConfig.threshold
        ? tickConfig.largeTickSize
        : tickConfig.smallTickSize;
    },
    [tickConfig, tickSizeWei],
  );

  const activeOperation =
    lockedBid !== null ? topUpOperation : placeBidOperation;
  const status = activeOperation.status;
  const errorMessage = activeOperation.error;

  const { rank: projectedRank, isWinning: isProjectedWinning } =
    getProjectedRank(bidWei);

  const bidDisplay = `${formatPrice(bidWei)} ${currencySymbol}`;

  const primaryCtaLabel =
    lockedBid !== null
      ? projectedRank != null && !isAuctionEnded
        ? `Top up to rank #${projectedRank}${
            !isProjectedWinning ? " (outside winning range)" : ""
          }`
        : "Top up"
      : projectedRank != null && !isAuctionEnded
        ? `Bid ${bidDisplay} and get rank #${projectedRank}${
            !isProjectedWinning ? " (outside winning range)" : ""
          }`
        : `Bid ${bidDisplay}`;

  const handleSubmit = useCallback(async () => {
    const success =
      lockedBid !== null
        ? await handleTopUp(bidWei.toString())
        : await handlePlaceBid(bidWei.toString());
    if (success) setBidWei(effectiveMinBidWei);
  }, [
    bidWei,
    effectiveMinBidWei,
    lockedBid,
    handlePlaceBid,
    handleTopUp,
    setBidWei,
  ]);

  const isLoading =
    status === "pending" || status === "confirming" || status === "indexing";

  return (
    <div className={className}>
      {status === "error" ? (
        <div className="bg-error/10 text-error mb-2 rounded-xs p-2">
          <Text size="1">{errorMessage}</Text>
        </div>
      ) : null}
      <fieldset
        disabled={isAuctionEnded}
        className="flex w-full flex-col gap-2"
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
        <div className="flex flex-row gap-2">
          <AnimatePresence mode="popLayout">
            {lockedBid !== null && (
              <motion.div
                key="cancel-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1"
              >
                <Button
                  type="button"
                  color="tertiary"
                  className="w-full whitespace-nowrap"
                  onClick={() => setLockedBid(null)}
                >
                  Cancel top up
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="min-w-0 flex-1">
            <Button
              type="button"
              loading={isLoading}
              disabled={isAuctionEnded}
              onClick={handleSubmit}
              className="w-full whitespace-nowrap"
            >
              {primaryCtaLabel}
            </Button>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
