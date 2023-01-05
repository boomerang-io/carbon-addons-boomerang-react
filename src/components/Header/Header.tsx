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
  baseServiceUrl?: string;
  baseEnvUrl?: string;
  className?: string;
  enableAppSwitcher: boolean;
  enableNotifications: boolean;
  leftPanel?: (args: { close: () => void; isOpen: boolean; navLinks?: React.ReactNode[] }) => React.ReactNode;
  navLinks?: NavLink[];
  notificationsConfig?: {
    wsUrl: string;
    httpUrl?: string;
  };
  platformMessage?: any;
  prefixName?: string;
  productName: string;
  profileMenuItems?: any[];
  rightPanel?: { icon?: React.ReactNode; component: React.ReactNode };
  requestSummary?: {
    requireUserAction: number;
    submittedByUser: number;
  };
  skipToContentProps?: any;
  supportMenuItems?: any[];
};

const MenuElementIdMap = {
  Notifcations: "header-notifications-menu",
  Profile: "header-profile-menu",
  Requests: "header-requests-menu",
  RightPanel: "header-right-panel-menu",
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
  RightPanel: "header-right-panel-menu-button",
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
    productName,
    baseEnvUrl,
    baseServiceUrl,
    className,
    navLinks,
    prefixName = "",
    rightPanel,
    skipToContentProps,
  } = props;

  return (
    <Theme theme="g100">
      <Header className={className}>
        {skipToContentProps ? <SkipToContent {...skipToContentProps} /> : null}
        <HeaderMenuButton
          id={FocusableElementIdMap.SideNav}
          isCollapsible={isType(props.leftPanel, "function")}
          isActive={isSideNavActive}
          onClick={() => setIsSideNavActive(!isSideNavActive)}
        />
        <SidenavMenu
          navLinks={props.navLinks}
          leftPanel={props.leftPanel}
          isActive={isSideNavActive}
          setIsActive={setIsSideNavActive}
        />
        <HeaderName href={baseEnvUrl} prefix={prefixName}>
          {productName}
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
            baseEnvUrl={baseEnvUrl}
            requestSummary={props.requestSummary}
          />
          <NotificationsMenu
            enabled={Boolean(props.enableNotifications && props.notificationsConfig)}
            baseEnvUrl={baseEnvUrl}
            config={props.notificationsConfig}
          />
          <SupportMenu
            enabled={Array.isArray(props.supportMenuItems) && props.supportMenuItems.length > 0}
            supportMenuItems={props.supportMenuItems}
          />
          <ProfileMenu
            enabled={Array.isArray(props.profileMenuItems) && props.profileMenuItems.length > 0}
            menuItems={props.profileMenuItems}
          />
          <AppSwitcherMenu enabled={props.enableAppSwitcher} baseEnvUrl={baseEnvUrl} baseServiceUrl={baseServiceUrl} />
          <RightPanelMenu enabled={Boolean(rightPanel && Object.keys(rightPanel).length)} {...rightPanel} />
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
        baseEnvUrl={props.baseEnvUrl}
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
          <UserRequests baseEnvUrl={props.baseEnvUrl} requestSummary={props.requestSummary} />
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function SupportMenu(props: { enabled: Boolean; supportMenuItems: Props["supportMenuItems"] }) {
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
      {isActive ? <HeaderMenu id="header-support-menu">{props.supportMenuItems}</HeaderMenu> : null}
    </div>
  );
}

function ProfileMenu(props: { enabled: boolean; menuItems?: Props["supportMenuItems"] }) {
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
      {isActive ? <HeaderMenu id="header-profile-menu">{props.menuItems}</HeaderMenu> : null}
    </div>
  );
}

function AppSwitcherMenu(props: { enabled: boolean; baseEnvUrl?: string; baseServiceUrl?: string }) {
  const { isActive, toggleActive, ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.Switcher);

  if (!props.baseServiceUrl) {
    return null;
  }

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
        baseEnvUrl={props.baseEnvUrl}
        baseServiceUrl={props.baseServiceUrl}
        id={MenuElementIdMap.Switcher}
        isActive={isActive}
      />
    </div>
  );
}

function RightPanelMenu(props: { enabled: boolean; icon?: React.ReactNode; component?: React.ReactNode }) {
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
        {props.icon ?? <Switcher size={20} />}
      </button>
      <HeaderPanel id={MenuElementIdMap.RightPanel} role="dialog" aria-label="Right panel" expanded={isActive}>
        {props.component}
      </HeaderPanel>
    </div>
  );
}

function SidenavMenu(props: {
  leftPanel: Props["leftPanel"];
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  navLinks: Props["navLinks"];
}) {
  const { isActive, setIsActive } = props;
  const { ref } = useShellMenu<HTMLDivElement>(FocusableElementIdMap.SideNav, { isActive, setIsActive });
  const windowSize = useWindowSize();
  const isMobileSidenavActive = (windowSize.width as number) < 1024;

  const closeMenu = () => setIsActive(false);

  if (typeof props.leftPanel === "function") {
    return (
      <div ref={ref} style={{ display: isActive ? "block" : "none" }}>
        {props.leftPanel({
          isOpen: isActive,
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
