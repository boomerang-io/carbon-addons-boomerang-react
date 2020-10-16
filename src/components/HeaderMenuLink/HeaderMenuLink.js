import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';
import { Button } from 'carbon-components-react';
import {
  ArrowRight16,
  Chat16,
  Debug20,
  Forum16,
  HelpDesk16,
  Group20,
  Information16,
  Launch16,
  Locked16,
  Power16,
  Workspace20,
} from '@carbon/icons-react';

const { prefix } = settings;

const iconClassName = `${prefix}--bmrg-header-menu-item__img`;
const iconFill = '#FBFCFC';

const iconMapping = {
  workspace: <Workspace20 fill={iconFill} className={iconClassName} />,
  group: <Group20 fill={iconFill} className={iconClassName} />,
  chat: <Chat16 fill={iconFill} className={iconClassName} />,
  debug: <Debug20 fill={iconFill} className={iconClassName} />,
  power: <Power16 fill={iconFill} className={iconClassName} />,
  information: <Information16 fill={iconFill} className={iconClassName} />,
  locked: <Locked16 fill={iconFill} className={iconClassName} />,
  launch: <Launch16 fill={iconFill} className={iconClassName} />,
  support: <HelpDesk16 fill={iconFill} className={iconClassName} />,
  forum: <Forum16 fill={iconFill} className={iconClassName} />,
};

HeaderMenuLink.propTypes = {
  /**
   * alt text for carbon icon
   */
  altIconText: PropTypes.string,
  /**
   * override default className
   */
  className: PropTypes.string,
  /**
   * user specifies what to render when HeaderMenuItem is clicked
   */
  children: PropTypes.any,
  /**
   * the address of what is being linked to
   */
  href: PropTypes.string.isRequired,
  /**
   * carbon name for icon to be rendered (internally mapped)
   */
  iconName: PropTypes.oneOf([
    'workspace',
    'group',
    'chat',
    'debug',
    'power',
    'information',
    'locked',
    'launch',
    'forum',
    'support',
  ]),
  /**
   *
   */
  style: PropTypes.object,
  /**
   * text to be displayed next to the icon
   */
  text: PropTypes.string.isRequired,

  /**
   * props to modalWrapper
   */
  disabled: PropTypes.bool,
  external: PropTypes.bool,
};

function HeaderMenuLink({ className, external = true, href, iconName, style, text, ...rest }) {
  const wrapperClassNames = cx(`${prefix}--bmrg-header-menu-item-wrapper`, {
    [className]: !!className,
  });

  const iconToRender = iconMapping[iconName];

  return (
    <div className={wrapperClassNames} style={style} role="presentation">
      <Button className={`${prefix}--bmrg-header-menu-item`} href={href} role="link" {...rest}>
        <div className={`${prefix}--bmrg-header-menu-item__content`}>
          {Boolean(iconToRender) && (
            <div className={`${prefix}--bmrg-header-menu-item__img`}>{iconMapping[iconName]}</div>
          )}
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {text}
            {external ? (
              <Launch16 fill={iconFill} className={iconClassName} style={{ height: '0.75rem' }} />
            ) : (
              <ArrowRight16
                fill={iconFill}
                className={iconClassName}
                style={{ height: '0.75rem' }}
              />
            )}
          </span>
        </div>
      </Button>
    </div>
  );
}

export default HeaderMenuLink;
