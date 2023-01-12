# Release v4

## Changes

`UIShell` and associated components have recieved a major rewrite. The focus was on the use of Carbon components to replace custom code, and accessibility improvements. The implementation is much simpler and the experience for end users has been improved. Carbon and React have come a long way in the time since we wrote the first implementation and these was a much needed update.

We also removed components that were marked as deprecated in the last major release and internal components that are no longer needed. There is less for us to maintain and has decreased the bundle size.

## Whats New

### UIShell and associated components

- Add collapsible mobile sidenav for navigation links
- Improve accessibility for menus and dialogs (keyboard navigation and focus management)
- Add support for custom menu items in profile and support menus via `HeaderMenuItem`

### HeaderMenuItem component

`HeaderMenuItem` is a public component that consolidates the functionlity of four internal components that have been removed:

- `HeaderMenuButton`
- `HeaderMenuItem`
- `HeaderMenuLink`
- `HeaderMenuUser`

It provides a single component to render the different types of header menu items via props (button, link, user). It shares the same (poorly given previously) name as the removed `HeaderMenuItem` that was used for launching a modal from a header menu item. We no longer have built in support for that functionality and instead support render a button that can receive an `onClick` event. We use this approach for building the built-in header menu items components like `AboutPlatform`.

### TypeScript

TypeScript was introduced as a non-breaking change in v3, but in v4 there are further improvement of the types.

### Storybook

Update to components stories, notably improvements in the Controls addon. We hope that it is 

## Breaking Changes

### Renamed Components

- `BmrgHeader` -> `Header`

### Removed Components

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

### UIShell and Header API

The API for the `UIShell` and associated components have been changed for simplicity, standardization and to remove legacy props. View the upgrading section below for the changes required to adopt it.

## Upgrading

View our upgrade guide for migrating from v3 to v4. Still on v2 and looking to upgrade? See our v3 migration guide which is more involved. v4 is comparatively much simpler because it assumes you are on Carbon v11.
