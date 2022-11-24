import React from "react";
import ForbiddenErrorBackground from "./ForbiddenErrorBackground";
import GraphicWrangler from "../GraphicWrangler";

import ErrorPage from "../ErrorPage";
import ErrorPageCore from "../ErrorPageCore";

import { prefix } from "../../internal/settings";

Error403.defaultProps = {
  theme: "core",
};

type OwnProps = {
  header?: string | null;
  title?: string | null;
  message?: string | null;
  graphic?: React.ReactNode;
  theme?: "core" | "boomerang";
};

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
