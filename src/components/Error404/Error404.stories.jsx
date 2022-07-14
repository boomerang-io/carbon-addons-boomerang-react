import React from "react";
import { text } from "@storybook/addon-knobs";

import Error404Component from "./index";

export default {
  title: "Errors/Error404",
  component: Error404Component
};

export const Default = () => {
  return <Error404Component />;
};

Default.story = {
  name: "default",
};

export const CustomText = () => {
  return (
    <Error404Component
      header={text("header", "Header")}
      title={text("title", "Title")}
      message={text("message", "Message")}
    />
  );
};

CustomText.story = {
  name: "custom text",
};

export const NoText = () => {
  return <Error404Component header={null} title={null} message={null} />;
};

NoText.story = {
  name: "no text",
};

export const Boomerang = () => {
  return <Error404Component theme="boomerang" />;
};

Boomerang.story = {
  name: "boomerang",
};
