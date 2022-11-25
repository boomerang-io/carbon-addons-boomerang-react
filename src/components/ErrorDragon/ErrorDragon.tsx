import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

import ErrorGraphic from "./assets/ErrorGraphic";

ErrorDragon.defaultProps = {
  className: "",
  header: "Don’t lose your daks",
  message: "And if you could be so kind, please send us a bug report.",
  statusText: "View Support Center",
  title: "Cheers! You found an error. Try reloading the page.",
};
interface OwnProps {
  className?: string;
  header?: string;
  message?: string;
  style?: any;
  statusText?: string;
  statusUrl: string;
  title?: string;
}

type Props = OwnProps & typeof ErrorDragon.defaultProps;

function ErrorDragon({ className, header, message, style, statusText, statusUrl, title, ...rest }: Props) {
  const classNames = cx(`${prefix}--bmrg-error-dragon`, className);
  return (
    <div className={classNames} style={style} {...rest}>
      <ErrorGraphic className={`${prefix}--bmrg-error-dragon__image`} alt="dragon" />
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
