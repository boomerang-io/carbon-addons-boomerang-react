import React from "react";
import PlatformBanner from "./PlatformBanner";

export default {
  title: "Platform/PlatformBanner",
  component: PlatformBanner,
};

export const Default = (args: any) => {
  return <PlatformBanner {...args} />;
};

Default.args = {
  kind: "info",
  message: "message",
  title: "title",
};
