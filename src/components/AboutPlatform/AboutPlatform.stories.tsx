import React from "react";
import AboutPlatform from "./AboutPlatform";
import { headerModalProps } from "../../internal/helpers";

export default {
  title: "Platform/AboutPlatform",
  component: AboutPlatform,
  parameters: {
    docs: {
      description: {
        component: "Header modal with key metadata about the platform.",
      },
    },
  },
};

export const Default = (args) => {
  return <AboutPlatform {...args} />;
};

Default.args = {
  name: "Boomerang",
  version: "1.0.0",
  ...headerModalProps,
};