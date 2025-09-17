/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

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
import { prefix } from "../../internal/settings";
import type { NavLink } from "../../types";

type Props = {
  baseServicesUrl?: string;
  baseEnvUrl?: string;
  carbonTheme?: "white" | "g10" | "g90" | "g100";
  className?: string;
  enableAppSwitcher?: boolean;
  enableNotifications?: boolean;
  enableNotificationsCount?: boolean;
  leftPanel?: (args: { close: () => void; isOpen: boolean; navLinks?: NavLink[] }) => React.ReactNode;
  navLinks?: NavLink[];
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
  instanceSwitcherMenuItems?:React.ReactNode[];
  templateMeteringEvent?: (props: any) => void;
  triggerEvent?: (props: any) => any;
  userTeams?: { data: any; isLoading: boolean; error: any };
};

type MenuType = "Notifcations" | "Profile" | "Requests" | "RightPanel" | "SideNav" | "Support" | "InstanceSwitcher" | "Switcher";

const MenuListId = {
  Notifcations: "header-notifications-dialog",
  Profile: "header-profile-menu",
  Requests: "header-user-requests-menu",
  RightPanel: "header-right-panel-dialog",
  SideNav: "header-sidenav-menu",
  Support: "header-support-menu",
  instanceSwitcher:"header-instanceSwitcher-menu",
  Switcher: "header-switcher-menu",
} as const;

type MenuListType = typeof MenuListId;

const MenuButtonId: Record<MenuType, `${MenuListType[keyof MenuListType]}-button`> = {
  Notifcations: "header-notifications-dialog-button",
  Profile: "header-profile-menu-button",
  Requests: "header-user-requests-menu-button",
  RightPanel: "header-right-panel-dialog-button",
  SideNav: "header-sidenav-menu-button",
  Support: "header-support-menu-button",
  InstanceSwitcher: "header-instanceSwitcher-menu-button",
  Switcher: "header-switcher-menu-button",
};

const MenuAriaLabelRecord: Record<keyof MenuListType, string> = {
  Notifcations: "Notifications dialog",
  Profile: "Profile menu",
  Requests: "Requests menu",
  RightPanel: "RightPanel dialog",
  SideNav: "SideNav menu",
  instanceSwitcher:"Instance Switcher Menu",
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
    carbonTheme = "g10",
    className,
    navLinks,
    prefixName = "",
    rightPanel,
    skipToContentProps,
    templateMeteringEvent,
    triggerEvent,
    userTeams,
  } = props;

  return (
    <>
      <Theme theme={carbonTheme}>
        <CarbonHeader aria-label="App navigation header" className={className}>
          {skipToContentProps ? <SkipToContent {...skipToContentProps} /> : null}
          <SidenavMenu leftPanel={props.leftPanel} navLinks={props.navLinks} />
          <HeaderName href={`${baseEnvUrl}/launchpad`} prefix={prefixName} data-testid="header-product">
            {productName}
          </HeaderName>
          <HeaderNavigation aria-label="Platform navigation">
            {Array.isArray(navLinks)
              ? navLinks.map((link) => (
                  <HeaderMenuItem
                    aria-label={`Link for ${link.name}`}
                    data-testid="header-menu-link"
                    href={link.url}
                    isCurrentPage={
                      window?.location?.href && link.url ? window.location.href.startsWith(link.url) : false
                    }
                    key={link.name}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {link.name}
                  </HeaderMenuItem>
                ))
              : null}
          </HeaderNavigation>
          <HeaderGlobalBar>
            <InstanceSwitcherMenu
               enabled={true}
              // enabled={Array.isArray(props.instanceSwitcherMenuItems) && props.instanceSwitcherMenuItems.length > 0}
              menuItems={props.instanceSwitcherMenuItems}
            />
            <RequestsMenu
              baseEnvUrl={baseEnvUrl}
              enabled={Boolean(props.requestSummary)}
              summary={props.requestSummary}
            />
            <NotificationsMenu
              baseEnvUrl={baseEnvUrl}
              baseServicesUrl={baseServicesUrl}
              enabled={Boolean(props.enableNotifications)}
              countEnabled={Boolean(props.enableNotificationsCount)}
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
              templateMeteringEvent={templateMeteringEvent}
              triggerEvent={triggerEvent}
              userTeams={userTeams}
            />
            <RightPanelMenu enabled={Boolean(rightPanel && Object.keys(rightPanel).length)} {...rightPanel} />
          </HeaderGlobalBar>
        </CarbonHeader>
      </Theme>
      <NotificationsContainer enableMultiContainer containerId={`${prefix}--bmrg-header-notifications`} />
    </>
  );
}

function InstanceSwitcherMenu(props: { enabled: Boolean; menuItems: Props["instanceSwitcherMenuItems"] }) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(MenuButtonId.InstanceSwitcher);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuListId.instanceSwitcher}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelRecord.instanceSwitcher}
        className={headerButtonClassNames}
        data-testid="header-instanceSwitcher-link"
        id={MenuButtonId.InstanceSwitcher}
        onClick={toggleActive}
      >
        <Help size={20} />
      </button>
      {isOpen ? (
        <HeaderMenu aria-labelledby={MenuButtonId.InstanceSwitcher} id={MenuListId.instanceSwitchernstanceSwitcher}>
           <HeaderMenuItem key="Global" text="Global" type="link" kind="app" href="https://servicesessentials.ibm.com/launchpad" target="_self"/>,
           <HeaderMenuItem key="Australlia" text="Australlia" type="link" kind="app" href="au.ica.ibm.com" target="_self"/>,
           <HeaderMenuItem key="Canada" text="Australlia" type="link" kind="app" href="canada.ica.ibm.com" target="_self"/>,
          {/* {props.menuItems} */}
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function RequestsMenu(props: { baseEnvUrl?: string; enabled: boolean; summary: Props["requestSummary"] }) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(MenuButtonId.Requests);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuListId.Requests}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelRecord.Requests}
        className={headerButtonClassNames}
        id={MenuButtonId.Requests}
        data-testid="header-requests-link"
        onClick={toggleActive}
      >
        <Collaborate size={20} />
      </button>
      {isOpen ? (
        <HeaderMenu aria-labelledby={MenuButtonId.Requests} id={MenuListId.Requests}>
          <UserRequests baseEnvUrl={props.baseEnvUrl} summary={props.summary} />
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function NotificationBadge(props: { count: number }) {
  return (
    <div className={`${prefix}--bmrg-header-notifications-badge__icon-container`}>
      <Notification size={20} />
      {props.count > 0 && (
        <span className={`${prefix}--bmrg-header-notifications-badge__icon-badge`}>{props.count}</span>
      )}
    </div>
  );
}

function NotificationsMenu(props: {
  enabled: boolean;
  countEnabled: boolean;
  baseEnvUrl?: string;
  baseServicesUrl?: string;
}) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(MenuButtonId.Notifcations);
  const [hasNewNotifications, setHasNewNotifications] = React.useState(false);
  const [notificationsCount, setNotificationsCount] = React.useState(0);
  let icon = null;

  if (!props.enabled || !props.baseEnvUrl || !props.baseServicesUrl) {
    return null;
  }

  icon = hasNewNotifications ? <NotificationNew size={20} /> : <Notification size={20} />;
  if (props.countEnabled && hasNewNotifications) {
    icon = <NotificationBadge count={notificationsCount} />;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuListId.Notifcations}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={MenuAriaLabelRecord.Notifcations}
        className={headerButtonClassNames}
        data-testid="header-notifications-link"
        id={MenuButtonId.Notifcations}
        onClick={toggleActive}
      >
        {icon}
      </button>
      <PlatformNotificationsContainer
        aria-labelledby={MenuButtonId.Notifcations}
        baseEnvUrl={props.baseEnvUrl}
        baseServicesUrl={props.baseServicesUrl}
        id={MenuListId.Notifcations}
        isOpen={isOpen}
        setHasNewNotifications={setHasNewNotifications}
        setNotificationsCount={setNotificationsCount}
      />
    </div>
  );
}

function SupportMenu(props: { enabled: Boolean; menuItems: Props["supportMenuItems"] }) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(MenuButtonId.Support);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuListId.Support}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelRecord.Support}
        className={headerButtonClassNames}
        data-testid="header-support-link"
        id={MenuButtonId.Support}
        onClick={toggleActive}
      >
        <Help size={20} />
      </button>
      {isOpen ? (
        <HeaderMenu aria-labelledby={MenuButtonId.Support} id={MenuListId.Support}>
          {props.menuItems}
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function ProfileMenu(props: { enabled: boolean; menuItems?: Props["profileMenuItems"] }) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(MenuButtonId.Profile);

  if (!props.enabled) {
    return null;
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        aria-controls={MenuListId.Profile}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelRecord.Profile}
        className={headerButtonClassNames}
        data-testid="header-profile-link"
        id={MenuButtonId.Profile}
        onClick={toggleActive}
      >
        <UserAvatar size={20} />
      </button>
      {isOpen ? (
        <HeaderMenu aria-labelledby={MenuButtonId.Profile} id={MenuListId.Profile}>
          {props.menuItems}
        </HeaderMenu>
      ) : null}
    </div>
  );
}

function AppSwitcherMenu(props: {
  enabled?: boolean;
  baseEnvUrl?: string;
  baseServicesUrl?: string;
  templateMeteringEvent?: (props: any) => void;
  triggerEvent?: any;
  userTeams?: { data: any; isLoading: boolean; error: any };
}) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(MenuButtonId.Switcher);

  if (!props.enabled || !props.baseServicesUrl) {
    return null;
  }

  return (
    <div ref={ref}>
      <button
        aria-controls={MenuListId.Switcher}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={MenuAriaLabelRecord.Switcher}
        className={headerButtonClassNames}
        data-testid="header-appswitcher-link"
        id={MenuButtonId.Switcher}
        onClick={toggleActive}
      >
        {isOpen ? <Close size={20} /> : <Switcher size={20} />}
      </button>
      <HeaderAppSwitcher
        baseEnvUrl={props.baseEnvUrl}
        baseServicesUrl={props.baseServicesUrl}
        id={MenuListId.Switcher}
        isOpen={isOpen}
        templateMeteringEvent={props.templateMeteringEvent}
        triggerEvent={props.triggerEvent}
        userTeams={props.userTeams}
      />
    </div>
  );
}

function RightPanelMenu(props: { enabled: boolean; icon?: React.ReactNode; component?: React.ReactNode }) {
  const { isOpen, toggleActive, ref } = useHeaderMenu<HTMLDivElement>(MenuButtonId.RightPanel);

  if (!props.enabled) {
    return null;
  }

  return (
    <div ref={ref}>
      <button
        aria-controls={MenuListId.RightPanel}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={MenuAriaLabelRecord.RightPanel}
        className={headerButtonClassNames}
        data-testid="header-right-panel"
        id={MenuButtonId.RightPanel}
        onClick={toggleActive}
      >
        {props.icon ?? <OpenPanelFilledRight size={20} />}
      </button>
      <HeaderPanel
        id={MenuListId.RightPanel}
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
  const { ref, isOpen, setIsOpen, toggleActive } = useHeaderMenu<HTMLDivElement>(MenuButtonId.SideNav);
  const windowSize = useWindowSize();
  const isMobileSidenavActive = (windowSize.width as number) < 1056;

  const closeMenu = () => {
    setIsOpen(false);
  };

  if (typeof props.leftPanel === "function") {
    return (
      <div ref={ref} data-testid="header-sidenav-menu">
        <HeaderMenuButton
          aria-label={isOpen ? "Close Side Nav" : "Expand Side Nav"}
          id={MenuButtonId.SideNav}
          isActive={isOpen}
          isCollapsible={true}
          onClick={toggleActive}
        />
        {props.leftPanel({
          isOpen: isOpen,
          close: closeMenu,
          navLinks: isMobileSidenavActive ? props.navLinks : undefined,
        })}
      </div>
    );
  }

  return (
    <div ref={ref} data-testid="header-sidenav-menu">
      {isMobileSidenavActive ? (
        <>
          <HeaderMenuButton
            aria-label={isOpen ? "Close Side Nav" : "Expand Side Nav"}
            id={MenuButtonId.SideNav}
            isActive={isOpen}
            isCollapsible={false}
            onClick={toggleActive}
          />
          {
            // @ts-ignore
            <div inert={isOpen ? undefined : "true"}>
              <SideNav
                isChildOfHeader
                aria-label="Side navigation"
                expanded={isOpen}
                isPersistent={false}
                onOverlayClick={closeMenu}
              >
                <SideNavItems>
                  {props.navLinks?.map((link) => (
                    <SideNavLink
                      large
                      aria-label={`Link for ${link.name}`}
                      href={link.url}
                      isActive={window?.location?.href && link.url ? window.location.href.startsWith(link.url) : false}
                      key={link.url + link.name}
                    >
                      {link.name}
                    </SideNavLink>
                  ))}
                </SideNavItems>
              </SideNav>
            </div>
          }
        </>
      ) : null}
    </div>
  );
}
