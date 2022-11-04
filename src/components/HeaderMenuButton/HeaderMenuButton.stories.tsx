import { action } from "@storybook/addon-actions";
import HeaderMenuButton from "./index";

export default {
  title: "Platform/HeaderMenuButton",
  component: HeaderMenuButton,
  parameters: {
    docs: {
      description: {
        component: "Platform header menu item that functions as a button. Useful for in-app onClick functionality.",
      },
    },
  },
};

export const Default = (args: any) => {
  return <HeaderMenuButton text="Header Button" iconName="workspace" onClick={action("click")} {...args}/>;
};
