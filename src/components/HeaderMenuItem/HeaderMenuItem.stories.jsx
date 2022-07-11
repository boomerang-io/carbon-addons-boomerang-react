import React from "react";

import HeaderMenuItem from "./index"; // Using default export

export default {
  title: "HeaderMenuItem",
};

export const Default = () => {
  return (
    <HeaderMenuItem text="Send Feedback" iconName="workspace">
      {() => <span>you can put anything inside the modal </span>}
    </HeaderMenuItem>
  );
};

Default.story = {
  name: "default",
};
