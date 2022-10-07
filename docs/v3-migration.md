# v3 Migration Guide

Follow the sections below for migrating from v2 to v3. Migrating

## Prerequisites

Moving to v3 of this library requires you to be using [v11 of Carbon](https://medium.com/carbondesign/carbon-v11-72ace7fac01fc). Migrating a codebase to Carbon v11 will likely be significantly more involved than migrating to v3 of this component library. View their [migration guide](https://carbondesignsystem.com/migrating/guide/overview/) for getting started with that work.

## Dependencies

1. Install `@carbon/react` and `@boomerang-io/carbon-addons-boomerang-react`
2. Optionally uninstall `carbon-components-react`, `carbon-components` and any other `@carbon` packages that are included in `@carbon/react` .e.g. `@carbon/icons-react`

## Styles

You can import the carbon styles and the ours as follows:

```scss
// app.scss
@use "@carbon/react";
@use "@boomerang-io/carbon-addons-boomerang-react/scss/global";
```

There are a few more advanced use-cases documented in the the [readme](../README).

## JavaScript

The biggest change here is that you can no longer import Carbon components from our component library. For example, Buttons are no longer exported and you need to updated the imports in your codebase.

```diff
- import { Button } from "@boomerang-io/carbon-addons-boomerang-react 
+ import { Button } from "@carbon/react
```