/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import ErrorFullPage from "./ErrorFullPage";

const statusUrl = "/support/status";

export default {
  title: "Errors/ErrorFullPage",
  component: ErrorFullPage,
  parameters: {
    docs: {
      description: {
        component: "Wrapper for errors for both Core and Boomerang themes",
      },
    },
  },
};

export const Default = (args) => {
  return <ErrorFullPage statusUrl={statusUrl} {...args} />;
};

export const Boomerang = (args) => {
  return <ErrorFullPage theme="boomerang" statusUrl={statusUrl} {...args} />;
};
