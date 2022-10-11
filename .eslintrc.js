module.exports = {
  extends: ["react-app", "plugin:jsx-a11y/recommended"],
  plugins: ["jsx-a11y"],
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
  ignorePatterns: ["node_modules", "coverage", "config", "lib", "docs", "storybook-static", "results"],
};
