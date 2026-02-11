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

  const homeSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Home);
  const chatSideNavUrl = sideNavUrls?.find((sideNavUrl) => sideNavUrl.key === SideNavUrlKeys.Chat);
  const chatLink = chatSideNavUrl?.url;
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
        destinationPath: link,
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
    window.open(redirectLink, "_self", "noopener,noreferrer");
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
                href={homeSideNavUrl.url}
                onClick={(e: any) => {
                  if (isLaunchpad) {
                    handleLaunchpadLink(e);
                    history.push("/");
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
                href={toolsSideNavUrl.url}
                onClick={(e: any) => {
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
                isActive={
                  (agentStudioPath && windowLocation.href.includes(`/launchpad${agentStudioPath}`)) ||
                  (agenticAppsPath && windowLocation.href.includes(`/launchpad${agenticAppsPath}`))
                }
                renderIcon={IntentRequestCreate}
                href={agentAssistantStudioSideNavUrl.url}
                onClick={(e: any) => {
                  if (isLaunchpad) {
                    handleLaunchpadLink(e);
                    history.push(agentStudioPath);
                  }
                  handleSidenavLinkClick({
                    name: agentAssistantStudioSideNavUrl.name,
                    link: agentAssistantStudioSideNavUrl.url,
                  });
                }}
              >
                {agentAssistantStudioSideNavUrl.name}
              </SideNavLink>
            ) : null}
            {contextStudioSideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-context-studio-link"
                renderIcon={Network_3}
                href={contextStudioSideNavUrl.url}
                onClick={(e: any) => {
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
                href={agentAssistantLibrarySideNavUrl.url}
                onClick={(e: any) => {
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
                renderIcon={DocumentMultiple_02}
                href={documentCollectionsSideNavUrl.url}
                onClick={(e: any) => {
                  handleSidenavLinkClick({
                    name: documentCollectionsSideNavUrl.name,
                    link: documentCollectionsSideNavUrl.url,
                  });
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
                href={catalogSideNavUrl.url}
                renderIcon={Catalog}
              >
                {catalogSideNavUrl.name}
              </SideNavLink>
            ) : null}
            {marketplaceSideNavUrl ? (
              <SideNavLink
                data-testid="sidenav-markeplace-link"
                renderIcon={Store}
                href={marketplaceSideNavUrl.url}
                onClick={(e: any) => {
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
                href={settingsSideNavUrl.url}
                onClick={(e: any) => {
                  handleSidenavLinkClick({ name: settingsSideNavUrl.name, link: settingsSideNavUrl.url });
                }}
              >
                {settingsSideNavUrl.name}
              </SideNavLink>
            ) : null}
            {adminSideNavUrl ? (
              <SideNavLink data-testid="sidenav-admin-link" href={adminSideNavUrl.url} renderIcon={LicenseThirdParty}>
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
