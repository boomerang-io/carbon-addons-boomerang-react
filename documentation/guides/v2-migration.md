# v2 Upgrade Guide

## Check dependencies

- `@carbon/icons-react` and `carbon-icons` have been moved to peer dependencies. Install these packages if you don't have them listed in your `package.json`
- `@carbon/elements` has been removed. If you are consuming one of the `@carbon` packages it installs, you will need to install that directly as well
- `formik`, `react-router-dom`, `yup` are now optional peer dependencies. If you aren't using a component that uses them, they can be removed.

That's it! Enjoy the smaller and faster builds :)
