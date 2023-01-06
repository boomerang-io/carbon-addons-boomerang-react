import React from "react";
import { expect, test } from "vitest";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import FeatureSideNavLink from ".";
import { createBrowserHistory } from "history";
import { Rocket } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

const history = createBrowserHistory();
test("FeatureSideNavLink - render correctly", async () => {
  const { getByText } = render(
    <Router history={history}>
      <FeatureSideNavLink to="/testlink">Test Link</FeatureSideNavLink>
    </Router>
  );
  expect(getByText("Test Link")).toBeInTheDocument();
});

test("FeatureSideNavLink - render with Divider", async () => {
  const { container } = render(
    <Router history={history}>
      <FeatureSideNavLink to="/testlink" hasDivider>
        Test Link
      </FeatureSideNavLink>
    </Router>
  );
  expect(container.lastChild).toHaveClass(`${prefix}--bmrg-feature-sidenav-link-divider`);
});

test("FeatureSideNavLink - render with icon", async () => {
  const { getByTestId } = render(
    <Router history={history}>
      <FeatureSideNavLink to="/testlink" icon={Rocket} iconProps={{ "data-testid": "rocket-icon" }} hasDivider>
        Test Link
      </FeatureSideNavLink>
    </Router>
  );
  expect(getByTestId("rocket-icon")).toBeInTheDocument();
});
