import React from "react";
import { useQuery } from "react-query";
import cx from "classnames";
import { InlineLoading, SkeletonText, SideNavMenu, SideNavMenuItem, SwitcherDivider } from "@carbon/react";
import { Launch } from "@carbon/react/icons";
import FocusTrap from "focus-trap-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import HeaderRightPanel from "./HeaderRightPanel";
import { serviceUrl, resolver } from "../../config/servicesConfig";
import { prefix } from "../../internal/settings";
import { match, keys } from "../../internal/keyboard";

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
                <HeaderAccordionItem
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
                  <HeaderAccordionItem
                    baseLaunchEnvUrl={baseLaunchEnvUrl}
                    baseServiceUrl={baseServiceUrl}
                    isAccount={true}
                    isMember={account.isAccountTeamMember}
                    team={account}
                  />
                  {Boolean(account.projectTeams) &&
                    account.projectTeams.map((project) => (
                      <HeaderAccordionItem
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

function HeaderAccordionItem({ baseServiceUrl, baseLaunchEnvUrl, isAccount, isMember, team }) {
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
        console.log("refetching");
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

  if (!isMember) {
    return (
      <li className={`${prefix}--side-nav__item`}>
        <button disabled className={`${prefix}--side-nav__submenu`}>
          {name}
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
    >
      <SideNavMenu title={name}>
        <ServiceList baseLaunchEnvUrl={baseLaunchEnvUrl} isAccount={isAccount} servicesQuery={servicesQuery} />
      </SideNavMenu>
      {isInlineLoadingVisible && <InlineLoading />}
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
          {servicesQuery.data.map((service) => (
            <SideNavMenuItem href={service.url} {...(service.url.includes(baseLaunchEnvUrl) ? {} : externalProps)}>
              <>
                <span>{service.name}</span>
                {!service.url.includes(baseLaunchEnvUrl) && <Launch size={16} alt="Opens page in new tab" />}
              </>
            </SideNavMenuItem>
          ))}
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
