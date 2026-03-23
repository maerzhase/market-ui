"use client";

import { Price } from "@m3000/market";

export function PriceFixedPrecisionExample() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<Price
					value={1825000000000000000n}
					decimals={18}
					className="inline-flex items-baseline gap-1"
				>
					<Price.Value className="font-medium" locale="en-US" />
					<Price.Symbol className="text-sm text-muted-foreground">
						ETH
					</Price.Symbol>
				</Price>
				<span className="text-sm text-muted-foreground">
					Default precision adapts to the value
				</span>
			</div>

			<div className="flex flex-col gap-1">
				<Price
					value={1825000000000000000n}
					decimals={18}
					minDecimals={4}
					maxDecimals={4}
					className="inline-flex items-baseline gap-1"
				>
					<Price.Value className="font-medium" locale="en-US" />
					<Price.Symbol className="text-sm text-muted-foreground">
						ETH
					</Price.Symbol>
				</Price>
				<span className="text-sm text-muted-foreground">
					Fixed precision stays stable at 4 decimals
				</span>
			</div>
		</div>
	);
}
