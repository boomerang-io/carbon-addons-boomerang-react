import React from "react";
import { useQuery } from "react-query";
import { HeaderPanel, SkeletonText, SideNavMenu, SideNavMenuItem, SwitcherDivider } from "@carbon/react";
import { Launch } from "@carbon/react/icons";
import ErrorMessage from "../ErrorMessage";
import cx from "classnames";
import { SimpleIdNameMap, SimpleTeamService } from "../../types";
import { resolver, serviceUrl } from "../../config/servicesConfig";
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
  templateMeteringEvent?: (props: any) => void;
  triggerEvent?: (props: any) => any;
  userTeams?: {data: any, isLoading: boolean, error: any};
};

export default function HeaderAppSwitcher({ baseServicesUrl, baseEnvUrl, id, isOpen, templateMeteringEvent, triggerEvent, userTeams }: HeaderAppSwitcherProps) {
  const hasUserTeams = Boolean(userTeams);
  const userTeamsUrl = serviceUrl.getUserTeamsServices({baseServicesUrl});
  const teamsQuery = useQuery({
    queryKey: userTeamsUrl,
    queryFn: resolver.query(userTeamsUrl, null),
    enabled: !hasUserTeams
  });

  if (userTeams?.isLoading || teamsQuery?.isLoading) {
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

  if (userTeams?.error || teamsQuery?.error) {
    return (
      <HeaderPanel aria-label="App Switcher" id={id} role="menu" className={panelClassName} expanded={isOpen}>
        <ErrorMessage className={cx(contentClassName, { "--is-hidden": !isOpen })} />
      </HeaderPanel>
    );
  }

  if (userTeams?.data || teamsQuery?.data) {
    let accountTeams, standardTeams, personalTeam : any = [];
    if(hasUserTeams) {
      accountTeams = userTeams?.data?.accountTeams;
      standardTeams = userTeams?.data?.standardTeams;
      personalTeam = userTeams?.data?.personalTeam;
    } else {
      accountTeams = teamsQuery?.data?.accountTeams;
      standardTeams = teamsQuery?.data?.standardTeams;
      personalTeam = teamsQuery?.data?.personalTeam;
    }
    
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
                templateMeteringEvent={templateMeteringEvent}
                triggerEvent={triggerEvent}
              />
            ))}
            {accountTeams?.map((account: any) => (
              <div key={account.id}>
                <SwitcherDivider />
                <TeamServiceListMenu
                  baseEnvUrl={baseEnvUrl}
                  baseServicesUrl={baseServicesUrl}
                  isAccount={true}
                  isMember={account.isAccountTeamMember}
                  team={account}
                  templateMeteringEvent={templateMeteringEvent}
                  triggerEvent={triggerEvent}
                />
                {Boolean(account.projectTeams) &&
                  account.projectTeams.map((project: any) => (
                    <TeamServiceListMenu
                      key={project.id}
                      baseEnvUrl={baseEnvUrl}
                      baseServicesUrl={baseServicesUrl}
                      isMember={true}
                      team={project}
                      templateMeteringEvent={templateMeteringEvent}
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
  templateMeteringEvent?: (props: any) => void;
  triggerEvent?: (props: any) => any;
};

function TeamServiceListMenu({ baseEnvUrl, isAccount, isMember, team, templateMeteringEvent, triggerEvent }: TeamServiceListMenuProps) {
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
        <ServiceList baseEnvUrl={baseEnvUrl} isAccount={isAccount} servicesData={services} team={team} templateMeteringEvent={templateMeteringEvent} triggerEvent={triggerEvent} />
      </SideNavMenu>
    </ul>
  );
}

type ServiceListProps = {
  baseEnvUrl?: string;
  isAccount?: boolean;
  servicesData?: Array<{name: string; url: string}>;
  team: SimpleIdNameMap;
  templateMeteringEvent?: (props: any) => void;
  triggerEvent?: (props: any) => any;
};

function ServiceList(props: ServiceListProps) {
  const { baseEnvUrl = "", isAccount, servicesData, team, templateMeteringEvent, triggerEvent } = props;

  const handleLinkClick = (service: SimpleTeamService) => {
    if (templateMeteringEvent) {
      templateMeteringEvent({ service, team });
    }
    triggerEvent && triggerEvent(service);
  };

  if (!!servicesData) {
    if (Boolean(servicesData?.length)) {
      return (
        <>
          {servicesData.map((service) => {
            const isExternalLink = typeof service?.url?.includes === "function" && !service.url.includes(baseEnvUrl);
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
                <span>{service.name}</span>
                {isExternalLink ? <Launch size={16} title="Opens page in new tab" /> : undefined}
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
