"use client";

import { Price } from "@m3000/market";

export function PriceDemo() {
	return (
		<div className="flex flex-col gap-2">
			<Price value={12345} decimals={2}>
				<Price.Symbol>$</Price.Symbol>
				<Price.Value />
			</Price>
			<Price value={500000000000000000n} decimals={18} maxDecimals={4}>
				<Price.Value /> <Price.Symbol>ETH</Price.Symbol>
			</Price>
			<Price value={250000000n} decimals={2} abbreviate>
				<Price.Symbol>$</Price.Symbol>
				<Price.Value />
			</Price>
		</div>
	);
}
