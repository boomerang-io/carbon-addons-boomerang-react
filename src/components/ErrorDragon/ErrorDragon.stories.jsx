import ErrorDragon from "./ErrorDragon";

const statusUrl = "/status";

export default {
  title: "Errors/ErrorDragon",
  component: ErrorDragon,
};

export const Default = (args) => {
  return <ErrorDragon statusUrl={statusUrl} {...args} />;
};
