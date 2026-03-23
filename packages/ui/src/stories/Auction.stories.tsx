import type { Meta, StoryObj } from "@storybook/react";
import { Ranking, Separator, Text } from "@/components";
import {
  Auction,
  AuctionArtwork,
  AuctionBiddingPanel,
  AuctionBidForm,
  AuctionDetails,
  AuctionDetailsBody,
  AuctionDetailsHeader,
  AuctionLayout,
  AuctionRankings,
  AuctionRankingsContainer,
  AuctionStatusTag,
  useAuctionContext,
} from "@/components/blocks/auction";
import type { AuctionData, AuctionUserBid, RankableBid } from "@/types";
import { formatShortRelative } from "@/utils";

// ---------------------------------------------------------------------------
// Artwork constants
// ---------------------------------------------------------------------------

// Multi-edition: Hokusai's "The Great Wave" – a natural fit for a limited edition art print
const EDITION_ARTWORK_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg";
const EDITION_ARTWORK_ALT = "The Great Wave off Kanagawa";

// Single item: MTG Alpha "Time Walk" – a 1-of-1 collectible
const SINGLE_ARTWORK_URL = "/lea-83-time-walk.png";
const SINGLE_ARTWORK_ALT = "LEA-83 Time Walk";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const mockBidders = [
  { id: "0xalice", name: "Alice" },
  { id: "0xbob", name: "Bob" },
  { id: "0xcharlie", name: "Charlie" },
  { id: "0xdiana", name: "Diana" },
  { id: "0xeve", name: "Eve" },
  { id: "0xfrank", name: "Frank" },
  { id: "0xgrace", name: "Grace" },
  { id: "0xhenry", name: "Henry" },
  { id: "0xivy", name: "Ivy" },
  { id: "0xjack", name: "Jack" },
  { id: "0xkate", name: "Kate" },
  { id: "0xleo", name: "Leo" },
  { id: "0xmia", name: "Mia" },
  { id: "0xnathan", name: "Nathan" },
  { id: "0xolivia", name: "Olivia" },
  { id: "0xpeter", name: "Peter" },
  { id: "0xquinn", name: "Quinn" },
  { id: "0xrachel", name: "Rachel" },
  { id: "0xsam", name: "Sam" },
  { id: "0xtina", name: "Tina" },
  { id: "0xuma", name: "Uma" },
  { id: "0xvictor", name: "Victor" },
  { id: "0xwendy", name: "Wendy" },
  { id: "0xxavier", name: "Xavier" },
  { id: "0xyara", name: "Yara" },
  { id: "0xzack", name: "Zack" },
];

function formatPrice(price: bigint) {
  const dollars = Number(price) / 100;
  return dollars.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const dollarFormatters = {
  formatPrice,
  currencySymbol: "$",
  inputDecimals: 2,
};

// ---------------------------------------------------------------------------
// Multi-edition mock data (20 editions of an art print)
// ---------------------------------------------------------------------------

// Dollar auction using cents as the base unit (1 dollar = 100 cents)
const mockAuction: AuctionData = {
  id: "0x1234567890abcdef1234567890abcdef12345678",
  reservePrice: 10000n, // $100 in cents
  opensAt: new Date(Date.now() - 86400000),
  endsAt: new Date(Date.now() + 86400000 * 3),
  maxTotalItems: 20,
  tickConfig: {
    threshold: 100000n, // $1000 in cents
    smallTickSize: 1000n, // $10 in cents
    largeTickSize: 10000n, // $100 in cents
  },
};

const mockBids: RankableBid[] = Array.from({ length: 26 }, (_, i) => ({
  id: String(i + 1),
  price: (50000n - BigInt(i) * 1500n).toString(),
  created_at: new Date(Date.now() - (3600000 + i * 1200000)).toISOString(),
  bidder: mockBidders[i],
}));

// User bid matching bid #9 in the rankings (price $380 = 38000 cents)
const mockUserBids: AuctionUserBid[] = [
  {
    id: "9",
    price: 38000n, // $380 in cents
    createdAt: new Date(Date.now() - 18000000),
    bidder: { id: "0xivy", name: "You" },
    globalBidId: 9n,
    status: "active",
    isWinning: true,
  },
];

// ---------------------------------------------------------------------------
// Single-item mock data (1-of-1 collectible card)
// ---------------------------------------------------------------------------

const mockSingleAuction: AuctionData = {
  id: "0xabcdef1234567890abcdef1234567890abcdef12",
  reservePrice: 50000n, // $500 in cents
  opensAt: new Date(Date.now() - 86400000 * 2),
  endsAt: new Date(Date.now() + 86400000),
  maxTotalItems: 1,
  tickConfig: {
    threshold: 500000n, // $5000 in cents
    smallTickSize: 5000n, // $50 in cents
    largeTickSize: 50000n, // $500 in cents
  },
};

const mockSingleBids: RankableBid[] = [
  {
    id: "s1",
    price: "280000", // $2,800
    created_at: new Date(Date.now() - 1800000).toISOString(),
    bidder: { id: "0xalice", name: "Alice" },
  },
  {
    id: "s2",
    price: "250000", // $2,500
    created_at: new Date(Date.now() - 3600000).toISOString(),
    bidder: { id: "0xbob", name: "Bob" },
  },
  {
    id: "s3",
    price: "220000", // $2,200
    created_at: new Date(Date.now() - 7200000).toISOString(),
    bidder: { id: "0xcharlie", name: "Charlie" },
  },
  {
    id: "s4",
    price: "180000", // $1,800
    created_at: new Date(Date.now() - 14400000).toISOString(),
    bidder: { id: "0xdiana", name: "Diana" },
  },
  {
    id: "s5",
    price: "150000", // $1,500
    created_at: new Date(Date.now() - 21600000).toISOString(),
    bidder: { id: "0xeve", name: "Eve" },
  },
  {
    id: "s6",
    price: "120000", // $1,200
    created_at: new Date(Date.now() - 36000000).toISOString(),
    bidder: { id: "0xfrank", name: "Frank" },
  },
  {
    id: "s7",
    price: "100000", // $1,000
    created_at: new Date(Date.now() - 50400000).toISOString(),
    bidder: { id: "0xgrace", name: "Grace" },
  },
  {
    id: "s8",
    price: "75000", // $750
    created_at: new Date(Date.now() - 64800000).toISOString(),
    bidder: { id: "0xhenry", name: "Henry" },
  },
  {
    id: "s9",
    price: "50000", // $500 (reserve price)
    created_at: new Date(Date.now() - 86400000).toISOString(),
    bidder: { id: "0xivy", name: "Ivy" },
  },
];

// User bid at $2,200 (rank #3) for the SingleItemWithBid story
const mockSingleUserBids: AuctionUserBid[] = [
  {
    id: "s3",
    price: 220000n, // $2,200 in cents
    createdAt: new Date(Date.now() - 7200000),
    bidder: { id: "0xcharlie", name: "You" },
    globalBidId: 3n,
    status: "active",
    isWinning: false,
  },
];

// ---------------------------------------------------------------------------
// Story meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Auction> = {
  title: "Blocks/Auction",
  component: Auction,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

function AuctionStatus() {
  const { auction } = useAuctionContext();
  return (
    <div className="text-xs">
      <AuctionStatusTag
        opensAt={auction.opensAt}
        endsAt={auction.endsAt}
        background="transparent"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Multi-edition stories (20 editions of an art print)
// ---------------------------------------------------------------------------

export const Default: StoryObj<typeof Auction> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
        <Auction
          auction={mockAuction}
          bids={mockBids}
          userBids={[]}
          formatters={dollarFormatters}
          onPlaceBid={async (price, qty) => {
            console.log("Place bid:", price, "cents", qty);
            return true;
          }}
          onTopUpBid={async (bidId, newPrice, value) => {
            console.log("Top up:", bidId, newPrice, "cents", value);
            return true;
          }}
          className="size-full overflow-hidden rounded-lg border border-border bg-background shadow-lg"
        >
          <AuctionLayout>
            <AuctionDetails>
              <AuctionDetailsHeader>
                <AuctionStatus />
                <h2 className="mt-2 text-lg font-semibold">
                  The Great Wave off Kanagawa
                </h2>
                <Text color="secondary">Katsushika Hokusai</Text>
                <AuctionArtwork
                  className="mt-4"
                  src={EDITION_ARTWORK_URL}
                  alt={EDITION_ARTWORK_ALT}
                />
              </AuctionDetailsHeader>
              <AuctionDetailsBody>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Text size="2" color="tertiary">
                      Editions
                    </Text>
                    <Text size="2">20</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text size="2" color="tertiary">
                      Reserve Price
                    </Text>
                    <Text size="2" tabularNums>
                      $100.00
                    </Text>
                  </div>
                  <Separator />
                  <Text size="2" color="secondary">
                    Bid on one of 20 limited edition prints. The top 20 bidders
                    each win an edition.
                  </Text>
                </div>
              </AuctionDetailsBody>
            </AuctionDetails>
            <AuctionRankingsContainer>
              <AuctionRankings />
              <AuctionBiddingPanel>
                <AuctionBidForm.Root />
              </AuctionBiddingPanel>
            </AuctionRankingsContainer>
          </AuctionLayout>
        </Auction>
      </div>
    </div>
  ),
};

export const WithTopUp: StoryObj<typeof Auction> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
        <Auction
          auction={mockAuction}
          bids={mockBids}
          userBids={mockUserBids}
          formatters={dollarFormatters}
          onPlaceBid={async (price, qty) => {
            console.log("Place bid:", price, "cents", qty);
            return true;
          }}
          onTopUpBid={async (bidId, newPrice, value) => {
            console.log("Top up:", bidId, newPrice, "cents", value);
            return true;
          }}
          className="size-full overflow-hidden rounded-lg border border-border bg-background shadow-lg"
        >
          <AuctionLayout>
            <AuctionDetails>
              <AuctionDetailsHeader>
                <AuctionStatus />
                <h2 className="mt-2 text-lg font-semibold">
                  The Great Wave off Kanagawa
                </h2>
                <Text color="secondary">Katsushika Hokusai</Text>
                <AuctionArtwork
                  className="mt-4"
                  src={EDITION_ARTWORK_URL}
                  alt={EDITION_ARTWORK_ALT}
                />
              </AuctionDetailsHeader>
              <AuctionDetailsBody>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Text size="2" color="tertiary">
                      Editions
                    </Text>
                    <Text size="2">20</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text size="2" color="tertiary">
                      Reserve Price
                    </Text>
                    <Text size="2" tabularNums>
                      $100.00
                    </Text>
                  </div>
                  <Separator />
                  <Text size="2" color="secondary">
                    Bid on one of 20 limited edition prints. The top 20 bidders
                    each win an edition.
                  </Text>
                </div>
              </AuctionDetailsBody>
            </AuctionDetails>
            <AuctionRankingsContainer>
              <AuctionRankings />
              <AuctionBiddingPanel>
                <AuctionBidForm.Root />
              </AuctionBiddingPanel>
            </AuctionRankingsContainer>
          </AuctionLayout>
        </Auction>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Single-item stories (1-of-1 collectible)
// ---------------------------------------------------------------------------

interface SingleItemBid {
  id: string;
  name: string;
  price: string;
  time: string;
}

const singleItemBids: SingleItemBid[] = mockSingleBids.map((b) => ({
  id: b.id,
  name: b.bidder?.name || `${b.bidder?.id.slice(0, 6)}...`,
  price: formatPrice(BigInt(b.price)),
  time: formatShortRelative(new Date(b.created_at)),
}));

/**
 * Renders a preview slot in the Ranking component that shows where the user's
 * current bid (from the bid form) would land. Reads bidValue/showBidPreview
 * from the auction context so it updates live as the user adjusts the input.
 */
function BidPreviewSlot() {
  const {
    bidValue,
    minBidValue,
    showBidPreview,
    isBiddingActive,
    formatPrice: ctxFormatPrice,
    currencySymbol,
    getProjectedRank,
  } = useAuctionContext();

  if (!isBiddingActive || !showBidPreview || bidValue < minBidValue)
    return null;

  const { rank } = getProjectedRank(bidValue);
  const atIndex = rank ? rank - 1 : 0;

  return (
    <Ranking.Slot slotKey="bid-preview" atIndex={atIndex}>
      {(ctx) => (
        <>
          <div className="relative">
            <div className="absolute inset-0 animate-[pulse_2s_ease-in-out_infinite] bg-success/10" />
            <div className="relative flex items-center justify-between gap-2 px-6 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <Text color="tertiary" className="w-8 shrink-0" size="2">
                  #{ctx.rank}
                </Text>
                <Text color="secondary" size="3" weight="medium">
                  Your bid
                </Text>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Text tabularNums size="3" weight="medium">
                  {ctxFormatPrice(bidValue)} {currencySymbol}
                </Text>
                <span className="min-w-9" />
              </div>
            </div>
          </div>
          {!ctx.isLastInGroup && <Separator />}
        </>
      )}
    </Ranking.Slot>
  );
}

function SingleItemContent({ userBids }: { userBids: AuctionUserBid[] }) {
  return (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-center">
        <Auction
          auction={mockSingleAuction}
          bids={mockSingleBids}
          userBids={userBids}
          formatters={dollarFormatters}
          onPlaceBid={async (price, qty) => {
            console.log("Place bid:", price, "cents", qty);
            return true;
          }}
          onTopUpBid={async (bidId, newPrice, value) => {
            console.log("Top up:", bidId, newPrice, "cents", value);
            return true;
          }}
          className="flex h-full max-h-180 w-full overflow-hidden rounded-lg border border-border bg-background shadow-lg"
        >
          <div className="hidden min-w-0 flex-1 flex-col gap-6 p-6 lg:flex">
            <div className="shrink-0">
              <AuctionStatus />
              <h2 className="mt-2 text-lg font-semibold">Time Walk</h2>
              <Text color="secondary">
                Magic: The Gathering &middot; Alpha Edition
              </Text>
            </div>
            <AuctionArtwork
              className="min-h-0 flex-1"
              src={SINGLE_ARTWORK_URL}
              alt={SINGLE_ARTWORK_ALT}
            />
            <div className="shrink-0 space-y-2 border-t border-border pt-6">
              <div className="flex justify-between">
                <Text size="2" color="tertiary">
                  Edition
                </Text>
                <Text size="2">1 of 1</Text>
              </div>
              <div className="flex justify-between">
                <Text size="2" color="tertiary">
                  Reserve Price
                </Text>
                <Text size="2" tabularNums>
                  $500.00
                </Text>
              </div>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col lg:border-l lg:border-border">
            <div className="min-h-0 flex-1 overflow-y-auto">
              <Ranking.Root items={singleItemBids} getKey={(bid) => bid.id}>
                <BidPreviewSlot />
                <Ranking.Group>
                  <Ranking.GroupItem>
                    <Ranking.GroupItemValue>
                      {(bid: SingleItemBid, ctx) => {
                        const isHighest = ctx.globalIndex === 0;
                        return (
                          <>
                            <div
                              className={`flex items-center justify-between gap-2 px-6 ${
                                isHighest ? "py-4" : "py-2 opacity-50"
                              }`}
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <Text
                                  color="tertiary"
                                  className="w-8 shrink-0"
                                  size={isHighest ? "2" : "1"}
                                >
                                  #{ctx.globalIndex + 1}
                                </Text>
                                <Text
                                  className="truncate"
                                  size={isHighest ? "3" : undefined}
                                  weight={isHighest ? "medium" : undefined}
                                >
                                  {bid.name}
                                </Text>
                              </div>
                              <div className="flex shrink-0 items-center gap-3">
                                <Text
                                  tabularNums
                                  size={isHighest ? "3" : undefined}
                                  weight={isHighest ? "medium" : undefined}
                                >
                                  {bid.price} $
                                </Text>
                                <Text
                                  size="1"
                                  color="tertiary"
                                  className="min-w-9 text-right"
                                >
                                  {bid.time}
                                </Text>
                              </div>
                            </div>
                            {!ctx.isLastInGroup && <Separator />}
                          </>
                        );
                      }}
                    </Ranking.GroupItemValue>
                  </Ranking.GroupItem>
                </Ranking.Group>
              </Ranking.Root>
            </div>
            <AuctionBiddingPanel>
              <AuctionBidForm.Root />
            </AuctionBiddingPanel>
          </div>
        </Auction>
      </div>
    </div>
  );
}

export const SingleItem: StoryObj<typeof Auction> = {
  render: () => <SingleItemContent userBids={[]} />,
};

export const SingleItemWithBid: StoryObj<typeof Auction> = {
  render: () => <SingleItemContent userBids={mockSingleUserBids} />,
};
