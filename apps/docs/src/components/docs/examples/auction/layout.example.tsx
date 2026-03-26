"use client";

import {
  AuctionDetails,
  AuctionDetailsBody,
  AuctionDetailsFooter,
  AuctionDetailsHeader,
  AuctionLayout,
  AuctionRankingsContainer,
  Text,
} from "./shared";

export function AuctionLayoutExample() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background shadow-lg">
      <AuctionLayout height={420}>
        <AuctionDetails>
          <AuctionDetailsHeader>
            <Text size="4" weight="medium">
              Auction Details Header
            </Text>
            <Text size="2" color="secondary" className="mt-1">
              This is the header section with auction info.
            </Text>
          </AuctionDetailsHeader>
          <AuctionDetailsBody>
            <Text size="2" color="tertiary">
              Body content goes here. This area is scrollable when content
              overflows.
            </Text>
          </AuctionDetailsBody>
          <AuctionDetailsFooter>
            <Text size="2">Footer with bid form</Text>
          </AuctionDetailsFooter>
        </AuctionDetails>
        <AuctionRankingsContainer>
          <div className="p-6">
            <Text size="3" weight="medium">
              Rankings
            </Text>
            <Text size="2" color="secondary" className="mt-1">
              Bid rankings appear here.
            </Text>
          </div>
        </AuctionRankingsContainer>
      </AuctionLayout>
    </div>
  );
}
