# AGENTS.md — Agent (coding) mode

This file provides guidance to agents when working with code in this repository.

## Non-obvious coding rules

- **New component checklist**: create `src/components/<Name>/<Name>.tsx`, `index.tsx` (re-exports default + `Props` type), add to `src/index.ts`, add SCSS `@use` in `src/global/index.scss`
- **`prefix` import** — always `import { prefix } from "../../internal/settings"` (value is `"cds"`); never use the raw string in JSX or SCSS
- **`cx` alias** — `import cx from "classnames"` — the package is `classnames`, not `cx` or `clsx`
- **Props pattern** — define `export type Props = ...` in the component file, re-export `export type { Props }` from `index.tsx`; this is required for the types build (`tsup --dts-only`)
- **react-query config** — import `queryClient` from `src/config/servicesConfig.ts`; it is already configured with `refetchOnWindowFocus: false`; don't create new `QueryClient` instances
- **Axios calls** — use `resolver.query(url)` for GET queries in `src/config/servicesConfig.ts`; add new URLs to `serviceUrl` in the same file
- **DynamicFormik input types** — add new type constants to `src/constants/DataDrivenInputTypes.ts` and wire them through `DataDrivenInput`; the yup validation DSL lives in `src/tools/yupAst/`
- **Test file location** — `<Name>.spec.tsx` must be co-located in the component folder; vitest finds them relative to the component
- **a11y in tests** — every spec needs an `axe` assertion (`expect(await axe(container)).toHaveNoViolations()`)
- **Snapshot describe label** — all test suites use `describe("Feedback", ...)` as the outer block even when the component is not named Feedback (existing pattern — match it for consistency in new tests)
- **`matchMedia` mock** — required in any test that renders Carbon responsive components; copy the `Object.defineProperty(window, 'matchMedia', ...)` block from `UIShell.spec.tsx`
- **SCSS `@use` not `@import`** — all SCSS must use the `@use` directive; aggregated in `src/global/index.scss`
- **Build outputs** — CJS → `dist/cjs`, ESM → `dist/esm`, types → `dist/types/`; `rollup.config.mjs` uses `preserveModules: true` so each file is a separate module in the output
- **`sideEffects: false`** in `package.json` — do not add top-level side-effectful imports anywhere in `src/`
