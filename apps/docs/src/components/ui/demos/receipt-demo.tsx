"use client";

import { Price, Receipt } from "@m3000/market";

export function ReceiptDemo() {
	return (
		<div className="w-full max-w-64 rounded-lg border border-border bg-card p-3">
			<Receipt decimals={2}>
				<Receipt.Price maxDecimals={2}>
					<Price.Symbol>$</Price.Symbol>
					<Price.Value />
				</Receipt.Price>
				<Receipt.Header>
					<span className="text-3 font-semibold">Order Summary</span>
				</Receipt.Header>
				<Receipt.Item label="Premium Item" value={15000n} />
				<Receipt.Item label="Standard Item" value={5000n} />
				<Receipt.Separator />
				<Receipt.Subtotal />
				<Receipt.Tax rate={0.1} />
				<Receipt.Total />
			</Receipt>
		</div>
	);
}
