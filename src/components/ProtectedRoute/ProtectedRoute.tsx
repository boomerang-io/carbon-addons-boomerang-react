/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { Route, RouteProps } from "react-router-dom";

import Error403 from "../Error403";

const checkAuth = (userRole: string | string[], allowedUserRoles: string[]) => {
  if (Array.isArray(userRole)) {
    return userRole.some((role) => allowedUserRoles.some((allowedRole) => allowedRole === role));
  }
  return allowedUserRoles.some((allowedRole) => allowedRole === userRole);
};

type Props = Omit<RouteProps, "component"> & {
  allowedUserRoles: string[];
  component: React.ReactNode;
  message?: string;
  title?: string;
  userRole: string | string[];
};

function ProtectedRoute({
  allowedUserRoles,
  component,
  message = "If you think you should be, contact your friendly neighborhood platform admin.",
  title = "Sorry mate, you are not allowed here.",
  userRole,
  ...rest
}: Props) {
  return (
    <Route {...rest}>
      {checkAuth(userRole, allowedUserRoles) ? component : <Error403 message={message} title={title} />}
    </Route>
  );
}

export default ProtectedRoute;
