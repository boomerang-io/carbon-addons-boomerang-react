import AboutPlatform from "./AboutPlatform";

export default {
  title: "Platform/AboutPlatform",
  component: AboutPlatform,
  parameters: {
    docs: {
      description: {
        component: "Header menu item that displays modal with key metadata about the platform.",
      },
    },
  },
  argTypes: {
    isFlowApp: { control: "boolean", defaultValue: false },
    organization: { control: "text", defaultValue: "IBM" },
    version: { control: "text", defaultValue: "5.0.0" },
  },
};

export const Default = (args) => {
  return <AboutPlatform {...args} />;
};

export const Flow = (args) => {
  return <AboutPlatform {...args} />;
};

Flow.args = {
  isFlowApp: true,
};
