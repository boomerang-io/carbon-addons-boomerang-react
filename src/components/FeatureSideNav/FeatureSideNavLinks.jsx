import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { ButtonSkeleton } from "@carbon/react";
import { prefix } from "../../internal/settings";

FeatureSideNavLinks.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};



const LoadingSkeleton = () => {
  return (
    <div className={`${prefix}--bmrg-feature-sidenav-links-skeleton`}>
      <ButtonSkeleton style={{ width: "90%" }} small />
      <ButtonSkeleton style={{ width: "90%" }} small />
      <ButtonSkeleton style={{ width: "90%" }} small />
    </div>
  );
};

export function FeatureSideNavLinks(props) {
  const { children, className, isLoading, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-links`, className)} {...rest}>
      {isLoading ? <LoadingSkeleton /> : children}
    </section>
  );
}

export default FeatureSideNavLinks;
