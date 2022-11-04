import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  children?: React.ReactNode;
  className?: string;
  element?: React.ReactElement;
  title?: string;
};

const ModalForm = React.forwardRef<any, Props>(function ModalForm(
  { children, className, element: Element, title, ...rest },
  ref
) {
  return (
    // @ts-expect-error TS(2604): JSX element type 'Element' does not have any const... Remove this comment to see the full error message
    <Element className={cx(`${prefix}--bmrg-modal-form`, className)} {...rest} ref={ref}>
      {title && <p className={`${prefix}--bmrg-modal-form__title`}>{title}</p>}
      {children}
    </Element>
  );
});

ModalForm.defaultProps = {
  // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'ReactElem... Remove this comment to see the full error message
  element: "form",
};

export default ModalForm;
