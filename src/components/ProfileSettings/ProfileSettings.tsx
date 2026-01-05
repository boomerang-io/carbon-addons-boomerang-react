/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  ComposedModal,
  InlineNotification,
  ModalHeader,
  ModalBody,
  ModalFooter,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListSkeleton,
} from "@carbon/react";
import Avatar from "../Avatar";
import ErrorMessage from "../ErrorMessage";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import ToastNotification from "../Notifications/ToastNotification";
import notify from "../Notifications/notify";
import { serviceUrl, resolver } from "../../config/servicesConfig";
import sortBy from "lodash.sortby";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { prefix } from "../../internal/settings";
import type { LowerLevelGroup, User } from "../../types";

function determineIfConfigIsDifferent(teams: LowerLevelGroup[], initialTeams: LowerLevelGroup[]) {
  let isConfigDifferent = false;
  for (let idx = 0; idx < teams?.length; idx++) {
    if (teams[idx]?.visible !== initialTeams[idx]?.visible) {
      isConfigDifferent = true;
      break;
    }
  }
  return isConfigDifferent;
}

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  baseServicesUrl: string;
  refetchUser?: Function;
  refetchUserTeams?: Function;
  refetchNavigation?: Function;
  src: string;
  userName?: string;
};

function ProfileSettings({
  baseServicesUrl,
  refetchUser,
  refetchUserTeams,
  refetchNavigation,
  src,
  userName,
  isOpen,
  closeModal,
}: Props) {
  const queryClient = useQueryClient();
  const [initialTeams, setInitialTeams] = useState<LowerLevelGroup[]>([]);
  const [teams, setTeams] = useState<LowerLevelGroup[]>([]);

  const userUrl = serviceUrl.getLaunchpadUser({ baseServicesUrl });
  const profileUrl = serviceUrl.resourceUserProfile({ baseServicesUrl });
  const userTeamsUrl = serviceUrl.getUserTeamsServices({ baseServicesUrl });

  const {
    data: user,
    isLoading: userIsLoading,
    error: userError,
  } = useQuery<User>({
    queryKey: userUrl,
    queryFn: resolver.query(userUrl),
  });

  const {
    mutateAsync: mutateUserProfile,
    isLoading: mutateUserProfileIsLoading,
    error: mutateUserProfileError,
  } = useMutation(resolver.patchUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(userUrl);
      queryClient.invalidateQueries(profileUrl);
      queryClient.invalidateQueries(userTeamsUrl);
      if (refetchUser) {
        setTimeout(() => {
          refetchUser();
        }, 1000);
      }
      if (refetchUserTeams) {
        setTimeout(() => {
          refetchUserTeams();
        }, 1000);
      }
      if (refetchNavigation) {
        setTimeout(() => {
          refetchNavigation();
        }, 1000);
      }
    },
  });

  // Only disable when we have a user and we know that there aren' any lower level groups to manage
  const disableModal = user && user?.lowerLevelGroups === undefined;

  useEffect(() => {
    const teams = user?.lowerLevelGroups ?? [];
    setInitialTeams(teams);
    setTeams(teams);
  }, [user]);

  function handleClose() {
    closeModal();
    setTeams(initialTeams);
  }

  async function handleSubmit() {
    const body = {
      teamInstanceSwitcherDefault: null,
      lowerLevelGroups: teams,
    };

    try {
      await mutateUserProfile({ baseServicesUrl, body });
      notify(
        <ToastNotification subtitle="Successfully updated user settings" title="Update Settings" kind="success" />,
        { containerId: `${prefix}--bmrg-header-notifications` }
      );
      closeModal();
    } catch (e) {
      // noop
    }
  }

  const visibleTeamCount = teams?.filter((team) => team?.visible)?.length ?? 0;
  const allTeamsAreChecked = teams?.length === visibleTeamCount;
  const someTeamsAreChecked = visibleTeamCount > 0 && !allTeamsAreChecked;
  const isConfigDifferent = determineIfConfigIsDifferent(teams, initialTeams);

  function batchChangeTeamVisibility() {
    const updatedTeams = teams.map((team) => ({ ...team, visible: !allTeamsAreChecked }));
    setTeams(updatedTeams);
  }

  function handleUpdateTeamVisibility(id: string, checked: boolean) {
    const updatedTeams = [];
    for (let team of teams) {
      const newTeam = { ...team };
      if (newTeam.id === id) {
        newTeam.visible = checked;
      }
      updatedTeams.push(newTeam);
    }
    setTeams(updatedTeams);
  }

  if (disableModal) {
    return (
      <div className={`${prefix}--bmrg-profile-menu-user`}>
        <Avatar size="medium" src={src} userName={userName} />
        <p className={`${prefix}--bmrg-profile-menu-user__name`}> {userName ? userName : ""} </p>
      </div>
    );
  }

  return (
    <ComposedModal
      aria-label="Profile Settings"
      className={`${prefix}--bmrg-profile-settings-container ${prefix}--bmrg-header-modal`}
      open={isOpen}
      onClose={handleClose}
      preventCloseOnClickOutside={true}
    >
      <ModalHeader closeModal={handleClose} title={`User profile - ${userName}`} />
      <ModalBody style={{ maxHeight: "31.5rem" }}>
        <p className={`${prefix}--bmrg-profile-settings__title`}>
          More user profile settings will be here eventually, but for now you can choose which Teams are shown in your
          team switcher in Launchpad.
        </p>
        <h2 className={`${prefix}--bmrg-profile-settings__subtitle`}>Teams visible in Launchpad team switcher</h2>
        <p className={`${prefix}--bmrg-profile-settings__description`}>
          Choose Teams to show or hide in your Launchpad team switcher and Catalog (useful for sensitive demos). You
          will not be able to access or view unchecked Teams from the team switcher, and cannot add items to them from
          Catalog.
        </p>
        {userIsLoading ? (
          <StructuredListSkeleton />
        ) : userError ? (
          <ErrorMessage style={{ color: "#F2F4F8", padding: "1rem" }} />
        ) : teams?.length > 0 ? (
          <StructuredListWrapper className={`${prefix}--bmrg-profile-settings-list`}>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>
                  <Checkbox
                    checked={allTeamsAreChecked}
                    id={"team-name-batch-toggle"}
                    indeterminate={someTeamsAreChecked}
                    labelText={"Team Name"}
                    onChange={batchChangeTeamVisibility}
                  />
                </StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {(sortBy(teams, "name") as LowerLevelGroup[]).map(({ name, displayName, id, visible }) => (
                <StructuredListRow
                  key={id}
                  className={!visible ? `${prefix}--bmrg-profile-settings-list__row--disabled` : ""}
                >
                  <StructuredListCell>
                    <Checkbox
                      checked={visible}
                      id={id}
                      labelText={Boolean(displayName) ? displayName : name}
                      onChange={(
                        _: React.ChangeEvent<HTMLInputElement>,
                        { checked, id }: { checked: boolean; id: string }
                      ) => {
                        return handleUpdateTeamVisibility(id, checked);
                      }}
                    />
                  </StructuredListCell>
                </StructuredListRow>
              ))}
            </StructuredListBody>
          </StructuredListWrapper>
        ) : (
          <p style={{ marginTop: "3rem", color: "#F2F4F8" }}>
            No teams to configure. Join or create teams in Launchpad!
          </p>
        )}
      </ModalBody>
      <ModalFooter>
        {mutateUserProfileError && (
          <div
            style={{
              position: "absolute",
              top: "-5rem",
              left: "2rem",
              width: "90%",
            }}
          >
            <InlineNotification kind="error" title="Something's Wrong" subtitle="Failed to update user profile" />
          </div>
        )}
        <Button data-modal-primary-focus kind="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={!isConfigDifferent || mutateUserProfileIsLoading}
          kind="primary"
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {mutateUserProfileError ? "Try Again" : mutateUserProfileIsLoading ? "Saving..." : "Save changes"}
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
}

export default ProfileSettings;

function ProfileSettingsMenuItem(props: Omit<Props, "isOpen" | "closeModal">) {
  const menuItemRef = React.useRef<HTMLLinkElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      menuItemRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <HeaderMenuItem
        onClick={() => setIsOpen(!isOpen)}
        ref={menuItemRef}
        src={props.src}
        type="user"
        userName={props.userName}
      />
      <ProfileSettings isOpen={isOpen} closeModal={handleClose} {...props} />
    </>
  );
}

export { ProfileSettingsMenuItem };
