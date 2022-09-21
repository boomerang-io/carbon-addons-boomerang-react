import React from "react";
import PropTypes from "prop-types";
import FocusTrap from "focus-trap-react";
import classnames from "classnames";
import { prefix } from "../../internal/settings";

LeftSideNav.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default function LeftSideNav(props) {
  const {
    className,
    children,
    isOpen, // eslint-disable-line no-unused-vars
    ...other
  } = props;

  const classNames = classnames(`${prefix}--bmrg-left-side-nav-container`, className);

  return (
    <FocusTrap active={isOpen} focusTrapOptions={{ allowOutsideClick: true }}>
      <aside aria-label="Left side nav" className={classNames} tabIndex={-1} {...other}>
        {children}
      </aside>
    </FocusTrap>
  );
}
