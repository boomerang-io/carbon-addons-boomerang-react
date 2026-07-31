/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

import React from "react";
import { NavLink, NavLinkProps } from "react-router";
import { SkeletonPlaceholder } from "@carbon/react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = Omit<NavLinkProps, "className"> &
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
  const baseClassNames = cx(
    `${prefix}--tabs__nav-item`,
    `${prefix}--tabs__nav-link`,
    `${prefix}--bmrg-feature--tabs__nav-item`,
    {
      [`${prefix}--tabs__nav-item--disabled`]: disabled,
    },
    className,
  );

  return isLoading ? (
    <div className={`${prefix}--bmrg-feature-nav-tab--loading`}>
      <SkeletonPlaceholder className={`${prefix}--bmrg-feature-nav-tab--loading__skeleton`} />
    </div>
  ) : (
    <NavLink
      className={({ isActive }) =>
        isActive ? cx(baseClassNames, `${prefix}--tabs__nav-item--selected`, activeClassName) : baseClassNames
      }
      style={style}
      {...rest}
    >
      {label}
    </NavLink>
  );
}

export default FeatureNavTab;
