import ErrorFullPage from "./ErrorFullPage";

const statusUrl = "/support/status";

export default {
  title: "Errors/ErrorFullPage",
  component: ErrorFullPage,
};

export const Default = (args) => {
  return <ErrorFullPage statusUrl={statusUrl} {...args} />;
};

export const Boomerang = (args) => {
  return <ErrorFullPage theme="boomerang" statusUrl={statusUrl} {...args} />;
};
