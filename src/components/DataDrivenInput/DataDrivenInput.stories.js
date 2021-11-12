import React from 'react';
import { storiesOf } from '@storybook/react';

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

storiesOf('DataDrivenInput', module)
  .add('default', () => {
    const [testValue, setTestValue] = React.useState("boomerang");
    return <DataDrivenInput id="dynamic-formik-form-id" {...input} value={testValue} onChange={(e) => setTestValue(e.target.value)}/>;
  })
  .add('Custom Component Input', () => {
    return <DataDrivenInput id="dynamic-formik-form-id" {...customInput} />;
  });
