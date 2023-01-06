import React from "react";
import { expect, test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import AboutPlatform from "./AboutPlatform";
import { headerModalProps } from "../../internal/helpers";


test("AboutPlatform - correct name and version rendered", () => {
  // Render new instance in every test to prevent leaking state
  const { getByText, getByRole } = render(<AboutPlatform name="Boomerang" version="1.2.1" {...headerModalProps}/>);
  const btn = getByRole("button", { name: /About the Platform/i });
  fireEvent.click(btn);
  const version = getByText(/1.2.1/i);
  const organization = getByText(/Boomerang/i);
  expect(version).toBeInTheDocument();
  expect(organization).toBeInTheDocument();
});