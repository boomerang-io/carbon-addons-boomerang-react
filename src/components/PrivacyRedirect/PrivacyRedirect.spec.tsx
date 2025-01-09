/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import { axe } from "jest-axe";
import PrivacyRedirect from "./PrivacyRedirect";

describe("PrivacyRedirect", () => {
  test("snapshot", async () => {
    const { baseElement } = render(<PrivacyRedirect isOpen baseEnvUrl="https://useboomerang.io" />);
    expect(baseElement).toMatchSnapshot();
  });

  test("default message", async () => {
    render(<PrivacyRedirect isOpen baseEnvUrl="https://useboomerang.io" />);
    expect(screen.getByText("Before continuing, we need you to consent to the Privacy Statement.")).toBeInTheDocument();
  });

  test("pending deletion message", async () => {
    render(<PrivacyRedirect isOpen baseEnvUrl="https://useboomerang.io" user={{ status: "pending_deletion" }} />);
    expect(screen.getByText(/We’re working on removing your account and personal information./)).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<PrivacyRedirect isOpen baseEnvUrl="https://useboomerang.io" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
