import React from "react";
import { prefix } from "../../internal/settings";

type Props = {
  children?: React.ReactNode;
};

const SidenavHeader = ({ children, ...rest }: Props) => {
  return (
    <header className={`${prefix}--bmrg-sidenav-header`} {...rest}>
      {children}
    </header>
  );
};

export default SidenavHeader;
