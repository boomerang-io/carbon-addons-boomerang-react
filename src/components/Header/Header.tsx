import React from "react";
import cx from "classnames";
import {
  ChevronDown,
  ChevronUp,
  Close,
  Collaborate,
  Help,
  UserAvatar,
  Notification,
  NotificationNew,
  Switcher,
} from "@carbon/react/icons";
import { prefix } from "../../internal/settings";
import PlatformNotificationsContainer from "../PlatformNotifications";
import NotificationsContainer from "../Notifications/NotificationsContainer";
import UserRequests from "../UserRequests";
import HeaderAppSwitcher from "./HeaderAppSwitcher";
import HeaderList from "./HeaderList";
import CustomHeaderMenuItem from "../HeaderMenuItem";
import HeaderMenuLink from "../HeaderMenuLink";
import HeaderLogo from "./HeaderLogo";
import BoomerangLogo from "./assets/BoomerangLogo";
import PrivacyStatement from "../PrivacyStatement";
import { AboutPlatformMenuItem } from "../AboutPlatform";

import {
  Header,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
  HeaderPanel,
  SkipToContent,
  SideNav,
  SideNavDivider,
  SideNavItems,
  SideNavLink,
  Popover,
  PopoverContent,
  Theme,
  use
} from "@carbon/react";

const stateToButtonElemIdMap: Record<string, string> = {
  isAppSwitcherActive: "navigation-switcher-menu-button",
  isHelpActive: "navigation-help-menu-button",
  isMobileNavActive: "navigation-mobile-menu-button",
  isNotificationActive: "navigation-notification-menu-button",
  isProfileActive: "navigation-profile-menu-button",
  isRequestsActive: "navigation-requests-menu-button",
  isRightPanelActive: "navigation-right-panel-button",
  isSidenavActive: "navigation-sidenav-menu-button",
};

function transformToIsStateKey(key: keyof typeof stateToButtonElemIdMap) {
  return `is${key}Active`;
}

type NavLink = {
  name: string;
  url: string;
};

type OwnProps = {
  appName?: string;
  baseServiceUrl: string;
  baseLaunchEnvUrl?: string;
  className?: string;
  companyName?: string;
  enableAppSwitcher?: boolean;
  enableNotifications?: boolean;
  navLinks?: NavLink[];
  notificationsConfig?: {
    wsUrl: string;
    httpUrl?: string;
  };
  onHelpClick?: Function | any[];
  platformName?: string;
  platformMessage?: any;
  profileChildren?: Function | any[];
  productName?: string;
  renderLogo?: boolean;
  renderRightPanel?: { icon: React.ReactNode; component: React.ReactNode };
  renderSidenav?: (args: { isOpen: boolean; onMenuClose: Function; navLinks?: React.ReactNode[] }) => React.ReactNode;
  requestSummary?: {
    requireUserAction: number;
    submittedByUser: number;
  };
  skipToContentProps?: any;
};

type State = any;

//type Props = OwnProps & typeof Header.defaultProps;

class MainHeader extends React.Component<OwnProps, State> {
  static defaultProps = {};

  state: any = {
    hasNewNotifications: false,
    isAppSwitcherActive: false,
    isRightPanelActive: false,
    isSidenavActive: false,
  };

  // navRef = React.createRef<HTMLDivElement>();
  // sideNavRef = React.createRef<HTMLDivElement>();
  // sideNavButtonRef = React.createRef<HTMLDivElement>();

  // componentDidMount() {
  //   document.addEventListener("mousedown", this.handleClickoutsideEvent);
  //   document.addEventListener("keydown", this.handleKeyEvent);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("mousedown", this.handleClickoutsideEvent);
  //   document.removeEventListener("keydown", this.handleKeyEvent);
  // }

  // /**
  //  * Handle clicking outside a open menu and closing the appropriate one
  //  * @param {object} event - mousedown event
  //  */
  // handleClickoutsideEvent = (event: any) => {
  //   if (this.navRef && !(this as any).navRef.current?.contains(event.target)) {
  //     this.handleCloseHeaderMenus();
  //   }

  //   if (
  //     this.sideNavRef &&
  //     !(this as any).sideNavRef.current?.contains(event.target) &&
  //     !(this as any).sideNavButtonRef.current?.contains(event.target)
  //   ) {
  //     this.handleCloseSidenav();
  //   }
  // };

  /**
   * Close the active menu and focus on the button that triggered it
   * Close menu
   * via the ESC key
   * @param {object} event - keydown event
   */
  // handleKeyEvent = (event: any) => {
  //   if (event.key === "Escape") {
  //     this.handleCloseViaEsc();
  //     return;
  //   }

  //   if (event.key === "Tab") {
  //     // Only have to test for the right panel here bc other menus have a focus trap
  //     if (this.state.isRightPanelActive && !(this as any).navRef.current?.contains(event.target)) {
  //       this.handleCloseHeaderMenus();
  //       return;
  //     }
  //   }
  // };

  // handleCloseHeaderMenus = () => {
  //   this.setState({
  //     isAppSwitcherActive: false,
  //     isHelpActive: false,
  //     isNotificationActive: false,
  //     isProfileActive: false,
  //     isRequestsActive: false,
  //     isRightPanelActive: false,
  //   });
  // };

  // handleCloseMobileNav = () => {
  //   this.setState({
  //     isMobileNavActive: false,
  //   });
  // };

  // handleCloseSidenav = () => {
  //   this.setState({
  //     isSidenavActive: false,
  //   });
  // };

  // handleCloseViaEsc = () => {
  //   const activeMenuStateKey = Object.keys(this.state).find((key) => key.startsWith("is") && this.state[key]);

  //   if (activeMenuStateKey) {
  //     this.setState({
  //       [activeMenuStateKey]: false,
  //     });

  //     const elemToReceiveFocus = document.getElementById(stateToButtonElemIdMap[activeMenuStateKey]);
  //     if (elemToReceiveFocus) {
  //       elemToReceiveFocus.focus();
  //     }
  //   }
  // };

  // /**
  //  * @param {string} type - Passes in the type of click (i.e. profile, notification)
  //  * @returns {(...args: any[]) => any} - finds the appropriate click type to trigger function, sets all other state items that have
  //  * 'is' prefix to false (in order to only have one active item at a time)
  //  */
  // handleIconClick =
  //   (type: any): ((...args: any[]) => any) =>
  //   (evt: any) => {
  //     Object.keys(this.state)
  //       .filter((key) => key.startsWith("is"))
  //       .forEach((key) => {
  //         const clickType = transformToIsStateKey(type);
  //         if (key === clickType) {
  //           this.setState({
  //             [clickType]: !this.state[clickType],
  //           });

  //           // Add callback if parent wants event emitted
  //           // Match prop name for handling on element click
  //           const propFunc = this.props[`on${type}Click` as keyof typeof this.props];
  //           if (typeof propFunc === "function") {
  //             propFunc(evt);
  //           }
  //         } else {
  //           this.setState({
  //             [key]: false,
  //           });
  //         }
  //       });
  //   };

  /**
   * @param {string} key - key in state to update
   * @returns {(...args: any[]) => any} - pass in value for key
   */
  handleUpdateStateKey = (key: string) => (value: any) => {
    this.setState({
      [key]: value,
    });
  };

  onMenuClose = () => {
    this.setState({
      isSidenavActive: false,
    });
  };

  render() {
    const {
      appName,
      baseLaunchEnvUrl,
      baseServiceUrl,
      className,
      navLinks,
      platformName,
      renderLogo,
      renderRightPanel,
      skipToContentProps,
    } = this.props;

    console.log({ renderSidenav: this.props.renderSidenav });
    return (
      <Theme theme="g100">
        <HeaderContainer
          isSideNavExpanded={false}
          render={({ isSideNavExpanded, onClickSideNavExpand }: any) => (
            <Header>
              {skipToContentProps ? <SkipToContent {...skipToContentProps} /> : null}
              {this.props.renderSidenav ? (
                <HeaderMenuButton
                  isCollapsible
                  isActive={this.state.isSidenavActive}
                  onClick={() => this.handleUpdateStateKey("isSidenavActive")(!this.state.isSidenavActive)}
                />
              ) : (
                <HeaderMenuButton isActive={isSideNavExpanded} onClick={onClickSideNavExpand} />
              )}

              <HeaderName href="#" prefix="IBM Services">
                Essentials
              </HeaderName>
              <HeaderNavigation aria-label="Platform navigation">
                {Array.isArray(navLinks) &&
                  navLinks.map((link) => (
                    <HeaderMenuItem aria-label={`Link for ${link.name}`} href={link.url} key={link.url}>
                      {link.name}
                    </HeaderMenuItem>
                  ))}
              </HeaderNavigation>
              <HeaderGlobalBar>
                {Boolean(this.props.requestSummary) ? (
                  <HeaderMenu
                    aria-label="Collaborate"
                    renderMenuContent={() => <Collaborate size={20} />}
                    className="bmrg--submenu"
                  >
                    <CustomHeaderMenuItem onClick={console.log}>Hello</CustomHeaderMenuItem>
                    <CustomHeaderMenuItem onClick={console.log}>There</CustomHeaderMenuItem>
                    {/* <UserRequests baseLaunchEnvUrl={baseLaunchEnvUrl} requestSummary={this.props.requestSummary} /> */}
                  </HeaderMenu>
                ) : null}
                {Boolean(this.props.enableNotifications && this.props.notificationsConfig) ? (
                  <HeaderMenu
                    aria-label="Notifications"
                    className="bmrg--submenu"
                    renderMenuContent={() =>
                      this.state.hasNewNotifications ? (
                        <NotificationNew alt="New notifications icon" size={20} />
                      ) : (
                        <Notification alt="No new notifications icon" size={20} />
                      )
                    }
                  >
                    <PlatformNotificationsContainer
                      isNotificationActive={true}
                      baseLaunchEnvUrl={baseLaunchEnvUrl}
                      config={this.props.notificationsConfig}
                      setHasNewNotifications={this.handleUpdateStateKey("hasNewNotifications")}
                    />
                  </HeaderMenu>
                ) : null}
                {Array.isArray(this.props.onHelpClick) && this.props.onHelpClick.length > 0 ? (
                  <HeaderMenu
                    aria-label="Support"
                    className="bmrg--submenu"
                    renderMenuContent={(props: any) => <Help size={20} {...props} />}
                  >
                    <CustomHeaderMenuItem onClick={console.log}>Hello</CustomHeaderMenuItem>
                    <CustomHeaderMenuItem onClick={console.log}>There</CustomHeaderMenuItem>
                  </HeaderMenu>
                ) : null}
                {Array.isArray(this.props.profileChildren) && this.props.profileChildren.length > 0 ? (
                  <HeaderMenu
                    aria-label="Support"
                    className="bmrg--submenu"
                    renderMenuContent={(props: any) => <UserAvatar alt="Profile icon" size={20} {...props} />}
                  >
                    <AboutPlatformMenuItem />
                  </HeaderMenu>
                ) : null}
                {/* {this.props.enableAppSwitcher ? (
              <>
                <HeaderGlobalAction
                  aria-expanded={this.state.isAppSwitcherActive}
                  aria-label="Team Switcher"
                  tooltipAlignment="end"
                  id={stateToButtonElemIdMap[transformToIsStateKey("AppSwitcher")]}
                  onClick={this.handleIconClick("AppSwitcher")}
                >
                  {this.state?.isAppSwitcherActive ? (
                    <Close alt="Close App Switcher" size={20} />
                  ) : (
                    <Switcher alt="Open App Switcher" size={20} />
                  )}
                </HeaderGlobalAction>
                <HeaderAppSwitcher
                  baseLaunchEnvUrl={baseLaunchEnvUrl}
                  baseServiceUrl={baseServiceUrl}
                  isActive={this.state.isAppSwitcherActive}
                />
              </>
            ) : null} */}
                {/* {renderRightPanel && Object.keys(renderRightPanel).length ? (
              <>
                <HeaderGlobalAction
                  aria-expanded={this.state.isRightPanelActive}
                  aria-label={`Right panel button`}
                  id={stateToButtonElemIdMap[transformToIsStateKey("RightPanel")]}
                  onClick={this.handleIconClick("RightPanel")}
                >
                  {renderRightPanel.icon}
                </HeaderGlobalAction>
                <HeaderPanel expanded={this.state.isRightPanelActive}>{renderRightPanel.component}</HeaderPanel>
              </>
            ) : null} */}
              </HeaderGlobalBar>
              {this.props.renderSidenav ? (
                <div
                  className={cx(`${prefix}--bmrg-header__app-menu-wrapper`, {
                    "--is-hidden": !this.state.isSidenavActive,
                  })}
                >
                  {this.props.renderSidenav({
                    isOpen: this.state.isSidenavActive,
                    onMenuClose: this.onMenuClose,
                    navLinks: navLinks?.map((link) => (
                      <SideNavLink aria-label={`Link for ${link.name}`} href={link.url} key={link.url}>
                        {link.name}
                      </SideNavLink>
                    )),
                  })}
                </div>
              ) : (
                <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isPersistent={false}>
                  <SideNavItems>
                    {navLinks?.map((link) => (
                      <SideNavLink aria-label={`Link for ${link.name}`} href={link.url} key={link.url}>
                        {link.name}
                      </SideNavLink>
                    ))}
                  </SideNavItems>
                </SideNav>
              )}
              <NotificationsContainer enableMultiContainer containerId={`${prefix}--bmrg-header-notifications`} />
            </Header>
          )}
        />
      </Theme>
    );
  }
}

export default MainHeader;
