const cpy = require('cpy');
const path = require('path');
const which = require('npm-which')(__dirname);
const { execSync } = require('child_process');
const { inInstall } = require('in-publish');

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
    
    // Compile ES and CJS versions of the lib
    exec(`"${babelPath}" src --quiet -d es --ignore "${ignoreGlobs}"`, {
      BABEL_ENV: 'es',
    });
    exec(`"${babelPath}" src --quiet -d lib --ignore "${ignoreGlobs}"`, {
      BABEL_ENV: 'cjs',
    });
    
    // Copy over SCSS
    await cpy('**/*.scss', '../styles/scss', {
      parents: true,
      cwd: path.resolve(process.cwd(), 'src'),
    });
  } catch (error) {
    console.error('One of the commands failed:', error.stack); // eslint-disable-line no-console
    process.exit(1);
  }
}

(async (args) => {
  await build(args);
})(process.argv);
