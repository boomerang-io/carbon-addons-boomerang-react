import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';
import { Button } from 'carbon-components-react';
import {
  Chat16,
  Debug20,
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
};

HeaderMenuButton.propTypes = {
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
  ]),
  onClick: PropTypes.func,
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
};

HeaderMenuButton.defaultProps = {
  iconName: 'launch',
};

function HeaderMenuButton({ className, iconName, onClick, style, text, ...rest }) {
  const wrapperClassNames = cx(`${prefix}--bmrg-header-menu-item-wrapper`, {
    [className]: !!className,
  });

  return (
    <div className={wrapperClassNames} style={style} role="presentation">
      <Button className={`${prefix}--bmrg-header-menu-item`} onClick={onClick} {...rest}>
        <div className={`${prefix}--bmrg-header-menu-item__content`}>
          <div className={`${prefix}--bmrg-header-menu-item__img`}>{iconMapping[iconName]}</div>
          <span className={`${prefix}--bmrg-header-menu-item__text`}>{text}</span>
        </div>
      </Button>
    </div>
  );
}

export default HeaderMenuButton;
