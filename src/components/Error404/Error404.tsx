import React from "react";
import NotFoundErrorBackground from "./NotFoundErrorBackground";
import GraphicLoch from "../GraphicLoch";
import ErrorPage from "../ErrorPage";
import ErrorPageCore from "../ErrorPageCore";
import type { Props as DragonProps } from "../ErrorDragon";
import type { Props as CoreProps } from "../ErrorPageCore";
import { prefix } from "../../internal/settings";

type Props =
  | ({
      theme?: "core";
    } & CoreProps)
  | ({
      theme?: "boomerang";
    } & DragonProps);

export default function Error404({ theme = "core", ...rest }: Props) {
  return theme === "boomerang" ? (
    <ErrorPage
      header="404 - Page Not Found"
      title="Crikey. Something seems to have swam off with this page."
      message="Try refreshing, or contact the local authorities."
      graphic={<GraphicLoch />}
      {...rest}
    />
  ) : (
    <ErrorPageCore
      header="404 Page Not Found"
      title="We spaced out and couldn’t find your page."
      message="Try refreshing, or contact the local authorities."
      graphic={<NotFoundErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />}
      {...rest}
    />
  );
}
