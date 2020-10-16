import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Toggle } from 'carbon-components-react';
import TooltipHover from '../TooltipHover';
import { Information16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

ToggleComponent.propTypes = {
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelText: PropTypes.string,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  reversed: PropTypes.bool,
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
};

ToggleComponent.defaultProps = {
  orientation: 'horizontal',
  tooltipClassName: `${prefix}--bmrg-toggle__tooltip`,
  tooltipProps: { direction: 'top' },
};

function ToggleComponent({
  helperText,
  id,
  reversed,
  label,
  labelText,
  orientation,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  ...toggleProps
}) {
  const labelValue = label || labelText;
  const labelTextId = !labelValue ? undefined : `${id}-label`;
  return (
    <div
      key={id}
      className={cx(`${prefix}--bmrg-toggle`, {
        '--reversed': reversed,
        '--vertical': orientation === 'vertical',
      })}
    >
      {labelValue && (
        <>
          <div className={`${prefix}--bmrg-toggle__title`}>
            <label
              id={labelTextId}
              className={`${prefix}--label`}
              htmlFor={id}
              style={{ marginBottom: '0' }}
            >
              {labelValue}
            </label>
            {tooltipContent && (
              <div className={tooltipClassName}>
                <TooltipHover {...tooltipProps} tooltipText={tooltipContent}>
                  <Information16 fill="#4d5358" />
                </TooltipHover>
              </div>
            )}
          </div>
          {helperText && (
            <div className={`${prefix}--form__helper-text`} style={{ marginBottom: '0' }}>
              {helperText}
            </div>
          )}
        </>
      )}

      <Toggle id={id} aria-labelledby={labelTextId} labelA="" labelB="" {...toggleProps} />
    </div>
  );
}

export default ToggleComponent;
