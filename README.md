# Carbon Addons Boomerang React [![Netlify Status](https://api.netlify.com/api/v1/badges/ebf40744-c9a5-4c91-a43d-e885b7e2da88/deploy-status)](https://app.netlify.com/sites/carbon-addons-boomerang-react/deploys)

[Carbon](https://www.carbondesignsystem.com/) addon components for Boomerang written in React. View the [Storybook](https://carbon-addons-boomerang-react.netlify.app/).

## Getting Started

Install the Carbon, the pacakge itself and all of the required peer-dependencies.

Run the following command using [pnpm](https://pnpm.io). Other package managers like `npm` and `yarn` work as well.

```bash
pnpm install @carbon/react @boomerang-io/carbon-addons-boomerang-react axios formik react-router-dom yup
```

## Styles

You need to import the `.scss` styles. If you are using SASS and a modern bundler, perform the following import. Make sure that file is included in your bundle.

```css
@use "@carbon/react";
@import "@boomerang-io/carbon-addons-boomerang-react/scss/global";
```

## Carbon themes

We recommend making use of themes and using the associated CSS Custom Properties in your css. Read the following examples for a few different circumstances.

### Default theme

```scss
// styles.scss
@use "@carbon/react";
@use '@carbon/themes';
@use "@boomerang-io/carbon-addons-boomerang-react/scss/global";

// Include theme tokens
:root {
  @include themes.theme();
}
```

### g10 Compatibility theme

This is how we import things in our applications. We use a number of Carbon v10 tokens so we use the compatibility g10 theme from Carbon to support both new and old values. We also use Akamai as the host for our fonts instead of self-hosting via the `$use-akamai-cdn: true` argument to the `"@carbon/react"` import.

```scss
@use "@carbon/react" with (
  $use-akamai-cdn: true
);
@use "@carbon/themes";
@use "@carbon/react/scss/compat/themes" as compat;
@use "@boomerang-io/carbon-addons-boomerang-react/scss/global";

:root {
  @include themes.theme(compat.$g10);
}
```

## Boomerang theme

Using the Boomerang theme is not as straightforward unfortunately. It takes two steps.

## Step 1

Set up the Sass imports correctly as follows

```scss
// styles.scss
@use "sass:map";

// Carbon base styles and utilities
@use '@carbon/react/scss/config' with ($use-akamai-cdn: true);
@use '@carbon/react/scss/reset';
@use '@carbon/react/scss/motion';
@use '@carbon/react/scss/type';

// Themes
@use "@boomerang-io/carbon-addons-boomerang-react/scss/global/themes/boomerang";
@use '@carbon/react/scss/compat/themes' as compat;
@use '@carbon/react/scss/compat/theme' with (
  $theme: map.merge(compat.$white, boomerang.$theme)
);

// More base styles, components, and component tokens
@use '@carbon/react/scss/fonts';
@use '@carbon/react/scss/grid';
@use '@carbon/react/scss/layer';
@use '@carbon/react/scss/zone';
@use '@carbon/react/scss/components/button/tokens' as button;
@use '@carbon/react/scss/components/notification/tokens' as notification;
@use '@carbon/react/scss/components/tag/tokens' as tag;
@use '@carbon/react/scss/components';

// Addons library with use boomerang enabled
@use '@boomerang-io/carbon-addons-boomerang-react/scss/global' with ($use-theme-boomerang: true);

// Finally include the theme to include all of the css custom properties
[data-carbon-theme="boomerang"] {
  @include theme.add-component-tokens(map.merge(button.$button-tokens, boomerang.$v11-button-tokens));
  @include theme.add-component-tokens(notification.$notification-tokens);
  @include theme.add-component-tokens(tag.$tag-tokens);
  @include theme.theme();
}
```

## Step 2

You need to set the `data-carbon-theme="boomerang"` attribute value in your app, at the highest level in the document tree as possible.

```html
<html lang="en" data-carbon-theme="boomerang"></html>
```

## Use

You can then import components in the following manner.

```js
import { UIShell } from "@boomerang-io/carbon-addons-boomerang-react";
```

> Note: In v3 of the component library we have removed the re-exporting of all of the Carbon components.

## Version 2

Because of the potential time and difficulty in a migration to Carbon v11, we will maintain a maintenance v2 of the component library. It will recieve critical functionality and security updates. Please view the support table below.

| Release | Status | End-of-life |
| v2 | **Maintenance** | 2022-04-30 |
| v3 | **Current** | - |

## Integrating with UIShell Notifications

We use [react-toastify](https://github.com/fkhadra/react-toastify) to create notifications for UIShell events. If you want to also use the library in your application for notifications you must configure your `ToastContainer` component to support [multiple containers](https://github.com/fkhadra/react-toastify#multi-container-support) via the `enableMultiContainer={true}` prop. It is _NOT_ required to include a `containerId` on your container or with notifications that you create. Without multi-container support enabled, you will see two notifications created for UIShell events.

## 📚 Docs

You can find more information about how to use each Component by checking out our [Storybook](https://carbon-addons-boomerang-react.netlify.app/).

## 🤲 Contributing

Please check out our [Contribution Guidelines](./.github/CONTRIBUTING.md) for more info on how you can help out!

## Release History

### v3

Substantial changes to the library have been made for v3 to adopt Carbon v11, Vite, and Sass Modules to significantly improve the DX of using and writing the library.

## Breaking Changes

- Support Carbon v11
- Drop Carbon v10
- Remove exports of Carbon components

## Improvements

- Significantly reduced build times via Sass modules
- Simpler styles architecture
- Upgraded to v6 of Storybook
- Use Vite as Storybook preprocessor
- Use Vitest as test runner
- Update components for improved compatibility with Carbon v11, accessibility and supported props.

## Deprecations

- LoadingAnimation
- NoDisplay
- OptionsGrid
- Sidenav

### v2

The big change here is finally supporting tree-shaking properly. This should reduce bundle size and builds times, sometimes drastically based on your use case. [View the migration guide](./documentation/guides/v2-migration.md) for updating to v2.

**Features**

- Tree-shaking via `ESM` builds
- Storybook v6 migration
- Dependency updates and security fixes

**Breaking Changes**

- Move `@carbon/react/icons` to a peer dependency
- Move `carbon-icons` to a peer dependency
- Remove `@carbon/elements` as a dependency
- No longer publish `UMD` builds

```

```
