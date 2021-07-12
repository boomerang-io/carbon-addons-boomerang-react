import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button } from 'carbon-components-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

UserRequests.propTypes = {

  /**
   * base launch url, used to redirect to Launchpad
   */
  baseLaunchEnvUrl: PropTypes.string,
  /**
   * Array of requests that require user's action
   */
  ownedRequests: PropTypes.array,
  /**
   * Array of requests made by the user
   */
  userRequests: PropTypes.array,
};

UserRequests.defaultProps = {
  ownedRequests: [],
  userRequests: []
}

function UserRequests(props) {

  const { baseLaunchEnvUrl, ownedRequests, userRequests } = props;
  const existOwnedRequests = ownedRequests?.length > 0;
  const existUserRequests = userRequests?.length > 0;

  return existOwnedRequests || existUserRequests ? (
    <>
      {existOwnedRequests && (
        <div className={`${prefix}--bmrg-header-menu-item-wrapper`} role="presentation">
          <Button className={`${prefix}--bmrg-header-menu-item`} href={`${baseLaunchEnvUrl}/launchpad/requests/action`} role="link">
            <div>
              <p className={`${prefix}--bmrg-requests__title`}>{ownedRequests.length} Request{ownedRequests.length > 1 ? "s": ""}</p>
              <p className={`${prefix}--bmrg-requests__text`}>requiring your action</p>
            </div>
          </Button>
        </div>
      )}
      {existUserRequests && (
        <div className={`${prefix}--bmrg-header-menu-item-wrapper`} role="presentation">
          <Button className={`${prefix}--bmrg-header-menu-item`} href={`${baseLaunchEnvUrl}/launchpad/requests/mine`} role="link">
            <div>
              <p className={`${prefix}--bmrg-requests__title`}>{userRequests.length} Request{userRequests.length > 1 ? "s": ""}</p>
              <p className={`${prefix}--bmrg-requests__text`}>made by you are processing</p>
            </div>
          </Button>
        </div>
      )}
    </>
  ) : (
  <div className={`${prefix}--bmrg-header-menu-item-wrapper`} role="presentation">
    <div className={`${prefix}--bmrg-requests-empty`}>
      <p className={`${prefix}--bmrg-requests-empty__title`}>No pending requests</p>
      <div className={`${prefix}--bmrg-notifications__notifications-footer`}>
        <a
          href={`${baseLaunchEnvUrl}/launchpad/requests/action`}
          className={`${prefix}--bmrg-notifications__notifications-redirect-link`}
        >
          Go to Requests
        </a>
      </div>
    </div>
  </div>
  );
}

export default UserRequests;