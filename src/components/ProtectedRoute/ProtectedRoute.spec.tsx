/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test } from "vitest";
import { MemoryRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

import ProtectedRoute from "./ProtectedRoute";


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
    <Router>
      <ProtectedRoute userRole="admin" {...props} />
    </Router>
  );
  expect(queryByText(/Test/i)).toBeInTheDocument();
  expect(queryByText(/Sorry mate, you are not allowed here/i)).not.toBeInTheDocument();
});

test("block access to unauthorized user", () => {
  const { queryByText } = render(
    <Router>
      <ProtectedRoute userRole={["user, member"]} {...props} />
    </Router>
  );
  expect(queryByText(/Test/i)).not.toBeInTheDocument();
  expect(queryByText(/Sorry mate, you are not allowed here/i)).toBeInTheDocument();
});
