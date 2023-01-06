import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Error403 from "./Error403";

test("Error403 - render with defaults", async () => {
  const { getByText } = render(<Error403 />);
  expect(getByText("403 Access Forbidden")).toBeInTheDocument();
  expect(getByText(`Looks like you've taken a wrong turn.`)).toBeInTheDocument();

  expect(getByText("You shouldn’t be here - contact the local authorities if you disagree.")).toBeInTheDocument();
});

test("Error403 - render without text", async () => {
  const { queryByText } = render(<Error403 header={null} title={null} message={null} />);
  expect(queryByText("403 Access Forbidden")).not.toBeInTheDocument();
  expect(queryByText(`Looks like you've taken a wrong turn.`)).not.toBeInTheDocument();
  expect(queryByText("You shouldn’t be here - contact the local authorities if you disagree.")).not.toBeInTheDocument();
});

test("Error403 - render with custom text", async () => {
  const { getByText } = render(<Error403 header="hello" title="there" message="sir" />);
  expect(getByText("hello")).toBeInTheDocument();
  expect(getByText("there")).toBeInTheDocument();
  expect(getByText("sir")).toBeInTheDocument();
});
