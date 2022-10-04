import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { SkeletonPlaceholder } from "@carbon/react";
import { prefix } from "../../internal/settings";



FeatureHeader.defaultProps = {
  className: "",
  contentClassName: "",
  skeletonClassName: "",
  navClassName: "",
  headerClassName: "",
  footerClassName: "",
  includeBorder: true,
  isLoading: false,
};

FeatureHeader.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  footer: PropTypes.node,
  header: PropTypes.node,
  includeBorder: PropTypes.bool,
  isLoading: PropTypes.bool,
  nav: PropTypes.node,
  style: PropTypes.object,
  title: PropTypes.node,
  contentClassName: PropTypes.string,
  skeletonClassName: PropTypes.string,
  navClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  footerClassName: PropTypes.string,
};

export function FeatureHeader({
  actions,
  children,
  className,
  footer,
  header,
  includeBorder,
  isLoading,
  nav,
  style,
  contentClassName,
  footerClassName,
  headerClassName,
  navClassName,
  skeletonClassName,
  ...rest
}) {
  const containerClassNames = cx(`${prefix}--bmrg-feature-header`, className, {
    "--bordered": includeBorder,
  });
  const contentClassNames = cx(`${prefix}--bmrg-feature-header__content`, contentClassName);
  const skeletonClassNames = cx(`${prefix}--bmrg-feature-header__loading`, skeletonClassName);
  const navClassNames = cx(`${prefix}--bmrg-feature-header__nav`, navClassName);
  const headerClassNames = cx(`${prefix}--bmrg-feature-header__header`, headerClassName);
  const footerClassNames = cx(`${prefix}--bmrg-feature-header__footer`, footerClassName);

  return (
    <header className={containerClassNames} style={style} {...rest}>
      <section className={contentClassNames}>
        {nav && <div className={navClassNames}>{nav}</div>}
        {isLoading ? (
          <SkeletonPlaceholder className={skeletonClassNames} />
        ) : (
          <>
            {header && <div className={headerClassNames}>{header}</div>}
            {children}
          </>
        )}
        {footer && <div className={footerClassNames}>{footer}</div>}
      </section>
      {actions}
    </header>
  );
}

FeatureHeaderTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  element: PropTypes.string,
};

FeatureHeaderTitle.defaultProps = {
  className: "",
  element: "h1",
};

export function FeatureHeaderTitle({ element: Element, children, className, style, ...rest }) {
  const classNames = cx(`${prefix}--bmrg-feature-header-title`, className);
  return (
    <Element className={classNames} style={style} {...rest}>
      {children}
    </Element>
  );
}

export function FeatureHeaderSubtitle(props) {
  return <FeatureHeaderTitle element="p" {...props} />;
}