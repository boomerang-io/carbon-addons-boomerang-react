import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { SkeletonPlaceholder } from "@carbon/react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = NavLinkProps &
  React.HTMLAttributes<HTMLAnchorElement> & {
    activeClassName?: string;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    label?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  };

function FeatureNavTab({
  activeClassName = "",
  className = "",
  disabled = false,
  isLoading = false,
  label = "",
  style,
  ...rest
}: Props) {
  const classNames = cx(
    `${prefix}--tabs__nav-item`,
    `${prefix}--tabs__nav-link`,
    `${prefix}--bmrg-feature--tabs__nav-item`,
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
    <NavLink className={classNames} activeClassName={activeClassNames} style={style} {...rest}>
      {label}
    </NavLink>
  );
}

export default FeatureNavTab;
