import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { text } from "@storybook/addon-knobs";
import ProtectedRoute from "./ProtectedRoute";

export default {
  title: "Components/ProtectedRoute",
  component: ProtectedRoute,
};

const history = createMemoryHistory();
const Component = () => <div>If you see me, then you have authorization to do so.</div>;

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

export const NotAuthorized = () => {
  return (
    <Router history={history}>
      <ProtectedRoute allowedUserRoles={["admin", "operator"]} component={Component} path="/" userRole="user" />
    </Router>
  );
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
