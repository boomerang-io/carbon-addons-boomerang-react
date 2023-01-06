import React from "react";
import { expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import { axe } from "jest-axe";

import PrivacyRedirect from "./PrivacyRedirect";

test("PrivacyRedirect - render correctly", async () => {
  render(<PrivacyRedirect isOpen baseEnvUrl="https://ibm.com" />);
  expect(screen.getByText("Our Privacy Statement")).toBeInTheDocument();
});

test("PrivacyRedirect - render pending deletion message", async () => {
  const { container } = render(<PrivacyRedirect isOpen baseEnvUrl="https://ibm.com" user={{status: "pending_deletion"}}/>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test("PrivacyRedirect - accessibility", async () => {
  const { container } = render(<PrivacyRedirect isOpen baseEnvUrl="https://ibm.com" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
