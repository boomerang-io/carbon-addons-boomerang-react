
import Component from "./Avatar";

export default {
  title: "Components/Avatar",
  components: Component,
  argTypes: {
    src: {
      description: "URL to avatar image"
    },
    size: {
      description: "Control the size",
      control: "select",
      options: ["small", "medium", "large"]
    },
    userName: {
      description: "Used for alt text"
    },
    style: {
      description: "Pass styles"
    },
    className: {
      description: "Pass custom class"
    }
  }
};

const Template = (args) => <Component {...args} />;

export const Avatar = Template.bind({});
Avatar.args = {
  src: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  userName: "Gratav User",
  size: "small"
};
