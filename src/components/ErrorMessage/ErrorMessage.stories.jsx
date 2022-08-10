import ErrorMessage from "./ErrorMessage";

export default {
  title: "Errors/ErrorMessage",
  component: ErrorMessage,
};

export const Default = (args) => {
  return <ErrorMessage {...args} />;
};
