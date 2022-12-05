# v2 Upgrade Guide

## Check dependencies

- `@carbon/react/icons` and `carbon-icons` have been moved to peer dependencies. Install these packages if you don't have them listed in your `package.json`
- `@carbon/elements` has been removed. If you are consuming one of the `@carbon` packages it installs e.g. `@carbon/icons`, you will need to install that directly as well.

> If you are importing a dependency that the package installs e.g. `match-sorter`, add that package to your package.json directly. You shouldn't rely on a this package containing a specific dependency at a particular version.

## UMD version

If you are using the UMD build of the package, you will not be able to upgrade to v2. We now long support these builds do to poor support and additional complexity it introduces. We expect consumers to being using a bundler like Webpack just as Carbon components do.

That's it! Enjoy the smaller and faster builds :)
