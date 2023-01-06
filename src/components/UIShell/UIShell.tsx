import React from "react";
import { QueryClientProvider } from "react-query";
import Header from "../Header"; // Using default export
import HeaderMenuButton from "../HeaderMenuButton";
import HeaderMenuLink from "../HeaderMenuLink";
import ProfileSettings from "../ProfileSettings";
import AboutPlatform from "../AboutPlatform";
import Feedback from "../Feedback";
import PrivacyStatement from "../PrivacyStatement";
import SignOut from "../SignOut";
import GdprRedirectModal from "../GdprRedirectModal";
import { queryClient } from "../../config/servicesConfig";
import { User } from "../../types";

UIShell.defaultProps = {
  renderRightPanel: {},
};

type OwnProps = {
  appName?: string;
  baseServiceUrl?: string;
  baseLaunchEnvUrl?: string;
  companyName?: string;
  headerConfig?: {
    features?: {
      "appSwitcher.enabled"?: boolean;
      "consent.enabled"?: boolean;
      "docs.enabled"?: boolean;
      "eventing.enabled"?: boolean;
      "feedback.enabled"?: boolean;
      "homePage.enabled"?: boolean;
      "partner.enabled"?: boolean;
      "metering.enabled"?: boolean;
      "notifications.enabled"?: boolean;
      "support.enabled"?: boolean;
      "welcome.enabled"?: boolean;
    };
    navigation?: {
      name?: string;
      url?: string;
    }[];
    platform?: {
      baseEnvUrl?: string;
      baseServicesUrl?: string;
      communityUrl?: string;
      displayLogo?: boolean;
      feedbackUrl?: string;
      name?: string;
      platformEmail?: string;
      platformName?: string;
      platformOrganization?: string;
      privateTeams?: boolean;
      sendIdeasUrl?: string;
      sendMail?: boolean;
      signOutUrl?: string;
      version?: string;
    };
    platformMessage?: any;
  };
  isFlowApp?: boolean;
  onMenuClick?: (...args: any[]) => any;
  onTutorialClick?: (...args: any[]) => any;
  ownedRequests?: any[];
  platformName?: string;
  productName?: string;
  renderFlowDocs?: boolean;
  renderLogo?: boolean;
  renderGdprRedirect?: boolean;
  renderPrivacyStatement?: boolean;
  renderRequests?: boolean;
  user?: User;
  userRequests?: any[];
  renderRightPanel?: {
    icon?: React.ReactElement;
    component?: React.ReactElement;
  };
  renderSidenav?: (...args: any[]) => any;
  skipToContentProps?: {
    href?: string;
    children?: string;
    className?: string;
  };
};

type Props = OwnProps & typeof UIShell.defaultProps;

function UIShell({
  appName,
  baseLaunchEnvUrl,
  baseServiceUrl,
  companyName,
  headerConfig = {},
  isFlowApp = false,
  onMenuClick,
  onTutorialClick,
  platformName,
  productName,
  renderLogo,
  renderGdprRedirect = true,
  renderFlowDocs,
  renderPrivacyStatement = true,
  renderRightPanel = {},
  renderSidenav,
  skipToContentProps,
  user,
}: Props) {
  const finalPlatformName = platformName || companyName;
  const finalAppName = appName || productName;

  const { features, navigation, platform, platformMessage } = headerConfig;
  /**
   * Prevent breaking changes. Use the values from the platform object if present.
   * Default to the legacy props to support backwards compatibility
   */
  const finalBaseUrl = platform?.baseEnvUrl || baseLaunchEnvUrl;
  const finalBaseServiceUrl = platform?.baseServicesUrl || baseServiceUrl || "";
  const finalSendIdeasUrl = platform?.feedbackUrl || "https://ideas.ibm.com";
  const isAppSwitcherEnabled = Boolean(features?.["appSwitcher.enabled"]);
  const isFeedbackEnabled = Boolean(features?.["feedback.enabled"]);
  const isNotificationsEnabled = Boolean(features?.["notifications.enabled"]);
  const isLogoEnabled = platform?.displayLogo || renderLogo;
  const isSupportEnabled = Boolean(features?.["support.enabled"]);

  /**
   * Checking for conditions when we explicitly set "renderGdprRedirect" to false (it defaults to true) OR
   * it's disabled overall for the platform. This lets us toggle the UIShell consent redirect per app as needed
   * e.g. disabled in Launchpad, but have it enabled for rest of the platform AND also support
   * having it disabled in a "standalone" mode via the consent.enaable feature flag. aka its data driven via the service
   */
  const isGdprRedirectDisabled = renderGdprRedirect === false || features?.["consent.enabled"] === false;

  /**
   * Also enable/disable privacy statement via the consent.enabled feature flag
   */
  const isPrivacyStatementDisabled = renderPrivacyStatement === false || features?.["consent.enabled"] === false;

  return (
    <QueryClientProvider client={queryClient}>
      <Header
        appName={finalAppName}
        baseLaunchEnvUrl={finalBaseUrl}
        baseServiceUrl={finalBaseServiceUrl}
        enableAppSwitcher={isAppSwitcherEnabled}
        enableNotifications={isNotificationsEnabled}
        navLinks={navigation}
        platformMessage={platformMessage}
        platformName={!isLogoEnabled && finalPlatformName ? finalPlatformName : undefined}
        renderLogo={isLogoEnabled}
        renderRightPanel={renderRightPanel}
        renderSidenav={onMenuClick || renderSidenav}
        skipToContentProps={skipToContentProps}
        requestSummary={user?.requestSummary}
        notificationsConfig={{
          wsUrl: `${finalBaseServiceUrl}/notifications/ws`.replace("https://", "wss://"),
        }}
        onHelpClick={[
          typeof onTutorialClick === "function" && (
            <HeaderMenuButton iconName="workspace" key="Tutorial" onClick={onTutorialClick} text="Tutorial" />
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
            <HeaderMenuLink href={platform?.communityUrl as string} iconName="forum" text="Community" />
          ),
          renderFlowDocs && (
            <HeaderMenuLink
              external={true}
              href={`https://useboomerang.io/docs/boomerang-flow/introduction/overview/`}
              iconName="information"
              text="Flow Documentation"
            />
          ),
          isFeedbackEnabled && (
            <Feedback
              key="Feedback"
              platformName={platform?.platformName}
              platformOrganization={platform?.platformOrganization}
              sendIdeasUrl={finalSendIdeasUrl}
            />
          ),
        ].filter(Boolean)}
        profileChildren={[
          Boolean(user?.id) && (
            <ProfileSettings
              baseServiceUrl={finalBaseServiceUrl}
              key="Avatar"
              src={`${finalBaseServiceUrl}/users/image/${user?.email}`}
              userName={user?.name}
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
              platformEmail={platform?.platformEmail}
            />
          ),
          !!platform?.signOutUrl && <SignOut key="Sign Out" signOutLink={platform.signOutUrl} />,
        ].filter(Boolean)}
      />
      {isGdprRedirectDisabled === false && user?.hasConsented === false ? (
        <GdprRedirectModal isOpen baseLaunchEnvUrl={finalBaseUrl as string} user={user} platformName={platform?.name} />
      ) : null}
    </QueryClientProvider>
  );
}

export default UIShell;
