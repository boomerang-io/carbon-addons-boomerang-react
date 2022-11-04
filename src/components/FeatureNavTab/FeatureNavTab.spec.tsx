import { expect, test } from "vitest";
import { render } from "@testing-library/react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Router } from "react-router-dom";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'hist... Remove this comment to see the full error message
import { createMemoryHistory } from "history";
import FeatureNavTab from "./FeatureNavTab";

const history = createMemoryHistory();

const props = {
  label: "Red Panda",
  to: "/test",
};

test("render feature nav tab", () => {
    const { queryByText } = render(<Router history={history}>
      <FeatureNavTab {...props}/>
    </Router>);
    (expect(queryByText(/Red Panda/i)) as any).toBeInTheDocument();
});
