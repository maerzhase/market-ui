import type { Meta, StoryObj } from "@storybook/react";
import {
  AuctionDetails,
  AuctionDetailsBody,
  AuctionDetailsFooter,
  AuctionDetailsHeader,
  AuctionLayout,
  AuctionRankingsContainer,
} from "@/components/blocks/auction/AuctionLayout";
import { Separator } from "@/components/primitives/Separator";
import { Text } from "@/components/primitives/Text";

const detailBids = Array.from({ length: 10 }, (_, i) => ({
  id: `detail-bid-${i + 1}`,
  rank: i + 1,
  time: new Date(Date.now() - i * 3600000).toLocaleTimeString(),
  price: (0.5 - i * 0.02).toFixed(3),
}));

const rankingRows = Array.from({ length: 25 }, (_, i) => ({
  id: `ranking-${i + 1}`,
  rank: i + 1,
  label: `Bidder ${i + 1}`,
  price: (0.5 - i * 0.015).toFixed(3),
  isLast: i === 24,
}));

const leaderboardRows = Array.from({ length: 25 }, (_, i) => ({
  id: `leaderboard-${i + 1}`,
  rank: i + 1,
  address: `0x${(i + 1).toString(16).padStart(4, "0")}...`,
  price: (0.5 - i * 0.015).toFixed(3),
  timeLabel: `${i + 1}h`,
  isOutbid: i >= 20,
  isLast: i === 24,
}));

const meta: Meta<typeof AuctionLayout> = {
  title: "Blocks/Auction/Layout",
  component: AuctionLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof AuctionLayout> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
        <div className="size-full rounded-lg border border-border bg-background shadow-lg">
          <AuctionLayout>
            <AuctionDetails>
              <AuctionDetailsHeader>
                <Text size="4" weight="medium">
                  Auction Details Header
                </Text>
                <Text size="2" color="secondary" className="mt-1">
                  This is the header section with auction info
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
                  Bid rankings appear here
                </Text>
              </div>
            </AuctionRankingsContainer>
          </AuctionLayout>
        </div>
      </div>
    </div>
  ),
};

export const WithScrollableBody: StoryObj<typeof AuctionLayout> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
        <div className="size-full rounded-lg border border-border bg-background shadow-lg">
          <AuctionLayout height="600px">
            <AuctionDetails>
              <AuctionDetailsHeader>
                <Text size="4" weight="medium">
                  Your Bids
                </Text>
              </AuctionDetailsHeader>
              <AuctionDetailsBody>
                <div className="space-y-4">
                  {detailBids.map((bid) => (
                    <div
                      key={bid.id}
                      className="rounded-lg border border-border bg-muted p-4"
                    >
                      <div className="flex justify-between">
                        <Text size="1" color="tertiary">
                          Rank #{bid.rank}
                        </Text>
                        <Text size="1" color="tertiary" tabularNums>
                          {bid.time}
                        </Text>
                      </div>
                      <Text size="2" className="mt-2" tabularNums>
                        {bid.price}
                      </Text>
                    </div>
                  ))}
                </div>
              </AuctionDetailsBody>
              <AuctionDetailsFooter>
                <div className="rounded-lg border border-border p-4">
                  <Text size="2">Bid Form Placeholder</Text>
                </div>
              </AuctionDetailsFooter>
            </AuctionDetails>
            <AuctionRankingsContainer>
              <div className="flex h-full flex-col">
                <div className="shrink-0 border-b border-border p-4">
                  <Text size="3" weight="medium">
                    All Rankings
                  </Text>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  {rankingRows.map((row) => (
                    <div key={row.id}>
                      <div className="flex items-center justify-between px-6 py-3">
                        <div className="flex items-center gap-3">
                          <Text size="1" color="tertiary" className="w-6">
                            #{row.rank}
                          </Text>
                          <div className="size-6 rounded-full bg-muted" />
                          <Text size="2">{row.label}</Text>
                        </div>
                        <Text size="2" tabularNums>
                          {row.price}
                        </Text>
                      </div>
                      {!row.isLast && <Separator />}
                    </div>
                  ))}
                </div>
              </div>
            </AuctionRankingsContainer>
          </AuctionLayout>
        </div>
      </div>
    </div>
  ),
};

export const CustomHeight: StoryObj<typeof AuctionLayout> = {
  render: () => (
    <div className="w-full bg-muted p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-border bg-background shadow-lg">
          <AuctionLayout height={400}>
            <AuctionDetails>
              <AuctionDetailsHeader>
                <Text size="3" weight="medium">
                  Compact Layout
                </Text>
              </AuctionDetailsHeader>
              <AuctionDetailsBody>
                <Text size="2" color="secondary">
                  This layout has a fixed height of 400px
                </Text>
              </AuctionDetailsBody>
              <AuctionDetailsFooter>
                <Text size="1" color="tertiary">
                  Footer
                </Text>
              </AuctionDetailsFooter>
            </AuctionDetails>
            <AuctionRankingsContainer>
              <div className="flex h-full items-center justify-center">
                <Text size="2" color="tertiary">
                  Rankings Panel
                </Text>
              </div>
            </AuctionRankingsContainer>
          </AuctionLayout>
        </div>
      </div>
    </div>
  ),
};

export const DetailsOnly: StoryObj<typeof AuctionLayout> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-md items-center justify-center">
        <div className="size-full max-h-150 rounded-lg border border-border bg-background shadow-lg">
          <AuctionDetails className="h-full">
            <AuctionDetailsHeader>
              <Text size="4" weight="medium">
                Auction #1234
              </Text>
              <Text size="2" color="secondary" className="mt-1">
                Live - 2h 30m remaining
              </Text>
            </AuctionDetailsHeader>
            <AuctionDetailsBody>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Text size="2" color="tertiary">
                    Reserve Price
                  </Text>
                  <Text size="2" tabularNums>
                    0.01
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text size="2" color="tertiary">
                    Editions
                  </Text>
                  <Text size="2">20</Text>
                </div>
                <div className="flex justify-between">
                  <Text size="2" color="tertiary">
                    Current Floor
                  </Text>
                  <Text size="2" tabularNums>
                    0.05
                  </Text>
                </div>
                <Separator />
                <Text size="2" color="secondary">
                  Bid on one of 20 curated editions. Top 20 bidders win and pay
                  the lowest winning bid.
                </Text>
              </div>
            </AuctionDetailsBody>
            <AuctionDetailsFooter>
              <button
                type="button"
                className="w-full rounded-lg bg-foreground px-4 py-3 text-background"
              >
                Place Bid
              </button>
            </AuctionDetailsFooter>
          </AuctionDetails>
        </div>
      </div>
    </div>
  ),
};

export const RankingsOnly: StoryObj<typeof AuctionLayout> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-lg items-center justify-center">
        <div className="size-full max-h-125 rounded-lg border border-border bg-background shadow-lg">
          <AuctionRankingsContainer className="h-full">
            <div className="flex h-full flex-col">
              <div className="shrink-0 border-b border-border p-4">
                <Text size="3" weight="medium">
                  Leaderboard
                </Text>
                <Text size="1" color="secondary" className="mt-1">
                  Top 20 of 25 bids are winning
                </Text>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                {leaderboardRows.map((row) => (
                  <div key={row.id}>
                    <div
                      className={`flex items-center justify-between px-6 py-3 ${row.isOutbid ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <Text size="1" color="tertiary" className="w-6">
                          #{row.rank}
                        </Text>
                        <div className="size-6 rounded-full bg-muted" />
                        <Text size="2">{row.address}</Text>
                      </div>
                      <div className="flex items-center gap-3">
                        <Text size="2" tabularNums>
                          {row.price}
                        </Text>
                        <Text
                          size="1"
                          color="tertiary"
                          className="w-8 text-right"
                        >
                          {row.timeLabel}
                        </Text>
                      </div>
                    </div>
                    {!row.isLast && <Separator />}
                  </div>
                ))}
              </div>
            </div>
          </AuctionRankingsContainer>
        </div>
      </div>
    </div>
  ),
};
