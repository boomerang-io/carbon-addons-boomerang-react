import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';

import Loading from './assets/Loading';

const { prefix } = settings;

const LoadingAnimationContent = ({ className, messages, ...rest }) => {
  return (
    <div className={cx(`${prefix}--bmrg-loading-animation`, className)} {...rest}>
      <Loading className={`${prefix}--bmrg-loading-animation__img`} />
      {messages.map((message, index) => (
        <div key={index} className={`${prefix}--bmrg-loading-animation__text`}>
          {message}
        </div>
      ))}
    </div>
  );
};

LoadingAnimationContent.defaultProps = {
  className: '',
};

LoadingAnimationContent.propTypes = {
  className: PropTypes.string,
  messages: PropTypes.array.isRequired,
};

export default LoadingAnimationContent;
