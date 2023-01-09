import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import FeatureNavTab from "../FeatureNavTab";
import FeatureNavTabs from "./FeatureNavTabs";


test("FeatureNavTabs - render correctly ", () => {
  const { queryByText } = render(
    <Router>
      <FeatureNavTabs ariaLabel="Cute animals">
        <FeatureNavTab label="Polar Bear" to="/polar-bear" />
        <FeatureNavTab label="Bee" to="/bee" />
      </FeatureNavTabs>
    </Router>
  );
  expect(queryByText(/Polar Bear/i)).toBeInTheDocument();
  expect(queryByText(/Bee/i)).toBeInTheDocument();
});
