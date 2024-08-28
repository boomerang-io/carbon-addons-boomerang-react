import React from "react";
import { Loading, SideNav, SideNavDivider, SideNavItems, SideNavLink , SideNavMenu, SideNavMenuItem, MenuItem, Menu, OverflowMenu, OverflowMenuItem } from "@carbon/react";
import cx from "classnames";
import { AddAlt, ChatBot, ChevronRight, GroupAccount, Home, Locked, Unlocked, UserMultiple } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";
import { SideNavTeam, SideNavAccount } from "types";

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
};

export function AdvantageSideNav(props: Props) {
  const { app, homeLink, assistantLink, defaultAssistantLink, joinCreateTrigger, isLoading, isOpen, teams, accounts, baseEnvUrl, className, ...rest } = props;
 
  return (
    <SideNav
      className={cx(`${prefix}--bmrg-advantage-sidenav-container`, className, {
        // "--left-border": border === "left",
        // "--right-border": border === "right",
        // "--small": small,
      })}
      isRail
      {...rest}
    >
      {isLoading ? <p>test loading</p> : (
        <SideNavItems>
          {homeLink ? <SideNavLink renderIcon={Home} href={homeLink} style={{fontWeight: "600"}}>Home</SideNavLink> : null}
          {assistantLink ? <SideNavLink renderIcon={ChatBot} href={assistantLink} style={{fontWeight: "400"}}>{`Start a ${defaultAssistantLink ? "" : "New "}Chat`}</SideNavLink> : null}
          {joinCreateTrigger ? <SideNavLink renderIcon={AddAlt} onClick={joinCreateTrigger} style={{fontWeight: "400"}}>Create or Join Team</SideNavLink> : null}
          <SideNavDivider />
          <SideNavMenu renderIcon={UserMultiple} title="Teams" className={`${prefix}--bmrg-advantage-sidenav-menu`}>
            {
              teams?.map(team =>(
                <>
                  <li>
                    <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-team`} renderIcon={team.privateTeam ? Locked : Unlocked} href={`${baseEnvUrl}/${app}/teams/${team.id}`}>
                      {team.name}
                      <ChevronRight />
                    </SideNavLink>
                    <ul className={`${prefix}--bmrg-advantage-sidenav-submenu`}>
                      <li className={`${prefix}--bmrg-advantage-sidenav-submenu-wrapper`}>
                        <ul className={`${prefix}--bmrg-advantage-sidenav-services-submenu`}>
                          <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-submenu-link`} href={`${baseEnvUrl}/${app}/teams/${team.id}`}>
                            {team.name}
                          </SideNavLink>
                          <SideNavDivider />
                          {team.services?.map((service, index) => (
                            <>
                              <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-submenu-link`} href={service.url}>
                                {service.name}
                              </SideNavLink>
                              {index +1 !== team.services.length ? <SideNavDivider /> : null}
                            </>
                          )) ?? null}                 
                        </ul>
                      </li>
                    </ul>
                  </li>
                </>
              )) ?? <p>No teams available</p>
            }
          </SideNavMenu>
          <SideNavDivider />
          <SideNavMenu renderIcon={GroupAccount} title="Accounts">
            {
              accounts?.map(team =>(
                <>
                  <li>
                    <SideNavLink className={`${prefix}--bmrg-advantage-sidenav-team`} renderIcon={team.privateTeam ? Locked : Unlocked} href={`${baseEnvUrl}/${app}/teams/${team.id}`}>
                      {team.name}
                    </SideNavLink>
                    <ul className={`${prefix}--bmrg-advantage-sidenav-submenu`}>
                      <li className={`${prefix}--bmrg-advantage-sidenav-submenu-wrapper`}>
                        <ul className={`${prefix}--bmrg-advantage-sidenav-services-submenu`}>
                          <SideNavLink renderIcon={team.privateTeam ? Locked : Unlocked} />
                          <SideNavLink href={`${baseEnvUrl}/${app}/teams/${team.id}`}>
                            {team.name}
                          </SideNavLink>
                            {team.teams?.map((accTeam) => (
                              <SideNavLink  href={`${baseEnvUrl}/${app}/teams/${accTeam.id}`}>
                                {accTeam.name}
                              </SideNavLink> 
                            )) ?? null}                 
                        </ul>
                      </li>
                    </ul>
                  </li>
                </>
              )) ?? <p>No accounts available</p>
            }
          </SideNavMenu>
        </SideNavItems>
      )}
    </SideNav>
  );
}

export default AdvantageSideNav;
