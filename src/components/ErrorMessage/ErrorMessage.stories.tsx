import React from "react";
import ErrorMessage from "./ErrorMessage";

export default {
  title: "Errors/ErrorMessage",
  component: ErrorMessage,
  parameters: {
    docs: {
      description: {
        component: "Error message for errors that are _not_ full page",
      },
    },
  },
};

export const Default = (args: any) => {
  return <ErrorMessage {...args} />;
};
