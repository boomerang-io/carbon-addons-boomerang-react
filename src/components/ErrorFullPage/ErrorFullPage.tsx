import React from "react";
import ErrorDragon from "../ErrorDragon";
import ErrorPageCore from "../ErrorPageCore";

type Props = {
  theme?: "core" | "boomerang";
  statusUrl: string;
};

export default function ErrorFullPage({ theme = "core", ...rest }: Props) {
  return theme === "boomerang" ? <ErrorDragon {...rest} /> : <ErrorPageCore {...rest} />;
}
