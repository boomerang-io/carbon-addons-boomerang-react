import { text } from "@storybook/addon-knobs";
import GraphicWrangler from "../GraphicWrangler";
import ErrorPage from "./ErrorPage";

export default {
  title: "Errors/ErrorPage",
  component: ErrorPage,
};

export const Default = (args) => {
  return (
    <ErrorPage
      header={text("header", "Header")}
      title={text("title", "Title")}
      message={text("message", "Message")}
      graphic={<GraphicWrangler />}
      {...args}
    />
  );
};

export const MessageLink = (args) => {
  return (
    <ErrorPage
      title={text("title", "Title")}
      message={
        <p>
          Hello there, <a href="https://useboomerang.io">use Boomerang!</a>
        </p>
      }
      graphic={<GraphicWrangler />}
      {...args}
    />
  );
};
