

import { Button } from "@carbon/react";

import NotificationsContainer from "./NotificationsContainer";
import ToastNotification from "./ToastNotification";
import notify from "./notify";

const about = {
  title: "Components/Notifications",
  component: ToastNotification,
};

export default about;

export const Default = () => {
  return (
    <div>
      <Button onClick={() => notify(<ToastNotification subtitle="So notification" title="Wow" kind="success" />)}>
        Create Notification
      </Button>
      <NotificationsContainer />
    </div>
  );
};
