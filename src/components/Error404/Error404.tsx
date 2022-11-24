import React from "react";
import NotFoundErrorBackground from "./NotFoundErrorBackground";
import GraphicLoch from "../GraphicLoch";

import ErrorPage from "../ErrorPage";
import ErrorPageCore from "../ErrorPageCore";

import { prefix } from "../../internal/settings";

Error404.defaultProps = {
  theme: "core",
};

type OwnProps = {
  header?: string | null;
  title?: string | null;
  message?: string | null;
  graphic?: React.ReactNode;
  theme?: "core" | "boomerang";
};

type Props = OwnProps & typeof Error404.defaultProps;

export default function Error404(props: Props) {
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
