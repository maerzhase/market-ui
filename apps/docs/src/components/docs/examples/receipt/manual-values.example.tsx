"use client";

import { Price, Receipt } from "@m3000/market";
import { ReceiptExampleCard } from "./shared";

export function ReceiptManualValuesExample() {
  return (
    <ReceiptExampleCard>
      <Receipt decimals={2}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header>Invoice Snapshot</Receipt.Header>
        <Receipt.Item label="Strategy workshop" value={500000n} />
        <Receipt.Item label="Implementation support" value={750000n} />
        <Receipt.Separator />
        <Receipt.Subtotal label="Approved subtotal" value={1250000n} />
        <Receipt.Tax label="VAT recorded" value={237500n} />
        <Receipt.Total label="Amount due" value={1487500n} />
      </Receipt>
    </ReceiptExampleCard>
  );
}
