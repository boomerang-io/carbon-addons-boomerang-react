import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { transformAll, addCustomValidator } from '../../tools/yupAst';
import isUrl from '../../tools/isUrl';
import DataDrivenInput from '../DataDrivenInput';
import { settings } from 'carbon-components';
import {
  CHECKBOX_TYPES,
  CREATABLE_TYPES,
  MULTI_SELECT_TYPES,
  RADIO_TYPES,
  SELECT_TYPES,
  TEXT_AREA_TYPES,
  TEXT_EDITOR_TYPES,
  TEXT_INPUT_TYPES,
  BOOLEAN_TYPES,
  INPUT_TYPES_ARRAY,
  INPUT_GROUPS,
} from '../../internal/DataDrivenInputTypes';

const { prefix } = settings;

/**
 *
 * @param {string} value - value to test for valid property syntax
 */
function isPropertySyntaxValid({ value, customPropertySyntaxPattern }) {
  // Look property pattern and capture group for the property itself
  let match = value.match(customPropertySyntaxPattern);

  // if the first matched group is truthy, then a property has been entered
  // Empty properties are not valid
  if (Array.isArray(match) && match[1]) {
    return true;
  } else {
    return false;
  }
}

function validateUrlWithProperties(customPropertySyntaxPattern) {
  return function () {
    return this.transform(function (value, originalValue) {
      if (isUrl(value) || isPropertySyntaxValid({ value, customPropertySyntaxPattern })) {
        return value;
      }
      return false;
    });
  };
}

function validateEmailWithProperties(customPropertySyntaxPattern) {
  return function () {
    return this.transform(function (value, originalValue) {
      // Simple pattern for emails
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (isValidEmail || isPropertySyntaxValid({ value, customPropertySyntaxPattern })) {
        return value;
      }
      return false;
    });
  };
}

function registerCustomPropertyMethods(customPropertySyntaxPattern) {
  const validateUrl = validateUrlWithProperties(customPropertySyntaxPattern);
  const validateEmail = validateEmailWithProperties(customPropertySyntaxPattern);
  Yup.addMethod(Yup.string, 'urlWithCustomProperty', validateUrl);
  Yup.addMethod(Yup.string, 'emailWithCustomProperty', validateEmail);
}

/**
 * Generate Yup schema AST from input objects
 * @param {Array} inputs
 * @returns {Array: Yup AST} validation schema AST
 */
function generateYupAst({ inputs, allowCustomPropertySyntax, customPropertySyntaxPattern }) {
  if (allowCustomPropertySyntax) {
    registerCustomPropertyMethods(customPropertySyntaxPattern);
  }
  let yupShape = {};
  inputs.forEach((input) => {
    let yupValidationArray = [];
    const inputType = input.type ?? '';

    if (!INPUT_TYPES_ARRAY.includes(inputType)) {
      return;
    }

    if (
      inputType === TEXT_AREA_TYPES.TEXT_AREA ||
      inputType === TEXT_INPUT_TYPES.EMAIL ||
      inputType === TEXT_INPUT_TYPES.PASSWORD ||
      inputType === TEXT_INPUT_TYPES.SECURED ||
      inputType === TEXT_INPUT_TYPES.TEL ||
      inputType === TEXT_INPUT_TYPES.TEXT ||
      inputType === TEXT_INPUT_TYPES.TIME ||
      inputType === TEXT_INPUT_TYPES.URL ||
      inputType === RADIO_TYPES.RADIO ||
      inputType === SELECT_TYPES.SELECT ||
      inputType?.startsWith(TEXT_EDITOR_TYPES.TEXT_EDITOR)
    ) {
      yupValidationArray.push(['yup.string']);
      // if (
      //   allowCustomPropertySyntax &&
      //   inputType !== TEXT_INPUT_TYPES.EMAIL &&
      //   inputType !== TEXT_INPUT_TYPES.URL &&
      //   inputType !== TEXT_INPUT_TYPES.SECURED &&
      //   inputType !== TEXT_INPUT_TYPES.PASSWORD
      // )
      //   yupValidationArray.push(
      //     ['yup.customProperty'],
      //     ['yup.typeError', 'Enter valid syntax for a property']
      //   );

      // Create a customValidator for each input b/c regex deserialization
      // does not work currently
      if (input.pattern) {
        addCustomValidator(
          `${input.key}-matches`,
          Yup.string().test(
            `${input.key}-matches`,
            `Enter a value that matches pattern: ${input.pattern}`,
            (value) => new RegExp(input.pattern).test(value)
          )
        );
        yupValidationArray.push([`${input.key}-matches`]);
      }

      //TODO: figure out how to update serialization in yup-ast so we can use the native "matches" validator
      // if (input.pattern) {
      //   yupValidationArray.push([
      //     'yup.matches',
      //     new RegExp(input.pattern),
      //     {
      //       message: `Enter a value that matches pattern ${input.pattern}`,
      //       excludeEmptyString: true,
      //     },
      //   ]);
      // }

      if (inputType === TEXT_INPUT_TYPES.EMAIL) {
        if (allowCustomPropertySyntax)
          yupValidationArray.push(
            ['yup.emailWithCustomProperty'],
            ['yup.typeError', 'Enter a valid email']
          );
        else yupValidationArray.push(['yup.email', 'Enter a valid email']);
      }

      if (inputType === TEXT_INPUT_TYPES.URL) {
        if (allowCustomPropertySyntax)
          yupValidationArray.push(
            ['yup.urlWithCustomProperty'],
            ['yup.typeError', 'Enter a valid URL']
          );
        else yupValidationArray.push(['yup.url', 'Enter a valid URL']);
      }
    }

    if (inputType === TEXT_INPUT_TYPES.NUMBER) {
      yupValidationArray.push(['yup.number', 'Enter a number']);
    }

    if (inputType === BOOLEAN_TYPES.BOOLEAN) {
      yupValidationArray.push(['yup.bool']);
    }

    if (
      inputType === MULTI_SELECT_TYPES.MULTI_SELECT ||
      inputType === CREATABLE_TYPES.CREATABLE_SINGLE ||
      inputType === CREATABLE_TYPES.CREATABLE_PAIR ||
      inputType === CHECKBOX_TYPES.CHECKBOX
    ) {
      yupValidationArray.push(['yup.array']);
    }

    if (
      Object.values(TEXT_INPUT_TYPES).includes(inputType) ||
      inputType === TEXT_AREA_TYPES.TEXT_AREA ||
      inputType === TEXT_EDITOR_TYPES.TEXT_EDITOR
    ) {
      if (inputType === TEXT_INPUT_TYPES.NUMBER) {
        if (input.minValueLength) {
          yupValidationArray.push([
            'yup.min',
            input.minValueLength,
            `Enter value greater than ${input.minValueLength}`,
          ]);
        }

        if (input.maxValueLength) {
          yupValidationArray.push([
            'yup.max',
            input.maxValueLength,
            `Enter value less than ${input.maxValueLength}`,
          ]);
        }
      } else {
        if (input.minValueLength) {
          yupValidationArray.push([
            'yup.min',
            input.minValueLength,
            `Enter at least ${input.minValueLength} characters`,
          ]);
        }

        if (input.maxValueLength) {
          yupValidationArray.push([
            'yup.max',
            input.maxValueLength,
            `Enter at most ${input.maxValueLength} characters`,
          ]);
        }
      }
    }

    if (Array.isArray(input.invalidValues)) {
      yupValidationArray.push(['yup.notOneOf', input.invalidValues, `Enter an allowed value`]);
    }

    if (input.required) {
      yupValidationArray.push(['yup.required', `Enter a value for ${input.label}`]);
    }

    if (yupValidationArray.length > 0) {
      yupShape[input.key] = yupValidationArray;
    }
  });

  return [['yup.object'], ['yup.shape', yupShape]];
}

/**
 * Generate Yup schema, concat in extension if passed
 * Form dynamically generates schema and allows end users to extend if desired
 * @param {Array} inputs
 * @param {Object: Yup Schema} validationSchemaExtension
 * @returns {Object: Yup Schema} validation schema
 */
function generateYupSchema({
  inputs,
  allowCustomPropertySyntax,
  customPropertySyntaxPattern,
  validationSchemaExtension,
}) {
  let validationSchema = transformAll(
    generateYupAst({ inputs, allowCustomPropertySyntax, customPropertySyntaxPattern })
  );
  if (validationSchemaExtension) {
    validationSchema = validationSchema.concat(validationSchemaExtension);
  }
  return validationSchema;
}

/**
 * Get initial values of each input in array of inputs
 */
const determineInitialValues = (inputs) => {
  const values = {};
  inputs.forEach((input) => {
    let value = '';
    const valueToCheck = input.value || input.defaultValue || input.values || input.defaultValues;
    if (valueToCheck) {
      switch (valueToCheck) {
        case 'false': {
          value = false;
          break;
        }
        case 'true': {
          value = true;
          break;
        }
        default: {
          value = valueToCheck;
        }
      }
    }

    values[input.key] = value;
  });
  return values;
};

/**
 * Check if an input X needs to be conditionally rendered
 * If it does, then find an input Y in the same section that has key equal to the input X's requiredForKey
 * If input Y has a value that is present in input X's requiredValueOf array, then render X
 */
const conditionallyRenderInput = (input, values) => {
  if (!input.conditionallyRender) {
    return true;
  }

  /**
   * Check which input in this section has the key equal to requiredForKey and get its value
   */
  const requiredForKeyInputValue = values[input.requiredForKey];
  const valuesInputIsRenderedFor = input.requiredValueOf;

  /**
   * If the value of the input this input is required for is an array loop through those values to find a matching one
   * by going through all of configured values for the input  - the "requiredValueOf" of property
   * Check for the value and the string of the value bc of how the services work. "true" and "false" are strings not boolean values
   */
  if (Array.isArray(requiredForKeyInputValue)) {
    for (let requiredForValue of valuesInputIsRenderedFor) {
      for (let singleRequiredForKeyInputValue of requiredForKeyInputValue) {
        if (
          requiredForValue === singleRequiredForKeyInputValue ||
          requiredForValue === String(singleRequiredForKeyInputValue)
        ) {
          return true;
        }
      }
    }
  } else {
    for (let requiredForValue of valuesInputIsRenderedFor) {
      if (
        requiredForValue === requiredForKeyInputValue ||
        requiredForValue === String(requiredForKeyInputValue)
      ) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Map of the input groups to specifc props to be passed
 */
const TYPE_PROPS = {
  [INPUT_GROUPS.CHECKBOX]: (formikProps, key) => ({
    onChange: (value, id, event, selectedItems) => formikProps.setFieldValue(key, selectedItems),
  }),

  [INPUT_GROUPS.CREATABLE]: (formikProps, key) => ({
    onChange: (createdItems) => formikProps.setFieldValue(key, createdItems),
  }),

  [INPUT_GROUPS.MULTI_SELECT]: (formikProps, key) => ({
    onChange: ({ selectedItems }) =>
      formikProps.setFieldValue(
        key,
        selectedItems.map((item) => item && item.value)
      ),
  }),

  [INPUT_GROUPS.RADIO]: (formikProps, key) => ({
    onChange: (value) => formikProps.setFieldValue(key, value),
  }),

  [INPUT_GROUPS.SELECT]: (formikProps, key) => ({
    onChange: ({ selectedItem }) =>
      formikProps.setFieldValue(key, selectedItem ? selectedItem.value : ''),
  }),

  [INPUT_GROUPS.TEXT_AREA]: (formikProps) => ({
    onChange: formikProps.handleChange,
  }),

  [INPUT_GROUPS.TEXT_EDITOR]: (formikProps) => ({
    onChange: formikProps.handleChange,
  }),

  [INPUT_GROUPS.TEXT_INPUT]: (formikProps) => ({
    onChange: formikProps.handleChange,
  }),

  [INPUT_GROUPS.BOOLEAN]: (formikProps, key) => ({
    onChange: (value) => formikProps.setFieldValue(key, value),
  }),
};

/**
 *  Determine the addition type props to pass the component
 * @param {string} type - type of input
 * @param {Object} otherProps - additional functions to pass props to inputs
 * @returns {Function}
 */
function determineTypeProps(type, otherProps) {
  const {
    checkboxListProps,
    creatableProps,
    multiSelectProps,
    radioProps,
    selectProps,
    textAreaProps,
    textEditorProps,
    textInputProps,
    toggleProps,
  } = otherProps;

  if (Object.values(CHECKBOX_TYPES).includes(type)) {
    return {
      typeProps: TYPE_PROPS[INPUT_GROUPS.CHECKBOX],
      additionalTypeProps: checkboxListProps,
    };
  }

  if (Object.values(CREATABLE_TYPES).includes(type)) {
    return {
      typeProps: TYPE_PROPS[INPUT_GROUPS.CREATABLE],
      additionalTypeProps: creatableProps,
    };
  }

  if (Object.values(MULTI_SELECT_TYPES).includes(type)) {
    return {
      typeProps: TYPE_PROPS[INPUT_GROUPS.MULTI_SELECT],
      additionalTypeProps: multiSelectProps,
    };
  }

  if (Object.values(RADIO_TYPES).includes(type)) {
    return {
      typeProps: TYPE_PROPS[INPUT_GROUPS.RADIO],
      additionalTypeProps: radioProps,
    };
  }

  if (Object.values(SELECT_TYPES).includes(type)) {
    return {
      typeProps: TYPE_PROPS[INPUT_GROUPS.SELECT],
      additionalTypeProps: selectProps,
    };
  }

  if (Object.values(TEXT_AREA_TYPES).includes(type)) {
    return {
      typeProps: TYPE_PROPS[INPUT_GROUPS.TEXT_AREA],
      additionalTypeProps: textAreaProps,
    };
  }

  if (type.startsWith(TEXT_EDITOR_TYPES.TEXT_EDITOR)) {
    return {
      typeProps: TYPE_PROPS[INPUT_GROUPS.TEXT_EDITOR],
      additionalTypeProps: textEditorProps,
    };
  }

  if (Object.values(TEXT_INPUT_TYPES).includes(type)) {
    return {
      typeProps: TYPE_PROPS[INPUT_GROUPS.TEXT_INPUT],
      additionalTypeProps: textInputProps,
    };
  }

  if (Object.values(BOOLEAN_TYPES).includes(type)) {
    return {
      typeProps: TYPE_PROPS[INPUT_GROUPS.BOOLEAN],
      additionalTypeProps: toggleProps,
    };
  }

  return () => {};
}

DynamicFormik.propTypes = {
  children: PropTypes.func.isRequired,
  dataDrivenInputProps: PropTypes.object,
  /**
   * Allow ${p:property} as valid input for some text inputs
   */
  customPropertySyntaxPattern: PropTypes.instanceOf(RegExp),
  additionalInitialValues: PropTypes.object,
  allowCustomPropertySyntax: PropTypes.object,
  inputProps: PropTypes.object,
  initialValues: PropTypes.object,
  inputs: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
  validationSchema: PropTypes.any,
  validationSchemaExtension: PropTypes.object,

  // Props per input type
  allProps: PropTypes.func,
  checkboxListProps: PropTypes.func,
  creatableProps: PropTypes.func,
  multiSelectProps: PropTypes.func,
  radioProps: PropTypes.func,
  selectProps: PropTypes.func,
  textAreaProps: PropTypes.func,
  textEditorProps: PropTypes.func,
  textInputProps: PropTypes.func,
  toggleProps: PropTypes.func,
};

DynamicFormik.defaultProps = {
  additionalInitialValues: {},
  allowCustomPropertySyntax: false,
  customPropertySyntaxPattern: /\$\{p:([a-zA-Z0-9_.-]+)\}/,
  children: () => ({}),
  checkboxListProps: () => ({}),
  creatableProps: () => ({}),
  multiSelectProps: () => ({}),
  radioProps: () => ({}),
  selectProps: () => ({}),
  textAreaProps: () => ({}),
  textEditorProps: () => ({}),
  textInputProps: () => ({}),
  toggleProps: () => ({}),
};

export default function DynamicFormik({
  additionalInitialValues,
  allowCustomPropertySyntax,
  customPropertySyntaxPattern,
  children,
  dataDrivenInputProps,
  inputProps,
  initialValues,
  inputs,
  onSubmit,
  validationSchema,
  validationSchemaExtension,
  ...otherProps
}) {
  /**
   * Get values from formik and normalize keys
   */

  const normalizedInputs = inputs.map((input) => ({
    ...input,
    key: input.key.replace(/\./g, '||'),
    requiredForKey:
      typeof input.requiredForKey === 'string' ? input.requiredForKey.replace(/\./g, '||') : null,
  }));

  const normalizeValues = (values) => {
    if (!Boolean(values)) return {};
    let inputKeys = Object.entries(values);
    let newValues = {};
    inputKeys.forEach((value) => (newValues[value[0].replace(/\./g, '||')] = value[1]));
    return newValues;
  };

  return (
    <Formik
      initialValues={
        (Boolean(initialValues) && normalizeValues(initialValues)) || {
          ...determineInitialValues(normalizedInputs),
          ...normalizeValues(additionalInitialValues),
        }
      }
      validationSchema={
        validationSchema ||
        generateYupSchema({
          inputs: normalizedInputs,
          validationSchemaExtension,
          allowCustomPropertySyntax,
          customPropertySyntaxPattern,
        })
      }
      onSubmit={(values, actions) => {
        let inputKeys = Object.entries(values);
        let newValues = {};
        inputKeys.forEach((value) => (newValues[value[0].replace(/\|\|/g, '.')] = value[1]));
        onSubmit(newValues, actions);
      }}
      {...otherProps}
    >
      {(formikProps) => {
        const { values, touched, errors, handleBlur } = formikProps;
        const finalInputs = normalizedInputs.filter((input) =>
          conditionallyRenderInput(input, values)
        );

        const dataDrivenInputs = finalInputs.map((input) => {
          const {
            key,
            type,
            value, // eslint-disable-line
            ...otherInputsProps
          } = input;

          const inputValue = values[key];
          const invalidText = errors[key];
          const invalid = invalidText && touched[key];

          const { typeProps = () => {}, additionalTypeProps = () => {} } = determineTypeProps(
            type,
            otherProps
          );

          return (
            <DataDrivenInput
              key={key}
              customComponent={input.customComponent}
              formikProps={formikProps}
              id={key}
              invalid={invalid}
              invalidText={invalidText}
              name={key}
              onBlur={handleBlur}
              type={type}
              value={inputValue}
              {...typeProps(formikProps, key)}
              {...otherInputsProps}
              {...inputProps}
              {...additionalTypeProps({ formikProps, input })}
              {...dataDrivenInputProps}
            />
          );
        });

        return (
          <div className={`${prefix}--bmrg-dynamic-formik`}>
            {children({ inputs: dataDrivenInputs, formikProps })}
          </div>
        );
      }}
    </Formik>
  );
}
