import React from "react";
import cx from "classnames";
import { Close } from "@carbon/react/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { prefix } from "../../internal/settings";

dayjs.extend(relativeTime);

type Props = {
  readNotification: (...args: any[]) => any;
  notificationInfo: {
    creator: string;
    date: string;
    detail: string;
    id: string;
    location: string;
    priority: string;
    read: boolean;
    severity: string;
    target: string;
    title: string;
    type: string;
    userId: string;
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
        [`--${notificationInfo.type}`]: notificationInfo.type,
      })}
      aria-label={`${notificationInfo.title} notification`}
    >
      <div className={`${prefix}--bmrg-notification-content`}>
        <div className={`${prefix}--bmrg-notification-content__creator`}>{notificationInfo.creator}</div>
        <h2 className={`${prefix}--bmrg-notification-content__title`}>{notificationInfo.title}</h2>
        <p className={`${prefix}--bmrg-notification-content__desc`}>{notificationInfo.detail}</p>
        <time className={`${prefix}--bmrg-notification-content__date`}>
          {`${dayjs(notificationInfo.date).fromNow()} at ${dayjs(notificationInfo.date).format("hh:mma")}`}
        </time>
        <button
          className={`${prefix}--bmrg-notification-content__close`}
          onClick={() => readNotification(notificationInfo.id)}
        >
          <Close size={16} alt="Mark as read icon" />
        </button>
      </div>
    </div>
  );
}

export default Notification;
