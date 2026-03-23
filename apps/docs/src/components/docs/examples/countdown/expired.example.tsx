"use client";

import { Countdown } from "@m3000/market";

export function CountdownExpiredExample() {
	return (
		<Countdown to={new Date(Date.now() - 3600000)} showWhenExpired>
			{({ timeString }) => (
				<span className="text-destructive">Closed - {timeString} ago</span>
			)}
		</Countdown>
	);
}
