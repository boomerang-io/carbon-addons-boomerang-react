import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import Error403 from "../Error403";

const checkAuth = (userRole, allowedUserRoles) => {
  if (Array.isArray(userRole)) {
    return userRole.some((role) => allowedUserRoles.some((allowedRole) => allowedRole === role));
  }
  return allowedUserRoles.some((allowedRole) => allowedRole === userRole);
};

const ProtectedRoute = ({ allowedUserRoles, component, message, title, userRole, ...rest }) => (
  <Route {...rest}>
    {checkAuth(userRole, allowedUserRoles) ? component : <Error403 message={message} title={title} />}
  </Route>
);

ProtectedRoute.propTypes = {
  /**
   * Array of roles that will be checked against the provided userRole
   */
  allowedUserRoles: PropTypes.array.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  message: PropTypes.string,
  title: PropTypes.string,
  /**
   * Role checked against list of allowedUserRoles to determine access
   */
  userRole: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

ProtectedRoute.defaultProps = {
  message: "If you think you should be, contact your friendly neighborhood platform admin.",
  title: "Sorry mate, you are not allowed here.",
};

export default ProtectedRoute;
