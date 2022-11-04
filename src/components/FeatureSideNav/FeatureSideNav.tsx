import React from "react";
import cx from "classnames";
import { SkeletonPlaceholder } from "@carbon/react";
import { prefix } from "../../internal/settings";

type Props = {
  border?: any; // TODO: PropTypes.oneOf(["left", "right", undefined])
  children?: any;
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
