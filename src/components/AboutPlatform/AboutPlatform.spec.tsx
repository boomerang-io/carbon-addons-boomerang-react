import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import AboutPlatform from "./AboutPlatform";
import { headerModalProps } from "../../internal/helpers";

test("AboutPlatform - snapshot", async () => {
  const { baseElement } = render(<AboutPlatform name="Boomerang" version="1.2.1" {...headerModalProps} />);
  expect(baseElement).toMatchSnapshot();
});

test("AboutPlatform - correct name and version", () => {
  // Render new instance in every test to prevent leaking state
  const { getByText } = render(<AboutPlatform name="Boomerang" version="1.2.1" {...headerModalProps} />);
  const version = getByText(/1.2.1/i);
  const organization = getByText(/Boomerang/i);
  expect(version).toBeInTheDocument();
  expect(organization).toBeInTheDocument();
});

test("AboutPlatform - accessibility", async () => {
  const { container } = render(<AboutPlatform name="Boomerang" version="1.2.1" {...headerModalProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
