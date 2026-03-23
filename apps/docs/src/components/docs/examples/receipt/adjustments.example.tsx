"use client";

import { Price, Receipt } from "@m3000/market";
import { ReceiptExampleCard } from "./shared";

export function ReceiptAdjustmentsExample() {
  return (
    <ReceiptExampleCard>
      <Receipt decimals={2}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header>Fulfillment Summary</Receipt.Header>
        <Receipt.Item label="Market print" value={12500n} />
        <Receipt.Item label="Collector sleeve" value={1800n} />
        <Receipt.Separator />
        <Receipt.Subtotal />
        <Receipt.Discount label="Member discount" value={1200n} />
        <Receipt.Fee label="Shipping" value={950n} />
        <Receipt.Tax rate={0.0825} />
        <Receipt.Separator />
        <Receipt.Total />
      </Receipt>
    </ReceiptExampleCard>
  );
}
