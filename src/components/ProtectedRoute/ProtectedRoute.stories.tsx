import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export default {
  title: "Components/ProtectedRoute",
  component: ProtectedRoute,
  parameters: {
    docs: {
      description: {
        component: "Protect react-router routes via user roles.",
      },
    },
  },
  decorators: [(story: any) => <Router history={history}>{story()}</Router>],
};

const history = createMemoryHistory();
const Component = () => <div>Yay, you are authorized to view this page.</div>;

export const Authorized = (args: any) => {
  return <ProtectedRoute {...args} />;
};

Authorized.args = {
  allowedUserRoles: ["admin", "operator"],
  component: Component,
  path: "/",
  userRole: ["user", "operator"],
};

export const NotAuthorized = (args: any) => {
  return <ProtectedRoute {...args} />;
};

NotAuthorized.args = {
  allowedUserRoles: ["admin", "operator"],
  component: Component,
  path: "/",
  userRole: "user",
};

export const WithCustomMessage = (args: any) => {
  return <ProtectedRoute {...args} />;
};

WithCustomMessage.args = {
  allowedUserRoles: ["admin", "operator"],
  component: Component,
  path: "/",
  title: "custom title",
  subtitle: "custom subtitle",
  userRole: "user",
};
