import React from "react";
import FocusTrap from "focus-trap-react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
    children?: React.ReactNode;
    className?: string;
    isOpen?: boolean;
};

export default function LeftSideNav(props: Props) {
  const {
    className,
    children,
    isOpen, // eslint-disable-line no-unused-vars
    ...other
  } = props;

  const classNames = cx(`${prefix}--bmrg-left-side-nav-container`, className);

  return (
    <FocusTrap active={isOpen} focusTrapOptions={{ allowOutsideClick: true }}>
      <aside aria-label="Left side nav" className={classNames} tabIndex={-1} {...other}>
        {children}
      </aside>
    </FocusTrap>
  );
}
