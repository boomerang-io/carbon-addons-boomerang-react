import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { SkeletonPlaceholder } from 'carbon-components-react';
import { settings } from 'carbon-components';

FeatureSideNavHeader.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

const { prefix } = settings;

export function FeatureSideNavHeader(props) {
  const { children, className, isLoading, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-header`, className)} {...rest}>
      {isLoading ? (
        <SkeletonPlaceholder style={{ padding: '1rem', height: '5rem', width: '100%' }} />
      ) : (
        children
      )}
    </section>
  );
}

export default FeatureSideNavHeader;
