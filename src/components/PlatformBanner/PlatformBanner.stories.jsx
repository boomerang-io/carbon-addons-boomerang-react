import PlatformBanner from "./PlatformBanner";

export default {
  title: "Platform/PlatformBanner",
  component: PlatformBanner,
};

export const Default = (args) => {
  return <PlatformBanner {...args} />;
};

Default.args = {
  kind: "info",
  message: "message",
  title: "title",
};
