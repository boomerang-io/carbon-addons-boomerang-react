import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import external from 'rollup-plugin-peer-deps-external';
import autoprefixer from 'autoprefixer';
import json from '@rollup/plugin-json';

process.env.NODE_ENV = 'production';
const prodSettings = [terser(), filesize()];

const stripBanner = require('rollup-plugin-strip-banner');

const baseConfig = {
  preserveModules: true,
  input: './src/index.js',
  plugins: [
    babel({
      exclude: /node_modules/,
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            shippedProposals: true,
          },
        ],
        '@babel/preset-react',
        'react-app',
      ],
    }),
    external,
    resolve({
      browser: true,
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    commonjs({
      include: './node_modules/**',
    }),
    postcss({
      extract: 'styles/css/carbon-addons-boomerang-react.css',
      sourceMap: true,
      use: ['sass'],
      plugins: [autoprefixer],
    }),
    copy({
      flatten: false,
      targets: [
        // Sass components
        {
          src: ['src/**/*.scss'],
          dest: 'styles/scss',
        },
      ],
      verbose: true,
    }),
    stripBanner(),
    json({
      // All JSON files will be parsed by default,
      // but you can also specifically include/exclude files
      exclude: ['./node_modules'],
      // for tree-shaking, properties will be declared as
      // variables, using either `var` or `const`
      preferConst: true, // Default: false
      // specify indentation for the generated default export —
      // defaults to '\t'
      indent: '  ',
      // ignores indent and generates the smallest code
      compact: true, // Default: false
      // generate a named export for every property of the JSON object
      namedExports: true, // Default: true
    }),
    ...prodSettings,
  ],
};

module.exports = [
  // Generates the following bundles:
  // ESM:       es/index.js
  // CommonJS: lib/index.js
  {
    ...baseConfig,
    plugins: [...baseConfig.plugins],
    output: [
      {
        format: 'esm',
        dir: 'es',
        preserveModulesRoot: 'src',
      },
      {
        format: 'cjs',
        dir: 'lib',
        preserveModulesRoot: 'src',
        exports: 'auto',
        name: 'CarbonAddonsBoomerangReact',
      },
    ],
  },
];
