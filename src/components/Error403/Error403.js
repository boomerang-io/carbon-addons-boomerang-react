import React from 'react';

import ErrorPage from '../ErrorPage';
import GraphicWrangler from '../GraphicWrangler';

export default function Error403(props) {
  return (
    <ErrorPage
      header="403 - Access Forbidden"
      title="You’ve found yourself in deep water."
      message="You shouldn’t be here - contact the local authorities if you disagree."
      graphic={<GraphicWrangler />}
      {...props}
    />
  );
}
