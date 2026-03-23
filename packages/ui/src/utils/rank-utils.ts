import type { AuctionTickConfig, RankableBid } from "@/types";
import { getActiveTickSize, roundDownToValidBid } from "./tick-validation";

export interface ProjectedRankResult {
  rank: number | null;
  isWinning: boolean;
}

/**
 * Projects where a bid at a given price would land in the current rankings.
 * Returns the 1-based rank and whether it would be in the winning range.
 */
export function getProjectedRankForPrice(
  priceValue: bigint,
  mergedForRank: RankableBid[],
  maxTotalItems: number,
): ProjectedRankResult {
  if (priceValue <= 0n) return { rank: null, isWinning: false };
  const synthetic: RankableBid = {
    id: "__synthetic__",
    price: priceValue.toString(),
    created_at: new Date().toISOString(),
  };

  const sorted = [...mergedForRank, synthetic].sort((a, b) => {
    const priceA = BigInt(a.price);
    const priceB = BigInt(b.price);
    if (priceA !== priceB) return priceB > priceA ? 1 : -1;

    // Tie-breaker: synthetic bid sorts below same-priced bids
    if (a.id === synthetic.id) return 1;
    if (b.id === synthetic.id) return -1;

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
  minBidValue: bigint;
  reservePriceValue: bigint;
  tickConfig: AuctionTickConfig | undefined;
  tickSize?: bigint;
}

/**
 * Generates an array of suggested bid prices based on the current leaderboard state.
 * Returns 1-5 unique suggested prices in ascending order.
 */
export function getSuggestedBidPrices({
  mergedForRank,
  maxTotalItems,
  minBidValue,
  reservePriceValue,
  tickConfig,
  tickSize: tickSizeParam,
}: SuggestedBidsInput): bigint[] {
  const suggestions: bigint[] = [];

  if (minBidValue <= 0n) {
    return suggestions;
  }

  const fallbackTick =
    tickSizeParam ?? (reservePriceValue > 0n ? reservePriceValue : minBidValue);

  const tickAt = (priceValue: bigint): bigint =>
    tickConfig ? getActiveTickSize(priceValue, tickConfig) : fallbackTick;

  const ensureValid = (value: bigint): bigint =>
    roundDownToValidBid(value, minBidValue, reservePriceValue, tickConfig);

  // S1: minimum valid bid
  suggestions.push(minBidValue);

  const winning = mergedForRank.slice(0, maxTotalItems);

  if (winning.length === 0) {
    // No bids yet: use simple ladder above minBid
    const base = minBidValue;
    const t = tickAt(base);
    suggestions.push(ensureValid(base + t));
    suggestions.push(ensureValid(base + 3n * t));
    suggestions.push(ensureValid(base + 5n * t));
    return dedupeAndSortAscending(suggestions);
  }

  const lastWinning = winning[winning.length - 1];
  const topWinning = winning[0];

  const toValue = (bid: RankableBid): bigint => {
    try {
      return BigInt(bid.price);
    } catch {
      return minBidValue;
    }
  };

  const lastWinningValue = toValue(lastWinning);
  const topWinningValue = toValue(topWinning);

  const upperIdxRaw = Math.floor(winning.length * 0.25);
  const upperIdx = Math.min(
    Math.max(upperIdxRaw, 0),
    Math.max(winning.length - 1, 0),
  );
  const upperMidBid = winning[upperIdx];
  const upperMidValue = toValue(upperMidBid);

  suggestions.push(ensureValid(lastWinningValue + tickAt(lastWinningValue)));
  suggestions.push(ensureValid(upperMidValue + tickAt(upperMidValue)));
  suggestions.push(ensureValid(topWinningValue + tickAt(topWinningValue)));

  return dedupeAndSortAscending(suggestions);
}

function dedupeAndSortAscending(values: bigint[]): bigint[] {
  const uniq = Array.from(new Set(values.map((v) => v.toString()))).map((v) =>
    BigInt(v),
  );
  return uniq.sort((a, b) => (a === b ? 0 : a > b ? 1 : -1));
}
