/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import TooltipHover from "./TooltipHover";

describe("TooltipHover", () => {
  test("functional", async () => {
    const user = userEvent.setup();
    render(
      <TooltipHover content="Some nice words">
        <button>Hover me</button>
      </TooltipHover>
    );
    user.hover(screen.getByRole("button"));
    expect(await screen.findByText("Some nice words")).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(
      <TooltipHover content="Some nice words">
        <button>Hover me</button>
      </TooltipHover>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
