import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import cx from "classnames";
import { HeaderPanel, InlineLoading, SkeletonText, SideNavMenu, SideNavMenuItem, SwitcherDivider } from "@carbon/react";
import { Launch } from "@carbon/react/icons";
import DelayedRender from "../DelayedRender";
import ErrorMessage from "../ErrorMessage";
import { serviceUrl, resolver } from "../../config/servicesConfig";
import { prefix } from "../../internal/settings";
import { match, keys } from "../../internal/keyboard";
import { SimpleIdNameMap, SimpleTeamService, UserTeams } from "../../types";

const externalProps = {
  target: "_blank",
  rel: "noreferrer noopener",
};

const classNames = "--app-switcher";

type HeaderAppSwitcherProps = {
  baseEnvUrl?: string;
  baseServicesUrl: string;
  isActive?: boolean;
  id: string;
};

export default function HeaderAppSwitcher({ baseServicesUrl, baseEnvUrl, id, isActive }: HeaderAppSwitcherProps) {
  const userTeamsUrl = serviceUrl.getUserTeams({ baseServicesUrl });
  const teamsQuery = useQuery<UserTeams>(userTeamsUrl, resolver.query(userTeamsUrl));

  if (teamsQuery.isLoading) {
    return (
      <HeaderPanel aria-label="App Switcher" id={id} role="menu" className={classNames} expanded={isActive}>
        <div className={cx(`${prefix}--bmrg-header-switcher`, `--is-loading`)}>
          <SkeletonText className={`${prefix}--bmrg-header-switcher__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-switcher__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-switcher__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-switcher__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-switcher__skeleton`} />
        </div>
      </HeaderPanel>
    );
  }

  if (teamsQuery.error) {
    return (
      <HeaderPanel aria-label="App Switcher" id={id} role="menu" className={classNames} expanded={isActive}>
        <ErrorMessage className={`${prefix}--bmrg-header-switcher`} />
      </HeaderPanel>
    );
  }

  if (teamsQuery.data) {
    const { accountTeams, standardTeams } = teamsQuery.data;
    if (accountTeams?.length || standardTeams?.length) {
      return (
        <HeaderPanel aria-label="App Switcher" className={classNames} expanded={isActive} id={id} role="menu">
          <ul className={`${prefix}--bmrg-header-switcher`} style={{ display: isActive ? "block" : "none" }}>
            {standardTeams?.map((team) => (
              <TeamServiceListMenu
                key={team.id}
                baseEnvUrl={baseEnvUrl}
                baseServicesUrl={baseServicesUrl}
                isMember={true}
                team={team}
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
                />
                {Boolean(account.projectTeams) &&
                  account.projectTeams.map((project) => (
                    <TeamServiceListMenu
                      key={project.id}
                      baseEnvUrl={baseEnvUrl}
                      baseServicesUrl={baseServicesUrl}
                      isMember={true}
                      team={project}
                    />
                  ))}
              </div>
            ))}
          </ul>
        </HeaderPanel>
      );
    }

    return (
      <HeaderPanel aria-label="App Switcher" className={classNames} expanded={isActive} id={id} role="menu">
        <div className={cx(`${prefix}--bmrg-header-switcher`, "--is-empty")}>
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
};

function TeamServiceListMenu({ baseServicesUrl, baseEnvUrl, isAccount, isMember, team }: TeamServiceListMenuProps) {
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

  function handleOnKeyDown(e: any) {
    if (match(e, keys.Enter) || match(e, keys.Space)) {
      setIsSelected(true);
    }
  }

  const isInlineLoadingVisible = isSelected && servicesQuery.isLoading;
  const isNameTruncated = name?.length > 30;

  if (!isMember) {
    return (
      <li className={`${prefix}--side-nav__item`} title={isNameTruncated ? name : undefined}>
        <button disabled className={`${prefix}--side-nav__submenu`}>
          <span className={`${prefix}--side-nav__submenu-title`}>{name}</span>
        </button>
      </li>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={cx(`${prefix}--bmrg-header-team`, { "--is-loading": isInlineLoadingVisible })}
      onClick={handleOnClick}
      onFocus={getServices}
      onKeyDown={handleOnKeyDown}
      onMouseOver={getServices}
      title={isNameTruncated ? name : undefined}
    >
      <SideNavMenu title={name}>
        <ServiceList baseEnvUrl={baseEnvUrl} isAccount={isAccount} servicesQuery={servicesQuery} />
      </SideNavMenu>
      {isInlineLoadingVisible && (
        <DelayedRender delay={200}>
          <InlineLoading />
        </DelayedRender>
      )}
    </li>
  );
}

type ServiceListProps = {
  baseEnvUrl?: string;
  isAccount?: boolean;
  servicesQuery: UseQueryResult<SimpleTeamService[], unknown>;
};

function ServiceList(props: ServiceListProps) {
  const { baseEnvUrl = "", isAccount, servicesQuery } = props;

  if (servicesQuery.error) {
    return (
      <div className={`${prefix}--bmrg-header-team__message`}>{`Failed to fetch the services for this ${
        isAccount ? "account" : "team"
      }`}</div>
    );
  }

  if (!!servicesQuery.data) {
    if (Boolean(servicesQuery.data?.length)) {
      return (
        <>
          {servicesQuery.data.map((service) => {
            const isExternalLink = !service.url.includes(baseEnvUrl);
            const isNameTruncated = isExternalLink ? service.name.length > 28 : service.name.length > 32;
            return (
              <SideNavMenuItem
                href={service.url}
                title={isNameTruncated ? service.name : undefined}
                {...(isExternalLink ? externalProps : undefined)}
              >
                <>
                  <span>{service.name}</span>
                  {isExternalLink ? <Launch size={16} title="Opens page in new tab" /> : undefined}
                </>
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
