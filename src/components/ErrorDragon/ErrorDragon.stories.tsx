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

export const Default = (args: any) => {
  return <ErrorDragon statusUrl={statusUrl} {...args} />;
};
