import React from "react";
import { prefix } from "../../internal/settings";

import Option from "./Option";

type OwnProps = {
  className?: string;
  columns: number;
  data: any[];
  displayProperty: string;
  onSelect: (...args: any[]) => any;
  selectedItems: any[];
  selectProperty: string;
  style?: any;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof OptionsGrid.defaultProps;

// @ts-expect-error TS(7022): 'OptionsGrid' implicitly has type 'any' because it... Remove this comment to see the full error message
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
}: Props) => {
  let rowItems: any = [];
  const grid = [];

  /**
   * Return a grid of tags based on the data provided and specified number of columns
   */
  data.forEach((item: any, index: any) => {
    const isSelected =
      selectedItems && selectedItems.find((selectedItem: any) => selectedItem[selectProperty] === item[selectProperty]);

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
  displayProperty: "name",
  selectProperty: "id",
};

export default OptionsGrid;
