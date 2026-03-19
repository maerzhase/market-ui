"use client";

import { Countdown } from "@m3000/market";

export function CountdownUsageExample() {
	return (
		<Countdown to={new Date(Date.now() + 86400000)}>
			{({ timeString, isExpired }) => (
				<span className="font-mono">
					{isExpired ? "Expired" : timeString}
				</span>
			)}
		</Countdown>
	);
}
