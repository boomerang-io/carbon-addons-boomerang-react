import React from "react";
import ErrorDragon from "../ErrorDragon";
import ErrorPageCore from "../ErrorPageCore";

ErrorFullPage.defaultProps = {
  theme: "core",
};

type OwnProps = {
  theme?: "core" | "boomerang";
  statusUrl: string;
};

type Props = OwnProps & typeof ErrorFullPage.defaultProps;

export default function ErrorFullPage(props: Props) {
  return props?.theme === "boomerang" ? <ErrorDragon {...props} /> : <ErrorPageCore {...props} />;
}
