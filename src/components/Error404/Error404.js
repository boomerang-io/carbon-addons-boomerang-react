import React from 'react';

import notfound from "./static/notfound.svg";
import ErrorPage from '../ErrorPage';

export default function Error404(props) {
  return (
    <ErrorPage
      header="404 - Page Not Found"
      title="Crikey. Something seems to have swam off with this page."
      message="Try refreshing, or contact the local authorities."
      graphic={notfound}
      {...props}
    />
  );
}
