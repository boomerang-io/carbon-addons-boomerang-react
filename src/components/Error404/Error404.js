import React from 'react';

import ErrorPage from '../ErrorPage';
import GraphicLoch from '../GraphicLoch';

export default function Error404(props) {
  return (
    <ErrorPage
      header="404 - Page Not Found"
      title="Crikey. Something seems to have swam off with this page."
      message="Try refreshing, or contact the local authorities."
      graphic={<GraphicLoch />}
      {...props}
    />
  );
}
