import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { SkeletonPlaceholder } from "@carbon/react";
import { prefix } from "../../internal/settings";

const FeatureNavTab = ({ activeClassName, className, disabled, isLoading, label, style, ...rest }) => {
  const classNames = classnames(
    `${prefix}--tabs__nav-item`,
    `${prefix}--tabs__nav-link`,
    {
      [`${prefix}--tabs__nav-item--disabled`]: disabled,
    },
    className
  );
  const activeClassNames = classnames(`${prefix}--tabs__nav-item--selected`, activeClassName);

  return isLoading ? (
    <div className={`${prefix}--bmrg-feature-nav-tab--loading`}>
      <SkeletonPlaceholder className={`${prefix}--bmrg-feature-nav-tab--loading__skeleton`} />
    </div>
  ) : (
    <NavLink className={classNames} activeClassName={activeClassNames} style={style} disabled={disabled} {...rest}>
      {label}
    </NavLink>
  );
};

FeatureNavTab.defaultProps = {
  activeClassName: "",
  className: "",
  disabled: false,
  isLoading: false,
  label: "",
};

FeatureNavTab.propTypes = {
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.object,
};

export default FeatureNavTab;
