import React from "react";
import { useQuery } from "react-query";
import cx from "classnames";
import { Accordion, AccordionItem, InlineLoading, SkeletonText, SwitcherDivider } from "@carbon/react";
import { Launch } from "@carbon/react/icons";
import FocusTrap from "focus-trap-react";
import HeaderRightPanel from "./HeaderRightPanel";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { serviceUrl, resolver } from "../../config/servicesConfig";
import { prefix } from "../../internal/settings";
import { keys, match } from "../../internal/keyboard";

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
        <div className={`${prefix}--bmrg-header-teams__loading`}>
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
        <ErrorMessage className={`${prefix}--bmrg-header-teams__container`} />
      </HeaderRightPanel>
    );
  }

  if (teamsQuery.data) {
    const { accountTeams, standardTeams } = teamsQuery.data;
    if (accountTeams?.length || standardTeams?.length) {
      return (
        <HeaderRightPanel className={classNames} isOpen={isActive}>
          <FocusTrap active={isActive} focusTrapOptions={{ allowOutsideClick: true }}>
            <div>
              <Accordion className={`${prefix}--bmrg-header-teams__container`}>
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
              </Accordion>
            </div>
          </FocusTrap>
        </HeaderRightPanel>
      );
    }

    return (
      <HeaderRightPanel className={classNames}>
        <div className={`${prefix}--bmrg-header-teams__container`}>
          <p className={`${prefix}--bmrg-header-team__empty-title`}>No teams</p>
          <p className={`${prefix}--bmrg-header-team__empty-subtitle`}>You must be new here</p>
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
    if (!servicesQuery.isFetching) {
      try {
        servicesQuery.refetch();
      } catch (e) {
        // no-op on error
      }
    }
  }

  // Only open or show it is loading when the user has clicked, not for background loading
  const isOpen = isSelected && Boolean(servicesQuery.data || servicesQuery.error);

  return (
    <AccordionItem
      open={isOpen}
      title={name}
      onHover={getServices}
      onFocus={getServices}
    >
      <ServiceList baseLaunchEnvUrl={baseLaunchEnvUrl} isAccount={isAccount} servicesQuery={servicesQuery} />
    </AccordionItem>

  // return (
  //   <AccordionItem
  //     open={isOpen}
  //     title={name}
  //     // This causing a lot of a11y issues bc it replaces the element and focus is lost
  //     renderToggle={(props) => {
  //       const isInitState = !servicesQuery.data && !servicesQuery.error;
  //       const { children, className, ...rest } = props;
  //       const chevronElem = children[0];
  //       const titleElem = children[1];
  //       const indicatorIcon = isShowLoading ? (
  //         <InlineLoading className={`${prefix}--bmrg-header-team__loading`} />
  //       ) : (
  //         chevronElem
  //       );

  //       return (
  //         <button
  //           {...rest}
  //           // focus the element when it is set to loading so it doesn't jump to the top
  //           autoFocus={isShowLoading}
  //           className={cx(`${prefix}--bmrg-header-team`, className)}
  //           disabled={!isMember}
  //           onFocus={() => {}}
  //           onKeyDown={(e) => {
  //             if (isInitState && (match(e, keys.Enter) || match(e, keys.Space))) {
  //               setIsSelected(true);
  //               getServices();
  //             } else {
  //               props.onKeyDown();
  //             }
  //           }}
  //           onMouseUp={isInitState ? () => setIsSelected(true) : props.onClick}
  //           onMouseOver={isInitState ? getServices : undefined}
  //         >
  //           {isMember && indicatorIcon}
  //           {titleElem}
  //         </button>
  //       );
  //     }}
  //   >
  //     <ServiceList baseLaunchEnvUrl={baseLaunchEnvUrl} isAccount={isAccount} servicesQuery={servicesQuery} />
  //   </AccordionItem>
  );
}

function ServiceList(props) {
  const { baseLaunchEnvUrl, isAccount, servicesQuery } = props;

  // Needs to be the number of services
  if (servicesQuery.isLoading) {
    return (
      <div className={`${prefix}--bmrg-header-team__empty`}>
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
      </div>
    );
  }

  if (servicesQuery.error) {
    return (
      <div className={`${prefix}--bmrg-header-team__empty`}>{`Failed to fetch the services for this ${
        isAccount ? "account" : "team"
      }`}</div>
    );
  }

  if (Boolean(servicesQuery.data)) {
    if (Boolean(servicesQuery.data?.length)) {
      return (
        <ul>
          {servicesQuery.data.map((service, index) => (
            <li className={`${prefix}--side-nav__menu-item`} key={index}>
              <a
                className={`${prefix}--side-nav__link`}
                href={service.url}
                {...(service.url.includes(baseLaunchEnvUrl) ? {} : externalProps)}
              >
                <span className={`${prefix}--side-nav__link-text`}>{service.name}</span>
                {!service.url.includes(baseLaunchEnvUrl) && <Launch size={16} alt="Opens page in new tab" />}
              </a>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <div className={`${prefix}--bmrg-header-team__empty`}>{`This ${
          isAccount ? "account" : "team"
        } has no services`}</div>
      );
    }
  }

  return null;
}
