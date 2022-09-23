# Carbon Addons Boomerang React [![Netlify Status](https://api.netlify.com/api/v1/badges/ebf40744-c9a5-4c91-a43d-e885b7e2da88/deploy-status)](https://app.netlify.com/sites/carbon-addons-boomerang-react/deploys)

[Carbon](https://www.carbondesignsystem.com/) addon components for Boomerang written in React. View the [Storybook](https://carbon-addons-boomerang-react.netlify.app/).

## Getting Started

Install the Carbon peer dependencies in addition to the package itself. We re-export all of the components from `@carbon/react` but in some cases you may want to import directly from a Carbon library. It is a best practice to have the dependency defined in the `package.json` in that situation and depending on your package manager and node version, a requirement. It also gives consumers more control over the version of the packages they are using without being dependent on our library.

Run the following command using [pnpm](https://pnpm.io)
```bash
pnpm install carbon-components @carbon/react carbon-icons @carbon/react/icons
npm install @boomerang-io/carbon-addons-boomerang-react
```

> You can also use npm and yarn if you'd prefer.
```

## Using

You need to import the `.scss` styles. If you are using SASS and webpack, perform the following import.

```css
@import '@boomerang-io/carbon-addons-boomerang-react/styles/scss/styles';
```

You can then import components by the following:

```js
import { UIShell } from '@boomerang-io/carbon-addons-boomerang-react';
```

## Testing a version

Often times it is useful and necessary to test a published version of the component library via an application that uses it. Linking the project locally isn't always enough of a guarentee.

We host the npm package for the library on Artifactory. Unlike the npm registry, we can't [tag](https://docs.npmjs.com/cli/dist-tag.html) a version to control the distribution e.g. designating a version as a beta. In Artifactory, whatever has the highest SemVer becomes the latest by default. Their [docs](https://docs.npmjs.com/cli/dist-tag.html) provide more information. To prevent unwanted versions from becoming the latest we following the convention of shifting all of the versioning numbers `MAJOR.MINOR.PATCH` to the `.PATCH`. For example, a new version of `3.4.0` would become `0.0.340`. It's not foolproof, but it works for our situation and is easy enough for developers to do.

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
