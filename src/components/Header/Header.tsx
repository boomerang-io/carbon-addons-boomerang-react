import React from "react";
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
import FocusTrap from "focus-trap-react";
import HeaderMenu from "./HeaderMenu";
import HeaderAppSwitcher from "./HeaderAppSwitcher";
import NotificationsContainer from "../Notifications/NotificationsContainer";
import PlatformNotificationsContainer from "../PlatformNotifications";
import UserRequests from "./UserRequests";
import useShellMenu from "../../hooks/useShellMenu";
import useWindowSize from "../../hooks/useWindowSize";
import { Close, Collaborate, Help, UserAvatar, Notification, NotificationNew, Switcher } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

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

const MenuElementIdMap = {
  Notifcations: "header-notifications-menu",
  Profile: "header-profile-menu",
  Requests: "header-requests-menu",
  RightPanel: "header-right-panel",
  SideNav: "header-sidenav-menu",
  Support: "header-support-menu",
  Switcher: "header-switcher-panel",
} as const;

type MenuElementIdMapType = typeof MenuElementIdMap;

const FocusableElementIdMap: Record<
  keyof MenuElementIdMapType,
  `${MenuElementIdMapType[keyof MenuElementIdMapType]}-button`
> = {
  Notifcations: "header-notifications-menu-button",
  Profile: "header-profile-menu-button",
  Requests: "header-requests-menu-button",
  RightPanel: "header-right-panel-button",
  SideNav: "header-sidenav-menu-button",
  Support: "header-support-menu-button",
  Switcher: "header-switcher-panel-button",
};

const headerButtonClassNames =
  "cds--btn--icon-only cds--header__action cds--btn cds--btn--primary cds--btn--icon-only cds--btn cds--btn--primary";

function isType(
  elem: any,
  type: "undefined" | "object" | "boolean" | "number" | "bigint" | "string" | "symbol" | "function"
) {
  return typeof elem === type;
}

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
          isCollapsible={isType(props.renderSidenav, "function")}
          isActive={isSideNavActive}
          onClick={() => setIsSideNavActive(!isSideNavActive)}
        />
        <SidenavMenu
          navLinks={props.navLinks}
          renderSidenav={props.renderSidenav}
          isActive={isSideNavActive}
          setIsActive={setIsSideNavActive}
        />
        <HeaderName href={baseLaunchEnvUrl} prefix={platformName}>
          {appName}
        </HeaderName>
        <HeaderNavigation aria-label="Platform navigation">
          {Array.isArray(navLinks)
            ? navLinks.map((link, i) => (
                <HeaderMenuItem
                  isCurrentPage={
                    i === 0 || (window?.location?.href && link.url ? window.location.href.startsWith(link.url) : false)
                  }
                  aria-label={`Link for ${link.name}`}
                  href={link.url}
                  key={link.url}
                >
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
        </HeaderGlobalBar>
        <NotificationsContainer enableMultiContainer containerId={`${prefix}--bmrg-header-notifications`} />
      </Header>
    </Theme>
  );
}

export default MainHeader;

function NotificationsMenu(props: any) {
  const { isActive, toggleActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Notifcations);
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
        aria-controls="header-notifications-menu"
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label="Notifications menu"
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Notifcations}
        onClick={toggleActive}
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
  const { isActive, toggleActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Requests);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls="header-requests-menu"
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label="Requests menu"
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Requests}
        onClick={toggleActive}
      >
        <Collaborate size={20} />
      </button>
      {isActive ? (
        <HeaderMenu id="header-requests-menu">
          <UserRequests baseLaunchEnvUrl={props.baseLaunchEnvUrl} requestSummary={props.requestSummary} />
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function SupportMenu(props: any) {
  const { isActive, toggleActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Support);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls="header-support-menu"
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label="Support menu"
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Support}
        onClick={toggleActive}
      >
        <Help size={20} />
      </button>
      {isActive ? <HeaderMenu id="header-support-menu">{props.supportChildren}</HeaderMenu> : null}
    </div>
  );
}

function ProfileMenu(props: any) {
  const { isActive, toggleActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Profile);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls="header-profile-menu"
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label="User menu"
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Profile}
        onClick={toggleActive}
      >
        <UserAvatar alt="Profile icon" size={20} {...props} />
      </button>
      {isActive ? <HeaderMenu id="header-profile-menu">{props.profileChildren}</HeaderMenu> : null}
    </div>
  );
}

function AppSwitcherMenu(props: any) {
  const { isActive, toggleActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Switcher);

  return (
    <div ref={ref}>
      <button
        aria-controls={MenuElementIdMap.Switcher}
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label="Team Switcher"
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Switcher}
        onClick={toggleActive}
      >
        {isActive ? <Close alt="Close App Switcher" size={20} /> : <Switcher alt="Open App Switcher" size={20} />}
      </button>
      <HeaderAppSwitcher
        baseLaunchEnvUrl={props.baseLaunchEnvUrl}
        baseServiceUrl={props.baseServiceUrl}
        id={MenuElementIdMap.Switcher}
        isActive={isActive}
      />
    </div>
  );
}

function RightPanelMenu(props: any) {
  const { isActive, toggleActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.RightPanel);

  if (!props.enabled) {
    return null;
  }

  return (
    <div ref={ref}>
      <button
        aria-controls={MenuElementIdMap.RightPanel}
        aria-expanded={isActive}
        aria-haspopup="dialog"
        aria-label={`Right panel`}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.RightPanel}
        onClick={toggleActive}
      >
        {props.icon}
      </button>
      <HeaderPanel id={MenuElementIdMap.RightPanel} role="dialog" aria-label="Right panel" expanded={isActive}>
        {props.component}
      </HeaderPanel>
    </div>
  );
}

function SidenavMenu(props: any) {
  const { isActive, setIsActive } = props;
  const { ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.SideNav, { isActive, setIsActive });
  const windowSize = useWindowSize();
  const isMobileSidenavActive = (windowSize.width as number) < 1024;

  const closeMenu = () => setIsActive(false);

  if (isType(props.renderSidenav, "function")) {
    return (
      <div ref={ref} style={{ display: isActive ? "block" : "none" }}>
        {props.renderSidenav({
          isOpen: isActive,
          onMenuClose: closeMenu,
          close: closeMenu,
          navLinks: isMobileSidenavActive
            ? props.navLinks?.map((link: any) => (
                <SideNavLink aria-label={`Link for ${link.name}`} href={link.url} key={link.url}>
                  {link.name}
                </SideNavLink>
              ))
            : undefined,
        })}
      </div>
    );
  }

  if (isMobileSidenavActive) {
    return (
      <FocusTrap active={isActive} focusTrapOptions={{ allowOutsideClick: true }}>
        <div ref={ref} style={{ display: isActive ? "block" : "none" }}>
          <SideNav
            isChildOfHeader
            aria-label="Side navigation"
            expanded={isActive}
            isPersistent={false}
            onOverlayClick={closeMenu}
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
    );
  }

  return null;
}
