/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { Warning } from "@carbon/react/icons";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  status?: React.ReactNode;
  statusText?: React.ReactNode;
};

function Error({ status, statusText, className = "", style, ...rest }: Props) {
  let message;
  if (status && statusText) {
    message = <div className={`${prefix}--bmrg-error-message__status`}>{`Status: ${status} ${statusText}`}</div>;
  } else if (status) {
    message = <div className={`${prefix}--bmrg-error-message__status`}>{`Status: ${status}`}</div>;
  } else if (statusText) {
    message = <div className={`${prefix}--bmrg-error-message__status`}>{`${statusText}`}</div>;
  }

  const classNames = cx(`${prefix}--bmrg-error-message`, className);

  return (
    <div className={classNames} style={style} {...rest}>
      <Warning size={16} className={`${prefix}--bmrg-error-message__img`} alt="Warning" />
      <h2 className={`${prefix}--bmrg-error-message__text`}>Oops, something went wrong.</h2>
      {message}
      <p className={`${prefix}--bmrg-error-message__subtext`}>
        Try reloading the page. And if you could be so kind, please send us an issue report.
      </p>
    </div>
  );
}

export default Error;
