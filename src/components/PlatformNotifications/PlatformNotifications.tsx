import React from "react";
import cx from "classnames";
import { Close } from "@carbon/react/icons";
import { formatDistance, format, parseISO } from "date-fns";
import { prefix } from "../../internal/settings";

type Props = {
  readNotification?: (...args: any[]) => any;
  notificationInfo?: {
    creator?: string;
    date?: string;
    detail?: string;
    id?: string;
    location?: string;
    title?: string;
    type?: string;
  };
};

/**
 * @param {Function} readNotification - function to be used on the delete button associated with a notification
 * notificationInfo - object containing all of the notification info returned from back end
 * @returns {Function} - renders an unread notification, displaying the info and allowing the user to remove it or mark it as "read"
 */
function Notification({ readNotification, notificationInfo }: Props) {
  return (
    <div
      className={cx(`${prefix}--bmrg-notification`, {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        [`--${notificationInfo.type}`]: notificationInfo.type,
      })}
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      aria-label={`${notificationInfo.title} notification`}
    >
      <div className={`${prefix}--bmrg-notification-content`}>
        {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
        <div className={`${prefix}--bmrg-notification-content__creator`}>{notificationInfo.creator}</div>
        {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
        <h2 className={`${prefix}--bmrg-notification-content__title`}>{notificationInfo.title}</h2>
        {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
        <p className={`${prefix}--bmrg-notification-content__desc`}>{notificationInfo.detail}</p>
        <time className={`${prefix}--bmrg-notification-content__date`}>
          {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
          {`${formatDistance(new Date(notificationInfo.date), new Date())} ago at ${format(
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            parseISO(notificationInfo.date),
            "hh:mma"
          )}`}
        </time>
        <button
          className={`${prefix}--bmrg-notification-content__close`}
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          onClick={() => readNotification(notificationInfo.id)}
        >
          <Close size={16} alt="Mark as read icon" />
        </button>
      </div>
    </div>
  );
}

export default Notification;
