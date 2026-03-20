"use client";

import { Price } from "@m3000/market";

export function PriceCustomRenderingExample() {
	return (
		<div className="inline-flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2">
			<span className="text-sm text-muted-foreground">
				Subtotal
			</span>
			<Price
				value={1234567n}
				decimals={2}
				maxDecimals={2}
				className="inline-flex items-baseline gap-1"
			>
				<Price.Symbol className="text-base font-medium">$</Price.Symbol>
				<Price.Value className="text-base font-medium" locale="en-US" />
			</Price>
		</div>
	);
}
