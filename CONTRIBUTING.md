# Contributing to `@m3000/market`

Thanks for contributing. This repository contains the `@m3000/market` UI
package and the docs app used to develop and document it.

## Code of Conduct

This project follows the guidelines in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Repository Structure

This repo is a pnpm workspace managed with Turborepo.

```text
trading-ui/
├── packages/
│   └── ui/          # Published package: @m3000/market
└── apps/
    └── docs/        # Next.js docs site for the package
```

## Prerequisites

- Node.js `>=20`
- pnpm `9.0.0`

## Getting Started

1. Clone the repository.
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start development:

   ```bash
   pnpm dev
   ```

Useful entry points:

- `pnpm dev` runs workspace dev tasks through Turborepo
- `pnpm dev:docs` starts the docs app
- `pnpm storybook` starts Storybook for `@m3000/market`

## Development Workflow

### Build

- `pnpm build` builds all workspaces
- `pnpm build:storybook` builds Storybook for the UI package

### Quality Checks

Before opening a PR, run:

```bash
pnpm check
```

That verifies dependency consistency plus workspace `lint`, `format`, and
`typecheck` tasks.

To auto-fix issues where possible, run:

```bash
pnpm fix
```

You can also run tasks individually:

- `pnpm lint`
- `pnpm lint:fix`
- `pnpm format`
- `pnpm format:fix`
- `pnpm typecheck`

This project uses:

- Biome for linting and formatting
- Turborepo for workspace orchestration
- syncpack to keep dependency versions consistent

### Docs Registry

The docs app includes registry generation scripts used during docs builds.

- `pnpm --filter @m3000/docs registry:copy`
- `pnpm --filter @m3000/docs registry:build`

You usually do not need to run these manually unless you are working on the
docs registry itself.

## Making Changes

### Branches

Create a branch from `main` for your work. Use whatever naming pattern fits
your workflow, for example:

```bash
git checkout -b feat/add-auction-variant
git checkout -b fix/price-format-rounding
```

### Commits

Write commit messages that describe the user-facing or developer-facing change
clearly. Small, focused commits are easier to review than large mixed changes.

## Changesets and Releases

This repo uses [Changesets](https://github.com/changesets/changesets) to
version and publish `@m3000/market`.

If your change should affect the published package, add a changeset:

```bash
pnpm changeset
```

Choose the release type carefully:

- `patch` for fixes and small backwards-compatible improvements
- `minor` for new backwards-compatible features
- `major` for breaking changes

Commit the generated `.changeset/*.md` file with your code changes.

### What Needs a Changeset?

Add a changeset for changes that affect `packages/ui`, including:

- public API changes
- behavior changes in exported components
- styling changes consumers will receive in the package output
- fixes that should ship in the next npm release

You usually do not need a changeset for repo-only changes such as:

- docs-only edits in `apps/docs`
- CI or workflow updates
- local refactors that do not affect the published package

### Release Flow

- Changes merge into `main`
- GitHub Actions opens or updates a release PR
- Merging that release PR publishes `@m3000/market` to npm

## Dependency Rules

Keep workspace dependencies aligned with the existing conventions:

- Use `workspace:*` for internal workspace dependencies
- Keep versions consistent across packages
- Run `pnpm syncpack:lint` if you are adjusting dependencies directly

If you need to normalize versions, use:

```bash
pnpm syncpack:fix
```

## Pull Requests

Before submitting a PR:

1. Run `pnpm check`
2. Run `pnpm build`
3. Add a changeset if the published package should release
4. Update docs or examples when component behavior changes

PRs should include:

- a clear description of what changed
- any relevant screenshots for docs or Storybook-facing UI changes
- notes about breaking changes or migration impact, if any

## CI

Pull requests are validated in GitHub Actions with the same core checks used
locally:

- `pnpm install --frozen-lockfile`
- `pnpm run check`
- `pnpm run build`

Matching local results before opening a PR will make review and merge much
smoother.
