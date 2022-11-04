import React from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { NavLink } from "react-router-dom";
import { prefix } from "../../internal/settings";
import cx from "classnames";

FeatureSideNavLink.defaultProps = {
  hasDivider: false,
};

type OwnProps = {
  activeClassName?: string;
  className?: string;
  children?: string | number | ((...args: any[]) => any) | any | React.ReactNode;
  iconProps?: any;
};

type Props = OwnProps & typeof FeatureSideNavLink.defaultProps;

function FeatureSideNavLink(props: Props) {
  // @ts-expect-error TS(2339): Property 'icon' does not exist on type 'Props'.
  const { children, className, activeClassName, iconProps, icon: Icon, hasDivider, ...rest } = props;
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
