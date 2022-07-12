import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { SkeletonPlaceholder } from "@carbon/react";
import { prefix } from "../../internal/settings";

FeatureSideNavFooter.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};



export function FeatureSideNavFooter(props) {
  const { children, className, isLoading, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-footer`, className)} {...rest}>
      {isLoading ? <SkeletonPlaceholder style={{ padding: "1rem", height: "3rem", width: "100%" }} /> : children}
    </section>
  );
}

export default FeatureSideNavFooter;
