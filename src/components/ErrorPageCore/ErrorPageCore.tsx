import React from "react";
import cx from "classnames";
import GenericErrorBackground from "./GenericErrorBackground";
import { prefix } from "../../internal/settings";

type SharedProps = {
  className?: string;
  graphic?: React.ReactNode;
  header?: React.ReactNode;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  [key: string]: any;
};

export type Props =
  | ({
      message: string;
    } & SharedProps)
  | ({ statusUrl: string } & SharedProps);

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
