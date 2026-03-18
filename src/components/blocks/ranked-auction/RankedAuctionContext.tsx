"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type {
  OperationState,
  RankableBid,
  RankedAuctionData,
  RankedAuctionFormatters,
  RankedAuctionTickConfig,
  RankedAuctionUserBid,
} from "@/types";
import { getProjectedRankForPriceWei, getSuggestedBidPricesWei } from "@/utils";

export interface RankedAuctionContextValue {
  // Auction data
  auction: RankedAuctionData;
  isAuctionEnded: boolean;

  // Bid state
  bids: RankableBid[];
  userBids: RankedAuctionUserBid[];
  maxTotalItems: number;

  // Current bid input value (for bid input + suggestions sync)
  bidWei: bigint;
  setBidWei: (value: bigint | ((prev: bigint) => bigint)) => void;

  // Tick/pricing
  minBidWei: bigint;
  reservePriceWei: bigint;
  tickReferencePriceWei: bigint;
  tickConfig: RankedAuctionTickConfig | undefined;
  tickSizeWei: bigint;

  // Operations
  placeBidOperation: OperationState;
  topUpOperation: OperationState;

  // Locked bid (for top-up flow)
  lockedBid: { bidId: bigint; priceWei: bigint } | null;

  // Rank utilities
  mergedForRank: RankableBid[];
  getRankForBid: (bidId: string) => number | null;
  getProjectedRank: (priceWei: bigint) => {
    rank: number | null;
    isWinning: boolean;
  };
  getSuggestedBids: () => bigint[];

  // Bid preview visibility
  showBidPreview: boolean;
  setShowBidPreview: (show: boolean) => void;

  // Bidding mode (for "Start Bidding" flow)
  isBiddingActive: boolean;
  setIsBiddingActive: (active: boolean) => void;
  startBidding: () => void;
  cancelBidding: () => void;

  // Actions
  setLockedBid: (bid: { bidId: bigint; priceWei: bigint } | null) => void;
  handlePlaceBid: (price: string) => Promise<boolean>;
  handleTopUp: (newPrice: string) => Promise<boolean>;
  handleClaimEdition?: (bidId: string) => Promise<boolean>;
  resetOperations: () => void;

  // Formatters
  formatPrice: (priceWei: bigint) => string;
  formatTime: (date: Date) => string;
  currencySymbol: string;
  formatInputValue: (value: bigint) => number;
  parseInputValue: (value: number) => bigint;
}

export const RankedAuctionContext: React.Context<RankedAuctionContextValue | null> =
  createContext<RankedAuctionContextValue | null>(null);

export function useRankedAuctionContext(): RankedAuctionContextValue {
  const ctx = useContext(RankedAuctionContext);
  if (!ctx) {
    throw new Error(
      "useRankedAuctionContext must be used within a RankedAuction provider",
    );
  }
  return ctx;
}

export interface RankedAuctionProviderProps {
  auction: RankedAuctionData;
  bids: RankableBid[];
  userBids: RankedAuctionUserBid[];
  onPlaceBid: (price: bigint, quantity: bigint) => Promise<boolean>;
  onTopUpBid: (
    bidId: bigint,
    newPrice: bigint,
    additionalValue: bigint,
  ) => Promise<boolean>;
  onClaimEdition?: (bidId: string) => Promise<boolean>;
  formatters?: RankedAuctionFormatters;
  children: React.ReactNode;
}

export function RankedAuctionProvider({
  auction,
  bids,
  userBids,
  onPlaceBid,
  onTopUpBid,
  onClaimEdition,
  formatters,
  children,
}: RankedAuctionProviderProps): React.ReactElement {
  // Default formatters
  const defaultFormatPrice = (priceWei: bigint) => {
    const eth = Number(priceWei) / 1e18;
    return eth.toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  };
  const defaultFormatTime = (date: Date) => {
    const now = Date.now();
    const diff = date.getTime() - now;
    const isPast = diff < 0;
    const absMs = Math.abs(diff);
    const seconds = Math.floor(absMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ${isPast ? "ago" : ""}`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${isPast ? "ago" : ""}`;
    if (minutes > 0)
      return `${minutes}m ${seconds % 60}s ${isPast ? "ago" : ""}`;
    return `${seconds}s ${isPast ? "ago" : ""}`;
  };

  const formatPrice = formatters?.formatPrice ?? defaultFormatPrice;
  const formatTime = formatters?.formatTime ?? defaultFormatTime;
  const currencySymbol = formatters?.currencySymbol ?? "ETH";
  const formatInputValue =
    formatters?.formatInputValue ?? ((v: bigint) => Number(v) / 1e18);
  const parseInputValue =
    formatters?.parseInputValue ??
    ((v: number) => BigInt(Math.round(v * 1e18)));

  const isAuctionEnded = auction.endsAt
    ? Date.now() > auction.endsAt.getTime()
    : false;

  console.log(isAuctionEnded);

  // Compute pricing values
  const reservePriceWei = auction.reservePrice;
  const tickConfig = auction.tickConfig;

  // Get total active quantity from bids (for cutoff calculation)
  const activeBids = bids.filter((b) => {
    const bid = userBids.find((ub) => ub.id === b.id);
    return !bid || bid.status === "active";
  });

  const totalActiveQty = BigInt(activeBids.length);

  // Build merged bid list for ranking (active bids + user bids not in list)
  // This must come before minBidWei calculation
  const mergedForRank = useMemo(() => {
    const cutoffIds = new Set(bids.map((b) => b.id));

    const myActiveBids = userBids.filter(
      (bid) => bid.status === "active" && !cutoffIds.has(bid.id),
    );

    const myBidsNotInCutoff: RankableBid[] = myActiveBids.map((bid) => ({
      id: bid.id,
      price: bid.price.toString(),
      created_at: bid.createdAt.toISOString(),
    }));

    const merged: RankableBid[] = [...bids, ...myBidsNotInCutoff];

    return merged.sort((a, b) => {
      const pa = BigInt(a.price);
      const pb = BigInt(b.price);
      if (pa !== pb) return pb > pa ? 1 : -1;
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
  }, [bids, userBids]);

  // Compute min bid: max(reserve, highest active bid if not full)
  // Use mergedForRank to be consistent with getProjectedRank
  const minBidWei = useMemo(() => {
    if (totalActiveQty >= BigInt(auction.maxTotalItems)) {
      // Auction is full - use cutoff (lowest winning bid)
      const winningBids = mergedForRank.slice(0, auction.maxTotalItems);

      if (winningBids.length > 0) {
        const lastWinning = winningBids[winningBids.length - 1];
        const tickSize = tickConfig
          ? BigInt(lastWinning.price) > tickConfig.threshold
            ? tickConfig.largeTickSize
            : tickConfig.smallTickSize
          : BigInt(lastWinning.price);
        return BigInt(lastWinning.price) + tickSize;
      }
    }
    return reservePriceWei;
  }, [
    reservePriceWei,
    totalActiveQty,
    auction.maxTotalItems,
    mergedForRank,
    tickConfig,
  ]);

  // Tick reference price: minBidWei (for tick grid calculation)
  const tickReferencePriceWei = minBidWei;

  // Current tick size at reference price
  const tickSizeWei = useMemo(() => {
    if (!tickConfig) return minBidWei;
    return BigInt(minBidWei) > tickConfig.threshold
      ? tickConfig.largeTickSize
      : tickConfig.smallTickSize;
  }, [tickConfig, minBidWei]);

  // Get rank for a bid ID
  const getRankForBid = useCallback(
    (bidId: string) => {
      const idx = mergedForRank.findIndex((b) => b.id === bidId);
      return idx >= 0 ? idx + 1 : null;
    },
    [mergedForRank],
  );

  // Get projected rank for a price
  const getProjectedRank = useCallback(
    (priceWei: bigint) => {
      return getProjectedRankForPriceWei(
        priceWei,
        mergedForRank,
        auction.maxTotalItems,
      );
    },
    [mergedForRank, auction.maxTotalItems],
  );

  // Get suggested bid prices
  const getSuggestedBids = useCallback(() => {
    return getSuggestedBidPricesWei({
      mergedForRank,
      maxTotalItems: auction.maxTotalItems,
      minBidWei,
      reservePriceWei,
      tickConfig,
      tickSizeWei,
    });
  }, [
    mergedForRank,
    auction.maxTotalItems,
    minBidWei,
    reservePriceWei,
    tickConfig,
    tickSizeWei,
  ]);

  // Operation states
  const [placeBidOperation, setPlaceBidOperation] = useState<OperationState>({
    status: "idle",
  });
  const [topUpOperation, setTopUpOperation] = useState<OperationState>({
    status: "idle",
  });

  // Locked bid for top-up
  const [lockedBid, setLockedBid] = useState<{
    bidId: bigint;
    priceWei: bigint;
  } | null>(null);

  // Bid preview visibility (hidden by default, shown on focus/interaction)
  const [showBidPreview, setShowBidPreview] = useState(false);

  // Bidding mode state (for "Start Bidding" flow)
  const [isBiddingActive, setIsBiddingActive] = useState(false);

  const startBidding = useCallback(() => {
    setIsBiddingActive(true);
    setShowBidPreview(true);
  }, []);

  const cancelBidding = useCallback(() => {
    setIsBiddingActive(false);
    setShowBidPreview(false);
    setLockedBid(null);
  }, []);

  // Wrapper for setLockedBid that also activates bidding mode when locking a bid
  const setLockedBidAndActivate = useCallback(
    (bid: { bidId: bigint; priceWei: bigint } | null) => {
      setLockedBid(bid);
      if (bid !== null) {
        setIsBiddingActive(true);
        setShowBidPreview(true);
      }
    },
    [],
  );

  // Current bid input value
  const [bidWei, setBidWei] = useState<bigint>(minBidWei);

  // Reset operations
  const resetOperations = useCallback(() => {
    setPlaceBidOperation({ status: "idle" });
    setTopUpOperation({ status: "idle" });
  }, []);

  // Handle place bid
  const handlePlaceBid = useCallback(
    async (price: string) => {
      const priceWei = BigInt(price);
      setPlaceBidOperation({ status: "pending" });

      try {
        const success = await onPlaceBid(priceWei, 1n);
        if (success) {
          setPlaceBidOperation({ status: "success" });
          setShowBidPreview(false);
          return true;
        } else {
          setPlaceBidOperation({
            status: "error",
            error: "Transaction failed",
          });
          return false;
        }
      } catch (err) {
        setPlaceBidOperation({
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
        return false;
      }
    },
    [onPlaceBid],
  );

  // Handle top-up
  const handleTopUp = useCallback(
    async (newPrice: string) => {
      if (!lockedBid) return false;

      const newPriceWei = BigInt(newPrice);
      const additionalValue = newPriceWei - lockedBid.priceWei;

      setTopUpOperation({ status: "pending" });

      try {
        const success = await onTopUpBid(
          lockedBid.bidId,
          newPriceWei,
          additionalValue,
        );
        if (success) {
          setTopUpOperation({ status: "success" });
          setLockedBid(null);
          return true;
        } else {
          setTopUpOperation({ status: "error", error: "Transaction failed" });
          return false;
        }
      } catch (err) {
        setTopUpOperation({
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
        return false;
      }
    },
    [lockedBid, onTopUpBid],
  );

  // Handle claim edition
  const handleClaimEdition = useCallback(
    async (bidId: string) => {
      if (!onClaimEdition) return false;
      return onClaimEdition(bidId);
    },
    [onClaimEdition],
  );

  const value: RankedAuctionContextValue = {
    auction,
    isAuctionEnded,
    bids,
    userBids,
    maxTotalItems: auction.maxTotalItems,
    bidWei,
    setBidWei,
    minBidWei,
    reservePriceWei,
    tickReferencePriceWei,
    tickConfig,
    tickSizeWei,
    placeBidOperation,
    topUpOperation,
    lockedBid,
    mergedForRank,
    getRankForBid,
    getProjectedRank,
    getSuggestedBids,
    showBidPreview,
    setShowBidPreview,
    isBiddingActive,
    setIsBiddingActive,
    startBidding,
    cancelBidding,
    setLockedBid: setLockedBidAndActivate,
    handlePlaceBid,
    handleTopUp,
    handleClaimEdition,
    resetOperations,
    formatPrice,
    formatTime,
    currencySymbol,
    formatInputValue,
    parseInputValue,
  };

  return (
    <RankedAuctionContext.Provider value={value}>
      {children}
    </RankedAuctionContext.Provider>
  );
}
