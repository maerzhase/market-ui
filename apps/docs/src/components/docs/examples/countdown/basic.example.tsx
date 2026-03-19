"use client";

import { Countdown } from "@m3000/market";

export function CountdownBasicExample() {
	return (
		<Countdown to={new Date(Date.now() + 86400000 * 3)}>
			{({ timeString }) => <span className="font-mono text-4">{timeString}</span>}
		</Countdown>
	);
}
