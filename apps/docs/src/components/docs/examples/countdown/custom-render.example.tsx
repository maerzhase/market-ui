"use client";

import { Countdown } from "@m3000/market";

export function CountdownCustomRenderExample() {
	return (
		<Countdown to={new Date(Date.now() + 86400000)}>
			{({ timeString }) => (
				<span className="font-mono text-xl leading-7 text-success">{timeString}</span>
			)}
		</Countdown>
	);
}
