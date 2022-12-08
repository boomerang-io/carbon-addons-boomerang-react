import React from "react";
import { expect, test } from "vitest";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

import ProtectedRoute from "./ProtectedRoute";

const history = createMemoryHistory();

function DivTest() {
  return <div>test</div>;
}

const props = {
  allowedUserRoles: ["admin", "operator"],
  component: DivTest,
  path: "/",
};

test("render component for authorized user", () => {
  const { queryByText } = render(
    <Router history={history}>
      <ProtectedRoute userRole="admin" {...props} />
    </Router>
  );
  (expect(queryByText(/Test/i)) as any).toBeInTheDocument();
  (expect(queryByText(/Sorry mate, you are not allowed here/i)).not as any).toBeInTheDocument();
});

test("block access to unauthorized user", () => {
  const { queryByText } = render(
    <Router history={history}>
      <ProtectedRoute userRole={["user, member"]} {...props} />
    </Router>
  );
  (expect(queryByText(/Test/i)).not as any).toBeInTheDocument();
  (expect(queryByText(/Sorry mate, you are not allowed here/i)) as any).toBeInTheDocument();
});
