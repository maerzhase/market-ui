"use client";

import {
  AuctionDetails,
  AuctionDetailsFooter,
  AuctionShell,
  AuctionSuggestedBids,
} from "./shared";

export function AuctionSuggestedBidsExample() {
  return (
    <AuctionShell className="rounded-lg border border-border bg-background p-6 shadow-lg">
      <AuctionDetails className="border-0">
        <AuctionDetailsFooter className="border-0 p-0">
          <AuctionSuggestedBids.Root>
            {() => <AuctionSuggestedBids.Item />}
          </AuctionSuggestedBids.Root>
        </AuctionDetailsFooter>
      </AuctionDetails>
    </AuctionShell>
  );
}
