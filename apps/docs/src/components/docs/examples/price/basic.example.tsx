"use client";

import { Price } from "@m3000/market";

export function PriceBasicExample() {
	return (
		<Price value={12345} decimals={2}>
			<Price.Symbol>$</Price.Symbol>
			<Price.Value />
		</Price>
	);
}
