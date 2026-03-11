import type { RankedAuctionTickConfig } from "@/types"

/**
 * Returns the tick size (in wei) to use for +/- steps based on the current bid.
 * Threshold is EXCLUSIVE: bid must be strictly greater than threshold to use large tick.
 */
export function getActiveTickSizeWei(
  bidPriceWei: bigint,
  tickConfig: RankedAuctionTickConfig
): bigint {
  return bidPriceWei > tickConfig.threshold
    ? tickConfig.largeTickSize
    : tickConfig.smallTickSize
}

/**
 * Checks if a bid price (in wei) is on the auction's valid tick grid.
 * Which tick applies is determined by the reference price (lowest possible bid:
 * cutoff when full, else reserve), not by the user's bid.
 */
export function isValidTickPrice(
  priceWei: bigint,
  reservePriceWei: bigint,
  tickConfig: RankedAuctionTickConfig | undefined,
  referencePriceWei: bigint
): boolean {
  if (!tickConfig) return true
  if (priceWei < reservePriceWei) return false

  const { threshold, smallTickSize, largeTickSize } = tickConfig
  if (smallTickSize === 0n || largeTickSize === 0n) return false

  const activeTickSize = getActiveTickSizeWei(referencePriceWei, tickConfig)
  const base = activeTickSize === smallTickSize ? reservePriceWei : threshold
  return (priceWei - base) % activeTickSize === 0n
}

/**
 * Returns the largest valid tick price that is <= priceWei and >= minBidWei.
 * Used when setPrice(price) is called so the displayed bid stays on the grid.
 * When tickConfig is missing, returns minBidWei (single allowed value).
 */
export function roundDownToValidBidWei(
  priceWei: bigint,
  minBidWei: bigint,
  reservePriceWei: bigint,
  tickConfig: RankedAuctionTickConfig | undefined
): bigint {
  if (priceWei < minBidWei) return minBidWei
  if (!tickConfig) return minBidWei

  const { threshold, smallTickSize, largeTickSize } = tickConfig
  if (smallTickSize === 0n || largeTickSize === 0n) return minBidWei

  const activeTickSize = getActiveTickSizeWei(priceWei, tickConfig)
  const base =
    activeTickSize === smallTickSize
      ? reservePriceWei
      : threshold + smallTickSize

  if (priceWei < base) return minBidWei

  const n = (priceWei - base) / activeTickSize
  const candidate = base + n * activeTickSize

  return candidate >= minBidWei ? candidate : minBidWei
}
