"use strict";

module.exports = () => ({
  plugins: ["@babel/plugin-transform-runtime"],
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: "3.23",
        browserslistConfigFile: true,
        browserslistEnv: "production",
      },
    ]
  ],
});
