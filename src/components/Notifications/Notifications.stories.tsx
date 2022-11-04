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
      {/* @ts-expect-error TS(2554): Expected 2 arguments, but got 1. */}
      <Button onClick={() => notify(<ToastNotification subtitle="So notification" title="Wow" kind="success" />)}>
        Create Notification
      </Button>
      <NotificationsContainer />
    </div>
  );
};
