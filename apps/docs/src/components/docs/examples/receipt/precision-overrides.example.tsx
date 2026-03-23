"use client";

import { Price, Receipt } from "@m3000/market";
import { ReceiptExampleCard } from "./shared";

export function ReceiptPrecisionOverridesExample() {
  return (
    <ReceiptExampleCard>
      <Receipt decimals={6}>
        <Receipt.Price maxDecimals={4}>
          <span className="inline-flex items-baseline gap-1">
            <Price.Value />
            <Price.Symbol className="text-muted-foreground">USDC</Price.Symbol>
          </span>
        </Receipt.Price>
        <Receipt.Header>Treasury Settlement</Receipt.Header>
        <Receipt.Item label="Block allocation" value={1250000000n} abbreviate />
        <Receipt.Item
          label="Broker credit"
          value={2500n}
          decimals={2}
          maxDecimals={2}
        />
        <Receipt.Fee
          label="Network fee"
          value={125000n}
          decimals={6}
          maxDecimals={6}
        />
        <Receipt.Separator />
        <Receipt.Total label="Net settlement" abbreviate />
      </Receipt>
    </ReceiptExampleCard>
  );
}
