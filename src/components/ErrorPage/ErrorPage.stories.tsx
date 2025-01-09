/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import GraphicWrangler from "../Error403/GraphicWrangler";
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

export const Default = (args) => {
  return <ErrorPage header={"Header"} title={"Title"} message={"Message"} graphic={<GraphicWrangler />} {...args} />;
};

export const MessageLink = (args) => {
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
