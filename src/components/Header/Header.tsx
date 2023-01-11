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
import {
  Close,
  Collaborate,
  Help,
  Notification,
  NotificationNew,
  Switcher,
  OpenPanelFilledRight,
  UserAvatar,
} from "@carbon/react/icons";
import HeaderAppSwitcher from "./HeaderAppSwitcher";
import HeaderMenu from "./HeaderMenu";
import NotificationsContainer from "../Notifications/NotificationsContainer";
import PlatformNotificationsContainer from "../PlatformNotifications";
import UserRequests from "./UserRequests";
import useHeaderMenu from "../../hooks/useHeaderMenu";
import useWindowSize from "../../hooks/useWindowSize";
import { isType } from "../../internal/helpers";
import { prefix } from "../../internal/settings";
import "wicg-inert";

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

const MenuElementIdRecord = {
  Notifcations: "header-notifications-dialog",
  Profile: "header-profile-menu",
  Requests: "header-requests-menu",
  RightPanel: "header-right-panel-dialog",
  SideNav: "header-sidenav-menu",
  Support: "header-support-menu",
  Switcher: "header-switcher-dialog",
} as const;

type MenuElementIdRecordType = typeof MenuElementIdRecord;

const FocusableElementIdMap: Record<
  keyof MenuElementIdRecordType,
  `${MenuElementIdRecordType[keyof MenuElementIdRecordType]}-button`
> = {
  Notifcations: "header-notifications-dialog-button",
  Profile: "header-profile-menu-button",
  Requests: "header-requests-menu-button",
  RightPanel: "header-right-panel-dialog-button",
  SideNav: "header-sidenav-menu-button",
  Support: "header-support-menu-button",
  Switcher: "header-switcher-dialog-button",
};

const MenuAriaLabelRecord: Record<keyof MenuElementIdRecordType, string> = {
  Notifcations: "Notifications dialog",
  Profile: "Profile menu",
  Requests: "Requests menu",
  RightPanel: "RightPanel dialog",
  SideNav: "SideNav menu",
  Support: "Support menu",
  Switcher: "Switcher menu",
};

const headerButtonClassNames =
  "cds--btn--icon-only cds--header__action cds--btn cds--btn--primary cds--btn--icon-only cds--btn cds--btn--primary";

export default function Header(props: Props) {
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
        <SidenavMenu leftPanel={props.leftPanel} navLinks={props.navLinks} />
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
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.Requests);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuElementIdRecord.Requests}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelRecord.Requests}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Requests}
        onClick={toggleActive}
      >
        <Collaborate size={20} />
      </button>
      {isOpen ? (
        <HeaderMenu aria-labelledby={MenuAriaLabelRecord.Requests} id={MenuElementIdRecord.Requests}>
          <UserRequests baseEnvUrl={props.baseEnvUrl} summary={props.summary} />
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function NotificationsMenu(props: { enabled: boolean; baseEnvUrl?: string; baseServicesUrl?: string }) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.Notifcations);
  const [hasNewNotifications, setHasNewNotifications] = React.useState(false);

  if (!props.enabled || !props.baseEnvUrl || !props.baseServicesUrl) {
    return null;
  }

  const icon = hasNewNotifications ? <NotificationNew size={20} /> : <Notification size={20} />;

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuElementIdRecord.Notifcations}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={MenuAriaLabelRecord.Notifcations}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Notifcations}
        onClick={toggleActive}
      >
        {icon}
      </button>
      <PlatformNotificationsContainer
        aria-labelledby={MenuAriaLabelRecord.Notifcations}
        baseEnvUrl={props.baseEnvUrl}
        baseServicesUrl={props.baseServicesUrl}
        id={MenuElementIdRecord.Notifcations}
        isOpen={isOpen}
        setHasNewNotifications={setHasNewNotifications}
      />
    </div>
  );
}

function SupportMenu(props: { enabled: Boolean; menuItems: Props["supportMenuItems"] }) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.Support);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuElementIdRecord.Support}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelRecord.Support}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Support}
        onClick={toggleActive}
      >
        <Help size={20} />
      </button>
      {isOpen ? (
        <HeaderMenu aria-labelledby={MenuAriaLabelRecord.Support} id={MenuElementIdRecord.Support}>
          {props.menuItems}
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function ProfileMenu(props: { enabled: boolean; menuItems?: Props["profileMenuItems"] }) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.Profile);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuElementIdRecord.Profile}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelRecord.Profile}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Profile}
        onClick={toggleActive}
      >
        <UserAvatar size={20} />
      </button>
      {isOpen ? (
        <HeaderMenu aria-labelledby={MenuAriaLabelRecord.Profile} id={MenuElementIdRecord.Profile}>
          {props.menuItems}
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function AppSwitcherMenu(props: { enabled?: boolean; baseEnvUrl?: string; baseServicesUrl?: string }) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.Switcher);

  if (!props.enabled || !props.baseServicesUrl) {
    return null;
  }

  return (
    <div ref={ref}>
      <button
        aria-controls={MenuElementIdRecord.Switcher}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelRecord.Switcher}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.Switcher}
        onClick={toggleActive}
      >
        {isOpen ? <Close size={20} /> : <Switcher size={20} />}
      </button>
      <HeaderAppSwitcher
        baseEnvUrl={props.baseEnvUrl}
        baseServicesUrl={props.baseServicesUrl}
        id={MenuElementIdRecord.Switcher}
        isOpen={isOpen}
      />
    </div>
  );
}

function RightPanelMenu(props: { enabled: boolean; icon?: React.ReactNode; component?: React.ReactNode }) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.RightPanel);

  if (!props.enabled) {
    return null;
  }

  return (
    <div ref={ref}>
      <button
        aria-controls={MenuElementIdRecord.RightPanel}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={MenuAriaLabelRecord.RightPanel}
        className={headerButtonClassNames}
        id={FocusableElementIdMap.RightPanel}
        onClick={toggleActive}
      >
        {props.icon ?? <OpenPanelFilledRight size={20} />}
      </button>
      <HeaderPanel
        id={MenuElementIdRecord.RightPanel}
        role="dialog"
        aria-label={MenuAriaLabelRecord.RightPanel}
        expanded={isOpen}
      >
        {props.component}
      </HeaderPanel>
    </div>
  );
}

function SidenavMenu(props: { leftPanel?: Props["leftPanel"]; navLinks: Props["navLinks"] }) {
  const { ref, isOpen, setIsOpen, toggleActive } = useHeaderMenu<HTMLDivElement>(FocusableElementIdMap.SideNav);
  const windowSize = useWindowSize();
  const isMobileSidenavActive = (windowSize.width as number) < 1056;

  const closeMenu = () => {
    setIsOpen(false);
  };

  if (typeof props.leftPanel === "function") {
    return (
      <div ref={ref}>
        <HeaderMenuButton
          aria-label="Sidenav menu"
          id={FocusableElementIdMap.SideNav}
          isActive={isOpen}
          isCollapsible={isType(props.leftPanel, "function")}
          onClick={toggleActive}
        />
        {
          // @ts-ignore
          <div inert={isOpen ? undefined : "true"}>
            {props.leftPanel({
              isOpen: isOpen,
              close: closeMenu,
              navLinks: isMobileSidenavActive
                ? props.navLinks?.map((link) => (
                    <SideNavLink aria-label={`Link for ${link.name}`} href={link.url} key={link.url + link.name}>
                      {link.name}
                    </SideNavLink>
                  ))
                : undefined,
            })}
          </div>
        }
      </div>
    );
  }

  if (isMobileSidenavActive) {
    return (
      <div ref={ref}>
        <HeaderMenuButton
          aria-label="Sidenav menu"
          id={FocusableElementIdMap.SideNav}
          isOpen={isOpen}
          isCollapsible={isType(props.leftPanel, "function")}
          onClick={toggleActive}
        />
        {
          // @ts-ignore
          <div inert={isOpen ? undefined : "true"}>
            <SideNav
              isChildOfHeader
              addFocusListeners={false}
              aria-label="Side navigation"
              expanded={isOpen}
              isPersistent={false}
              onOverlayClick={closeMenu}
            >
              <SideNavItems>
                {props.navLinks?.map((link) => (
                  <SideNavLink aria-label={`Link for ${link.name}`} href={link.url} key={link.url + link.name}>
                    {link.name}
                  </SideNavLink>
                ))}
              </SideNavItems>
            </SideNav>
          </div>
        }
      </div>
    );
  }

  return null;
}
