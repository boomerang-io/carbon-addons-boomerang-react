/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


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

export const Default = (args) => {
  return <ErrorMessage {...args} />;
};
