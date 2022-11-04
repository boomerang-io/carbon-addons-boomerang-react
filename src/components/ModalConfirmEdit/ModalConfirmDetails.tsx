import React from "react";
import { prefix } from "../../internal/settings";

type Props = {
    items: any[];
};

function ModalConfirmDetails({ items, ...rest }: Props) {
  return (
    <ul className={`${prefix}--bmrg-modal-confirm-details`} {...rest}>
      {items.map((item) => {
        return (
          <li className={`${prefix}--bmrg-modal-confirm-details__item`} key={item.name}>
            <div className={`${prefix}--bmrg-modal-confirm-details__name`}>{item.name}</div>
            <div className={`${prefix}--bmrg-modal-confirm-details__value`}>{item.value}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default ModalConfirmDetails;
