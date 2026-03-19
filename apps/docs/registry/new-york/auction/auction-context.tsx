"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type {
  AuctionData,
  AuctionFormatters,
  AuctionTickConfig,
  AuctionUserBid,
  OperationState,
  RankableBid,
} from "@/types";
import { getProjectedRankForPrice, getSuggestedBidPrices } from "@/utils";

export interface AuctionContextValue {
  auction: AuctionData;
  isAuctionEnded: boolean;

  bids: RankableBid[];
  userBids: AuctionUserBid[];
  maxTotalItems: number;

  bidValue: bigint;
  setBidValue: (value: bigint | ((prev: bigint) => bigint)) => void;

  minBidValue: bigint;
  reservePriceValue: bigint;
  tickReferencePrice: bigint;
  tickConfig: AuctionTickConfig | undefined;
  tickSize: bigint;

  placeBidOperation: OperationState;
  topUpOperation: OperationState;

  lockedBid: { bidId: bigint; priceValue: bigint } | null;

  mergedForRank: RankableBid[];
  getRankForBid: (bidId: string) => number | null;
  getProjectedRank: (priceValue: bigint) => {
    rank: number | null;
    isWinning: boolean;
  };
  getSuggestedBids: () => bigint[];

  showBidPreview: boolean;
  setShowBidPreview: (show: boolean) => void;

  isBiddingActive: boolean;
  setIsBiddingActive: (active: boolean) => void;
  startBidding: () => void;
  cancelBidding: () => void;

  setLockedBid: (bid: { bidId: bigint; priceValue: bigint } | null) => void;
  handlePlaceBid: (price: string) => Promise<boolean>;
  handleTopUp: (newPrice: string) => Promise<boolean>;
  handleClaimEdition?: (bidId: string) => Promise<boolean>;
  resetOperations: () => void;

  formatPrice: (priceValue: bigint) => string;
  formatTime: (date: Date) => string;
  currencySymbol: string;
  formatInputValue: (value: bigint) => number;
  parseInputValue: (value: number) => bigint;
}

export const AuctionContext: React.Context<AuctionContextValue | null> =
  createContext<AuctionContextValue | null>(null);

export function useAuctionContext(): AuctionContextValue {
  const ctx = useContext(AuctionContext);
  if (!ctx) {
    throw new Error(
      "useAuctionContext must be used within an Auction provider",
    );
  }
  return ctx;
}

export interface AuctionProviderProps {
  auction: AuctionData;
  bids: RankableBid[];
  userBids: AuctionUserBid[];
  onPlaceBid: (price: bigint, quantity: bigint) => Promise<boolean>;
  onTopUpBid: (
    bidId: bigint,
    newPrice: bigint,
    additionalValue: bigint,
  ) => Promise<boolean>;
  onClaimEdition?: (bidId: string) => Promise<boolean>;
  formatters?: AuctionFormatters;
  children: React.ReactNode;
}

export function AuctionProvider({
  auction,
  bids,
  userBids,
  onPlaceBid,
  onTopUpBid,
  onClaimEdition,
  formatters,
  children,
}: AuctionProviderProps): React.ReactElement {
  const defaultFormatPrice = (priceValue: bigint) => {
    const val = Number(priceValue) / 1e18;
    return val.toLocaleString("en-US", {
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
  const currencySymbol = formatters?.currencySymbol ?? "USD";
  const formatInputValue =
    formatters?.formatInputValue ?? ((v: bigint) => Number(v) / 1e18);
  const parseInputValue =
    formatters?.parseInputValue ??
    ((v: number) => BigInt(Math.round(v * 1e18)));

  const isAuctionEnded = auction.endsAt
    ? Date.now() > auction.endsAt.getTime()
    : false;

  const reservePriceValue = auction.reservePrice;
  const tickConfig = auction.tickConfig;

  const activeBids = bids.filter((b) => {
    const bid = userBids.find((ub) => ub.id === b.id);
    return !bid || bid.status === "active";
  });

  const totalActiveQty = BigInt(activeBids.length);

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

  const minBidValue = useMemo(() => {
    if (totalActiveQty >= BigInt(auction.maxTotalItems)) {
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
    return reservePriceValue;
  }, [
    reservePriceValue,
    totalActiveQty,
    auction.maxTotalItems,
    mergedForRank,
    tickConfig,
  ]);

  const tickReferencePrice = minBidValue;

  const tickSize = useMemo(() => {
    if (!tickConfig) return minBidValue;
    return BigInt(minBidValue) > tickConfig.threshold
      ? tickConfig.largeTickSize
      : tickConfig.smallTickSize;
  }, [tickConfig, minBidValue]);

  const getRankForBid = useCallback(
    (bidId: string) => {
      const idx = mergedForRank.findIndex((b) => b.id === bidId);
      return idx >= 0 ? idx + 1 : null;
    },
    [mergedForRank],
  );

  const getProjectedRank = useCallback(
    (priceValue: bigint) => {
      return getProjectedRankForPrice(
        priceValue,
        mergedForRank,
        auction.maxTotalItems,
      );
    },
    [mergedForRank, auction.maxTotalItems],
  );

  const getSuggestedBids = useCallback(() => {
    return getSuggestedBidPrices({
      mergedForRank,
      maxTotalItems: auction.maxTotalItems,
      minBidValue,
      reservePriceValue,
      tickConfig,
      tickSize,
    });
  }, [
    mergedForRank,
    auction.maxTotalItems,
    minBidValue,
    reservePriceValue,
    tickConfig,
    tickSize,
  ]);

  const [placeBidOperation, setPlaceBidOperation] = useState<OperationState>({
    status: "idle",
  });
  const [topUpOperation, setTopUpOperation] = useState<OperationState>({
    status: "idle",
  });

  const [lockedBid, setLockedBid] = useState<{
    bidId: bigint;
    priceValue: bigint;
  } | null>(null);

  const [showBidPreview, setShowBidPreview] = useState(false);

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

  const setLockedBidAndActivate = useCallback(
    (bid: { bidId: bigint; priceValue: bigint } | null) => {
      setLockedBid(bid);
      if (bid !== null) {
        setIsBiddingActive(true);
        setShowBidPreview(true);
      }
    },
    [],
  );

  const [bidValue, setBidValue] = useState<bigint>(minBidValue);

  const resetOperations = useCallback(() => {
    setPlaceBidOperation({ status: "idle" });
    setTopUpOperation({ status: "idle" });
  }, []);

  const handlePlaceBid = useCallback(
    async (price: string) => {
      const priceValue = BigInt(price);
      setPlaceBidOperation({ status: "pending" });

      try {
        const success = await onPlaceBid(priceValue, 1n);
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

  const handleTopUp = useCallback(
    async (newPrice: string) => {
      if (!lockedBid) return false;

      const newPriceValue = BigInt(newPrice);
      const additionalValue = newPriceValue - lockedBid.priceValue;

      setTopUpOperation({ status: "pending" });

      try {
        const success = await onTopUpBid(
          lockedBid.bidId,
          newPriceValue,
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

  const handleClaimEdition = useCallback(
    async (bidId: string) => {
      if (!onClaimEdition) return false;
      return onClaimEdition(bidId);
    },
    [onClaimEdition],
  );

  const value: AuctionContextValue = {
    auction,
    isAuctionEnded,
    bids,
    userBids,
    maxTotalItems: auction.maxTotalItems,
    bidValue,
    setBidValue,
    minBidValue,
    reservePriceValue,
    tickReferencePrice,
    tickConfig,
    tickSize,
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
    <AuctionContext.Provider value={value}>{children}</AuctionContext.Provider>
  );
}
