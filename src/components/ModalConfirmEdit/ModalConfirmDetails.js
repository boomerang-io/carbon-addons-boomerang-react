import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;

ModalConfirmDetails.propTypes = {
  items: PropTypes.array.isRequired,
};

function ModalConfirmDetails({ items, ...rest }) {
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
