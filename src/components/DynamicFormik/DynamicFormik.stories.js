/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextInput from '../TextInput';
import * as Yup from 'yup';
import DynamicFormik from './DynamicFormik';

const additionalSchema = Yup.object().shape({
  text: Yup.string().required('Text is required'),
});

const inputs = [
  {
    key: 'text',
    label: 'Text',
    value: 'boomerang',
    type: 'text',
    placeholder: 'text',
    helperText: 'text',
    description: 'text',
    required: false,
    min: '2',
    max: '20',
    pattern: '(boomerang|carbon)',
  },
  {
    key: 'password',
    label: 'Password',
    value: 'password',
    type: 'password',
    placeholder: 'password',
    helperText: 'password',
    description: 'password',
    required: false,
    min: '2',
    max: '20',
  },
  {
    key: 'secured',
    label: 'Secured',
    value: 'secured',
    type: 'secured',
    placeholder: 'secured',
    helperText: 'secured',
    description: 'secured',
    required: false,
    min: '2',
    max: '20',
  },
  {
    key: 'date',
    label: 'Date',
    value: '2020-01-01T13:10:20.219+00:00',
    type: 'date',
    placeholder: 'yyyy-mm-dd',
    helperText: 'date',
    dateFormat: 'Y-m-d',
    min: '2020-01-01T13:10:20.219+00:00',
    max: '2020-01-31T13:10:20.219+00:00'
  },
  {
    required: false,
    placeholder: null,
    helperText: null,
    language: null,
    disabled: null,
    defaultValue: null,
    value: 'yay',
    values: null,
    readOnly: false,
    id: '20200f76-e676-4737-b51b-s92371901',
    description: 'kafka',
    key: 'kafka.bot-failure.notifications-enabled',
    label: 'kafka',
    type: 'text',
    min: null,
    max: null,
    options: null,
  },
  {
    key: 'email',
    label: 'Email',
    value: 'example@email.com',
    defaultValue: 'example@email.com',
    type: 'email',
    required: true,
    placeholder: 'test@mail.com',
    helperText: 'text',
    description: 'text',
    invalidValues: ['boomerang@gmail.com'],
  },
  {
    key: 'url',
    label: 'Url',
    value: 'url.com',
    defaultValue: 'url.com',
    type: 'url',
    required: true,
    placeholder: 'url.com',
    helperText: 'text',
    description: 'text',
  },
  {
    key: 'number',
    label: 'Number',
    value: '1',
    defaultValue: '',
    type: 'number',
    required: true,
    placeholder: '0',
    max: 100,
    min: -1,
    helperText: 'text',
    description: 'text',
  },
  {
    key: 'area',
    label: 'Area',
    value: 'area',
    type: 'textarea',
    placeholder: 'placeholder',
    required: true,
    helperText: 'text',
    description: 'text',
  },
  {
    key: 'editor',
    label: 'Editor',
    value: 'text',
    type: 'texteditor',
    placeholder: 'placeholder',
    required: true,
    helperText: 'text',
    description: 'text',
  },
  {
    key: 'toggle',
    label: 'Toggle',
    value: 'true',
    type: 'boolean',
    helperText: 'text',
    description: 'text',
  },
  {
    key: 'radio',
    label: 'Radio',
    value: 'two',
    type: 'radio',
    orientation: 'vertical',
    options: [
      { key: 'test', value: 'Test' },
      { key: 'one', value: 'One' },
      { key: 'two', value: 'Two' },
      { key: 'three', value: 'Three' },
      { key: 'four', value: 'Four' },
      { key: 'five', value: 'Five' },
      { key: 'six', value: 'Six' },
      { key: 'seven', value: 'Seven' },
      { key: 'eight', value: 'Eight' },
      { key: 'nine', value: 'Nine' },
      { key: 'ten', value: 'Ten' },
    ],
    placeholder: 'placeholder',
    helperText: 'text',
    description: 'text',
  },
  {
    key: 'select',
    label: 'Select',
    value: 'one',
    defaultValue: 'two',
    type: 'select',
    options: [
      { key: 'one', value: 'One' },
      { key: 'two', value: 'Two' },
    ],
    placeholder: 'placeholder',
    helperText: 'text',
    description: 'text',
  },
  {
    key: 'multiselect',
    label: 'MultiSelect',
    type: 'multiselect',
    options: [
      { key: 'one', value: 'One' },
      { key: 'two', value: 'Two' },
      { key: 'three', value: 'Three' },
    ],
    values: ['one'],
    defaultValue: ['two'],
    placeholder: 'placeholder',
    helperText: 'text',
    description: 'text',
  },

  {
    key: 'checkboxList',
    label: 'Checkbox',
    type: 'checkbox',
    values: ['one', 'two'],
    options: [
      { value: 'One', key: 'one' },
      { value: 'Two', key: 'two' },
      { value: 'Three', key: 'three' },
    ],
    helperText: 'text',
    description: 'text',
  },
  {
    key: 'creatable',
    label: 'Creatable',
    type: 'creatable-single',
    values: ['one'],
    placeholder: 'placeholder',
    conditionallyRender: true,
    requiredForKey: 'select',
    requiredValueOf: ['one'],
    helperText: 'text',
    description: 'text',
  },
  {
    key: 'custom',
    label: 'Custom',
    value: 'custom',
    type: 'text',
    placeholder: 'custom',
    required: true,
    helperText: 'text',
    description: 'text',
    // eslint-disable-next-line
    customComponent: ({ formikProps, ...rest }) => <TextInput {...rest} />,
  },
  {
    key: 'general.worker.nextgen.enable',
    label: 'Enable Generation 3 Worker Integration',
    max: null,
    min: null,
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    validValues: null,
    category: 'general',
    description: '',
    adminOnly: false,
    options: [],
    helpertext: 'Enabling this will require integration to the DAG based worker implementation.',
  },
  {
    key: 'general.worker.token.deploy',
    label: 'Next Gen Worker Deploy Token',
    max: null,
    min: null,
    type: 'text',
    defaultValue: '',
    required: false,
    validValues: null,
    category: 'general',
    description: '',
    adminOnly: false,
    conditionallyRender: true,
    requiredValueOf: ['true'],
    requiredForKey: 'general.worker.nextgen.enable',
    helpertext: 'Leave this blank to retain the default Gen 2 worker.',
    placeholder: '',
  },
];

function Wrapper(props) {
  return <div style={{ padding: '2rem' }}>{props.children}</div>;
}

storiesOf('DynamicFormik', module)
  .add('default', () => {
    return (
      <Wrapper>
        <DynamicFormik
          id="dynamic-formik-form-id"
          inputs={inputs}
          onSubmit={() => {
            action('submit clicked');
          }}
          radioProps={({input}) => ({...input, verticalWrapped: true, verticalLines: 4})}
          validationSchemaExtension={additionalSchema}
        >
          {({ inputs, formikProps }) => {
            return (
              <form>
                {inputs}
                <button
                  disabled={!formikProps.isValid}
                  onClick={formikProps.handleSubmit}
                  style={{ marginTop: '1rem' }}
                  type="button"
                >
                  Submit
                </button>
              </form>
            );
          }}
        </DynamicFormik>
      </Wrapper>
    );
  })
  .add('allow property syntax', () => {
    return (
      <Wrapper>
        <DynamicFormik
          allowCustomPropertySyntax
          id="dynamic-formik-form-id"
          inputs={inputs}
          onSubmit={() => {
            action('submit clicked');
          }}
          validationSchemaExtension={additionalSchema}
        >
          {({ inputs, formikProps }) => {
            return (
              <form>
                {inputs}
                <button
                  disabled={!formikProps.isValid}
                  onClick={formikProps.handleSubmit}
                  style={{ marginTop: '1rem' }}
                  type="button"
                >
                  Submit
                </button>
              </form>
            );
          }}
        </DynamicFormik>
      </Wrapper>
    );
  })
  .add('allow property syntax, custom pattern ${b:}', () => {
    return (
      <Wrapper>
        <DynamicFormik
          allowCustomPropertySyntax
          customPropertySyntaxPattern={/\$\{b:([a-zA-Z0-9_.-]+)\}/}
          id="dynamic-formik-form-id"
          inputs={inputs}
          onSubmit={() => {
            action('submit clicked');
          }}
          validationSchemaExtension={additionalSchema}
        >
          {({ inputs, formikProps }) => {
            return (
              <form>
                {inputs}
                <button
                  disabled={!formikProps.isValid}
                  onClick={formikProps.handleSubmit}
                  style={{ marginTop: '1rem' }}
                  type="button"
                >
                  Submit
                </button>
              </form>
            );
          }}
        </DynamicFormik>
      </Wrapper>
    );
  });
