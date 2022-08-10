import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { text } from "@storybook/addon-knobs";
import ProtectedRoute from "./ProtectedRoute";

export default {
  title: "Components/ProtectedRoute",
  component: ProtectedRoute,
  decorators: [
    (Story) => (
      <Router history={history}>
        <Story />
      </Router>
    ),
  ],
};

const history = createMemoryHistory();
const Component = () => <div>Yay, you are authorized for this page.</div>;

export const Authorized = (args) => {
  return <ProtectedRoute {...args} />;
};

Authorized.args = {
  allowedUserRoles: ["admin", "operator"],
  component: Component,
  path: "/",
  userRole: ["user", "operator"],
};

export const NotAuthorized = (args) => {
  return <ProtectedRoute {...args} />;
};

NotAuthorized.args = {
  allowedUserRoles: ["admin", "operator"],
  component: Component,
  path: "/",
  userRole: "user",
};

export const WithCustomMessage = (args) => {
  return <ProtectedRoute {...args} />;
};

WithCustomMessage.args = {
  allowedUserRoles: ["admin", "operator"],
  component: Component,
  path: "/",
  title: text("title", "custom title"),
  subtitle: text("subtitle", "custom subtitle"),
  userRole: "user",
};
