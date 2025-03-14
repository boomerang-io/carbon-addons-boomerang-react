/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import FeatureNavTab from "./FeatureNavTab";

const props = {
  label: "Red Panda",
  to: "/test",
};

describe("FeatureNavTab", () => {
  test("functional", () => {
    const { queryByText } = render(
      <Router>
        <FeatureNavTab {...props} />
      </Router>
    );
    expect(queryByText(/Red Panda/i)).toBeInTheDocument();
  });
});