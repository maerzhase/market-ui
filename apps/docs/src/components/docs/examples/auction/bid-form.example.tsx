"use client";

import {
  AuctionBidForm,
  AuctionDetails,
  AuctionDetailsFooter,
  AuctionShell,
} from "./shared";

export function AuctionBidFormExample() {
  return (
    <AuctionShell className="rounded-lg border border-border bg-background p-6 shadow-lg">
      <AuctionDetails className="border-0">
        <AuctionDetailsFooter className="border-0 p-0">
          <AuctionBidForm.Root />
        </AuctionDetailsFooter>
      </AuctionDetails>
    </AuctionShell>
  );
}
