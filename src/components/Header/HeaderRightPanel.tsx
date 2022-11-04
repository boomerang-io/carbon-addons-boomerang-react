import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
    content?: React.ReactElement;
    className?: string;
    isOpen?: boolean;
};

// @ts-expect-error TS(2339): Property 'children' does not exist on type 'Props'... Remove this comment to see the full error message
const HeaderRightPanel = ({ children, className, isOpen, ...rest }: Props) => {
  const classNames = cx(`${prefix}--bmrg-right-panel`, className, { "--is-hidden": !isOpen });
  return (
    <nav className={classNames} {...rest}>
      {children}
    </nav>
  );
};

export default HeaderRightPanel;
