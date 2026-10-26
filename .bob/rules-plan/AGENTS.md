# AGENTS.md — Plan mode

This file provides guidance to agents when working with code in this repository.

## Non-obvious architectural constraints

- **Public API surface** is `src/index.ts` only; consumers install the npm package and import from it — any new component must be explicitly added there to be usable
- **Peer dependencies vs dependencies**: `@carbon/react`, `axios`, `formik`, `react-router-dom`, `yup` are **peer deps** — the library does NOT bundle them; devDependencies pins a specific version for local dev/tests that may differ from the peer range
- **SCSS is a separate published artefact** (`scss/**/*` in `files`): consumers import `@boomerang-io/carbon-addons-boomerang-react/scss/global/index.scss` alongside the JS; removing or renaming SCSS files is a breaking change
- **`preserveModules: true`** in Rollup means tree-shaking works at the module level — don't add barrel re-exports inside component subfolders beyond `index.tsx`
- **`sideEffects: false`** — the library declares no side effects; SCSS must be imported separately by consumers, never auto-imported in JS modules
- **`UIShell` is the composition root** for the platform shell — it wires together `Header`, `FeatureSideNav`, `PlatformNotifications`, and query context; changes to any of those components affect `UIShell` tests
- **react-query `queryClient` is singleton** in `servicesConfig.ts`; it is exported for consumers to wrap with `QueryClientProvider` — do not move or duplicate it
- **Theme system**: two opt-in SCSS themes (`$use-theme-boomerang`, `$use-theme-advantage-white`) controlled at build time by the consumer; runtime theming uses `data-carbon-theme="boomerang"` on `:root`
- **TypeScript excludes test/story files** (`tsconfig.json` excludes `*.spec.tsx` and `*.stories.tsx`) — type errors in those files won't surface during `tsc`; only the `src/**/*.ts(x)` source is type-checked during build
- **Releases** use `release-it` with GitHub releases; commit messages must follow Conventional Commits (enforced by `commitlint` + husky precommit hook)
