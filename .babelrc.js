const BABEL_ENV = process.env.BABEL_ENV;

module.exports = {
  plugins: ["@babel/plugin-transform-runtime"],
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: "3.23",
        modules: BABEL_ENV === 'esm' ? false : 'commonjs',
        browserslistEnv: "production"
      },
    ],
    "@babel/preset-react",
  ],
};
