import React from "react";
import { expect, test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "@carbon/react";
import { axe } from "jest-axe";
import NotificationsContainer from "./NotificationsContainer";
import ToastNotification from "./ToastNotification";
import notify from "./notify";

describe("Notifications", () => {
  test("functional", async () => {
    const { getByText, findByText } = render(
      <div>
        <Button
          onClick={() =>
            notify(<ToastNotification subtitle="This happened" title="Something happened" kind="success" />)
          }
        >
          Try Me
        </Button>
        <NotificationsContainer containerId="test" />
      </div>
    );
    const notificationButton = getByText(/Try Me/);
    fireEvent.click(notificationButton);
    expect(await findByText(/something happened/i)).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(
      <ToastNotification subtitle="This happened" title="Something happened" kind="success" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
