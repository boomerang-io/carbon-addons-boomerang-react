import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';

import ErrorGraphic from './assets/ErrorGraphic.js';

const { prefix } = settings;

const ErrorDragon = ({ className, header, message, style, statusText, statusUrl, title, ...rest }) => {
  const classNames = classnames(`${prefix}--bmrg-error-dragon`, className);
  return (
    <div className={classNames} style={style} {...rest}>
      <ErrorGraphic className={`${prefix}--bmrg-error-dragon__image`} alt="dragon" />
      <h1 className={`${prefix}--bmrg-error-dragon__title`}>{header}</h1>
      <p className={`${prefix}--bmrg-error-dragon__text`}>
        {title}
      </p>
      <p className={`${prefix}--bmrg-error-dragon__text`}>
        {message}
      </p>
      <a href={statusUrl} className={`${prefix}--bmrg-error-dragon__status`}>
        {statusText}
      </a>
    </div>
  );
};

ErrorDragon.defaultProps = {
  className: '',
  header: "Don’t lose your daks",
  message: "And if you could be so kind, please send us a bug report.",
  statusText: "View Boomerang Status",
  title: "Cheers! You found an error. Try reloading the page.",
};

ErrorDragon.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  message: PropTypes.string,
  style: PropTypes.object,
  statusText: PropTypes.string,
  statusUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ErrorDragon;
