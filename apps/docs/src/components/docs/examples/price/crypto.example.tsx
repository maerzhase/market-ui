"use client";

import { Price } from "@m3000/market";

export function PriceCryptoExample() {
	return (
		<Price value={500000000000000000n} decimals={18} maxDecimals={4}>
			<Price.Value /> <Price.Symbol>ETH</Price.Symbol>
		</Price>
	);
}
