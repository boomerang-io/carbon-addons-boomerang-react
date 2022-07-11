import React from "react";

import { Button } from "carbon-components-react";

import NotificationsContainer from "./NotificationsContainer";
import ToastNotification from "./ToastNotification";
import notify from "./notify";

const about = {
  title: "Notifications",
};

export default about;

export const Default = () => {
  return (
    <div>
      <Button
        onClick={() => notify(<ToastNotification subtitle="This happened" title="Something happened" kind="success" />)}
      >
        Try Me
      </Button>
      <NotificationsContainer />
    </div>
  );
};

Default.story = {
  name: "default",
};
