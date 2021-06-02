import React from 'react';

import NotFoundErrorBackground from "./NotFoundErrorBackground";
import GraphicLoch from '../GraphicLoch';

import ErrorPage from '../ErrorPage';
import ErrorPageCore from '../ErrorPageCore';

import { settings } from 'carbon-components';
const { prefix } = settings;

export default function Error404(props) {
  return props?.theme === "boomerang" ? (
    <ErrorPage
      header="404 - Page Not Found"
      title="Crikey. Something seems to have swam off with this page."
      message="Try refreshing, or contact the local authorities."
      graphic={<GraphicLoch />}
      {...props}
    />
  ) : (
    <ErrorPageCore
      header="404 - Page Not Found"
      title="Crikey. Something seems to have swam off with this page."
      message="Try refreshing, or contact the local authorities."
      graphic={<NotFoundErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />}
      {...props}
    />
  );
}
