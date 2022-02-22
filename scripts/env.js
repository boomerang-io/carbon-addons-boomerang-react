'use strict';

const BABEL_ENV = process.env.BABEL_ENV;

module.exports = () => ({
  plugins:
    BABEL_ENV === 'es' || BABEL_ENV === 'cjs' ? ['@babel/plugin-transform-runtime'] : undefined,
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: BABEL_ENV === 'es' ? false : 'commonjs',
        targets: {
          browsers: ['extends browserslist-config-carbon'],
        },
      },
    ],
  ],
});
