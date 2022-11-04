import { expect, test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "@carbon/react";

import NotificationsContainer from "./NotificationsContainer";
import ToastNotification from "./ToastNotification";
import notify from "./notify";

test("toast notification displays correctly when triggered", async () => {
  const { getByText, findByText } = render(
    <div>
      {/* @ts-expect-error TS(2554): Expected 2 arguments, but got 1. */}
      <Button
        onClick={() => notify(<ToastNotification subtitle="This happened" title="Something happened" kind="success" />)}
      >
        Try Me
      </Button>
      <NotificationsContainer />
    </div>
  );
  const notificationButton = getByText(/Try Me/);
  fireEvent.click(notificationButton);
  (expect(await findByText(/something happened/i)) as any).toBeInTheDocument();
});
