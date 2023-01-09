import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import ErrorPage from "./ErrorPage";

const header = "Error";
const title = "Something is wrong";
const message = "Sorry!";

describe("ErrorPage", () => {
  test("snapshot", async () => {
    const { baseElement } = render(<ErrorPage header={header} title={title} message={message} />);
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", async () => {
    const { getByText } = render(<ErrorPage header={header} title={title} message={message} />);
    expect(getByText(header)).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<ErrorPage header={header} title={title} message={message} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
