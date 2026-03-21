"use client";

import {
  Button,
  Countdown,
  Price,
  Ranking,
  Receipt,
  Separator,
  Text,
} from "@m3000/market";
import Link from "next/link";
import { ComponentShowcase } from "@/components/ui/component-showcase";
import { LandingReceipt } from "@/components/ui/landing-receipt";

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

function RankingDemo() {
  return (
    <div className="border-border bg-background w-full overflow-hidden rounded-lg border">
      <Ranking.Root
        items={DEMO_BIDS.slice(0, 5)}
        getKey={(item) => item.id}
        boundaries={[2]}
        labels={["Top", "Others"]}
      >
        <Ranking.Group>
          <Ranking.GroupDivider />
          <Ranking.GroupItem>
            <Ranking.GroupItemValue>
              {(item: DemoBid, ctx) => (
                <>
                  <div className="flex items-center justify-between px-3 py-1.5">
                    <div className="flex items-center gap-2">
                      <Ranking.GroupItemIndex />
                      <Text size="2">{item.name}</Text>
                    </div>
                    <Text size="2" color="secondary">
                      {item.score}
                    </Text>
                  </div>
                  {!ctx.isLastInGroup && <Separator orientation="horizontal" />}
                </>
              )}
            </Ranking.GroupItemValue>
          </Ranking.GroupItem>
        </Ranking.Group>
      </Ranking.Root>
    </div>
  );
}

function CountdownDemo() {
  return (
    <Countdown to={new Date(Date.now() + 86400000 * 3)}>
      {({ timeString, isExpired }) => (
        <span className="text-3 font-mono">
          {isExpired ? "Expired" : timeString}
        </span>
      )}
    </Countdown>
  );
}

function ReceiptDemo() {
  return (
    <div className="border-border bg-background w-full rounded-lg border p-3">
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
    name: "Ranking",
    description:
      "Render already-sorted ranked items with group boundaries, custom dividers, and inserted slots.",
    href: "/docs/primitives/ranking",
    demo: <RankingDemo />,
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
      <section className="relative flex min-h-[calc(100vh-8rem)] items-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,205,193,0.55),transparent_32%),radial-gradient(circle_at_78%_22%,rgba(255,178,164,0.32),transparent_28%),linear-gradient(180deg,rgba(252,248,245,0.92),rgba(252,248,245,0.65))]" />

        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="relative z-10">
            <div className="border-primary/20 bg-background/85 text-primary inline-flex rounded-full border px-4 py-1.5 text-[0.72rem] font-semibold tracking-[0.24em] whitespace-nowrap uppercase shadow-sm backdrop-blur">
              Marketplace design system
            </div>
            <h1 className="text-foreground relative z-10 mt-5 max-w-3xl text-[2.5rem] leading-[1.1] font-bold tracking-[-0.04em] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.5rem]">
              Interfaces shaped by price, time, and competition.
            </h1>
            <p className="text-muted-foreground relative z-10 mt-5 max-w-2xl text-base leading-7 md:text-lg">
              Components for building transactions, auctions, and marketplace mechanics.
            </p>
            <div className="relative z-10 mt-7 flex items-center gap-4">
              <Button color="tertiary" render={<Link href="/docs" />}>
                Browse Docs
              </Button>
              <Link
                href="/docs/primitives/receipt"
                className="text-foreground hover:text-primary text-sm font-medium transition-colors"
              >
                Explore the Receipt primitive →
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-96 md:mx-0 md:justify-self-end">
            <LandingReceipt />
          </div>
        </div>
      </section>

      {/* Component Grid */}
      <section className="pt-4 pb-24">
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
      <section className="border-border bg-muted/30 border-t py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Complex UI Components
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
              Built from primitives, our complex components provide complete
              solutions for real-world marketplace applications.
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
      <footer className="border-border border-t py-12">
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
