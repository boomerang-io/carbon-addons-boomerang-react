/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import ErrorDragon from "./ErrorDragon";

const statusUrl = "/status";

export default {
  title: "Errors/ErrorDragon",
  component: ErrorDragon,
  parameters: {
    docs: {
      description: {
        component: "Boomerang theme component for full page errors",
      },
    },
  },
};

export const Default = (args) => {
  return <ErrorDragon statusUrl={statusUrl} {...args} />;
};
