"use client";

import { useCallback, useEffect } from "react";
import { Button, Text } from "@/components/primitives";
import { useRankedAuctionContext } from "./RankedAuctionContext";
import { SteppedInput } from "@/components/primitives";
import { RankedAuctionSuggestedBids } from "./RankedAuctionSuggestedBids";
import { CursorGrowIcon } from "../primitives/SteppedInput";

export interface RankedAuctionBidInputProps {
  className?: string;
  /** Hide the suggested bids buttons */
  hideSuggestions?: boolean;
}

export function RankedAuctionBidInput({
  className,
  hideSuggestions = false,
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
        <div className="mb-2 rounded-xs bg-error/10 p-2 text-error">
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
        {!hideSuggestions ? <RankedAuctionSuggestedBids /> : null}
        <div className="flex flex-row gap-2">
          {lockedBid !== null ? (
            <Button
              type="button"
              color="tertiary"
              className="flex-1"
              onClick={() => setLockedBid(null)}
            >
              Cancel top up
            </Button>
          ) : null}
          <Button
            type="button"
            loading={isLoading}
            disabled={isAuctionEnded}
            onClick={handleSubmit}
            className={lockedBid !== null ? "flex-1" : "w-full"}
          >
            {primaryCtaLabel}
          </Button>
        </div>
      </fieldset>
    </div>
  );
}
