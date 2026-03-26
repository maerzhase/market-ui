# @m3000/market

React UI components for marketplace and auction experiences.

## Install

```bash
pnpm add @m3000/market
```

## Styles

Import the bundled stylesheet once in your app entrypoint:

```tsx
import "@m3000/market/styles.css";
```

## Usage

```tsx
import { Receipt } from "@m3000/market";

export function OrderSummary() {
  return (
    <Receipt decimals={2}>
      <Receipt.Header>Order summary</Receipt.Header>
      <Receipt.Item label="Subtotal" value={1250n} />
      <Receipt.Total />
    </Receipt>
  );
}
```

## Docs

- Documentation: [market.m3000.io](https://market.m3000.io)
- Registry: [market.m3000.io/r/price.json](https://market.m3000.io/r/price.json)

## License

MIT. See the repository [LICENSE](../../LICENSE).
