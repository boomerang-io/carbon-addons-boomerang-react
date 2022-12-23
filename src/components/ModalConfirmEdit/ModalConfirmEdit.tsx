import React from "react";
import { prefix } from "../../internal/settings";
import { Edit } from "@carbon/react/icons";

import ModalConfirmDetails from "./ModalConfirmDetails";
import ModalConfirmArray from "./ModalConfirmArray";

const TYPES = {
  DETAILS: "details",
  ARRAY: "array",
} as const;

type TYPE = typeof TYPES[keyof typeof TYPES];

type Props = {
  onEdit?: (...args: any[]) => any;
  items?: string[] | { name: string; value: string }[];
  style?: React.CSSProperties;
  title?: string;
  type?: TYPE;
};

function ModalConfirmEdit({ items, onEdit, style, title = "Confirm Your Details", type = "details", ...rest }: Props) {
  return (
    <div className={`${prefix}--bmrg-modal-confirm-edit`} style={style} {...rest}>
      <p className={`${prefix}--bmrg-modal-confirm-edit__title`}>{title}</p>
      <section className={`${prefix}--bmrg-modal-confirm-edit__section`}>
        <div className={`${prefix}--bmrg-modal-confirm-edit__content`}>
          {type === TYPES.DETAILS ? (
            <ModalConfirmDetails items={items} />
          ) : type === TYPES.ARRAY ? (
            <ModalConfirmArray items={items} />
          ) : null}
          {typeof onEdit === "function" && (
            <button className={`${prefix}--bmrg-modal-confirm-edit__button`} onClick={onEdit}>
              <Edit size={16} className={`${prefix}--bmrg-modal-confirm-edit__icon`} />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default ModalConfirmEdit;
