"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";
import { Button, SteppedInput, Text } from "@/components/primitives";
import { transitions } from "@/lib";
import { CursorGrowIcon } from "../../primitives/SteppedInput";
import { useAuctionContext } from "./AuctionContext";

export interface AuctionBidInputProps {
  className?: string;
}

export function AuctionBidInput({
  className,
}: AuctionBidInputProps): React.ReactElement {
  const {
    isAuctionEnded,
    minBidValue,
    tickConfig,
    tickSize,
    lockedBid,
    setLockedBid,
    placeBidOperation,
    topUpOperation,
    handlePlaceBid,
    handleTopUp,
    getProjectedRank,
    bidValue,
    setBidValue,
    formatPrice,
    currencySymbol,
    inputDecimals,
  } = useAuctionContext();

  const effectiveMinBid =
    lockedBid !== null && lockedBid.priceValue > minBidValue
      ? lockedBid.priceValue
      : minBidValue;

  useEffect(() => {
    setBidValue((prev) => (prev < effectiveMinBid ? effectiveMinBid : prev));
  }, [effectiveMinBid, setBidValue]);

  const getTickSize = useCallback(
    (currentValue: bigint) => {
      if (!tickConfig) return tickSize;
      return currentValue > tickConfig.threshold
        ? tickConfig.largeTickSize
        : tickConfig.smallTickSize;
    },
    [tickConfig, tickSize],
  );

  const activeOperation =
    lockedBid !== null ? topUpOperation : placeBidOperation;
  const status = activeOperation.status;
  const errorMessage = activeOperation.error;

  const { rank: projectedRank, isWinning: isProjectedWinning } =
    getProjectedRank(bidValue);

  const bidDisplay = `${formatPrice(bidValue)} ${currencySymbol}`;

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
        ? await handleTopUp(bidValue.toString())
        : await handlePlaceBid(bidValue.toString());
    if (success) setBidValue(effectiveMinBid);
  }, [
    bidValue,
    effectiveMinBid,
    lockedBid,
    handlePlaceBid,
    handleTopUp,
    setBidValue,
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
          value={bidValue}
          onChange={setBidValue}
          min={effectiveMinBid}
          getTickSize={getTickSize}
          decimals={inputDecimals}
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
                transition={transitions.fade}
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
