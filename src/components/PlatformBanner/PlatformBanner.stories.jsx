import { select, text } from "@storybook/addon-knobs";
import PlatformBanner from "./PlatformBanner";

const props = () => ({
  kind: select("kind", { error: "error", info: "info", success: "success", warning: "warning" }, "info"),
  message: text("message", "Message"),
  title: text("title", "Title"),
});

export default {
  title: "Platform/PlatformBanner",
  component: PlatformBanner,
};

export const Default = () => {
  return <PlatformBanner {...props()} />;
};
