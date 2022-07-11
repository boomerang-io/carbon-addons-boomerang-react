import React from "react";

import NoDisplayComponent from "./index";

export default {
  title: "NoDisplay",
};

export const Default = () => {
  return (
    <div style={{ background: "#fff" }}>
      <NoDisplayComponent />
    </div>
  );
};

Default.story = {
  name: "default",
};

export const Message = () => {
  return <NoDisplayComponent text="Looks like you need to add some repos." />;
};

Message.story = {
  name: "message",
};
