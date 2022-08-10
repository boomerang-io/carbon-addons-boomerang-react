import { text } from "@storybook/addon-knobs";

import ErrorPageCore from "./ErrorPageCore";

export default {
  title: "Errors/ErrorPageCore",
  component: ErrorPageCore,
};

export const Default = (args) => {
  return (
    <ErrorPageCore
      header={text("header", "Header")}
      title={text("title", "Title")}
      message={text("message", "Message")}
      {...args}
    />
  );
};

export const MessageLink = (args) => {
  return (
    <ErrorPageCore
      title={text("title", "Title")}
      message={
        <p>
          Hello there, <a href="https://useboomerang.io">use Boomerang!</a>
        </p>
      }
      {...args}
    />
  );
};
