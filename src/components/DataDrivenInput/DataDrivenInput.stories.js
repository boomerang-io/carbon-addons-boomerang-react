import React from 'react';
import { storiesOf } from '@storybook/react';

import TextInput from '../TextInput';

import DataDrivenInput from './index';

const input = {
  key: 'custom',
  label: 'Custom',
  value: 'custom',
  type: 'text',
  placeholder: 'custom',
  required: true,
  // eslint-disable-next-line
  customComponent: ({ formikProps, ...rest }) => <TextInput {...rest} />,
};

storiesOf('DataDrivenInput', module).add('default', () => {
  return <DataDrivenInput id="dynamic-formik-form-id" {...input} />;
});
