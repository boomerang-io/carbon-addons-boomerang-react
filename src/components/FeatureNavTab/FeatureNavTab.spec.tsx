import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import FeatureNavTab from "./FeatureNavTab";


const props = {
  label: "Red Panda",
  to: "/test",
};

test("FeatureNavTab - render correctly", () => {
  const { queryByText } = render(
    <Router>
      <FeatureNavTab {...props} />
    </Router>
  );
  expect(queryByText(/Red Panda/i)).toBeInTheDocument();
});
