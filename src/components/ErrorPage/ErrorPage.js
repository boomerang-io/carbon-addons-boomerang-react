import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';
import background from "./static/generic.svg";
const { prefix } = settings;

ErrorPage.propTypes = {
  className: PropTypes.string,
  graphic: PropTypes.node,
  header: PropTypes.node,
  message: PropTypes.node,
  style: PropTypes.object,
  title: PropTypes.node,
};

export default function ErrorPage({ className, graphic, header, message, style, title }) {
  return (
    <div className={cx(`${prefix}--bmrg-error-page`, className)} style={style}>
      <img className={`${prefix}--bmrg-error-page__background`} src={graphic ?? background} alt={title} />
      <div className={`${prefix}--bmrg-error-page__content`}>
        {header && <header className={`${prefix}--bmrg-error-page__header`}>{header}</header>}
        {title && <h1 className={`${prefix}--bmrg-error-page__title`}>{title}</h1>}
        {message && <section className={`${prefix}--bmrg-error-page__message`}>{message}</section>}
      </div>   
    </div>
  );
}
