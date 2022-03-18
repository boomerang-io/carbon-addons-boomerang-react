import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Close16 } from '@carbon/icons-react';
import { formatDistance, format } from 'date-fns';
import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * @param {Function} readNotification - function to be used on the delete button associated with a notification
 * notificationInfo - object containing all of the notification info returned from back end
 * @returns {Function} - renders an unread notification, displaying the info and allowing the user to remove it or mark it as "read"
 */
function Notification({ readNotification, notificationInfo }) {
  return (
    <div
      className={cx(`${prefix}--bmrg-notification`, {
        [`--${notificationInfo.type}`]: notificationInfo.type,
      })}
      aria-label={`${notificationInfo.title} notification`}
    >
      <div className={`${prefix}--bmrg-notification-content`}>
        <div className={`${prefix}--bmrg-notification-content__creator`}>
          {notificationInfo.creator}
        </div>
        <h2 className={`${prefix}--bmrg-notification-content__title`}>{notificationInfo.title}</h2>
        <p className={`${prefix}--bmrg-notification-content__desc`}>{notificationInfo.detail}</p>
        <time className={`${prefix}--bmrg-notification-content__date`}>
          {`${formatDistance(new Date(notificationInfo.date), new Date())} ago at ${format(
            notificationInfo.date,
            'hh:mma'
          )}`}
        </time>
        <button
          className={`${prefix}--bmrg-notification-content__close`}
          onClick={() => readNotification(notificationInfo.id)}
        >
          <Close16 alt="Mark as read icon" />
        </button>
      </div>
    </div>
  );
}

Notification.propTypes = {
  readNotification: PropTypes.func,
  notificationInfo: PropTypes.shape({
    creator: PropTypes.string,
    date: PropTypes.number,
    detail: PropTypes.string,
    id: PropTypes.string,
    location: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default Notification;
