import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

import Loading from "./assets/Loading";

type OwnProps = {
    className?: string;
    messages: any[];
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof LoadingAnimationContent.defaultProps;



// @ts-expect-error TS(7022): 'LoadingAnimationContent' implicitly has type 'any... Remove this comment to see the full error message
const LoadingAnimationContent = ({ className, messages, ...rest }: Props) => {
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
};

LoadingAnimationContent.defaultProps = {
  className: "",
};

export default LoadingAnimationContent;
