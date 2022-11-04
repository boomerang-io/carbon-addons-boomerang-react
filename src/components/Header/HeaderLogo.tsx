import React from "react";
import { prefix } from "../../internal/settings";

type OwnProps = {
  appName?: string;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  navLinks?: any[];
  platformName?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof HeaderLogo.defaultProps;

// @ts-expect-error TS(7022): 'HeaderLogo' implicitly has type 'any' because it ... Remove this comment to see the full error message
const HeaderLogo = (props: Props) => {
  const { appName, children, href, navLinks, platformName } = props;

  return (
    <div className={`${prefix}--bmrg-header-brand`}>
      {(children || platformName || appName) && (
        // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
        <a alt="Home" aria-label="Home" className={`${prefix}--bmrg-header-brand__link`} href={href} tabIndex="0">
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

HeaderLogo.defaultProps = {
  href: "/",
};

export default HeaderLogo;
