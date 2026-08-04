/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2026
*/


import React from "react";
import PlatformBanner from "./PlatformBanner";

export default {
  title: "Platform/PlatformBanner",
  component: PlatformBanner,
};

export const Default = (args) => {
  return <PlatformBanner {...args} />;
};

Default.args = {
  kind: "info",
  message: "message",
  title: "title",
};
