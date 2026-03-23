"use client";

import * as React from "react";
import { CursorGrowIcon, Price, SteppedInput } from "@m3000/market";

function SnapExample({
	label,
	snapToTick,
}: {
	label: string;
	snapToTick: "up" | "down" | "nearest";
}) {
	const [value, setValue] = React.useState(1050n);

	return (
		<div className="space-y-2">
			<p className="text-sm font-medium">{label}</p>
			<SteppedInput.Root
				value={value}
				onChange={setValue}
				min={0n}
				max={5000n}
				getTickSize={() => 1000n}
				decimals={2}
				snapToTick={snapToTick}
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

export function SteppedInputSnapToTickExample() {
	return (
		<div className="w-full max-w-md space-y-5">
			<p className="text-sm text-muted-foreground">
				Starting from $10.50 with a $10.00 tick size, each mode snaps edits to a
				different valid price level.
			</p>
			<SnapExample label='snapToTick="up"' snapToTick="up" />
			<SnapExample label='snapToTick="down"' snapToTick="down" />
			<SnapExample label='snapToTick="nearest"' snapToTick="nearest" />
		</div>
	);
}
