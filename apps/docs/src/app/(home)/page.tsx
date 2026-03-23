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
import { AuctionComingSoonTeaser } from "@/components/ui/auction-coming-soon-teaser";
import { ComponentShowcase } from "@/components/ui/component-showcase";
import { FeedbackDemo } from "@/components/ui/demos/feedback-demo";
import { SteppedInputDemo } from "@/components/ui/demos/stepped-input-demo";
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
];

function PriceDemo() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center tabular-nums">
      <Price value={12345} decimals={2}>
        <Price.Symbol>$</Price.Symbol>
        <Price.Value />
      </Price>
      <Price value={250000000n} decimals={2} abbreviate>
        <Price.Symbol>$</Price.Symbol>
        <Price.Value />
      </Price>
      <Price value={500000000000000000n} decimals={18} maxDecimals={4}>
        <Price.Value /> <Price.Symbol>Ξ</Price.Symbol>
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
        <Ranking.Slot slotKey="projected-ranking" atIndex={2}>
          {({ rank }) => (
            <>
              <div className="bg-muted/45 px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Text size="2" color="tertiary" className="w-8 shrink-0">
                      #{rank}
                    </Text>
                    <Text size="2" color="secondary">
                      Your projected ranking
                    </Text>
                  </div>
                  <Text size="2" color="secondary">
                    845
                  </Text>
                </div>
              </div>
              <Separator orientation="horizontal" />
            </>
          )}
        </Ranking.Slot>
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
    <div className="flex h-full w-full items-center justify-center text-center">
      <Countdown to={new Date(Date.now() + 86400000 * 3)}>
        {({ timeString, isExpired }) => (
          <span className="text-3 font-mono" suppressHydrationWarning>
            {isExpired ? "Expired" : timeString}
          </span>
        )}
      </Countdown>
    </div>
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
      "Locale-aware currency formatting with flexible symbols and bigint precision.",
    href: "/docs/primitives/price",
    demo: <PriceDemo />,
  },
  {
    name: "Price Input",
    description:
      "Tick-aware price entry with bigint-backed values, editable decimals, and composable rendering.",
    href: "/docs/primitives/stepped-input",
    demo: <SteppedInputDemo />,
  },
  {
    name: "Countdown",
    description:
      "Build countdowns with semantic labels, progress indicators, and full rendering control.",
    href: "/docs/primitives/countdown",
    demo: <CountdownDemo />,
  },
  {
    name: "Feedback",
    description:
      "Attach animated feedback to UI triggers, with composable positioning and chaining.",
    href: "/docs/primitives/feedback",
    demo: <FeedbackDemo />,
  },
  {
    name: "Ranking",
    description:
      "Render sorted items as grouped lists with configurable boundaries, dividers, and slots.",
    href: "/docs/primitives/ranking",
    demo: <RankingDemo />,
  },
  {
    name: "Receipt",
    description:
      "Build receipts declaratively with automatic subtotals, totals, taxes, and fees.",
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
              Build interfaces shaped by price, time, and competition.
            </h1>
            <p className="text-muted-foreground relative z-10 mt-5 text-base leading-4 md:text-lg">
              Declarative components for transactions, auctions, and dynamic marketplace logic.”
            </p>
            <div className="relative z-10 mt-7 flex items-center gap-4">
              <Button
                color="tertiary"
                nativeButton={false}
                render={<Link href="/docs" />}
              >
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
          <div className="mb-10 text-center">
            <div className="border-primary/20 bg-background/75 text-primary inline-flex rounded-full border px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.22em] uppercase backdrop-blur">
              Primitives
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Foundational pieces for marketplace interfaces.
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
              Components for formatting value, time, ranking, and transactional detail with a consistent visual language.
            </p>
          </div>
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

      {/* Blocks Section */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <div className="border-primary/20 bg-background/75 text-primary inline-flex rounded-full border px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.22em] uppercase backdrop-blur">
              Marketplace flows
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Composable interfaces for marketplace interactions.
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
              Blocks layer primitives into declarative, production-ready flows.
            </p>
          </div>
          <div className="space-y-12">
            <div>
              <div className="mb-3 flex items-center justify-center gap-3">
                <h3 className="text-xl font-semibold tracking-tight">Auction</h3>
                <span className="inline-flex rounded-full border border-amber-300/70 bg-amber-100/80 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-amber-800 uppercase">
                  Coming Soon
                </span>
              </div>
              <AuctionComingSoonTeaser />
            </div>

          </div>
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
