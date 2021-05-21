import React from 'react';

import forbidden from "./static/forbidden.svg";
import GraphicWrangler from '../GraphicWrangler';

import ErrorPage from '../ErrorPage';
import ErrorPageCore from '../ErrorPageCore';

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
      graphic={forbidden}
      {...props}
    />
  );
}
