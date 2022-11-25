import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

FeatureNavTabs.defaultProps = {
  className: "",
  contained: false,
  light: false,
};

type OwnProps = {
  ariaLabel: string;
  children?: React.ReactNode;
  className?: string;
  contained?: boolean;
  light?: boolean;
  style?: any;
};

type Props = OwnProps & typeof FeatureNavTabs.defaultProps;

function FeatureNavTabs({ ariaLabel, children, className, contained, light, style, ...rest }: Props) {
  const classNames = cx(
    `${prefix}--tabs`,
    {
      [`${prefix}--tabs--contained`]: contained,
      [`${prefix}--tabs--light`]: light,
    },
    className
  );

  return (
    <nav aria-label={ariaLabel} className={classNames} style={style} {...rest}>
      <ul className={`${prefix}--tab--list`}>{children}</ul>
    </nav>
  );
}

export default FeatureNavTabs;
