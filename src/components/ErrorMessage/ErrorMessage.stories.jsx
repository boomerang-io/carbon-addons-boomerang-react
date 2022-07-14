import ErrorMessage from "./ErrorMessage";

export default {
  title: "Errors/ErrorMessage",
  component: ErrorMessage
};

export const Default = () => {
  return <ErrorMessage />;
};

Default.story = {
  name: "default",
};
