import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  isOpen?: boolean;
  onClick?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
};

const HeaderMenuBmrg = React.forwardRef<any, Props>((props, ref) => {
  const { isOpen, ...other } = props;
  return (
    <button
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="header menu button"
      className={cx(`${prefix}--bmrg-header__app-menu`, {
        "--is-open": isOpen,
      })}
      ref={ref}
      {...other}
    >
      <svg height="32" version="1.1" viewBox="0 0 32 32" width="32">
        <g className="icon">
          <rect className="bar1" x="0" y="0" width="32" height="4" rx="2" />
          <rect className="bar2" x="0" y="12" width="32" height="4" rx="2" />
          <rect className="bar3" x="0" y="24" width="32" height="4" rx="2" />
        </g>
      </svg>
    </button>
  );
});

export default HeaderMenuBmrg;
