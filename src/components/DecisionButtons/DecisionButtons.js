import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TooltipHover from '../TooltipHover';
import { Information16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const ButtonTypes = {
  Negative: 'negative',
  Positive: 'positive',
};

DecisionButtons.propTypes = {
  canUncheck: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string,
  items: PropTypes.array,
  label: PropTypes.string,
  labelText: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DecisionButtons.defaultProps = {
  canUncheck: false,
  orientation: 'horizontal',
  labelPosition: 'right',
  onChange: () => {},
  tooltipClassName: `${prefix}--bmrg-radio-group__tooltip`,
};

function DecisionButtons({
  canUncheck,
  className,
  defaultSelected,
  disabled,
  helperText,
  id,
  items,
  label,
  labelText,
  name,
  onChange,
  orientation,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  selectedItem: propsSelectedItem,
}) {
  const [stateSelected, setSelected] = useState(propsSelectedItem || defaultSelected);

  const selectedItem = propsSelectedItem ?? stateSelected; // Externally controlled if value props exists

  const getDecisionButtons = () => {
    const children = items.map((item, index) => {
      const { icon: Icon, label, type, value } = item;
      const selected = value === selectedItem;

      const wrapperClasses = cx(`${prefix}--bmrg-decision-button-wrapper`, {
        [`${prefix}--bmrg-decision-button-wrapper--${orientation}`]: orientation === 'vertical',
      });

      const contentClasses = cx(`${prefix}--bmrg-decision-button`, {
        [`${prefix}--bmrg-decision-button--positive`]: type === ButtonTypes.Positive,
        [`${prefix}--bmrg-decision-button--negative`]: type === ButtonTypes.Negative,
      });

      return (
        <label
          className={wrapperClasses}
          key={`${name}-${value}-${index}`}
          htmlFor={`${name}-${value}-${index}`}
        >
          <input
            checked={selected}
            id={`${name}-${value}-${index}`}
            name={name}
            onClick={handleChange}
            readOnly
            type="radio"
            value={value}
          />
          <div className={contentClasses}>
            <span>{label}</span>
            {Icon && <Icon className={`${prefix}--bmrg-decision-button-icon`} />}
          </div>
        </label>
      );
    });

    return children;
  };

  const handleChange = (evt) => {
    const { value } = evt.target;
    if (value !== selectedItem) {
      setSelected(value);
      onChange && onChange(value, name, evt);
    } else if (canUncheck) {
      setSelected('');
      onChange && onChange('', name, evt);
    }
  };

  const wrapperClasses = cx(`${prefix}--radio-button-group`, className, {
    [`${prefix}--radio-button-group--${orientation}`]: orientation === 'vertical',
  });

  const labelValue = label || labelText;
  const labelTextId = !labelValue ? undefined : `${id}-label`;

  return (
    <div className={`${prefix}--bmrg-decision-buttons`}>
      {labelValue && (
        <div className={`${prefix}--bmrg-decision-buttons__title`}>
          <div id={labelTextId} className={`${prefix}--label`}>
            {labelValue}
          </div>
          {tooltipContent && (
            <div className={tooltipClassName}>
              <TooltipHover
                {...tooltipProps}
                onClick={(e) => e.preventDefault()}
                tooltipText={tooltipContent}
              >
                <Information16 fill="#4d5358" />
              </TooltipHover>
            </div>
          )}
        </div>
      )}
      {helperText && <div className={`${prefix}--form__helper-text`}>{helperText}</div>}
      <div className={`${prefix}--form-item`}>
        <div className={wrapperClasses} disabled={disabled}>
          {getDecisionButtons()}
        </div>
      </div>
    </div>
  );
}

export default DecisionButtons;
