import React from "react";
import ErrorDragon from "../ErrorDragon";
import ErrorPageCore from "../ErrorPageCore";
import type { Props as DragonProps } from "../ErrorPageCore";
import type { Props as CoreProps } from "../ErrorPageCore";

type Props =
  | ({
      theme?: "core";
    } & CoreProps)
  | ({
      theme?: "boomerang";
    } & DragonProps);

export default function ErrorFullPage({ theme = "core", ...rest }: Props) {
  if (theme === "boomerang") {
    <ErrorDragon {...rest} />;
  }
  return <ErrorPageCore {...rest} />;
}
