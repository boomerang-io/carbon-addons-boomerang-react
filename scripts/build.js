'use strict';

const { execSync } = require('child_process');
const { inInstall } = require('in-publish');
const which = require('npm-which')(__dirname);

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

try {
  exec(`${babelPath} src --quiet -d es --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'es',
  });
  exec(`${babelPath} src --quiet -d lib --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'cjs',
  });
  exec(`mkdir -p styles/scss`);
  exec(`rsync -avm --include='*.scss' -f 'hide,! */' ./src/* ./styles/scss`);
} catch (error) {
  console.error('One of the commands failed:', error.stack); // eslint-disable-line no-console
  process.exit(1);
}
