import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header'; // Using default export
import HeaderMenuButton from '../HeaderMenuButton';
import HeaderMenuLink from '../HeaderMenuLink';
import HeaderMenuUser from '../HeaderMenuUser';
import AboutPlatform from '../AboutPlatform';
import ContactUs from '../ContactUs';
import PrivacyStatement from '../PrivacyStatement';
import ReportBug from '../ReportBug';
import SignOut from '../SignOut';
import GdprRedirectModal from '../GdprRedirectModal';

UIShell.propTypes = {
  /**
   * used in header, after the logo or platformName
   */
  appName: PropTypes.string,
  /**
   * Base service url used to build up several requests
   * used by the header. paths to service endpoints are hardcoded
   */
  baseServiceUrl: PropTypes.string,
  /**
   * base launch url, used to redirect to Launchpad if need to consent per GDPR
   */
  baseLaunchEnvUrl: PropTypes.string,

  /**
   * alias for "platformName" for legacy support
   */
  companyName: PropTypes.string,

  /**
   * Pass in whole header config object used for
   * - Feature flagging
   * - Platform links
   * - Metadata about the platform
   * - Message banner to display for all users
   */
  headerConfig: PropTypes.shape({
    features: PropTypes.object,
    navigation: PropTypes.array,
    platform: PropTypes.object,
    platformMessage: PropTypes.object,
  }),
  /**
   * Used to render the hamburger menu icon and the component passed
   * in by the user
   */
  onMenuClick: PropTypes.func,

  /**
   * Used to trigger tutorial or any arbitrary function passed
   * in on click of "Tutorial" header menu item
   */
  onTutorialClick: PropTypes.func,
  /**
   * used in header, only rendered if renderLogo is false
   */
  platformName: PropTypes.string,
  /**
   * alias for "appName" for legacy support
   */
  productName: PropTypes.string,
  /**
   * override for the consumer. When set as true, the launchpad redirect modal will be
   */
  renderLogo: PropTypes.bool,
  requirePlatformConsent: PropTypes.bool,
  /**
   * Pass in whole user object
   */
  user: PropTypes.shape({
    email: PropTypes.string,
    hasConsented: PropTypes.bool,
    name: PropTypes.string,
  }),

  /**
   * Icon that is added by each team for their custom behaviour
   */
  renderRightPanel: PropTypes.shape({
    icon: PropTypes.element,
    component: PropTypes.element,
  }),
  /**
   * alias for "onMenuClick" that is more descriptive
   * defaults to "onMenuClick" if both props are passed
   */
  renderSidenav: PropTypes.func,

  /**
   * Used to navigate to the main content of the app
   */
  skipToContentProps: PropTypes.shape({
    href: PropTypes.string,
    children: PropTypes.string,
    className: PropTypes.string,
  }),
};

UIShell.defaultProps = {
  baseLaunchEnvUrl: '',
  baseWWWEnvUrl: '',
  headerConfig: {},
  requirePlatformConsent: true,
  user: {},
  renderRightPanel: {},
};

function UIShell({
  appName,
  baseLaunchEnvUrl,
  baseServiceUrl,
  companyName,
  headerConfig,
  onMenuClick,
  onTutorialClick,
  platformName,
  productName,
  renderLogo,
  requirePlatformConsent,
  renderRightPanel,
  renderSidenav,
  skipToContentProps,
  user,
}) {
  const { features, navigation, platform, platformMessage } = headerConfig;

  const finalPlatformName = platformName || companyName;
  const finalAppName = appName || productName;
  const isSupportEnabled = Boolean(features) && Boolean(features['support.enabled']);

  return (
    <>
      <Header
        appName={finalAppName}
        baseLaunchEnvUrl={baseLaunchEnvUrl}
        enableNotifications={features && features['notifications.enabled']}
        platformMessage={platformMessage}
        platformName={!renderLogo && finalPlatformName ? finalPlatformName : null}
        renderLogo={renderLogo}
        navLinks={navigation}
        notificationsConfig={{
          wsUrl: `${baseServiceUrl}/notifications/ws`,
        }}
        onHelpClick={[
          typeof onTutorialClick === 'function' && (
            <HeaderMenuButton
              text="Tutorial"
              iconName="workspace"
              onClick={onTutorialClick}
              key="Tutorial"
            />
          ),
          baseServiceUrl && isSupportEnabled && (
            <ContactUs baseServiceUrl={baseServiceUrl} key="Contact Us" />
          ),
          baseServiceUrl && isSupportEnabled && (
            <ReportBug baseServiceUrl={baseServiceUrl} key="Report Bug" />
          ),
          baseServiceUrl && isSupportEnabled && (
            <HeaderMenuLink
              external={false}
              href={`${baseLaunchEnvUrl}/launchpad/support`}
              iconName="support"
              text="Support Center"
            />
          ),
          platform && platform.communityUrl && (
            <HeaderMenuLink href={platform.communityUrl} iconName="forum" text="Community" />
          ),
        ].filter(Boolean)}
        profileChildren={[
          user?.id && (
            <HeaderMenuUser
              key="Avatar"
              src={`${baseServiceUrl}/users/image/${user.email}`}
              userName={user.name}
            />
          ),
          platform && (
            <AboutPlatform
              key="About Platform"
              organization={platform.name}
              version={platform.version}
            />
          ),
          baseServiceUrl && (
            <PrivacyStatement key="Privacy Statement" baseServiceUrl={baseServiceUrl} />
          ),
          platform && platform.signOutUrl && (
            <SignOut signOutLink={platform.signOutUrl} key="Sign Out" />
          ),
        ].filter(Boolean)}
        renderRightPanel={renderRightPanel}
        skipToContentProps={skipToContentProps}
        renderSidenav={onMenuClick || renderSidenav}
      />
      {requirePlatformConsent && user.hasOwnProperty('hasConsented') && !user.hasConsented ? (
        <GdprRedirectModal isOpen baseLaunchEnvUrl={baseLaunchEnvUrl} user={user} />
      ) : null}
    </>
  );
}

export default UIShell;
