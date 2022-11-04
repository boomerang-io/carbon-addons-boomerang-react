import React from "react";
import ErrorDragon from "../ErrorDragon";
import ErrorPageCore from "../ErrorPageCore";

type OwnProps = {
  theme?: "core" | "boomerang";
};

// @ts-expect-error TS(2565): Property 'defaultProps' is used before being assig... Remove this comment to see the full error message
type Props = OwnProps & typeof ErrorFullPage.defaultProps;

export default function ErrorFullPage(props: Props) {
  return props?.theme === "boomerang" ? <ErrorDragon {...props} /> : <ErrorPageCore {...props} />;
}

ErrorFullPage.defaultProps = {
  theme: "core",
};
