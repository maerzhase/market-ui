"use client";

import { Countdown } from "@m3000/market";

const TOTAL_MS = 60 * 1000;

export function CountdownProgressExample() {
	return (
		<Countdown to={new Date(Date.now() + TOTAL_MS)} stopOnExpired>
			{({ timeString, remainingMs, isExpired }) => {
				const progress = isExpired
					? 100
					: ((TOTAL_MS - (remainingMs ?? 0)) / TOTAL_MS) * 100;

				return (
					<div className="flex w-full flex-col gap-2">
						<div className="flex items-center justify-between gap-4 text-2">
							<span className="text-muted-foreground">Time remaining</span>
							<span className="font-mono">{timeString}</span>
						</div>
						<div className="h-2 overflow-hidden rounded-full bg-muted">
							<div
								className="h-full bg-success transition-[width] duration-1000"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				);
			}}
		</Countdown>
	);
}
