/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { HeaderMenuItem } from "@carbon/react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  baseEnvUrl?: string;
  summary?: {
    requireUserAction: number;
    submittedByUser: number;
  };
};

function UserRequests(props: Props) {
  const { baseEnvUrl, summary = { requireUserAction: 0, submittedByUser: 0 } } = props;
  const { requireUserAction, submittedByUser } = summary;
  const existOwnedRequests = requireUserAction > 0;
  const existUserRequests = submittedByUser > 0;

  return (
    <>
      <HeaderMenuItem href={`${baseEnvUrl}/launchpad/requests/action`} data-testid="header-owned-requests">
        <div className="cds--bmrg-requests">
          <span
            className={cx(`${prefix}--bmrg-requests__title`, {
              [`${prefix}--bmrg-requests-empty__title`]: !existOwnedRequests,
            })}
          >
            {existOwnedRequests ? requireUserAction : "No"} Request
            {requireUserAction > 1 || !existOwnedRequests ? "s" : ""}
          </span>
          <span className={`${prefix}--bmrg-requests__text`}>requiring your action</span>
        </div>
      </HeaderMenuItem>
      <HeaderMenuItem href={`${baseEnvUrl}/launchpad/requests/mine`} data-testid="header-user-requests">
        <div className="cds--bmrg-requests">
          <span
            className={cx(`${prefix}--bmrg-requests__title`, {
              [`${prefix}--bmrg-requests-empty__title`]: !existUserRequests,
            })}
          >
            {existUserRequests ? submittedByUser : "No"} Request{submittedByUser > 1 || !existUserRequests ? "s" : ""}
          </span>
          <span className={`${prefix}--bmrg-requests__text`}>made by you are processing</span>
        </div>
      </HeaderMenuItem>
    </>
  );
}

export default UserRequests;
