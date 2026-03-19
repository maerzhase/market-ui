"use client";

import { Price, Receipt } from "@m3000/market";

export function ReceiptFullExample() {
	return (
		<div className="w-full rounded-lg border border-border bg-card p-3">
			<Receipt decimals={6}>
				<Receipt.Price maxDecimals={2}>
					<Price.Symbol>$</Price.Symbol>
					<Price.Value />
				</Receipt.Price>
				<Receipt.Header className="flex items-baseline justify-between">
					<span className="text-4 font-semibold">Order #12345</span>
					<span className="text-1 text-muted-foreground">March 16, 2026</span>
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
				<Receipt.Footer>
					<span className="text-center text-1 text-muted-foreground">
						Thank you for your order!
					</span>
				</Receipt.Footer>
			</Receipt>
		</div>
	);
}
