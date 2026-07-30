/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

import React from "react";
import cx from "classnames";
import { SideNav, SideNavDivider, SideNavItems, SideNavLink, Tag } from "@carbon/react";
import TooltipHover from "../TooltipHover";
import {
  AddAlt,
  Api,
  Catalog,
  ChatBot,
  DocumentMultiple_02,
  LicenseThirdParty,
  Folders,
  Home,
  IntentRequestCreate,
  Network_3,
  Settings,
  Store,
  UserMultiple,
} from "@carbon/react/icons";
import { USER_PLATFORM_ROLE } from "../../constants/UserType";
import { prefix } from "../../internal/settings";
import { NavLink, SideNavTeam, SideNavAccount, User } from "types";

const SideNavUrlKeys = {
  Home: "home",
  TeamPage: "teamPage",
  Chat: "chat",
  Tools: "tools",
  AgentStudio: "agentStudio",
  ContextStudio: "contextStudio",
  AgentLibrary: "agentLibrary",
  DocumentCollections: "documentCollections",
  Catalog: "catalog",
  Marketplace: "marketplace",
  Settings: "settings",
  Admin: "admin",
};

type Props = {
  accounts?: Array<SideNavAccount> | null;
  app?: string;
  appLink: any;
  agentStudioPath?: string;
  agenticAppsPath?: string;
  assistantLibraryPath?:string;
  regionalTeam?: any;
  baseEnvUrl?: string;
  className?: string;
  defaultAssistantLink?: string;
  enableChatButton?: boolean;
  showChatButton?: boolean;
  showSelectTeamPurpose?: boolean;
  joinCreateTrigger?: (props: any) => void;
  isLoading?: boolean;
  isOpen?: boolean;
  navLinks?: NavLink[];
  personalTeamEnabled?: boolean;
  personalTeams?: Array<SideNavTeam> | null;
  showChatTooltip?: boolean;
  sideNavUrls?: {
    key: string;
    name: string;
    url: string;
    icon: string;
    tag?: string;
  }[];
  teams?: Array<SideNavTeam> | null;
  templateMeteringEvent?: (props: any) => void;
  tooltipMessage?: string;
  triggerEvent?: (props: any) => void;
  user: User;
  isLaunchpad?: boolean;
  isbetaLaunchpad?: boolean;
  userTeamsError?: boolean;
  userTeamsLoading?: boolean;
  history?: any;
  enableSpaNavigation?: boolean;
  onNavigate?: (path: string, url: string) => void;
  resolveSpaPath?: (url: string) => string;
  children?: React.ReactNode;
};

export function AdvantageSideNav(props: Props) {
  const {
    app,
    appLink,
    agenticAppsPath = "",
    assistantLibraryPath = "",
    agentStudioPath = "",
    regionalTeam,
    enableChatButton = true,
    showChatButton = true,
    showSelectTeamPurpose = false,
    defaultAssistantLink,
    joinCreateTrigger,
    isLoading,
    isOpen,
    teams = [],
    triggerEvent,
    accounts = [],
    baseEnvUrl,
    className,
    navLinks,
    personalTeams = [],
    user,
    showChatTooltip,
    templateMeteringEvent,
    tooltipMessage,
    isLaunchpad = false,
    isbetaLaunchpad = false,
    sideNavUrls,
    history,
    enableSpaNavigation = false,
    onNavigate,
    resolveSpaPath,
    children,
    personalTeamEnabled,
    ...rest
  } = props;
  const [activeMenu, setActiveMenu] = React.useState(false);
  const isMenuOpen = isOpen || activeMenu;
  const windowLocation = window.location;
  const isPartnerUser = user?.type === USER_PLATFORM_ROLE.Partner;
  const joinButtontitle = showSelectTeamPurpose ? "Create Team" : "Create or Join Team";
  const hamburguerMenu = document.getElementById("header-sidenav-menu-button");

  const homeSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Home);
  const teamPageSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.TeamPage);
  const chatSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Chat);
  const chatLink = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Chat)?.url;
  const toolsSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Tools);
  const agentAssistantStudioSideNavUrl = sideNavUrls?.find(
    (sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.AgentStudio
  );
  const contextStudioSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.ContextStudio);
  const agentAssistantLibrarySideNavUrl = sideNavUrls?.find(
    (sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.AgentLibrary
  );
  const documentCollectionsSideNavUrl = sideNavUrls?.find(
    (sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.DocumentCollections
  );

  const catalogSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Catalog);
  const marketplaceSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Marketplace);
  const settingsSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Settings);
  const adminSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Admin);

  const isAssistantStudioEnabled = Boolean(agentAssistantStudioSideNavUrl);

  const currentUrl = new URL(window.location.href);

  const isDocumentCollectionsActive = currentUrl.pathname.includes("/chat/document-collections");
  const isChatActive = currentUrl.pathname.includes("/chat") && !isDocumentCollectionsActive;

  // get current selected team
  let teamSwitcherTeam: any = null;

  if (Array.isArray(personalTeams) && personalTeams.length > 0) {
    personalTeams.forEach((team) => {
      if (team.id === user?.teamInstanceSwitcherDefault) {
        teamSwitcherTeam = { ...team, isPersonal: true };
      }
    });
  }

  if (Array.isArray(teams) && teams.length > 0) {
    teams.forEach((team) => {
      if (team.id === user?.teamInstanceSwitcherDefault) {
        teamSwitcherTeam = { ...team, isStandard: true };
      }
    });
  }

  if (Array.isArray(accounts) && accounts.length > 0) {
    accounts.forEach((account) => {
      if (account.id === user?.teamInstanceSwitcherDefault) {
        teamSwitcherTeam = { ...account, isAccount: true };
      } else if (Array.isArray(account.projectTeams) && account.projectTeams.length > 0) {
        account.projectTeams.forEach((projectTeam) => {
          if (projectTeam.id === user?.teamInstanceSwitcherDefault) {
            teamSwitcherTeam = { ...projectTeam, isProject: true };
          }
        });
      }
    });
  }

  // Functions to track IBM Instrumentation on Segment
  const handleSidenavLinkClick = ({ name, link }: { name: string; link: string }) => {
    triggerEvent &&
      triggerEvent({
        action: `Clicked on SideNav ${name} link`,
        category: "Sidenav",
        destinationPath: homeSideNavUrl,
      });
  };

  const handleToolsClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Tools link",
        category: "Sidenav",
        destinationPath: toolsSideNavUrl,
      });
  };

  const handleAgentAssistantStudioClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Agent & Assistant Studio link",
        category: "Sidenav",
        destinationPath: agentAssistantStudioSideNavUrl?.url,
      });
  };

  const handleAgentAssistantLibraryClick = () => {
    console.log("assistantLibraryPath",`${baseEnvUrl}${assistantLibraryPath}`);
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Agent & Assistant Library link",
        category: "Sidenav",
        destinationPath: `${baseEnvUrl}${assistantLibraryPath}`,
      });
  };

  const handleDocumentCollectionsClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Document Collections link",
        category: "Sidenav",
        destinationPath: documentCollectionsSideNavUrl?.url,
      });
  };

  const handleSettingsClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Settings link",
        category: "Sidenav",
        destinationPath: settingsSideNavUrl?.url,
      });
  };

  const handleChatClick = (event: any) => {
    let redirectLink = chatLink
      ? chatLink
      : `${appLink.newChatRedirect()}?teamName=${teamSwitcherTeam.name}&teamId=${teamSwitcherTeam.id}`;
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Chat link",
        category: "Sidenav",
        destinationPath: redirectLink,
      });
    if (!navigateSideNavLink(event, redirectLink)) {
      window.open(redirectLink, "_self", "noopener,noreferrer");
    }
  };

  const handleCreateJoinClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Create/Join link",
        category: "Sidenav",
        CTA: "Create/Join team cliked",
        type: "Button",
      });
  };

  const handleTeamClick = ({ team, type }: { team: any; type?: string }) => {
    const destinationPath = teamPageSideNavUrl?.url || `${baseEnvUrl}/${app}/teams/${team.id}`;

    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Team link",
        category: "Sidenav",
        destinationPath,
        teamId: team.id,
        teamType: type,
      });
  };

  const handleLaunchpadLink = (event: any) => {
    event.preventDefault();

    //@ts-ignore
    if (Boolean(hamburguerMenu) && hamburguerMenu.className.includes("active")) {
      //@ts-ignore
      Boolean(hamburguerMenu) && hamburguerMenu?.click();
    }
    setActiveMenu(false);
  };

  const getDefaultSpaPath = (url: string) => {
    const target = new URL(url, window.location.href);
    const base = baseEnvUrl ? new URL(baseEnvUrl, window.location.href) : null;
    const basePath = base?.origin === target.origin ? base.pathname.replace(/\/$/, "") : "";
    const appPath = app ? `/${app}` : "";
    const environmentPath =
      appPath && basePath.endsWith(appPath) ? basePath.slice(0, -appPath.length) || "/" : basePath;
    const pathToStrip = environmentPath === "/" ? "" : environmentPath;
    const targetPath = target.pathname.replace(/\/$/, "");
    let pathname = target.pathname;

    if (pathToStrip && (targetPath === pathToStrip || target.pathname.startsWith(`${pathToStrip}/`))) {
      pathname = target.pathname.slice(pathToStrip.length) || "/";
    }

    return `${pathname}${target.search}${target.hash}`;
  };

  const isModifiedClick = (event: any) => {
    return (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    );
  };

  const navigateSideNavLink = (event: any, url?: string) => {
    console.log('[AdvantageSideNav] navigateSideNavLink called', {
      enableSpaNavigation,
      url,
      hasHistory: !!history,
      hasOnNavigate: !!onNavigate,
    });

    if (!enableSpaNavigation || !url || isModifiedClick(event)) {
      console.log('[AdvantageSideNav] Navigation aborted - conditions not met');
      return false;
    }

    const target = new URL(url, window.location.href);

    if (target.origin !== window.location.origin) {
      console.log('[AdvantageSideNav] Navigation aborted - different origin');
      return false;
    }

    event.preventDefault();

    const path = resolveSpaPath ? resolveSpaPath(url) : getDefaultSpaPath(url);
    console.log('[AdvantageSideNav] Navigating to path:', path);

    if (onNavigate) {
      onNavigate(path, url);
    } else if (history?.push) {
      history.push(path);
    } else {
      window.history.pushState(null, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }

    setActiveMenu(false);
    return true;
  };

  const chatSideNavLink = (
    <SideNavLink
      data-testid="sidenav-chat-link"
      className={!enableChatButton ? `${prefix}--bmrg-advantage-sidenav__inactive-link` : ""}
      isActive={isChatActive}
      disabled={Boolean(!enableChatButton)}
      renderIcon={ChatBot}
      href={enableChatButton && chatLink}
      onClick={enableChatButton ? handleChatClick : (e: any) => e.preventDefault()}
    >
      {chatSideNavUrl?.name}
    </SideNavLink>
  );

  const showSecondDivider =
    showChatButton ||
    toolsSideNavUrl ||
    agentAssistantStudioSideNavUrl ||
    contextStudioSideNavUrl ||
    agentAssistantLibrarySideNavUrl ||
    documentCollectionsSideNavUrl;

  return (
    <SideNav
      aria-label="sidenav-container"
      className={cx(`${prefix}--bmrg-advantage-sidenav-container`, className, {
        "--closed": !isMenuOpen,
      })}
      data-testid="sidenav-container"
      isRail
      expanded={isMenuOpen}
      onMouseEnter={() => setActiveMenu(true)}
      onMouseLeave={() => {
        setActiveMenu(false);
      }}
      {...rest}
    >
      {
        <SideNavItems>
          <div>
            {homeSideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-home-link"
                isActive={`${baseEnvUrl}/${app}/`.includes(windowLocation.href)}
                renderIcon={Home}
                href={enableSpaNavigation ? undefined : homeSideNavUrl.url}
                onClick={(e: any) => {
                  if (isLaunchpad) {
                    handleLaunchpadLink(e);
                    history.push("/");
                  } else if (isbetaLaunchpad) {
                    console.log("beta launchpad home link clicked");
                    handleLaunchpadLink(e);
                    history.push("/launchpad");
                  } else {
                    navigateSideNavLink(e, homeSideNavUrl.url);
                  }

                  handleSidenavLinkClick({ name: homeSideNavUrl.name, link: homeSideNavUrl.url });
                }}
              >
                {homeSideNavUrl.name}
              </SideNavLink>
            ) : null}
            {teamSwitcherTeam ? (
              <SideNavLink
                title={teamSwitcherTeam.isAccount ? "Account Page" : "Team Page"}
                name={teamSwitcherTeam.name}
                data-testid="sidenav-team-link"
                id={teamSwitcherTeam.id}
                isActive={windowLocation.href.includes(`/launchpad/teams/${teamSwitcherTeam.id}`)}
                className={`${prefix}--bmrg-advantage-sidenav-team`}
                renderIcon={UserMultiple}
                href={enableSpaNavigation ? undefined : (teamPageSideNavUrl?.url || `${baseEnvUrl}/${app}/teams/${teamSwitcherTeam.id}`)}
                onClick={(e: any) => {
                  if (isLaunchpad) {
                    handleLaunchpadLink(e);
                    history.push(`/teams/${teamSwitcherTeam.id}`);
                  } else {
                    navigateSideNavLink(
                      e,
                      teamPageSideNavUrl?.url || `${baseEnvUrl}/${app}/teams/${teamSwitcherTeam.id}`
                    );
                  }
                  handleTeamClick({
                    team: teamSwitcherTeam,
                    type: teamSwitcherTeam.isPersonal
                      ? "personal"
                      : teamSwitcherTeam.isAccount
                        ? "account"
                        : teamSwitcherTeam.isproject
                          ? "project"
                          : "standard",
                  });
                }}
              >
                <p className={`${prefix}--bmrg-advantage-sidenav-teams__title`}>
                  {teamSwitcherTeam.isAccount ? "Account Page" : "Team Page"}
                </p>
              </SideNavLink>
            ) : !isPartnerUser && joinCreateTrigger ? (
              <SideNavLink
                data-testid="sidenav-create-join-trigger"
                renderIcon={AddAlt}
                onClick={(e: any) => {
                  joinCreateTrigger(e);
                  handleCreateJoinClick();
                }}
              >
                {joinButtontitle}
              </SideNavLink>
            ) : null}
            <SideNavDivider />
            {showChatButton &&
              (showChatTooltip ? (
                <TooltipHover
                  className={`${prefix}--bmrg-side-nav__tooltip`}
                  isActive={isChatActive}
                  content={tooltipMessage}
                  direction="right"
                >
                  <span>{chatSideNavLink}</span>
                </TooltipHover>
              ) : (
                chatSideNavLink
              ))}
            {toolsSideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-tools-link"
                renderIcon={Api}
                href={enableSpaNavigation ? undefined : toolsSideNavUrl.url}
                onClick={(e: any) => {
                  navigateSideNavLink(e, toolsSideNavUrl.url);
                  handleSidenavLinkClick({ name: toolsSideNavUrl.name, link: toolsSideNavUrl.url });
                }}
              >
                {toolsSideNavUrl.tag ? (
                  <div className={`${prefix}--bmrg-advantage-sidenav-item-tag`}>
                    <p title={toolsSideNavUrl.name} className={`${prefix}--bmrg-advantage-sidenav-item-tag-name`}>
                      {toolsSideNavUrl.name}
                    </p>
                    <Tag size="sm" title={toolsSideNavUrl.tag} type="high-contrast">
                      {toolsSideNavUrl.tag}
                    </Tag>
                  </div>
                ) : (
                  toolsSideNavUrl.name
                )}
              </SideNavLink>
            ) : null}
            {agentAssistantStudioSideNavUrl ? (
              <SideNavLink
              data-testid="sidenav-agent-assistant-studio-link"
              isActive={windowLocation.href.includes(`/agent-assistant-studio`)}
              className={!isAssistantStudioEnabled ? `${prefix}--bmrg-advantage-sidenav__inactive-link` : ""}
              disabled={!isAssistantStudioEnabled}
              renderIcon={IntentRequestCreate}
              href={enableSpaNavigation ? undefined : agentAssistantStudioSideNavUrl.url}
              onClick={(e: any) => {
                if (isLaunchpad) {
                  handleLaunchpadLink(e);
                  history.push(agentStudioPath);
                } else {
                  navigateSideNavLink(e, agentAssistantStudioSideNavUrl.url);
                }
                handleAgentAssistantStudioClick();
              }}
              >
               {agentAssistantStudioSideNavUrl.name}
              </SideNavLink>
            ) : null}
            {contextStudioSideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-context-studio-link"
                renderIcon={Network_3}
                href={enableSpaNavigation ? undefined : contextStudioSideNavUrl.url}
                onClick={(e: any) => {
                  navigateSideNavLink(e, contextStudioSideNavUrl.url);
                  handleSidenavLinkClick({ name: contextStudioSideNavUrl.name, link: contextStudioSideNavUrl.url });
                }}
              >
                {contextStudioSideNavUrl.tag ? (
                  <div className={`${prefix}--bmrg-advantage-sidenav-item-tag`}>
                    <p
                      title={contextStudioSideNavUrl.name}
                      className={`${prefix}--bmrg-advantage-sidenav-item-tag-name`}
                    >
                      {contextStudioSideNavUrl.name}
                    </p>
                    <Tag size="sm" title={contextStudioSideNavUrl.tag} type="high-contrast">
                      {contextStudioSideNavUrl.tag}
                    </Tag>
                  </div>
                ) : (
                  contextStudioSideNavUrl.name
                )}
              </SideNavLink>
            ) : null}
            {agentAssistantLibrarySideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-agent-assistant-library-link"
                renderIcon={Folders}
                isActive={windowLocation.href.includes(`${baseEnvUrl}/assistant-library`)}
                href={enableSpaNavigation ? undefined : agentAssistantLibrarySideNavUrl.url}
                onClick={(e: any) => {
                  navigateSideNavLink(e, agentAssistantLibrarySideNavUrl.url);
                  handleSidenavLinkClick({
                    name: agentAssistantLibrarySideNavUrl.name,
                    link: agentAssistantLibrarySideNavUrl.url,
                  });
                }}
              >
                {agentAssistantLibrarySideNavUrl.name}
              </SideNavLink>
            ) : null}
            {documentCollectionsSideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-document-collections-link"
                isActive={isDocumentCollectionsActive}
                renderIcon={DocumentMultiple_02}
                className={!isAssistantStudioEnabled ? `${prefix}--bmrg-advantage-sidenav__inactive-link` : ""}
                // disabled={!isAssistantStudioEnabled}
                href={enableSpaNavigation ? undefined : documentCollectionsSideNavUrl.url}
                 onClick={(e: any) => {
                  navigateSideNavLink(e, documentCollectionsSideNavUrl.url);
                  handleDocumentCollectionsClick();
                }}
              >
                {documentCollectionsSideNavUrl.name}
              </SideNavLink>
            ) : null}
            {showSecondDivider ? <SideNavDivider /> : null}
            {catalogSideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-catalog-link"
                isActive={windowLocation.href.includes(`${baseEnvUrl}/catalog`)}
                href={enableSpaNavigation ? undefined : catalogSideNavUrl.url}
                renderIcon={Catalog}
                onClick={(e: any) => {
                  navigateSideNavLink(e, catalogSideNavUrl.url);
                  handleSidenavLinkClick({ name: catalogSideNavUrl.name, link: catalogSideNavUrl.url });
                }}
              >
                {catalogSideNavUrl.name}
              </SideNavLink>
            ) : null}
            {marketplaceSideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-markeplace-link"
                renderIcon={Store}
                isActive={windowLocation.href.includes(`${baseEnvUrl}/launchpad/marketplace`)}
                href={enableSpaNavigation ? undefined : marketplaceSideNavUrl.url}
                onClick={(e: any) => {
                  navigateSideNavLink(e, marketplaceSideNavUrl.url);
                  handleSidenavLinkClick({ name: marketplaceSideNavUrl.name, link: marketplaceSideNavUrl.url });
                }}
              >
                {marketplaceSideNavUrl.tag ? (
                  <div className={`${prefix}--bmrg-advantage-sidenav-item-tag`}>
                    <p title={marketplaceSideNavUrl.name} className={`${prefix}--bmrg-advantage-sidenav-item-tag-name`}>
                      {marketplaceSideNavUrl.name}
                    </p>
                    <Tag size="sm" title={marketplaceSideNavUrl.tag} type="high-contrast">
                      {marketplaceSideNavUrl.tag}
                    </Tag>
                  </div>
                ) : (
                  marketplaceSideNavUrl.name
                )}
              </SideNavLink>
            ) : null}
            {settingsSideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-settings-link"
                renderIcon={Settings}
                href={enableSpaNavigation ? undefined : settingsSideNavUrl.url}
                isActive={windowLocation.href.includes(`${baseEnvUrl}/settings`)}
                onClick={(e: any) => {
                  navigateSideNavLink(e, settingsSideNavUrl.url);
                  handleSettingsClick();
                }}
              >
                {settingsSideNavUrl.name}
              </SideNavLink>
            ) : null}
            {adminSideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-admin-link"
                href={enableSpaNavigation ? undefined : adminSideNavUrl.url}
                renderIcon={LicenseThirdParty}
                onClick={(e: any) => {
                  navigateSideNavLink(e, adminSideNavUrl.url);
                  handleSidenavLinkClick({ name: adminSideNavUrl.name, link: adminSideNavUrl.url });
                }}
              >
                {adminSideNavUrl.name}
              </SideNavLink>
            ) : null}
          </div>
          {children ? (
            <>
              <SideNavDivider />
              {children}
            </>
          ) : null}
        </SideNavItems>
      }
    </SideNav>
  );
}

export default AdvantageSideNav;
