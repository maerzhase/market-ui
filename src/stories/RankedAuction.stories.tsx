import type { Meta, StoryObj } from "@storybook/react";
import {
  RankedAuction,
  RankedAuctionBidForm,
  RankedAuctionDetails,
  RankedAuctionDetailsBody,
  RankedAuctionDetailsFooter,
  RankedAuctionDetailsHeader,
  RankedAuctionInfo,
  RankedAuctionLayout,
  RankedAuctionRankings,
  RankedAuctionRankingsContainer,
  RankedAuctionYourBids,
} from "@/components/ranked-auction";
import type {
  RankableBid,
  RankedAuctionData,
  RankedAuctionUserBid,
} from "@/types";

const mockAuction: RankedAuctionData = {
  id: "0x1234567890abcdef1234567890abcdef12345678",
  reservePrice: 10000000000000000n,
  opensAt: new Date(Date.now() - 86400000),
  endsAt: new Date(Date.now() + 86400000 * 3),
  maxTotalItems: 20,
  tickConfig: {
    threshold: 100000000000000000n,
    smallTickSize: 1000000000000000n,
    largeTickSize: 10000000000000000n,
  },
};

const mockBids: RankableBid[] = [
  {
    id: "1",
    price: "500000000000000000",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    price: "450000000000000000",
    created_at: new Date(Date.now() - 4000000).toISOString(),
  },
  {
    id: "3",
    price: "400000000000000000",
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "4",
    price: "350000000000000000",
    created_at: new Date(Date.now() - 8000000).toISOString(),
  },
  {
    id: "5",
    price: "300000000000000000",
    created_at: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "6",
    price: "280000000000000000",
    created_at: new Date(Date.now() - 12000000).toISOString(),
  },
  {
    id: "7",
    price: "250000000000000000",
    created_at: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: "8",
    price: "230000000000000000",
    created_at: new Date(Date.now() - 15000000).toISOString(),
  },
  {
    id: "9",
    price: "200000000000000000",
    created_at: new Date(Date.now() - 18000000).toISOString(),
  },
  {
    id: "10",
    price: "180000000000000000",
    created_at: new Date(Date.now() - 19000000).toISOString(),
  },
  {
    id: "11",
    price: "150000000000000000",
    created_at: new Date(Date.now() - 21600000).toISOString(),
  },
  {
    id: "12",
    price: "130000000000000000",
    created_at: new Date(Date.now() - 23000000).toISOString(),
  },
  {
    id: "13",
    price: "100000000000000000",
    created_at: new Date(Date.now() - 25200000).toISOString(),
  },
  {
    id: "14",
    price: "90000000000000000",
    created_at: new Date(Date.now() - 26000000).toISOString(),
  },
  {
    id: "15",
    price: "80000000000000000",
    created_at: new Date(Date.now() - 27000000).toISOString(),
  },
  {
    id: "16",
    price: "70000000000000000",
    created_at: new Date(Date.now() - 28000000).toISOString(),
  },
  {
    id: "17",
    price: "60000000000000000",
    created_at: new Date(Date.now() - 29000000).toISOString(),
  },
  {
    id: "18",
    price: "50000000000000000",
    created_at: new Date(Date.now() - 30000000).toISOString(),
  },
  {
    id: "19",
    price: "40000000000000000",
    created_at: new Date(Date.now() - 31000000).toISOString(),
  },
  {
    id: "20",
    price: "30000000000000000",
    created_at: new Date(Date.now() - 32000000).toISOString(),
  },
  {
    id: "21",
    price: "25000000000000000",
    created_at: new Date(Date.now() - 33000000).toISOString(),
  },
  {
    id: "22",
    price: "20000000000000000",
    created_at: new Date(Date.now() - 34000000).toISOString(),
  },
  {
    id: "23",
    price: "15000000000000000",
    created_at: new Date(Date.now() - 35000000).toISOString(),
  },
  {
    id: "24",
    price: "12000000000000000",
    created_at: new Date(Date.now() - 36000000).toISOString(),
  },
  {
    id: "25",
    price: "12000000000000000",
    created_at: new Date(Date.now() - 36000000).toISOString(),
  },
  {
    id: "26",
    price: "12000000000000000",
    created_at: new Date(Date.now() - 36000000).toISOString(),
  },
];

const mockUserBids: RankedAuctionUserBid[] = [
  {
    id: "user-1",
    price: 200000000000000000n,
    createdAt: new Date(Date.now() - 18000000),
    bidder: { id: "0xuser1", name: "You" },
    globalBidId: 1n,
    status: "active",
    isWinning: true,
  },
];

const meta: Meta<typeof RankedAuction> = {
  title: "Trading UI/RankedAuction",
  component: RankedAuction,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const FullAuction: StoryObj<typeof RankedAuction> = {
  render: () => (
    <div className="h-screen w-full bg-muted p-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
        <RankedAuction
          auction={mockAuction}
          bids={mockBids}
          userBids={mockUserBids}
          onPlaceBid={async (price, qty) => {
            console.log("Place bid:", price, qty);
            return true;
          }}
          onTopUpBid={async (bidId, newPrice, value) => {
            console.log("Top up:", bidId, newPrice, value);
            return true;
          }}
          onClaimEdition={async (bidId) => {
            console.log("Claim:", bidId);
            return true;
          }}
          className="size-full rounded-lg border border-border bg-background shadow-lg"
        >
          <RankedAuctionLayout>
            <RankedAuctionDetails>
              <RankedAuctionDetailsHeader>
                <RankedAuctionInfo />
              </RankedAuctionDetailsHeader>
              <RankedAuctionDetailsBody>
                <RankedAuctionYourBids />
              </RankedAuctionDetailsBody>
              <RankedAuctionDetailsFooter>
                <RankedAuctionBidForm.Suggestions />
                <RankedAuctionBidForm.Root />
              </RankedAuctionDetailsFooter>
            </RankedAuctionDetails>
            <RankedAuctionRankingsContainer>
              <RankedAuctionRankings />
            </RankedAuctionRankingsContainer>
          </RankedAuctionLayout>
        </RankedAuction>
      </div>
    </div>
  ),
};

export const LiveAuction: StoryObj<typeof RankedAuction> = {
  render: () => {
    const liveAuction: RankedAuctionData = {
      ...mockAuction,
      endsAt: new Date(Date.now() + 3600000),
    };
    return (
      <div className="h-screen w-full bg-muted p-8">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
          <RankedAuction
            auction={liveAuction}
            bids={mockBids}
            userBids={[]}
            onPlaceBid={async (price, qty) => {
              console.log("Place bid:", price, qty);
              return true;
            }}
            onTopUpBid={async (bidId, newPrice, value) => {
              console.log("Top up:", bidId, newPrice, value);
              return true;
            }}
            className="size-full rounded-lg border border-border bg-background shadow-lg"
          >
            <RankedAuctionLayout>
              <RankedAuctionDetails>
                <RankedAuctionDetailsHeader>
                  <RankedAuctionInfo />
                </RankedAuctionDetailsHeader>
                <RankedAuctionDetailsBody>
                  <div />
                </RankedAuctionDetailsBody>
                <RankedAuctionDetailsFooter>
                  <RankedAuctionBidForm.Suggestions />
                  <RankedAuctionBidForm.Root />
                </RankedAuctionDetailsFooter>
              </RankedAuctionDetails>
              <RankedAuctionRankingsContainer>
                <RankedAuctionRankings />
              </RankedAuctionRankingsContainer>
            </RankedAuctionLayout>
          </RankedAuction>
        </div>
      </div>
    );
  },
};

export const ClosedAuction: StoryObj<typeof RankedAuction> = {
  render: () => {
    const closedAuction: RankedAuctionData = {
      ...mockAuction,
      opensAt: new Date(Date.now() - 86400000 * 5),
      endsAt: new Date(Date.now() - 86400000),
      clearingPrice: 100000000000000000n,
    };
    return (
      <div className="h-screen w-full bg-muted p-8">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
          <RankedAuction
            auction={closedAuction}
            bids={mockBids}
            userBids={[]}
            onPlaceBid={async () => false}
            onTopUpBid={async () => false}
            className="size-full rounded-lg border border-border bg-background shadow-lg"
          >
            <RankedAuctionLayout>
              <RankedAuctionDetails>
                <RankedAuctionDetailsHeader>
                  <RankedAuctionInfo />
                </RankedAuctionDetailsHeader>
                <RankedAuctionDetailsBody>
                  <div />
                </RankedAuctionDetailsBody>
                <RankedAuctionDetailsFooter>
                  <RankedAuctionBidForm.Suggestions />
                  <RankedAuctionBidForm.Root />
                </RankedAuctionDetailsFooter>
              </RankedAuctionDetails>
              <RankedAuctionRankingsContainer>
                <RankedAuctionRankings />
              </RankedAuctionRankingsContainer>
            </RankedAuctionLayout>
          </RankedAuction>
        </div>
      </div>
    );
  },
};

export const DollarAuction: StoryObj<typeof RankedAuction> = {
  render: () => {
    // Dollar auction using cents as the base unit (1 dollar = 100 cents)
    // - reservePrice: 10000 cents = $100 minimum bid
    // - threshold: 100000 cents = $1000 (tick size changes above this)
    // - smallTickSize: 1000 cents = $10 increments below $1000
    // - largeTickSize: 10000 cents = $100 increments above $1000
    const dollarAuction: RankedAuctionData = {
      ...mockAuction,
      reservePrice: 10000n, // $100 in cents
      tickConfig: {
        threshold: 100000n, // $1000 in cents
        smallTickSize: 1000n, // $10 in cents
        largeTickSize: 10000n, // $100 in cents
      },
    };
    // Convert ETH bids to dollar amounts (scale down for realistic values)
    const dollarBids: RankableBid[] = mockBids.map((b, i) => ({
      ...b,
      // Generate bids from ~$500 down to ~$100
      price: (50000n - BigInt(i) * 1500n).toString(),
    }));
    // Format cents as dollars
    const formatPrice = (price: bigint) => {
      const dollars = Number(price) / 100;
      return dollars.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };
    return (
      <div className="h-screen w-full bg-muted p-8">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
          <RankedAuction
            auction={dollarAuction}
            bids={dollarBids}
            userBids={[]}
            formatters={{
              formatPrice: formatPrice,
              currencySymbol: "$",
            }}
            onPlaceBid={async (price, qty) => {
              console.log("Place bid:", price, "cents", qty);
              return true;
            }}
            onTopUpBid={async (bidId, newPrice, value) => {
              console.log("Top up:", bidId, newPrice, "cents", value);
              return true;
            }}
            className="size-full rounded-lg border border-border bg-background shadow-lg"
          >
            <RankedAuctionLayout>
              <RankedAuctionDetails>
                <RankedAuctionDetailsHeader>
                  <RankedAuctionInfo />
                </RankedAuctionDetailsHeader>
                <RankedAuctionDetailsBody>
                  <div />
                </RankedAuctionDetailsBody>
                <RankedAuctionDetailsFooter>
                  <RankedAuctionBidForm.Suggestions />
                  <RankedAuctionBidForm.Root />
                </RankedAuctionDetailsFooter>
              </RankedAuctionDetails>
              <RankedAuctionRankingsContainer>
                <RankedAuctionRankings />
              </RankedAuctionRankingsContainer>
            </RankedAuctionLayout>
          </RankedAuction>
        </div>
      </div>
    );
  },
};
