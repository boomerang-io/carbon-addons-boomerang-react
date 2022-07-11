import React from "react";
//eslint-disable-next-line
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { text } from "@storybook/addon-knobs";

import ProtectedRoute from "./ProtectedRoute";

const history = createMemoryHistory();

const Component = () => <div>If you see me, then you have authorization to do so.</div>;

export default {
  title: "ProtectedRoute",
};

export const Authorized = () => {
  return (
    <Router history={history}>
      <ProtectedRoute
        allowedUserRoles={["admin", "operator"]}
        component={Component}
        path="/"
        userRole={["user", "operator"]}
      />
    </Router>
  );
};

Authorized.story = {
  name: "authorized",
};

export const NotAuthorized = () => {
  return (
    <Router history={history}>
      <ProtectedRoute allowedUserRoles={["admin", "operator"]} component={Component} path="/" userRole="user" />
    </Router>
  );
};

NotAuthorized.story = {
  name: "not authorized",
};

export const WithCustomMessage = () => {
  return (
    <Router history={history}>
      <ProtectedRoute
        allowedUserRoles={["admin", "operator"]}
        component={Component}
        path="/"
        title={text("title", "custom title")}
        subtitle={text("subtitle", "custom subtitle")}
        userRole="user"
      />
    </Router>
  );
};

WithCustomMessage.story = {
  name: "with custom message",
};
