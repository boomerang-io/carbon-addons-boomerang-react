import ErrorDragon from "./ErrorDragon";

const statusUrl = "/status";

export default {
  title: "Errors/ErrorDragon",
  component: ErrorDragon,
};

export const Default = () => {
  return <ErrorDragon statusUrl={statusUrl} />;
};
