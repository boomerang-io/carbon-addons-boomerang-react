/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import NotFoundErrorBackground from "./NotFoundErrorBackground";
import GraphicLoch from "./GraphicLoch";
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

export default function Error404(props: Props) {
  const { theme = "core" } = props;

  if (theme === "boomerang") {
    const {
      header = "404 - Page Not Found",
      title = "Crikey. Something seems to have swam off with this page.",
      message = "Try refreshing, or contact the local authorities.",
      graphic = <GraphicLoch />,
      ...rest
    } = props;

    return <ErrorPage header={header} title={title} message={message} graphic={graphic} {...rest} />;
  }

  const {
    header = "404 Page Not Found",
    title = "We spaced out and couldn’t find your page.",
    message = "Try refreshing, or contact the local authorities.",
    graphic = <NotFoundErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />,
    ...rest
  } = props;

  return <ErrorPageCore header={header} title={title} message={message} graphic={graphic} {...rest} />;
}
