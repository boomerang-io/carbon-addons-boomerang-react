import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;

const showCommaSeparatedValues = (items) => {
  const commaSeparatedValues = items.join(', ');

  if (items) {
    return <div className={`${prefix}--bmrg-modal-confirm-array__csv`}>{commaSeparatedValues}</div>;
  }
};

ModalConfirmArray.propTypes = {
  items: PropTypes.array.isRequired,
};

function ModalConfirmArray({ items, ...rest }) {
  return (
    <div className={`${prefix}--bmrg-modal-confirm-array`} {...rest}>
      <div className={`${prefix}--bmrg-modal-confirm-array__content`}>
        {showCommaSeparatedValues(items)}
      </div>
    </div>
  );
}

export default ModalConfirmArray;
