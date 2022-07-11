import React from "react";

import DelayedRender from "./index";

export default {
  title: "DelayedRender",
};

export const Default = () => {
  return <DelayedRender delay={1000}>I render after a second</DelayedRender>;
};

Default.story = {
  name: "default",
};
