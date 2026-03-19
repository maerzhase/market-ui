"use client";

import {
	Auction,
	AuctionArtwork,
	AuctionBidForm,
	AuctionBiddingPanel,
	AuctionDetails,
	AuctionDetailsBody,
	AuctionDetailsFooter,
	AuctionDetailsHeader,
	AuctionInfo,
	AuctionLayout,
	AuctionRankings,
	AuctionRankingsContainer,
	AuctionStatusTag,
	AuctionSuggestedBids,
	AuctionYourBids,
	Separator,
	Text,
	type AuctionData,
	type AuctionFormatters,
	type AuctionUserBid,
	type RankableBid,
} from "@m3000/market";

export const artworkUrl =
	"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg";

export const auction: AuctionData = {
	id: "hokusai-wave-auction",
	reservePrice: 10000n,
	opensAt: new Date(Date.now() - 86400000),
	endsAt: new Date(Date.now() + 86400000 * 3),
	maxTotalItems: 20,
	tickConfig: {
		threshold: 100000n,
		smallTickSize: 1000n,
		largeTickSize: 10000n,
	},
};

export const bids: RankableBid[] = Array.from({ length: 12 }, (_, index) => ({
	id: String(index + 1),
	price: (50000n - BigInt(index) * 1500n).toString(),
	created_at: new Date(Date.now() - (3600000 + index * 1200000)).toISOString(),
	bidder: {
		id: `0xbidder${index + 1}`,
		name: [
			"Alice",
			"Bob",
			"Charlie",
			"Diana",
			"Eve",
			"Frank",
			"Grace",
			"Henry",
			"Ivy",
			"Jack",
			"Kate",
			"Leo",
		][index],
	},
}));

export const userBids: AuctionUserBid[] = [
	{
		id: "9",
		price: 38000n,
		createdAt: new Date(Date.now() - 18000000),
		bidder: { id: "0xyou", name: "You" },
		globalBidId: 9n,
		status: "active",
		isWinning: true,
	},
];

export const dollarFormatters: AuctionFormatters = {
	formatPrice: (priceValue) =>
		(Number(priceValue) / 100).toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}),
	currencySymbol: "$",
	formatInputValue: (value) => Number(value) / 100,
	parseInputValue: (value) => BigInt(Math.round(value * 100)),
};

export function AuctionShell({
	children,
	className,
	withUserBids = false,
}: {
	children: React.ReactNode;
	className?: string;
	withUserBids?: boolean;
}) {
	return (
		<Auction
			auction={auction}
			bids={bids}
			userBids={withUserBids ? userBids : []}
			formatters={dollarFormatters}
			onPlaceBid={async () => true}
			onTopUpBid={async () => true}
			className={className}
		>
			{children}
		</Auction>
	);
}

export function AuctionHeader() {
	return (
		<>
			<AuctionStatusTag
				opensAt={auction.opensAt}
				endsAt={auction.endsAt}
				background="transparent"
			/>
			<h2 className="mt-2 text-lg font-semibold">The Great Wave off Kanagawa</h2>
			<Text color="secondary">Katsushika Hokusai</Text>
			<AuctionArtwork className="mt-4" src={artworkUrl} alt="The Great Wave" />
		</>
	);
}

export function AuctionDetailsSummary() {
	return (
		<div className="space-y-4">
			<div className="flex justify-between">
				<Text size="2" color="tertiary">
					Editions
				</Text>
				<Text size="2">20</Text>
			</div>
			<div className="flex justify-between">
				<Text size="2" color="tertiary">
					Reserve Price
				</Text>
				<Text size="2" tabularNums>
					$100.00
				</Text>
			</div>
			<Separator />
			<Text size="2" color="secondary">
				Bid on one of 20 limited edition prints. The top 20 bidders each win an
				edition.
			</Text>
		</div>
	);
}

export function FullAuctionExample() {
	return (
		<AuctionShell className="overflow-hidden rounded-lg border border-border bg-background shadow-lg">
			<AuctionLayout height={560}>
				<AuctionDetails>
					<AuctionDetailsHeader>
						<AuctionHeader />
					</AuctionDetailsHeader>
					<AuctionDetailsBody>
						<AuctionDetailsSummary />
					</AuctionDetailsBody>
				</AuctionDetails>
				<AuctionRankingsContainer>
					<AuctionRankings />
					<AuctionBiddingPanel>
						<AuctionBidForm.Root />
					</AuctionBiddingPanel>
				</AuctionRankingsContainer>
			</AuctionLayout>
		</AuctionShell>
	);
}

export {
	AuctionBidForm,
	AuctionDetails,
	AuctionDetailsBody,
	AuctionDetailsFooter,
	AuctionDetailsHeader,
	AuctionInfo,
	AuctionLayout,
	AuctionRankings,
	AuctionRankingsContainer,
	AuctionSuggestedBids,
	AuctionYourBids,
	Text,
};
