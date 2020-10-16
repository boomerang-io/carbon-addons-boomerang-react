import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  AppSwitcher20,
  ChevronDown16,
  ChevronUp16,
  Help24,
  User24,
  Notification24,
  NotificationNew24,
} from '@carbon/icons-react';
import { settings } from 'carbon-components';
import { SkipToContent } from 'carbon-components-react/lib/components/UIShell';

import PlatformBanner from '../PlatformBanner';
import PlatformNotificationsContainer from '../PlatformNotifications';
import HeaderMenu from '../HeaderMenu';
import NotificationsContainer from '../Notifications/NotificationsContainer';

import HeaderList from './HeaderList';
import HeaderListItem from './HeaderListItem';
import HeaderMenuLink from '../HeaderMenuLink';
import HeaderLogo from './HeaderLogo';
import HeaderMenuBmrg from './HeaderMenuBmrg';
import HeaderWrapper from './HeaderWrapper';
import HeaderRightPanel from './HeaderRightPanel';
import BoomerangLogo from './assets/BoomerangLogo';

const { prefix } = settings;

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

    renderGlobalSwitcher: PropTypes.bool,
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
     * base launch url, used to redirect to Launchpad
     */
    baseLaunchEnvUrl: PropTypes.string,

    /**
     * Anchor to skip to content
     */
    skipToContentProps: PropTypes.object,
  };

  static defaultProps = {};

  state = {
    isMobileNavActive: false,
    isHelpActive: false,
    isMenuActive: false,
    isNotificationActive: false,
    isProfileActive: false,
    isGlobalActive: false,
    isRightPanelActive: false,
    hasNewNotifications: false,
  };

  navRef = React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.navRef && !this.navRef.current.contains(event.target)) {
      this.handleClickOutsideState();
    }
  };

  handleClickOutsideState = () => {
    this.setState({
      isMobileNavActive: false,
      isHelpActive: false,
      isMenuActive: false,
      isNotificationActive: false,
      isProfileActive: false,
      isGlobalActive: false,
      isRightPanelActive: false,
    });
  };

  /**
   * 13 - corresponds to return/enter key
   * 32 - corresponds to space key
   * @param {string} type - Passes in the type of click (i.e. profile, notification, global)
   * @returns {Function} - if the appropriate type of click, calls handleIconClick with specified params
   */
  handleIconKeypress = (type) => (evt) => {
    if (evt.which === 13 || evt.which === 32) {
      this.handleIconClick(type)(evt);
    }
  };

  /**
   * @param {string} type - Passes in the type of click (i.e. profile, notification, global)
   * @returns {Function} - finds the appropriate click type to trigger function, sets all other state items that have
   * 'is' prefix to false (in order to only have one active item at a time)
   */
  handleIconClick = (type) => (evt) => {
    Object.keys(this.state)
      .filter((key) => key.startsWith('is'))
      .forEach((key) => {
        const clickType = `is${type}Active`;
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
      isMenuActive: false,
    });
  };

  render() {
    const {
      className,
      platformName,
      navLinks,
      platformMessage,
      appName,
      renderGlobalSwitcher,
      renderLogo,
      renderRightPanel,
      skipToContentProps,
      baseLaunchEnvUrl,
    } = this.props;

    return (
      <header ref={this.navRef} className={`${prefix}--bmrg-header-container`}>
        <div className={cx(`${prefix}--bmrg-header`, className)}>
          <HeaderWrapper>
            <div className={`${prefix}--bmrg-header-brand-container`}>
              {skipToContentProps ? <SkipToContent {...skipToContentProps} /> : null}
              {this.props.renderSidenav && (
                <HeaderMenuBmrg
                  isOpen={this.state.isMenuActive}
                  onClick={this.handleIconClick('Menu')}
                  onKeyDown={this.handleIconKeypress('Menu')}
                />
              )}
              <HeaderLogo
                className={cx({
                  [`${prefix}--bmrg-header-brand--no-menu`]: !this.props.renderSidenav,
                })}
                appName={appName}
                platformName={platformName}
                navLinks={navLinks}
              >
                {renderLogo && (
                  <BoomerangLogo
                    alt="Boomerang Logo"
                    className={`${prefix}--bmrg-header-brand__icon`}
                  />
                )}
              </HeaderLogo>
            </div>
            <nav aria-label="main">
              <HeaderList className={`${prefix}--bmrg-header-list--link`}>
                {Array.isArray(navLinks) &&
                  navLinks.map((link, i) => (
                    <li key={`${link.url}-${i}`}>
                      <HeaderListItem href={link.url}>{link.name}</HeaderListItem>
                    </li>
                  ))}
              </HeaderList>
            </nav>
            <HeaderList className={`${prefix}--bmrg-header-list--mobile-nav`}>
              <li>
                <HeaderListItem
                  isIcon
                  id="navigation-mobile-menu"
                  ariaExpanded={this.state.isMobileNavActive}
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
                    Navigation {this.state.isMobileNavActive ? <ChevronUp16 /> : <ChevronDown16 />}
                  </span>
                </HeaderListItem>

                {this.state.isMobileNavActive && (
                  <HeaderMenu>
                    {Array.isArray(navLinks) &&
                      navLinks.map((link, i) => (
                        <li key={`${link.url}-${i}`}>
                          <HeaderMenuLink external={false} href={link.url} text={link.name} />
                        </li>
                      ))}
                  </HeaderMenu>
                )}
              </li>
            </HeaderList>
          </HeaderWrapper>
          <HeaderWrapper>
            <HeaderList className={`${prefix}--bmrg-header-list--icon\\`}>
              {this.props.enableNotifications && this.props.notificationsConfig && (
                <li>
                  <HeaderListItem
                    isIcon
                    ariaExpanded={this.state.isNotificationActive}
                    id="notification-icon"
                    onClick={this.handleIconClick('Notification')}
                    onKeyDown={this.handleIconKeypress('Notification')}
                  >
                    {this.state.hasNewNotifications ? <NotificationNew24 /> : <Notification24 />}
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
                    ariaExpanded={this.state.isHelpActive}
                    isIcon
                    id="bmrg-header-help-icon"
                    onClick={this.handleIconClick('Help')}
                    onKeyDown={this.handleIconKeypress('Help')}
                  >
                    <Help24 />
                  </HeaderListItem>
                  {this.state.isHelpActive && <HeaderMenu>{this.props.onHelpClick}</HeaderMenu>}
                </li>
              )}
              <li>
                {Array.isArray(this.props.profileChildren) &&
                  this.props.profileChildren.length > 0 && (
                    <HeaderListItem
                      ariaExpanded={this.state.isProfileActive}
                      isIcon
                      id="bmrg-header-profile-icon"
                      onClick={this.handleIconClick('Profile')}
                      onKeyDown={this.handleIconKeypress('Profile')}
                    >
                      <User24 />
                    </HeaderListItem>
                  )}
                {this.state.isProfileActive && (
                  <HeaderMenu>{this.props.profileChildren}</HeaderMenu>
                )}
              </li>
              {renderGlobalSwitcher && (
                <HeaderListItem
                  ariaExpanded={this.state.isGlobalActive}
                  isIcon
                  id="bmrg-header-global-switcher"
                  className={`${prefix}--bmrg-header-list__item-Globalicon`}
                  onClick={this.handleIconClick('Global')}
                  onKeyDown={this.handleIconKeypress('Global')}
                >
                  <AppSwitcher20 />
                </HeaderListItem>
              )}
              {renderRightPanel && Object.keys(renderRightPanel).length ? (
                <li>
                  <HeaderListItem
                    ariaExpanded={this.state.isRightPanelActive}
                    isIcon
                    id="bmrg-header-right-panel-icon"
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
          </HeaderWrapper>
          {this.props.renderSidenav && (
            <div
              className={cx(`${prefix}--bmrg-header__app-menu-wrapper`, {
                '--is-hidden': !this.state.isMenuActive,
              })}
            >
              {this.props.renderSidenav({
                isOpen: this.state.isMenuActive,
                onMenuClose: this.onMenuClose,
              })}
            </div>
          )}
        </div>
        {platformMessage && (
          <PlatformBanner
            kind={platformMessage.kind}
            message={platformMessage.message}
            title={platformMessage.title}
          />
        )}
        <NotificationsContainer
          enableMultiContainer
          containerId={`${prefix}--bmrg-header-notifications`}
        />
      </header>
    );
  }
}

export default Header;
