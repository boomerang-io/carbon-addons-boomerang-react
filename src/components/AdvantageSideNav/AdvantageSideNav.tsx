/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

import React from "react";
import cx from "classnames";
import {
  SideNav,
  SideNavDivider,
  SideNavItems,
  SideNavLink,
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  Button,
} from "@carbon/react";
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
import { NavLink, Navigation, SideNavTeam, SideNavAccount, User } from "types";

type Props = {
  accounts?: Array<SideNavAccount>;
  app?: string;
  appLink: any;
  regionalTeam?: any;
  assistantLink?: string;
  baseEnvUrl?: string;
  className?: string;
  defaultAssistantLink?: string;
  enableChatButton?: boolean;
  showChatButton?: boolean;
  showSelectTeamPurpose?: boolean;
  homeLink?: string;
  agentAssistantStudioLink?: string;
  agentAssistantLibraryLink?: string;
  documentCollectionsLink?: string;
  settingsLink?: string;
  toolsLink?: string;
  joinCreateTrigger?: (props: any) => void;
  isLoading?: boolean;
  isOpen?: boolean;
  navigation?: Navigation;
  navLinks?: NavLink[];
  personalTeams?: Array<SideNavTeam>;
  showChatTooltip?: boolean;
  teams?: Array<SideNavTeam>;
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
    regionalTeam,
    enableChatButton = true,
    showChatButton = true,
    showSelectTeamPurpose = false,
    homeLink,
    agentAssistantStudioLink,
    agentAssistantLibraryLink,
    assistantLink,
    defaultAssistantLink,
    documentCollectionsLink,
    settingsLink,
    toolsLink,
    joinCreateTrigger,
    isLoading,
    isOpen,
    teams = [],
    triggerEvent,
    accounts = [],
    baseEnvUrl,
    className,
    navLinks,
    navigation,
    personalTeams = [],
    user,
    showChatTooltip,
    templateMeteringEvent,
    tooltipMessage,
    isLaunchpad = false,
    history,
    children,
    ...rest
  } = props;
  const [activeMenu, setActiveMenu] = React.useState(false);
  const [teamList, setTeamList] = React.useState<{ id: string; name: string }[] | null>(null);
  // const [regionalModalIsOpen, setRegionalModalIsOpen] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<{ id: string; name: string } | null>(null);
  const isMenuOpen = isOpen || activeMenu;
  const windowLocation = window.location;
  const isPartnerUser = user?.type === USER_PLATFORM_ROLE.Partner;
  const joinButtontitle = showSelectTeamPurpose ? "Create Team" : "Create or Join Team";
  const hamburguerMenu = document.getElementById("header-sidenav-menu-button");

  // get current selected team
  let teamSwitcherTeam: any = null;

  if (personalTeams.length > 0) {
    personalTeams.forEach((team) => {
      if (team.id === user?.teamInstanceSwitcherDefault) {
        teamSwitcherTeam = { ...team, isPersonal: true };
      }
    });
  }

  if (teams.length > 0) {
    teams.forEach((team) => {
      if (team.id === user?.teamInstanceSwitcherDefault) {
        teamSwitcherTeam = { ...team, isStandard: true };
      }
    });
  }

  if (accounts.length > 0) {
    accounts.forEach((account) => {
      if (account.id === user?.teamInstanceSwitcherDefault) {
        teamSwitcherTeam = { ...account, isAccount: true };
      } else if (account.projectTeams && account.projectTeams?.length > 0) {
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

  const handleAssistantClick = () => {
    let redirectLink = `${appLink.newChatRedirect()}?teamName=${teamSwitcherTeam.name}&teamId=${
          teamSwitcherTeam.id
        }`;
    triggerEvent &&
      triggerEvent({
        action: "Clicked on SideNav Assistant link",
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

  const assistantSideNavLink = (
    // assistantLink &&
    <SideNavLink
      data-testid="sidenav-assistant-link"
      className={!enableChatButton ? `${prefix}--bmrg-advantage-sidenav__inactive-link` : ""}
      disabled={Boolean(!enableChatButton)}
      // isActive={assistantLink }
      renderIcon={ChatBot}
      // href={enableChatButton}
      onClick={enableChatButton ? handleAssistantClick : (e: any) => e.preventDefault()}
    >
      Chat
    </SideNavLink>
  );
  const catalogNavlink = navigation?.platform?.catalog?.url;
  const adminNavlink = navigation?.platform?.admin?.url;

  const showSecondDivider =
    (!isPartnerUser && showChatButton) ||
    toolsLink ||
    agentAssistantStudioLink ||
    agentAssistantLibraryLink ||
    documentCollectionsLink;

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
                    history.push(homeLink);
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
                isActive={windowLocation.href.includes(teamSwitcherTeam.id)}
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
            {
              // assistantLink &&
              showChatButton &&
              (showChatTooltip ? (
                <TooltipHover
                  className={`${prefix}--bmrg-side-nav__tooltip`}
                  content={tooltipMessage}
                  direction="right"
                >
                  <span>{assistantSideNavLink}</span>
                </TooltipHover>
              ) : (
                assistantSideNavLink
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
                Tools
              </SideNavLink>
            ) : null}
            {agentAssistantStudioLink ? (
              <SideNavLink
                data-testid="sidenav-agent-assistant-studio-link"
                isActive={
                  windowLocation.href.includes(`/launchpad/agent-assistant-studio`) ||
                  windowLocation.href.includes(`/launchpad/agenticapps`)
                }
                renderIcon={IntentRequestCreate}
                href={agentAssistantStudioLink}
                onClick={(e: any) => {
                  if (isLaunchpad) {
                    handleLaunchpadLink(e);
                    history.push(agentAssistantStudioLink);
                  }
                  handleAgentAssistantStudioClick();
                }}
              >
                Agent & Assistant Studio
              </SideNavLink>
            ) : null}
            {agentAssistantLibraryLink ? (
              <SideNavLink
                data-testid="sidenav-agent-assistant-library-link"
                renderIcon={Folders}
                href={agentAssistantLibraryLink}
                onClick={(e: any) => {
                  handleAgentAssistantLibraryClick();
                }}
              >
                Agent & Assistant Library
              </SideNavLink>
            ) : null}
            {documentCollectionsLink ? (
              <SideNavLink
                data-testid="sidenav-document-collections-link"
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
              <SideNavLink href={catalogNavlink} renderIcon={Catalog}>
                Catalog
              </SideNavLink>
            ) : null}
            {settingsLink ? (
              <SideNavLink
                data-testid="sidenav-settings-link"
                renderIcon={Settings}
                href={settingsLink}
                onClick={(e: any) => {
                  handleSettingsClick();
                }}
              >
                Settings
              </SideNavLink>
            ) : null}
            {adminNavlink ? (
              <SideNavLink href={adminNavlink} renderIcon={LicenseThirdParty}>
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
