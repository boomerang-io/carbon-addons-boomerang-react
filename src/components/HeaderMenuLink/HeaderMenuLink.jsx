
import PropTypes from "prop-types";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import { Button } from "@carbon/react";
import {
  ArrowRight,
  Chat,
  Debug,
  Email,
  Forum,
  HelpDesk,
  Group,
  Information,
  Launch,
  Locked,
  Power,
  Workspace,
} from "@carbon/react/icons";

const iconClassName = `${prefix}--bmrg-header-menu-item__img`;
const iconFill = "#FBFCFC";

const iconMapping = {
  chat: <Chat size={16} fill={iconFill} className={iconClassName} />,
  debug: <Debug size={16} fill={iconFill} className={iconClassName} />,
  email: <Email size={16} fill={iconFill} className={iconClassName} />,
  forum: <Forum size={16} fill={iconFill} className={iconClassName} />,
  group: <Group size={16} fill={iconFill} className={iconClassName} />,
  information: <Information size={16} fill={iconFill} className={iconClassName} />,
  launch: <Launch size={16} fill={iconFill} className={iconClassName} />,
  locked: <Locked size={16} fill={iconFill} className={iconClassName} />,
  power: <Power size={16} fill={iconFill} className={iconClassName} />,
  support: <HelpDesk size={16} fill={iconFill} className={iconClassName} />,
  workspace: <Workspace size={16} fill={iconFill} className={iconClassName} />,
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
    "chat",
    "debug",
    "email",
    "forum",
    "group",
    "information",
    "launch",
    "locked",
    "power",
    "support",
    "workspace",
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
      <Button
        className={`${prefix}--bmrg-header-menu-item`}
        href={href}
        role="link"
        {...rest}
        aria-label={`link for ${text}`}
      >
        <div className={`${prefix}--bmrg-header-menu-item__content`}>
          {Boolean(iconToRender) && (
            <div className={`${prefix}--bmrg-header-menu-item__img`}>{iconMapping[iconName]}</div>
          )}
          <span className={`${prefix}--bmrg-header-menu-item__text`}>
            {text}
            {external ? (
              <Launch
                size={16}
                fill={iconFill}
                className={iconClassName}
                style={{ height: "0.75rem" }}
                aria-label={`${text} icon`}
              />
            ) : (
              <ArrowRight
                size={16}
                fill={iconFill}
                className={iconClassName}
                style={{ height: "0.75rem" }}
                aria-label={`${text} icon`}
              />
            )}
          </span>
        </div>
      </Button>
    </div>
  );
}

export default HeaderMenuLink;
