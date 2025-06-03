/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
// import { axe } from "jest-axe";
import AboutPlatform from "./AboutPlatform";
import { headerModalProps } from "../../internal/helpers";

describe("AboutPlatform", () => {
  test("snapshot", () => {
    const { baseElement } = render(<AboutPlatform name="IBM Consulting Advantage" version="1.2.1" assistantVersion="1.0.0" agentsVersion="1.0.0" scribeFlowVersion="1.0.0" {...headerModalProps} />);
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", () => {
    // Render new instance in every test to prevent leaking state
    const { getByText } = render(<AboutPlatform name="IBM Consulting Advantage" version="1.2.1" assistantVersion="1.0.0" agentsVersion="1.0.0" scribeFlowVersion="1.0.0" {...headerModalProps} />);
    const version = getByText(/1.2.1/i);
    const organization = getByText(/IBM Consulting Advantage/i);
    expect(version).toBeInTheDocument();
    expect(organization).toBeInTheDocument();
  });

  // test("a11y", async () => {
  //   const { container } = render(<AboutPlatform name="IBM Consulting Advantage" version="1.2.1" assistantVersion="1.0.0" agentsVersion="1.0.0" scribeFlowVersion="1.0.0" {...headerModalProps} />);
  //   const results = await axe(container);
  //   expect(results).toHaveNoViolations();
  // });
});
