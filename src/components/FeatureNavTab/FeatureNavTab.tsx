import React from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { NavLink } from "react-router-dom";
import cx from "classnames";
import { SkeletonPlaceholder } from "@carbon/react";
import { prefix } from "../../internal/settings";

type OwnProps = {
    activeClassName?: string;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    label?: string;
    style?: any;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof FeatureNavTab.defaultProps;

// @ts-expect-error TS(7022): 'FeatureNavTab' implicitly has type 'any' because ... Remove this comment to see the full error message
const FeatureNavTab = ({ activeClassName, className, disabled, isLoading, label, style, ...rest }: Props) => {
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

FeatureNavTab.defaultProps = {
  activeClassName: "",
  className: "",
  disabled: false,
  isLoading: false,
  label: "",
};

export default FeatureNavTab;
