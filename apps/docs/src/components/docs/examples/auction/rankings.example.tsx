"use client";

import {
  AuctionRankings,
  AuctionRankingsContainer,
  AuctionShell,
} from "./shared";

export function AuctionRankingsExample() {
  return (
    <AuctionShell className="overflow-hidden rounded-lg border border-border bg-background shadow-lg">
      <AuctionRankingsContainer className="min-h-[420px]">
        <AuctionRankings />
      </AuctionRankingsContainer>
    </AuctionShell>
  );
}
