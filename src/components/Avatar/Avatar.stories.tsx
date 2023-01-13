import React from "react";
import Avatar from "./Avatar";

export default {
  title: "Components/Avatar",
  components: Avatar,
  parameters: {
    docs: {
      description: {
        component: "A image component to display a user's profile image with a fallback user icon.",
      },
    },
  },
  argTypes: {
    size: {
      description: "Control the size",
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
};

export const Default = (args) => <Avatar {...args} />;

Default.args = {
  src: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  userName: "Rick Deckard",
};
