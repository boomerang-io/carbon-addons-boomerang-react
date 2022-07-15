import { action } from "@storybook/addon-actions";
import HeaderMenuButton from "./index";

export default {
  title: "Platform/HeaderMenuButton",
  component: HeaderMenuButton,
};

export const Default = () => {
  return <HeaderMenuButton text="Header Button" iconName="workspace" onClick={action("click")} />;
};
