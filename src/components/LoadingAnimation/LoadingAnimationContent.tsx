import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

import Loading from "./assets/Loading";

LoadingAnimationContent.defaultProps = {
  className: "",
};

type OwnProps = {
  className?: string;
  messages: any[];
};

type Props = OwnProps & typeof LoadingAnimationContent.defaultProps;

function LoadingAnimationContent({ className, messages, ...rest }: Props) {
  return (
    <div className={cx(`${prefix}--bmrg-loading-animation`, className)} {...rest}>
      <Loading className={`${prefix}--bmrg-loading-animation__img`} />
      {messages.map((message: any, index: any) => (
        <div key={index} className={`${prefix}--bmrg-loading-animation__text`}>
          {message}
        </div>
      ))}
    </div>
  );
}

export default LoadingAnimationContent;
