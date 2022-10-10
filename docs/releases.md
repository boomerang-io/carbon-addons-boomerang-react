# Major Releases

## v3

Substantial changes to the library have been made for v3 to adopt Carbon v11, Vite, and Sass modules to significantly improve the developer experience both of using and writing the library.

## Breaking Changes

- Use [Carbon v11](https://medium.com/carbondesign/carbon-v11-72ace7fac01f)
- Drop support for Carbon v10
- Remove exports of Carbon components
- Change style imports and theming

## Improvements

- Reduce build times significantly via Sass modules, for both consumers and local development
- Migrate to [Storybook builder for Vite](https://github.com/storybookjs/builder-vite)
- Support in-app theme switching
- Upgrade to latest v6 of Storybook and improve documentation
- Use [Vitest](https://vitest.dev/) as test runner
- Reduce number of installed and peer dependencies

## Deprecations

The following components are still in the library but have been marked as deprecated and are grouped together in a deprecated section in Storybook

- LoadingAnimation
- NoDisplay
- OptionsGrid
- Sidenav

## v2

The big change here is finally supporting tree-shaking properly. This should reduce bundle size and builds times, sometimes drastically based on your use case. [View the migration guide](./documentation/guides/v2-migration.md) for updating to v2.

### Features

- Tree-shaking via `ESM` builds
- Storybook v6 migration
- Dependency updates and security fixes

### Breaking Changes\*\*

- Move `@carbon/react/icons` to a peer dependency
- Move `carbon-icons` to a peer dependency
- Remove `@carbon/elements` as a dependency
- No longer publish `UMD` builds
