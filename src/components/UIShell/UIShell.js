import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header'; // Using default export
import HeaderMenuButton from '../HeaderMenuButton';
import HeaderMenuLink from '../HeaderMenuLink';
import ProfileSettings from '../ProfileSettings';
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
    features: PropTypes.shape({
      'consent.enabled': PropTypes.bool,
      'docs.enabled': PropTypes.bool,
      'metering.enabled': PropTypes.bool,
      'notifications.enabled': PropTypes.bool,
      'support.enabled': PropTypes.bool,
      'welcome.enabled': PropTypes.bool,
    }),
    navigation: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    platform: PropTypes.shape({
      baseEnvUrl: PropTypes.string,
      baseServicesUrl: PropTypes.string,
      communityUrl: PropTypes.string,
      displayLogo: PropTypes.bool,
      name: PropTypes.string,
      platformName: PropTypes.string,
      privateTeams: PropTypes.bool,
      sendMail: PropTypes.bool,
      signOutUrl: PropTypes.string,
      version: PropTypes.string,
    }),
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

  /**
   * Prevent breaking changes. Use the values in the platform response if present
   * and default to the legacy props
   */
  const finalBaseUrl = platform?.baseEnvUrl || baseLaunchEnvUrl;
  const finalBaseServiceUrl = platform?.baseServicesUrl || baseServiceUrl;
  const isLogoEnabled = platform?.displayLogo === false || renderLogo;
  const isSupportEnabled = Boolean(features?.['support.enabled']);

  /**
   * Checking for conditions when we explicitely set requirePlatformConsent to false OR
   * its disabled overall for the platform. This lets us have it disabled in a "standalone" mode overall where its
   * disabled for all applications AND toggle it use of the UIShell e.g. disabled in Launchpad, but have it enabled
   * by default for other apps
   */
  const isConsentDisabled =
    requirePlatformConsent === false || Boolean(features?.['consent.enabled'] === false);

  return (
    <>
      <Header
        appName={finalAppName}
        baseLaunchEnvUrl={finalBaseUrl}
        enableNotifications={Boolean(features?.['notifications.enabled'])}
        platformMessage={platformMessage}
        platformName={!renderLogo && finalPlatformName ? finalPlatformName : null}
        renderLogo={isLogoEnabled}
        navLinks={navigation}
        notificationsConfig={{
          wsUrl: `${finalBaseServiceUrl}/notifications/ws`,
        }}
        onHelpClick={[
          typeof onTutorialClick === 'function' && (
            <HeaderMenuButton
              iconName="workspace"
              key="Tutorial"
              onClick={onTutorialClick}
              text="Tutorial"
            />
          ),
          Boolean(finalBaseServiceUrl) && isSupportEnabled && (
            <ContactUs baseServiceUrl={finalBaseServiceUrl} key="Contact Us" />
          ),
          Boolean(finalBaseServiceUrl) && isSupportEnabled && (
            <ReportBug baseServiceUrl={finalBaseServiceUrl} key="Report Bug" />
          ),
          Boolean(finalBaseServiceUrl) && isSupportEnabled && (
            <HeaderMenuLink
              external={false}
              href={`${finalBaseUrl}/launchpad/support`}
              iconName="support"
              text="Support Center"
            />
          ),
          Boolean(platform?.communityUrl) && (
            <HeaderMenuLink href={platform.communityUrl} iconName="forum" text="Community" />
          ),
        ].filter(Boolean)}
        profileChildren={[
          user?.id && (
            <ProfileSettings
              baseServiceUrl={finalBaseServiceUrl}
              key="Avatar"
              src={`${finalBaseServiceUrl}/users/image/${user.email}`}
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
          baseServiceUrl && isConsentDisabled === false && (
            <PrivacyStatement key="Privacy Statement" baseServiceUrl={finalBaseServiceUrl} />
          ),
          Boolean(platform?.signOutUrl) && (
            <SignOut key="Sign Out" signOutLink={platform.signOutUrl} />
          ),
        ].filter(Boolean)}
        renderRightPanel={renderRightPanel}
        renderSidenav={onMenuClick || renderSidenav}
        skipToContentProps={skipToContentProps}
      />
      {isConsentDisabled === false && user.hasConsented === false ? (
        <GdprRedirectModal isOpen baseLaunchEnvUrl={finalBaseUrl} user={user} />
      ) : null}
    </>
  );
}

export default UIShell;
