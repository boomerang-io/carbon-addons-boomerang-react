import React from "react";
import { toast } from "react-toastify";
import { prefix } from "../../internal/settings";

import ToastNotification from "./ToastNotification";

/** Create notifcation wrapper around react-toastify with default component for basic notification
 * @param {*} notification notifcation content
 * @param {Object} config custom configuration for ToastContainer
 */
const notify = (notification: any, config?: any) => {
  // Check to see if they pass in a component or function
  // Default passing prop to Notification component

  const notificationComponent =
    typeof notification === "object" || typeof notification === "function" ? (
      notification
    ) : (
      <ToastNotification title={notification} />
    );

  toast(notificationComponent, {
    className: `${prefix}--bmrg--toast-container`,
    ...config,
  });
};

export default notify;
