import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Button,
  Checkbox,
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
import HeaderMenuUser from "../HeaderMenuUser";
import notify from "../Notifications/notify";
import ToastNotification from "../Notifications/ToastNotification";
import { serviceUrl, resolver } from "../../config/servicesConfig";
import sortBy from "lodash.sortby";
import { prefix } from "../../internal/settings";

ProfileSettings.propTypes = {
  baseServiceUrl: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

function determineIfConfigIsDifferent(teams, initialTeams) {
  let isConfigDifferent = false;
  for (let idx = 0; idx < teams?.length; idx++) {
    if (teams[idx]?.visible !== initialTeams[idx]?.visible) {
      isConfigDifferent = true;
      break;
    }
  }
  return isConfigDifferent;
}

function ProfileSettings({ baseServiceUrl, src, userName }) {
  const queryClient = useQueryClient();

  const [initialTeams, setInitialTeams] = useState([]);
  const [teams, setTeams] = useState([]);

  const userUrl = serviceUrl.getLaunchpadUser({ baseServiceUrl });
  const profileUrl = serviceUrl.resourceUserProfile({ baseServiceUrl });

  const {
    data: user,
    isLoading: userIsLoading,
    error: userError,
  } = useQuery({
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
    },
  });

  const disableModal = user?.lowerLevelGroups === undefined;

  useEffect(() => {
    const teams = user?.lowerLevelGroups ?? [];
    setInitialTeams(teams);
    setTeams(teams);
  }, [user]);

  async function handleSubmit({ closeModal }) {
    const body = {
      lowerLevelGroups: teams,
    };

    try {
      await mutateUserProfile({ baseServiceUrl, body });
      notify(
        <ToastNotification subtitle="Successfully updated user settings" title="Update Settings" kind="success" />,
        { containerId: `${prefix}--bmrg-header-notifications` }
      );
      closeModal();
    } catch(e) {
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

  function handleUpdateTeamVisibility(id, checked) {
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
    <HeaderMenuUser className={`${prefix}--bmrg-profile-settings-container`} src={src} userName={userName} aria-label="Profile settings">
      {({ closeModal }) => {
        return (
          <>
            <ModalHeader closeModal={closeModal} title={`User profile - ${userName}`} />
            <ModalBody style={{ maxHeight: "31.5rem" }}>
              <p className={`${prefix}--bmrg-profile-settings__title`}>
                More user profile settings will be here eventually, but for now you can choose which Teams are shown in
                your sidebar in Launchpad.
              </p>
              <h2 className={`${prefix}--bmrg-profile-settings__subtitle`}>Teams visible in Launchpad sidebar</h2>
              <p className={`${prefix}--bmrg-profile-settings__description`}>
                Choose Teams to show or hide in your Launchpad sidebar and Catalog (useful for sensitive demos). You
                will not be able to access or view unchecked Teams from the sidebar, and cannot add items to them from
                Catalog.
              </p>
              {userIsLoading ? (
                <StructuredListSkeleton />
              ) : userError ? (
                <ErrorMessage style={{ color: "#F2F4F8", padding: "1rem" }} />
              ) : teams?.length > 0 ? (
                <StructuredListWrapper
                  className={`${prefix}--bmrg-profile-settings-list`}
                >
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
                    {sortBy(teams, "name").map(({ name, id, visible }) => (
                      <StructuredListRow
                        key={id}
                        className={!visible ? `${prefix}--bmrg-profile-settings-list__row--disabled` : ""}
                      >
                        <StructuredListCell>
                          <Checkbox
                            checked={visible}
                            id={id}
                            labelText={name}
                            onChange={(_, { checked, id }) => {
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
              <Button kind="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                disabled={!isConfigDifferent || mutateUserProfileIsLoading}
                kind="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit({ closeModal });
                }}
              >
                {mutateUserProfileError ? "Try Again" : mutateUserProfileIsLoading ? "Saving..." : "Save changes"}
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </HeaderMenuUser>
  );
}

export default ProfileSettings;
