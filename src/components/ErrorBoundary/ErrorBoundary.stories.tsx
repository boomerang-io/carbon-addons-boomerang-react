import React from "react";
import ErrorPageCore from "../ErrorPageCore";
import ErrorDragon from "../ErrorDragon";
import ErrorBoundary from "./index";

const ThrowComponent = () => {
  throw new Error("test");
};

export default {
  title: "Errors/ErrorBoundary",
  component: ErrorBoundary,
  parameters: {
    docs: {
      description: {
        component: "Catches and renders fallback component on uncaught error using 'getDerivedStateFromError'",
      },
    },
  },
  decorators: [(Story: any) => <Story />],
};

export const Default = (args: any) => {
  return (
    <ErrorBoundary {...args}>
      <ThrowComponent />
    </ErrorBoundary>
  );
};

export const _ErrorPageFull = (args: any) => {
  return (
    <ErrorBoundary errorComponent={ErrorPageCore} {...args}>
      <ThrowComponent />
    </ErrorBoundary>
  );
};

export const _ErrorDragon = (args: any) => {
  return (
    <ErrorBoundary errorComponent={ErrorDragon} {...args}>
      <ThrowComponent />
    </ErrorBoundary>
  );
};

_ErrorDragon.story = {
  name: "ErrorDragon",
};
