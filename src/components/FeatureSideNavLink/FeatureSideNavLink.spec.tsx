import { expect, test } from "vitest";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import FeatureSideNavLink from ".";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'hist... Remove this comment to see the full error message
import { createBrowserHistory } from "history";
import { Rocket } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

const history = createBrowserHistory();
test("render FeatureSideNavLink with correct class", async () => {
    const { container, getByText } = render(<Router history={history}>
      {/* @ts-expect-error TS(2322): Type '{ children: string; to: string; }' is not as... Remove this comment to see the full error message */}
      <FeatureSideNavLink to="/testlink">Test Link</FeatureSideNavLink>
    </Router>);
    (expect(container.firstChild) as any).toHaveClass(`${prefix}--bmrg-feature-sidenav-link`);
    (expect(getByText("Test Link")) as any).toHaveClass(`${prefix}--bmrg-feature-sidenav-link-content`);
});

test("render FeatureSideNavLink with Divider", async () => {
    const { container } = render(<Router history={history}>
      {/* @ts-expect-error TS(2322): Type '{ children: string; to: string; hasDivider: ... Remove this comment to see the full error message */}
      <FeatureSideNavLink to="/testlink" hasDivider>
        Test Link
      </FeatureSideNavLink>
    </Router>);
    (expect(container.lastChild) as any).toHaveClass(`${prefix}--bmrg-feature-sidenav-link-divider`);
});

test("render FeatureSideNavLink with Icon", async () => {
    const { getByTestId } = render(<Router history={history}>
      {/* @ts-expect-error TS(2322): Type '{ children: string; to: string; icon: any; i... Remove this comment to see the full error message */}
      <FeatureSideNavLink to="/testlink" icon={Rocket} iconProps={{ "data-testid": "rocket-icon" }} hasDivider>
        Test Link
      </FeatureSideNavLink>
    </Router>);
    (expect(getByTestId("rocket-icon")) as any).toBeInTheDocument();
});
