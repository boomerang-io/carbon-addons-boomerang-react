import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const HeaderWrapper = (props: Props) => {
  const { children, className, ...other } = props;

  const HeaderWrapperClasses = cx(`${prefix}--bmrg-header__wrapper`, className);

  return (
    <div className={HeaderWrapperClasses} {...other}>
      {children}
    </div>
  );
};

export default HeaderWrapper;
