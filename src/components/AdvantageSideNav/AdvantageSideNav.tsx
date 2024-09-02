import React from "react";
import { SideNav, SideNavDivider, SideNavItems, SideNavLink , SideNavMenu } from "@carbon/react";
import cx from "classnames";
import { AddAlt, ChatBot, ChevronRight, GroupAccount, Home, Locked, Unlocked, UserMultiple } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";
import { NavLink, SideNavTeam, SideNavAccount } from "types";

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
  teams?: Array<SideNavTeam>;
  triggerEvent?: (props: any) => void;
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
    teams,
    triggerEvent,
    accounts,
    baseEnvUrl,
    className,
    navLinks,
    ...rest
  } = props;
  const [activeSubmenu, setActiveSubmenu] = React.useState("");
  const [activeMenu, setActiveMenu] = React.useState(false);
  const isMenuOpen = isOpen || activeMenu;
  const windowLocation = window.location;

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
            {assistantLink ? <SideNavLink isActive={windowLocation.href.includes(assistantLink)} renderIcon={ChatBot} href={assistantLink} onClick={handleAssistantClick}>{`Start a ${defaultAssistantLink ? "" : "New "}Chat`}</SideNavLink> : null}
            {joinCreateTrigger ? <SideNavLink renderIcon={AddAlt} onClick={(e: any) => {joinCreateTrigger(e); handleCreateJoinClick();}}>Create or Join Team</SideNavLink> : null}
          </div>
            {!Boolean(teams?.length) && !Boolean(accounts?.length) && isMenuOpen ?
              <>
                <SideNavDivider />
                <p className={`${prefix}--bmrg-advantage-sidenav-no-teams__text`}>No teams or accounts available.</p>
              </>
              : null
            }
            {Boolean(teams?.length) ?
              <>
                <SideNavDivider />
                <SideNavMenu renderIcon={UserMultiple} title="Teams" className={`${prefix}--bmrg-advantage-sidenav-menu`} isSideNavExpanded={isMenuOpen}>
                  {isMenuOpen ? teams?.map(team =>(
                    <>
                      <li>
                        <SideNavLink isActive={windowLocation.href.includes(team.id)} className={`${prefix}--bmrg-advantage-sidenav-team`} renderIcon={team.privateTeam ? Locked : Unlocked} href={`${baseEnvUrl}/${app}/teams/${team.id}`} onMouseEnter={() => setActiveSubmenu(team.id)} onClick={() => handleTeamClick(team)}>
                          <p className={`${prefix}--bmrg-advantage-sidenav-teams__title`}>
                            {team.name}
                          </p>
                          {Boolean(team?.services?.length) ? <ChevronRight /> : null}
                        </SideNavLink>
                        {Boolean(team?.services?.length) ?
                          <ul className={cx(`${prefix}--bmrg-advantage-sidenav-submenu`, {
                            "--open": team.id === activeSubmenu
                          })}>
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
                  )) : null }
                </SideNavMenu> 
              </>: null}
          {Boolean(accounts?.length) ?
            <>
              <SideNavDivider />
              <SideNavMenu renderIcon={GroupAccount} title="Accounts" isSideNavExpanded={isMenuOpen}>
                {isMenuOpen ? accounts?.map(team =>(
                  <>
                    <li>
                      <SideNavLink isActive={windowLocation.href.includes(team.id)} className={`${prefix}--bmrg-advantage-sidenav-team`} renderIcon={team.privateTeam ? Locked : Unlocked} href={`${baseEnvUrl}/${app}/teams/${team.id}`} onMouseEnter={() => setActiveSubmenu(team.id)} onClick={() => handleTeamClick(team)}>
                        <p className={`${prefix}--bmrg-advantage-sidenav-teams__title`}>
                          {team.name}
                        </p>
                        {Boolean(team?.projectTeams?.length) ? <ChevronRight /> : null}
                      </SideNavLink>
                      {Boolean(team?.projectTeams?.length) ? 
                        <ul className={cx(`${prefix}--bmrg-advantage-sidenav-submenu`, {
                          "--open": team.id === activeSubmenu
                        })}>
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
                )) : null}
              </SideNavMenu> 
            </> : null}
        </SideNavItems>
      )}
    </SideNav>
  );
}

export default AdvantageSideNav;
