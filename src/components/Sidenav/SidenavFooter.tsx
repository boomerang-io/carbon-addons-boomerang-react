import React from "react";
import { prefix } from "../../internal/settings";

type Props = {
    children?: React.ReactNode;
};



const SidenavFooter = ({ children, ...rest }: Props) => {
  return (
    <footer className={`${prefix}--bmrg-sidenav-footer`} {...rest}>
      {children}
    </footer>
  );
};

export default SidenavFooter;
