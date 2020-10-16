import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';

import ErrorGraphic from './assets/ErrorGraphic.js';

const { prefix } = settings;

const ErrorDragon = ({ className, style, statusUrl, ...rest }) => {
  const classNames = classnames(`${prefix}--bmrg-error-dragon`, className);
  return (
    <div className={classNames} style={style} {...rest}>
      <ErrorGraphic className={`${prefix}--bmrg-error-dragon__image`} alt="dragon" />
      <h1 className={`${prefix}--bmrg-error-dragon__title`}>Don’t lose your daks</h1>
      <p className={`${prefix}--bmrg-error-dragon__text`}>
        Cheers! You found an error. Try reloading the page.
      </p>
      <p className={`${prefix}--bmrg-error-dragon__text`}>
        And if you could be so kind, please send us a bug report.
      </p>
      <a href={statusUrl} className={`${prefix}--bmrg-error-dragon__status`}>
        View Boomerang Status
      </a>
    </div>
  );
};

ErrorDragon.defaultProps = {
  className: '',
};

ErrorDragon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  statusUrl: PropTypes.string.isRequired,
};

export default ErrorDragon;
