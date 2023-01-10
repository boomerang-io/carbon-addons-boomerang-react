import React from "react";
import { expect, test } from "vitest";
import { render, screen  } from "@testing-library/react";
import { axe } from "jest-axe";
import ErrorFullPage from "./ErrorFullPage";

const statusUrl = "https://useboomerang.io";

describe("ErrorFullPage", () => {
  test("snapshot - core", async () => {
    const { baseElement } = render(<ErrorFullPage message="Try again!"/>);
    expect(baseElement).toMatchSnapshot();
  });

  test("snapshot - boomerang", async () => {
    const { baseElement } = render(<ErrorFullPage theme="boomerang" statusUrl={statusUrl} />);
    expect(baseElement).toMatchSnapshot();
  });

  test("functional - core", async () => {
    render(<ErrorFullPage statusUrl={statusUrl}/>);
    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("Something looks off, but we're getting a handle of it.")).toBeInTheDocument();
  });

  test("functional - boomerang", async () => {
    render(<ErrorFullPage statusUrl={statusUrl} />);
    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("Something looks off, but we're getting a handle of it.")).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<ErrorFullPage statusUrl={statusUrl} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
