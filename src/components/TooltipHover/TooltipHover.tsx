import React from "react";
import cx from "classnames";
import Tippy from "@tippyjs/react";
import { prefix } from "../../internal/settings";

type Props = {
  align?: "start" | "end";
  children?: React.ReactElement;
  className?: string;
  content?: React.ReactNode;
  direction?: "auto" | "top" | "bottom" | "left" | "right";
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "auto"
    | "auto-start"
    | "auto-end";
  tooltipContent?: React.ReactNode;
  tooltipText?: React.ReactNode;
  [key: string]: any;
};

/**
 * TooltipHover to replace TooltipDefintion in most situations.
 * Uses https://github.com/atomiks/tippyjs-react
 */
function TooltipHover({
  align,
  direction,
  children,
  className,
  content,
  placement,
  tooltipContent,
  tooltipText,
  ...restProps
}: Props) {
  // support all three for compat with both tippy props and carbon
  const contentToRender = content || tooltipContent || tooltipText;

  /**
   * Determine where to place it based on possibble combinations
   *
   */
  let computedPlacement = "";

  // Tippy prop placement takes precedence
  if (placement) {
    computedPlacement = placement;
  } else {
    if (direction && align) {
      computedPlacement = `${direction}-${align}`;
    } else if (direction) {
      computedPlacement = direction;
    } else if (align) {
      computedPlacement = `auto-${align}`;
    } else {
      computedPlacement = "bottom";
    }
  }

  // Sensible defaults to match CDS
  return (
    <Tippy
      arrow={`<svg height="6px" width="8px" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
      <polygon points= "0 60, 40 0, 80 60"/>
  </svg>`}
      animation="fade"
      className={cx(`${prefix}--bmrg-tooltip`, className)}
      content={contentToRender}
      duration={100}
      // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'Placement... Remove this comment to see the full error message
      placement={computedPlacement}
      {...restProps}
    >
      {children}
    </Tippy>
  );
}

export default TooltipHover;
