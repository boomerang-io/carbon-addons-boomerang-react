/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2025
*/

import React, { useEffect, useState } from "react";
import { UseQueryResult, useMutation } from "react-query";
import { HeaderMenu as CarbonHeaderMenu, HeaderMenuItem, InlineLoading } from "@carbon/react";
import { AddAlt, CheckmarkFilled, ChevronDown, GroupAccount } from "@carbon/react/icons";
import sortBy from "lodash.sortby";
import HeaderMenu from "./HeaderMenu";
import { resolver } from "../../config/servicesConfig";
import { prefix } from "../../internal/settings";
import { User } from "../../types";
import { USER_PLATFORM_ROLE } from "../../constants/UserType";

const headerDropdownMenuContainerClassname = `${prefix}--header-dropdown-menu-container`;
const headerDropdownMenuLoadingClassname = `${prefix}--header-dropdown-menu-loading`;
const headerDropdownMenuSuccessClassname = `${prefix}--header-dropdown-menu-success`;
const headerDropdownMenuClassname = `${prefix}--header-dropdown-menu`;
const headerDropdownMenuContentClassname = `${prefix}--header-dropdown-menu-content`;
const headerDropdownMenuContentTextClassname = `${prefix}--header-dropdown-menu-content-text`;
const headerDropdownMenuContentIconClassname = `${prefix}--header-dropdown-menu-content-icon`;
const headerDropdownMenuListClassname = `${prefix}--bmrg-header-drop-down`;

const headerDropdownMenuItemContainerClassname = `${prefix}--header-dropdown-menu-item-container`;
const headerDropdownMenuItemClassname = `${prefix}--header-dropdown-menu-item`;
const headerDropdownMenuItemTextIconClassname = `${prefix}--header-dropdown-menu-item-text-icon`;
const headerDropdownMenuItemTextClassname = `${prefix}--header-dropdown-menu-item-text`;
const headerDropdownMenuItemIconClassname = `${prefix}--header-dropdown-menu-item-icon`;

const headerDropdownMenuItemAccountContainerClassname = `${prefix}--header-dropdown-menu-item-account-container`;
const headerDropdownMenuItemAccountClassname = `${prefix}--header-dropdown-menu-item-account`;
const headerDropdownMenuItemAccountIconsClassname = `${prefix}--header-dropdown-menu-item-account-icons`;
const headerDropdownMenuItemAccountGroupIconClassname = `${prefix}--header-dropdown-menu-item-account-group-icon`;
const headerDropdownMenuItemAccountChevronIconClassname = `${prefix}--header-dropdown-menu-item-account-chevron-icon`;

const headerDropdownMenuItemAccountSubmenuClassname = `${prefix}--header-dropdown-menu-item-account-submenu`;

const headerTeamSwitcherCreateTeamButtonContainerClassname = `${prefix}--header-team-switcher-create-team-button-container`;
const headerTeamSwitcherCreateTeamButtonClassname = `${prefix}--header-team-switcher-create-team-button`;
const headerTeamSwitcherCreateTeamButtonTextClassname = `${prefix}--header-team-switcher-create-team-button-text`;
const headerTeamSwitcherCreateTeamButtonIconClassname = `${prefix}--header-team-switcher-create-team-button-icon`;

type UserTeam = {
  id: string;
  name: string;
  displayName: string;
  nameToDisplay: string;
  projectTeams?: UserTeam[];
};

type HeaderTeamSwitcherProps = {
  analyticsHelpers?: any;
  baseServicesUrl?: string;
  createJoinTeamTrigger?: Function;
  history?: any;
  isLaunchpad: boolean;
  isLoadingTeamSwitcher?: boolean;
  isSuccessTeamSwitcher?: boolean;
  setIsSuccessTeamSwitcher?: Function;
  menuAriaLabelRecord: string;
  menuButtonId: string;
  menuListId: string;
  navigationPlatform: any;
  refetchUser?: Function;
  refetchNavigation?: Function;
  teamsQuery?: UseQueryResult<any>;
  trackEvent?: Function;
  user?: User;
  userTeams?: { data: any; isLoading: boolean; error: boolean };
};

export default function HeaderTeamSwitcher({
  analyticsHelpers,
  baseServicesUrl,
  createJoinTeamTrigger,
  history,
  isLaunchpad,
  isLoadingTeamSwitcher,
  isSuccessTeamSwitcher,
  setIsSuccessTeamSwitcher,
  menuAriaLabelRecord,
  menuButtonId,
  menuListId,
  navigationPlatform,
  refetchUser,
  refetchNavigation,
  teamsQuery,
  trackEvent,
  user,
  userTeams,
}: HeaderTeamSwitcherProps) {
  const [selectedTeam, setSelectedTeam] = useState<UserTeam | null>();
  const [openAccountSubmenuId, setOpenAccountSubmenuId] = useState<string>("");
  const hasUserTeams = Boolean(userTeams);
  const showSelectTeamPurpose = navigationPlatform?.requireTeamPurpose;
  const createTeamButtonText = showSelectTeamPurpose ? "Create Team" : "Create or Join Team";
  const userTeamInstanceSwitcherDefault = user?.teamInstanceSwitcherDefault;

  const teamLink = ({ teamId }: { teamId: string }) => {
    return `${navigationPlatform.baseEnvUrl}/launchpad/teams/${teamId}`;
  };

  const { mutateAsync: mutateUserProfile, isLoading: mutateUserProfileIsLoading } = useMutation(
    resolver.patchUserProfile,
    {
      onSuccess: () => {
        if (refetchUser) refetchUser();
        if (refetchNavigation) refetchNavigation();
      },
    }
  );

  React.useEffect(() => {
    let timer: any;
    if (isSuccessTeamSwitcher && setIsSuccessTeamSwitcher) {
      timer = setTimeout(() => {
        setIsSuccessTeamSwitcher(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [isSuccessTeamSwitcher, setIsSuccessTeamSwitcher]);

  useEffect(() => {
    let accountTeams,
      standardTeams,
      personalTeam: any = [];

    if (hasUserTeams) {
      accountTeams = userTeams?.data?.accountTeams ?? [];
      standardTeams = userTeams?.data?.standardTeams ?? [];
      personalTeam = userTeams?.data?.personalTeam ?? [];
    } else {
      accountTeams = teamsQuery?.data?.accountTeams ?? [];
      standardTeams = teamsQuery?.data?.standardTeams ?? [];
      personalTeam = teamsQuery?.data?.personalTeam ?? [];
    }

    const userHasPersonalTeam = personalTeam.length > 0;
    const userHasAccountTeams = accountTeams.length > 0;
    const userHasStandardTeams = standardTeams.length > 0;
    const userHasTeams = userHasPersonalTeam || userHasAccountTeams || userHasStandardTeams;

    const handleSelectTeam = async ({ team }: { team: UserTeam }) => {
      setSelectedTeam(team);

      if (!userTeamInstanceSwitcherDefault) {
        const body = {
          teamInstanceSwitcherDefault: team.id,
        };

        await mutateUserProfile({ baseServicesUrl, body });
      }
    };

    const handleNoTeamsToSelect = async () => {
      const body = {
        teamInstanceSwitcherDefault: null,
      };

      await mutateUserProfile({ baseServicesUrl, body });
    };

    if (userHasTeams) {
      if (!userTeamInstanceSwitcherDefault) {
        if (userHasPersonalTeam) {
          handleSelectTeam({ team: personalTeam[0] });
        } else if (userHasAccountTeams) {
          const sortedAccounts = sortBy(accountTeams, [
            (account) => (account.displayName ? account.displayName : account.name),
          ]);
          handleSelectTeam({ team: sortedAccounts[0] });
        } else if (userHasStandardTeams) {
          const sortedStandardTeams = sortBy(standardTeams, [
            (standardTeam) => (standardTeam.displayName ? standardTeam.displayName : standardTeam.name),
          ]);
          handleSelectTeam({ team: sortedStandardTeams[0] });
        }
      } else if (selectedTeam?.id !== userTeamInstanceSwitcherDefault) {
        let allProjectTeams: UserTeam[] = [];
        if (userHasAccountTeams) {
          accountTeams.forEach((team: UserTeam) => {
            if (team.projectTeams && team.projectTeams.length > 0) {
              allProjectTeams = allProjectTeams.concat(team.projectTeams);
            }
          });
        }
        const allTeams = personalTeam.concat(standardTeams, accountTeams, allProjectTeams);
        const newSelectedTeam = allTeams.find((team: UserTeam) => team.id === userTeamInstanceSwitcherDefault);
        handleSelectTeam({ team: newSelectedTeam });
      }
      // if teams data loaded but there are no teams
    } else if (
      Boolean(userTeamInstanceSwitcherDefault) &&
      ((hasUserTeams &&
        userTeams?.data?.accountTeams?.length === 0 &&
        userTeams?.data?.standardTeams?.length === 0 &&
        userTeams?.data?.personalTeam?.length === 0) ||
        (!hasUserTeams &&
          teamsQuery?.data?.accountTeams?.length === 0 &&
          teamsQuery?.data?.standardTeams?.length === 0 &&
          teamsQuery?.data?.personalTeam?.length === 0))
    ) {
      handleNoTeamsToSelect();
    } else if (userTeamInstanceSwitcherDefault === null) {
      setSelectedTeam(null);
    }
  }, [
    baseServicesUrl,
    hasUserTeams,
    mutateUserProfile,
    selectedTeam,
    teamsQuery?.data?.accountTeams,
    teamsQuery?.data?.personalTeam,
    teamsQuery?.data?.standardTeams,
    userTeamInstanceSwitcherDefault,
    userTeams?.data?.accountTeams,
    userTeams?.data?.personalTeam,
    userTeams?.data?.standardTeams,
  ]);

  const handleHeaderMenuClick = () => {
    setOpenAccountSubmenuId("");
  };

  const handleTeamClick = ({ team, type }: { team: UserTeam; type: string }) => {
    setOpenAccountSubmenuId("");
    if (analyticsHelpers?.navigateEventHandler && trackEvent) {
      analyticsHelpers.navigateEventHandler({
        action: `Clicked ${team.name} in Team Switcher`,
        category: "Team Switcher",
        destinationPath: teamLink({ teamId: team.id }),
        teamId: team.id,
        teamType: type,
        trackEvent,
      });
    }

    if (isLaunchpad && Boolean(history)) {
      history.push(`/teams/${team.id}`);
    } else {
      window.open(teamLink({ teamId: team.id }), "_self");
    }
  };

  const handleCreateJoinTeamClick = (e: any) => {
    if (analyticsHelpers?.ctaEventHandler && trackEvent) {
      analyticsHelpers.ctaEventHandler({
        category: "Team Switcher",
        CTA: "Create/Join team clicked",
        pageName: "",
        trackEvent,
      });
    }

    if (createJoinTeamTrigger) {
      createJoinTeamTrigger(e);
    } else {
      window.open(`${navigationPlatform.baseEnvUrl}/launchpad?createJoinTeam=true`, "_self");
    }
  };

  const handleOpenAccountSubmenu = ({ e, id }: { e: any; id: string }) => {
    e.stopPropagation();

    if (openAccountSubmenuId === id) {
      setOpenAccountSubmenuId("");
    } else {
      setOpenAccountSubmenuId(id);
    }
  };

  if (userTeams?.isLoading || teamsQuery?.isLoading || mutateUserProfileIsLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <InlineLoading />
      </div>
    );
  }

  if (userTeams?.data || teamsQuery?.data) {
    let accountTeams,
      standardTeams,
      personalTeam: any = [];

    if (hasUserTeams) {
      accountTeams = userTeams?.data?.accountTeams ?? [];
      standardTeams = userTeams?.data?.standardTeams ?? [];
      personalTeam = userTeams?.data?.personalTeam ?? [];
    } else {
      accountTeams = teamsQuery?.data?.accountTeams ?? [];
      standardTeams = teamsQuery?.data?.standardTeams ?? [];
      personalTeam = teamsQuery?.data?.personalTeam ?? [];
    }

    let sortedAccountTeamsWithNamesToDisplay = [];
    let sortedStandardTeamsWithNamesToDisplay = [];

    if (accountTeams?.length > 0) {
      const newAccountTeams = accountTeams.map((team: UserTeam) => {
        let newProjectTeams: UserTeam[] = [];

        if (team.projectTeams && team.projectTeams.length > 0) {
          newProjectTeams = team.projectTeams?.map((team: UserTeam) => ({
            ...team,
            nameToDisplay: team.displayName ? team.displayName : team.name,
          }));
        }

        return {
          ...team,
          nameToDisplay: team.displayName ? team.displayName : team.name,
          projectTeams: sortBy(newProjectTeams, ["nameToDisplay"]),
        };
      });
      sortedAccountTeamsWithNamesToDisplay = sortBy(newAccountTeams, ["nameToDisplay"]);
    }

    if (standardTeams?.length > 0) {
      const newStandardTeams = standardTeams.map((team: UserTeam) => {
        return {
          ...team,
          nameToDisplay: team.displayName ? team.displayName : team.name,
        };
      });
      sortedStandardTeamsWithNamesToDisplay = sortBy(newStandardTeams, ["nameToDisplay"]);
    }

    let selectedTeamName = selectedTeam?.displayName
      ? selectedTeam.displayName
      : selectedTeam?.name
      ? selectedTeam?.name
      : "No team selected";

    const isPartnerUser = Boolean(user?.type === USER_PLATFORM_ROLE.Partner);

    return (
      <div className={headerDropdownMenuContainerClassname}>
        {isLoadingTeamSwitcher ? (
          <div className={headerDropdownMenuLoadingClassname}>
            <InlineLoading />
          </div>
        ) : isSuccessTeamSwitcher ? (
          <div className={headerDropdownMenuSuccessClassname}>
            <CheckmarkFilled />
          </div>
        ) : null}
        <CarbonHeaderMenu
          id="header-team-switcher-menu"
          aria-label={menuAriaLabelRecord}
          className={headerDropdownMenuClassname}
          renderMenuContent={() => (
            <div className={headerDropdownMenuContentClassname}>
              <p title={selectedTeamName} className={headerDropdownMenuContentTextClassname}>
                {selectedTeamName}
              </p>
              <ChevronDown className={headerDropdownMenuContentIconClassname} />
            </div>
          )}
          onClick={handleHeaderMenuClick}
          data-testid="header-team-switcher-menu"
        >
          <HeaderMenu aria-labelledby={menuButtonId} className={headerDropdownMenuListClassname} id={menuListId}>
            {!isPartnerUser && (
              <HeaderMenuItem
                id="header-team-switcher-create-join-team-button"
                className={headerTeamSwitcherCreateTeamButtonContainerClassname}
                onClick={handleCreateJoinTeamClick}
                // eslint-disable-next-line no-script-url
                href={"javascript:void(0)"}
                role="menuitem"
                data-testid="header-team-switcher-create-join-team-button"
              >
                <div className={headerTeamSwitcherCreateTeamButtonClassname}>
                  <span className={headerTeamSwitcherCreateTeamButtonTextClassname}>{createTeamButtonText}</span>
                  <AddAlt className={headerTeamSwitcherCreateTeamButtonIconClassname} />
                </div>
              </HeaderMenuItem>
            )}
            {personalTeam.length > 0
              ? personalTeam.map((team: UserTeam) => {
                  const teamName = team.displayName ? team.displayName : team.name;
                  const isTeamSelected = team.id === selectedTeam?.id;
                  return (
                    <div key={team.id} id={`${team.id}-personal-menu-item-id`}>
                      <HeaderMenuItem
                        key={team.id}
                        id={`${team.id}-personal-menu-item`}
                        aria-selected={isTeamSelected}
                        className={headerDropdownMenuItemContainerClassname}
                        onClick={() => {
                          handleTeamClick({ team, type: "personal" });
                        }}
                        // eslint-disable-next-line no-script-url
                        href={"javascript:void(0)"}
                        data-testid="header-team-switcher-menu-item"
                      >
                        <div className={headerDropdownMenuItemClassname}>
                          <span title={teamName} className={headerDropdownMenuItemTextClassname}>
                            {teamName}
                          </span>
                          {isTeamSelected ? <CheckmarkFilled className={headerDropdownMenuItemIconClassname} /> : null}
                        </div>
                      </HeaderMenuItem>
                    </div>
                  );
                })
              : null}
            {accountTeams.length > 0
              ? sortedAccountTeamsWithNamesToDisplay.map((team: UserTeam) => {
                  const isSubmenuOpen = team.id === openAccountSubmenuId;
                  const isProjectTeamSelected =
                    team.projectTeams &&
                    team.projectTeams.length > 0 &&
                    team.projectTeams.some((team: UserTeam) => team.id === selectedTeam?.id);
                  const isTeamSelected = team.id === selectedTeam?.id;
                  const isMenuSelected = isTeamSelected || isProjectTeamSelected;

                  return (
                    <div key={team.id} id={`${team.id}-account-menu`}>
                      <HeaderMenuItem
                        aria-expanded={isSubmenuOpen}
                        aria-selected={isMenuSelected}
                        className={headerDropdownMenuItemAccountContainerClassname}
                        onClick={(e: any) => handleOpenAccountSubmenu({ e, id: team.id })}
                        // eslint-disable-next-line no-script-url
                        href={"javascript:void(0)"}
                        data-testid="header-team-switcher-menu-account-accordion"
                      >
                        <div className={headerDropdownMenuItemAccountClassname}>
                          <div className={headerDropdownMenuItemTextIconClassname}>
                            <span title={team.nameToDisplay} className={headerDropdownMenuItemTextClassname}>
                              {team.nameToDisplay}
                            </span>
                            {isMenuSelected ? (
                              <CheckmarkFilled className={headerDropdownMenuItemIconClassname} />
                            ) : null}
                          </div>
                          <div className={headerDropdownMenuItemAccountIconsClassname}>
                            <GroupAccount className={headerDropdownMenuItemAccountGroupIconClassname} />
                            <ChevronDown className={headerDropdownMenuItemAccountChevronIconClassname} />
                          </div>
                        </div>
                      </HeaderMenuItem>
                      <div
                        id={`${team.id}-account-submenu`}
                        key={`${team.id}-account-submenu`}
                        aria-expanded={isSubmenuOpen}
                        className={headerDropdownMenuItemAccountSubmenuClassname}
                      >
                        <HeaderMenuItem
                          key={`${team.id}-menu-item`}
                          id={`${team.id}-account-menu-item`}
                          aria-selected={isTeamSelected}
                          className={headerDropdownMenuItemContainerClassname}
                          onClick={() => {
                            handleTeamClick({ team, type: "account" });
                          }}
                          data-testid="header-team-switcher-menu-account-accordion-item"
                          // eslint-disable-next-line no-script-url
                          href={"javascript:void(0)"}
                        >
                          <div className={headerDropdownMenuItemClassname} style={{ paddingLeft: "1rem" }}>
                            <span title={team.nameToDisplay} className={headerDropdownMenuItemTextClassname}>
                              Account Page
                            </span>
                            {isTeamSelected ? (
                              <CheckmarkFilled className={headerDropdownMenuItemIconClassname} />
                            ) : null}
                          </div>
                        </HeaderMenuItem>
                        {team.projectTeams && team.projectTeams.length > 0
                          ? team.projectTeams.map((team: UserTeam) => {
                              const isTeamSelected = team.id === selectedTeam?.id;
                              return (
                                <div key={team.id} id={`${team.id}-project-menu-item`}>
                                  <HeaderMenuItem
                                    aria-selected={isTeamSelected}
                                    className={headerDropdownMenuItemContainerClassname}
                                    onClick={() => {
                                      handleTeamClick({ team, type: "project" });
                                    }}
                                    data-testid="header-team-switcher-menu-account-accordion-item"
                                    // eslint-disable-next-line no-script-url
                                    href={"javascript:void(0)"}
                                  >
                                    <div className={headerDropdownMenuItemClassname} style={{ paddingLeft: "1rem" }}>
                                      <span title={team.nameToDisplay} className={headerDropdownMenuItemTextClassname}>
                                        {team.nameToDisplay}
                                      </span>
                                      {isTeamSelected ? (
                                        <CheckmarkFilled className={headerDropdownMenuItemIconClassname} />
                                      ) : null}
                                    </div>
                                  </HeaderMenuItem>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  );
                })
              : null}
            {standardTeams.length > 0
              ? sortedStandardTeamsWithNamesToDisplay.map((team: UserTeam) => {
                  const isTeamSelected = team.id === selectedTeam?.id;
                  return (
                    <div key={team.id} id={`${team.id}-standard-menu-item`}>
                      <HeaderMenuItem
                        aria-selected={isTeamSelected}
                        className={headerDropdownMenuItemContainerClassname}
                        onClick={() => {
                          handleTeamClick({ team, type: "standard" });
                        }}
                        data-testid="header-team-switcher-menu-item"
                        // eslint-disable-next-line no-script-url
                        href={"javascript:void(0)"}
                      >
                        <div className={headerDropdownMenuItemClassname}>
                          <span title={team.nameToDisplay} className={headerDropdownMenuItemTextClassname}>
                            {team.nameToDisplay}
                          </span>
                          {isTeamSelected ? <CheckmarkFilled className={headerDropdownMenuItemIconClassname} /> : null}
                        </div>
                      </HeaderMenuItem>
                    </div>
                  );
                })
              : null}
          </HeaderMenu>
        </CarbonHeaderMenu>
      </div>
    );
  }

  return null;
}
