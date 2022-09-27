import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { prefix } from "../../internal/settings";

const FeatureNavTabs = ({ ariaLabel, children, className, contained, light, style, ...rest }) => {
  const classNames = classnames(
    `${prefix}--tabs`,
    {
      [`${prefix}--tabs--contained`]: contained,
      [`${prefix}--tabs--light`]: light,
    },
    className
  );

  return (
    <nav aria-label={ariaLabel} className={classNames} style={style} {...rest}>
      <ul className={`${prefix}--tab--list`}>{children}</ul>
    </nav>
  );
};

FeatureNavTabs.defaultProps = {
  className: "",
  contained: false,
  light: false,
};

FeatureNavTabs.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  contained: PropTypes.bool,
  light: PropTypes.bool,
  style: PropTypes.object,
};

export default FeatureNavTabs;
