import React from 'react';
import PropTypes from 'prop-types';
import TooltipHover from '../TooltipHover';
import { TextInput } from 'carbon-components-react';
import { Information16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TextInputComponent = React.forwardRef(function TextInputComponent(
  { id, label, labelText, tooltipClassName, tooltipContent, tooltipProps, ...textInputProps },
  ref
) {
  const labelValue = label || labelText;
  return (
    <div key={id} className={`${prefix}--bmrg-text-input`}>
      <TextInput
        id={id}
        labelText={
          labelValue && (
            <div className={`${prefix}--bmrg-text-input__label`}>
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
        {...textInputProps}
      />
    </div>
  );
});

TextInputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelText: PropTypes.string,
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
};

TextInputComponent.defaultProps = {
  tooltipClassName: `${prefix}--bmrg-text-input__tooltip`,
  tooltipProps: { direction: 'top' },
};

export default TextInputComponent;
