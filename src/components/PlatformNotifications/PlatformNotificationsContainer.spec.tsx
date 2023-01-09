import React from "react";
import { render, screen } from "@testing-library/react";
import { Server } from "mock-socket";
import PlatformNotificationsContainer from "./PlatformNotificationsContainer";

const baseEnvUrl = "https://localhost:8080";
const baseServicesUrl = "https://localhost:8080/services";
const mockServer = new Server(`${baseServicesUrl}/notifications/ws`);
const notificationsObj: any = {
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

mockServer.on("connection", (socket: any) => {
  socket.on("message", () => {
    setInterval(() => {
      notificationsObj.notifications[0].id = Math.round(Math.random() * 100000000); // Change for each one
      socket.send(JSON.stringify(notificationsObj));
    }, 10000);
  });
});

describe("Platform Notifications Container", () => {
  test("default", async () => {
    render(
      <PlatformNotificationsContainer
        baseEnvUrl={baseEnvUrl}
        baseServicesUrl={baseServicesUrl}
        isActive={true}
        setHasNewNotifications={() => true}
        initialNotifications={notificationsObj.notifications}
      />
    );
    expect(screen.getByText("1 new notification")).toBeInTheDocument();
    expect(screen.getByText("Mark All Read")).toBeInTheDocument();
    expect(screen.getByText("Open Notification Center")).toBeInTheDocument();
  });
});
