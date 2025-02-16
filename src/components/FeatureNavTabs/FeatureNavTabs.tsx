/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  ariaLabel: string;
  children?: React.ReactNode;
  className?: string;
  contained?: boolean;
  light?: boolean;
  style?: React.CSSProperties;
};

function FeatureNavTabs({
  ariaLabel,
  children,
  className = "",
  contained = false,
  light = false,
  style,
  ...rest
}: Props) {
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
