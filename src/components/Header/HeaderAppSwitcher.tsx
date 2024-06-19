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
  const userTeamsUrl = serviceUrl.getUserTeams({ baseServicesUrl });
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
    const { accountTeams, standardTeams } = teamsQuery.data;
    if (accountTeams?.length || standardTeams?.length) {
      return (
        <HeaderPanel aria-label="App Switcher" className={panelClassName} expanded={isOpen} id={id} role="menu">
          <div className={cx(contentClassName, { "--is-hidden": !isOpen })}>
            {standardTeams?.map((team) => (
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
      <HeaderPanel aria-label="App Switcher" className={panelClassName} expanded={isOpen} id={id} role="menu">
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

function TeamServiceListMenu({ baseServicesUrl, baseEnvUrl, isAccount, isMember, team, triggerEvent }: TeamServiceListMenuProps) {
  const { id, name } = team;
  const [isSelected, setIsSelected] = React.useState(false);
  const teamsServicesUrl = serviceUrl.getTeamServices({ baseServicesUrl, teamId: id });

  const servicesQuery = useQuery<SimpleTeamService[]>({
    queryKey: teamsServicesUrl,
    queryFn: resolver.query(teamsServicesUrl),
    enabled: false,
  });

  async function getServices() {
    if (!servicesQuery.isFetching && !servicesQuery.data && !servicesQuery.error) {
      try {
        servicesQuery.refetch();
      } catch (e) {
        // no-op on error
      }
    }
  }

  function handleOnClick() {
    setIsSelected(true);
  }

  function handleOnKeyDown(e: React.KeyboardEvent) {
    if (match(e, keys.Enter) || match(e, keys.Space)) {
      setIsSelected(true);
    }
  }

  const isInlineLoadingVisible = isSelected && servicesQuery.isLoading;
  const isNameTruncated = name?.length > 30;

  if (!isMember) {
    return (
      <div className={`${prefix}--side-nav__item`} title={isNameTruncated ? name : undefined}>
        <button disabled className={`${prefix}--side-nav__submenu`}>
          <span className={`${prefix}--side-nav__submenu-title`}>{name}</span>
        </button>
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <ul
      className={cx(`${prefix}--bmrg-header-team`, { "--is-loading": isInlineLoadingVisible })}
      onClick={handleOnClick}
      onFocus={getServices}
      onKeyDown={handleOnKeyDown}
      onMouseOver={getServices}
      title={isNameTruncated ? name : undefined}
    >
      <SideNavMenu title={name}>
        <ServiceList baseEnvUrl={baseEnvUrl} isAccount={isAccount} servicesQuery={servicesQuery} triggerEvent={triggerEvent} />
      </SideNavMenu>
      {isInlineLoadingVisible && (
        <DelayedRender delay={200}>
          <InlineLoading />
        </DelayedRender>
      )}
    </ul>
  );
}

type ServiceListProps = {
  baseEnvUrl?: string;
  isAccount?: boolean;
  servicesQuery: UseQueryResult<SimpleTeamService[], unknown>;
  triggerEvent?: (props: any) => any;
};

function ServiceList(props: ServiceListProps) {
  const { baseEnvUrl = "", isAccount, servicesQuery, triggerEvent } = props;

  const handleLinkClick = (service: SimpleTeamService) => {
    triggerEvent && triggerEvent(service);
  };

  if (servicesQuery.error) {
    return (
      <div className={`${prefix}--bmrg-header-team__message`}>{`Failed to fetch the services for this ${
        isAccount ? "account" : "team"
      }`}</div>
    );
  }

  console.log(triggerEvent, "TRIGGER EVENT");

  if (!!servicesQuery.data) {
    if (Boolean(servicesQuery.data?.length)) {
      return (
        <>
          {servicesQuery.data.map((service) => {
            const isExternalLink = !service.url.includes(baseEnvUrl);
            const isNameTruncated = isExternalLink ? service.name.length > 28 : service.name.length > 32;
            return (
              <SideNavMenuItem
                key={service.name}
                href={service.url}
                title={isNameTruncated ? service.name : undefined}
                onClick={() => handleLinkClick(service)}
                {...(isExternalLink ? externalProps : undefined)}
              >
                <div onClick={() => handleLinkClick(service)} role="button">
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
        <div className={`${prefix}--bmrg-header-team__message`}>{`This ${
          isAccount ? "account" : "team"
        } has no services`}</div>
      );
    }
  }

  return null;
}
