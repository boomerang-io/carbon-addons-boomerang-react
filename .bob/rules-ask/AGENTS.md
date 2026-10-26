# AGENTS.md — Ask mode

This file provides guidance to agents when working with code in this repository.

## Non-obvious documentation context

- The library is an **internal IBM platform component library** wrapping `@carbon/react` with IBM Consulting Advantage / Boomerang-specific platform shell components (Header, UIShell, SideNav, Notifications, etc.)
- `dist/` and `scss/` are **build artefacts** — `dist/` from Rollup/tsup, `scss/` from a custom `scripts/build.mjs` that just copies `src/**/*.scss`; neither is hand-authored
- `src/types/index.ts` contains a very large `Navigation` type that mirrors a real platform API response (feature flags, platform config, nav links) — it is the canonical shape for the `UIShell` `platform` prop
- `src/internal/helpers.ts` exports `headerModalProps` (pre-built modal props for stories/tests) and `USE_BOOMERANG_URL` — not a utility library, just shared test/story constants
- The `prefix` variable (`"cds"`) is kept in sync with the Carbon Design System class prefix; changing it would break all CSS
- `serviceUrl` / `resolver` in `src/config/servicesConfig.ts` are **not generic HTTP utilities** — they are hardcoded platform service URL patterns consumed only by `Header` and related platform shell components
- Stories are in Storybook 10 with Vite; `pnpm start` launches it on port 6006
- The dual `FlowModal`/`ModalFlow` export in `index.ts` is an intentional legacy alias, not a bug
- `src/components/AboutPlatform`, `Feedback`, `PrivacyRedirect`, `ProfileSettings`, `SignOut`, `SupportCenter` are **not exported** from `src/index.ts` — they are internal-only components used by `UIShell`/`Header`
