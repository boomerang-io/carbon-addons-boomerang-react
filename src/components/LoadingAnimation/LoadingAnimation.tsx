import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { prefix } from "../../internal/settings";

import loadingMessages from "./loadingMessages";
import LoadingAnimationContent from "./LoadingAnimationContent";

type OwnProps = {
    centered?: boolean;
    message?: string | any[];
    loading?: boolean;
    wait?: number;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof LoadingAnimation.defaultProps;



/** Loading animation with integrated loading svg, and messages to be randomly selected by default and
 * configurable time to wait to render to prevent flickering on quickly resolved requests */
// @ts-expect-error TS(7022): 'LoadingAnimation' implicitly has type 'any' becau... Remove this comment to see the full error message
const LoadingAnimation = ({ centered, className, loading, message, wait, ...rest }: Props) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, wait);

    return () => clearTimeout(timer);
  }, [wait]);

  const selectRandomLoadingMessage = () => {
    return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  };

  let messages = message !== undefined ? message : selectRandomLoadingMessage();
  if (!Array.isArray(messages)) messages = [messages];

  if (shouldRender && loading) {
    return centered ? (
      ReactDom.createPortal(
        <div className={`${prefix}--bmrg-loading-animation--centered`}>
          <LoadingAnimationContent className={className} messages={messages} {...rest} />
        </div>,
        document.body
      )
    ) : (
      <LoadingAnimationContent className={className} messages={messages} {...rest} />
    );
  }

  return null;
};

LoadingAnimation.defaultProps = {
  centered: false,
  loading: true,
  wait: 200,
};

export default LoadingAnimation;
