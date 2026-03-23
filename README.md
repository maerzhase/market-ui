# @m3000/market

Design system to build interfaces shaped by price, time, and competition.

## What's in the repo

- `packages/ui` – the `@m3000/market` component package
- `apps/docs` – the Next.js documentation site for the library

## Getting started

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm dev:docs      # run the docs app
pnpm storybook     # run Storybook for the UI package
pnpm build         # build all workspaces
pnpm check         # lint, format, and typecheck
pnpm fix           # apply lint + format fixes
```

## Workspace notes

The UI package is published as `@m3000/market`. The docs app consumes that package directly from the workspace, which keeps component development and documentation close together.

## License

MIT
