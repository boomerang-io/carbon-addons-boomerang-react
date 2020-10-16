import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

import loadingMessages from './loadingMessages';
import LoadingAnimationContent from './LoadingAnimationContent';

const { prefix } = settings;

/** Loading animation with integrated loading svg, and messages to be randomly selected by default and
 * configurable time to wait to render to prevent flickering on quickly resolved requests */
const LoadingAnimation = ({ centered, className, loading, message, wait, ...rest }) => {
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

LoadingAnimation.propTypes = {
  centered: PropTypes.bool,
  /** Message to display when loading */
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  loading: PropTypes.bool,
  /** Time to wait in milliseconds before rendering the component */
  wait: PropTypes.number,
};

export default LoadingAnimation;
