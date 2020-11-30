import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
  Checkbox,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListSkeleton,
} from 'carbon-components-react';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'carbon-components-react/lib/components/ComposedModal';
import { settings } from 'carbon-components';
import ErrorMessage from '../ErrorMessage';
import HeaderMenuUser from '../HeaderMenuUser';
import notify from '../Notifications/notify';
import ToastNotification from '../Notifications/ToastNotification';
import sortBy from 'lodash/sortBy';

const { prefix } = settings;

ProfileSettings.propTypes = {
  baseServiceUrl: PropTypes.string.isRequired,
};

function ProfileSettings({ baseServiceUrl, src, userName }) {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [isSubmitting, setIsSubmitting] = useState();
  const [isLoadingError, setIsLoadingError] = useState();
  const [isSubmitError, setIsSubmitError] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios(`${baseServiceUrl}/launchpad/users`)
      .then((response) => setTeams(response.data.lowerLevelGroups))
      .catch((err) => setIsLoadingError(err))
      .then(() => {
        setIsLoading(false);
      });
  }, [baseServiceUrl]);

  function handleSubmit({ closeModal }) {
    setIsSubmitting(true);
    console.log(teams);
    axios
      .patch(`${baseServiceUrl}/users/profile`, {
        lowerLevelGroups: teams,
      })
      .then(() => {
        setIsSubmitting(false);
        notify(
          <ToastNotification
            subtitle="Successfully update user settings"
            title="Update Settings"
            kind="success"
          />,
          { containerId: `${prefix}--bmrg-header-notifications` }
        );
        // want to clear out any error state
        setIsSubmitError(false);
        closeModal();
      })
      .catch((err) => {
        setIsSubmitting(false);
        setIsSubmitError(true);
      });
  }

  const visibleTeamCount = teams.filter((team) => team.visible).length;
  const allTeamsAreChecked = teams.length === visibleTeamCount;
  const someTeamsAreChecked = visibleTeamCount > 0 && !allTeamsAreChecked;

  function batchChangeTeamVisibility(action) {
    const updatedTeams = teams.map((team) => ({ ...team, visible: !allTeamsAreChecked }));
    setTeams(updatedTeams);
  }

  function handleUpdateTeamVisibility(id, isVisible) {
    const newTeams = [...teams];
    for (let team of newTeams) {
      if (team.id === id) {
        team.visible = isVisible;
      }
    }
    setTeams(newTeams);
  }

  return (
    <HeaderMenuUser
      className={`${prefix}--bmrg-profile-settings-container`}
      src={src}
      userName={userName}
    >
      {({ closeModal }) => {
        return (
          <>
            <ModalHeader
              closeModal={() => {
                closeModal();
                setIsLoadingError(false);
                setIsSubmitError(false);
              }}
              title="User profile"
            />
            <ModalBody style={{ position: 'relative' }}>
              <p className={`${prefix}--bmrg-profile-settings__title`}>
                More user profile settings will be here eventually, but for now you can choose which
                Teams are shown in your sidebar in Launchpad.
              </p>
              <h2 className={`${prefix}--bmrg-profile-settings__subtitle`}>
                Teams visible in Launchpad sidebar
              </h2>
              <p className={`${prefix}--bmrg-profile-settings__description`}>
                Choose Teams to show or hide in your Launchpad sidebar and Catalog (useful for
                sensitive demos). You will not be able to access or view unchecked Teams from the
                sidebar, and cannot add items to them from Catalog.
              </p>
              {isLoading ? (
                <StructuredListSkeleton />
              ) : isLoadingError ? (
                <ErrorMessage style={{ color: '#F2F4F8' }} />
              ) : (
                <StructuredListWrapper className={`${prefix}--bmrg-profile-settings-list`}>
                  <StructuredListHead>
                    <StructuredListRow head>
                      <StructuredListCell head>
                        <Checkbox
                          checked={allTeamsAreChecked}
                          labelText={'Team Name'}
                          id={'team-name-batch-toggle'}
                          indeterminate={someTeamsAreChecked}
                          onChange={batchChangeTeamVisibility}
                        />
                      </StructuredListCell>
                    </StructuredListRow>
                  </StructuredListHead>
                  <StructuredListBody>
                    {sortBy(teams, 'name').map(({ name, id, visible }) => (
                      <StructuredListRow key={id}>
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
              )}
            </ModalBody>
            <ModalFooter>
              <Button kind="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                kind="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit({ closeModal });
                }}
              >
                {isSubmitError ? 'Try Again' : isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </HeaderMenuUser>
  );
}

export default ProfileSettings;
