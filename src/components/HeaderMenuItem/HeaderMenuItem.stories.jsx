import React from "react";
import HeaderMenuItem from "./index"; // Using default export

export default {
  title: "Platform/HeaderMenuItem",
};

export const Default = () => {
  return (
    <HeaderMenuItem text="Header Menu Modal" iconName="workspace">
      {() => (
        <div style={{ height: "20rem", width: "20rem" }}>
          <p>Hello there</p>
        </div>
      )}
    </HeaderMenuItem>
  );
};

Default.story = {
  name: "default",
};
