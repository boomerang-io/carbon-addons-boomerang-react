import React from "react";
import ForbiddenErrorBackground from "./ForbiddenErrorBackground";
import GraphicWrangler from "../GraphicWrangler";

import ErrorPage from "../ErrorPage";
import ErrorPageCore from "../ErrorPageCore";

import { prefix } from "../../internal/settings";

type OwnProps = {
    header?: string;
    title?: string;
    message?: string;
    graphic?: React.ReactNode;
    theme?: "core" | "boomerang";
};

// @ts-expect-error TS(2565): Property 'defaultProps' is used before being assig... Remove this comment to see the full error message
type Props = OwnProps & typeof Error403.defaultProps;

export default function Error403(props: Props) {
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
