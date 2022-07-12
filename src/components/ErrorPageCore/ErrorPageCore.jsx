import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import GenericErrorBackground from "./GenericErrorBackground";


ErrorPageCore.propTypes = {
  className: PropTypes.string,
  graphic: PropTypes.node,
  header: PropTypes.node,
  message: PropTypes.node,
  statusUrl: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.node,
};

ErrorPageCore.defaultProps = {
  header: "Oops!",
  title: "Something looks off, but we're getting a handle of it.",
};

export default function ErrorPageCore({ className, graphic, header, message, statusUrl, style, title }) {
  return (
    <div className={cx(`${prefix}--bmrg-error-page-core`, className)} style={style}>
      {graphic ?? <GenericErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />}
      <div className={`${prefix}--bmrg-error-page-core__content`}>
        {header && <header className={`${prefix}--bmrg-error-page-core__header`}>{header}</header>}
        {title && <h1 className={`${prefix}--bmrg-error-page-core__title`}>{title}</h1>}
        <section className={`${prefix}--bmrg-error-page-core__message`}>
          {message ? (
            message
          ) : (
            <p>
              Hit the back button to return to your previous page, or if you keep finding yourself here,
              <a href={statusUrl}>{` navigate to status `}</a>
              for help.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
