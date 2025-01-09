/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  children?: React.ReactNode;
  className?: string;
  element?: any;
  title?: string;
  [key: string]: any;
};

const ModalForm = React.forwardRef<any, Props>(function ModalForm(
  { children, className, element: Element = "form", title, ...rest },
  ref
) {
  return (
    <Element className={cx(`${prefix}--bmrg-modal-form`, className)} {...rest} ref={ref}>
      {title && <p className={`${prefix}--bmrg-modal-form__title`}>{title}</p>}
      {children}
    </Element>
  );
});

export default ModalForm;
