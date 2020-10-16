import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { settings } from 'carbon-components';
import cx from 'classnames';

FeatureSideNavLink.propTypes = {
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.object,
    PropTypes.node,
  ]),
  iconProps: PropTypes.object,
};

FeatureSideNavLink.defaultProps = {
  hasDivider: false,
};
const { prefix } = settings;

const defaultStyles = {
  height: '1rem',
  width: '1rem',
};

function FeatureSideNavLink(props) {
  const {
    children,
    className,
    activeClassName,
    iconProps,
    icon: Icon,
    hasDivider,
    ...rest
  } = props;
  return (
    <>
      <NavLink
        className={cx(`${prefix}--bmrg-feature-sidenav-link`, className)}
        activeClassName={cx(`${prefix}--bmrg-feature-sidenav-active-link`, activeClassName)}
        {...rest}
      >
        {Icon && <Icon style={{ ...defaultStyles }} {...iconProps} />}
        <div className={`${prefix}--bmrg-feature-sidenav-link-content`}>{children}</div>
      </NavLink>
      {hasDivider && <hr className={`${prefix}--bmrg-feature-sidenav-link-divider`} />}
    </>
  );
}

export default FeatureSideNavLink;
