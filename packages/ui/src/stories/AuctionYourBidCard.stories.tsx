import type { Meta, StoryObj } from "@storybook/react";
import { AuctionYourBidCard } from "@/components/blocks/auction/AuctionYourBidCard";
import type { AuctionUserBid } from "@/types";

const formatPrice = (priceValue: bigint) => {
  const val = Number(priceValue) / 1e18;
  return val.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
};

const mockWinningBid: AuctionUserBid = {
  id: "bid-1",
  price: 500000000000000000n,
  createdAt: new Date(Date.now() - 3600000),
  bidder: { id: "0x1234", name: "You" },
  globalBidId: 1n,
  status: "active",
  isWinning: true,
};

const mockOutbidBid: AuctionUserBid = {
  id: "bid-2",
  price: 100000000000000000n,
  createdAt: new Date(Date.now() - 7200000),
  bidder: { id: "0x1234", name: "You" },
  globalBidId: 2n,
  status: "active",
  isWinning: false,
};

const mockClaimedBid: AuctionUserBid = {
  id: "bid-3",
  price: 300000000000000000n,
  createdAt: new Date(Date.now() - 86400000),
  bidder: { id: "0x1234", name: "You" },
  globalBidId: 3n,
  status: "claimed",
  isWinning: true,
  claimedAt: new Date(Date.now() - 3600000),
};

const mockRefundedBid: AuctionUserBid = {
  id: "bid-4",
  price: 50000000000000000n,
  createdAt: new Date(Date.now() - 172800000),
  bidder: { id: "0x1234", name: "You" },
  globalBidId: 4n,
  status: "refunded",
  isWinning: false,
};

const getRankForBid = (bidId: string) => {
  const ranks: Record<string, number> = {
    "bid-1": 3,
    "bid-2": 25,
    "bid-3": 5,
    "bid-4": 30,
  };
  return ranks[bidId] ?? null;
};

const meta: Meta<typeof AuctionYourBidCard> = {
  title: "Blocks/Auction/YourBidCard",
  component: AuctionYourBidCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Winning: StoryObj<typeof AuctionYourBidCard> = {
  args: {
    bid: mockWinningBid,
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceValue) =>
      console.log("Lock for top-up:", bidId, priceValue),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: false,
    formatPrice,
    currencySymbol: "USD",
  },
};

export const Outbid: StoryObj<typeof AuctionYourBidCard> = {
  args: {
    bid: mockOutbidBid,
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceValue) =>
      console.log("Lock for top-up:", bidId, priceValue),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: false,
    formatPrice,
    currencySymbol: "USD",
  },
};

export const Claimed: StoryObj<typeof AuctionYourBidCard> = {
  args: {
    bid: mockClaimedBid,
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceValue) =>
      console.log("Lock for top-up:", bidId, priceValue),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: true,
    formatPrice,
    currencySymbol: "USD",
  },
};

export const Refunded: StoryObj<typeof AuctionYourBidCard> = {
  args: {
    bid: mockRefundedBid,
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceValue) =>
      console.log("Lock for top-up:", bidId, priceValue),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: true,
    formatPrice,
    currencySymbol: "USD",
  },
};

export const LockedForTopUp: StoryObj<typeof AuctionYourBidCard> = {
  args: {
    bid: mockWinningBid,
    getRankForBid,
    lockedBidId: 1n,
    onLockForTopUp: (bidId, priceValue) =>
      console.log("Lock for top-up:", bidId, priceValue),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: false,
    formatPrice,
    currencySymbol: "USD",
  },
};

export const WithClaimButton: StoryObj<typeof AuctionYourBidCard> = {
  args: {
    bid: { ...mockWinningBid, status: "active" },
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceValue) =>
      console.log("Lock for top-up:", bidId, priceValue),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: true,
    onClaim: async (bidId) => {
      console.log("Claim edition:", bidId);
      return true;
    },
    formatPrice,
    currencySymbol: "USD",
  },
};

export const AllStates: StoryObj<typeof AuctionYourBidCard> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Winning bid</p>
        <AuctionYourBidCard
          bid={mockWinningBid}
          getRankForBid={getRankForBid}
          lockedBidId={null}
          onLockForTopUp={(bidId, priceValue) =>
            console.log("Lock for top-up:", bidId, priceValue)
          }
          onCancelTopUp={() => console.log("Cancel top-up")}
          isAuctionEnded={false}
          formatPrice={formatPrice}
          currencySymbol="USD"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Outbid</p>
        <AuctionYourBidCard
          bid={mockOutbidBid}
          getRankForBid={getRankForBid}
          lockedBidId={null}
          onLockForTopUp={(bidId, priceValue) =>
            console.log("Lock for top-up:", bidId, priceValue)
          }
          onCancelTopUp={() => console.log("Cancel top-up")}
          isAuctionEnded={false}
          formatPrice={formatPrice}
          currencySymbol="USD"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Claimed</p>
        <AuctionYourBidCard
          bid={mockClaimedBid}
          getRankForBid={getRankForBid}
          lockedBidId={null}
          onLockForTopUp={(bidId, priceValue) =>
            console.log("Lock for top-up:", bidId, priceValue)
          }
          onCancelTopUp={() => console.log("Cancel top-up")}
          isAuctionEnded={true}
          formatPrice={formatPrice}
          currencySymbol="USD"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Refunded</p>
        <AuctionYourBidCard
          bid={mockRefundedBid}
          getRankForBid={getRankForBid}
          lockedBidId={null}
          onLockForTopUp={(bidId, priceValue) =>
            console.log("Lock for top-up:", bidId, priceValue)
          }
          onCancelTopUp={() => console.log("Cancel top-up")}
          isAuctionEnded={true}
          formatPrice={formatPrice}
          currencySymbol="USD"
        />
      </div>
    </div>
  ),
};

export const DollarCurrency: StoryObj<typeof AuctionYourBidCard> = {
  args: {
    bid: {
      ...mockWinningBid,
      price: 50000000n,
    },
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceValue) =>
      console.log("Lock for top-up:", bidId, priceValue),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: false,
    formatPrice: (priceValue: bigint) => {
      const usd = Number(priceValue) / 1e6;
      return usd.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    currencySymbol: "$",
  },
};
