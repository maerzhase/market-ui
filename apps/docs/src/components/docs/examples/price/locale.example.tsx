"use client";

import { Price } from "@m3000/market";

export function PriceLocaleExample() {
	return (
		<Price value={123456789n} decimals={2} maxDecimals={2}>
			<Price.Value locale="de-DE" /> <Price.Symbol>EUR</Price.Symbol>
		</Price>
	);
}
