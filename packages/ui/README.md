# @m3000/market

Design system for building interfaces shaped by price, time, and competition.

The package has two layers: **primitives** — buttons, price display, countdown timers, inputs, and more — and **auction blocks**, higher-level composed components for building bidding UIs with rankings, bid forms, and live status.

Built on React 19, Tailwind CSS 4, and Base UI.

## Installation

```bash
npm install @m3000/market
```

Peer dependencies:

```bash
npm install react react-dom tailwindcss
```

## Styles

Import the compiled stylesheet once in your app entry:

```ts
import "@m3000/market/styles.css";
```

Two CSS exports are available:

- `@m3000/market/styles.css` — full stylesheet with components and theme tokens. Recommended for most projects.
- `@m3000/market/theme.css` — theme variables only, if you want to integrate with your own Tailwind pipeline.

## Usage

### Primitives

Import components directly:

```tsx
import { Button, Price, Countdown, Tag } from "@m3000/market";

<Price value={1500000n} symbol="ETH" />
<Countdown target={new Date("2025-12-31")} />
<Button variant="primary">Place bid</Button>
```

### Auction block

The auction block is a suite of composed components backed by a context provider. Wire up your data and blockchain callbacks at the provider level; child components consume them automatically.

```tsx
import {
  AuctionProvider,
  AuctionLayout,
  AuctionInfo,
  AuctionBidForm,
  AuctionRankings,
} from "@m3000/market";

<AuctionProvider
  auction={auction}
  bids={bids}
  userBids={userBids}
  callbacks={{
    onPlaceBid: async (price, qty) => {
      // call your contract
      return true;
    },
    onTopUpBid: async (bidId, newPrice, extra) => {
      // call your contract
      return true;
    },
  }}
>
  <AuctionLayout>
    <AuctionInfo />
    <AuctionBidForm />
    <AuctionRankings />
  </AuctionLayout>
</AuctionProvider>
```

## TypeScript

Fully typed. All price and quantity values use native `bigint` — no string-coerced numbers. Key types are exported directly from the package: `AuctionData`, `AuctionBid`, `AuctionUserBid`, `AuctionCallbacks`, `AuctionFormatters`, and more.

## License

MIT
