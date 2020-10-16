import React from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'carbon-components-react';
import TooltipHover from '../TooltipHover';
import { Information16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TextAreaComponent = React.forwardRef(function TextAreaComponent(
  { id, label, labelText, tooltipClassName, tooltipContent, tooltipProps, ...textAreaProps },
  ref
) {
  const labelValue = label || labelText;
  return (
    <div key={id} className={`${prefix}--bmrg-text-area`}>
      <TextArea
        id={id}
        labelText={
          labelValue && (
            <div style={{ display: 'flex' }}>
              <div>{labelValue}</div>
              {tooltipContent && (
                <div className={tooltipClassName}>
                  <TooltipHover {...tooltipProps} tooltipText={tooltipContent}>
                    <Information16 fill="#4d5358" />
                  </TooltipHover>
                </div>
              )}
            </div>
          )
        }
        ref={ref}
        {...textAreaProps}
      />
    </div>
  );
});

TextAreaComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelText: PropTypes.string,
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
};

TextAreaComponent.defaultProps = {
  tooltipClassName: `${prefix}--bmrg-text-area__tooltip`,
  tooltipProps: { direction: 'top' },
};

export default TextAreaComponent;
