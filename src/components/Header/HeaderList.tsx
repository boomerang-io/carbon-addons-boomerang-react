import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
    children?: React.ReactNode;
    className?: string;
};



const HeaderList = (props: Props) => {
  const { children, className, ...other } = props;

  const HeaderListClasses = cx(`${prefix}--bmrg-header-list`, className);

  return (
    <ul className={HeaderListClasses} {...other}>
      {children}
    </ul>
  );
};

export default HeaderList;
