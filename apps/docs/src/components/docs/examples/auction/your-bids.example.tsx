"use client";

import { AuctionShell, AuctionYourBids } from "./shared";

export function AuctionYourBidsExample() {
	return (
		<AuctionShell
			withUserBids
			className="rounded-lg border border-border bg-background p-6 shadow-lg"
		>
			<AuctionYourBids className="max-h-[320px]" />
		</AuctionShell>
	);
}
