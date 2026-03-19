import type { AuctionTickConfig } from "@/types";

/**
 * Returns the tick size to use for +/- steps based on the current bid.
 * Threshold is EXCLUSIVE: bid must be strictly greater than threshold to use large tick.
 */
export function getActiveTickSize(
  bidPrice: bigint,
  tickConfig: AuctionTickConfig,
): bigint {
  return bidPrice > tickConfig.threshold
    ? tickConfig.largeTickSize
    : tickConfig.smallTickSize;
}

/**
 * Checks if a bid price is on the auction's valid tick grid.
 * Which tick applies is determined by the reference price (lowest possible bid:
 * cutoff when full, else reserve), not by the user's bid.
 */
export function isValidTickPrice(
  price: bigint,
  reservePrice: bigint,
  tickConfig: AuctionTickConfig | undefined,
  referencePrice: bigint,
): boolean {
  if (!tickConfig) return true;
  if (price < reservePrice) return false;

  const { threshold, smallTickSize, largeTickSize } = tickConfig;
  if (smallTickSize === 0n || largeTickSize === 0n) return false;

  const activeTickSize = getActiveTickSize(referencePrice, tickConfig);
  const base = activeTickSize === smallTickSize ? reservePrice : threshold;
  return (price - base) % activeTickSize === 0n;
}

/**
 * Returns the largest valid tick price that is <= price and >= minBid.
 * Used when setPrice(price) is called so the displayed bid stays on the grid.
 * When tickConfig is missing, returns minBid (single allowed value).
 */
export function roundDownToValidBid(
  price: bigint,
  minBid: bigint,
  reservePrice: bigint,
  tickConfig: AuctionTickConfig | undefined,
): bigint {
  if (price < minBid) return minBid;
  if (!tickConfig) return minBid;

  const { threshold, smallTickSize, largeTickSize } = tickConfig;
  if (smallTickSize === 0n || largeTickSize === 0n) return minBid;

  const activeTickSize = getActiveTickSize(price, tickConfig);
  const base =
    activeTickSize === smallTickSize ? reservePrice : threshold + smallTickSize;

  if (price < base) return minBid;

  const n = (price - base) / activeTickSize;
  const candidate = base + n * activeTickSize;

  return candidate >= minBid ? candidate : minBid;
}
