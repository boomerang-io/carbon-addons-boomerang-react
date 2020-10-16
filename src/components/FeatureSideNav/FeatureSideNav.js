import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { SkeletonPlaceholder } from 'carbon-components-react';
import { settings } from 'carbon-components';

FeatureSideNav.propTypes = {
  border: PropTypes.oneOf(['left', 'right', undefined]),
  children: PropTypes.any,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  small: PropTypes.bool,
};

const { prefix } = settings;

export function FeatureSideNav(props) {
  const { border, small, children, className, isLoading, ...rest } = props;
  return (
    <div
      className={cx(`${prefix}--bmrg-feature-sidenav-container`, className, {
        '--left-border': border === 'left',
        '--right-border': border === 'right',
        '--small': small,
      })}
      {...rest}
    >
      {isLoading ? (
        <SkeletonPlaceholder style={{ margin: '1rem', height: '90%', width: '90%' }} />
      ) : (
        children
      )}
    </div>
  );
}

export default FeatureSideNav;
