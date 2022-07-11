import React from "react";
import { text } from "@storybook/addon-knobs";

import AboutPlatform from "./AboutPlatform";

export default {
  title: "AboutPlatform",
};

export const Default = () => {
  return (
    <AboutPlatform organization={text("organization", "IBM Boomerang Platform")} version={text("version", "5.0.0")} />
  );
};

Default.story = {
  name: "default",
};

export const FlowIcons = () => {
  return (
    <AboutPlatform
      isFlowApp
      organization={text("organization", "IBM Boomerang Platform")}
      version={text("version", "5.0.0")}
    />
  );
};
