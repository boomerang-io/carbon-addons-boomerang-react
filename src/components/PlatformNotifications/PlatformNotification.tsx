/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2026
*/

import React from "react";
import cx from "classnames";
import { Close } from "@carbon/react/icons";
import DOMPurify from "dompurify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { prefix } from "../../internal/settings";
import type { PlatformNotification } from "../../types";

dayjs.extend(relativeTime);

type Props = {
  readNotification: (id: string) => void;
  data: PlatformNotification;
  onActionClick?: (data: PlatformNotification) => void;
};

function Notification({ readNotification, data, onActionClick }: Props) {
  const migrationEligibility = data.metadata?.migrationEligibility;
  return (
    <div
      className={cx(`${prefix}--bmrg-notification`, {
        [`--${data.type}`]: data.type,
      })}
      aria-label={`${data.title} notification`}
    >
      <div className={`${prefix}--bmrg-notification-content`}>
        <div className={`${prefix}--bmrg-notification-content__creator`}>{data.creator}</div>
        <h2 className={`${prefix}--bmrg-notification-content__title`}>{data.title}</h2>
        <p
          className={`${prefix}--bmrg-notification-content__desc`}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.detail) }}
        />
        {migrationEligibility !== undefined && (
          <button
            type="button"
            className={`${prefix}--bmrg-notification-content__action`}
            onClick={() => onActionClick?.(data)}
          >
            {migrationEligibility ? "Begin Migration" : "View Details"}
          </button>
        )}
        <time className={`${prefix}--bmrg-notification-content__date`}>
          {`${dayjs(data.date).fromNow()} at ${dayjs(data.date).format("hh:mma")}`}
        </time>
        <button
          className={`${prefix}--bmrg-notification-content__close`}
          onClick={() => readNotification(data.id)}
          aria-label="Mark as read"
        >
          <Close size={16} title="Mark as read icon" />
        </button>
      </div>
    </div>
  );
}

export default Notification;
