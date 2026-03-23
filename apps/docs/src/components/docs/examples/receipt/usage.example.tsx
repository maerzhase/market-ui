"use client";

import { Price, Receipt } from "@m3000/market";
import { ReceiptExampleCard } from "./shared";

export function ReceiptUsageExample() {
  return (
    <ReceiptExampleCard>
      <Receipt decimals={2}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header>Order Summary</Receipt.Header>
        <Receipt.Item label="Market print" value={1500n} />
        <Receipt.Item label="Frame upgrade" value={2400n} />
        <Receipt.Separator />
        <Receipt.Subtotal />
        <Receipt.Tax rate={0.1} />
        <Receipt.Total />
      </Receipt>
    </ReceiptExampleCard>
  );
}
