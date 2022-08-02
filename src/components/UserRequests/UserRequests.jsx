import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Button } from "@carbon/react";
import { prefix } from "../../internal/settings";



UserRequests.propTypes = {
  /**
   * base launch url, used to redirect to Launchpad
   */
  baseLaunchEnvUrl: PropTypes.string,
  /**
   * Summary of requests pending and made by user
   */
  requestSummary: PropTypes.object,
};

UserRequests.defaultProps = {
  requestSummary: {
    requireUserAction: 0,
    submittedByUser: 0,
  },
};

function UserRequests(props) {
  const { baseLaunchEnvUrl, requestSummary } = props;
  const { requireUserAction, submittedByUser } = requestSummary;
  const existOwnedRequests = requireUserAction > 0;
  const existUserRequests = submittedByUser > 0;

  return (
    <>
      <div className={`${prefix}--bmrg-header-menu-item-wrapper`} role="presentation">
        <Button
          className={`${prefix}--bmrg-header-menu-item`}
          href={`${baseLaunchEnvUrl}/launchpad/requests/action`}
          role="link"
        >
          <div>
            <p
              className={cx(`${prefix}--bmrg-requests__title`, {
                [`${prefix}--bmrg-requests-empty__title`]: !existOwnedRequests,
              })}
            >
              {existOwnedRequests ? requireUserAction : "No"} Request
              {requireUserAction > 1 || !existOwnedRequests ? "s" : ""}
            </p>
            <p className={`${prefix}--bmrg-requests__text`}>requiring your action</p>
          </div>
        </Button>
      </div>
      <div className={`${prefix}--bmrg-header-menu-item-wrapper`} role="presentation">
        <Button
          className={`${prefix}--bmrg-header-menu-item`}
          href={`${baseLaunchEnvUrl}/launchpad/requests/mine`}
          role="link"
        >
          <div>
            <p
              className={cx(`${prefix}--bmrg-requests__title`, {
                [`${prefix}--bmrg-requests-empty__title`]: !existUserRequests,
              })}
            >
              {existUserRequests ? submittedByUser : "No"} Request{submittedByUser > 1 || !existUserRequests ? "s" : ""}
            </p>
            <p className={`${prefix}--bmrg-requests__text`}>made by you are processing</p>
          </div>
        </Button>
      </div>
    </>
  );
}

export default UserRequests;
