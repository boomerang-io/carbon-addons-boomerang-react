/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { prefix } from "../../internal/settings";

const showCommaSeparatedValues = (items?: any[]) => {
  if (items) {
    const commaSeparatedValues = items.join(", ");
    return <div className={`${prefix}--bmrg-modal-confirm-array__csv`}>{commaSeparatedValues}</div>;
  }
};

type ModalConfirmArrayProps = {
  items?: any[];
};

function ModalConfirmArray({ items, ...rest }: ModalConfirmArrayProps) {
  return (
    <div className={`${prefix}--bmrg-modal-confirm-array`} {...rest}>
      <div className={`${prefix}--bmrg-modal-confirm-array__content`}>{showCommaSeparatedValues(items)}</div>
    </div>
  );
}

export default ModalConfirmArray;
