'use strict';

const { execSync } = require('child_process');
const path = require('path');
const { inInstall } = require('in-publish');
const which = require('npm-which')(__dirname);
const fse = require('fs-extra');
const cpy = require('cpy');

if (inInstall()) {
  process.exit(0);
}

const babelPath = which.sync('babel');

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

const ignoreGlobs = ['**/*.spec.js', '**/*.stories.js'].join(',');

async function build() {
  try {
    // exec(`${babelPath} src --quiet -d es --ignore "${ignoreGlobs}"`, {
    //   BABEL_ENV: 'es',
    // });
    // exec(`${babelPath} src --quiet -d lib --ignore "${ignoreGlobs}"`, {
    //   BABEL_ENV: 'cjs',
    // });
    fse.ensureDirSync('styles/scss');
    await cpy('src/**/*.scss', 'styles/scss', { parents: true });
  } catch (error) {
    console.error('One of the commands failed:', error.stack); // eslint-disable-line no-console
    process.exit(1);
  }
}

(async (args) => {
  await build(args);
})(process.argv);
