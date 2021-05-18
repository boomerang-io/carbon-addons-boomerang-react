import React from 'react';

import forbidden from "./static/forbidden.svg";
import ErrorPage from '../ErrorPage';

export default function Error403(props) {
  return (
    <ErrorPage
      header="403 - Access Forbidden"
      title="You’ve found yourself in deep water."
      message="You shouldn’t be here - contact the local authorities if you disagree."
      graphic={forbidden}
      {...props}
    />
  );
}
