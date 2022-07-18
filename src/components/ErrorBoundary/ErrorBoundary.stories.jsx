import ErrorDragon from "../ErrorDragon";
import ErrorBoundary from "./index";

const ErrorComponent = () => {
  throw new Error("test");
};

export default {
  title: "Errors/ErrorBoundary",
  component: ErrorBoundary,
};

export const Default = () => {
  return (
    <div style={{ height: "100vh", width: "40rem" }}>
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    </div>
  );
};

export const _ErrorDragon = () => {
  return (
    <div style={{ height: "100vh", width: "40rem" }}>
      <ErrorBoundary errorComponent={ErrorDragon}>
        <ErrorComponent />
      </ErrorBoundary>
    </div>
  );
};

_ErrorDragon.story = {
  name: "ErrorDragon",
};
