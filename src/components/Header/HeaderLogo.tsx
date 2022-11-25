import React from "react";
import { prefix } from "../../internal/settings";

HeaderLogo.defaultProps = {
  href: "/",
};

type OwnProps = {
  appName?: string;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  navLinks?: any[];
  platformName?: string;
};

type Props = OwnProps & typeof HeaderLogo.defaultProps;

function HeaderLogo (props: Props) {
  const { appName, children, href, navLinks, platformName } = props;

  return (
    <div className={`${prefix}--bmrg-header-brand`}>
      {(children || platformName || appName) && (
        <a aria-label="Home" className={`${prefix}--bmrg-header-brand__link`} href={href} tabIndex={0}>
          {children}
          <div className={`${prefix}--bmrg-header-brand__wrapper`}>
            {(platformName || appName) && <h1 className={`${prefix}--bmrg-header-brand__title`}>{platformName}</h1>}
            {appName && <span className={`${prefix}--bmrg-header-brand__text`}>{appName}</span>}
          </div>
        </a>
      )}
      {Array.isArray(navLinks) && navLinks.length > 0 ? (
        <div className={`${prefix}--bmrg-header-brand__divider`} />
      ) : null}
    </div>
  );
};

export default HeaderLogo;
