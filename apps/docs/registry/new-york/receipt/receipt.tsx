"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Price } from "./Price";
import { Separator } from "./Separator";

function toBigInt(value: bigint | number | string): bigint {
  if (typeof value === "bigint") return value;
  try {
    return BigInt(value);
  } catch {
    return BigInt(0);
  }
}

type ReceiptEntry = {
  id: string;
  value: bigint | number | string;
  decimals: number;
  sign?: "+" | "-";
  order: number;
};

type ReceiptStore = {
  entries: Map<string, ReceiptEntry>;
  subscribe: (cb: () => void) => () => void;
  notify: () => void;
  register: (entry: Omit<ReceiptEntry, "order">) => () => void;
  getSubtotal: (decimals: number, beforeOrder?: number) => bigint;
  getTotal: (decimals: number) => bigint;
};

function createReceiptStore(): ReceiptStore {
  const listeners = new Set<() => void>();
  const entries = new Map<string, ReceiptEntry>();
  let orderCounter = 0;

  function notify() {
    for (const cb of listeners) cb();
  }

  function subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  }

  function register(entry: Omit<ReceiptEntry, "order">) {
    const entryWithOrder = { ...entry, order: orderCounter++ };
    entries.set(entryWithOrder.id, entryWithOrder);
    notify();
    return () => {
      entries.delete(entry.id);
      notify();
    };
  }

  function getSubtotal(contextDecimals: number, beforeOrder?: number) {
    let sum = BigInt(0);
    for (const entry of entries.values()) {
      if (entry.sign) continue;
      if (beforeOrder !== undefined && entry.order >= beforeOrder) continue;
      const val = toBigInt(entry.value);
      const scale = BigInt(10 ** (contextDecimals - entry.decimals));
      sum += val * scale;
    }
    return sum;
  }

  function getTotal(contextDecimals: number) {
    let positive = BigInt(0);
    let negative = BigInt(0);
    for (const entry of entries.values()) {
      const val = toBigInt(entry.value);
      const scale = BigInt(10 ** (contextDecimals - entry.decimals));
      if (entry.sign === "-") {
        negative += val * scale;
      } else {
        positive += val * scale;
      }
    }
    return positive - negative;
  }

  return { entries, subscribe, notify, register, getSubtotal, getTotal };
}

// --- Contexts ---

type ReceiptContextValue = {
  store: ReceiptStore;
  decimals: number;
};

const ReceiptContext = React.createContext<ReceiptContextValue | null>(null);

function useReceiptContext() {
  const context = React.useContext(ReceiptContext);
  if (!context) {
    throw new Error("Receipt components must be used within a Receipt root");
  }
  return context;
}

type ReceiptPriceDefaults = {
  template: React.ReactNode;
  maxDecimals: number | undefined;
  abbreviate: boolean;
};

const ReceiptPriceContext = React.createContext<ReceiptPriceDefaults | null>(
  null
);

function useReceiptPriceDefaults() {
  return React.useContext(ReceiptPriceContext);
}

function useStoreValue<T>(store: ReceiptStore, selector: () => T): T {
  return React.useSyncExternalStore(store.subscribe, selector, selector);
}

// --- Root ---

export interface ReceiptProps extends React.ComponentProps<"div"> {
  decimals?: number;
}

function ReceiptRoot({
  children,
  className,
  decimals = 6,
  ...props
}: ReceiptProps): React.ReactElement {
  const storeRef = React.useRef<ReceiptStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createReceiptStore();
  }

  // Extract Receipt.Price from children to read defaults
  let priceDefaults: ReceiptPriceDefaults | null = null;
  const filteredChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === ReceiptPrice) {
      const {
        children: template,
        maxDecimals,
        abbreviate = false,
      } = child.props as ReceiptPriceProps;
      priceDefaults = { template, maxDecimals, abbreviate };
    } else {
      filteredChildren.push(child);
    }
  });

  const contextValue = React.useMemo(
    () => ({ store: storeRef.current!, decimals }),
    [decimals]
  );

  return (
    <ReceiptContext value={contextValue}>
      <ReceiptPriceContext value={priceDefaults}>
        <div
          className={cn(
            "text-2 text-foreground flex flex-col gap-2 leading-2",
            className
          )}
          {...props}
        >
          {filteredChildren}
        </div>
      </ReceiptPriceContext>
    </ReceiptContext>
  );
}

// --- Price (default price template) ---

export interface ReceiptPriceProps {
  /** Default max decimal digits for all price displays in the receipt. */
  maxDecimals?: number;
  /** Default abbreviation setting for all price displays. */
  abbreviate?: boolean;
  /**
   * The default Price children template — compose `<Price.Symbol>` and
   * `<Price.Value>` in the order you want them displayed.
   *
   * @example
   * ```tsx
   * <Receipt.Price maxDecimals={2}>
   *   <Price.Symbol>$</Price.Symbol><Price.Value />
   * </Receipt.Price>
   * ```
   */
  children: React.ReactNode;
}

/**
 * Declarative component — not rendered to the DOM. Placed as a direct child
 * of `<Receipt>` to set default price formatting for all sub-components.
 */
function ReceiptPrice(_props: ReceiptPriceProps): React.ReactElement {
  // Never rendered — Receipt root extracts props from this element.
  return null as unknown as React.ReactElement;
}

// --- Header ---

export interface ReceiptHeaderProps extends React.ComponentProps<"div"> {}

function ReceiptHeader({
  children,
  className,
  ...props
}: ReceiptHeaderProps): React.ReactElement {
  return (
    <div className={cn("text-foreground pb-2", className)} {...props}>
      {children}
    </div>
  );
}

// --- Item ---

export interface ReceiptItemProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  label: string;
  value: bigint | number | string;
  decimals?: number;
  maxDecimals?: number;
  abbreviate?: boolean;
  children?: React.ReactNode;
}

function ReceiptItem({
  label,
  value,
  decimals,
  maxDecimals,
  abbreviate,
  children,
  className,
  ...props
}: ReceiptItemProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const id = React.useId();
  const itemDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;

  React.useEffect(() => {
    return context.store.register({ id, value, decimals: itemDecimals });
  }, [context.store, id, value, itemDecimals]);

  return (
    <div
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      <span className="text-muted-foreground">{label}</span>
      <Price
        value={value}
        decimals={itemDecimals}
        maxDecimals={priceMaxDecimals}
        abbreviate={priceAbbreviate}
        className="text-foreground"
      >
        {priceChildren}
      </Price>
    </div>
  );
}

// --- Separator ---

export interface ReceiptSeparatorProps extends React.ComponentProps<
  typeof Separator
> {}

function ReceiptSeparator({
  className,
  ...props
}: ReceiptSeparatorProps): React.ReactElement {
  return <Separator className={cn("my-1", className)} {...props} />;
}

// --- Subtotal ---

export interface ReceiptSubtotalProps extends React.ComponentProps<"div"> {
  decimals?: number;
  maxDecimals?: number;
  abbreviate?: boolean;
  label?: string;
  value?: bigint | number | string;
  children?: React.ReactNode;
}

function ReceiptSubtotal({
  label = "Subtotal",
  value,
  decimals,
  maxDecimals,
  abbreviate,
  children,
  className,
  ...props
}: ReceiptSubtotalProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const id = React.useId();
  const displayDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;
  const orderRef = React.useRef<number>(0);

  React.useEffect(() => {
    const cleanup = context.store.register({
      id,
      value: 0,
      decimals: displayDecimals,
    });
    const entry = context.store.entries.get(id);
    orderRef.current = entry?.order ?? 0;
    return cleanup;
  }, [context.store, id, displayDecimals]);

  const subtotal = useStoreValue(context.store, () =>
    context.store.getSubtotal(displayDecimals, orderRef.current)
  );

  const displayValue = value !== undefined ? toBigInt(value) : subtotal;

  return (
    <div
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      <span className="text-muted-foreground">{label}</span>
      <Price
        value={displayValue}
        decimals={displayDecimals}
        maxDecimals={priceMaxDecimals}
        abbreviate={priceAbbreviate}
        className="text-foreground"
      >
        {priceChildren}
      </Price>
    </div>
  );
}

// --- Discount ---

export interface ReceiptDiscountProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  label: string;
  value: bigint | number | string;
  decimals?: number;
  maxDecimals?: number;
  abbreviate?: boolean;
  children?: React.ReactNode;
}

function ReceiptDiscount({
  label,
  value,
  decimals,
  maxDecimals,
  abbreviate,
  children,
  className,
  ...props
}: ReceiptDiscountProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const id = React.useId();
  const displayDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;

  React.useEffect(() => {
    return context.store.register({
      id,
      value,
      decimals: displayDecimals,
      sign: "-",
    });
  }, [context.store, id, value, displayDecimals]);

  return (
    <div
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">
        -
        <Price
          value={value}
          decimals={displayDecimals}
          maxDecimals={priceMaxDecimals}
          abbreviate={priceAbbreviate}
          className="text-foreground"
        >
          {priceChildren}
        </Price>
      </span>
    </div>
  );
}

// --- Fee ---

export interface ReceiptFeeProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  label: string;
  value: bigint | number | string;
  decimals?: number;
  maxDecimals?: number;
  abbreviate?: boolean;
  children?: React.ReactNode;
}

function ReceiptFee({
  label,
  value,
  decimals,
  maxDecimals,
  abbreviate,
  children,
  className,
  ...props
}: ReceiptFeeProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const id = React.useId();
  const displayDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;

  React.useEffect(() => {
    return context.store.register({
      id,
      value,
      decimals: displayDecimals,
      sign: "+",
    });
  }, [context.store, id, value, displayDecimals]);

  return (
    <div
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      <span className="text-muted-foreground">{label}</span>
      <Price
        value={value}
        decimals={displayDecimals}
        maxDecimals={priceMaxDecimals}
        abbreviate={priceAbbreviate}
        className="text-foreground"
      >
        {priceChildren}
      </Price>
    </div>
  );
}

// --- Tax ---

export interface ReceiptTaxProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  label?: string;
  value?: bigint | number | string;
  rate?: number;
  decimals?: number;
  maxDecimals?: number;
  abbreviate?: boolean;
  children?: React.ReactNode;
}

function ReceiptTax({
  label = "Tax",
  value,
  rate,
  decimals,
  maxDecimals,
  abbreviate,
  children,
  className,
  ...props
}: ReceiptTaxProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const id = React.useId();
  const displayDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;

  const subtotal = useStoreValue(context.store, () =>
    context.store.getSubtotal(displayDecimals)
  );

  const computedValue = React.useMemo(() => {
    if (value !== undefined) return toBigInt(value);
    if (rate !== undefined) {
      const subtotalNum = Number(subtotal) / 10 ** displayDecimals;
      const taxNum = subtotalNum * rate;
      const multiplier = BigInt(10 ** displayDecimals);
      return BigInt(Math.round(taxNum * Number(multiplier)));
    }
    return BigInt(0);
  }, [value, rate, subtotal, displayDecimals]);

  React.useEffect(() => {
    return context.store.register({
      id,
      value: computedValue,
      decimals: displayDecimals,
      sign: "+",
    });
  }, [context.store, id, computedValue, displayDecimals]);

  return (
    <div
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      <span className="text-muted-foreground">
        {label}
        {rate !== undefined && (
          <span> ({parseFloat((rate * 100).toPrecision(10))}%)</span>
        )}
      </span>
      <Price
        value={computedValue}
        decimals={displayDecimals}
        maxDecimals={priceMaxDecimals}
        abbreviate={priceAbbreviate}
        className="text-foreground"
      >
        {priceChildren}
      </Price>
    </div>
  );
}

// --- Total ---

export interface ReceiptTotalProps extends React.ComponentProps<"div"> {
  label?: string;
  value?: bigint | number | string;
  decimals?: number;
  maxDecimals?: number;
  abbreviate?: boolean;
  children?: React.ReactNode;
}

function ReceiptTotal({
  label = "Total",
  value,
  decimals,
  maxDecimals,
  abbreviate,
  children,
  className,
  ...props
}: ReceiptTotalProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const displayDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;

  const total = useStoreValue(context.store, () =>
    context.store.getTotal(displayDecimals)
  );

  const displayValue = value !== undefined ? toBigInt(value) : total;

  return (
    <div
      className={cn(
        "text-foreground flex items-center justify-between gap-4 pt-2 font-medium",
        className
      )}
      {...props}
    >
      <span>{label}</span>
      <span className="text-foreground">
        <Price
          value={displayValue}
          decimals={displayDecimals}
          maxDecimals={priceMaxDecimals}
          abbreviate={priceAbbreviate}
          className="text-foreground"
        >
          {priceChildren}
        </Price>
      </span>
    </div>
  );
}

// --- Footer ---

export interface ReceiptFooterProps extends React.ComponentProps<"div"> {}

function ReceiptFooter({
  children,
  className,
  ...props
}: ReceiptFooterProps): React.ReactElement {
  return (
    <div
      className={cn("text-1 text-muted-foreground pt-2 leading-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// --- Compound export ---

export const Receipt: {
  (props: ReceiptProps): React.ReactElement;
  Price: typeof ReceiptPrice;
  Header: typeof ReceiptHeader;
  Item: typeof ReceiptItem;
  Separator: typeof ReceiptSeparator;
  Subtotal: typeof ReceiptSubtotal;
  Discount: typeof ReceiptDiscount;
  Fee: typeof ReceiptFee;
  Tax: typeof ReceiptTax;
  Total: typeof ReceiptTotal;
  Footer: typeof ReceiptFooter;
} = Object.assign(ReceiptRoot, {
  Price: ReceiptPrice,
  Header: ReceiptHeader,
  Item: ReceiptItem,
  Separator: ReceiptSeparator,
  Subtotal: ReceiptSubtotal,
  Discount: ReceiptDiscount,
  Fee: ReceiptFee,
  Tax: ReceiptTax,
  Total: ReceiptTotal,
  Footer: ReceiptFooter,
}) as typeof Receipt;
