import React from "react";
import { Route } from "react-router-dom";

import Error403 from "../Error403";

const checkAuth = (userRole: string | string[], allowedUserRoles: string[]) => {
  if (Array.isArray(userRole)) {
    return userRole.some((role) => allowedUserRoles.some((allowedRole) => allowedRole === role));
  }
  return allowedUserRoles.some((allowedRole) => allowedRole === userRole);
};

ProtectedRoute.defaultProps = {
  message: "If you think you should be, contact your friendly neighborhood platform admin.",
  title: "Sorry mate, you are not allowed here.",
};

type OwnProtectedRouteProps = {
  allowedUserRoles: string[];
  component: (...args: any[]) => any;
  location?: any;
  message?: string;
  title?: string;
  userRole: string | string[];
};

type ProtectedRouteProps = OwnProtectedRouteProps & typeof ProtectedRoute.defaultProps;

function ProtectedRoute({ allowedUserRoles, component, message, title, userRole, ...rest }: ProtectedRouteProps) {
  return (
    <Route {...rest}>
      {checkAuth(userRole, allowedUserRoles) ? component : <Error403 message={message} title={title} />}
    </Route>
  );
}

export default ProtectedRoute;
