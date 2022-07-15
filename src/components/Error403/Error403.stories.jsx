import { text } from "@storybook/addon-knobs";
import Error403Component from "./index";

export default {
  title: "Errors/Error403",
  component: Error403Component,
};

export const Default = () => {
  return <Error403Component />;
};

export const CustomText = () => {
  return (
    <Error403Component
      header={text("header", "Header")}
      title={text("title", "Title")}
      message={text("message", "Message")}
    />
  );
};

export const NoText = () => {
  return <Error403Component header={null} title={null} message={null} />;
};

export const Boomerang = () => {
  return <Error403Component theme="boomerang" />;
};
