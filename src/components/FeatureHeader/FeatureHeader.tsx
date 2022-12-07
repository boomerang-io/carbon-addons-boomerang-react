import React from "react";
import cx from "classnames";
import { SkeletonPlaceholder } from "@carbon/react";
import { prefix } from "../../internal/settings";

type FeatureHeaderProps = {
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  includeBorder?: boolean;
  isLoading?: boolean;
  nav?: React.ReactNode;
  style?: any;
  title?: string;
  contentClassName?: string;
  skeletonClassName?: string;
  navClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  [key: string]: any;
};

export function FeatureHeader({
  actions,
  children,
  className = "",
  footer,
  header,
  includeBorder = true,
  isLoading = false,
  nav,
  style,
  contentClassName = "",
  footerClassName = "",
  headerClassName = "",
  navClassName = "",
  skeletonClassName = "",
  ...rest
}: FeatureHeaderProps) {
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

type FeatureHeaderTitleProps = {
  children?: React.ReactElement | string;
  className?: string;
  element?: any;
  style?: React.CSSProperties;
  [key: string]: any;
};

export function FeatureHeaderTitle({
  element: Element = "h1",
  children,
  className = "",
  style,
  ...rest
}: FeatureHeaderTitleProps) {
  const classNames = cx(`${prefix}--bmrg-feature-header-title`, className);
  return (
    <Element className={classNames} style={style} {...rest}>
      {children}
    </Element>
  );
}

export function FeatureHeaderSubtitle(props: any) {
  return <FeatureHeaderTitle element="p" {...props} />;
}
