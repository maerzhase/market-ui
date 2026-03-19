"use client";

import { Price, Receipt } from "@m3000/market";

export function ReceiptBasicExample() {
	return (
		<div className="w-full rounded-lg border border-border bg-card p-3">
			<Receipt decimals={2}>
				<Receipt.Price maxDecimals={2}>
					<Price.Symbol>$</Price.Symbol>
					<Price.Value />
				</Receipt.Price>
				<Receipt.Header>Order Summary</Receipt.Header>
				<Receipt.Item label="Item 1" value={1511n} />
				<Receipt.Item label="Item 2" value={2000n} />
				<Receipt.Item label="Item 3" value={500n} />
				<Receipt.Separator />
				<Receipt.Subtotal />
				<Receipt.Tax rate={0.1} />
				<Receipt.Total />
			</Receipt>
		</div>
	);
}
