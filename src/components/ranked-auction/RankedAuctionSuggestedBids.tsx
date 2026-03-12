"use client";

import { Button } from "@/components/primitives";
import { useRankedAuctionContext } from "./RankedAuctionContext";

export interface RankedAuctionSuggestedBidsProps {
  className?: string;
  /** Custom render function for suggestions */
  render?: (
    suggestions: Array<{ wei: bigint; display: string }>,
    props: {
      selectedWei: bigint;
      onSelect: (wei: bigint) => void;
      disabled: boolean;
    },
  ) => React.ReactNode;
}

export function RankedAuctionSuggestedBids({
  className,
  render,
}: RankedAuctionSuggestedBidsProps): React.ReactElement | null {
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

  const selectedWei = bidWei;
  const onSelect = (wei: bigint) => setBidWei(wei);
  const disabled = isAuctionEnded;

  if (suggestions.length === 0 || isAuctionEnded) {
    return null;
  }

  if (render) {
    return (
      <div className={className}>
        {render(suggestions, { selectedWei, onSelect, disabled })}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-row justify-between gap-2">
        {suggestions.map((suggestion) => {
          const isActive = suggestion.wei === selectedWei;
          return (
            <Button
              key={suggestion.display}
              type="button"
              color={isActive ? "tertiary" : "tertiary"}
              className="flex-1"
              disabled={disabled}
              onClick={() => onSelect(suggestion.wei)}
              aria-label={`Set bid to ${suggestion.display}`}
              size="default"
            >
              {suggestion.display}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
