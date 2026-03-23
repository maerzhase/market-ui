"use client";

import { Price } from "@m3000/market";

export function PriceAbbreviatedExample() {
	return (
		<Price value={250000000n} decimals={2} abbreviate>
			<Price.Symbol>$</Price.Symbol>
			<Price.Value />
		</Price>
	);
}
