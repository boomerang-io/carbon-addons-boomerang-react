import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'carbon-components-react';
import TooltipHover from '../TooltipHover';
import { Information16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

RadioGroupComponent.propTypes = {
  columnHeight: PropTypes.string,
  defaultSelected: PropTypes.string,
  disabled: PropTypes.string,
  helperText: PropTypes.string,
  id: PropTypes.string,
  key: PropTypes.string,
  label: PropTypes.string,
  labelText: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  orientation: PropTypes.string,
  radioGroupProps: PropTypes.object,
  radioButtonProps: PropTypes.object,
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
  value: PropTypes.string,
  verticalWrapped: PropTypes.bool,
};

RadioGroupComponent.defaultProps = {
  columnHeight: "10rem",
  tooltipClassName: `${prefix}--bmrg-radio-group__tooltip`,
  tooltipProps: { direction: 'top' },
  verticalWrapped: false,
};

function RadioGroupComponent({
  defaultSelected,
  disabled,
  helperText,
  id,
  label,
  labelText,
  name,
  onChange,
  options,
  orientation,
  radioGroupProps,
  radioButtonProps,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  value,
  columnHeight,
  verticalWrapped,
}) {
  const labelValue = label || labelText;
  const labelTextId = !labelValue ? undefined : `${id}-label`;

  const isVertical = orientation === 'vertical';
  const hasVerticalHelperText = isVertical && helperText;
  const hasHorizontalHelperText = !isVertical && helperText;

  return (
    //Defined a css var --height to be used on the wrapped container to determine the number of radios displayed in each column
    <div key={id} className={`${prefix}--bmrg-radio-group`} style={{"--height": columnHeight}}>
      {labelValue && (
        <div className={`${prefix}--bmrg-radio-group__title`}>
          <div id={labelTextId} className={`${prefix}--label`}>
            {labelValue}
          </div>
          {tooltipContent && (
            <div className={tooltipClassName}>
              <TooltipHover {...tooltipProps} tooltipText={tooltipContent}>
                <Information16 fill="#4d5358" />
              </TooltipHover>
            </div>
          )}
        </div>
      )}
      {hasVerticalHelperText && <div className={`${prefix}--form__helper-text`}>{helperText}</div>}
      <RadioButtonGroup
        className={isVertical && verticalWrapped ? `${prefix}--bmrg-radio-group__container` : undefined}
        defaultSelected={defaultSelected}
        disabled={disabled}
        name={name}
        onChange={onChange}
        orientation={orientation}
        valueSelected={value}
        {...radioGroupProps}
      >
        {options.map((option) => (
          <RadioButton
            disabled={option.disabled}
            id={option.value}
            key={option.value}
            labelText={option.labelText}
            value={option.value}
            {...radioButtonProps}
          />
        ))}
      </RadioButtonGroup>
      {hasHorizontalHelperText && <div className={`${prefix}--form__helper-text`}>{helperText}</div>}
    </div>
  );
}

export default RadioGroupComponent;
