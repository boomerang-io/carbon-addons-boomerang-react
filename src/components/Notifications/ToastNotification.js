import React from 'react';
import PropTypes from 'prop-types';
import { ToastNotification as CarbonToastNotification } from 'carbon-components-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const ToastNotification = ({
  closeToast, // eslint-disable-line no-unused-vars
  ...rest
}) => {
  return (
    <div className={`${prefix}--bmrg-toast-notification-container`}>
      <CarbonToastNotification {...rest} />
    </div>
  );
};

ToastNotification.propTypes = {
  /**
   * Pass in the children that will be rendered within the ToastNotification
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the notification box
   */
  className: PropTypes.string,

  closeToast: PropTypes.func,

  /**
   * Specify what state the notification represents
   */
  kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,

  /**
   * Specify the title
   */
  title: PropTypes.string.isRequired,

  /**
   * Specify the sub-title
   */
  subtitle: PropTypes.node.isRequired,

  /**
   * By default, this value is "alert". You can also provide an alternate
   * role if it makes sense from the accessibility-side
   */
  role: PropTypes.string.isRequired,

  /**
   * Specify the caption
   */
  caption: PropTypes.node,

  /**
   * Provide a function that is called when menu is closed
   */
  onCloseButtonClick: PropTypes.func,

  /**
   * Provide a description for "close" icon that can be read by screen readers
   */
  iconDescription: PropTypes.string.isRequired,

  /**
   * By default, this value is "toast". You can also provide an alternate type
   * if it makes sense for the underlying `<NotificationTextDetails>` and `<NotificationButton>`
   */
  notificationType: PropTypes.string,

  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton: PropTypes.bool,

  /**
   * Specify an optional duration the notification should be closed in
   */
  timeout: PropTypes.number,
};

ToastNotification.defaultProps = {
  kind: 'info', // altered
  title: '', // altered
  subtitle: '', // altered
  caption: false, // altered
  role: 'alert',
  notificationType: 'toast',
  iconDescription: 'closes notification',
  onCloseButtonClick: () => {},
  hideCloseButton: true, // altered
  timeout: 0,
};

export default ToastNotification;
