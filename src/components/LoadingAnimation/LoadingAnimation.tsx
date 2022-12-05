import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { prefix } from "../../internal/settings";

import loadingMessages from "./loadingMessages";
import LoadingAnimationContent from "./LoadingAnimationContent";

type Props = {
  centered?: boolean;
  className?: string;
  message?: string | any[];
  loading?: boolean;
  wait?: number;
};

/** Loading animation with integrated loading svg, and messages to be randomly selected by default and
 * configurable time to wait to render to prevent flickering on quickly resolved requests */
function LoadingAnimation({ centered = false, className, loading = true, message, wait = 200, ...rest }: Props) {
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
}

export default LoadingAnimation;
