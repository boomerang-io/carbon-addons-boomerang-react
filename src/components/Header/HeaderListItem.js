import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';
import window from 'window-or-global';

const { prefix } = settings;

const HeaderListItem = (props) => {
  const { children, className, href, isIcon, ariaExpanded, newNotifications, id, ...other } = props;

  const headerListItemClasses = cx(`${prefix}--bmrg-header-list__item`, className);

  return (
    <div className={headerListItemClasses}>
      {isIcon ? (
        <div
          aria-expanded={ariaExpanded}
          aria-haspopup="true"
          aria-label={`button for ${id}`}
          role="button"
          tabIndex="0"
          className={`${prefix}--bmrg-header-list__btn`}
          {...other}
        >
          {children}
        </div>
      ) : (
        <a
          className={cx(`${prefix}--bmrg-header-list__link`, {
            '--is-active':
              window.location &&
              window.location.href &&
              href &&
              window.location.href.startsWith(href),
          })}
          href={href}
          {...other}
        >
          {children}
        </a>
      )}
    </div>
  );
};

HeaderListItem.propTypes = {
  ariaExpanded: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string,
  isIcon: PropTypes.bool,
  newNotifications: PropTypes.bool,
};

HeaderListItem.defaultProps = {
  href: '',
};

export default HeaderListItem;
