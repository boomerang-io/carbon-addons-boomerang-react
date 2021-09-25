# Carbon Addons Boomerang React [![Netlify Status](https://api.netlify.com/api/v1/badges/ebf40744-c9a5-4c91-a43d-e885b7e2da88/deploy-status)](https://app.netlify.com/sites/carbon-addons-boomerang-react/deploys)

[Carbon](https://www.carbondesignsystem.com/) addon components for Boomerang written in React. View the [Storybook](https://carbon-addons-boomerang-react.netlify.app/).

## Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install @boomerang-io/carbon-addons-boomerang-react
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @boomerang-io/carbon-addons-boomerang-react
```

## Using

You need to import the `.scss` styles. If you are using SASS and webpack, perform the following import.

```css
@import '~@boomerang-io/carbon-addons-boomerang-react/styles/scss/styles';
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
