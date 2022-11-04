import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  children: React.ReactNode;
  className?: string;
  content?: React.ReactElement;
  isOpen?: boolean;
};

const HeaderRightPanel = ({ children, className, isOpen, ...rest }: Props) => {
  const classNames = cx(`${prefix}--bmrg-right-panel`, className, { "--is-hidden": !isOpen });
  return (
    <nav className={classNames} {...rest}>
      {children}
    </nav>
  );
};

export default HeaderRightPanel;
