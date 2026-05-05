export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.js'
      }
    }
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },

  docs: {},

  features: {
    actions: true,
    backgrounds: false,
    controls: true,
    toolbars: true,
    viewport: true
  }
};
