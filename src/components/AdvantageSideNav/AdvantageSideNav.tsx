import React from "react";
import { SideNav, SideNavDivider, SideNavItems, SideNavLink , SideNavMenu } from "@carbon/react";
import cx from "classnames";
import { AddAlt, ChatBot, ChevronRight, GroupAccount, Home, Locked, Unlocked, User as UserIcon, UserMultiple } from "@carbon/react/icons";
import { USER_PLATFORM_ROLE } from "../../constants/UserType";
import { prefix } from "../../internal/settings";
import { NavLink, SideNavTeam, SideNavAccount, User } from "types";

type Props = {
  accounts?: Array<SideNavAccount>;
  app?: string;
  assistantLink?: string;
  baseEnvUrl?: string;
  className?: string;
  defaultAssistantLink?: string;
  homeLink?: string;
  joinCreateTrigger?: (props: any) => void;
  isLoading?: boolean;
  isOpen?: boolean;
  navLinks?: NavLink[];
  personalTeams?: Array<SideNavTeam>;
  teams?: Array<SideNavTeam>;
  triggerEvent?: (props: any) => void;
  user: User;
};

export function AdvantageSideNav(props: Props) {
  const { 
    app,
    homeLink,
    assistantLink,
    defaultAssistantLink,
    joinCreateTrigger,
    isLoading,
    isOpen,
    teams=[],
    triggerEvent,
    accounts=[],
    baseEnvUrl,
    className,
    navLinks,
    personalTeams=[],
    user,
    ...rest
  } = props;
  const [activeSubmenu, setActiveSubmenu] = React.useState("");
  const [activeMenu, setActiveMenu] = React.useState(false);
  const isMenuOpen = isOpen || activeMenu;
  const windowLocation = window.location;
  const isPartnerUser = user.type === USER_PLATFORM_ROLE.Partner;
  const standardTeamsList = [...personalTeams.map(pteams => ({...pteams, isPersonal: true})), ...teams];

  // Functions to track IBM Instrumentation on Segment
  const handleHomeClick = () => {
    triggerEvent && triggerEvent({
      action: "Clicked on SideNav Home link",
      category: "Sidenav",
      destinationPath: homeLink,
    });
  };

  const handleAssistantClick = () => {
    triggerEvent && triggerEvent({
      action: "Clicked on SideNav Assistant link",
      category: "Sidenav",
      destinationPath: assistantLink,
    });
  };

  const handleCreateJoinClick = () => {
    triggerEvent && triggerEvent({
      action: "Clicked on SideNav Create/Join link",
      category: "Sidenav",
      CTA: "Create/Join team cliked",
      type: "Button",
    });
  };

  const handleTeamClick = (team: any) => {
    triggerEvent && triggerEvent({
      action: "Clicked on SideNav Team link",
      category: "Sidenav",
      destinationPath: `${baseEnvUrl}/${app}/teams/${team.id}`,
      teamId: team.id
    });
  };

  const handleServiceClick = (service: any) => {
    triggerEvent && triggerEvent({
      action: "Clicked on SideNav Service link",
      category: "Sidenav",
      destinationPath: service.url,
    });
  };

  const teamsRef = React.useRef([]);
  const accountsRef = React.useRef([]);

  // add or remove refs

  if (teamsRef.current.length !== standardTeamsList?.length) {
    //@ts-ignore
    teamsRef.current = Array(standardTeamsList?.length).fill().map((_, i) => teamsRef.current[i] || React.createRef());
  }

  if (accountsRef.current.length !== accounts?.length) {
    //@ts-ignore
    accountsRef.current = Array(accounts?.length).fill().map((_, i) => accountsRef.current[i] || React.createRef());
  }

  return (
    <SideNav
      className={cx(`${prefix}--bmrg-advantage-sidenav-container`, className, {
        "--closed": !isMenuOpen
      })}
      isRail
      expanded={isMenuOpen}
      onToggle={() => setActiveSubmenu("")}
      onMouseEnter={() => setActiveMenu(true)}
      onMouseLeave={() => {setActiveMenu(false); setActiveSubmenu("")}}
      {...rest}
    >
      {(
        <SideNavItems>
          {isMenuOpen && navLinks?.length ? (
            <div>
              {navLinks.map((link) =>(<SideNavLink href={link.url}>{link.name}</SideNavLink>))}
              <SideNavDivider />
            </div>
          ) : null}
          <div onMouseEnter={() => setActiveSubmenu("")}>
            {homeLink ? <SideNavLink isActive={windowLocation.href === homeLink} renderIcon={Home} href={homeLink} onClick={handleHomeClick}>Home</SideNavLink> : null}
            {(!isPartnerUser && assistantLink) ? <SideNavLink isActive={windowLocation.href.includes(assistantLink)} renderIcon={ChatBot} href={assistantLink} onClick={handleAssistantClick}>{`Start a ${defaultAssistantLink ? "" : "New "}Chat`}</SideNavLink> : null}
            {(!isPartnerUser && joinCreateTrigger) ? <SideNavLink renderIcon={AddAlt} onClick={(e: any) => {joinCreateTrigger(e); handleCreateJoinClick();}}>Create or Join Team</SideNavLink> : null}
          </div>
            {!Boolean(standardTeamsList?.length) && !Boolean(accounts?.length) && isMenuOpen ?
              <>
                <SideNavDivider />
                <p className={`${prefix}--bmrg-advantage-sidenav-no-teams__text`}>No teams or accounts available.</p>
              </>
              : null
            }
            {Boolean(standardTeamsList?.length) ?
              <>
                <SideNavDivider />
                <SideNavMenu renderIcon={UserMultiple} title="Teams" isActive={standardTeamsList.some(t => windowLocation.href.includes(t.id))} className={`${prefix}--bmrg-advantage-sidenav-menu`} isSideNavExpanded={isMenuOpen}>
                  {isMenuOpen ? standardTeamsList?.map((team, i) => {
                    const topPosition = document?.getElementById(team.id)?.getBoundingClientRect()?.top ?? 0;
                    return(
                      <>
                        <li className={`${prefix}--bmrg-advantage-sidenav-team-item`}>
                          <SideNavLink id={team.id} ref={teamsRef.current[i]} isActive={windowLocation.href.includes(team.id)} className={`${prefix}--bmrg-advantage-sidenav-team`} renderIcon={team?.isPersonal ? UserIcon : (team.privateTeam ? Locked : Unlocked)} href={`${baseEnvUrl}/${app}/teams/${team.id}`} onMouseEnter={() => setActiveSubmenu(team.id)} onClick={() => handleTeamClick(team)}>
                            <p className={`${prefix}--bmrg-advantage-sidenav-teams__title`}>
                              {Boolean(team.displayName) ? team.displayName : team.name}
                            </p>
                            {Boolean(team?.services?.length) ? <ChevronRight /> : null}
                          </SideNavLink>
                          {Boolean(team?.services?.length) ?
                            <ul className={cx(`${prefix}--bmrg-advantage-sidenav-submenu`, {
                              "--open": team.id === activeSubmenu
                            })}
                              style={{top: `${window.scrollY + topPosition}px`}}
                            >
                              <li className={`${prefix}--bmrg-advantage-sidenav-submenu-wrapper`}>
                                <ul className={`${prefix}--bmrg-advantage-sidenav-services-submenu`}>
                                  <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-submenu-link`} href={`${baseEnvUrl}/${app}/teams/${team.id}`} onClick={() => handleTeamClick(team)}>
                                    Team Page
                                  </SideNavLink>
                                  {team.services?.map((service) => (
                                    <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-submenu-link`} href={service.url} onClick={() => handleServiceClick(service)}>
                                      {service.name}
                                    </SideNavLink>
                                  )) ?? null}                 
                                </ul>
                              </li>
                            </ul> : null
                          }
                        </li>
                      </>
                  )}) : null }
                </SideNavMenu> 
              </>: null}
          {Boolean(accounts?.length) ?
            <>
              <SideNavDivider />
              <SideNavMenu renderIcon={GroupAccount} title="Accounts" isSideNavExpanded={isMenuOpen} isActive={accounts.some(a => windowLocation.href.includes(a.id))} >
                {isMenuOpen ? accounts?.map((team, i) => {
                  const topPosition = document?.getElementById(team.id)?.getBoundingClientRect()?.top ?? 0;
                  return(
                    <>
                      <li className={`${prefix}--bmrg-advantage-sidenav-team-item`}>
                        <SideNavLink id={team.id} isActive={windowLocation.href.includes(team.id)} ref={accountsRef.current[i]} className={`${prefix}--bmrg-advantage-sidenav-team`} renderIcon={team.privateTeam ? Locked : Unlocked} href={`${baseEnvUrl}/${app}/teams/${team.id}`} onMouseEnter={() => setActiveSubmenu(team.id)} onClick={() => handleTeamClick(team)}>
                          <p className={`${prefix}--bmrg-advantage-sidenav-teams__title`}>
                            {Boolean(team.displayName) ? team.displayName : team.name}
                          </p>
                          {Boolean(team?.projectTeams?.length) ? <ChevronRight /> : null}
                        </SideNavLink>
                        {Boolean(team?.projectTeams?.length) ? 
                          <ul className={cx(`${prefix}--bmrg-advantage-sidenav-submenu`, {
                            "--open": team.id === activeSubmenu
                          })}
                          style={{top: `${window.scrollY + topPosition}px`}}
                          >
                            <li className={`${prefix}--bmrg-advantage-sidenav-submenu-wrapper`}>
                              <ul className={`${prefix}--bmrg-advantage-sidenav-services-submenu`}>
                                {/* <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-submenu-link`} href={`${baseEnvUrl}/${app}/teams/${team.id}`}>
                                  Account Page
                                </SideNavLink> */}
                                  {team.projectTeams?.map((accTeam) => (
                                    <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-submenu-link`} href={`${baseEnvUrl}/${app}/teams/${accTeam.id}`} onClick={() => handleTeamClick(accTeam)}>
                                      {accTeam.name}
                                    </SideNavLink> 
                                  )) ?? null}                 
                              </ul>
                            </li>
                          </ul> : null
                        }
                      </li>
                    </>
                )}) : null}
              </SideNavMenu> 
            </> : null}
        </SideNavItems>
      )}
    </SideNav>
  );
}

export default AdvantageSideNav;
