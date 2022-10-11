import PlatformNotificationsContainer from "./index";

export default {
  title: "Platform/PlatformNotifications",
  component: PlatformNotificationsContainer,
  decorators: [
    (story) => (
      <div style={{ position: "absolute", left: "20rem" }}>
        {story()}
      </div>
    ),
  ],
};

export const Default = (args) => {
  return <PlatformNotificationsContainer {...args} />;
};

Default.args = {
  initialNotifications: [
    {
      creator: "Boomerang CICD",
      date: "2022-03-15T12:47:47.655+00:00",
      detail: "Outage description test for the following service(s): Boomerang Flow,Boomerang CICD",
      eventId: "620b9f7e99fcb715cbc222b3",
      id: "620ba0f354f1b83f5077dec6",
      priority: "highest",
      read: false,
      severity: "INFO",
      target: "user",
      title: "Resolved",
      type: "notification",
      userId: "61730018ae92414d2bd15b4c",
    },
  ],
  config: {
    wsUrl: "http://localhost:8080/ws",
  },
  isNotificationActive: true,
};
