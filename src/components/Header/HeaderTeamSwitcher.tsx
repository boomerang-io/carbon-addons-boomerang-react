/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2025
*/

import React, { useEffect, useState } from "react";
import { UseQueryResult, useQueryClient, useMutation } from "react-query";
import { HeaderMenu as CarbonHeaderMenu, HeaderMenuItem, InlineLoading } from "@carbon/react";
import { AddAlt, CheckmarkFilled, ChevronDown, GroupAccount } from "@carbon/react/icons";
import sortBy from "lodash.sortby";
import HeaderMenu from "./HeaderMenu";
import { resolver, serviceUrl } from "../../config/servicesConfig";
import { prefix } from "../../internal/settings";
import { User } from "../../types";

const headerDropdownMenuClassname = `${prefix}--header-dropdown-menu`;
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
  menuAriaLabelRecord: string;
  menuButtonId: string;
  menuListId: string;
  navigationPlatform: any;
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
  menuAriaLabelRecord,
  menuButtonId,
  menuListId,
  navigationPlatform,
  teamsQuery,
  trackEvent,
  user,
  userTeams,
}: HeaderTeamSwitcherProps) {
  const queryClient = useQueryClient();
  const [selectedTeam, setSelectedTeam] = useState<UserTeam | null>();
  const [openAccountSubmenuId, setOpenAccountSubmenuId] = useState<string>("");
  const hasUserTeams = Boolean(userTeams);
  const showSelectTeamPurpose = navigationPlatform?.requireTeamPurpose;
  const createTeamButtonText = showSelectTeamPurpose ? "Create Team" : "Create or Join Team";
  const userTeamInstanceSwitcherDefault = user?.teamInstanceSwitcherDefault;

  const profileUrl = serviceUrl.resourceUserProfile({ baseServicesUrl });

  const { mutateAsync: mutateUserProfile, isLoading: mutateUserProfileIsLoading } = useMutation(
    resolver.patchUserProfile,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(profileUrl);
      },
    }
  );

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

    if (userHasTeams) {
      if (!userTeamInstanceSwitcherDefault) {
        if (userHasPersonalTeam) {
          handleSelectTeam({ team: personalTeam[0] });
        } else if (userHasAccountTeams) {
          handleSelectTeam({ team: accountTeams[0] });
        } else if (userHasStandardTeams) {
          handleSelectTeam({ team: standardTeams[0] });
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

  const handleTeamClick = ({ team, type }: { team: UserTeam; type: string }) => {
    if (analyticsHelpers?.navigateEventHandler && trackEvent) {
      analyticsHelpers.navigateEventHandler({
        action: `Clicked ${team.name} in Team Switcher`,
        category: "Team Switcher",
        destinationPath: `${navigationPlatform.baseEnvUrl}/launchpad/teams/${team.id}`,
        teamId: team.id,
        teamType: type,
        trackEvent,
      });
    }

    if (isLaunchpad && Boolean(history)) {
      history.push(`/teams/${team.id}`);
    } else {
      window.open(`${navigationPlatform.baseEnvUrl}/launchpad/teams/${team.id}`, "_self");
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

    let selectedTeamName = selectedTeam?.displayName ? selectedTeam.displayName : selectedTeam?.name;

    if (selectedTeamName && selectedTeamName.length > 42) {
      selectedTeamName = selectedTeamName.slice(0, 42) + "...";
    }

    return (
      <CarbonHeaderMenu
        aria-label={menuAriaLabelRecord}
        className={headerDropdownMenuClassname}
        menuLinkName={selectedTeamName ? selectedTeamName : "No team selected"}
        data-testid="header-team-switcher-menu"
      >
        <HeaderMenu aria-labelledby={menuButtonId} className={headerDropdownMenuListClassname} id={menuListId}>
          <HeaderMenuItem
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
          {personalTeam.length > 0
            ? personalTeam.map((team: UserTeam) => {
                const teamName = team.displayName ? team.displayName : team.name;
                const isTeamSelected = team.id === selectedTeam?.id;
                return (
                  <HeaderMenuItem
                    key={team.id}
                    aria-selected={isTeamSelected}
                    className={headerDropdownMenuItemContainerClassname}
                    onClick={() => handleTeamClick({ team, type: "personal" })}
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
                  <>
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
                          {isMenuSelected ? <CheckmarkFilled className={headerDropdownMenuItemIconClassname} /> : null}
                        </div>
                        <div className={headerDropdownMenuItemAccountIconsClassname}>
                          <GroupAccount className={headerDropdownMenuItemAccountGroupIconClassname} />
                          <ChevronDown className={headerDropdownMenuItemAccountChevronIconClassname} />
                        </div>
                      </div>
                    </HeaderMenuItem>
                    <div aria-expanded={isSubmenuOpen} className={headerDropdownMenuItemAccountSubmenuClassname}>
                      <HeaderMenuItem
                        aria-selected={isTeamSelected}
                        className={headerDropdownMenuItemContainerClassname}
                        onClick={() => handleTeamClick({ team, type: "account" })}
                        data-testid="header-team-switcher-menu-account-accordion-item"
                        // eslint-disable-next-line no-script-url
                        href={"javascript:void(0)"}
                      >
                        <div className={headerDropdownMenuItemClassname} style={{ paddingLeft: "1rem" }}>
                          <span title={team.nameToDisplay} className={headerDropdownMenuItemTextClassname}>
                            Account Page
                          </span>
                          {isTeamSelected ? <CheckmarkFilled className={headerDropdownMenuItemIconClassname} /> : null}
                        </div>
                      </HeaderMenuItem>
                      {team.projectTeams && team.projectTeams.length > 0
                        ? team.projectTeams.map((team: UserTeam) => {
                            const isTeamSelected = team.id === selectedTeam?.id;
                            return (
                              <HeaderMenuItem
                                key={team.id}
                                aria-selected={isTeamSelected}
                                className={headerDropdownMenuItemContainerClassname}
                                onClick={() => handleTeamClick({ team, type: "project" })}
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
                            );
                          })
                        : null}
                    </div>
                  </>
                );
              })
            : null}
          {standardTeams.length > 0
            ? sortedStandardTeamsWithNamesToDisplay.map((team: UserTeam) => {
                const isTeamSelected = team.id === selectedTeam?.id;
                return (
                  <HeaderMenuItem
                    key={team.id}
                    aria-selected={isTeamSelected}
                    className={headerDropdownMenuItemContainerClassname}
                    onClick={() => handleTeamClick({ team, type: "standard" })}
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
                );
              })
            : null}
        </HeaderMenu>
      </CarbonHeaderMenu>
    );
  }

  return null;
}
