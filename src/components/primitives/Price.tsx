import * as React from "react";
import { useMemo } from "react";
import { cn } from "@/lib";

// ---------------------------------------------------------------------------
// BigIntDecimal – pure bigint decimal arithmetic
// ---------------------------------------------------------------------------

function bigIntPow(base: bigint, exp: number): bigint {
  let result = 1n;
  let b = base;
  let e = exp;
  while (e > 0) {
    if (e & 1) result *= b;
    b *= b;
    e >>= 1;
  }
  return result;
}

class BigIntDecimal {
  constructor(
    public int: bigint,
    public decimals: number,
  ) {}

  clone(): BigIntDecimal {
    return new BigIntDecimal(this.int, this.decimals);
  }

  /**
   * Remove trailing zeros after the decimal point without losing precision.
   */
  optimizeDecimals(): void {
    const base = 10n;
    while (this.decimals > 0 && this.int % base === 0n) {
      this.decimals--;
      this.int = this.int / base;
    }
  }

  /**
   * Round UP (ceil) to `precision` decimal places. If the current number of
   * decimals is already ≤ precision, only trailing zeros are stripped.
   */
  ceil(precision: number): void {
    if (precision < 0) throw new Error("decimal precision < 0");
    if (this.decimals === 0) return;
    if (this.decimals <= precision) {
      this.optimizeDecimals();
      return;
    }
    const base = 10n;
    while (this.decimals > precision) {
      const r = this.int % base;
      if (r > 0n) this.int = this.int + base;
      this.decimals--;
      this.int = this.int / base;
    }
    this.optimizeDecimals();
  }

  /**
   * Full-precision decimal string, e.g. "1.001" or "0" or "42".
   */
  toString(): string {
    const isNegative = this.int < 0n;
    const abs = isNegative ? -this.int : this.int;
    let full = abs.toString();
    if (this.decimals === 0) return `${isNegative ? "-" : ""}${full}`;
    if (this.decimals >= full.length) {
      full = full.padStart(this.decimals + 1, "0");
    }
    const decIdx = full.length - this.decimals;
    return `${isNegative ? "-" : ""}${full.slice(0, decIdx)}.${full.slice(decIdx)}`;
  }

  /**
   * Abbreviate large numbers: 100K, 2.5M, etc.
   * Values < 1 are not abbreviated but still have maxDecimals applied.
   */
  abbreviate(maxDecimals = 3): string {
    const symbols: { exponent: number; symbol: string }[] = [
      { exponent: 9, symbol: "B" },
      { exponent: 6, symbol: "M" },
      { exponent: 3, symbol: "K" },
    ];
    const abs = this.int < 0n ? -this.int : this.int;
    const base = abs / bigIntPow(10n, this.decimals);
    if (base < 1n) {
      this.ceil(maxDecimals);
      return this.toString();
    }
    for (const { exponent, symbol } of symbols) {
      const threshold = bigIntPow(10n, exponent);
      if (base >= threshold) {
        this.decimals += exponent;
        this.ceil(maxDecimals);
        return this.toString() + symbol;
      }
    }
    this.ceil(maxDecimals);
    return this.toString();
  }
}

// ---------------------------------------------------------------------------
// Formatting utilities
// ---------------------------------------------------------------------------

function toBigInt(value: bigint | number | string): bigint {
  if (typeof value === "bigint") return value;
  try {
    return BigInt(value);
  } catch {
    return BigInt(0);
  }
}

export type FormatPriceOptions = {
  /**
   * Enable K / M / B abbreviation for large values.
   * @default false
   */
  abbreviate?: boolean;
  /**
   * Maximum decimal digits to display. Excess precision is ceiled (rounded up)
   * for safety in price contexts. When `undefined`, full precision is shown
   * (trailing zeros stripped).
   */
  maxDecimals?: number;
};

/**
 * Format a bigint price value into a human-readable string.
 * All arithmetic stays in bigint to preserve precision.
 */
export function formatPrice(
  value: bigint | number | string,
  decimals: number,
  options?: FormatPriceOptions,
): string {
  const raw = toBigInt(value);
  const num = new BigIntDecimal(raw, decimals);
  num.optimizeDecimals();

  if (options?.abbreviate) {
    return num.abbreviate(options.maxDecimals ?? 3);
  }

  if (typeof options?.maxDecimals === "number") {
    num.ceil(options.maxDecimals);
  }

  return num.toString();
}

// ---------------------------------------------------------------------------
// Price context – shared config across compound children
// ---------------------------------------------------------------------------

type PriceContextValue = {
  value: bigint | number | string;
  decimals: number;
  abbreviate: boolean;
  maxDecimals: number | undefined;
};

const PriceContext = React.createContext<PriceContextValue | null>(null);

function usePriceContext(): PriceContextValue {
  const ctx = React.useContext(PriceContext);
  if (!ctx) {
    throw new Error(
      "Price compound components must be used within a <Price> root",
    );
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Compound components
// ---------------------------------------------------------------------------

export interface PriceProps extends React.ComponentProps<"span"> {
  /** The raw integer price value in the smallest unit. */
  value: bigint | number | string;
  /** Number of decimal digits the smallest unit represents. */
  decimals: number;
  /** Enable K / M / B abbreviation for large values. */
  abbreviate?: boolean;
  /** Max decimal digits to show. Excess is ceiled (rounded up). */
  maxDecimals?: number;
}

/**
 * Root component. Can be used standalone (renders the formatted number) or
 * with compound children for full control over symbol placement and layout.
 *
 * @example Standalone
 * ```tsx
 * <Price value={500000000000000000n} decimals={18} maxDecimals={4} />
 * ```
 *
 * @example Composed
 * ```tsx
 * <Price value={500000000000000000n} decimals={18} maxDecimals={4}>
 *   <Price.Symbol>ETH</Price.Symbol>
 *   <Price.Value />
 * </Price>
 * ```
 */
function PriceRoot({
  value,
  decimals,
  abbreviate = false,
  maxDecimals,
  children,
  className,
  ...props
}: PriceProps): React.ReactElement {
  const ctx = useMemo<PriceContextValue>(
    () => ({ value, decimals, abbreviate, maxDecimals }),
    [value, decimals, abbreviate, maxDecimals],
  );

  const hasChildren =
    children !== undefined &&
    children !== null &&
    children !== true &&
    children !== false;

  return (
    <PriceContext value={ctx}>
      <span className={cn("tabular-nums", className)} {...props}>
        {hasChildren ? children : <PriceValue />}
      </span>
    </PriceContext>
  );
}

// --- Price.Value ---

export interface PriceValueProps extends React.ComponentProps<"span"> {
  /**
   * A BCP 47 locale tag (e.g. `"de-DE"`, `"ja-JP"`) used to localise
   * decimal and thousands separators. When omitted the raw formatted string
   * is rendered as-is (dot decimal separator, no grouping).
   */
  locale?: string;
}

/**
 * Localise a formatted price string by replacing the decimal separator and
 * inserting thousands separators according to the given locale. Delegates
 * integer grouping to `Intl.NumberFormat` so locale-specific patterns (e.g.
 * Indian lakh grouping) are handled correctly. Works on abbreviated strings
 * like "2.5K" too.
 */
function localizeFormatted(formatted: string, locale: string): string {
  // Split potential abbreviation suffix (K / M / B)
  const suffixMatch = formatted.match(/([KMB])$/);
  const suffix = suffixMatch ? suffixMatch[1] : "";
  const numPart = suffix ? formatted.slice(0, -1) : formatted;

  const [intPart, fracPart] = numPart.split(".");
  const isNegative = intPart.startsWith("-");
  const absInt = isNegative ? intPart.slice(1) : intPart;

  // Use Intl to format the integer part with locale-correct grouping
  const intNum = Number(absInt);
  const intFmt = new Intl.NumberFormat(locale, {
    useGrouping: true,
    maximumFractionDigits: 0,
  });
  const grouped = (isNegative ? "-" : "") + intFmt.format(intNum);

  if (fracPart === undefined) return grouped + suffix;

  // Discover the locale's decimal separator
  const parts = new Intl.NumberFormat(locale).formatToParts(1.1);
  const decimal = parts.find((p) => p.type === "decimal")?.value ?? ".";

  return `${grouped}${decimal}${fracPart}${suffix}`;
}

/**
 * Renders the formatted numeric value. Reads config from the parent `<Price>`.
 */
function PriceValue({
  locale,
  className,
  ...props
}: PriceValueProps): React.ReactElement {
  const ctx = usePriceContext();

  const formatted = useMemo(() => {
    const raw = formatPrice(ctx.value, ctx.decimals, {
      abbreviate: ctx.abbreviate,
      maxDecimals: ctx.maxDecimals,
    });
    if (locale) return localizeFormatted(raw, locale);
    return raw;
  }, [ctx.value, ctx.decimals, ctx.abbreviate, ctx.maxDecimals, locale]);

  return (
    <span className={className} {...props}>
      {formatted}
    </span>
  );
}

// --- Price.Symbol ---

export interface PriceSymbolProps extends React.ComponentProps<"span"> {}

/**
 * Renders a currency symbol or label. Just a styled `<span>` — you control
 * placement by ordering it before or after `<Price.Value>`.
 *
 * @example Suffix (default pattern)
 * ```tsx
 * <Price value={1000000n} decimals={6}>
 *   <Price.Value /> <Price.Symbol>USDC</Price.Symbol>
 * </Price>
 * ```
 *
 * @example Prefix
 * ```tsx
 * <Price value={12345n} decimals={2}>
 *   <Price.Symbol>$</Price.Symbol><Price.Value />
 * </Price>
 * ```
 */
function PriceSymbol({
  children,
  className,
  ...props
}: PriceSymbolProps): React.ReactElement {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

export const Price: {
  (props: PriceProps): React.ReactElement;
  Value: typeof PriceValue;
  Symbol: typeof PriceSymbol;
} = Object.assign(PriceRoot, {
  Value: PriceValue,
  Symbol: PriceSymbol,
}) as typeof Price;
