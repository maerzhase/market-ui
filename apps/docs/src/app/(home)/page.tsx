"use client";

import {
	Button,
	Countdown,
	Price,
	RankedList,
	Receipt,
	Separator,
	Text,
} from "@m3000/market";
import Link from "next/link";
import { Installation } from "@/components/docs/installation";
import { ComponentShowcase } from "@/components/ui/component-showcase";

interface DemoBid {
	id: string;
	name: string;
	score: number;
}

const DEMO_BIDS: DemoBid[] = [
	{ id: "1", name: "Alice", score: 950 },
	{ id: "2", name: "Bob", score: 880 },
	{ id: "3", name: "Charlie", score: 820 },
	{ id: "4", name: "Diana", score: 790 },
	{ id: "5", name: "Eve", score: 750 },
];

function PriceDemo() {
	return (
		<div className="flex flex-col gap-2">
			<Price value={12345} decimals={2}>
				<Price.Symbol>$</Price.Symbol>
				<Price.Value />
			</Price>
			<Price value={500000000000000000n} decimals={18} maxDecimals={4}>
				<Price.Value /> <Price.Symbol>ETH</Price.Symbol>
			</Price>
			<Price value={250000000n} decimals={2} abbreviate>
				<Price.Symbol>$</Price.Symbol>
				<Price.Value />
			</Price>
		</div>
	);
}

function RankedListDemo() {
	return (
		<div className="max-h-36 w-full overflow-hidden rounded-lg border border-border bg-background">
			<RankedList.Root
				items={DEMO_BIDS.slice(0, 3)}
				getKey={(item) => item.id}
				boundaries={[2]}
				labels={["Top", "Others"]}
			>
				<RankedList.Group>
					<RankedList.GroupDivider />
					<RankedList.GroupItem>
						<RankedList.GroupItemValue>
							{(item: DemoBid, ctx) => (
								<>
									<div className="flex items-center justify-between px-3 py-1.5">
										<div className="flex items-center gap-2">
											<RankedList.GroupItemIndex />
											<Text size="2">{item.name}</Text>
										</div>
										<Text size="2" color="secondary">
											{item.score}
										</Text>
									</div>
									{!ctx.isLastInGroup && <Separator orientation="horizontal" />}
								</>
							)}
						</RankedList.GroupItemValue>
					</RankedList.GroupItem>
				</RankedList.Group>
			</RankedList.Root>
		</div>
	);
}

function CountdownDemo() {
	return (
		<Countdown to={new Date(Date.now() + 86400000 * 3)}>
			{({ timeString, isExpired }) => (
				<span className="font-mono text-3">
					{isExpired ? "Expired" : timeString}
				</span>
			)}
		</Countdown>
	);
}

function ReceiptDemo() {
	return (
		<div className="w-full max-w-64 rounded-lg border border-border bg-surface p-3">
			<Receipt decimals={2}>
				<Receipt.Price maxDecimals={2}>
					<Price.Symbol>$</Price.Symbol>
					<Price.Value />
				</Receipt.Price>
				<Receipt.Header>
					<span className="text-3 font-semibold">Order Summary</span>
				</Receipt.Header>
				<Receipt.Item label="Premium Item" value={15000n} />
				<Receipt.Item label="Standard Item" value={5000n} />
				<Receipt.Separator />
				<Receipt.Subtotal />
				<Receipt.Tax rate={0.1} />
				<Receipt.Total />
			</Receipt>
		</div>
	);
}

const COMPONENTS = [
	{
		name: "Price",
		description:
			"Format cryptocurrency and fiat prices with customizable precision, symbols, and localization.",
		href: "/docs/primitives/price",
		demo: <PriceDemo />,
	},
	{
		name: "RankedList",
		description:
			"Display ranked items with group boundaries, custom dividers, and preview slots.",
		href: "/docs/primitives/ranked-list",
		demo: <RankedListDemo />,
	},
	{
		name: "Countdown",
		description:
			"Countdown timer with semantic labels, progress bars, and custom rendering.",
		href: "/docs/primitives/countdown",
		demo: <CountdownDemo />,
	},
	{
		name: "Receipt",
		description:
			"Build order summaries with items, taxes, fees, and dynamic totals.",
		href: "/docs/primitives/receipt",
		demo: <ReceiptDemo />,
	},
];

export default function Home() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="pt-12 pb-20">
				<div className="mx-auto max-w-5xl px-6 text-center">
					<h1 className="text-6xl font-bold tracking-tight">
						Trading UI Components
					</h1>
					<p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
						A collection of beautifully crafted React components for trading
						interfaces. Price formatting, ranked lists, countdowns, receipts,
						and more.
					</p>
					<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Installation />
						<Button
							color="secondary"
							size="lg"
							render={<Link href="/docs" />}
						>
							Browse Docs
						</Button>
					</div>
				</div>
			</section>

			{/* Component Grid */}
			<section className="pb-24">
				<div className="mx-auto max-w-7xl px-6">
					<h2 className="mb-8 text-3xl font-semibold tracking-tight">
						Components
					</h2>
					<div className="grid gap-6 sm:grid-cols-2">
						{COMPONENTS.map((component) => (
							<ComponentShowcase
								key={component.name}
								name={component.name}
								description={component.description}
								href={component.href}
							>
								{component.demo}
							</ComponentShowcase>
						))}
					</div>
				</div>
			</section>

			{/* Complex UI Section */}
			<section className="border-t border-border bg-muted/30 py-24">
				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-12 text-center">
						<h2 className="text-3xl font-semibold tracking-tight">
							Complex UI Components
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
							Built from primitives, our complex components provide complete
							solutions for real-world trading interfaces.
						</p>
					</div>
					<ComponentShowcase
						name="Auction"
						description="A complete auction interface with bid rankings, live previews, stepped bidding, and responsive layouts."
						href="/docs/blocks/auction"
						variant="large"
						className="border-primary/20"
					>
						<div className="flex items-center justify-center">
							<Text color="secondary" size="2" className="text-center">
								Live Auction Interface
								<br />
								<span className="text-1 text-muted-foreground">
									See Storybook for interactive demo
								</span>
							</Text>
						</div>
					</ComponentShowcase>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border py-12">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
						<Text color="secondary" size="2">
							Built with React, Tailwind CSS, and Motion
						</Text>
						<Text color="secondary" size="2">
							MIT License
						</Text>
					</div>
				</div>
			</footer>
		</main>
	);
}
