/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { Button } from "@carbon/react";

import NotificationsContainer from "./NotificationsContainer";
import ToastNotification from "./ToastNotification";
import notify from "./notify";

const about = {
  title: "Components/Notifications",
  component: ToastNotification,
};

export default about;

export const Default = (args) => {
  return (
    <div>
      <Button
        onClick={() => notify(<ToastNotification  {...args} />)}
      >
        Create Notification
      </Button>
      <NotificationsContainer containerId="test-story" />
    </div>
  );
};

Default.args = {
  subtitle: "So notification",
  title: "Wow",
  kind: "success"
}
