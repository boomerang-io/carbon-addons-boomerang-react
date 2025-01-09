/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { default as Tippy } from "@tippyjs/react";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import type { TippyProps } from "@tippyjs/react";

type Alignment = "start" | "end";
type Direction = "auto" | "top" | "bottom" | "left" | "right";
type Placement = Direction | `${Direction}-${Alignment}`;

export type TooltipHoverProps = TippyProps & {
  align?: Alignment;
  direction?: Direction;
  placement?: Placement;
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
  ...rest
}: TooltipHoverProps) {
  // support all three for compat with both tippy props and carbon
  const contentToRender = content || tooltipContent || tooltipText;

  /**
   * Determine where to place it based on possible combinations
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
      placement={computedPlacement as TippyProps["placement"]}
      {...rest}
    >
      {children}
    </Tippy>
  );
}

export default TooltipHover;
