import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { SkeletonPlaceholder } from 'carbon-components-react';
import { settings } from 'carbon-components';

FeatureSideNavFooter.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

const { prefix } = settings;

export function FeatureSideNavFooter(props) {
  const { children, className, isLoading, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-footer`, className)} {...rest}>
      {isLoading ? (
        <SkeletonPlaceholder style={{ padding: '1rem', height: '3rem', width: '100%' }} />
      ) : (
        children
      )}
    </section>
  );
}

export default FeatureSideNavFooter;
