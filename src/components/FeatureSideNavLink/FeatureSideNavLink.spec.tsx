import React from "react";
import { expect, test } from "vitest";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import FeatureSideNavLink from ".";
import { createBrowserHistory } from "history";
import { Rocket } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

const history = createBrowserHistory();
test("render FeatureSideNavLink with correct class", async () => {
  const { container, getByText } = render(
    <Router history={history}>
      <FeatureSideNavLink to="/testlink">Test Link</FeatureSideNavLink>
    </Router>
  );
  (expect(container.firstChild) as any).toHaveClass(`${prefix}--bmrg-feature-sidenav-link`);
  (expect(getByText("Test Link")) as any).toHaveClass(`${prefix}--bmrg-feature-sidenav-link-content`);
});

test("render FeatureSideNavLink with Divider", async () => {
  const { container } = render(
    <Router history={history}>
      <FeatureSideNavLink to="/testlink" hasDivider>
        Test Link
      </FeatureSideNavLink>
    </Router>
  );
  (expect(container.lastChild) as any).toHaveClass(`${prefix}--bmrg-feature-sidenav-link-divider`);
});

test("render FeatureSideNavLink with Icon", async () => {
  const { getByTestId } = render(
    <Router history={history}>
      <FeatureSideNavLink to="/testlink" icon={Rocket} iconProps={{ "data-testid": "rocket-icon" }} hasDivider>
        Test Link
      </FeatureSideNavLink>
    </Router>
  );
  (expect(getByTestId("rocket-icon")) as any).toBeInTheDocument();
});
