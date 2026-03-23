"use client";

import { Price, Receipt } from "@m3000/market";
import { ReceiptExampleCard } from "./shared";

export function ReceiptCustomPriceRenderingExample() {
  return (
    <ReceiptExampleCard>
      <Receipt decimals={2}>
        <Receipt.Price maxDecimals={2}>
          <span className="inline-flex items-baseline gap-1.5">
            <Price.Value
              className="font-medium tracking-tight"
              locale="en-US"
            />
            <Price.Symbol className="text-muted-foreground uppercase">
              usd
            </Price.Symbol>
          </span>
        </Receipt.Price>
        <Receipt.Header>Custom Rendering</Receipt.Header>
        <Receipt.Item label="Artwork reserve" value={280000n} />
        <Receipt.Item label="Primary market fee" value={1250n}>
          <span className="inline-flex items-baseline gap-1">
            <Price.Symbol className="text-muted-foreground">$</Price.Symbol>
            <Price.Value className="font-semibold" locale="en-US" />
          </span>
        </Receipt.Item>
        <Receipt.Separator />
        <Receipt.Total />
      </Receipt>
    </ReceiptExampleCard>
  );
}
