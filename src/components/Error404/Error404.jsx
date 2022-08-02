import React from "react";
import PropTypes from "prop-types";
import NotFoundErrorBackground from "./NotFoundErrorBackground";
import GraphicLoch from "../GraphicLoch";

import ErrorPage from "../ErrorPage";
import ErrorPageCore from "../ErrorPageCore";

import { prefix } from "../../internal/settings";


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
      header="404 Page Not Found"
      title="We spaced out and couldn’t find your page."
      message="Try refreshing, or contact the local authorities."
      graphic={<NotFoundErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />}
      {...props}
    />
  );
}

Error404.defaultProps = {
  theme: "core",
};

Error404.propTypes = {
  theme: PropTypes.oneOf(["core", "boomerang"]),
};
