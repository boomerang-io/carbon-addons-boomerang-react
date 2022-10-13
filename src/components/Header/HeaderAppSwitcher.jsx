import React from "react";
import { useQuery } from "react-query";
import cx from "classnames";
import { Accordion, AccordionItem, InlineLoading, SideNavMenuItem, SkeletonText, SwitcherDivider } from "@carbon/react";
import HeaderRightPanel from "./HeaderRightPanel";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { serviceUrl, resolver } from "../../config/servicesConfig";
import { TEAM_TYPES } from "../../constants/TeamTypes";
import { prefix } from "../../internal/settings";

export default function HeaderAppSwitcher({ baseServiceUrl, isActive }) {
  const classNames = cx({
    "--is-hidden": !isActive,
    "--app-switcher": true,
  });
  const userTeamsUrl = serviceUrl.getUserTeams({ baseServiceUrl });
  const teamsQuery = useQuery(userTeamsUrl, resolver.query(userTeamsUrl));

  if (teamsQuery.isLoading) {
    return (
      <HeaderRightPanel
        content={
          <div className={`${prefix}--bmrg-header-teams__loading`}>
            <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
            <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
            <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
            <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
            <SkeletonText className={`${prefix}--bmrg-header-teams__skeleton`} />
          </div>
        }
        className={classNames}
      />
    );
  }

  if (teamsQuery.error) {
    return (
      <HeaderRightPanel
        content={<ErrorMessage className={`${prefix}--bmrg-header-teams__container`} />}
        className={classNames}
      />
    );
  }

  if (teamsQuery.data) {
    const { accountTeams, standardTeams } = teamsQuery.data;
    if (accountTeams?.length || standardTeams?.length) {
      return (
        <HeaderRightPanel
          content={
            <Accordion className={`${prefix}--bmrg-header-teams__container`}>
              {accountTeams?.map((account) => (
                <>
                  <HeaderAccordionItem team={account} baseServiceUrl={baseServiceUrl} type={TEAM_TYPES.ACCOUNT} />
                  {Boolean(account.projectTeams) &&
                    account.projectTeams.map((project) => (
                      <HeaderAccordionItem team={project} baseServiceUrl={baseServiceUrl} type={TEAM_TYPES.PROJECT} />
                    ))}
                  <SwitcherDivider />
                </>
              ))}
              {standardTeams?.map((team) => (
                <HeaderAccordionItem team={team} baseServiceUrl={baseServiceUrl} type={TEAM_TYPES.STANDARD} />
              ))}
            </Accordion>
          }
          className={classNames}
        />
      );
    }

    return (
      <HeaderRightPanel
        content={
          <div className={`${prefix}--bmrg-header-teams__container`}>
            <p className={`${prefix}--bmrg-header-team__empty-title`}>No teams</p>
            <p className={`${prefix}--bmrg-header-team__empty-subtitle`}>You must be new here</p>
          </div>
        }
        className={classNames}
      />
    );
  }

  return null;
}

function HeaderAccordionItem({ team, baseServiceUrl, type }) {
  const { id, name, isAccountTeamMember } = team;
  const [isSelected, setIsSelected] = React.useState(false);
  const teamsServicesUrl = serviceUrl.getTeamServices({ baseServiceUrl, teamId: id });

  const servicesQuery = useQuery({
    queryKey: teamsServicesUrl,
    queryFn: resolver.query(teamsServicesUrl),
    enabled: false,
  });

  async function getServices() {
    try {
      servicesQuery.refetch();
    } catch (e) {
      // handle error
    }
  }

  // Only open or show it is loading when the user has clicked, not for background loading
  const isOpen = Boolean(isSelected && servicesQuery.data);
  const isLoading = isSelected && servicesQuery.isFetching;
  const notAccountMember = type === TEAM_TYPES.ACCOUNT && !isAccountTeamMember;
  const disabled = isLoading || notAccountMember;

  return (
    <AccordionItem
      disabled={disabled}
      open={isOpen}
      title={name}
      renderToggle={
        // Use undefined when we have data to use the default toggle
        servicesQuery.data
          ? undefined
          : (props) => {
              const { children, className, ...rest } = props;
              const chevronElem = children[0];
              const titleElem = children[1];
              const indicatorIcon = isLoading ? (
                <InlineLoading className={`${prefix}--bmrg-header-team__loading`} />
              ) : (
                chevronElem
              );

              return (
                <button
                  {...rest}
                  onMouseUp={() => !notAccountMember && setIsSelected(true)}
                  onMouseOver={getServices}
                  onFocus={getServices}
                  className={cx(`${prefix}--bmrg-header-team`, className, { "--disabled": notAccountMember })}
                >
                  {!notAccountMember && indicatorIcon}
                  {titleElem}
                </button>
              );
            }
      }
    >
      {!servicesQuery.error && Boolean(servicesQuery.data?.length) ? (
        servicesQuery.data.map((service) => <SideNavMenuItem href={service.url}>{service.name}</SideNavMenuItem>)
      ) : (
        <div className={`${prefix}--bmrg-header-team__empty`}>This team has no services</div>
      )}
    </AccordionItem>
  );
}
