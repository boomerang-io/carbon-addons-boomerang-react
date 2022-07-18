import PropTypes from "prop-types";
import ForbiddenErrorBackground from "./ForbiddenErrorBackground";
import GraphicWrangler from "../GraphicWrangler";

import ErrorPage from "../ErrorPage";
import ErrorPageCore from "../ErrorPageCore";

import { prefix } from "../../internal/settings";


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
      header="403 Access Forbidden"
      title="Looks like you've taken a wrong turn."
      message="You shouldn’t be here - contact the local authorities if you disagree."
      graphic={<ForbiddenErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />}
      {...props}
    />
  );
}

Error403.defaultProps = {
  theme: "core",
};

Error403.propTypes = {
  theme: PropTypes.oneOf(["core", "boomerang"]),
};
