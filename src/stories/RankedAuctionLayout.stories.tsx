import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/components/primitives/Separator";
import { Text } from "@/components/primitives/Text";
import {
  RankedAuctionDetails,
  RankedAuctionDetailsBody,
  RankedAuctionDetailsFooter,
  RankedAuctionDetailsHeader,
  RankedAuctionLayout,
  RankedAuctionRankingsContainer,
} from "@/components/ranked-auction/RankedAuctionLayout";

const meta: Meta<typeof RankedAuctionLayout> = {
  title: "Trading UI/RankedAuction/Layout",
  component: RankedAuctionLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof RankedAuctionLayout> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
        <div className="size-full rounded-lg border border-border bg-background shadow-lg">
          <RankedAuctionLayout>
            <RankedAuctionDetails>
              <RankedAuctionDetailsHeader>
                <Text size="4" weight="medium">
                  Auction Details Header
                </Text>
                <Text size="2" color="secondary" className="mt-1">
                  This is the header section with auction info
                </Text>
              </RankedAuctionDetailsHeader>
              <RankedAuctionDetailsBody>
                <Text size="2" color="tertiary">
                  Body content goes here. This area is scrollable when content
                  overflows.
                </Text>
              </RankedAuctionDetailsBody>
              <RankedAuctionDetailsFooter>
                <Text size="2">Footer with bid form</Text>
              </RankedAuctionDetailsFooter>
            </RankedAuctionDetails>
            <RankedAuctionRankingsContainer>
              <div className="p-6">
                <Text size="3" weight="medium">
                  Rankings
                </Text>
                <Text size="2" color="secondary" className="mt-1">
                  Bid rankings appear here
                </Text>
              </div>
            </RankedAuctionRankingsContainer>
          </RankedAuctionLayout>
        </div>
      </div>
    </div>
  ),
};

export const WithScrollableBody: StoryObj<typeof RankedAuctionLayout> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
        <div className="size-full rounded-lg border border-border bg-background shadow-lg">
          <RankedAuctionLayout height="600px">
            <RankedAuctionDetails>
              <RankedAuctionDetailsHeader>
                <Text size="4" weight="medium">
                  Your Bids
                </Text>
              </RankedAuctionDetailsHeader>
              <RankedAuctionDetailsBody>
                <div className="space-y-4">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-muted p-4"
                    >
                      <div className="flex justify-between">
                        <Text size="1" color="tertiary">
                          Rank #{i + 1}
                        </Text>
                        <Text size="1" color="tertiary" tabularNums>
                          {new Date(
                            Date.now() - i * 3600000,
                          ).toLocaleTimeString()}
                        </Text>
                      </div>
                      <Text size="2" className="mt-2" tabularNums>
                        {(0.5 - i * 0.02).toFixed(3)} ETH
                      </Text>
                    </div>
                  ))}
                </div>
              </RankedAuctionDetailsBody>
              <RankedAuctionDetailsFooter>
                <div className="rounded-lg border border-border p-4">
                  <Text size="2">Bid Form Placeholder</Text>
                </div>
              </RankedAuctionDetailsFooter>
            </RankedAuctionDetails>
            <RankedAuctionRankingsContainer>
              <div className="flex h-full flex-col">
                <div className="shrink-0 border-b border-border p-4">
                  <Text size="3" weight="medium">
                    All Rankings
                  </Text>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  {Array.from({ length: 25 }, (_, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between px-6 py-3">
                        <div className="flex items-center gap-3">
                          <Text size="1" color="tertiary" className="w-6">
                            #{i + 1}
                          </Text>
                          <div className="size-6 rounded-full bg-muted" />
                          <Text size="2">Bidder {i + 1}</Text>
                        </div>
                        <Text size="2" tabularNums>
                          {(0.5 - i * 0.015).toFixed(3)} ETH
                        </Text>
                      </div>
                      {i < 24 && <Separator />}
                    </div>
                  ))}
                </div>
              </div>
            </RankedAuctionRankingsContainer>
          </RankedAuctionLayout>
        </div>
      </div>
    </div>
  ),
};

export const CustomHeight: StoryObj<typeof RankedAuctionLayout> = {
  render: () => (
    <div className="w-full bg-muted p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-border bg-background shadow-lg">
          <RankedAuctionLayout height={400}>
            <RankedAuctionDetails>
              <RankedAuctionDetailsHeader>
                <Text size="3" weight="medium">
                  Compact Layout
                </Text>
              </RankedAuctionDetailsHeader>
              <RankedAuctionDetailsBody>
                <Text size="2" color="secondary">
                  This layout has a fixed height of 400px
                </Text>
              </RankedAuctionDetailsBody>
              <RankedAuctionDetailsFooter>
                <Text size="1" color="tertiary">
                  Footer
                </Text>
              </RankedAuctionDetailsFooter>
            </RankedAuctionDetails>
            <RankedAuctionRankingsContainer>
              <div className="flex h-full items-center justify-center">
                <Text size="2" color="tertiary">
                  Rankings Panel
                </Text>
              </div>
            </RankedAuctionRankingsContainer>
          </RankedAuctionLayout>
        </div>
      </div>
    </div>
  ),
};

export const DetailsOnly: StoryObj<typeof RankedAuctionLayout> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-md items-center justify-center">
        <div className="size-full max-h-[600px] rounded-lg border border-border bg-background shadow-lg">
          <RankedAuctionDetails className="h-full">
            <RankedAuctionDetailsHeader>
              <Text size="4" weight="medium">
                Auction #1234
              </Text>
              <Text size="2" color="secondary" className="mt-1">
                Live - 2h 30m remaining
              </Text>
            </RankedAuctionDetailsHeader>
            <RankedAuctionDetailsBody>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Text size="2" color="tertiary">
                    Reserve Price
                  </Text>
                  <Text size="2" tabularNums>
                    0.01 ETH
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
                    0.05 ETH
                  </Text>
                </div>
                <Separator />
                <Text size="2" color="secondary">
                  Bid on one of 20 curated editions. Top 20 bidders win and pay
                  the lowest winning bid.
                </Text>
              </div>
            </RankedAuctionDetailsBody>
            <RankedAuctionDetailsFooter>
              <button
                type="button"
                className="w-full rounded-lg bg-foreground px-4 py-3 text-background"
              >
                Place Bid
              </button>
            </RankedAuctionDetailsFooter>
          </RankedAuctionDetails>
        </div>
      </div>
    </div>
  ),
};

export const RankingsOnly: StoryObj<typeof RankedAuctionLayout> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-lg items-center justify-center">
        <div className="size-full max-h-[500px] rounded-lg border border-border bg-background shadow-lg">
          <RankedAuctionRankingsContainer className="h-full">
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
                {Array.from({ length: 25 }, (_, i) => (
                  <div key={i}>
                    <div
                      className={`flex items-center justify-between px-6 py-3 ${i >= 20 ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <Text size="1" color="tertiary" className="w-6">
                          #{i + 1}
                        </Text>
                        <div className="size-6 rounded-full bg-muted" />
                        <Text size="2">
                          0x{(i + 1).toString(16).padStart(4, "0")}...
                        </Text>
                      </div>
                      <div className="flex items-center gap-3">
                        <Text size="2" tabularNums>
                          {(0.5 - i * 0.015).toFixed(3)} ETH
                        </Text>
                        <Text
                          size="1"
                          color="tertiary"
                          className="w-8 text-right"
                        >
                          {i + 1}h
                        </Text>
                      </div>
                    </div>
                    {i < 24 && <Separator />}
                  </div>
                ))}
              </div>
            </div>
          </RankedAuctionRankingsContainer>
        </div>
      </div>
    </div>
  ),
};
