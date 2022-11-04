import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type OwnProps = {
    ariaLabel: string;
    children?: React.ReactNode;
    className?: string;
    contained?: boolean;
    light?: boolean;
    style?: any;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof FeatureNavTabs.defaultProps;

// @ts-expect-error TS(7022): 'FeatureNavTabs' implicitly has type 'any' because... Remove this comment to see the full error message
const FeatureNavTabs = ({ ariaLabel, children, className, contained, light, style, ...rest }: Props) => {
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
};

FeatureNavTabs.defaultProps = {
  className: "",
  contained: false,
  light: false,
};

export default FeatureNavTabs;
