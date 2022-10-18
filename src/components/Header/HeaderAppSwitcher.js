import React from "react";
import { useQuery } from "react-query";
import cx from "classnames";
import { InlineLoading, SkeletonText, SideNavMenu, SideNavMenuItem, SwitcherDivider } from "carbon-components-react";
import { Launch16 } from "@carbon/icons-react";
import FocusTrap from "focus-trap-react";
import DelayedRender from "../DelayedRender";
import ErrorMessage from "../ErrorMessage";
import HeaderRightPanel from "./HeaderRightPanel";
import { serviceUrl, resolver } from "../../config/servicesConfig";
import { settings } from 'carbon-components';
import { match, keys } from "../../internal/keyboard";

const { prefix } = settings;

const externalProps = {
  target: "_blank",
  rel: "noreferrer noopener",
};
const classNames = "--app-switcher";

export default function HeaderAppSwitcher({ baseServiceUrl, baseLaunchEnvUrl, isActive }) {
  const userTeamsUrl = serviceUrl.getUserTeams({ baseServiceUrl });
  const teamsQuery = useQuery(userTeamsUrl, resolver.query(userTeamsUrl));

  if (teamsQuery.isLoading) {
    return (
      <HeaderRightPanel className={classNames} isOpen={isActive}>
        <div className={cx(`${prefix}--bmrg-header-teams`, `--is-loading`)}>
          <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
          <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
        </div>
      </HeaderRightPanel>
    );
  }

  if (teamsQuery.error) {
    return (
      <HeaderRightPanel className={classNames} isOpen={isActive}>
        <ErrorMessage className={`${prefix}--bmrg-header-teams`} />
      </HeaderRightPanel>
    );
  }

  if (teamsQuery.data) {
    const { accountTeams, standardTeams } = teamsQuery.data;
    if (accountTeams?.length || standardTeams?.length) {
      return (
        <HeaderRightPanel className={classNames} isOpen={isActive}>
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
        </HeaderRightPanel>
      );
    }

    return (
      <HeaderRightPanel className={classNames} isOpen={isActive}>
        <div className={cx(`${prefix}--bmrg-header-teams`, "--is-empty")}>
          <h1 className={`${prefix}--bmrg-header-teams__empty-title`}>No teams</h1>
          <p className={`${prefix}--bmrg-header-teams__empty-subtitle`}>You must be new here</p>
        </div>
      </HeaderRightPanel>
    );
  }

  return null;
}

function TeamServiceListMenu({ baseServiceUrl, baseLaunchEnvUrl, isAccount, isMember, team }) {
  const { id, name } = team;
  const [isSelected, setIsSelected] = React.useState(false);
  const teamsServicesUrl = serviceUrl.getTeamServices({ baseServiceUrl, teamId: id });

  const servicesQuery = useQuery({
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

  function handleOnKeyDown(e) {
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

function ServiceList(props) {
  const { baseLaunchEnvUrl, isAccount, servicesQuery } = props;

  if (servicesQuery.error) {
    return (
      <div className={`${prefix}--bmrg-header-team__message`}>{`Failed to fetch the services for this ${
        isAccount ? "account" : "team"
      }`}</div>
    );
  }

  if (Boolean(servicesQuery.data)) {
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
                  {isExternalLink ? <Launch16 alt="Opens page in new tab" /> : undefined}
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
