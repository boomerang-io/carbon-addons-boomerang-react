import ErrorDragon from "../ErrorDragon";
import ErrorBoundary from "./index";

const ThrowComponent = () => {
  throw new Error("test");
};

export default {
  title: "Errors/ErrorBoundary",
  component: ErrorBoundary,
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "40rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = (args) => {
  return (
    <ErrorBoundary {...args}>
      <ThrowComponent />
    </ErrorBoundary>
  );
};

export const _ErrorDragon = (args) => {
  return (
    <ErrorBoundary errorComponent={ErrorDragon} {...args}>
      <ThrowComponent />
    </ErrorBoundary>
  );
};

_ErrorDragon.story = {
  name: "ErrorDragon",
};
