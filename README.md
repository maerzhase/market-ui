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
pnpm changeset     # create a release note + version bump entry
pnpm version-packages # apply pending version bumps locally
pnpm release       # build and publish releaseable packages
```

## Workspace notes

The UI package is published as `@m3000/market`. The docs app consumes that package directly from the workspace, which keeps component development and documentation close together.

## Releasing `@m3000/market`

This repo uses Changesets to version and publish `@m3000/market` from `main`.

1. After changing the package in a way that should ship to npm, run `pnpm changeset`.
2. Pick the release type:
   - `patch` for fixes and small backwards-compatible improvements
   - `minor` for new backwards-compatible features
   - `major` for breaking changes
3. Commit the generated `.changeset/*.md` file with your code changes.
4. When that branch lands on `main`, the Changesets GitHub Action opens or updates a release PR.
5. Merging the release PR publishes the package to npm and commits the version/changelog updates back to `main`.

### Release secrets

Set these repository secrets in GitHub before using the release workflow:

- `NPM_TOKEN`: npm automation token with publish access to `@m3000/market`

The workflow passes that token through `NODE_AUTH_TOKEN` during publish, so no npm auth config needs to be committed to the repo.

## License

MIT
