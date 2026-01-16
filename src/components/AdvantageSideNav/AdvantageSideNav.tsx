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
  Settings,
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
  AgentLibrary: "agentLibrary",
  DocumentCollections: "documentCollections",
  Catalog: "catalog",
  Settings: "settings",
  Admin: "admin",
};

type Props = {
  accounts?: Array<SideNavAccount> | null;
  app?: string;
  appLink: any;
  agentStudioPath?: string;
  agenticAppsPath?: string;
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
  children?: React.ReactNode;
};

export function AdvantageSideNav(props: Props) {
  const {
    app,
    appLink,
    agenticAppsPath = "",
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

  const homeLink = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Home)?.url;
  const chatLink = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Chat)?.url;
  const toolsLink = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Tools)?.url;
  const agentAssistantStudioLink = sideNavUrls?.find(
    (sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.AgentStudio
  )?.url;
  const agentAssistantLibraryLink = sideNavUrls?.find(
    (sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.AgentLibrary
  )?.url;
  const documentCollectionsLink = sideNavUrls?.find(
    (sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.DocumentCollections
  )?.url;
  const catalogNavlink = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Catalog)?.url;
  const settingsLink = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Settings)?.url;
  const adminNavlink = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Admin)?.url;

  const AssistantStudioLink = false;

  const currentUrl = new URL(window.location.href);
  const workspace = currentUrl.searchParams.get("workspace");

  const isDocumentCollectionsActive = currentUrl.pathname.includes("/chat") && workspace === "knowledge";
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
  const handleHomeClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Home link",
        category: "Sidenav",
        destinationPath: homeLink,
      });
  };

  const handleToolsClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Tools link",
        category: "Sidenav",
        destinationPath: toolsLink,
      });
  };

  const handleAgentAssistantStudioClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Agent & Assistant Studio link",
        category: "Sidenav",
        destinationPath: agentAssistantStudioLink,
      });
  };

  const handleAgentAssistantLibraryClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Agent & Assistant Library link",
        category: "Sidenav",
        destinationPath: agentAssistantLibraryLink,
      });
  };

  const handleDocumentCollectionsClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Document Collections link",
        category: "Sidenav",
        destinationPath: documentCollectionsLink,
      });
  };

  const handleSettingsClick = () => {
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Settings link",
        category: "Sidenav",
        destinationPath: settingsLink,
      });
  };

  const handleChatClick = () => {
    let redirectLink = chatLink
      ? chatLink
      : `${appLink.newChatRedirect()}?teamName=${teamSwitcherTeam.name}&teamId=${teamSwitcherTeam.id}`;
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Chat link",
        category: "Sidenav",
        destinationPath: redirectLink,
      });
    // window.open(redirectLink, "_self", "noopener,noreferrer");
    navigateInternal(redirectLink);
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
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Team link",
        category: "Sidenav",
        destinationPath: `${baseEnvUrl}/${app}/teams/${team.id}`,
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
      Chat
    </SideNavLink>
  );

  const showSecondDivider =
    showChatButton || toolsLink || agentAssistantStudioLink || agentAssistantLibraryLink || documentCollectionsLink;

    const navigateInternal = (url: string) => {
        console.log("url",url);
        const target = new URL(url, window.location.origin);
        console.log("target",target.origin);
        console.log("window.location.origin",window.location.origin);
        if (target.origin === window.location.origin) {
        console.log("target.pathname",target.pathname);
        const pathname = target.pathname.startsWith("/ica")
          ? target.pathname.slice(4)   // removes "/ica"
          : target.pathname;
        console.log("pathname",pathname);
        history.push(pathname + target.search + target.hash);
      } else {
        console.log("direct url navgation",url)
        window.location.href = url;
      }
    };
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
            {homeLink ? (
              <SideNavLink
                data-testid="sidenav-home-link"
                isActive={`${baseEnvUrl}/${app}/`.includes(windowLocation.href)}
                renderIcon={Home}
                href={homeLink}
                onClick={(e: any) => {
                  if (isLaunchpad) {
                    handleLaunchpadLink(e);
                    history.push("/");
                  }
                  if (isbetaLaunchpad) {
                    console.log("beta launchpad home link clicked");
                    handleLaunchpadLink(e);
                    history.push("/launchpad");
                  }

                  handleHomeClick();
                }}
              >
                Home
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
                href={`${baseEnvUrl}/${app}/teams/${teamSwitcherTeam.id}`}
                onClick={(e: any) => {
                  if (isLaunchpad) {
                    handleLaunchpadLink(e);
                    history.push(`/teams/${teamSwitcherTeam.id}`);
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
            {toolsLink ? (
              <SideNavLink
                data-testid="sidenav-tools-link"
                renderIcon={Api}
                href={toolsLink}
                onClick={(e: any) => {
                  handleToolsClick();
                }}
              >
                <div className={`${prefix}--bmrg-advantage-sidenav-item-tag`}>
                  Tools
                  <Tag size="sm" title="BETA" type="high-contrast">
                    BETA
                  </Tag>
                </div>
              </SideNavLink>
            ) : null}
            {agentAssistantStudioLink ? (
              <SideNavLink
                data-testid="sidenav-agent-assistant-studio-link"
                // isActive={
                //   (agentStudioPath && windowLocation.href.includes(`/launchpad${agentStudioPath}`)) ||
                //   (agenticAppsPath && windowLocation.href.includes(`/launchpad${agenticAppsPath}`))
                // }
                className={!AssistantStudioLink ? `${prefix}--bmrg-advantage-sidenav__inactive-link` : ""}
                disabled={Boolean(!AssistantStudioLink)}
                renderIcon={IntentRequestCreate}
              // href={agentAssistantStudioLink}
              // onClick={(e: any) => {
              //   if (isLaunchpad) {
              //     handleLaunchpadLink(e);
              //     history.push(agentStudioPath);
              //   }
              //   handleAgentAssistantStudioClick();
              // }}
              >
                Agent & Assistant Studio
              </SideNavLink>
            ) : null}
            {agentAssistantLibraryLink ? (
              <SideNavLink
                data-testid="sidenav-agent-assistant-library-link"
                renderIcon={Folders}
                //href={agentAssistantLibraryLink}
                className={!AssistantStudioLink ? `${prefix}--bmrg-advantage-sidenav__inactive-link` : ""}
                disabled={Boolean(!AssistantStudioLink)}
              // onClick={(e: any) => {
              //   handleAgentAssistantLibraryClick();
              // }}
              >
                Agent & Assistant Library
              </SideNavLink>
            ) : null}
            {documentCollectionsLink ? (
              <SideNavLink
                data-testid="sidenav-document-collections-link"
                isActive={isDocumentCollectionsActive}
                renderIcon={DocumentMultiple_02}
                href={documentCollectionsLink}
                onClick={(e: any) => {
                  handleDocumentCollectionsClick();
                }}
              >
                Document Collections
              </SideNavLink>
            ) : null}
            {showSecondDivider ? <SideNavDivider /> : null}
            {catalogNavlink ? (
              <SideNavLink
                data-testid="sidenav-catalog-link"
                isActive={windowLocation.href.includes(`${baseEnvUrl}/catalog`)}
                renderIcon={Catalog}
                onClick={(e: any) => {
                  e.preventDefault();
                  navigateInternal(catalogNavlink);
                }}
              >
                Catalog
              </SideNavLink>
            ) : null}
            {settingsLink ? (
              <SideNavLink
                data-testid="sidenav-settings-link"
                renderIcon={Settings}
                // href={settingsLink}
                className={!AssistantStudioLink ? `${prefix}--bmrg-advantage-sidenav__inactive-link` : ""}
                disabled={Boolean(!AssistantStudioLink)}
              // onClick={(e: any) => {
              //   handleSettingsClick();
              // }}
              >
                Settings
              </SideNavLink>
            ) : null}
            {adminNavlink ? (
              <SideNavLink
                data-testid="sidenav-admin-link"
                renderIcon={LicenseThirdParty}
                onClick={(e: any) => {
                  e.preventDefault();
                  navigateInternal(adminNavlink);
                }}
              >
                Admin
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
