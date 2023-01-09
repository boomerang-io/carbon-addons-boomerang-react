import React from "react";
import { expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import { axe } from "jest-axe";
import PrivacyRedirect from "./PrivacyRedirect";

describe("PrivacyRedirect", () => {
  test("snapshot", async () => {
    const { baseElement } = render(<PrivacyRedirect isOpen baseEnvUrl="https://ibm.com" />);
    expect(baseElement).toMatchSnapshot();
  });

  test("default message", async () => {
    render(<PrivacyRedirect isOpen baseEnvUrl="https://ibm.com" />);
    expect(screen.getByText("Before continuing, we need you to consent to the Privacy Statement.")).toBeInTheDocument();
  });

  test("pending deletion message", async () => {
    render(<PrivacyRedirect isOpen baseEnvUrl="https://ibm.com" user={{ status: "pending_deletion" }} />);
    expect(screen.getByText(/We’re working on removing your account and personal information./)).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<PrivacyRedirect isOpen baseEnvUrl="https://ibm.com" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
