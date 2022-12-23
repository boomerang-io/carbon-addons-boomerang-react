import React from "react";
import ErrorPageCore from "./ErrorPageCore";

export default {
  title: "Errors/ErrorPageCore",
  component: ErrorPageCore,
  parameters: {
    docs: {
      description: {
        component:
          "Customizable full page error for Core theme. Used as base component for core 403 and 404 error components",
      },
    },
  },
};

export const Default = (args: any) => {
  return <ErrorPageCore header={"Header"} title={"Title"} message={"Message"} {...args} />;
};

export const MessageLink = (args: any) => {
  return (
    <ErrorPageCore
      title={"Title"}
      message={
        <p>
          Hello there, <a href="https://useboomerang.io">use Boomerang!</a>
        </p>
      }
      {...args}
    />
  );
};
