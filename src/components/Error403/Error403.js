import React from 'react';

import ForbiddenErrorBackground from './ForbiddenErrorBackground';
import GraphicWrangler from '../GraphicWrangler';

import ErrorPage from '../ErrorPage';
import ErrorPageCore from '../ErrorPageCore';

import { settings } from 'carbon-components';
const { prefix } = settings;

export default function Error403(props) {
  return props?.theme === "boomerang" ? (
    <ErrorPage
      header="403 - Access Forbidden"
      title="You’ve found yourself in deep water."
      message="You shouldn’t be here - contact the local authorities if you disagree."
      graphic={<GraphicWrangler />}
      {...props}
    />
  ) : (
    <ErrorPageCore
      header="403 - Access Forbidden"
      title="You’ve found yourself in deep water."
      message="You shouldn’t be here - contact the local authorities if you disagree."
      graphic={<ForbiddenErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />}
      {...props}
    />
  );
}
