const cpy = require('cpy');
const path = require('path');
const { inInstall } = require('in-publish');

if (inInstall()) {
  process.exit(0);
}

async function build() {
  try {  
    // Copy over SCSS
    await cpy('**/*.scss', '../scss', {
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
