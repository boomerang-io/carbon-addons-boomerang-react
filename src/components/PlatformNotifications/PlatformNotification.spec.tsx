import React from "react";
import { expect, test } from "vitest";
import PlatformNotifications from "./PlatformNotification";
import { screen, render } from "@testing-library/react";

const notificationsObj = {
  creator: "Boomerang CICD",
  date: "2022-03-15T12:47:47.655+00:00",
  detail: "Outage description test for the following service(s): Boomerang Flow,Boomerang CICD",
  eventId: "620b9f7e99fcb715cbc222b3",
  id: "620ba0f354f1b83f5077dec6",
  location: "",
  priority: "highest",
  read: false,
  severity: "INFO",
  target: "user",
  title: "Resolved",
  type: "notification",
  userId: "61730018ae92414d2bd15b4c",
};

describe("Platform notification", () => {
  test("Renders correctly", async () => {
    render(<PlatformNotifications data={notificationsObj} readNotification={() => void 0} />);
    expect(
      screen.getByText(notificationsObj.detail)
    ).toBeInTheDocument();
  });
});
