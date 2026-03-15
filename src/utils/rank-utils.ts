import type { RankableBid, RankedAuctionTickConfig } from "@/types";
import {
  getActiveTickSizeWei,
  roundDownToValidBidWei,
} from "./tick-validation";

export interface ProjectedRankResult {
  rank: number | null;
  isWinning: boolean;
}

/**
 * Projects where a bid at a given price would land in the current rankings.
 * Returns the 1-based rank and whether it would be in the winning range.
 */
export function getProjectedRankForPriceWei(
  priceWei: bigint,
  mergedForRank: RankableBid[],
  maxTotalItems: number,
): ProjectedRankResult {
  if (priceWei <= 0n) return { rank: null, isWinning: false };
  const synthetic: RankableBid = {
    id: "__synthetic__",
    price: priceWei.toString(),
    created_at: new Date().toISOString(),
  };

  const sorted = [...mergedForRank, synthetic].sort((a, b) => {
    const priceA = BigInt(a.price);
    const priceB = BigInt(b.price);
    if (priceA !== priceB) return priceB > priceA ? 1 : -1;

    // Tie-breaker: synthetic bid wins (like slots in RankedList)
    if (a.id === synthetic.id) return -1;
    if (b.id === synthetic.id) return 1;

    // Regular tie-breaker: earlier bids rank higher
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const idx = sorted.findIndex((bid) => bid.id === synthetic.id);
  if (idx === -1) return { rank: null, isWinning: false };

  const rank = idx + 1;
  const isWinning = rank <= maxTotalItems;
  return { rank, isWinning };
}

export interface SuggestedBidsInput {
  mergedForRank: RankableBid[];
  maxTotalItems: number;
  minBidWei: bigint;
  reservePriceWei: bigint;
  tickConfig: RankedAuctionTickConfig | undefined;
  tickSizeWei?: bigint;
}

/**
 * Generates an array of suggested bid prices based on the current leaderboard state.
 * Returns 1-5 unique suggested prices in ascending order.
 */
export function getSuggestedBidPricesWei({
  mergedForRank,
  maxTotalItems,
  minBidWei,
  reservePriceWei,
  tickConfig,
  tickSizeWei: tickSizeWeiParam,
}: SuggestedBidsInput): bigint[] {
  const suggestions: bigint[] = [];

  if (minBidWei <= 0n) {
    return suggestions;
  }

  const fallbackTick =
    tickSizeWeiParam ?? (reservePriceWei > 0n ? reservePriceWei : minBidWei);

  const tickAt = (priceWei: bigint): bigint =>
    tickConfig ? getActiveTickSizeWei(priceWei, tickConfig) : fallbackTick;

  const ensureValid = (wei: bigint): bigint =>
    roundDownToValidBidWei(wei, minBidWei, reservePriceWei, tickConfig);

  // S1: minimum valid bid
  suggestions.push(minBidWei);

  const winning = mergedForRank.slice(0, maxTotalItems);

  if (winning.length === 0) {
    // No bids yet: use simple ladder above minBid
    const base = minBidWei;
    const t = tickAt(base);
    suggestions.push(ensureValid(base + t));
    suggestions.push(ensureValid(base + 3n * t));
    suggestions.push(ensureValid(base + 5n * t));
    return dedupeAndSortAscending(suggestions);
  }

  const lastWinning = winning[winning.length - 1];
  const topWinning = winning[0];

  const toWei = (bid: RankableBid): bigint => {
    try {
      return BigInt(bid.price);
    } catch {
      return minBidWei;
    }
  };

  const lastWinningWei = toWei(lastWinning);
  const topWinningWei = toWei(topWinning);

  const upperIdxRaw = Math.floor(winning.length * 0.25);
  const upperIdx = Math.min(
    Math.max(upperIdxRaw, 0),
    Math.max(winning.length - 1, 0),
  );
  const upperMidBid = winning[upperIdx];
  const upperMidWei = toWei(upperMidBid);

  suggestions.push(ensureValid(lastWinningWei + tickAt(lastWinningWei)));
  suggestions.push(ensureValid(upperMidWei + tickAt(upperMidWei)));
  suggestions.push(ensureValid(topWinningWei + tickAt(topWinningWei)));

  return dedupeAndSortAscending(suggestions);
}

function dedupeAndSortAscending(values: bigint[]): bigint[] {
  const uniq = Array.from(new Set(values.map((v) => v.toString()))).map((v) =>
    BigInt(v),
  );
  return uniq.sort((a, b) => (a === b ? 0 : a > b ? 1 : -1));
}
