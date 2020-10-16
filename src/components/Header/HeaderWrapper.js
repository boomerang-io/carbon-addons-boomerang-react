import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const HeaderWrapper = (props) => {
  const { children, className, ...other } = props;

  const HeaderWrapperClasses = classNames(`${prefix}--bmrg-header__wrapper`, className);

  return (
    <div className={HeaderWrapperClasses} {...other}>
      {children}
    </div>
  );
};

HeaderWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default HeaderWrapper;
