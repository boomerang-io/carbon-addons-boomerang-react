
import PropTypes from "prop-types";
import { prefix } from "../../internal/settings";



const HeaderLogo = (props) => {
  const { appName, children, href, navLinks, platformName } = props;

  return (
    <div className={`${prefix}--bmrg-header-brand`}>
      <a alt="Home" aria-label="Home" className={`${prefix}--bmrg-header-brand__link`} href={href} tabIndex="0">
        {children}
        <div className={`${prefix}--bmrg-header-brand__wrapper`}>
          {(platformName || appName) && <h1 className={`${prefix}--bmrg-header-brand__title`}>{platformName}</h1>}
          {appName && <span className={`${prefix}--bmrg-header-brand__text`}>{appName}</span>}
        </div>
      </a>
      {Array.isArray(navLinks) && navLinks.length > 0 ? (
        <div className={`${prefix}--bmrg-header-brand__divider`} />
      ) : null}
    </div>
  );
};

HeaderLogo.propTypes = {
  appName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  navLinks: PropTypes.array,
  platformName: PropTypes.string,
};

HeaderLogo.defaultProps = {
  href: "/",
};

export default HeaderLogo;
