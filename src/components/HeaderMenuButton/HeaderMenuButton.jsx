
import PropTypes from "prop-types";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import { Button } from "@carbon/react";
import { Chat, Debug, Group, Information, Launch, Locked, Power, Workspace } from "@carbon/react/icons";

const iconClassName = `${prefix}--bmrg-header-menu-item__img`;
const iconFill = "#FBFCFC";

const iconMapping = {
  workspace: <Workspace size={16} fill={iconFill} className={iconClassName} />,
  group: <Group size={16} fill={iconFill} className={iconClassName} />,
  chat: <Chat size={16} fill={iconFill} className={iconClassName} />,
  debug: <Debug size={16} fill={iconFill} className={iconClassName} />,
  power: <Power size={16} fill={iconFill} className={iconClassName} />,
  information: <Information size={16} fill={iconFill} className={iconClassName} />,
  locked: <Locked size={16} fill={iconFill} className={iconClassName} />,
  launch: <Launch size={16} fill={iconFill} className={iconClassName} />,
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
  iconName: PropTypes.oneOf(["workspace", "group", "chat", "debug", "power", "information", "locked", "launch"]),
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
  iconName: "launch",
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
