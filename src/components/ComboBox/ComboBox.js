import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TooltipHover from '../TooltipHover';
import { Information16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

import ComboBox from './ComboBoxV2';

const { prefix } = settings;

ComboBoxComponent.propTypes = {
  disableClear: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.node,
  label: PropTypes.node,
  titleText: PropTypes.node,
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
};

ComboBoxComponent.defaultProps = {
  disableClear: false,
  tooltipClassName: `${prefix}--bmrg-select__tooltip`,
  tooltipProps: { direction: 'top' },
};

function ComboBoxComponent({
  disableClear,
  id,
  label,
  labelText,
  titleText,
  tooltipClassName,
  tooltipContent,
  tooltipProps,

  ...comboBoxProps
}) {
  const labelValue = titleText || label || labelText;
  return (
    <div key={id} className={cx(`${prefix}--bmrg-select`, { '--disableClear': disableClear })}>
      <ComboBox
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
        {...comboBoxProps}
      />
    </div>
  );
}

export default ComboBoxComponent;
