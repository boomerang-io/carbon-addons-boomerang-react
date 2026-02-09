module.exports = {
  extends: ["react-app", "plugin:jsx-a11y/recommended"],
  plugins: ["jsx-a11y"],
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": 0,
      },
    },
  ],
  ignorePatterns: ["node_modules", "coverage", "config", "lib", "docs", "storybook-static", "results", "rollup.config.mjs"],
};
