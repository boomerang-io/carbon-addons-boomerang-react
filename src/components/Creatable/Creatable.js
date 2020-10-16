import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tag, TextInput } from 'carbon-components-react';
import TooltipHover from '../TooltipHover';
import { Add16, Information16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

import { isAccessibleKeyDownEvent } from '../../tools/accessibility';

const { prefix } = settings;

CreatableComponent.propTypes = {
  buttonClassName: PropTypes.string,
  buttonContent: PropTypes.string,
  buttonProps: PropTypes.object,
  createKeyValuePair: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  helperText: PropTypes.string,
  key: PropTypes.string,
  keyHelperText: PropTypes.string,
  keyLabel: PropTypes.string,
  keyLabelText: PropTypes.string,
  keyPlaceholder: PropTypes.string,
  label: PropTypes.string,
  labelText: PropTypes.string,
  onKeyBlur: PropTypes.func,
  onValueBlur: PropTypes.func,
  onInputBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  tagProps: PropTypes.object,
  tagType: PropTypes.string,
  textInputProps: PropTypes.object,
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
  type: PropTypes.string,
  valueHelperText: PropTypes.string,
  valueLabel: PropTypes.string,
  valueLabelText: PropTypes.string,
  valuePlaceholder: PropTypes.string,
  value: PropTypes.node,
  values: PropTypes.array,
};

CreatableComponent.defaultProps = {
  buttonClassName: `${prefix}--bmrg-creatable__button`,
  buttonContent: 'Add',
  createKeyValuePair: false,
  tagType: 'teal',
  tooltipClassName: `${prefix}--bmrg-creatable__tooltip`,
  tooltipProps: { direction: 'top' },
  type: 'text',
};

function CreatableComponent({
  buttonClassName,
  buttonContent,
  buttonProps,
  createKeyValuePair,
  disabled,
  id,
  invalid,
  invalidText,
  helperText,
  key,
  keyHelperText,
  keyLabel,
  keyLabelText,
  keyPlaceholder,
  label,
  labelText,
  onKeyBlur,
  onValueBlur,
  onInputBlur,
  onChange,
  placeholder,
  tagProps,
  tagType,
  textInputProps,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  type,
  valueHelperText,
  valueLabel,
  valueLabelText,
  valuePlaceholder,
  value: externalValues,
  values,
}) {
  const [keyValue, setKeyValue] = useState('');
  const [value, setValue] = useState('');
  const [input, setInput] = useState('');
  const [createdItems, setCreatedItems] = useState([]);

  const tagItems = values || externalValues ? values || externalValues : createdItems; // Externally controlled if values props exists
  const existValue = (keyValue && value) || input;

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onKeyChange = (e) => {
    setKeyValue(e.target.value);
  };

  const onValueChange = (e) => {
    setValue(e.target.value);
  };

  const addValue = (e) => {
    e.preventDefault();
    const items = [...tagItems];
    if (createKeyValuePair && keyValue && value) {
      items.push(`${keyValue}:${value}`);
      setKeyValue('');
      setValue('');
    } else {
      input && items.push(input);
      setInput('');
    }

    setCreatedItems(items);
    onChange(items);
  };

  const removeValue = (value) => {
    const items = tagItems.filter((item) => item !== value);
    setCreatedItems(items);
    onChange(items);
  };

  return (
    <div key={key} className={`${prefix}--bmrg-creatable`}>
      <div className={`${prefix}--bmrg-creatable__input`}>
        {createKeyValuePair ? (
          <div className={`${prefix}--bmrg-creatable__key-value-inputs`}>
            <TextInput
              disabled={disabled}
              id={`${id}-key`}
              invalid={invalid}
              invalidText={invalidText}
              helperText={keyHelperText}
              labelText={keyLabel || keyLabelText}
              onBlur={onKeyBlur}
              onChange={onKeyChange}
              placeholder={keyPlaceholder}
              type={type}
              value={keyValue}
              {...textInputProps}
            />
            <p className={`${prefix}--bmrg-creatable__colon`}>:</p>
            <TextInput
              disabled={disabled}
              id={`${id}-value`}
              invalid={invalid}
              invalidText={invalidText}
              helperText={valueHelperText}
              labelText={valueLabel || valueLabelText}
              onBlur={onValueBlur}
              onChange={onValueChange}
              placeholder={valuePlaceholder}
              type={type}
              value={value}
              {...textInputProps}
            />
          </div>
        ) : (
          <TextInput
            disabled={disabled}
            id={id}
            invalid={invalid}
            invalidText={invalidText}
            helperText={helperText}
            labelText={
              <div style={{ display: 'flex' }}>
                <div>{label || labelText}</div>
                {tooltipContent && (
                  <div className={tooltipClassName}>
                    <TooltipHover {...tooltipProps} tooltipText={tooltipContent}>
                      <Information16 fill="#4d5358" />
                    </TooltipHover>
                  </div>
                )}
              </div>
            }
            onBlur={onInputBlur}
            onChange={onInputChange}
            placeholder={placeholder}
            type={type}
            value={input}
            {...textInputProps}
          />
        )}
        <Button
          className={buttonClassName}
          disabled={disabled || !existValue}
          onClick={addValue}
          iconDescription="Add"
          renderIcon={Add16}
          size="field"
          type="button"
          {...buttonProps}
        >
          {buttonContent}
        </Button>
      </div>
      <div className={`${prefix}--bmrg-creatable__tags`}>
        {tagItems.map((item, index) => (
          <Tag
            key={`${item}-${index}`}
            disabled={disabled}
            type={tagType}
            onClick={() => removeValue(item)}
            onKeyDown={(e) => isAccessibleKeyDownEvent(e) && removeValue(item)}
            filter
            {...tagProps}
          >
            {item}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export default CreatableComponent;
