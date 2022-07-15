import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
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
import { prefix } from "../../internal/settings";
import sortBy from "lodash.sortby";

ProfileSettings.propTypes = {
  baseServiceUrl: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

function ProfileSettings({ baseServiceUrl, src, userName }) {
  const [initialTeams, setInitialTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  const [disableModal, setDisableModal] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [isSubmitting, setIsSubmitting] = useState();
  const [isLoadingError, setIsLoadingError] = useState();
  const [isSubmitError, setIsSubmitError] = useState();

  const fetchTeams = useCallback(
    ({ showLoading }) => {
      if (showLoading) {
        setIsLoading(true);
      }
      axios(`${baseServiceUrl}/launchpad/user`)
        .then((response) => {
          const teams = response.data.lowerLevelGroups;
          setTeams(teams);
          setDisableModal(response.data.lowerLevelGroups === undefined);
          setInitialTeams(teams);
        })
        .catch((err) => setIsLoadingError(err))
        .then(() => {
          setIsLoading(false);
        });
    },
    [baseServiceUrl]
  );

  useEffect(() => {
    fetchTeams({ showLoading: true });
  }, [fetchTeams]);

  function handleCloseModal({ closeModal }) {
    setIsLoadingError(false);
    setIsSubmitError(false);
    closeModal();
    fetchTeams({ showLoading: false });
  }

  function handleSubmit({ closeModal }) {
    setIsSubmitting(true);
    setIsSubmitError(false);
    axios
      .patch(`${baseServiceUrl}/users/profile`, {
        lowerLevelGroups: teams,
      })
      .then(() => {
        setIsSubmitting(false);
        notify(
          <ToastNotification subtitle="Successfully updated user settings" title="Update Settings" kind="success" />,
          { containerId: `${prefix}--bmrg-header-notifications` }
        );
        handleCloseModal({ closeModal });
      })
      .catch((err) => {
        setIsSubmitting(false);
        setIsSubmitError(true);
      });
  }

  const visibleTeamCount = teams?.filter((team) => team?.visible)?.length ?? 0;
  const allTeamsAreChecked = teams?.length === visibleTeamCount;
  const someTeamsAreChecked = visibleTeamCount > 0 && !allTeamsAreChecked;
  const isConfigDifferent = determineIfConfigIsDifferent(teams, initialTeams);

  function batchChangeTeamVisibility(action) {
    const updatedTeams = teams.map((team) => ({ ...team, visible: !allTeamsAreChecked }));
    setTeams(updatedTeams);
  }

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

  function handleUpdateTeamVisibility(id, isChecked) {
    const updatedTeams = [];
    for (let team of teams) {
      const newTeam = { ...team };
      if (newTeam.id === id) {
        newTeam.visible = isChecked;
      }
      updatedTeams.push(newTeam);
    }
    setTeams(updatedTeams);
  }

  if (disableModal)
    return (
      <div className={`${prefix}--bmrg-profile-menu-user`}>
        <Avatar size="medium" src={src} userName={userName} />
        <p className={`${prefix}--bmrg-profile-menu-user__name`}> {userName ? userName : ""} </p>
      </div>
    );

  return (
    <HeaderMenuUser className={`${prefix}--bmrg-profile-settings-container`} src={src} userName={userName}>
      {({ closeModal }) => {
        return (
          <>
            <ModalHeader closeModal={() => handleCloseModal({ closeModal })} title={`User profile - ${userName}`} />
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
              {isLoading ? (
                <StructuredListSkeleton />
              ) : isLoadingError ? (
                <ErrorMessage style={{ color: "#F2F4F8" }} />
              ) : teams?.length > 0 ? (
                <StructuredListWrapper className={`${prefix}--bmrg-profile-settings-list`}>
                  <StructuredListHead>
                    <StructuredListRow head>
                      <StructuredListCell head>
                        <Checkbox
                          checked={allTeamsAreChecked}
                          labelText={"Team Name"}
                          id={"team-name-batch-toggle"}
                          indeterminate={someTeamsAreChecked}
                          onChange={batchChangeTeamVisibility}
                        />
                      </StructuredListCell>
                    </StructuredListRow>
                  </StructuredListHead>
                  <StructuredListBody>
                    {sortBy(teams, "name").map(({ name, id, visible }) => (
                      <StructuredListRow
                        key={id}
                        className={!visible && `${prefix}--bmrg-profile-settings-list__row--disabled`}
                      >
                        <StructuredListCell>
                          <Checkbox
                            checked={visible}
                            labelText={name}
                            id={id}
                            onChange={(isChecked, id) => {
                              return handleUpdateTeamVisibility(id, isChecked);
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
              {isSubmitError && (
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
              <Button kind="secondary" onClick={() => handleCloseModal({ closeModal })}>
                Cancel
              </Button>
              <Button
                disabled={!isConfigDifferent || isSubmitting}
                kind="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit({ closeModal });
                }}
              >
                {isSubmitError ? "Try Again" : isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </HeaderMenuUser>
  );
}

export default ProfileSettings;
