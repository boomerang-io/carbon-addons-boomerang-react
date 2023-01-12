# v3 Migration Guide

Follow the sections below for migrating from v2 to v3.

## Prerequisites

Moving to v4 of this library requires you to be coming from v3. If you are are upgrading from v2, first follow the migration guide for v3 and then come back here to continue with the v4 upgrade.

## Removed Components

| Component        | Reason                | Replacement                                                                                                       |
| ---------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| GraphicLoch      | Internal component    | No                                                                                                                |
| GraphicWrangler  | Internal component    | No                                                                                                                |
| HeaderMenuButton | Internal component    | [HeaderMenuItem](https://carbon-addons-boomerang-react.netlify.app/?path=/story/platform-headermenuitem--default) |
| HeaderMenuItem   | Internal component    | [HeaderMenuItem](https://carbon-addons-boomerang-react.netlify.app/?path=/story/platform-headermenuitem--default) |
| HeaderMenuLink   | Internal component    | [HeaderMenuItem](https://carbon-addons-boomerang-react.netlify.app/?path=/story/platform-headermenuitem--default) |
| HeaderMenuUser   | Internal component    | [HeaderMenuItem](https://carbon-addons-boomerang-react.netlify.app/?path=/story/platform-headermenuitem--default) |
| LeftSideNav      | Uneeded for consumers | No, it can be removed from use in-app                                                                             |
| LoadingAnimation | Addons Alternative    | [Loading](https://carbon-addons-boomerang-react.netlify.app/?path=/story/components-loading--default)             |
| NoDisplay        | Addons Alternative    | [Error404](https://carbon-addons-boomerang-react.netlify.app/?path=/story/errors-error404--boomerang)             |
| OptionsGrid      | Addons Alternative    | [CheckboxList](https://carbon-addons-boomerang-react.netlify.app/?path=/story/inputs-checkboxlist--default)       |
| Sidenav          | Carbon Alternative    | [Carbon Sidenav](https://react.carbondesignsystem.com/?path=/story/components-ui-shell--fixed-side-nav)           |

## UIShell

The following is a minimal implementation of the UIShell. The `navigation` and `user` values continue to be the response from the IBM Services Essentials platform.

```js
<UIShell config={navigation} skipToContentProps={{ href: "#content" }} user={user} />
```

There have been several updates to the props for UIShell. We have TypeScript types that you can inspect to see what the props are for the UIShell but the following have been changed:

### Added props

| Prop               | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `profileMenuItems` | Display custom `HeaderMenuItem`s in the profile menu |
| `supportMenuItems` | Display custom `HeaderMenuItem`s in the support menu |

### Removed props

| Prop              | Replacement                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `appName`         | `productName`                                                      |
| `companyName`     | `platformName`                                                     |
| `isFlowApp`       | No                                                                 |
| `onMenuClick`     | `leftPanel` prop                                                   |
| `onTutorialClick` | Provide custom button `HeaderMenuItem` via `supportMenuItems` prop |
| `renderFlowDocs`  | Provide custom link `HeaderMenuItem` via `profileMenuItems` prop   |
| `renderLogo`      | None, there is no built in logo anymore                            |
| `renderRequests`  | None, unused and driven via `user` response                        |

### Renamed props

- `baseLaunchEnvUrl` -> `baseEnvUrl`
- `baseServiceUrl` -> `baseServicesUrl`
- `headerConfig` -> `config`
- `renderGdprRedirect` -> `renderPrivacyRedirect`
- `renderRightPanel` -> `rightPanel`
- `renderSidenav` -> `leftPanel`
