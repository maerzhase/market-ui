"use client";

import { Price, Receipt } from "@m3000/market";
import { ReceiptExampleCard } from "./shared";

export function ReceiptFullExample() {
  return (
    <ReceiptExampleCard>
      <Receipt decimals={6}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header className="flex items-baseline justify-between">
          <span className="text-xl font-semibold">Order #12345</span>
          <span className="text-xs leading-[18px] text-muted-foreground">
            March 16, 2026
          </span>
        </Receipt.Header>
        <Receipt.Item label="Product A" value={2500000n} />
        <Receipt.Item label="Product B" value={1800000n} />
        <Receipt.Item label="Product C" value={700000n} />
        <Receipt.Separator />
        <Receipt.Subtotal />
        <Receipt.Discount label="Member Discount" value={500000n} />
        <Receipt.Fee label="Shipping" value={200000n} />
        <Receipt.Tax rate={0.08} />
        <Receipt.Separator />
        <Receipt.Total />
        <Receipt.Footer>Thank you for your order.</Receipt.Footer>
      </Receipt>
    </ReceiptExampleCard>
  );
}
