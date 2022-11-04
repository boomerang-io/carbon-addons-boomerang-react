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
import { SkipToContent, Theme } from "@carbon/react";
import PlatformNotificationsContainer from "../PlatformNotifications";
import HeaderMenu from "../HeaderMenu";
import NotificationsContainer from "../Notifications/NotificationsContainer";
import UserRequests from "../UserRequests";
import HeaderAppSwitcher from "./HeaderAppSwitcher";
import HeaderList from "./HeaderList";
import HeaderListItem from "./HeaderListItem";
import HeaderMenuLink from "../HeaderMenuLink";
import HeaderLogo from "./HeaderLogo";
import HeaderMenuBmrg from "./HeaderMenuBmrg";
import HeaderWrapper from "./HeaderWrapper";
import HeaderRightPanel from "./HeaderRightPanel";
import BoomerangLogo from "./assets/BoomerangLogo";

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

type OwnProps = {
  appName?: string;
  baseServiceUrl: string;
  baseLaunchEnvUrl?: string;
  className?: string;
  enableAppSwitcher?: boolean;
  enableNotifications?: boolean;
  navLinks?: any[];
  notificationsConfig?: {
    wsUrl: string;
  };
  onHelpClick?: any[];
  platformName?: string;
  platformMessage?: any;
  profileChildren?: any[];
  renderLogo?: boolean;
  renderRightPanel?: any;
  renderSidenav?: (...args: any[]) => any;
  requestSummary?: any;
  skipToContentProps?: any;
};

type State = any;

//type Props = OwnProps & typeof Header.defaultProps;

class Header extends React.Component<OwnProps, State> {
  static defaultProps = {};

  state = {
    hasNewNotifications: false,
    isAppSwitcherActive: false,
    isHelpActive: false,
    isMobileNavActive: false,
    isNotificationActive: false,
    isProfileActive: false,
    isRequestsActive: false,
    isRightPanelActive: false,
    isSidenavActive: false,
  };

  navRef = React.createRef<HTMLDivElement>();
  mobileNavRef = React.createRef<HTMLDivElement>();
  sideNavRef = React.createRef<HTMLDivElement>();
  sideNavButtonRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickoutsideEvent);
    document.addEventListener("keydown", this.handleKeyEvent);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickoutsideEvent);
    document.removeEventListener("keydown", this.handleKeyEvent);
  }

  /**
   * Handle clicking outside a open menu and closing the appropriate one
   * @param {object} event - mousedown event
   */
  handleClickoutsideEvent = (event: any) => {
    if (this.navRef && !(this as any).navRef.current?.contains(event.target)) {
      this.handleCloseHeaderMenus();
    }

    if (this.mobileNavRef && !(this as any).mobileNavRef.current?.contains(event.target)) {
      this.handleCloseMobileNav();
    }

    if (
      this.sideNavRef &&
      !(this as any).sideNavRef.current?.contains(event.target) &&
      !(this as any).sideNavButtonRef.current?.contains(event.target)
    ) {
      this.handleCloseSidenav();
    }
  };

  /**
   * Close the active menu and focus on the button that triggered it
   * Close menu
   * via the ESC key
   * @param {object} event - keydown event
   */
  handleKeyEvent = (event: any) => {
    if (event.key === "Escape") {
      this.handleCloseViaEsc();
      return;
    }

    if (event.key === "Tab") {
      // Only have to test for the right panel here bc other menus have a focus trap
      if (this.state.isRightPanelActive && !(this as any).navRef.current?.contains(event.target)) {
        this.handleCloseHeaderMenus();
        return;
      }
    }
  };

  handleCloseHeaderMenus = () => {
    this.setState({
      isAppSwitcherActive: false,
      isHelpActive: false,
      isNotificationActive: false,
      isProfileActive: false,
      isRequestsActive: false,
      isRightPanelActive: false,
    });
  };

  handleCloseMobileNav = () => {
    this.setState({
      isMobileNavActive: false,
    });
  };

  handleCloseSidenav = () => {
    this.setState({
      isSidenavActive: false,
    });
  };

  handleCloseViaEsc = () => {
    //@ts-ignore
    const activeMenuStateKey = Object.keys(this.state).find((key) => key.startsWith("is") && this.state[key]);

    if (activeMenuStateKey) {
      this.setState({
        [activeMenuStateKey]: false,
      });

      const elemToReceiveFocus = document.getElementById(stateToButtonElemIdMap[activeMenuStateKey]);
      if (elemToReceiveFocus) {
        elemToReceiveFocus.focus();
      }
    }
  };

  /**
   * 13 - corresponds to return/enter key
   * 32 - corresponds to space key
   * @param {string} type - Passes in the type of click (i.e. profile, notification)
   * @returns {(...args: any[]) => any} - if the appropriate type of click, calls handleIconClick with specified params
   */
  handleIconKeypress = (type: any) => (evt: any) => {
    if (evt.which === 13 || evt.which === 32) {
      this.handleIconClick(type)(evt);
    }
  };

  /**
   * @param {string} type - Passes in the type of click (i.e. profile, notification)
   * @returns {(...args: any[]) => any} - finds the appropriate click type to trigger function, sets all other state items that have
   * 'is' prefix to false (in order to only have one active item at a time)
   */
  handleIconClick =
    (type: any): ((...args: any[]) => any) =>
    (evt: any) => {
      Object.keys(this.state)
        .filter((key) => key.startsWith("is"))
        .forEach((key) => {
          const clickType = transformToIsStateKey(type);
          if (key === clickType) {
            this.setState({
              // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              [clickType]: !this.state[clickType],
            });

            // Add callback if parent wants event emitted
            // Match prop name for handling on element click
            // @ts-ignore
            const propFunc = this.props[`on${type}Click`];
            if (typeof propFunc === "function") {
              propFunc(evt);
            }
          } else {
            this.setState({
              [key]: false,
            });
          }
        });
    };

  /**
   * @param {string} key - key in state to update
   * @returns {(...args: any[]) => any} - pass in value for key
   */
  handleUpdateStateKey = (key: any) => (value: any) => {
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
    return (
      <Theme theme="g100">
        <header className={`${prefix}--bmrg-header-container`}>
          <div className={cx(`${prefix}--bmrg-header`, className)}>
            <HeaderWrapper>
              <div className={`${prefix}--bmrg-header-brand-container`}>
                {skipToContentProps ? <SkipToContent {...skipToContentProps} /> : null}
                {this.props.renderSidenav && (
                  <HeaderMenuBmrg
                    id={stateToButtonElemIdMap["isSidenavActive"]}
                    isOpen={this.state.isSidenavActive}
                    onClick={this.handleIconClick("Sidenav")}
                    onKeyDown={this.handleIconKeypress("Sidenav")}
                    ref={this.sideNavButtonRef}
                  />
                )}
                <HeaderLogo appName={appName} href={baseLaunchEnvUrl} navLinks={navLinks} platformName={platformName}>
                  {renderLogo && (
                    <BoomerangLogo alt="Boomerang Logo" className={`${prefix}--bmrg-header-brand__icon`} />
                  )}
                </HeaderLogo>
              </div>
              <nav aria-label="Main navigation menu">
                <HeaderList className={`${prefix}--bmrg-header-list--link`}>
                  {Array.isArray(navLinks) &&
                    navLinks.map((link, i) => (
                      <li key={`${link.url}-${i}`}>
                        <HeaderListItem aria-label={`link for ${link.name}`} href={link.url}>
                          {link.name}
                        </HeaderListItem>
                      </li>
                    ))}
                </HeaderList>
              </nav>
              <div ref={this.mobileNavRef}>
                <HeaderList className={`${prefix}--bmrg-header-list--mobile-nav`}>
                  <li>
                    <HeaderListItem
                      isIcon
                      aria-label="Mobile navigation menu"
                      aria-expanded={this.state.isMobileNavActive}
                      id={stateToButtonElemIdMap[transformToIsStateKey("MobileNavActive")]}
                      onClick={this.handleIconClick("MobileNav")}
                      onKeyDown={this.handleIconKeypress("MobileNav")}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: this.state.isMobileNavActive ? "#343a3f" : "inherit",
                          fontSize: "0.875rem",
                        }}
                      >
                        Navigation{" "}
                        {this.state.isMobileNavActive ? (
                          <ChevronUp alt="Close mobile navigation" />
                        ) : (
                          <ChevronDown alt="Open mobile navigation" />
                        )}
                      </span>
                    </HeaderListItem>
                    {this.state.isMobileNavActive && (
                      <HeaderMenu>
                        {Array.isArray(navLinks) &&
                          navLinks.map((link, i) => (
                            <HeaderMenuLink
                              external={false}
                              href={link.url}
                              text={link.name}
                              key={`${link.url}-${i}`}
                            />
                          ))}
                      </HeaderMenu>
                    )}
                  </li>
                </HeaderList>
              </div>
            </HeaderWrapper>
            <HeaderWrapper>
              <div ref={this.navRef}>
                <HeaderList className={`${prefix}--bmrg-header-list--icon`}>
                  {Boolean(this.props.requestSummary) && (
                    <li>
                      <HeaderListItem
                        isIcon
                        aria-expanded={this.state.isRequestsActive}
                        aria-label="Requests menu button"
                        id={stateToButtonElemIdMap[transformToIsStateKey("Requests")]}
                        onClick={this.handleIconClick("Requests")}
                        onKeyDown={this.handleIconKeypress("Requests")}
                      >
                        <Collaborate alt="Requests icon" />
                      </HeaderListItem>
                      {this.state.isRequestsActive && (
                        <HeaderMenu>
                          <UserRequests
                            baseLaunchEnvUrl={baseLaunchEnvUrl}
                            requestSummary={this.props.requestSummary}
                          />
                        </HeaderMenu>
                      )}
                    </li>
                  )}
                  {this.props.enableNotifications && this.props.notificationsConfig && (
                    <li>
                      <HeaderListItem
                        isIcon
                        aria-expanded={this.state.isNotificationActive}
                        aria-label="Notification menu button"
                        id={stateToButtonElemIdMap[transformToIsStateKey("Notification")]}
                        onClick={this.handleIconClick("Notification")}
                        onKeyDown={this.handleIconKeypress("Notification")}
                      >
                        {this.state.hasNewNotifications ? (
                          <NotificationNew alt="New notifications icon" />
                        ) : (
                          <Notification alt="No new notifications icon" />
                        )}
                        <PlatformNotificationsContainer
                          baseLaunchEnvUrl={baseLaunchEnvUrl}
                          config={this.props.notificationsConfig}
                          isNotificationActive={this.state.isNotificationActive}
                          setHasNewNotifications={this.handleUpdateStateKey("hasNewNotifications")}
                        />
                      </HeaderListItem>
                    </li>
                  )}
                  {Array.isArray(this.props.onHelpClick) && this.props.onHelpClick.length > 0 && (
                    <li>
                      <HeaderListItem
                        isIcon
                        aria-expanded={this.state.isHelpActive}
                        aria-label="Help menu button"
                        id={stateToButtonElemIdMap[transformToIsStateKey("Help")]}
                        onClick={this.handleIconClick("Help")}
                        onKeyDown={this.handleIconKeypress("Help")}
                      >
                        <Help size={24} alt="Help icon" />
                      </HeaderListItem>
                      {this.state.isHelpActive && <HeaderMenu>{this.props.onHelpClick}</HeaderMenu>}
                    </li>
                  )}
                  <li>
                    {Array.isArray(this.props.profileChildren) && this.props.profileChildren.length > 0 && (
                      <HeaderListItem
                        isIcon
                        aria-expanded={this.state.isProfileActive}
                        aria-label="Profile menu button"
                        id={stateToButtonElemIdMap[transformToIsStateKey("Profile")]}
                        onClick={this.handleIconClick("Profile")}
                        onKeyDown={this.handleIconKeypress("Profile")}
                      >
                        <UserAvatar alt="Profile icon" />
                      </HeaderListItem>
                    )}
                    {this.state.isProfileActive && <HeaderMenu>{this.props.profileChildren}</HeaderMenu>}
                  </li>
                  {this.props.enableAppSwitcher && (
                    <li>
                      <HeaderListItem
                        isIcon
                        aria-expanded={this.state.isAppSwitcherActive}
                        aria-label="App Switcher menu button"
                        id={stateToButtonElemIdMap[transformToIsStateKey("AppSwitcher")]}
                        onClick={this.handleIconClick("AppSwitcher")}
                        onKeyDown={this.handleIconKeypress("AppSwitcher")}
                      >
                        {this.state?.isAppSwitcherActive ? (
                          <Close alt="Close App Switcher" />
                        ) : (
                          <Switcher alt="Open App Switcher" />
                        )}
                      </HeaderListItem>
                      <HeaderAppSwitcher
                        baseLaunchEnvUrl={baseLaunchEnvUrl}
                        baseServiceUrl={baseServiceUrl}
                        isActive={this.state.isAppSwitcherActive}
                      />
                    </li>
                  )}
                  {renderRightPanel && Object.keys(renderRightPanel).length ? (
                    <li>
                      <HeaderListItem
                        isIcon
                        aria-expanded={this.state.isRightPanelActive}
                        aria-label={`Right panel button`}
                        id={stateToButtonElemIdMap[transformToIsStateKey("RightPanel")]}
                        onClick={this.handleIconClick("RightPanel")}
                        onKeyDown={this.handleIconKeypress("RightPanel")}
                      >
                        {renderRightPanel.icon}
                      </HeaderListItem>
                      <HeaderRightPanel isOpen={this.state.isRightPanelActive}>
                        {renderRightPanel.component}
                      </HeaderRightPanel>
                    </li>
                  ) : (
                    ""
                  )}
                </HeaderList>
              </div>
            </HeaderWrapper>
            {this.props.renderSidenav && (
              <div
                className={cx(`${prefix}--bmrg-header__app-menu-wrapper`, {
                  "--is-hidden": !this.state.isSidenavActive,
                })}
                ref={this.sideNavRef}
              >
                {this.props.renderSidenav({
                  isOpen: this.state.isSidenavActive,
                  onMenuClose: this.onMenuClose,
                })}
              </div>
            )}
          </div>
          <NotificationsContainer enableMultiContainer containerId={`${prefix}--bmrg-header-notifications`} />
        </header>
      </Theme>
    );
  }
}

export default Header;
