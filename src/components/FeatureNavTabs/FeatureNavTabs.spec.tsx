import { expect, test } from "vitest";
import { render } from "@testing-library/react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Router } from "react-router-dom";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'hist... Remove this comment to see the full error message
import { createMemoryHistory } from "history";
import FeatureNavTab from "../FeatureNavTab";
import FeatureNavTabs from "./FeatureNavTabs";

const history = createMemoryHistory();

test("render feature nav tabs", () => {
    const { queryByText } = render(<Router history={history}>
      <FeatureNavTabs ariaLabel="Cute animals">
        <FeatureNavTab label="Polar Bear" to="/polar-bear"/>
        <FeatureNavTab label="Bee" to="/bee"/>
      </FeatureNavTabs>
    </Router>);
    (expect(queryByText(/Polar Bear/i)) as any).toBeInTheDocument();
    (expect(queryByText(/Bee/i)) as any).toBeInTheDocument();
});
