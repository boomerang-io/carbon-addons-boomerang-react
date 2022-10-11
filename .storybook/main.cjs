const { mergeConfig } = require("vite");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
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
    "@storybook/addon-storysource",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  // Note: breaking builds
  // typescript: {
  //   check: false,
  //   reactDocgen: "react-docgen",
  // },
  async viteFinal(config) {
    // return the customized config
    return mergeConfig(config, {
      define: {
        // By default, Vite doesn't include shims for Node.js
        global: {},
      },
    });
  },
};
