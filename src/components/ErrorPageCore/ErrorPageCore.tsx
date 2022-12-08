import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import GenericErrorBackground from "./GenericErrorBackground";

type Props = {
  className?: string;
  graphic?: React.ReactNode;
  header?: React.ReactNode;
  message?: React.ReactNode;
  statusUrl?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
};

export default function ErrorPageCore({
  className,
  graphic,
  header = "Oops!",
  message,
  statusUrl,
  style,
  title = "Something looks off, but we're getting a handle of it.",
}: Props) {
  return (
    <div className={cx(`${prefix}--bmrg-error-page-core`, className)} style={style}>
      {graphic ?? <GenericErrorBackground className={`${prefix}--bmrg-error-page-core__background`} />}
      <div className={`${prefix}--bmrg-error-page-core__content`}>
        {header && <h1 className={`${prefix}--bmrg-error-page-core__header`}>{header}</h1>}
        {title && <p className={`${prefix}--bmrg-error-page-core__title`}>{title}</p>}
        <section className={`${prefix}--bmrg-error-page-core__message`}>
          {message ? (
            message
          ) : (
            <p>
              Hit the back button to return to your previous page, or if you keep finding yourself here,
              <a href={statusUrl}>{` navigate to Support Center `}</a>
              for help.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
