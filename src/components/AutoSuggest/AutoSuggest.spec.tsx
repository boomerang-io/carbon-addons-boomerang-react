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
import AutoSuggest from "./AutoSuggest";
import TextInput from "../TextInput";
import { animals } from "./AutoSuggest.stories";

const props = {
  autoSuggestions: animals,
  children: <TextInput id="suggestions" labelText="Suggestions" />,
  inputProps: {},
  onChange: () => {},
};

describe("AutoSuggest", () => {
  test("snapshot", () => {
    const { baseElement } = render(<AutoSuggest {...props} />);
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", async () => {
    render(<AutoSuggest {...props} />);
    expect(await screen.findByLabelText("Suggestions")).toBeInTheDocument();
    const input = screen.getByLabelText("Suggestions");
    userEvent.type(input, "ca");
    expect(await screen.findByText("caribou")).toBeInTheDocument();
    expect(await screen.findByText("cat")).toBeInTheDocument();
    const suggestion = screen.getByText("caribou");
    await userEvent.click(suggestion);
    expect(screen.queryByText("cat")).toBeNull();
  });

  test("a11y", async () => {
    const { container } = render(<AutoSuggest {...props} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
