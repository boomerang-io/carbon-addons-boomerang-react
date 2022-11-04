import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type OwnProps = {
  ariaExpanded?: boolean;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  id?: string;
  isIcon?: boolean;
  newNotifications?: boolean;
  onClick?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
};

//type Props = OwnProps & typeof HeaderListItem.defaultProps;

const HeaderListItem = (props: OwnProps) => {
  const { children, className, href, isIcon, ariaExpanded, newNotifications, id, ...other } = props;

  const headerListItemClasses = cx(`${prefix}--bmrg-header-list__item`, className);

  return (
    <div className={headerListItemClasses}>
      {isIcon ? (
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
      ) : (
        <a
          className={cx(`${prefix}--bmrg-header-list__link`, {
            "--is-active": window?.location?.href && href ? window.location.href.startsWith(href) : false,
          })}
          href={href}
          tabIndex={0}
          {...other}
        >
          {children}
        </a>
      )}
    </div>
  );
};

HeaderListItem.defaultProps = {
  href: "",
};

export default HeaderListItem;
