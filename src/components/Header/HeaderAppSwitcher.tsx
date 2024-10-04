import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { HeaderPanel, InlineLoading, SkeletonText, SideNavMenu, SideNavMenuItem, SwitcherDivider } from "@carbon/react";
import { Launch } from "@carbon/react/icons";
import DelayedRender from "../DelayedRender";
import ErrorMessage from "../ErrorMessage";
import cx from "classnames";
import { serviceUrl, resolver } from "../../config/servicesConfig";
import { match, keys } from "../../internal/keyboard";
import { SimpleIdNameMap, SimpleTeamService, UserTeams } from "../../types";
import { prefix } from "../../internal/settings";

const externalProps = {
  target: "_blank",
  rel: "noreferrer noopener",
};

const panelClassName = `${prefix}--bmrg-header-switcher-panel`;
const contentClassName = `${prefix}--bmrg-header-switcher`;
const skeletonClassName = `${prefix}--bmrg-header-switcher__skeleton`;

type HeaderAppSwitcherProps = {
  baseEnvUrl?: string;
  baseServicesUrl: string;
  id: string;
  isOpen?: boolean;
  triggerEvent?: (props: any) => any;
};

export default function HeaderAppSwitcher({ baseServicesUrl, baseEnvUrl, id, isOpen, triggerEvent }: HeaderAppSwitcherProps) {
  const userTeamsUrl = serviceUrl.getUserTeamsServices({ baseServicesUrl });
  const teamsQuery = useQuery<UserTeams>(userTeamsUrl, resolver.query(userTeamsUrl));

  if (teamsQuery.isLoading) {
    return (
      <HeaderPanel aria-label="App Switcher" className={panelClassName} expanded={isOpen} id={id} role="menu">
        <div className={cx(contentClassName, "--is-loading", { "--is-hidden": !isOpen })}>
          <SkeletonText className={skeletonClassName} />
          <SkeletonText className={skeletonClassName} />
          <SkeletonText className={skeletonClassName} />
          <SkeletonText className={skeletonClassName} />
          <SkeletonText className={skeletonClassName} />
        </div>
      </HeaderPanel>
    );
  }

  if (teamsQuery.error) {
    return (
      <HeaderPanel aria-label="App Switcher" id={id} role="menu" className={panelClassName} expanded={isOpen}>
        <ErrorMessage className={cx(contentClassName, { "--is-hidden": !isOpen })} />
      </HeaderPanel>
    );
  }

  if (teamsQuery.data) {
    const { accountTeams, standardTeams, personalTeam } = teamsQuery.data;
    if (accountTeams?.length || standardTeams?.length) {
      return (
        <HeaderPanel aria-label="App Switcher" className={panelClassName} data-testid="header-app-switcher" expanded={isOpen} id={id} role="menu">
          <div className={cx(contentClassName, { "--is-hidden": !isOpen })}>
            {[...personalTeam, ...standardTeams].map((team) => (
              <TeamServiceListMenu
                key={team.id}
                baseEnvUrl={baseEnvUrl}
                baseServicesUrl={baseServicesUrl}
                isMember={true}
                team={team}
                triggerEvent={triggerEvent}
              />
            ))}
            {accountTeams?.map((account) => (
              <div key={account.id}>
                <SwitcherDivider />
                <TeamServiceListMenu
                  baseEnvUrl={baseEnvUrl}
                  baseServicesUrl={baseServicesUrl}
                  isAccount={true}
                  isMember={account.isAccountTeamMember}
                  team={account}
                  triggerEvent={triggerEvent}
                />
                {Boolean(account.projectTeams) &&
                  account.projectTeams.map((project) => (
                    <TeamServiceListMenu
                      key={project.id}
                      baseEnvUrl={baseEnvUrl}
                      baseServicesUrl={baseServicesUrl}
                      isMember={true}
                      team={project}
                      triggerEvent={triggerEvent}
                    />
                  ))}
              </div>
            ))}
          </div>
        </HeaderPanel>
      );
    }

    return (
      <HeaderPanel aria-label="App Switcher" className={panelClassName} data-testid="header-app-switcher" expanded={isOpen} id={id} role="menu">
        <div className={cx(contentClassName, "--is-empty", { "--is-hidden": !isOpen })}>
          <h1 className={`${prefix}--bmrg-header-switcher__empty-title`}>No teams</h1>
          <p className={`${prefix}--bmrg-header-switcher__empty-subtitle`}>You must be new here</p>
        </div>
      </HeaderPanel>
    );
  }

  return null;
}

type TeamServiceListMenuProps = {
  baseServicesUrl: string;
  baseEnvUrl?: string;
  isAccount?: boolean;
  isMember: boolean;
  team: SimpleIdNameMap;
  triggerEvent?: (props: any) => any;
};

function TeamServiceListMenu({ baseEnvUrl, isAccount, isMember, team, triggerEvent }: TeamServiceListMenuProps) {
  const { name, displayName, services } = team;

  const nameToDisplay = displayName ? displayName : name;
  const isNameTruncated = nameToDisplay?.length > 30;

  if (!isMember) {
    return (
      <div className={`${prefix}--side-nav__item`} title={isNameTruncated ? nameToDisplay : undefined}>
        <button disabled className={`${prefix}--side-nav__submenu`} data-testid="header-app-switcher-service">
          <span className={`${prefix}--side-nav__submenu-title`}>{nameToDisplay}</span>
        </button>
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <ul
      className={`${prefix}--bmrg-header-team`}
      title={isNameTruncated ? nameToDisplay : undefined}
    >
      <SideNavMenu title={nameToDisplay}>
        <ServiceList baseEnvUrl={baseEnvUrl} isAccount={isAccount} servicesData={services} triggerEvent={triggerEvent} />
      </SideNavMenu>
    </ul>
  );
}

type ServiceListProps = {
  baseEnvUrl?: string;
  isAccount?: boolean;
  servicesData?: Array<{name: string; url: string}>;
  triggerEvent?: (props: any) => any;
};

function ServiceList(props: ServiceListProps) {
  const { baseEnvUrl = "", isAccount, servicesData, triggerEvent } = props;

  const handleLinkClick = (service: SimpleTeamService) => {
    triggerEvent && triggerEvent(service);
  };

  if (!!servicesData) {
    if (Boolean(servicesData?.length)) {
      return (
        <>
          {servicesData.map((service) => {
            const isExternalLink = !service.url.includes(baseEnvUrl);
            const isNameTruncated = isExternalLink ? service.name.length > 28 : service.name.length > 32;
            return (
              <SideNavMenuItem
                key={service.name}
                href={service.url}
                title={isNameTruncated ? service.name : undefined}
                onClick={() => handleLinkClick(service)}
                data-testid="header-app-switcher-service"
                {...(isExternalLink ? externalProps : undefined)}
              >
                <div onClick={() => handleLinkClick(service)} onKeyDown={() => handleLinkClick(service)} tabIndex={0} role="button">
                  <span>{service.name}</span>
                  {isExternalLink ? <Launch size={16} title="Opens page in new tab" /> : undefined}
                </div>
              </SideNavMenuItem>
            );
          })}
        </>
      );
    } else {
      return (
        <div className={`${prefix}--bmrg-header-team__message`} data-testid="header-app-switcher-service">{`This ${
          isAccount ? "account" : "team"
        } has no services`}</div>
      );
    }
  }

  return null;
}
