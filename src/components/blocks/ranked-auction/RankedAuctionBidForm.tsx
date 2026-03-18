"use client";

import { Button, SteppedInput, Text } from "@/components/primitives";
import { cn } from "@/lib";
import { CursorGrowIcon } from "../../primitives/SteppedInput";
import { useRankedAuctionContext } from "./RankedAuctionContext";

export function RankedAuctionBidFormRoot({
  className,
}: {
  className?: string;
}): React.ReactElement {
  const {
    isAuctionEnded,
    minBidWei,
    tickConfig,
    tickSizeWei,
    lockedBid,
    placeBidOperation,
    topUpOperation,
    handlePlaceBid,
    handleTopUp,
    bidWei,
    setBidWei,
    formatPrice,
    currencySymbol,
    formatInputValue,
    parseInputValue,
    cancelBidding,
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
        {lockedBid !== null ? (
          <Text size="1">
            Update your bid. You will pay the difference between the new bid
            amount and the existing bid.
          </Text>
        ) : (
          <Text size="1">Place a new bid to participate in the auction.</Text>
        )}
        <SteppedInput.Root
          value={bidWei}
          onChange={setBidWei}
          min={effectiveMinBidWei}
          getTickSize={getTickSize}
          formatValue={formatInputValue}
          parseValue={parseInputValue}
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
        <div className="flex w-full gap-2">
          <Button
            type="button"
            color="tertiary"
            className="grow whitespace-nowrap"
            onClick={cancelBidding}
          >
            Cancel
          </Button>
          <Button
            className="grow"
            type="button"
            loading={isLoading}
            disabled={
              isAuctionEnded ||
              (!!lockedBid && bidWei - lockedBid.priceWei === 0n)
            }
            onClick={handleSubmit}
          >
            {lockedBid !== null ? (
              <span>
                Update bid (+
                {formatPrice(bidWei - lockedBid.priceWei)} {currencySymbol})
              </span>
            ) : (
              <span>Place bid</span>
            )}
          </Button>
        </div>
      </fieldset>
    </div>
  );
}

export const RankedAuctionBidForm: {
  Root: typeof RankedAuctionBidFormRoot;
} = {
  Root: RankedAuctionBidFormRoot,
};
