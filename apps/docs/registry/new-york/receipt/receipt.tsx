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

function scaleValue(
  value: bigint | number | string,
  fromDecimals: number,
  toDecimals: number,
): bigint {
  const normalizedValue = toBigInt(value);
  if (fromDecimals === toDecimals) return normalizedValue;
  const scale = BigInt(10 ** Math.abs(toDecimals - fromDecimals));
  return fromDecimals < toDecimals
    ? normalizedValue * scale
    : normalizedValue / scale;
}

function computeTaxFromRate(
  subtotal: bigint,
  decimals: number,
  rate: number,
): bigint {
  const subtotalNum = Number(subtotal) / 10 ** decimals;
  const taxNum = subtotalNum * rate;
  const multiplier = BigInt(10 ** decimals);
  return BigInt(Math.round(taxNum * Number(multiplier)));
}

type ReceiptRowKind =
  | "item"
  | "discount"
  | "fee"
  | "subtotal"
  | "tax"
  | "total";

type ComputedReceiptValues = {
  subtotals: Map<number, bigint>;
  taxes: Map<number, bigint>;
  totals: Map<number, bigint>;
};

type ReceiptContextValue = {
  decimals: number;
  computed: ComputedReceiptValues;
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
  null,
);

function useReceiptPriceDefaults() {
  return React.useContext(ReceiptPriceContext);
}

type ReceiptCalculationDescriptor = {
  index: number;
  kind: ReceiptRowKind;
  decimals: number;
  value?: bigint | number | string;
  rate?: number;
};

type ReceiptInternalIndexProp = {
  __receiptIndex?: number;
};

function isElementOfType<P>(
  child: React.ReactNode,
  component: React.ComponentType<P>,
): child is React.ReactElement<P> {
  return React.isValidElement(child) && child.type === component;
}

function getDisplayValue(
  explicitValue: bigint | number | string | undefined,
  fallbackValue: bigint,
): bigint {
  return explicitValue !== undefined ? toBigInt(explicitValue) : fallbackValue;
}

function computeReceiptValues(
  descriptors: ReceiptCalculationDescriptor[],
  receiptDecimals: number,
): ComputedReceiptValues {
  const subtotals = new Map<number, bigint>();
  const taxes = new Map<number, bigint>();
  const totals = new Map<number, bigint>();

  let subtotalAccumulator = BigInt(0);
  let positiveAccumulator = BigInt(0);
  let negativeAccumulator = BigInt(0);

  for (const descriptor of descriptors) {
    switch (descriptor.kind) {
      case "item": {
        const scaledValue = scaleValue(
          descriptor.value ?? 0,
          descriptor.decimals,
          receiptDecimals,
        );
        subtotalAccumulator += scaledValue;
        positiveAccumulator += scaledValue;
        break;
      }
      case "discount": {
        const scaledValue = scaleValue(
          descriptor.value ?? 0,
          descriptor.decimals,
          receiptDecimals,
        );
        negativeAccumulator += scaledValue;
        break;
      }
      case "fee": {
        const scaledValue = scaleValue(
          descriptor.value ?? 0,
          descriptor.decimals,
          receiptDecimals,
        );
        positiveAccumulator += scaledValue;
        break;
      }
      case "subtotal": {
        subtotals.set(descriptor.index, subtotalAccumulator);
        break;
      }
      case "tax": {
        const explicitValue = descriptor.value;
        const computedTax =
          explicitValue !== undefined
            ? scaleValue(explicitValue, descriptor.decimals, receiptDecimals)
            : descriptor.rate !== undefined
              ? computeTaxFromRate(
                  scaleValue(
                    subtotalAccumulator,
                    receiptDecimals,
                    descriptor.decimals,
                  ),
                  descriptor.decimals,
                  descriptor.rate,
                )
              : BigInt(0);
        taxes.set(
          descriptor.index,
          scaleValue(computedTax, descriptor.decimals, receiptDecimals),
        );
        positiveAccumulator += scaleValue(
          computedTax,
          descriptor.decimals,
          receiptDecimals,
        );
        break;
      }
      case "total": {
        totals.set(descriptor.index, positiveAccumulator - negativeAccumulator);
        break;
      }
    }
  }

  return { subtotals, taxes, totals };
}

export interface ReceiptProps extends React.ComponentProps<"div"> {
  decimals?: number;
}

export interface ReceiptPriceProps {
  maxDecimals?: number;
  abbreviate?: boolean;
  children: React.ReactNode;
}

function ReceiptPrice(_props: ReceiptPriceProps): React.ReactElement {
  return null as unknown as React.ReactElement;
}

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

export interface ReceiptItemProps
  extends Omit<React.ComponentProps<"div">, "children">,
    ReceiptInternalIndexProp {
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
  __receiptIndex: _receiptIndex,
  ...props
}: ReceiptItemProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const itemDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;

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

export interface ReceiptSeparatorProps
  extends React.ComponentProps<typeof Separator> {}

function ReceiptSeparator({
  className,
  ...props
}: ReceiptSeparatorProps): React.ReactElement {
  return <Separator className={cn("my-1", className)} {...props} />;
}

export interface ReceiptSubtotalProps
  extends React.ComponentProps<"div">,
    ReceiptInternalIndexProp {
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
  __receiptIndex: _receiptIndex,
  ...props
}: ReceiptSubtotalProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const displayDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;
  const computedSubtotal =
    _receiptIndex !== undefined
      ? (context.computed.subtotals.get(_receiptIndex) ?? BigInt(0))
      : BigInt(0);
  const displayValue = getDisplayValue(
    value,
    scaleValue(computedSubtotal, context.decimals, displayDecimals),
  );

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

export interface ReceiptDiscountProps
  extends Omit<React.ComponentProps<"div">, "children">,
    ReceiptInternalIndexProp {
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
  __receiptIndex: _receiptIndex,
  ...props
}: ReceiptDiscountProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const displayDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;

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

export interface ReceiptFeeProps
  extends Omit<React.ComponentProps<"div">, "children">,
    ReceiptInternalIndexProp {
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
  __receiptIndex: _receiptIndex,
  ...props
}: ReceiptFeeProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const displayDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;

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

export interface ReceiptTaxProps
  extends Omit<React.ComponentProps<"div">, "children">,
    ReceiptInternalIndexProp {
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
  __receiptIndex: _receiptIndex,
  ...props
}: ReceiptTaxProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const displayDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;
  const computedTax =
    _receiptIndex !== undefined
      ? (context.computed.taxes.get(_receiptIndex) ?? BigInt(0))
      : BigInt(0);
  const displayValue = getDisplayValue(
    value,
    scaleValue(computedTax, context.decimals, displayDecimals),
  );

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

export interface ReceiptTotalProps
  extends React.ComponentProps<"div">,
    ReceiptInternalIndexProp {
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
  __receiptIndex: _receiptIndex,
  ...props
}: ReceiptTotalProps): React.ReactElement {
  const context = useReceiptContext();
  const defaults = useReceiptPriceDefaults();
  const displayDecimals = decimals ?? context.decimals;
  const priceChildren = children ?? defaults?.template;
  const priceMaxDecimals = maxDecimals ?? defaults?.maxDecimals;
  const priceAbbreviate = abbreviate ?? defaults?.abbreviate;
  const computedTotal =
    _receiptIndex !== undefined
      ? (context.computed.totals.get(_receiptIndex) ?? BigInt(0))
      : BigInt(0);
  const displayValue = getDisplayValue(
    value,
    scaleValue(computedTotal, context.decimals, displayDecimals),
  );

  return (
    <div
      className={cn(
        "text-foreground flex items-center justify-between gap-4 pt-2 font-medium",
        className,
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

export interface ReceiptFooterProps extends React.ComponentProps<"div"> {}

function ReceiptFooter({
  children,
  className,
  ...props
}: ReceiptFooterProps): React.ReactElement {
  return (
    <div
      className={cn(
        "pt-2 text-xs leading-[18px] text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ReceiptRoot({
  children,
  className,
  decimals = 6,
  ...props
}: ReceiptProps): React.ReactElement {
  let priceDefaults: ReceiptPriceDefaults | null = null;
  const calculationDescriptors: ReceiptCalculationDescriptor[] = [];

  const renderedChildren = React.Children.toArray(children).flatMap(
    (child, index) => {
      if (isElementOfType(child, ReceiptPrice)) {
        const {
          children: template,
          maxDecimals,
          abbreviate = false,
        } = child.props as ReceiptPriceProps;
        priceDefaults = { template, maxDecimals, abbreviate };
        return [];
      }

      if (!React.isValidElement(child)) {
        return [child];
      }

      if (isElementOfType(child, ReceiptItem)) {
        calculationDescriptors.push({
          index,
          kind: "item",
          value: child.props.value,
          decimals: child.props.decimals ?? decimals,
        });
      } else if (isElementOfType(child, ReceiptDiscount)) {
        calculationDescriptors.push({
          index,
          kind: "discount",
          value: child.props.value,
          decimals: child.props.decimals ?? decimals,
        });
      } else if (isElementOfType(child, ReceiptFee)) {
        calculationDescriptors.push({
          index,
          kind: "fee",
          value: child.props.value,
          decimals: child.props.decimals ?? decimals,
        });
      } else if (isElementOfType(child, ReceiptSubtotal)) {
        calculationDescriptors.push({
          index,
          kind: "subtotal",
          value: child.props.value,
          decimals: child.props.decimals ?? decimals,
        });
      } else if (isElementOfType(child, ReceiptTax)) {
        calculationDescriptors.push({
          index,
          kind: "tax",
          value: child.props.value,
          rate: child.props.rate,
          decimals: child.props.decimals ?? decimals,
        });
      } else if (isElementOfType(child, ReceiptTotal)) {
        calculationDescriptors.push({
          index,
          kind: "total",
          value: child.props.value,
          decimals: child.props.decimals ?? decimals,
        });
      } else {
        return [child];
      }

      return [
        React.cloneElement(
          child as React.ReactElement<ReceiptInternalIndexProp>,
          {
            __receiptIndex: index,
          },
        ),
      ];
    },
  );

  const computed = React.useMemo(
    () => computeReceiptValues(calculationDescriptors, decimals),
    [calculationDescriptors, decimals],
  );

  const contextValue = React.useMemo(
    () => ({ decimals, computed }),
    [decimals, computed],
  );

  return (
    <ReceiptContext value={contextValue}>
      <ReceiptPriceContext value={priceDefaults}>
        <div
          className={cn(
            "flex flex-col gap-2 text-sm leading-[21px] text-foreground",
            className,
          )}
          {...props}
        >
          {renderedChildren}
        </div>
      </ReceiptPriceContext>
    </ReceiptContext>
  );
}

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
