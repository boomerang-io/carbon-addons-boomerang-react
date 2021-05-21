import React from 'react';

import notfound from "./static/notfound.svg";
import GraphicLoch from '../GraphicLoch';

import ErrorPage from '../ErrorPage';
import ErrorPageCore from '../ErrorPageCore';

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
      graphic={notfound}
      {...props}
    />
  );
}
