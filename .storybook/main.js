const { mergeConfig } = require("vite");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: true,
        backgrounds: false,
        controls: true,
        docs: true,
        toolbars: true,
        viewport: true,
      },
    },
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen",
  },
  async viteFinal(config) {
    // return the customized config
    return mergeConfig(config, {
      define: {
        // By default, Vite doesn't include shims for NodeJS/
        // necessary for segment analytics lib to work
        global: {},
      },
    });
  },
};
