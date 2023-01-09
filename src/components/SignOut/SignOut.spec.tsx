import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import SignOut from "./SignOut";
import { headerModalProps } from "../../internal/helpers";

describe("Signout", () => {
  test("snapshot", () => {
    const { baseElement } = render(<SignOut signOutLink="https://ibm.com" {...headerModalProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", () => {
    render(<SignOut signOutLink="https://ibm.com" {...headerModalProps} />);
    expect(screen.getByText(/Are you sure you'd like to leave us\?/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sign out/i })).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<SignOut signOutLink="https://ibm.com" {...headerModalProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
