import React from 'react';
import { useQuery } from 'react-query';
import cx from 'classnames';
import { AccordionItem, InlineLoading, SideNavMenuItem } from 'carbon-components-react';
import { settings } from 'carbon-components';
import { serviceUrl, resolver } from '../../config/servicesConfig';
import { TEAM_TYPES } from "../../constants/TeamTypes";

const { prefix } = settings;

function HeaderAccordionItem({team, baseServiceUrl, type}) {

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
                <InlineLoading className={`${prefix}--bmrg-header-team-loading`} />
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
        <div className={`${prefix}--bmrg-header-team-empty`}>This team has no services</div>
      )}
    </AccordionItem>
  );
}

export default HeaderAccordionItem;
