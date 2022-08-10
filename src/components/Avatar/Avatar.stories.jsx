import Avatar from "./Avatar";

export default {
  title: "Components/Avatar",
  components: Avatar,
  argTypes: {
    className: {
      description: "Pass custom class",
      control: "text",
    },
    src: {
      control: "text",
      description: "URL to avatar image",
    },
    size: {
      description: "Control the size",
      control: "select",
      options: ["small", "medium", "large"],
    },
    style: {
      description: "Pass styles",
      control: "object",
    },
    userName: {
      control: "text",
      description: "Set image alt text",
    },
  },
};

export const Default = (args) => <Avatar {...args} />;

Default.args = {
  size: "large",
  src: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  userName: "Gravatar User",
};
