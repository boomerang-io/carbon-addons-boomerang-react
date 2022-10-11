/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from '@storybook/theming';
import PackageInfo from '../package.json';

export default create({
  base: 'light',

  // Typography
  fontBase: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  fontCode:
    "'IBM Plex Mono', Menlo, 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace",

  brandTitle: `carbon-addons-boomerang-react@${PackageInfo.version}`,
  brandUrl:
    'https://github.com/boomerang-io/carbon-addons-boomerang-react',
});