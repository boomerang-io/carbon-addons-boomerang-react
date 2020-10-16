import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tippy from '@tippyjs/react';
import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * Wrapper props
 * View all supported props here: https://atomiks.github.io/tippyjs/v6/all-props/
 */
TooltipHover.propTypes = {
  /**
   * Specify the alignment (to the trigger button) of the tooltip.
   * Can be one of: start or end. Default behavior is center.
   */
  align: PropTypes.oneOf(['start', 'end']),
  children: PropTypes.node,
  className: PropTypes.string,
  content: PropTypes.node,
  /**
   * Specify the direction of the tooltip. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['auto', 'top', 'bottom', 'left', 'right']),
  /**
   * https://atomiks.github.io/tippyjs/v6/all-props/#placement
   */
  placement: PropTypes.string,
  tooltipContent: PropTypes.node,
  tooltipText: PropTypes.node,
};

/**
 * TooltipHover to replace TooltipDefintion in most situations
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
}) {
  // support all three for compat with both tippy props and carbon
  const contentToRender = content || tooltipContent || tooltipText;

  /**
   * Determine where to place it based on possibble combinations
   *
   */
  let computedPlacement = '';

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
      computedPlacement = 'bottom';
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
      duration="100"
      placement={computedPlacement}
      {...restProps}
    >
      {children}
    </Tippy>
  );
}

export default TooltipHover;
