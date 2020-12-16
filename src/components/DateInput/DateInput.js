import React from 'react';
import PropTypes from 'prop-types';
import TooltipHover from '../TooltipHover';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { Information16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const DateInputComponent = React.forwardRef(function DateInputComponent(
  { 
    id,
    datePickerProps,
    label, 
    labelText, 
    max,
    min,
    pattern,
    tooltipClassName, 
    tooltipContent, 
    tooltipProps,
    value,
    ...dateInputProps 
  },
  ref
) {
  const labelValue = label || labelText;
  return (
    <DatePicker 
      key={id}
      className={`${prefix}--bmrg-date-input`}
      dateFormat={pattern}
      datePickerType="single"
      maxDate={max}
      minDate={min}
      value={value}
      {...datePickerProps}
    >
      <DatePickerInput
        id={id}
        style={{ width: "100%" }}
        labelText={
          labelValue && (
            <div className={`${prefix}--bmrg-date-input__label`}>
              <div>{labelValue}</div>
              {tooltipContent && (
                <div className={tooltipClassName}>
                  <TooltipHover tooltipContent={tooltipContent} {...tooltipProps}>
                    <Information16 fill="#4d5358" />
                  </TooltipHover>
                </div>
              )}
            </div>
          )
        }
        ref={ref}
        {...dateInputProps}
      />
    </DatePicker>
  );
});

DateInputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  datePickerProps: PropTypes.object,
  label: PropTypes.string,
  labelText: PropTypes.string,
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
};

DateInputComponent.defaultProps = {
  datePickerProps: {},
  tooltipClassName: `${prefix}--bmrg-date-input__tooltip`,
  tooltipProps: { direction: 'top' },
};

export default DateInputComponent;
