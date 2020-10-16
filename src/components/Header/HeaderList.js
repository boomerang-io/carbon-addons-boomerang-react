import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const HeaderList = (props) => {
  const { children, className, ...other } = props;

  const HeaderListClasses = classNames(`${prefix}--bmrg-header-list`, className);

  return (
    <ul className={HeaderListClasses} {...other}>
      {children}
    </ul>
  );
};

HeaderList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default HeaderList;
