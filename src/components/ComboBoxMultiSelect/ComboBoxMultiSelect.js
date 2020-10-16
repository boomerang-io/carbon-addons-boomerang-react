import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TooltipHover from '../TooltipHover';
import { Information16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

import MultiSelect from './MultiSelect';

const { prefix } = settings;

MultiSelectComponent.propTypes = {
  disableClear: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  label: PropTypes.string,
  titleText: PropTypes.string,
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
};

MultiSelectComponent.defaultProps = {
  disableClear: false,
  tooltipClassName: `${prefix}--bmrg-multi-select__tooltip`,
  tooltipProps: { direction: 'top' },
};

function MultiSelectComponent({
  disableClear,
  id,
  label,
  labelText,
  titleText,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  ...multiSelectProps
}) {
  const labelValue = titleText || label || labelText;
  return (
    <div
      key={id}
      className={cx(`${prefix}--bmrg-multi-select`, { '--disableClear': disableClear })}
    >
      <MultiSelect
        id={id}
        titleText={
          labelValue && (
            <div style={{ display: 'flex' }}>
              <div>{titleText || labelText || label}</div>
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
        {...multiSelectProps}
      />
    </div>
  );
}

export default MultiSelectComponent;
