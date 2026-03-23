"use client";

import * as React from "react";
import { CursorGrowIcon, Price, SteppedInput } from "@m3000/market";

export function SteppedInputDynamicTickExample() {
	const [value, setValue] = React.useState(95000n);

	const getTickSize = React.useCallback((currentValue: bigint) => {
		if (currentValue < 100000n) return 1000n;
		if (currentValue < 250000n) return 2500n;
		return 5000n;
	}, []);

	return (
		<div className="w-full max-w-sm space-y-3">
			<p className="text-sm text-muted-foreground">
				Step size shifts from $10 to $25 to $50 as the value increases.
			</p>
			<SteppedInput.Root
				value={value}
				onChange={setValue}
				min={50000n}
				max={400000n}
				getTickSize={getTickSize}
				decimals={2}
			>
				<SteppedInput.Group>
					<SteppedInput.Decrement />
					<SteppedInput.ScrubArea>
						<SteppedInput.ScrubAreaCursor className="absolute left-3 text-muted-foreground">
							<CursorGrowIcon />
						</SteppedInput.ScrubAreaCursor>
						<SteppedInput.Value className="pl-14">
							{({ value: currentValue }) => (
								<Price
									value={currentValue}
									decimals={2}
									maxDecimals={2}
									className="inline-flex items-baseline gap-1"
								>
									<Price.Symbol className="text-sm text-muted-foreground">
										$
									</Price.Symbol>
									<Price.Value className="font-medium" locale="en-US" />
								</Price>
							)}
						</SteppedInput.Value>
					</SteppedInput.ScrubArea>
					<SteppedInput.Increment />
				</SteppedInput.Group>
			</SteppedInput.Root>
		</div>
	);
}
