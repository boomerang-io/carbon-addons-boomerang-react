/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

import React from "react";
import { QueryClientProvider } from "react-query";
import {
  Book,
  Forum,
  HelpDesk,
  Email,
  ChatLaunch,
  Cognitive,
  Document,
  Policy,
  CatalogPublish,
} from "@carbon/react/icons";
import Header from "../Header"; // Using default export
import HeaderMenuItem from "../Header/HeaderMenuItem";
import PrivacyRedirectModal from "../PrivacyRedirect";
import { AboutPlatformMenuItem } from "../AboutPlatform";
import { FeedbackMenuItem } from "../Feedback";
import { SupportCenterMenuItem } from "../SupportCenter";
import { PrivacyStatementMenuItem } from "../PrivacyStatement";
import { ProfileSettingsMenuItem } from "../ProfileSettings";
import { queryClient } from "../../config/servicesConfig";
import { SignOutMenuItem } from "../SignOut";
import type { NavLink, User } from "../../types";
import { USER_PLATFORM_ROLE } from "../../constants/UserType";

type Props = {
  analyticsHelpers?: any;
  carbonTheme?: "white" | "g10" | "g90" | "g100";
  createJoinTeamTrigger?: Function;
  baseEnvUrl?: string;
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
      "notificationsCount.enabled"?: boolean;
      "support.enabled"?: boolean;
      "welcome.enabled"?: boolean;
    };
    navigation?: NavLink[];
    platform: {
      baseEnvUrl: string;
      baseServicesUrl: string;
      communityUrl?: string;
      releaseNotesUrl?: string;
      legalTermsUrl?: string;
      feedbackUrl?: string;
      name?: string; // Used in About Plaform modal
      platformEmail?: string;
      platformName: string; // Used in UIShell
      platformVersion: string;
      platformVersionError: boolean;
      platformOrganization?: string;
      docs?: { url: string };
      privateTeams?: boolean;
      sendIdeasUrl?: string;
      sendBluePointsAwardUrl?:string;
      sendMail?: boolean;
      askICAEnabled?: boolean;
      signOutUrl?: string;
      version?: string;
      instanceSwitcherEnabled?: boolean;
      instances?: any[];
      assistantVersion?: string;
      agentsVersion?: string;
      scribeFlowVersion?: string;
      askICAUrl?: string;
      supportUrl?: string;
    };
    platformMessage?: any;
  };
  history?: any;
  isLaunchpad?: boolean;
  isLoadingTeamSwitcher?: boolean;
  isSuccessTeamSwitcher?: boolean;
  setIsSuccessTeamSwitcher?: Function;
  leftPanel?: (args: { close: () => void; isOpen: boolean; navLinks?: NavLink[] }) => React.ReactNode;
  platformName?: string;
  productName?: string;
  profileMenuItems?: React.ReactNode[];
  renderPrivacyRedirect?: boolean;
  renderPrivacyStatement?: boolean;
  rightPanel?: { icon?: React.ReactNode; component: React.ReactNode };
  skipToContentProps?: {
    href?: string;
    children?: string;
    className?: string;
  };
  supportMenuItems?: React.ReactNode[];
  templateMeteringEvent?: (props: any) => void;
  trackEvent?: Function;
  triggerEvent?: (props: any) => any;
  user?: User;
  userTeams?: { data: any; isLoading: boolean; error: any };
  enableIcaMacs?: boolean;
  handleShowTutorial?: Function;
  tutorialScreenToShow?: string;
};

function UIShell({
  analyticsHelpers,
  baseEnvUrl,
  carbonTheme = "g10",
  config,
  createJoinTeamTrigger,
  history,
  isLaunchpad = false,
  isLoadingTeamSwitcher,
  isSuccessTeamSwitcher,
  setIsSuccessTeamSwitcher,
  leftPanel,
  platformName,
  productName,
  profileMenuItems = [],
  supportMenuItems = [],
  renderPrivacyRedirect = true,
  renderPrivacyStatement = true,
  rightPanel,
  handleShowTutorial,
  skipToContentProps,
  templateMeteringEvent,
  trackEvent,
  triggerEvent,
  tutorialScreenToShow,
  user,
  userTeams,
  enableIcaMacs,
}: Props) {
  // Support base header .e.g for an error state
  if (!config) {
    return (
      <QueryClientProvider client={queryClient}>
        <Header
          baseEnvUrl={baseEnvUrl ?? ""}
          baseServicesUrl=""
          carbonTheme={carbonTheme}
          enableAppSwitcher={false}
          enableNotifications={false}
          enableNotificationsCount={false}
          productName={productName || platformName || ""}
          user={user}
        />
      </QueryClientProvider>
    );
  }
  const { features, navigation, platform, platformMessage } = config;
  const names = getProductAndPlatformNames({ productName, platformName, platform });
  const sendIdeasUrl = platform?.feedbackUrl || "https://ideas.ibm.com";
  const supportLink = platform?.supportUrl;
  const sendBluePointsAwardUrl = platform?.sendBluePointsAwardUrl;
  const partnerEmailId = "ica-support@ibm.com";
  /**
   * Check feature enablement via explicit feature flags
   */
  const isAppSwitcherEnabled = Boolean(features?.["appSwitcher.enabled"]);
  const instanceSwitcherEnabled = Boolean(platform?.["instanceSwitcherEnabled"]);
  const isFeedbackEnabled = Boolean(features?.["feedback.enabled"]);
  const isNotificationsEnabled = Boolean(features?.["notifications.enabled"]);
  const isNotificationsCountEnabled = Boolean(features?.["notificationsCount.enabled"]);
  const isSupportEnabled = Boolean(features?.["support.enabled"]);
  /**
   * Check feature enablement via value truthiness
   */
  const isAboutPlatformEnabled = Boolean(platform.name);
  const isCommunityEnabled = Boolean(platform?.communityUrl);
  const isSendMailEnabled = Boolean(platform.sendMail);
  const isSignOutEnabled = Boolean(platform?.signOutUrl);
  const isUserEnabled = Boolean(user?.id);
  const isPartnerUser = Boolean(user?.type === USER_PLATFORM_ROLE.Partner);
  const supportFlagCheck = user?.showSupport;
  const askICAEnabled = Boolean(platform?.askICAEnabled);

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
        analyticsHelpers={analyticsHelpers}
        baseEnvUrl={platform.baseEnvUrl}
        baseServicesUrl={platform.baseServicesUrl}
        carbonTheme={carbonTheme}
        createJoinTeamTrigger={createJoinTeamTrigger}
        enableAppSwitcher={isAppSwitcherEnabled}
        instanceSwitcherEnabled={instanceSwitcherEnabled}
        enableNotifications={isNotificationsEnabled}
        enableNotificationsCount={isNotificationsCountEnabled}
        leftPanel={leftPanel}
        navLinks={navigation}
        platform={platform}
        platformMessage={platformMessage}
        prefixName={names.platformName}
        productName={names.productName}
        rightPanel={rightPanel}
        requestSummary={user?.requestSummary}
        skipToContentProps={skipToContentProps}
        templateMeteringEvent={templateMeteringEvent}
        triggerEvent={triggerEvent}
        profileMenuItems={[
          isUserEnabled && (
            <ProfileSettingsMenuItem
              key="profile-settings"
              baseServicesUrl={platform.baseServicesUrl}
              src={`${platform.baseServicesUrl}/users/image/${user?.email}`}
              userName={user?.displayName ?? user?.name}
            />
          ),
          isSendMailEnabled && (
            <HeaderMenuItem
              key="email-preferences"
              href={`${platform.baseEnvUrl}/launchpad/email-preferences`}
              icon={<Email />}
              kind="internal"
              text="Email Preferences"
              type="link"
            />
          ),
          !isPrivacyStatementDisabled && (
            <PrivacyStatementMenuItem
              key="privacy-statement"
              baseServicesUrl={platform.baseServicesUrl}
              platformEmail={platform?.platformEmail}
            />
          ),
          ...profileMenuItems,
          isSignOutEnabled && <SignOutMenuItem key="Sign Out" signOutLink={platform.signOutUrl as string} />,
        ].filter(Boolean)}
        supportMenuItems={[
          !isPartnerUser && (
            <HeaderMenuItem
              key="docs"
              href={platform?.docs?.url as string}
              icon={<Document />}
              data-testid="docs"
              kind="app"
              text="Docs"
              type="link"
            />
          ),
          isSupportEnabled &&
            (supportFlagCheck || isPartnerUser ? (
              <SupportCenterMenuItem
                key="support-center"
                platformName={platform?.platformName}
                platformOrganization={platform?.platformOrganization}
                supportLink={supportLink}
                partnerEmailId={partnerEmailId}
                enablePartner={isPartnerUser}
                baseServicesUrl={platform.baseServicesUrl}
              />
            ) : (
              <HeaderMenuItem
                key="support-center"
                href={platform?.supportUrl as string}
                icon={<HelpDesk />}
                kind="external"
                text="Support Center"
                type="link"
              />
            )),
          <HeaderMenuItem
            key="release-notes"
            href={platform?.releaseNotesUrl as string}
            icon={<CatalogPublish />}
            data-testid="release-notes"
            kind="app"
            text="Release Notes"
            type="link"
          />,
          <HeaderMenuItem
            key="legal-terms"
            href={platform?.legalTermsUrl as string}
            icon={<Policy />}
            data-testid="legal-terms"
            kind="app"
            text="Legal Terms"
            type="link"
          />,
          <span style={{ borderBottom: "1px solid #b8c1c1" }}></span>,
          isCommunityEnabled && (
            <HeaderMenuItem
              key="community"
              href={platform?.communityUrl as string}
              icon={<Forum />}
              kind="external"
              text="Community"
              type="link"
            />
          ),
          isFeedbackEnabled && (
            <FeedbackMenuItem
              key="feedback"
              platformName={platform?.platformName}
              platformOrganization={platform?.platformOrganization}
              sendIdeasUrl={sendIdeasUrl}
              sendBluePointsAwardUrl={sendBluePointsAwardUrl}
            />
          ),
          !isPartnerUser && askICAEnabled ? (
            <HeaderMenuItem
              key="chat-launch"
              href={platform?.askICAUrl as string}
              icon={<ChatLaunch />}
              data-testid="askICA-chatlaunch"
              kind="external"
              text="AskICA"
              type="link"
            />
          ) : null,
          !isPartnerUser && enableIcaMacs && (
            <HeaderMenuItem
              key="launch-ideation-agent"
              href={`${platform.baseEnvUrl}/launchpad/macs`}
              icon={<Cognitive />}
              data-testid="launch-ideation-agent"
              kind="app"
              text="AI Proposal Feedback Tool"
              type="link"
            />
          ),
          isAboutPlatformEnabled && (
            <AboutPlatformMenuItem
              key="about-platform"
              name={platform.name as string}
              baseServicesUrl={platform.baseServicesUrl}
            />
          ),
          tutorialScreenToShow && handleShowTutorial && (
            <HeaderMenuItem
              key="launch-tutorial"
              onClick={handleShowTutorial as () => void}
              icon={<Book />}
              data-testid="launch-tutorial"
              text="Launch Tutorial"
              type="button"
            />
          ),
          ...supportMenuItems,
        ].filter(Boolean)}
        history={history}
        isLaunchpad={isLaunchpad}
        isLoadingTeamSwitcher={isLoadingTeamSwitcher}
        isSuccessTeamSwitcher={isSuccessTeamSwitcher}
        setIsSuccessTeamSwitcher={setIsSuccessTeamSwitcher}
        trackEvent={trackEvent}
        user={user}
        userTeams={userTeams}
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
