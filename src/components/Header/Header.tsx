import React from "react";
import { Close, Collaborate, Help, UserAvatar, Notification, NotificationNew, Switcher } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";
import PlatformNotificationsContainer from "../PlatformNotifications";
import NotificationsContainer from "../Notifications/NotificationsContainer";
import CustomHeaderMenu from "../HeaderMenu";
import UserRequests from "../UserRequests";
import HeaderAppSwitcher from "./HeaderAppSwitcher";
import FocusTrap from "focus-trap-react";
import useShellMenu from "../../hooks/useShellMenu";
import useWindowSize from "../../hooks/useWindowSize";

import {
  Header,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderPanel,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  Theme,
} from "@carbon/react";

type NavLink = {
  name: string;
  url: string;
};

type Props = {
  appName?: string;
  baseServiceUrl: string;
  baseLaunchEnvUrl?: string;
  className?: string;
  enableAppSwitcher?: boolean;
  enableNotifications?: boolean;
  navLinks?: NavLink[];
  notificationsConfig?: {
    wsUrl: string;
    httpUrl?: string;
  };
  supportChildren?: Function | any[];
  platformName?: string;
  platformMessage?: any;
  profileChildren?: Function | any[];
  productName?: string;
  renderRightPanel?: { icon: React.ReactNode; component: React.ReactNode };
  renderSidenav?: (args: {
    isOpen: boolean;
    close: () => void;
    onMenuClose: Function;
    navLinks?: React.ReactNode[];
  }) => React.ReactNode;
  requestSummary?: {
    requireUserAction: number;
    submittedByUser: number;
  };
  skipToContentProps?: any;
};

const FocusableElementIdMap = {
  Switcher: "shell-switcher-menu-button",
  Support: "shell-support-menu-button",
  Notifcations: "shell-notifications-menu-button",
  Profile: "shell-profile-menu-button",
  Requests: "shell-requests-menu-button",
  RightPanel: "shell-right-panel-button",
  SideNav: "shell-sidenav-menu-button",
};

const headerButtonClassNames =
  "cds--btn--icon-only cds--header__action cds--btn cds--btn--primary cds--btn--icon-only cds--btn cds--btn--primary";

function MainHeader(props: Props) {
  const [isSideNavActive, setIsSideNavActive] = React.useState(false);

  const {
    appName,
    baseLaunchEnvUrl,
    baseServiceUrl,
    className,
    navLinks,
    platformName,
    renderRightPanel,
    skipToContentProps,
  } = props;

  return (
    <Theme theme="g100">
      <Header className={className}>
        {skipToContentProps ? <SkipToContent {...skipToContentProps} /> : null}
        <HeaderMenuButton
          id={FocusableElementIdMap.SideNav}
          isCollapsible={typeof props.renderSidenav === "function"}
          isActive={isSideNavActive}
          onClick={() => setIsSideNavActive(!isSideNavActive)}
        />
        <HeaderName href={baseLaunchEnvUrl} prefix={platformName}>
          {appName}
        </HeaderName>
        <HeaderNavigation aria-label="Platform navigation">
          {Array.isArray(navLinks)
            ? navLinks.map((link) => (
                <HeaderMenuItem aria-label={`Link for ${link.name}`} href={link.url} key={link.url}>
                  {link.name}
                </HeaderMenuItem>
              ))
            : null}
        </HeaderNavigation>
        <HeaderGlobalBar>
          <RequestsMenu
            enabled={Boolean(props.requestSummary)}
            baseLaunchEnvUrl={baseLaunchEnvUrl}
            requestSummary={props.requestSummary}
          />
          <NotificationsMenu
            enabled={Boolean(props.enableNotifications && props.notificationsConfig)}
            baseLaunchEnvUrl={baseLaunchEnvUrl}
            config={props.notificationsConfig}
          />
          <SupportMenu
            enabled={Array.isArray(props.supportChildren) && props.supportChildren.length > 0}
            supportChildren={props.supportChildren}
          />
          <ProfileMenu
            enabled={Array.isArray(props.profileChildren) && props.profileChildren.length > 0}
            profileChildren={props.profileChildren}
          />
          <AppSwitcherMenu
            enabled={props.enableAppSwitcher}
            baseLaunchEnvUrl={baseLaunchEnvUrl}
            baseServiceUrl={baseServiceUrl}
          />
          <RightPanelMenu enabled={renderRightPanel && Object.keys(renderRightPanel).length} {...renderRightPanel} />
          <SidenavMenu
            navLinks={props.navLinks}
            renderSidenav={props.renderSidenav}
            isActive={isSideNavActive}
            setIsActive={setIsSideNavActive}
          />
        </HeaderGlobalBar>
        <NotificationsContainer enableMultiContainer containerId={`${prefix}--bmrg-header-notifications`} />
      </Header>
    </Theme>
  );
}

export default MainHeader;

function NotificationsMenu(props: any) {
  const { isActive, setIsActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Notifcations);
  const [hasNewNotifications, setHasNewNotifications] = React.useState(false);

  if (!props.enabled) {
    return null;
  }

  const icon = hasNewNotifications ? (
    <NotificationNew alt="New notifications icon" size={20} />
  ) : (
    <Notification alt="No new notifications icon" size={20} />
  );

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        className={headerButtonClassNames}
        aria-controls="shell-notifications-menu"
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label="Notifications menu"
        id={FocusableElementIdMap.Notifcations}
        onClick={() => setIsActive(!isActive)}
      >
        {icon}
      </button>
      <PlatformNotificationsContainer
        isActive={isActive}
        baseLaunchEnvUrl={props.baseLaunchEnvUrl}
        config={props.notificationsConfig}
        setHasNewNotifications={setHasNewNotifications}
      />
    </div>
  );
}

function RequestsMenu(props: any) {
  const { isActive, setIsActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Requests);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        className={headerButtonClassNames}
        aria-controls="shell-requests-menu"
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label="Requests menu"
        id={FocusableElementIdMap.Requests}
        onClick={() => setIsActive(!isActive)}
      >
        <Collaborate size={20} />
      </button>
      {isActive ? (
        <CustomHeaderMenu id="shell-requests-menu">
          <UserRequests baseLaunchEnvUrl={props.baseLaunchEnvUrl} requestSummary={props.requestSummary} />
        </CustomHeaderMenu>
      ) : null}
    </div>
  );
}

function SupportMenu(props: any) {
  const { isActive, setIsActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Support);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        className={headerButtonClassNames}
        aria-controls="shell-support-menu"
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label="Support menu"
        id={FocusableElementIdMap.Support}
        onClick={() => setIsActive(!isActive)}
      >
        <Help size={20} />
      </button>
      {isActive ? <CustomHeaderMenu id="shell-support-menu">{props.supportChildren}</CustomHeaderMenu> : null}
    </div>
  );
}

function ProfileMenu(props: any) {
  const { isActive, setIsActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Profile);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        className={headerButtonClassNames}
        aria-controls="shell-profile-menu"
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label="User menu"
        id={FocusableElementIdMap.Profile}
        onClick={() => setIsActive(!isActive)}
      >
        <UserAvatar alt="Profile icon" size={20} {...props} />
      </button>
      {isActive ? <CustomHeaderMenu id="shell-profile-menu">{props.profileChildren}</CustomHeaderMenu> : null}
    </div>
  );
}

function AppSwitcherMenu(props: any) {
  const { isActive, setIsActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Switcher);

  return (
    <div ref={ref}>
      <button
        className={headerButtonClassNames}
        aria-controls="shell-app-switcher"
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label="Team Switcher"
        id={FocusableElementIdMap.Switcher}
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? <Close alt="Close App Switcher" size={20} /> : <Switcher alt="Open App Switcher" size={20} />}
      </button>
      <HeaderAppSwitcher
        baseLaunchEnvUrl={props.baseLaunchEnvUrl}
        baseServiceUrl={props.baseServiceUrl}
        isActive={isActive}
      />
    </div>
  );
}

function RightPanelMenu(props: any) {
  const { isActive, setIsActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.RightPanel);

  if (!props.enabled) {
    return null;
  }

  return (
    <div ref={ref}>
      <button
        className={headerButtonClassNames}
        aria-controls="shell-right-panel"
        aria-expanded={isActive}
        aria-haspopup="dialog"
        aria-label={`Right panel`}
        id={FocusableElementIdMap.RightPanel}
        onClick={() => setIsActive(!isActive)}
      >
        {props.icon}
      </button>
      <FocusTrap active={isActive} focusTrapOptions={{ allowOutsideClick: true }}>
        <HeaderPanel id="shell-right-panel" role="dialog" aria-label="Right panel" expanded={isActive}>
          {props.component}
        </HeaderPanel>
      </FocusTrap>
    </div>
  );
}

function SidenavMenu(props: any) {
  const { isActive, setIsActive } = props;
  const { ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.SideNav, { isActive, setIsActive });
  const windowSize = useWindowSize();
  const isMobileSidenavActive = (windowSize.width as number) < 1024;

  return typeof props.renderSidenav === "function" ? (
    <FocusTrap active={isActive} focusTrapOptions={{ allowOutsideClick: true }}>
      <div ref={ref}>
        {props.renderSidenav({
          isOpen: isActive,
          onMenuClose: () => setIsActive(false),
          close: () => setIsActive(false),
          navLinks: isMobileSidenavActive
            ? props.navLinks?.map((link: any) => (
                <SideNavLink aria-label={`Link for ${link.name}`} href={link.url} key={link.url}>
                  {link.name}
                </SideNavLink>
              ))
            : undefined,
        })}
      </div>
    </FocusTrap>
  ) : isMobileSidenavActive ? (
    <FocusTrap active={isActive} focusTrapOptions={{ allowOutsideClick: true }}>
      <div ref={ref}>
        <SideNav
          isChildOfHeader
          aria-label="Side navigation"
          expanded={isActive}
          isPersistent={false}
          onOverlayClick={() => setIsActive(false)}
        >
          <SideNavItems>
            {props.navLinks?.map((link: any) => (
              <SideNavLink aria-label={`Link for ${link.name}`} href={link.url} key={link.url}>
                {link.name}
              </SideNavLink>
            ))}
          </SideNavItems>
        </SideNav>
      </div>
    </FocusTrap>
  ) : null;
}
