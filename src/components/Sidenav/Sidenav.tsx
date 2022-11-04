import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

import SidenavHeader from "./SidenavHeader";
import SidenavContent from "./SidenavContent";
import SidenavFooter from "./SidenavFooter";
import SidenavLinks from "./SidenavLinks";

type OwnProps = {
    content?: (...args: any[]) => any;
    footer?: (...args: any[]) => any;
    header?: (...args: any[]) => any;
    hidden?: boolean;
    navItems?: any[];
    theme?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Sidenav.defaultProps;



// @ts-expect-error TS(7022): 'Sidenav' implicitly has type 'any' because it doe... Remove this comment to see the full error message
const Sidenav = ({ header, hidden, content, navItems, footer, theme, ...rest }: Props) => {
  const classNames = cx(`${prefix}--bmrg-sidenav`, `--${theme}`, {
    "--hidden": hidden,
  });
  return (
    <aside className={classNames} {...rest}>
      {header && <SidenavHeader>{header()}</SidenavHeader>}
      {content && <SidenavContent>{content()}</SidenavContent>}
      {navItems && <SidenavLinks navItems={navItems} theme={theme} />}
      {footer && <SidenavFooter>{footer()}</SidenavFooter>}
    </aside>
  );
};

Sidenav.defaultProps = {
  theme: "bmrg-black",
};

export default Sidenav;
