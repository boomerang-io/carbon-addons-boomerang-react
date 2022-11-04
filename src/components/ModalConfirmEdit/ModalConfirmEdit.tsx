import React from "react";
import { prefix } from "../../internal/settings";
import { Edit } from "@carbon/react/icons";

import ModalConfirmDetails from "./ModalConfirmDetails";
import ModalConfirmArray from "./ModalConfirmArray";



const TYPES = {
  DETAILS: "details",
  ARRAY: "array",
};

ModalConfirmEdit.defaultProps = {
  title: "Confirm Your Details",
  type: "details",
};

type OwnProps = {
    onEdit?: (...args: any[]) => any;
    items?: any[];
    style?: any;
    title?: string;
    type?: any; // TODO: PropTypes.oneOf(Object.values(TYPES))
};

type Props = OwnProps & typeof ModalConfirmEdit.defaultProps;

function ModalConfirmEdit({ items, onEdit, style, title, type, ...rest }: Props) {
  return (
    <div className={`${prefix}--bmrg-modal-confirm-edit`} style={style} {...rest}>
      <p className={`${prefix}--bmrg-modal-confirm-edit__title`}>{title}</p>
      <section className={`${prefix}--bmrg-modal-confirm-edit__section`}>
        <div className={`${prefix}--bmrg-modal-confirm-edit__content`}>
          {type === TYPES.DETAILS ? (
            // @ts-expect-error TS(2322): Type 'any[] | undefined' is not assignable to type... Remove this comment to see the full error message
            <ModalConfirmDetails items={items} />
          ) : type === TYPES.ARRAY ? (
            // @ts-expect-error TS(2322): Type 'any[] | undefined' is not assignable to type... Remove this comment to see the full error message
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
