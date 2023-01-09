import React from "react";
import { expect, test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import Feedback from "./Feedback";
import { headerModalProps } from "../../internal/helpers";

const platformName = "IBM Platform";
const sendIdeasUrl = "https://ideas.ibm.com";

describe("Feedback", () => {
  test("snapshot", async () => {
    const { baseElement } = render(
      <Feedback platformName={platformName} sendIdeasUrl={sendIdeasUrl} {...headerModalProps} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", async () => {
    const { findByText, getByRole } = render(
      <Feedback platformName={platformName} sendIdeasUrl={sendIdeasUrl} {...headerModalProps} />
    );

    expect(await findByText("We look forward to your feedback!")).toBeInTheDocument();
    fireEvent.click(getByRole("button", { name: /OK/i }));
  });

  test("a11y", async () => {
    const { container } = render(
      <Feedback platformName={platformName} sendIdeasUrl={sendIdeasUrl} {...headerModalProps} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
