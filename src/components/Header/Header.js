import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  ChevronDown16,
  ChevronUp16,
  Collaborate24,
  Help24,
  UserAvatar24,
  Notification24,
  NotificationNew24,
} from '@carbon/icons-react';
import { settings } from 'carbon-components';
import FocusTrap from 'focus-trap-react';
import { SkipToContent } from 'carbon-components-react';
import window from 'window-or-global';
import PlatformNotificationsContainer from '../PlatformNotifications';
import HeaderMenu from '../HeaderMenu';
import NotificationsContainer from '../Notifications/NotificationsContainer';
import UserRequests from '../UserRequests';
import HeaderList from './HeaderList';
import HeaderListItem from './HeaderListItem';
import HeaderMenuLink from '../HeaderMenuLink';
import HeaderLogo from './HeaderLogo';
import HeaderMenuBmrg from './HeaderMenuBmrg';
import HeaderWrapper from './HeaderWrapper';
import HeaderRightPanel from './HeaderRightPanel';
import BoomerangLogo from './assets/BoomerangLogo';

const { prefix } = settings;

const stateToButtonElemIdMap = {
  isHelpActive: 'navigation-help-menu-button',
  isMobileNavActive: 'navigation-mobile-menu-button',
  isNotificationActive: 'navigation-notification-menu-button',
  isProfileActive: 'navigation-profile-menu-button',
  isRequestsActive: 'navigation-requests-menu-button',
  isRightPanelActive: 'navigation-right-panel-button',
  isSidenavActive: 'navigation-sidenav-menu-button',
};

function transformToIsStateKey(key) {
  return `is${key}Active`;
}

class Header extends React.Component {
  static propTypes = {
    appName: PropTypes.string,

    enableNotifications: PropTypes.bool,
    /*
     * an array of objects. Each object has a name and url property.
     * The name will be displayed on the header with navigation to the url
     */
    navLinks: PropTypes.array,
    /**
     * Pass in config for making requests for Notifications
     * @property {String} wsUrl - full URL to websocket endpoint for receiving new notifications
     */
    notificationsConfig: PropTypes.shape({
      wsUrl: PropTypes.string.isRequired,
    }),
    /**
     * Function passed in by the consumer, what to render when the help icon is clicked
     */
    onHelpClick: PropTypes.array,
    platformName: PropTypes.string,

    /**
     * Components to be rendered as Children by the Profile
     */
    platformMessage: PropTypes.object,
    profileChildren: PropTypes.array,
    renderLogo: PropTypes.bool,

    /**
     * Icon to be created with custom content
     */
    renderRightPanel: PropTypes.object,
    /**
     * Function passed in by the consumer, what to render when hamburger menu is clicked
     */
    renderSidenav: PropTypes.func,
    /**
     * base url, used to redirect to the platform
     */
    baseLaunchEnvUrl: PropTypes.string,
    /**
     * Summary of requests pending and made by user
     */
    requestSummary: PropTypes.object,
    /**
     * Anchor to skip to content
     */
    skipToContentProps: PropTypes.object,
  };

  static defaultProps = {};

  state = {
    hasNewNotifications: false,
    isHelpActive: false,
    isMobileNavActive: false,
    isNotificationActive: false,
    isProfileActive: false,
    isRequestsActive: false,
    isRightPanelActive: false,
    isSidenavActive: false,
  };

  navRef = React.createRef();
  mobileNavRef = React.createRef();
  sideNavRef = React.createRef();
  sideNavButtonRef = React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickoutsideEvent);
    document.addEventListener('keydown', this.handleKeyEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickoutsideEvent);
    document.removeEventListener('keydown', this.handleKeyEvent);
  }

  /**
   * Handle clicking outside a open menu and closing the appropriate one
   * @param {object} event - mousedown event
   */
  handleClickoutsideEvent = (event) => {
    if (this.navRef && !this.navRef.current?.contains(event.target)) {
      this.handleCloseHeaderMenus();
    }

    if (this.mobileNavRef && !this.mobileNavRef.current?.contains(event.target)) {
      this.handleCloseMobileNav();
    }

    if (
      this.sideNavRef &&
      !this.sideNavRef.current?.contains(event.target) &&
      !this.sideNavButtonRef.current?.contains(event.target)
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
  handleKeyEvent = (event) => {
    if (event.key === 'Escape') {
      this.handleCloseViaEsc();
      return;
    }

    if (event.key === 'Tab') {
      // Only have to test for the right panel here bc other menus have a focus trap
      if (this.state.isRightPanelActive && !this.navRef.current?.contains(event.target)) {
        this.handleCloseHeaderMenus();
        return;
      }
    }
  };

  handleCloseHeaderMenus = () => {
    this.setState({
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
    const activeMenuStateKey = Object.keys(this.state).find(
      (key) => key.startsWith('is') && this.state[key]
    );

    if (activeMenuStateKey) {
      this.setState({
        [activeMenuStateKey]: false,
      });

      const elemToReceiveFocus = document.getElementById(
        stateToButtonElemIdMap[activeMenuStateKey]
      );
      if (elemToReceiveFocus) {
        elemToReceiveFocus.focus();
      }
    }
  };

  /**
   * 13 - corresponds to return/enter key
   * 32 - corresponds to space key
   * @param {string} type - Passes in the type of click (i.e. profile, notification)
   * @returns {Function} - if the appropriate type of click, calls handleIconClick with specified params
   */
  handleIconKeypress = (type) => (evt) => {
    if (evt.which === 13 || evt.which === 32) {
      this.handleIconClick(type)(evt);
    }
  };

  /**
   * @param {string} type - Passes in the type of click (i.e. profile, notification)
   * @returns {Function} - finds the appropriate click type to trigger function, sets all other state items that have
   * 'is' prefix to false (in order to only have one active item at a time)
   */
  handleIconClick = (type) => (evt) => {
    Object.keys(this.state)
      .filter((key) => key.startsWith('is'))
      .forEach((key) => {
        const clickType = transformToIsStateKey(type);
        if (key === clickType) {
          this.setState({
            [clickType]: !this.state[clickType],
          });

          // Add callback if parent wants event emitted
          // Match prop name for handling on element click
          const propFunc = this.props[`on${type}Click`];
          if (typeof propFunc === 'function') {
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
   * @returns {Function} - pass in value for key
   */
  handleUpdateStateKey = (key) => (value) => {
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
      className,
      navLinks,
      platformName,
      renderLogo,
      renderRightPanel,
      skipToContentProps,
    } = this.props;

    return (
      <header className={`${prefix}--bmrg-header-container`}>
        <div className={cx(`${prefix}--bmrg-header`, className)}>
          <HeaderWrapper>
            <div className={`${prefix}--bmrg-header-brand-container`}>
              {skipToContentProps ? <SkipToContent {...skipToContentProps} /> : null}
              {this.props.renderSidenav && (
                <HeaderMenuBmrg
                  id={stateToButtonElemIdMap['isSidenavActive']}
                  isOpen={this.state.isSidenavActive}
                  onClick={this.handleIconClick('Sidenav')}
                  onKeyDown={this.handleIconKeypress('Sidenav')}
                  ref={this.sideNavButtonRef}
                />
              )}
              <HeaderLogo
                appName={appName}
                href={baseLaunchEnvUrl}
                navLinks={navLinks}
                platformName={platformName}
              >
                {renderLogo && (
                  <BoomerangLogo
                    alt="Boomerang Logo"
                    className={`${prefix}--bmrg-header-brand__icon`}
                  />
                )}
              </HeaderLogo>
            </div>
            <nav aria-label="Main navigation menu">
              <HeaderList className={`${prefix}--bmrg-header-list--link`}>
                {Array.isArray(navLinks) &&
                  navLinks.map((link, i) => {
                    const isCurrentNavLink = window.location?.href?.startsWith(link.url);
                    return (
                      <li key={`${link.url}-${i}`}>
                        <HeaderListItem aria-label={`link for ${link.name}`} href={link.url} isCurrentNavLink={isCurrentNavLink}>
                          {link.name}
                        </HeaderListItem>
                      </li>
                    )
                  })}
              </HeaderList>
            </nav>
            <div ref={this.mobileNavRef}>
              <HeaderList className={`${prefix}--bmrg-header-list--mobile-nav`}>
                <li>
                  <HeaderListItem
                    isIcon
                    aria-label="Mobile navigation menu"
                    aria-expanded={this.state.isMobileNavActive}
                    id={stateToButtonElemIdMap[transformToIsStateKey('MobileNavActive')]}
                    onClick={this.handleIconClick('MobileNav')}
                    onKeyDown={this.handleIconKeypress('MobileNav')}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: this.state.isMobileNavActive ? '#343a3f' : 'inherit',
                        fontSize: '0.875rem',
                      }}
                    >
                      Navigation{' '}
                      {this.state.isMobileNavActive ? (
                        <ChevronUp16 alt="Close mobile navigation" />
                      ) : (
                        <ChevronDown16 alt="Open mobile navigation" />
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
                      id={stateToButtonElemIdMap[transformToIsStateKey('Requests')]}
                      onClick={this.handleIconClick('Requests')}
                      onKeyDown={this.handleIconKeypress('Requests')}
                    >
                      <Collaborate24 alt="Requests icon" />
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
                      id={stateToButtonElemIdMap[transformToIsStateKey('Notification')]}
                      onClick={this.handleIconClick('Notification')}
                      onKeyDown={this.handleIconKeypress('Notification')}
                    >
                      {this.state.hasNewNotifications ? (
                        <NotificationNew24 alt="New notifications icon" />
                      ) : (
                        <Notification24 alt="No new notifications icon" />
                      )}
                      <PlatformNotificationsContainer
                        baseLaunchEnvUrl={baseLaunchEnvUrl}
                        config={this.props.notificationsConfig}
                        isNotificationActive={this.state.isNotificationActive}
                        setHasNewNotifications={this.handleUpdateStateKey('hasNewNotifications')}
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
                      id={stateToButtonElemIdMap[transformToIsStateKey('Help')]}
                      onClick={this.handleIconClick('Help')}
                      onKeyDown={this.handleIconKeypress('Help')}
                    >
                      <Help24 alt="Help icon" />
                    </HeaderListItem>
                    {this.state.isHelpActive && <HeaderMenu>{this.props.onHelpClick}</HeaderMenu>}
                  </li>
                )}
                <li>
                  {Array.isArray(this.props.profileChildren) &&
                    this.props.profileChildren.length > 0 && (
                      <HeaderListItem
                        isIcon
                        aria-expanded={this.state.isProfileActive}
                        aria-label="Profile menu button"
                        id={stateToButtonElemIdMap[transformToIsStateKey('Profile')]}
                        onClick={this.handleIconClick('Profile')}
                        onKeyDown={this.handleIconKeypress('Profile')}
                      >
                        <UserAvatar24 alt="Profile icon" />
                      </HeaderListItem>
                    )}
                  {this.state.isProfileActive && (
                    <HeaderMenu>{this.props.profileChildren}</HeaderMenu>
                  )}
                </li>
                {renderRightPanel && Object.keys(renderRightPanel).length ? (
                  <li>
                    <HeaderListItem
                      isIcon
                      aria-expanded={this.state.isRightPanelActive}
                      aria-label={`Right panel button`}
                      id={stateToButtonElemIdMap[transformToIsStateKey('RightPanel')]}
                      onClick={this.handleIconClick('RightPanel')}
                      onKeyDown={this.handleIconKeypress('RightPanel')}
                    >
                      {renderRightPanel.icon}
                    </HeaderListItem>
                    <HeaderRightPanel
                      content={renderRightPanel.component}
                      className={cx({
                        '--is-hidden': !this.state.isRightPanelActive,
                      })}
                    />
                  </li>
                ) : (
                  ''
                )}
              </HeaderList>
            </div>
          </HeaderWrapper>
          {this.props.renderSidenav && (
            <div
              className={cx(`${prefix}--bmrg-header__app-menu-wrapper`, {
                '--is-hidden': !this.state.isSidenavActive,
              })}
              ref={this.sideNavRef}
            >
              <FocusTrap
                active={this.state.isSidenavActive}
                focusTrapOptions={{ allowOutsideClick: true }}
              >
                {this.props.renderSidenav({
                  isOpen: this.state.isSidenavActive,
                  onMenuClose: this.onMenuClose,
                })}
              </FocusTrap>
            </div>
          )}
        </div>
        <NotificationsContainer
          enableMultiContainer
          containerId={`${prefix}--bmrg-header-notifications`}
        />
      </header>
    );
  }
}

export default Header;
