import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import Avatar from "./Avatar";

describe("Avatar", () => {
  test("snapshot", () => {
    const { baseElement } = render(<Avatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" userName="Rick Deckard" />);
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", async () => {
    render(<Avatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" userName="Rick Deckard" />);
    expect(await screen.findByAltText("Avatar for Rick Deckard")).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<Avatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" userName="Rick Deckard" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
