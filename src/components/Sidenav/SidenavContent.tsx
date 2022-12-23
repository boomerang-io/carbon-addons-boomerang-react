import React from "react";
import { prefix } from "../../internal/settings";

type Props = {
  children?: React.ReactNode;
};

const SidenavContent = ({ children, ...rest }: Props) => {
  return (
    <main className={`${prefix}--bmrg-sidenav-content`} {...rest}>
      {children}
    </main>
  );
};

export default SidenavContent;
