import { text } from "@storybook/addon-knobs";
import Error403Component from "./index";

export default {
  title: "Errors/Error403",
  component: Error403Component,
};

export const Default = (args) => {
  return <Error403Component {...args} />;
};

export const CustomText = (args) => {
  return <Error403Component header={"Header"} title={"Title"} message={"Message"} {...args} />;
};

export const NoText = (args) => {
  return <Error403Component header={null} title={null} message={null} {...args} />;
};

export const Boomerang = (args) => {
  return <Error403Component theme="boomerang" {...args} />;
};
