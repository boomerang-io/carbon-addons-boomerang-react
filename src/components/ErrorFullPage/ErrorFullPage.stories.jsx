import ErrorFullPage from "./ErrorFullPage";

const statusUrl = "/support/status";

export default {
  title: "Errors/ErrorFullPage",
  component: ErrorFullPage,
};

export const Default = () => {
  return <ErrorFullPage statusUrl={statusUrl} />;
};

export const Boomerang = () => {
  return <ErrorFullPage theme="boomerang" statusUrl={statusUrl} />;
};
