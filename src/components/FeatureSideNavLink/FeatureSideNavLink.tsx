/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = NavLinkProps & {
  activeClassName?: string;
  className?: string;
  children?: string | number | ((...args: any[]) => any) | any | React.ReactNode;
  hasDivider?: boolean;
  icon?: React.FC<any>;
  iconProps?: any;
  to: string;
  style?: React.CSSProperties;
  [key: string]: any;
};

function FeatureSideNavLink(props: Props) {
  const { children, className, activeClassName, iconProps, icon: Icon, hasDivider = false, ...rest } = props;
  return (
    <>
      <NavLink
        className={cx(`${prefix}--bmrg-feature-sidenav-link`, className)}
        activeClassName={cx(`${prefix}--bmrg-feature-sidenav-active-link`, activeClassName)}
        {...rest}
      >
        {Icon && <Icon {...iconProps} />}
        <div className={`${prefix}--bmrg-feature-sidenav-link-content`}>{children}</div>
      </NavLink>
      {hasDivider && <hr className={`${prefix}--bmrg-feature-sidenav-link-divider`} />}
    </>
  );
}

export default FeatureSideNavLink;
