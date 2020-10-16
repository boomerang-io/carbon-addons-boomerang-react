import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const HeaderLogo = (props) => {
  const { appName, children, className, navLinks, platformName, ...other } = props;

  const HeaderLogoClasses = classNames(`${prefix}--bmrg-header-brand`, className);

  return (
    <div className={HeaderLogoClasses} {...other}>
      {children}
      <div className={`${prefix}--bmrg-header-brand__wrapper`}>
        {(platformName || appName) && (
          <h1 className={`${prefix}--bmrg-header-brand__title`}>{platformName}</h1>
        )}
        {appName && <span className={`${prefix}--bmrg-header-brand__text`}>{appName}</span>}
      </div>
      {Array.isArray(navLinks) && navLinks.length > 0 ? (
        <div className={`${prefix}--bmrg-header-brand__divider`} />
      ) : null}
    </div>
  );
};

HeaderLogo.propTypes = {
  appName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  navLinks: PropTypes.array,
  platformName: PropTypes.string,
};

HeaderLogo.defaultProps = {};

export default HeaderLogo;
