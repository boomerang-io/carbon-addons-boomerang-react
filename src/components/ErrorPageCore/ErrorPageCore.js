import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';
import GenericErrorBackground from './GenericErrorBackground';
const { prefix } = settings;

ErrorPageCore.propTypes = {
  className: PropTypes.string,
  graphic: PropTypes.node,
  header: PropTypes.node,
  message: PropTypes.node,
  style: PropTypes.object,
  title: PropTypes.node,
};

export default function ErrorPageCore({ className, graphic, header, message, style, title }) {
  console.log();
  return (
    <div className={cx(`${prefix}--bmrg-error-page-core`, className)} style={style}>
      {graphic ?? <GenericErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />}
      <div className={`${prefix}--bmrg-error-page-core__content`}>
        {header && <header className={`${prefix}--bmrg-error-page-core__header`}>{header}</header>}
        {title && <h1 className={`${prefix}--bmrg-error-page-core__title`}>{title}</h1>}
        {message && <section className={`${prefix}--bmrg-error-page-core__message`}>{message}</section>}
      </div>   
          
    </div>
  );
}
