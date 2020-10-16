import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Error403 from '../Error403';

const checkAuth = (userRole, allowedUserRoles) => {
  if (Array.isArray(userRole)) {
    return userRole.some((role) => allowedUserRoles.some((allowedRole) => allowedRole === role));
  }
  return allowedUserRoles.some((allowedRole) => allowedRole === userRole);
};

const ProtectedRoute = ({ allowedUserRoles, component, message, title, userRole, ...rest }) => (
  <Route {...rest}>
    {checkAuth(userRole, allowedUserRoles) ? (
      component
    ) : (
      <Error403 message={message} title={title} />
    )}
  </Route>
);

ProtectedRoute.propTypes = {
  allowedUserRoles: PropTypes.array.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  location: PropTypes.object,
  message: PropTypes.string,
  title: PropTypes.string,
  userRole: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

ProtectedRoute.defaultProps = {
  message: 'If you think you should be, contact your friendly neighborhood platform admin.',
  title: 'Sorry mate, you are not allowed here.',
};

export default ProtectedRoute;
