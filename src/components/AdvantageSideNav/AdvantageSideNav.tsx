import React from "react";
import { SideNav, SideNavDivider, SideNavItems, SideNavLink , SideNavMenu } from "@carbon/react";
import cx from "classnames";
import { AddAlt, ChatBot, ChevronRight, GroupAccount, Home, Locked, Unlocked, UserMultiple } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";
import { NavLink, SideNavTeam, SideNavAccount } from "types";

type Props = {
  homeLink?: string;
  assistantLink?: string;
  defaultAssistantLink?: string;
  joinCreateTrigger?: (props: any) => void;
  teams?: Array<SideNavTeam>;
  accounts?: Array<SideNavAccount>;
  baseEnvUrl?: string;
  isLoading?: boolean;
  isOpen?: boolean;
  className?: string;
  app?: string;
  navLinks?: NavLink[];
};

export function AdvantageSideNav(props: Props) {
  const { app, homeLink, assistantLink, defaultAssistantLink, joinCreateTrigger, isLoading, isOpen, teams, accounts, baseEnvUrl, className, navLinks, ...rest } = props;
  const [activeSubmenu, setActiveSubmenu] = React.useState("");
  const [activeMenu, setActiveMenu] = React.useState(false);
  const isMenuOpen = isOpen || activeMenu;

  console.log("isOPen", isOpen, "active", activeMenu,"menu upen", isMenuOpen);

  return (
    <SideNav
      className={cx(`${prefix}--bmrg-advantage-sidenav-container`, className, {
      })}
      isRail
      //test focus
      addFocusListeners={false}
      expanded={isMenuOpen}
      onToggle={() => setActiveSubmenu("")}
      onMouseEnter={() => setActiveMenu(true)}
      onMouseLeave={() => {setActiveMenu(false); setActiveSubmenu("")}}
      onClick={(e: any) => e.preventDefault()}
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
            {homeLink ? <SideNavLink renderIcon={Home} href={homeLink}>Home</SideNavLink> : null}
            {assistantLink ? <SideNavLink renderIcon={ChatBot} href={assistantLink}>{`Start a ${defaultAssistantLink ? "" : "New "}Chat`}</SideNavLink> : null}
            {joinCreateTrigger ? <SideNavLink renderIcon={AddAlt} onClick={joinCreateTrigger}>Create or Join Team</SideNavLink> : null}
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
                  {teams?.map(team =>(
                    <>
                      <li>
                        <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-team`} renderIcon={team.privateTeam ? Locked : Unlocked} href={`${baseEnvUrl}/${app}/teams/${team.id}`} onMouseEnter={() => setActiveSubmenu(team.id)}>
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
                                <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-submenu-link`} href={`${baseEnvUrl}/${app}/teams/${team.id}`}>
                                  Team Page
                                </SideNavLink>
                                {team.services?.map((service) => (
                                  <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-submenu-link`} href={service.url}>
                                    {service.name}
                                  </SideNavLink>
                                )) ?? null}                 
                              </ul>
                            </li>
                          </ul> : null
                        }
                      </li>
                    </>
                  ))}
                </SideNavMenu> 
              </>: null}
          {Boolean(accounts?.length) ?
            <>
              <SideNavDivider />
              <SideNavMenu renderIcon={GroupAccount} title="Accounts" isSideNavExpanded={isMenuOpen}>
                {accounts?.map(team =>(
                  <>
                    <li>
                      <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-team`} renderIcon={team.privateTeam ? Locked : Unlocked} href={`${baseEnvUrl}/${app}/teams/${team.id}`} onMouseEnter={() => setActiveSubmenu(team.id)}>
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
                              <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-submenu-link`} href={`${baseEnvUrl}/${app}/teams/${team.id}`}>
                                Account Page
                              </SideNavLink>
                                {team.projectTeams?.map((accTeam) => (
                                  <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-submenu-link`} href={`${baseEnvUrl}/${app}/teams/${accTeam.id}`}>
                                    {accTeam.name}
                                  </SideNavLink> 
                                )) ?? null}                 
                            </ul>
                          </li>
                        </ul> : null
                      }
                    </li>
                  </>
                ))}
              </SideNavMenu> 
            </> : null}
        </SideNavItems>
      )}
    </SideNav>
  );
}

export default AdvantageSideNav;
