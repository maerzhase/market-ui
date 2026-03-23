# @m3000/market

Market UI Components for marketplace applications.

## Installation

```bash
npm install @m3000/market
```

### Peer Dependencies

This package requires the following peer dependencies:

- `react` (^19.0.0)
- `react-dom` (^19.0.0)
- `tailwindcss` (^4.1.0)

Optional peer dependencies:

- `@types/react` (recommended for TypeScript)
- `@types/react-dom` (recommended for TypeScript)

## Usage

```tsx
import { Button, Auction, Tag } from "@m3000/market";
import "@m3000/market/styles.css";

function App() {
  return (
    <div>
      <Button variant="primary">Place Bid</Button>
      <Auction>{/* auction components */}</Auction>
    </div>
  );
}
```

## License

MIT
