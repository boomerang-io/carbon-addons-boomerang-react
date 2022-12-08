import React from "react";
import GraphicWrangler from "../GraphicWrangler";
import ErrorPage from "./ErrorPage";

export default {
  title: "Errors/ErrorPage",
  component: ErrorPage,
  parameters: {
    docs: {
      description: {
        component:
          "Customizable full page error for Boomerang theme. Used as base component for core 403 and 404 error components",
      },
    },
  },
};

export const Default = (args: any) => {
  return <ErrorPage header={"Header"} title={"Title"} message={"Message"} graphic={<GraphicWrangler />} {...args} />;
};

export const MessageLink = (args: any) => {
  return (
    <ErrorPage
      title={"Title"}
      message={
        <p>
          Hello there, <a href="https://useboomerang.io">use Boomerang!</a>
        </p>
      }
      graphic={<GraphicWrangler />}
      {...args}
    />
  );
};
