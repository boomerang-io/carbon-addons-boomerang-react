import React from "react";
import cx from "classnames";
import { Warning } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

type OwnProps = {
  className?: string;
  style?: any;
  status?: string;
  statusText?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Error.defaultProps;

// @ts-expect-error TS(7022): 'Error' implicitly has type 'any' because it does ... Remove this comment to see the full error message
const Error = ({ status, statusText, className, style, ...rest }: Props) => {
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
};

Error.defaultProps = {
  className: "",
};

export default Error;
