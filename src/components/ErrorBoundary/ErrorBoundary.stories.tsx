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
  decorators: [(story) => <Story />],
};

export const Default = (args) => {
  return (
    <ErrorBoundary {...args}>
      <ThrowComponent />
    </ErrorBoundary>
  );
};

export const _ErrorPageFull = (args) => {
  return (
    <ErrorBoundary errorComponent={ErrorPageCore} {...args}>
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
