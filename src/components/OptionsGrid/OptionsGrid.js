import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

import Option from './Option';

const { prefix } = settings;

const OptionsGrid = ({
  className,
  columns,
  data,
  displayProperty,
  onSelect,
  selectedItems,
  selectProperty,
  style,
  ...rest
}) => {
  let rowItems = [];
  const grid = [];

  /**
   * Return a grid of tags based on the data provided and specified number of columns
   */
  data.forEach((item, index) => {
    const isSelected =
      selectedItems &&
      selectedItems.find((selectedItem) => selectedItem[selectProperty] === item[selectProperty]);

    // Build up list of tags in a row of length column and add it to the grid
    // Still uses index for the key. When filtered down the rows can change their items and we want to re-render
    rowItems.push(
      <Option
        key={item[selectProperty]}
        text={item[displayProperty]}
        onSelect={onSelect}
        selected={!!isSelected}
        index={item[selectProperty]}
        id={item[selectProperty]}
      />
    );
    if ((index + 1) % columns === 0) {
      grid.push(
        <li className={`${prefix}--bmrg-optionsGrid-row`} key={index}>
          {rowItems}
        </li>
      );
      rowItems = [];
    }
  });

  // Push the last row if there is anything left
  if (rowItems.length) {
    grid.push(
      <li className={`${prefix}--bmrg-optionsGrid-row`} key="last-row">
        {rowItems}
      </li>
    );
  }

  return (
    <ul className={className} style={style} {...rest}>
      {grid}
    </ul>
  );
};

OptionsGrid.defaultProps = {
  className: `${prefix}--bmrg-optionsGrid`,
  displayProperty: 'name',
  selectProperty: 'id',
};

OptionsGrid.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  displayProperty: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  selectProperty: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default OptionsGrid;
