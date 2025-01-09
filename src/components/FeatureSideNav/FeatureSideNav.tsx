/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { SkeletonPlaceholder } from "@carbon/react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  border?: "left" | "right";
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  small?: boolean;
};

export function FeatureSideNav(props: Props) {
  const { border, small, children, className, isLoading, ...rest } = props;
  return (
    <div
      className={cx(`${prefix}--bmrg-feature-sidenav-container`, className, {
        "--left-border": border === "left",
        "--right-border": border === "right",
        "--small": small,
      })}
      {...rest}
    >
      {isLoading ? <SkeletonPlaceholder style={{ margin: "1rem", height: "90%", width: "90%" }} /> : children}
    </div>
  );
}

export default FeatureSideNav;
