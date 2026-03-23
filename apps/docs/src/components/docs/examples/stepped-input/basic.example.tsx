"use client";

import * as React from "react";
import { CursorGrowIcon, SteppedInput } from "@m3000/market";

export function SteppedInputBasicExample() {
	const [value, setValue] = React.useState(1250n);

	return (
		<div className="w-full max-w-sm">
			<SteppedInput.Root
				value={value}
				onChange={setValue}
				min={1000n}
				max={2000n}
				getTickSize={() => 25n}
			>
				<SteppedInput.Group>
					<SteppedInput.Decrement />
					<SteppedInput.ScrubArea>
						<SteppedInput.ScrubAreaCursor className="absolute left-3 text-muted-foreground">
							<CursorGrowIcon />
						</SteppedInput.ScrubAreaCursor>
						<SteppedInput.Input className="pl-14" />
					</SteppedInput.ScrubArea>
					<SteppedInput.Increment />
				</SteppedInput.Group>
			</SteppedInput.Root>
		</div>
	);
}
