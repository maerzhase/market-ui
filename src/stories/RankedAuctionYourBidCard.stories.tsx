import type { Meta, StoryObj } from "@storybook/react";
import { RankedAuctionYourBidCard } from "@/components/blocks/ranked-auction/RankedAuctionYourBidCard";
import type { RankedAuctionUserBid } from "@/types";

const formatPrice = (priceWei: bigint) => {
  const eth = Number(priceWei) / 1e18;
  return eth.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
};

const mockWinningBid: RankedAuctionUserBid = {
  id: "bid-1",
  price: 500000000000000000n,
  createdAt: new Date(Date.now() - 3600000),
  bidder: { id: "0x1234", name: "You" },
  globalBidId: 1n,
  status: "active",
  isWinning: true,
};

const mockOutbidBid: RankedAuctionUserBid = {
  id: "bid-2",
  price: 100000000000000000n,
  createdAt: new Date(Date.now() - 7200000),
  bidder: { id: "0x1234", name: "You" },
  globalBidId: 2n,
  status: "active",
  isWinning: false,
};

const mockClaimedBid: RankedAuctionUserBid = {
  id: "bid-3",
  price: 300000000000000000n,
  createdAt: new Date(Date.now() - 86400000),
  bidder: { id: "0x1234", name: "You" },
  globalBidId: 3n,
  status: "claimed",
  isWinning: true,
  claimedAt: new Date(Date.now() - 3600000),
};

const mockRefundedBid: RankedAuctionUserBid = {
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

const meta: Meta<typeof RankedAuctionYourBidCard> = {
  title: "Blocks/RankedAuction/YourBidCard",
  component: RankedAuctionYourBidCard,
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

export const Winning: StoryObj<typeof RankedAuctionYourBidCard> = {
  args: {
    bid: mockWinningBid,
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceWei) =>
      console.log("Lock for top-up:", bidId, priceWei),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: false,
    formatPrice,
    currencySymbol: "ETH",
  },
};

export const Outbid: StoryObj<typeof RankedAuctionYourBidCard> = {
  args: {
    bid: mockOutbidBid,
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceWei) =>
      console.log("Lock for top-up:", bidId, priceWei),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: false,
    formatPrice,
    currencySymbol: "ETH",
  },
};

export const Claimed: StoryObj<typeof RankedAuctionYourBidCard> = {
  args: {
    bid: mockClaimedBid,
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceWei) =>
      console.log("Lock for top-up:", bidId, priceWei),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: true,
    formatPrice,
    currencySymbol: "ETH",
  },
};

export const Refunded: StoryObj<typeof RankedAuctionYourBidCard> = {
  args: {
    bid: mockRefundedBid,
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceWei) =>
      console.log("Lock for top-up:", bidId, priceWei),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: true,
    formatPrice,
    currencySymbol: "ETH",
  },
};

export const LockedForTopUp: StoryObj<typeof RankedAuctionYourBidCard> = {
  args: {
    bid: mockWinningBid,
    getRankForBid,
    lockedBidId: 1n,
    onLockForTopUp: (bidId, priceWei) =>
      console.log("Lock for top-up:", bidId, priceWei),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: false,
    formatPrice,
    currencySymbol: "ETH",
  },
};

export const WithClaimButton: StoryObj<typeof RankedAuctionYourBidCard> = {
  args: {
    bid: { ...mockWinningBid, status: "active" },
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceWei) =>
      console.log("Lock for top-up:", bidId, priceWei),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: true,
    onClaim: async (bidId) => {
      console.log("Claim edition:", bidId);
      return true;
    },
    formatPrice,
    currencySymbol: "ETH",
  },
};

export const AllStates: StoryObj<typeof RankedAuctionYourBidCard> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Winning bid</p>
        <RankedAuctionYourBidCard
          bid={mockWinningBid}
          getRankForBid={getRankForBid}
          lockedBidId={null}
          onLockForTopUp={(bidId, priceWei) =>
            console.log("Lock for top-up:", bidId, priceWei)
          }
          onCancelTopUp={() => console.log("Cancel top-up")}
          isAuctionEnded={false}
          formatPrice={formatPrice}
          currencySymbol="ETH"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Outbid</p>
        <RankedAuctionYourBidCard
          bid={mockOutbidBid}
          getRankForBid={getRankForBid}
          lockedBidId={null}
          onLockForTopUp={(bidId, priceWei) =>
            console.log("Lock for top-up:", bidId, priceWei)
          }
          onCancelTopUp={() => console.log("Cancel top-up")}
          isAuctionEnded={false}
          formatPrice={formatPrice}
          currencySymbol="ETH"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Claimed</p>
        <RankedAuctionYourBidCard
          bid={mockClaimedBid}
          getRankForBid={getRankForBid}
          lockedBidId={null}
          onLockForTopUp={(bidId, priceWei) =>
            console.log("Lock for top-up:", bidId, priceWei)
          }
          onCancelTopUp={() => console.log("Cancel top-up")}
          isAuctionEnded={true}
          formatPrice={formatPrice}
          currencySymbol="ETH"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Refunded</p>
        <RankedAuctionYourBidCard
          bid={mockRefundedBid}
          getRankForBid={getRankForBid}
          lockedBidId={null}
          onLockForTopUp={(bidId, priceWei) =>
            console.log("Lock for top-up:", bidId, priceWei)
          }
          onCancelTopUp={() => console.log("Cancel top-up")}
          isAuctionEnded={true}
          formatPrice={formatPrice}
          currencySymbol="ETH"
        />
      </div>
    </div>
  ),
};

export const DollarCurrency: StoryObj<typeof RankedAuctionYourBidCard> = {
  args: {
    bid: {
      ...mockWinningBid,
      price: 50000000n,
    },
    getRankForBid,
    lockedBidId: null,
    onLockForTopUp: (bidId, priceWei) =>
      console.log("Lock for top-up:", bidId, priceWei),
    onCancelTopUp: () => console.log("Cancel top-up"),
    isAuctionEnded: false,
    formatPrice: (priceWei: bigint) => {
      const usd = Number(priceWei) / 1e6;
      return usd.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    currencySymbol: "$",
  },
};
