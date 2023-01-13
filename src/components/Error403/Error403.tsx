import React from "react";
import ForbiddenErrorBackground from "./ForbiddenErrorBackground";
import GraphicWrangler from "./GraphicWrangler";
import ErrorPage from "../ErrorPage";
import ErrorPageCore from "../ErrorPageCore";
import { prefix } from "../../internal/settings";
import type { Props as BoomerangProps } from "../ErrorPage";
import type { Props as CoreProps } from "../ErrorPageCore";

type Props =
  | ({
      theme?: "core";
    } & CoreProps)
  | ({
      theme: "boomerang";
    } & BoomerangProps);

export default function Error403(props: Props) {
  const { theme = "core" } = props;

  if (theme === "boomerang") {
    const {
      header = "403 - Access Forbidden",
      title = "You’ve found yourself in deep water.",
      message = "You shouldn’t be here - contact the local authorities if you disagree.",
      graphic = <GraphicWrangler />,
      ...rest
    } = props;

    return <ErrorPage header={header} title={title} message={message} graphic={graphic} {...rest} />;
  }

  const {
    header = "403 Access Forbidden",
    title = "Looks like you've taken a wrong turn.",
    message = "You shouldn’t be here - contact the local authorities if you disagree.",
    graphic = <ForbiddenErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />,
    ...rest
  } = props;

  return <ErrorPageCore header={header} title={title} message={message} graphic={graphic} {...rest} />;
}
