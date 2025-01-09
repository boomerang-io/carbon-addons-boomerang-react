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
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
};

export function FeatureSideNavFooter(props: Props) {
  const { children, className, isLoading, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-footer`, className)} {...rest}>
      {isLoading ? <SkeletonPlaceholder style={{ padding: "1rem", height: "3rem", width: "100%" }} /> : children}
    </section>
  );
}

export default FeatureSideNavFooter;
