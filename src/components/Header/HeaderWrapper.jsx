import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { prefix } from "../../internal/settings";



const HeaderWrapper = (props) => {
  const { children, className, ...other } = props;

  const HeaderWrapperClasses = cx(`${prefix}--bmrg-header__wrapper`, className);

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
