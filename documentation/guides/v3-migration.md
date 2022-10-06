# v3 Migration

Substantial changes to the library have been made for v3 to adopt Carbon v11, Vite, and Sass Modules to significantly improve the DX of using and writing the library.

## Breaking Changes

- Support Carbon v11
- Drop support for Carbon v10
- Remove exports of Carbon components

## Improvements

- Reduce build times significantly via Sass modules
- Simplify styles architecture
- Upgrade to v6 of Storybook
- Use Vite as Storybook preprocessor
- Use Vitest as test runner

## Deprecations

- LoadingAnimation
- NoDisplay
- OptionsGrid
- Sidenav