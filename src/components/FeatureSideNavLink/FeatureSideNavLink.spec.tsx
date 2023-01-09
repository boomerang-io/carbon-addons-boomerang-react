import React from "react";
import { expect, test } from "vitest";
import { MemoryRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import FeatureSideNavLink from ".";
import { Launch } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

test("FeatureSideNavLink - render correctly", async () => {
  const { getByText } = render(
    <Router>
      <FeatureSideNavLink to="/testlink">Test Link</FeatureSideNavLink>
    </Router>
  );
  expect(getByText("Test Link")).toBeInTheDocument();
});

test("FeatureSideNavLink - render with Divider", async () => {
  const { container } = render(
    <Router>
      <FeatureSideNavLink to="/testlink" hasDivider>
        Test Link
      </FeatureSideNavLink>
    </Router>
  );
  expect(container.lastChild).toHaveClass(`${prefix}--bmrg-feature-sidenav-link-divider`);
});

test("FeatureSideNavLink - render with icon", async () => {
  const { getByTestId } = render(
    <Router>
      <FeatureSideNavLink to="/testlink" icon={Launch} iconProps={{ "data-testid": "rocket-icon" }} hasDivider>
        Test Link
      </FeatureSideNavLink>
    </Router>
  );
  expect(getByTestId("rocket-icon")).toBeInTheDocument();
});
