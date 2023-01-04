import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  ariaExpanded?: boolean;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  id?: string;
  newNotifications?: boolean;
  onClick?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
};

const HeaderListItem = (props: Props) => {
  const { children, className, href = "", ariaExpanded, newNotifications, id, ...other } = props;

  const headerListItemClasses = cx(`${prefix}--bmrg-header-list__item`, className);

  return (
    <div className={headerListItemClasses}>
      <div
        aria-expanded={ariaExpanded}
        aria-haspopup="true"
        role="button"
        tabIndex={0}
        className={`${prefix}--bmrg-header-list__btn`}
        {...other}
      >
        {children}
      </div>
    </div>
  );
};

export default HeaderListItem;
