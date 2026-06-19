import cpy from 'cpy';
import { inInstall } from 'in-publish';

if (inInstall()) {
  process.exit(0); // eslint-disable-line no-undef
}

async function build() {
  try {
    // Copy over SCSS
    await cpy('src/**/*.scss', 'scss', {
      parents: true,
    });
  } catch (error) {
    console.error('One of the commands failed:', error.stack); // eslint-disable-line no-undef, no-console
    process.exit(1); // eslint-disable-line no-undef
  }
}

(async (args) => {
  await build(args);
})(process.argv); // eslint-disable-line no-undef
