import React from "react";
import { QueryClientProvider } from "react-query";
import { Forum, HelpDesk, Information } from "@carbon/react/icons";
import Header from "../Header"; // Using default export
import HeaderMenuItem from "../HeaderMenuItem";
import { ProfileSettingsMenuItem } from "../ProfileSettings";
import { AboutPlatformMenuItem } from "../AboutPlatform";
import Feedback from "../Feedback";
import PrivacyStatement from "../PrivacyStatement";
import GdprRedirectModal from "../GdprRedirectModal";
import { queryClient } from "../../config/servicesConfig";
import { User } from "../../types";
import { SignOutMenuItem } from "../SignOut";

type NavLink = {
  name: string;
  url: string;
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
    navigation?: NavLink[];
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
  onMenuClick?: (args: {
    isOpen: boolean;
    close: () => void;
    onMenuClose: Function;
    navLinks?: React.ReactNode[];
  }) => React.ReactNode;
  onTutorialClick?: (...args: any[]) => any;
  ownedRequests?: any[];
  platformName?: string;
  productName?: string;
  renderFlowDocs?: boolean;
  renderGdprRedirect?: boolean;
  renderPrivacyStatement?: boolean;
  renderRequests?: boolean;
  renderRightPanel?: { icon: React.ReactNode; component: React.ReactNode };
  renderSidenav?: (args: {
    isOpen: boolean;
    close: () => void;
    onMenuClose: Function;
    navLinks?: React.ReactNode[];
  }) => React.ReactNode;
  skipToContentProps?: {
    href?: string;
    children?: string;
    className?: string;
  };
  user?: User;
  userRequests?: any[];
};

type Props = OwnProps;

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
  renderGdprRedirect = false,
  renderFlowDocs,
  renderPrivacyStatement = false,
  renderRightPanel,
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
        platformName={finalPlatformName ? finalPlatformName : undefined}
        renderRightPanel={renderRightPanel}
        renderSidenav={onMenuClick || renderSidenav}
        skipToContentProps={skipToContentProps}
        requestSummary={user?.requestSummary}
        notificationsConfig={{
          wsUrl: `${finalBaseServiceUrl}/notifications/ws`.replace("https://", "wss://"),
        }}
        supportChildren={[
          typeof onTutorialClick === "function" && (
            <HeaderMenuItem kind="button" onClick={onTutorialClick} text="Tutorial" icon={<Information />} />
          ),
          Boolean(finalBaseServiceUrl) && isSupportEnabled && (
            <HeaderMenuItem
              kind="link"
              external={false}
              href={`${finalBaseUrl}/support/center`}
              icon={<HelpDesk />}
              text="Support Center"
            />
          ),
          Boolean(platform?.communityUrl) && (
            <HeaderMenuItem
              external={true}
              kind="link"
              href={platform?.communityUrl as string}
              icon={<Forum />}
              text="Community"
            />
          ),
          renderFlowDocs && (
            <HeaderMenuItem
              kind="link"
              external={true}
              href={`https://useboomerang.io/docs/boomerang-flow/introduction/overview/`}
              icon={<Information />}
              text="Flow Documentation"
            />
          ),
          // isFeedbackEnabled && (
          //   <Feedback
          //     key="Feedback"
          //     platformName={platform?.platformName}
          //     platformOrganization={platform?.platformOrganization}
          //     sendIdeasUrl={finalSendIdeasUrl}
          //   />
          // ),
        ].filter(Boolean)}
        profileChildren={[
          Boolean(user?.id) && (
            <ProfileSettingsMenuItem
              baseServiceUrl={finalBaseServiceUrl}
              key="Avatar"
              src={`${finalBaseServiceUrl}/users/image/${user?.email}`}
              userName={user?.name}
            />
          ),
          platform && (
            <AboutPlatformMenuItem
              key="About Platform"
              organization={platform.name}
              version={platform.version}
              isFlowApp={isFlowApp}
            />
          ),
          // platform?.sendMail && (
          //   <HeaderMenuItem external={false} href={`${finalBaseUrl}/launchpad/email-preferences`}>
          //     Email Preferences
          //   </HeaderMenuItem>
          // ),
          // baseServiceUrl && isPrivacyStatementDisabled === false && (
          //   <PrivacyStatement
          //     key="Privacy Statement"
          //     baseServiceUrl={finalBaseServiceUrl}
          //     platformEmail={platform?.platformEmail}
          //   />
          // ),
          !!platform?.signOutUrl && <SignOutMenuItem key="Sign Out" signOutLink={platform.signOutUrl} />,
        ].filter(Boolean)}
      />
      {isGdprRedirectDisabled === false && user?.hasConsented === false ? (
        <GdprRedirectModal isOpen baseLaunchEnvUrl={finalBaseUrl as string} user={user} platformName={platform?.name} />
      ) : null}
    </QueryClientProvider>
  );
}

export default UIShell;
