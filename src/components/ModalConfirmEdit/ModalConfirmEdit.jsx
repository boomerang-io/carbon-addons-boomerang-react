import React from "react";
import PropTypes from "prop-types";
import { prefix } from "../../internal/settings";
import { Edit } from "@carbon/react/icons";

import ModalConfirmDetails from "./ModalConfirmDetails";
import ModalConfirmArray from "./ModalConfirmArray";



const TYPES = {
  DETAILS: "details",
  ARRAY: "array",
};

ModalConfirmEdit.propTypes = {
  onEdit: PropTypes.func,
  items: PropTypes.array,
  style: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.oneOf(Object.values(TYPES)),
};

ModalConfirmEdit.defaultProps = {
  title: "Confirm Your Details",
  type: "details",
};

function ModalConfirmEdit({ items, onEdit, style, title, type, ...rest }) {
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
