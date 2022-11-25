import React from "react";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import { SkeletonPlaceholder } from "@carbon/react";
import { prefix } from "../../internal/settings";

FeatureNavTab.defaultProps = {
  activeClassName: "",
  className: "",
  disabled: false,
  isLoading: false,
  label: "",
};

type OwnProps = {
  activeClassName?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  style?: any;
  to: string;
};

type Props = OwnProps & typeof FeatureNavTab.defaultProps;

function FeatureNavTab ({ activeClassName, className, disabled, isLoading, label, style, ...rest }: Props) {
  const classNames = cx(
    `${prefix}--tabs__nav-item`,
    `${prefix}--tabs__nav-link`,
    {
      [`${prefix}--tabs__nav-item--disabled`]: disabled,
    },
    className
  );
  const activeClassNames = cx(`${prefix}--tabs__nav-item--selected`, activeClassName);

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

export default FeatureNavTab;
