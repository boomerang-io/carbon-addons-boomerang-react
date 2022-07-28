import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header'; // Using default export
import HeaderMenuButton from '../HeaderMenuButton';
import HeaderMenuLink from '../HeaderMenuLink';
import ProfileSettings from '../ProfileSettings';
import AboutPlatform from '../AboutPlatform';
import Feedback from '../Feedback';
import PrivacyStatement from '../PrivacyStatement';
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
      'feedback.enabled': PropTypes.bool,
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
      feedbackUrl: PropTypes.string,
      name: PropTypes.string,
      platformName: PropTypes.string,
      platformOrganization: PropTypes.string,
      privateTeams: PropTypes.bool,
      sendIdeasUrl: PropTypes.string,
      sendMail: PropTypes.bool,
      signOutUrl: PropTypes.string,
      version: PropTypes.string,
    }),
    platformMessage: PropTypes.object,
  }),
  /**
   * Determine which icons should be renders on about platform
   */
  isFlowApp: PropTypes.bool,
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
   * Array of requests that require user's action
   */
  ownedRequests: PropTypes.array,
  /**
   * used in header, only rendered if renderLogo is false
   */
  platformName: PropTypes.string,
  /**
   * alias for "appName" for legacy support
   */
  productName: PropTypes.string,
  /**
   * enable/disable flow documentation link
   */
  renderFlowDocs: PropTypes.bool,
  /**
   * override for the consumer. When set as true, the launchpad redirect modal will be
   */
  renderLogo: PropTypes.bool,
  /**
   * enable/disable Gdpr redirect modal
   */
  renderGdprRedirect: PropTypes.bool,
  /**
   * enable/disable Privacy Statement
   */
  renderPrivacyStatement: PropTypes.bool,
  /**
   * enable/disable Requests
   */
  renderRequests: PropTypes.bool,
  /**
   * Pass in whole user object
   */
  user: PropTypes.shape({
    email: PropTypes.string,
    hasConsented: PropTypes.bool,
    name: PropTypes.string,
  }),
  /**
   * Array of requests made by the user
   */
  userRequests: PropTypes.array,

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
  isFlowApp: false,
  renderGdprRedirect: true,
  renderPrivacyStatement: true,
  user: {},
  renderRightPanel: {},
};

function UIShell({
  appName,
  baseLaunchEnvUrl,
  baseServiceUrl,
  companyName,
  headerConfig,
  isFlowApp,
  onMenuClick,
  onTutorialClick,
  platformName,
  productName,
  renderLogo,
  renderGdprRedirect,
  renderFlowDocs,
  renderPrivacyStatement,
  renderRightPanel,
  renderSidenav,
  skipToContentProps,
  user,
}) {
  const finalPlatformName = platformName || companyName;
  const finalAppName = appName || productName;

  const { features, navigation, platform, platformMessage } = headerConfig;
  /**
   * Prevent breaking changes. Use the values from the platform object if present.
   * Default to the legacy props to support backwards compatibility
   */
  const finalBaseUrl = platform?.baseEnvUrl || baseLaunchEnvUrl;
  const finalBaseServiceUrl = platform?.baseServicesUrl || baseServiceUrl;
  const finalSendIdeasUrl = platform?.feedbackUrl || 'https://ideas.ibm.com';
  const isLogoEnabled = platform?.displayLogo || renderLogo;
  const isSupportEnabled = Boolean(features?.['support.enabled']);
  const isFeedbackEnabled = Boolean(features?.['feedback.enabled']);

  /**
   * Checking for conditions when we explicitly set "renderGdprRedirect" to false (it defaults to true) OR
   * it's disabled overall for the platform. This lets us toggle the UIShell consent redirect per app as needed
   * e.g. disabled in Launchpad, but have it enabled for rest of the platform AND also support
   * having it disabled in a "standalone" mode via the consent.enaable feature flag. aka its data driven via the service
   */
  const isGdprRedirectDisabled =
    renderGdprRedirect === false || features?.['consent.enabled'] === false;

  /**
   * Also enable/disable privacy statement via the consent.enabled feature flag
   */
  const isPrivacyStatementDisabled =
    renderPrivacyStatement === false || features?.['consent.enabled'] === false;

  return (
    <>
      <Header
        appName={finalAppName}
        baseLaunchEnvUrl={finalBaseUrl}
        enableNotifications={Boolean(features?.['notifications.enabled'])}
        navLinks={navigation}
        platformMessage={platformMessage}
        platformName={!isLogoEnabled && finalPlatformName ? finalPlatformName : null}
        renderLogo={isLogoEnabled}
        renderRightPanel={renderRightPanel}
        renderSidenav={onMenuClick || renderSidenav}
        skipToContentProps={skipToContentProps}
        requestSummary={user.requestSummary}
        notificationsConfig={{
          wsUrl: `${finalBaseServiceUrl}/notifications/ws`.replace("https://", "wss://"),
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
            <HeaderMenuLink
              external={false}
              href={`${finalBaseUrl}/support/center`}
              iconName="support"
              text="Support Center"
            />
          ),
          Boolean(platform?.communityUrl) && (
            <HeaderMenuLink href={platform.communityUrl} iconName="forum" text="Community" />
          ),
          renderFlowDocs && (
            <HeaderMenuLink
              external
              target="_blank"
              rel="noopener noreferrer"
              href={`https://useboomerang.io/docs/boomerang-flow/introduction/overview/`}
              iconName="information"
              text="Flow Documentation"
            />
          ),
          isFeedbackEnabled && (
            <Feedback
              key="Feedback"
              platformName={platform.platformName}
              platformOrganization={platform.platformOrganization}
              sendIdeasUrl={finalSendIdeasUrl}
            />
          ),
        ].filter(Boolean)}
        profileChildren={[
          Boolean(user?.id) && (
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
              isFlowApp={isFlowApp}
            />
          ),
          platform?.sendMail && (
            <HeaderMenuLink
              external={false}
              href={`${finalBaseUrl}/launchpad/email-preferences`}
              iconName="email"
              text="Email Preferences"
            />
          ),
          baseServiceUrl && isPrivacyStatementDisabled === false && (
            <PrivacyStatement
              key="Privacy Statement"
              baseServiceUrl={finalBaseServiceUrl}
              organization={platform?.name}
              platformEmail={platform?.platformEmail}
            />
          ),
          Boolean(platform?.signOutUrl) && (
            <SignOut key="Sign Out" signOutLink={platform.signOutUrl} />
          ),
        ].filter(Boolean)}
      />
      {isGdprRedirectDisabled === false && user.hasConsented === false ? (
        <GdprRedirectModal isOpen baseLaunchEnvUrl={finalBaseUrl} user={user} />
      ) : null}
    </>
  );
}

export default UIShell;
