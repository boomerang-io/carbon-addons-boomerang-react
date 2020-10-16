import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const FeatureNavTabs = ({ className, style, children, ...rest }) => {
  const classNames = classnames(`${prefix}--bmrg-feature-nav-tabs`, className);

  return (
    <nav className={classNames} style={style} {...rest}>
      {children}
    </nav>
  );
};

FeatureNavTabs.defaultProps = {
  className: '',
};

FeatureNavTabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default FeatureNavTabs;
