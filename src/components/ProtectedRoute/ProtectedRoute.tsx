import React from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Route } from "react-router-dom";

import Error403 from "../Error403";

const checkAuth = (userRole: any, allowedUserRoles: any) => {
  if (Array.isArray(userRole)) {
    return userRole.some((role) => allowedUserRoles.some((allowedRole: any) => allowedRole === role));
  }
  return allowedUserRoles.some((allowedRole: any) => allowedRole === userRole);
};

type OwnProtectedRouteProps = {
  allowedUserRoles: any[];
  component: (...args: any[]) => any;
  location?: any;
  message?: string;
  title?: string;
  userRole: string | any[];
};

// @ts-expect-error TS(2456): Type alias 'ProtectedRouteProps' circularly refere... Remove this comment to see the full error message
type ProtectedRouteProps = OwnProtectedRouteProps & typeof ProtectedRoute.defaultProps;

// @ts-expect-error TS(7022): 'ProtectedRoute' implicitly has type 'any' because... Remove this comment to see the full error message
const ProtectedRoute = ({ allowedUserRoles, component, message, title, userRole, ...rest }: ProtectedRouteProps) => (
  <Route {...rest}>
    {checkAuth(userRole, allowedUserRoles) ? component : <Error403 message={message} title={title} />}
  </Route>
);

ProtectedRoute.defaultProps = {
  message: "If you think you should be, contact your friendly neighborhood platform admin.",
  title: "Sorry mate, you are not allowed here.",
};

export default ProtectedRoute;
