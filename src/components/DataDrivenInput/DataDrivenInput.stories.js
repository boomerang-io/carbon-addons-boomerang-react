import React from 'react';

import TextInput from '../TextInput';

import DataDrivenInput from './index';

const input = {
  key: 'text',
  label: 'Text',
  value: 'boomerang',
  type: 'text',
  placeholder: 'text',
  helperText: 'text',
  description: 'text',
  pattern: '(boomerang|carbon)',
  patternInvalidText: 'Custom error for invalid pattern - Type boomerang or carbon.',
};

const customInput = {
  key: 'custom',
  label: 'Custom',
  value: 'custom',
  type: 'text',
  placeholder: 'custom',
  helperText: 'custom',
  required: true,
  // eslint-disable-next-line
  customComponent: ({ formikProps, ...rest }) => <TextInput {...rest} />,
};

export default {
  title: 'DataDrivenInput',
};

export const Default = () => {
  const [testValue, setTestValue] = React.useState('boomerang');
  return (
    <DataDrivenInput
      id="dynamic-formik-form-id"
      {...input}
      value={testValue}
      onChange={(e) => setTestValue(e.target.value)}
    />
  );
};

Default.story = {
  name: 'default',
};

export const CustomComponentInput = () => {
  return <DataDrivenInput id="dynamic-formik-form-id" {...customInput} />;
};
