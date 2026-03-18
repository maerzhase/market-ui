// ─── Auction Data Types ─────────────────────────────────────────────────────

/**
 * Tick configuration for the auction's price grid.
 * Prices below the threshold use smallTickSize; prices above use largeTickSize.
 */
export interface RankedAuctionTickConfig {
  threshold: bigint;
  smallTickSize: bigint;
  largeTickSize: bigint;
}

/**
 * Core auction data. All prices are in wei (bigint).
 * This type is fully generic -- no blockchain or framework coupling.
 */
export interface RankedAuctionData {
  /** Unique identifier for the auction (e.g. contract address) */
  id: string;
  /** Minimum accepted bid price in wei */
  reservePrice: bigint;
  /** Final clearing price after settlement, if finalized */
  clearingPrice?: bigint;
  /** When the auction opens for bidding (null = already open) */
  opensAt: Date | null;
  /** When the auction closes (null = no end time set) */
  endsAt: Date | null;
  /** Maximum number of winning bidders / editions */
  maxTotalItems: number;
  /** Tick configuration for bid price stepping */
  tickConfig?: RankedAuctionTickConfig;
}

// ─── Bid Types ──────────────────────────────────────────────────────────────

/**
 * A bidder's public profile. Consumers map their own user type into this.
 */
export interface RankedAuctionBidder {
  /** Unique user identifier (e.g. wallet address) */
  id: string;
  /** Display name */
  name?: string;
  /** Avatar image URL */
  avatarUrl?: string;
}

/**
 * A single bid in the auction leaderboard (public view).
 * All prices are in the auction's native unit as bigint.
 */
export interface RankedAuctionBid {
  /** Unique bid identifier */
  id: string;
  /** Bid price in wei */
  price: bigint;
  /** When the bid was placed */
  createdAt: Date;
  /** The bidder */
  bidder: RankedAuctionBidder;
  /** Link to the bid transaction on a block explorer */
  explorerUrl?: string;
}

/** Bid status for user's own bids */
export type RankedAuctionBidStatus = "active" | "refunded" | "claimed";

/**
 * Extended bid data for the current user's bids.
 * Includes status and claim information.
 */
export interface RankedAuctionUserBid extends RankedAuctionBid {
  /** On-chain global bid ID (used for top-up) */
  globalBidId: bigint;
  /** Current bid status */
  status: RankedAuctionBidStatus;
  /** Whether this bid is currently in the winning range */
  isWinning: boolean;
  /** When the edition was claimed (for winning bids) */
  claimedAt?: Date;
  /** Refund transaction explorer URL */
  refundExplorerUrl?: string;
}

// ─── Operation Status ───────────────────────────────────────────────────────

/** Status of an async operation (bid placement, top-up, claim) */
export type OperationStatus =
  | "idle"
  | "pending"
  | "confirming"
  | "indexing"
  | "success"
  | "error";

/** Tracks the state of an in-flight operation */
export interface OperationState {
  status: OperationStatus;
  error?: string;
}

// ─── Callbacks ──────────────────────────────────────────────────────────────

/**
 * Callbacks that consumers must provide to wire up blockchain/API operations.
 * All return a boolean indicating success/failure.
 */
export interface RankedAuctionCallbacks {
  /** Place a new bid. Called with price (wei) and quantity. */
  onPlaceBid: (price: bigint, quantity: bigint) => Promise<boolean>;
  /** Top up an existing bid to a new price. */
  onTopUpBid: (
    bidId: bigint,
    newPrice: bigint,
    additionalValue: bigint,
  ) => Promise<boolean>;
  /** Claim an edition for a winning bid. Optional. */
  onClaimEdition?: (bidId: string) => Promise<boolean>;
}

// ─── Formatters ─────────────────────────────────────────────────────────────

/**
 * Formatting functions consumers can provide to customize display.
 * All are optional -- sensible defaults are used when not provided.
 */
export interface RankedAuctionFormatters {
  /** Format a price (bigint wei) for display. Default: wei-to-ETH conversion */
  formatPrice?: (priceWei: bigint) => string;
  /** Format a date for display. Default: relative time (e.g. "5m ago") */
  formatTime?: (date: Date) => string;
  /** Currency symbol to display alongside prices. Default: "ETH" */
  currencySymbol?: string;
  /** Convert internal bigint value to display number for input. Default: divide by 1e18 (wei to ETH) */
  formatInputValue?: (value: bigint) => number;
  /** Convert display number back to internal bigint value. Default: multiply by 1e18 (ETH to wei) */
  parseInputValue?: (value: number) => bigint;
}

// ─── Internal Rankable Bid ──────────────────────────────────────────────────

/**
 * Lightweight bid representation used internally for rank calculations.
 * Consumers don't need to use this directly -- it's derived from RankedAuctionBid.
 */
export interface RankableBid {
  id: string;
  price: string;
  created_at: string;
  bidder?: RankedAuctionBidder;
}
