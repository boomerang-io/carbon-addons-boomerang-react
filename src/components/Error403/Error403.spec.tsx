import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Error403 from "./Error403";

describe("Error403", () => {
  test("render with defaults", async () => {
    const { getByText } = render(<Error403  statusUrl={"https://useboomerang.io"}/>);
    expect(getByText("403 Access Forbidden")).toBeInTheDocument();
    expect(getByText(`Looks like you've taken a wrong turn.`)).toBeInTheDocument();

    expect(getByText("You shouldn’t be here - contact the local authorities if you disagree.")).toBeInTheDocument();
  });


  test("render with custom text", async () => {
    const { getByText } = render(<Error403 header="hello" title="there" message="sir" />);
    expect(getByText("hello")).toBeInTheDocument();
    expect(getByText("there")).toBeInTheDocument();
    expect(getByText("sir")).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(
      <Error403 statusUrl={"https://useboomerang.io"}/>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
