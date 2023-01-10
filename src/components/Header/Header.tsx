import React from "react";
import {
  Header as CarbonHeader,
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
import HeaderMenu from "./HeaderMenu";
import HeaderAppSwitcher from "./HeaderAppSwitcher";
import NotificationsContainer from "../Notifications/NotificationsContainer";
import PlatformNotificationsContainer from "../PlatformNotifications";
import UserRequests from "./UserRequests";
import useHeaderMenu from "../../hooks/useHeaderMenu";
import useWindowSize from "../../hooks/useWindowSize";
import { Close, Collaborate, Help, UserAvatar, Notification, NotificationNew, Switcher } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

type Props = {
  baseServicesUrl?: string;
  baseEnvUrl?: string;
  className?: string;
  enableAppSwitcher?: boolean;
  enableNotifications?: boolean;
  leftPanel?: (args: { close: () => void; isOpen: boolean; navLinks?: React.ReactNode[] }) => React.ReactNode;
  navLinks?: {
    name: string;
    url: string;
  }[];
  platformMessage?: string;
  prefixName?: string;
  productName: string;
  profileMenuItems?: React.ReactNode[];
  rightPanel?: { icon?: React.ReactNode; component: React.ReactNode };
  requestSummary?: {
    requireUserAction: number;
    submittedByUser: number;
  };
  skipToContentProps?: { href?: string; children?: string; className?: string };
  supportMenuItems?: React.ReactNode[];
};

const MenuElementIdMap = {
  Notifcations: "header-notifications-dialog",
  Profile: "header-profile-menu",
  Requests: "header-requests-menu",
  RightPanel: "header-right-panel-dialog",
  SideNav: "header-sidenav-menu",
  Support: "header-support-menu",
  Switcher: "header-switcher-dialog",
} as const;

type MenuElementIdMapType = typeof MenuElementIdMap;

const FocusableElementIdMap: Record<
  keyof MenuElementIdMapType,
  `${MenuElementIdMapType[keyof MenuElementIdMapType]}-button`
> = {
  Notifcations: "header-notifications-dialog-button",
  Profile: "header-profile-menu-button",
  Requests: "header-requests-menu-button",
  RightPanel: "header-right-panel-dialog-button",
  SideNav: "header-sidenav-menu-button",
  Support: "header-support-menu-button",
  Switcher: "header-switcher-dialog-button",
};

const MenuAriaLabelMap: Record<keyof MenuElementIdMapType, string> = {
  Notifcations: "Notifications Dialog",
  Profile: "Profile Menu",
  Requests: "Requests Menu",
  RightPanel: "RightPanel Dialog",
  SideNav: "SideNav Menu",
  Support: "Support Menu",
  Switcher: "Switcher Menu",
};

const headerButtonClassNames =
  "cds--btn--icon-only cds--header__action cds--btn cds--btn--primary cds--btn--icon-only cds--btn cds--btn--primary";

function isType(
  elem: any,
  type: "undefined" | "object" | "boolean" | "number" | "bigint" | "string" | "symbol" | "function"
) {
  return typeof elem === type;
}

export default function Header(props: Props) {
  const [isSideNavActive, setIsSideNavActive] = React.useState(false);

  const {
    productName,
    baseEnvUrl,
    baseServicesUrl,
    className,
    navLinks,
    prefixName = "",
    rightPanel,
    skipToContentProps,
  } = props;

  return (
    <Theme theme="g100">
      <CarbonHeader aria-label="App navigation header" className={className}>
        {skipToContentProps ? <SkipToContent {...skipToContentProps} /> : null}
        <HeaderMenuButton
          aria-label="Sidenav menu"
          id={FocusableElementIdMap.SideNav}
          isActive={isSideNavActive}
          isCollapsible={isType(props.leftPanel, "function")}
          onClick={() => setIsSideNavActive(!isSideNavActive)}
        />
        <SidenavMenu
          isActive={isSideNavActive}
          leftPanel={props.leftPanel}
          navLinks={props.navLinks}
          setIsActive={setIsSideNavActive}
        />
        <HeaderName href={baseEnvUrl} prefix={prefixName}>
          {productName}
        </HeaderName>
        <HeaderNavigation aria-label="Platform navigation">
          {Array.isArray(navLinks)
            ? navLinks.map((link) => (
                <HeaderMenuItem
                  aria-label={`Link for ${link.name}`}
                  href={link.url}
                  isCurrentPage={window?.location?.href && link.url ? window.location.href.startsWith(link.url) : false}
                  key={link.name}
                >
                  {link.name}
                </HeaderMenuItem>
              ))
            : null}
        </HeaderNavigation>
        <HeaderGlobalBar>
          <RequestsMenu
            baseEnvUrl={baseEnvUrl}
            enabled={Boolean(props.requestSummary)}
            summary={props.requestSummary}
          />
          <NotificationsMenu
            baseEnvUrl={baseEnvUrl}
            baseServicesUrl={baseServicesUrl}
            enabled={Boolean(props.enableNotifications)}
          />
          <SupportMenu
            enabled={Array.isArray(props.supportMenuItems) && props.supportMenuItems.length > 0}
            menuItems={props.supportMenuItems}
          />
          <ProfileMenu
            enabled={Array.isArray(props.profileMenuItems) && props.profileMenuItems.length > 0}
            menuItems={props.profileMenuItems}
          />
          <AppSwitcherMenu
            baseEnvUrl={baseEnvUrl}
            baseServicesUrl={baseServicesUrl}
            enabled={props.enableAppSwitcher}
          />
          <RightPanelMenu enabled={Boolean(rightPanel && Object.keys(rightPanel).length)} {...rightPanel} />
        </HeaderGlobalBar>
        <NotificationsContainer enableMultiContainer containerId={`${prefix}--bmrg-header-notifications`} />
      </CarbonHeader>
    </Theme>
  );
}

function RequestsMenu(props: { baseEnvUrl?: string; enabled: boolean; summary: Props["requestSummary"] }) {
  const { isActive, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.Requests);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuElementIdMap.Requests}
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelMap.Requests}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Requests}
        onClick={toggleActive}
      >
        <Collaborate size={20} />
      </button>
      {isActive ? (
        <HeaderMenu aria-labelledby={MenuAriaLabelMap.Requests} id={MenuElementIdMap.Requests}>
          <UserRequests baseEnvUrl={props.baseEnvUrl} summary={props.summary} />
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function NotificationsMenu(props: { enabled: boolean; baseEnvUrl?: string; baseServicesUrl?: string }) {
  const { isActive, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.Notifcations);
  const [hasNewNotifications, setHasNewNotifications] = React.useState(false);

  if (!props.enabled || !props.baseEnvUrl || !props.baseServicesUrl) {
    return null;
  }

  const icon = hasNewNotifications ? <NotificationNew size={20} /> : <Notification size={20} />;

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuElementIdMap.Notifcations}
        aria-expanded={isActive}
        aria-haspopup="dialog"
        aria-label={MenuAriaLabelMap.Notifcations}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Notifcations}
        onClick={toggleActive}
      >
        {icon}
      </button>
      <PlatformNotificationsContainer
        aria-labelledby={MenuAriaLabelMap.Notifcations}
        baseEnvUrl={props.baseEnvUrl}
        baseServicesUrl={props.baseServicesUrl}
        id={MenuElementIdMap.Notifcations}
        isActive={isActive}
        setHasNewNotifications={setHasNewNotifications}
      />
    </div>
  );
}

function SupportMenu(props: { enabled: Boolean; menuItems: Props["supportMenuItems"] }) {
  const { isActive, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.Support);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuElementIdMap.Support}
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelMap.Support}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Support}
        onClick={toggleActive}
      >
        <Help size={20} />
      </button>
      {isActive ? (
        <HeaderMenu aria-labelledby={MenuAriaLabelMap.Support} id={MenuElementIdMap.Support}>
          {props.menuItems}
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function ProfileMenu(props: { enabled: boolean; menuItems?: Props["profileMenuItems"] }) {
  const { isActive, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.Profile);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuElementIdMap.Profile}
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelMap.Profile}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Profile}
        onClick={toggleActive}
      >
        <UserAvatar size={20} />
      </button>
      {isActive ? (
        <HeaderMenu aria-labelledby={MenuAriaLabelMap.Profile} id={MenuElementIdMap.Profile}>
          {props.menuItems}
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function AppSwitcherMenu(props: { enabled?: boolean; baseEnvUrl?: string; baseServicesUrl?: string }) {
  const { isActive, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.Switcher);

  if (!props.enabled || !props.baseServicesUrl) {
    return null;
  }

  return (
    <div ref={ref}>
      <button
        aria-controls={MenuElementIdMap.Switcher}
        aria-expanded={isActive}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelMap.Switcher}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Switcher}
        onClick={toggleActive}
      >
        {isActive ? <Close size={20} /> : <Switcher size={20} />}
      </button>
      <HeaderAppSwitcher
        baseEnvUrl={props.baseEnvUrl}
        baseServicesUrl={props.baseServicesUrl}
        id={MenuElementIdMap.Switcher}
        isActive={isActive}
      />
    </div>
  );
}

function RightPanelMenu(props: { enabled: boolean; icon?: React.ReactNode; component?: React.ReactNode }) {
  const { isActive, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.RightPanel);

  if (!props.enabled) {
    return null;
  }

  return (
    <div ref={ref}>
      <button
        aria-controls={MenuElementIdMap.RightPanel}
        aria-expanded={isActive}
        aria-haspopup="dialog"
        aria-label={MenuAriaLabelMap.RightPanel}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.RightPanel}
        onClick={toggleActive}
      >
        {props.icon ?? <Switcher size={20} />}
      </button>
      <HeaderPanel
        id={MenuElementIdMap.RightPanel}
        role="dialog"
        aria-label={MenuAriaLabelMap.RightPanel}
        expanded={isActive}
      >
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
  const { ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.SideNav, { isActive, setIsActive });
  const windowSize = useWindowSize();
  const isMobileSidenavActive = (windowSize.width as number) < 1024;

  const closeMenu = () => setIsActive(false);

  if (typeof props.leftPanel === "function") {
    return (
      <div ref={ref}>
        {props.leftPanel({
          isOpen: isActive,
          close: closeMenu,
          navLinks: isMobileSidenavActive
            ? props.navLinks?.map((link) => (
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
      <div ref={ref} style={{ display: isActive ? "block" : "none" }}>
        <SideNav
          isChildOfHeader
          aria-label="Side navigation"
          expanded={isActive}
          isPersistent={false}
          onOverlayClick={closeMenu}
        >
          <SideNavItems>
            {props.navLinks?.map((link) => (
              <SideNavLink aria-label={`Link for ${link.name}`} href={link.url} key={link.url}>
                {link.name}
              </SideNavLink>
            ))}
          </SideNavItems>
        </SideNav>
      </div>
    );
  }

  return null;
}
