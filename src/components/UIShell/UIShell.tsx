import React from "react";
import { QueryClientProvider } from "react-query";
import { Forum, HelpDesk, Email } from "@carbon/react/icons";
import Header from "../Header"; // Using default export
import HeaderMenuItem from "../Header/HeaderMenuItem";
import { ProfileSettingsMenuItem } from "../ProfileSettings";
import { AboutPlatformMenuItem } from "../AboutPlatform";
import { FeedbackMenuItem } from "../Feedback";
import { PrivacyStatementMenuItem } from "../PrivacyStatement";
import PrivacyRedirectModal from "../PrivacyRedirect";
import { queryClient } from "../../config/servicesConfig";
import { User } from "../../types";
import { SignOutMenuItem } from "../SignOut";

type Props = {
  productName?: string;
  platformName?: string;
  config?: {
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
      name: string;
      url: string;
    }[];
    platform: {
      baseEnvUrl: string;
      baseServicesUrl: string;
      communityUrl?: string;
      feedbackUrl?: string;
      name?: string; // Used in About Plaform modal
      platformEmail?: string;
      platformName: string; // Used in UIShell
      platformOrganization?: string;
      privateTeams?: boolean;
      sendIdeasUrl?: string;
      sendMail?: boolean;
      signOutUrl?: string;
      version?: string;
    };
    platformMessage?: any;
  };
  renderPrivacyRedirect?: boolean;
  renderPrivacyStatement?: boolean;
  rightPanel?: { icon?: React.ReactNode; component: React.ReactNode };
  leftPanel?: (args: { close: () => void; isOpen: boolean; navLinks?: React.ReactNode[] }) => React.ReactNode;
  skipToContentProps?: {
    href?: string;
    children?: string;
    className?: string;
  };
  user?: User;
  supportMenuItems?: React.ReactNode[];
  profileMenuItems?: React.ReactNode[];
};

function UIShell({
  config,
  leftPanel,
  platformName,
  productName,
  profileMenuItems = [],
  supportMenuItems = [],
  renderPrivacyRedirect = true,
  renderPrivacyStatement = true,
  rightPanel,
  skipToContentProps,
  user,
}: Props) {
  // Support base header
  if (!config) {
    return (
      <Header
        baseEnvUrl=""
        baseServiceUrl=""
        enableAppSwitcher={false}
        enableNotifications={false}
        productName={productName || platformName || ""}
      />
    );
  }

  const { features, navigation, platform, platformMessage } = config;
  const names = getProductAndPlatformNames({ productName, platformName, platform });
  const sendIdeasUrl = platform?.feedbackUrl || "https://ideas.ibm.com";

  /**
   * Check feature enablement via explicit feature flags
   */
  const isAppSwitcherEnabled = Boolean(features?.["appSwitcher.enabled"]);
  const isFeedbackEnabled = Boolean(features?.["feedback.enabled"]);
  const isNotificationsEnabled = Boolean(features?.["notifications.enabled"]);
  const isSupportEnabled = Boolean(features?.["support.enabled"]);

  /**
   * Check feature enablement via values being present
   */
  const isAboutPlatformEnabled = Boolean(platform.name && platform.version);
  const isCommunityEnabled = Boolean(platform?.communityUrl);
  const isSendMailEnabled = Boolean(platform.sendMail);
  const isSignOutEnabled = Boolean(platform?.signOutUrl);
  const isUserEnabled = Boolean(user?.id);

  /**
   * Checking for conditions when we explicitly set "renderPrivacyRedirect" to false (it defaults to true) OR
   * it's disabled overall for the platform. This lets us toggle the UIShell consent redirect per app as needed
   * e.g. disabled in Launchpad, but have it enabled for rest of the platform AND also support
   * having it disabled in a "standalone" mode via the consent.enable feature flag, i.e. data driven via the service
   */
  const isPrivacyRedirectDisabled = renderPrivacyRedirect === false || features?.["consent.enabled"] === false;
  const isPrivacyModalRendered = isPrivacyRedirectDisabled === false && user?.hasConsented === false;

  /**
   * Also enable/disable privacy statement via the consent.enabled feature flag
   */
  const isPrivacyStatementDisabled = renderPrivacyStatement === false || features?.["consent.enabled"] === false;

  return (
    <QueryClientProvider client={queryClient}>
      <Header
        baseEnvUrl={platform.baseEnvUrl}
        baseServiceUrl={platform.baseServicesUrl}
        enableAppSwitcher={isAppSwitcherEnabled}
        enableNotifications={isNotificationsEnabled}
        leftPanel={leftPanel}
        navLinks={navigation}
        platformMessage={platformMessage}
        prefixName={names.platformName}
        productName={names.productName}
        rightPanel={rightPanel}
        requestSummary={user?.requestSummary}
        skipToContentProps={skipToContentProps}
        notificationsConfig={{
          wsUrl: `${platform.baseServicesUrl}/notifications/ws`.replace("https://", "wss://"),
        }}
        profileMenuItems={[
          isUserEnabled && (
            <ProfileSettingsMenuItem
              key="profile-settings"
              baseServiceUrl={platform.baseServicesUrl}
              src={`${platform.baseServicesUrl}/users/image/${user?.email}`}
              userName={user?.name}
            />
          ),
          isAboutPlatformEnabled && (
            <AboutPlatformMenuItem key="about-platform" name={platform.name} version={platform.version} />
          ),
          isSendMailEnabled && (
            <HeaderMenuItem
              key="email-preferences"
              href={`${platform.baseEnvUrl}/launchpad/email-preferences`}
              type="link"
              icon={<Email />}
              text="Email Preferences"
              kind={"internal"}
            />
          ),
          !isPrivacyStatementDisabled && (
            <PrivacyStatementMenuItem
              key="privacy-statement"
              baseServiceUrl={platform.baseServicesUrl}
              platformEmail={platform?.platformEmail}
            />
          ),
          ...profileMenuItems,
          isSignOutEnabled && <SignOutMenuItem key="Sign Out" signOutLink={platform.signOutUrl as string} />,
        ].filter(Boolean)}
        supportMenuItems={[
          isSupportEnabled && (
            <HeaderMenuItem
              key="support-center"
              href={`${platform.baseEnvUrl}/support/center`}
              icon={<HelpDesk />}
              type="link"
              text="Support Center"
              kind="internal"
            />
          ),
          isCommunityEnabled && (
            <HeaderMenuItem
              key="community"
              href={platform?.communityUrl as string}
              icon={<Forum />}
              type="link"
              text="Community"
              kind="external"
            />
          ),
          isFeedbackEnabled && (
            <FeedbackMenuItem
              key="feedback"
              platformName={platform?.platformName}
              platformOrganization={platform?.platformOrganization}
              sendIdeasUrl={sendIdeasUrl}
            />
          ),
          ...supportMenuItems,
        ].filter(Boolean)}
      />
      {isPrivacyModalRendered ? (
        <PrivacyRedirectModal
          isOpen
          baseEnvUrl={platform.baseEnvUrl as string}
          platformName={platform?.name}
          user={user}
        />
      ) : null}
    </QueryClientProvider>
  );
}

/**
 * Determine how to render the name and prefix in the Header based
 *  on what is passed in. If we only have the plaform or product name, then
 * we want it to be bolded. If we have both, then make the platform the prefix
 */
function getProductAndPlatformNames(args: {
  productName?: string;
  platformName?: string;
  platform: { platformName: string };
}) {
  const { productName, platformName, platform } = args;

  const resolvedPlatformName = platform.platformName ?? platformName;
  let finalProductName = "";
  let finalPlatformName = "";

  if (productName && resolvedPlatformName) {
    finalProductName = productName;
    finalPlatformName = resolvedPlatformName;
  } else if (productName && !resolvedPlatformName) {
    finalProductName = productName;
  } else if (!productName && resolvedPlatformName) {
    finalProductName = resolvedPlatformName;
  } else {
    // no-op in else branch if they don't pass anything in
  }

  return { productName: finalProductName, platformName: finalPlatformName };
}

export default UIShell;
