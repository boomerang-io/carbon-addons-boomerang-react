import React from "react";
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

type OwnFeatureHeaderProps = {
    actions?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    footer?: React.ReactNode;
    header?: React.ReactNode;
    includeBorder?: boolean;
    isLoading?: boolean;
    nav?: React.ReactNode;
    style?: any;
    title?: React.ReactNode;
    contentClassName?: string;
    skeletonClassName?: string;
    navClassName?: string;
    headerClassName?: string;
    footerClassName?: string;
};

type FeatureHeaderProps = OwnFeatureHeaderProps & typeof FeatureHeader.defaultProps;

export function FeatureHeader({ actions, children, className, footer, header, includeBorder, isLoading, nav, style, contentClassName, footerClassName, headerClassName, navClassName, skeletonClassName, ...rest }: FeatureHeaderProps) {
  const containerClassNames = cx(`${prefix}--bmrg-feature-header`, className, {
    "--bordered": includeBorder,
  });
  const contentClassNames = cx(`${prefix}--bmrg-feature-header__content`, contentClassName);
  const skeletonClassNames = cx(`${prefix}--bmrg-feature-header__loading`, skeletonClassName);
  const navClassNames = cx(`${prefix}--bmrg-feature-header__nav`, navClassName);
  const headerClassNames = cx(`${prefix}--bmrg-feature-header__header`, headerClassName);
  const footerClassNames = cx(`${prefix}--bmrg-feature-header__footer`, footerClassName);

  return (
    // @ts-expect-error TS(2322): Type '{ children: (Element | ReactNode)[]; title?:... Remove this comment to see the full error message
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

FeatureHeaderTitle.defaultProps = {
  className: "",
  element: "h1",
};

type OwnFeatureHeaderTitleProps = {
    children?: React.ReactNode;
    className?: string;
    element?: string;
};

type FeatureHeaderTitleProps = OwnFeatureHeaderTitleProps & typeof FeatureHeaderTitle.defaultProps;

// @ts-expect-error TS(2339): Property 'style' does not exist on type 'FeatureHe... Remove this comment to see the full error message
export function FeatureHeaderTitle({ element: Element, children, className, style, ...rest }: FeatureHeaderTitleProps) {
  const classNames = cx(`${prefix}--bmrg-feature-header-title`, className);
  return (
    // @ts-expect-error TS(2322): Type '{ children: ReactNode; className: string; st... Remove this comment to see the full error message
    <Element className={classNames} style={style} {...rest}>
      {children}
    </Element>
  );
}

export function FeatureHeaderSubtitle(props: any) {
  return <FeatureHeaderTitle element="p" {...props} />;
}
