import React from "react";
import ErrorGraphic from "./assets/ErrorGraphic";
import cx from "classnames";
import { prefix } from "../../internal/settings";

export type Props = {
  className?: string;
  header?: React.ReactNode;
  message?: React.ReactNode;
  style?: React.CSSProperties;
  statusText?: React.ReactNode;
  statusUrl: string;
  title?:  React.ReactNode;
};

function ErrorDragon({
  className = "",
  header = "Don’t lose your daks",
  message = "And if you could be so kind, please send us a bug report.",
  statusText = "View Support Center",
  title = "Cheers! You found an error. Try reloading the page.",
  statusUrl,
  style,
  ...rest
}: Props) {
  const classNames = cx(`${prefix}--bmrg-error-dragon`, className);
  return (
    <div className={classNames} style={style} {...rest}>
      <ErrorGraphic className={`${prefix}--bmrg-error-dragon__image`} title="dragon" />
      <h1 className={`${prefix}--bmrg-error-dragon__title`}>{header}</h1>
      <p className={`${prefix}--bmrg-error-dragon__text`}>{title}</p>
      <p className={`${prefix}--bmrg-error-dragon__text`}>{message}</p>
      <a href={statusUrl} className={`${prefix}--bmrg-error-dragon__status`}>
        {statusText}
      </a>
    </div>
  );
}

export default ErrorDragon;
