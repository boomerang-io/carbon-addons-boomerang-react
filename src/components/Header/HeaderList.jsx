import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { prefix } from "../../internal/settings";



const HeaderList = (props) => {
  const { children, className, ...other } = props;

  const HeaderListClasses = cx(`${prefix}--bmrg-header-list`, className);

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
