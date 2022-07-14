import React from "react";

import HeaderMenuLink from "./index"; // Using default export

export default {
  title: "Platform/HeaderMenuLink",
};

export const Default = () => {
  return <HeaderMenuLink text="Navigate from Platform" iconName="workspace" href="https://www.ibm.com" />;
};

Default.story = {
  name: "default",
};
