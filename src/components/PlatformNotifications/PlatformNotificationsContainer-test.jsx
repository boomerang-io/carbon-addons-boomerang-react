import React from "react";
import { render } from "@testing-library/react";
import { action } from "@storybook/addon-actions";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Server } from "mock-socket";

import PlatformNotificationsContainer from "./PlatformNotificationsContainer";

const mockSocketUrl = "ws://localhost:8081/ws";
const mockServer = new Server(mockSocketUrl);
const notificationsObj = {
  notifications: [
    {
      creator: "Boomerang CICD",
      date: "2022-02-15T12:47:47.655+00:00",
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
};

const mockEndptURL = "http://localhost:8000/notifications";
const mock = new MockAdapter(axios);
mock.onPut(mockEndptURL).reply(200, {});

mockServer.on("connection", (socket) => {
  socket.on("message", () => {
    setInterval(() => {
      notificationsObj.notifications[0].id = Math.round(Math.random() * 100000000); // Change for each one
      socket.send(JSON.stringify(notificationsObj));
    }, 10000);
  });
});

describe("Default Notification Container", () => {
  describe("Renders as expected", () => {
    const wrapper = render(
      <PlatformNotificationsContainer
        config={{
          wsUrl: "ws://localhost:8081/ws",
          httpUrl: "http://localhost:8000/notifications",
        }}
        isNotificationActive
        setHasNewNotifications={action("setHasNewNotifications")}
      />
    );
    it("Should Render at top level", () => {
      expect(wrapper.hasClass("cds--bmrg-notifications")).toEqual(true);
    });
  });
});
