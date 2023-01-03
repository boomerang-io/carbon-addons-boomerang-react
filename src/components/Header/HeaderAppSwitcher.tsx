import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import cx from "classnames";
import { HeaderPanel, InlineLoading, SkeletonText, SideNavMenu, SideNavMenuItem, SwitcherDivider } from "@carbon/react";
import { Launch } from "@carbon/react/icons";
import FocusTrap from "focus-trap-react";
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
  baseServiceUrl: string;
  baseLaunchEnvUrl?: string;
  isActive?: boolean;
};

export default function HeaderAppSwitcher({ baseServiceUrl, baseLaunchEnvUrl, isActive }: HeaderAppSwitcherProps) {
  const userTeamsUrl = serviceUrl.getUserTeams({ baseServiceUrl });
  const teamsQuery = useQuery<UserTeams>(userTeamsUrl, resolver.query(userTeamsUrl));

  if (teamsQuery.isLoading) {
    return (
      <HeaderPanel className={classNames} expanded={isActive}>
        <div className={cx(`${prefix}--bmrg-header-teams`, `--is-loading`)}>
          <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
        </div>
      </HeaderPanel>
    );
  }

  if (teamsQuery.error) {
    return (
      <HeaderPanel className={classNames} expanded={isActive}>
        <ErrorMessage className={`${prefix}--bmrg-header-teams`} />
      </HeaderPanel>
    );
  }

  if (teamsQuery.data) {
    const { accountTeams, standardTeams } = teamsQuery.data;
    if (accountTeams?.length || standardTeams?.length) {
      return (
        <HeaderPanel className={classNames} expanded={isActive}>
          <FocusTrap active={isActive} focusTrapOptions={{ allowOutsideClick: true }}>
            <ul className={`${prefix}--bmrg-header-teams`}>
              {standardTeams?.map((team) => (
                <TeamServiceListMenu
                  key={team.id}
                  baseLaunchEnvUrl={baseLaunchEnvUrl}
                  baseServiceUrl={baseServiceUrl}
                  isMember={true}
                  team={team}
                />
              ))}
              {accountTeams?.map((account) => (
                <div key={account.id}>
                  <SwitcherDivider />
                  <TeamServiceListMenu
                    baseLaunchEnvUrl={baseLaunchEnvUrl}
                    baseServiceUrl={baseServiceUrl}
                    isAccount={true}
                    isMember={account.isAccountTeamMember}
                    team={account}
                  />
                  {Boolean(account.projectTeams) &&
                    account.projectTeams.map((project) => (
                      <TeamServiceListMenu
                        key={project.id}
                        baseLaunchEnvUrl={baseLaunchEnvUrl}
                        baseServiceUrl={baseServiceUrl}
                        isMember={true}
                        team={project}
                      />
                    ))}
                </div>
              ))}
            </ul>
          </FocusTrap>
        </HeaderPanel>
      );
    }

    return (
      <HeaderPanel className={classNames} expanded={isActive}>
        <div className={cx(`${prefix}--bmrg-header-teams`, "--is-empty")}>
          <h1 className={`${prefix}--bmrg-header-teams__empty-title`}>No teams</h1>
          <p className={`${prefix}--bmrg-header-teams__empty-subtitle`}>You must be new here</p>
        </div>
      </HeaderPanel>
    );
  }

  return null;
}

type TeamServiceListMenuProps = {
  baseServiceUrl: string;
  baseLaunchEnvUrl?: string;
  isAccount?: boolean;
  isMember: boolean;
  team: SimpleIdNameMap;
};

function TeamServiceListMenu({
  baseServiceUrl,
  baseLaunchEnvUrl,
  isAccount,
  isMember,
  team,
}: TeamServiceListMenuProps) {
  const { id, name } = team;
  const [isSelected, setIsSelected] = React.useState(false);
  const teamsServicesUrl = serviceUrl.getTeamServices({ baseServiceUrl, teamId: id });

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
        <ServiceList baseLaunchEnvUrl={baseLaunchEnvUrl} isAccount={isAccount} servicesQuery={servicesQuery} />
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
  baseLaunchEnvUrl?: string;
  isAccount?: boolean;
  servicesQuery: UseQueryResult<SimpleTeamService[], unknown>;
};

function ServiceList(props: ServiceListProps) {
  const { baseLaunchEnvUrl = "", isAccount, servicesQuery } = props;

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
            const isExternalLink = !service.url.includes(baseLaunchEnvUrl);
            const isNameTruncated = isExternalLink ? service.name.length > 28 : service.name.length > 32;
            return (
              <SideNavMenuItem
                href={service.url}
                title={isNameTruncated ? service.name : undefined}
                {...(isExternalLink ? externalProps : undefined)}
              >
                <>
                  <span>{service.name}</span>
                  {isExternalLink ? <Launch size={16} alt="Opens page in new tab" /> : undefined}
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
