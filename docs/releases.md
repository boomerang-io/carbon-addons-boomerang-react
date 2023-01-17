# Major Releases

## v4

### Changes

`UIShell` and associated components have received a major rewrite. The focus was on the use of Carbon components to replace custom code, and accessibility improvements. The implementation is much simpler and the experience for end users has been improved. Carbon and React have come a long way in the time since we wrote the first implementation and these was a much needed update.

We also removed components that were marked as deprecated in the last major release and internal components that are no longer needed. There is less for us to maintain and has decreased the bundle size.

### Whats New

#### UIShell and associated components

- Add collapsible mobile sidenav for navigation links
- Improve accessibility for menus and dialogs (keyboard navigation and focus management)
- Add support for custom menu items in profile and support menus via `HeaderMenuItem`

#### HeaderMenuItem component

`HeaderMenuItem` is a public component that consolidates the functionality of four internal components that have been removed:

- `HeaderMenuButton`
- `HeaderMenuItem`
- `HeaderMenuLink`
- `HeaderMenuUser`

It provides a single component to render the different types of header menu items via props (button, link, user). It shares the same (poorly given previously) name as the removed `HeaderMenuItem` that was used for launching a modal from a header menu item. We no longer have built in support for that functionality and instead support render a button that can receive an `onClick` event. We use this approach for building the built-in header menu items components like `AboutPlatform`.

#### TypeScript

TypeScript was introduced as a non-breaking change in v3, but in v4 there are further improvement of the types.

#### Storybook

Update to components stories, notably improvements in the Controls addon. Overall

### Breaking Changes

#### Renamed Components

- `BmrgHeader` -> `Header`

#### Removed Components

- `GraphicLoch`
- `GraphicWrangler`
- `HeaderMenuButton`
- `HeaderMenuItem`
- `HeaderMenuLink`
- `HeaderMenuUser`
- `LeftSideNav`
- `LoadingAnimation`
- `NoDisplay`
- `OptionsGrid`
- `Sidenav`

#### UIShell and Header API

The API for the `UIShell` and associated components have been changed for simplicity, standardization and to remove legacy props. View the upgrading section below for the changes required to adopt it.

### Upgrading

View our [v4 upgrade guide](https://github.com/boomerang-io/carbon-addons-boomerang-react/blob/main/docs/v4-migration.md)  for migrating from v3 to v4. Still on v2 and looking to upgrade? See our [v3 upgrade guide](https://github.com/boomerang-io/carbon-addons-boomerang-react/blob/main/docs/v3-migration.md) which is more involved. v4 is comparatively much simpler because it assumes you are on Carbon v11.

## v3

Substantial changes to the library have been made for v3 to adopt Carbon v11, Vite, and Sass modules to significantly improve the developer experience both of using and writing the library.

### Breaking Changes

- Use [Carbon v11](https://medium.com/carbondesign/carbon-v11-72ace7fac01f)
- Drop support for Carbon v10
- Remove exports of Carbon components
- Change style imports and theming

### Improvements

- Reduce build times significantly via Sass modules, for both consumers and local development
- Migrate to [Storybook builder for Vite](https://github.com/storybookjs/builder-vite)
- Support in-app theme switching
- Upgrade to latest v6 of Storybook and improve documentation
- Use [Vitest](https://vitest.dev/) as test runner
- Reduce number of installed and peer dependencies

### Deprecations

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
