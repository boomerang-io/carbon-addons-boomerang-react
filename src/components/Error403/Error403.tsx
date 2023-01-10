import React from "react";
import ForbiddenErrorBackground from "./ForbiddenErrorBackground";
import GraphicWrangler from "../GraphicWrangler";
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

export default function Error403({ theme = "core", ...rest }: Props) {
  return theme === "boomerang" ? (
    <ErrorPage
      header="403 - Access Forbidden"
      title="You’ve found yourself in deep water."
      message="You shouldn’t be here - contact the local authorities if you disagree."
      graphic={<GraphicWrangler />}
      {...rest}
    />
  ) : (
    <ErrorPageCore
      header="403 Access Forbidden"
      title="Looks like you've taken a wrong turn."
      message="You shouldn’t be here - contact the local authorities if you disagree."
      graphic={<ForbiddenErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />}
      {...rest}
    />
  );
}
