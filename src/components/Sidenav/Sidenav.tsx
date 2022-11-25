import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

import SidenavHeader from "./SidenavHeader";
import SidenavContent from "./SidenavContent";
import SidenavFooter from "./SidenavFooter";
import SidenavLinks from "./SidenavLinks";

Sidenav.defaultProps = {
  theme: "bmrg-black",
};

type OwnProps = {
  content?: (...args: any[]) => any;
  footer?: (...args: any[]) => any;
  header?: (...args: any[]) => any;
  hidden?: boolean;
  navItems?: any[];
  theme?: string;
};

type Props = OwnProps & typeof Sidenav.defaultProps;

function Sidenav({ header, hidden, content, navItems, footer, theme, ...rest }: Props) {
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
}

export default Sidenav;
