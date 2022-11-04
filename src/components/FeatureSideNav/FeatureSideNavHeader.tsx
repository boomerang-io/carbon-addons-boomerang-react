import React from "react";
import cx from "classnames";
import { SkeletonPlaceholder } from "@carbon/react";
import { prefix } from "../../internal/settings";

type Props = {
    children?: any;
    className?: string;
    isLoading?: boolean;
};



export function FeatureSideNavHeader(props: Props) {
  const { children, className, isLoading, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-header`, className)} {...rest}>
      {isLoading ? <SkeletonPlaceholder style={{ padding: "1rem", height: "5rem", width: "100%" }} /> : children}
    </section>
  );
}

export default FeatureSideNavHeader;
