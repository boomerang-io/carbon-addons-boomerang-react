import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from "lodash.get";
import { transformAll, addCustomValidator } from "../../tools/yupAst";
import isUrl from "../../tools/isUrl";
import DataDrivenInput from "../DataDrivenInput";
import { prefix } from "../../internal/settings";
import {
  ARRAY_INPUT_TYPES,
  CHECKBOX_TYPES,
  CREATABLE_TYPES,
  DATE_TYPES,
  MULTI_SELECT_TYPES,
  RADIO_TYPES,
  SELECT_TYPES,
  TEXT_AREA_TYPES,
  TEXT_EDITOR_TYPES,
  TEXT_INPUT_TYPES,
  BOOLEAN_TYPES,
  INPUT_TYPES_ARRAY,
  INPUT_GROUPS,
} from "../../internal/DataDrivenInputTypes";

/**
 *
 * @param {string} value - value to test for valid property syntax
 */
function isPropertySyntaxValid({
  value,
  customPropertySyntaxPattern,
  propsSyntaxFound
}: any) {
  // Look property pattern and capture group for the property itself
  let match = value.match(customPropertySyntaxPattern);
  // if the first matched group is truthy, then a property has been entered
  // Empty properties are not valid
  if (Array.isArray(match) && match.length === propsSyntaxFound) {
    return true;
  } else {
    return false;
  }
}

function validateUrlWithProperties(customPropertySyntaxPattern: any, customPropertyStartsWithPattern: any) {
  return function(this: any) {
    return this.transform(function (value: any, originalValue: any) {
      const propsSyntaxFound = value.match(customPropertyStartsWithPattern)?.length ?? 0;
      if (
        (isUrl(value) && !Boolean(propsSyntaxFound)) ||
        isPropertySyntaxValid({ value, customPropertySyntaxPattern, propsSyntaxFound })
      ) {
        return value;
      }
      return false;
    });
  };
}

function validateEmailWithProperties(customPropertySyntaxPattern: any, customPropertyStartsWithPattern: any) {
  return function(this: any) {
    return this.transform(function (value: any, originalValue: any) {
      // Simple pattern for emails
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const propsSyntaxFound = value.match(customPropertyStartsWithPattern)?.length ?? 0;

      if (
        (isValidEmail && !Boolean(propsSyntaxFound)) ||
        isPropertySyntaxValid({ value, customPropertySyntaxPattern, propsSyntaxFound })
      ) {
        return value;
      }
      return false;
    });
  };
}

function registerCustomPropertyMethods(customPropertySyntaxPattern: any, customPropertyStartsWithPattern: any) {
  const validateUrl = validateUrlWithProperties(customPropertySyntaxPattern, customPropertyStartsWithPattern);
  const validateEmail = validateEmailWithProperties(customPropertySyntaxPattern, customPropertyStartsWithPattern);
  Yup.addMethod(Yup.string, "urlWithCustomProperty", validateUrl);
  Yup.addMethod(Yup.string, "emailWithCustomProperty", validateEmail);
}

/**
 * Recursive function to get the keys of all governing selects above the current one, except the top level one
 * @param {string} governingKey - the key of the next governing select
 * @param {string} governingJsonKey - the key of the top level governing select
 * @param {array} governingKeys - keys of governing selects above the current one that are updated in each iteration
 * @param {array} inputs - all the dynamic formik inputs
 * @returns keys of all governing selects above the current one
 */
// @ts-expect-error TS(7023): 'getGoverningSelectKeysMap' implicitly has return ... Remove this comment to see the full error message
function getGoverningSelectKeysMap({
  governingKey,
  governingJsonKey,
  governingKeys,
  inputs
}: any) {
  if (Boolean(governingKey) && governingKey !== governingJsonKey) governingKeys.unshift(governingKey);
  const governingInput = inputs.find((input: any) => input.key === governingKey);

  /** Continue recursion if the governing select has a governingKey */
  if (Boolean(governingInput.governingKey)) {
    return getGoverningSelectKeysMap({
      governingKey: governingInput.governingKey,
      governingJsonKey,
      governingKeys,
      inputs,
    });
  } else {
    return governingKeys;
  }
}

/**
 * Recursive function to get the deep options of the select input inside the json depending on the governing selects values
 * @param {object} formikValues
 * @param {object} governingInputJsonObject - the json object of the current iteration governing input key
 * @param {array} governingKeys - keys of governing selects above the current one that are updated in each iteration
 * @param {object} input - the current input whose deep options we want to retrieve from the json
 * @param {array} inputs - all the dynamic formik inputs
 * @returns the input's deep options already formatted
 */
// @ts-expect-error TS(7023): 'getGoverningSelectDeepOptions' implicitly has ret... Remove this comment to see the full error message
function getGoverningSelectDeepOptions({
  formikValues,
  governingInputJsonObject,
  governingKeys,
  input,
  inputs
}: any) {
  const nextKey = governingKeys.shift();

  if (Boolean(nextKey)) {
    const nextKeyInput = inputs.find((input: any) => input.key === nextKey);
    const nextInputJsonObject = governingInputJsonObject[nextKey].find(
      (jsonElement: any) => jsonElement[nextKeyInput.jsonKey] === formikValues[nextKey]
    );

    return getGoverningSelectDeepOptions({
      formikValues,
      governingInputJsonObject: nextInputJsonObject,
      governingKeys,
      input,
      inputs,
    });
  } else {
    return governingInputJsonObject[input.key].map((option: any) => ({
      label: option[input.jsonLabel],
      value: option[input.jsonKey]
    }));
  }
}

/**
 * Recursive function to erase the values of all governed selects below the current one when it changes
 * @param {object} formikValues
 * @param {object} input - the current input whose deep options we want to retrieve from the json
 * @param {array} inputs - all the dynamic formik inputs
 * @param {string} selectedItem - new value of the select input
 */
async function handleGoverningSelectChange({
  formikProps,
  input,
  inputs,
  isInputBeingChanged,
  selectedItem
}: any) {
  const { key } = input;
  const inputsGovernedByCurrentOne = inputs.filter((formikInput: any) => formikInput.governingKey === key);

  /** Erase value of governed inputs */
  if (inputsGovernedByCurrentOne.length) {
    await inputsGovernedByCurrentOne.forEach(async (input: any) => {
      await handleGoverningSelectChange({ formikProps, input, inputs, isInputBeingChanged: false, selectedItem: "" });
    });
  }

  // only the top governing select should display warnings if changed and reset touched status for governed ones
  await formikProps.setFieldTouched(`['${key}']`, isInputBeingChanged);
  formikProps.setFieldValue(`['${key}']`, selectedItem ? selectedItem.value : "");
  formikProps.setFieldValue(`['${key}-keyLabel']`, selectedItem ? selectedItem.label : "");
}

/**
 * Generate Yup schema AST from input objects
 * @param {Array} inputs
 * @returns {Array: Yup AST} validation schema AST
 */
function generateYupAst({
  inputs,
  allowCustomPropertySyntax,
  customPropertySyntaxPattern,
  customPropertyStartsWithPattern,
  useCSVforArrays
}: any) {
  if (allowCustomPropertySyntax) {
    registerCustomPropertyMethods(customPropertySyntaxPattern, customPropertyStartsWithPattern);
  }
  let yupShape = {};
  inputs.forEach((input: any) => {
    let yupValidationArray = [];
    const inputType = input.type ?? "";

    if (!INPUT_TYPES_ARRAY.includes(inputType)) {
      return;
    }

    if (inputType === DATE_TYPES.DATE) {
      yupValidationArray.push(["yup.date", "Enter a valid date"]);
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
      yupValidationArray.push(["yup.string"]);
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
            input.patternInvalidText || `Enter a value that matches pattern: ${input.pattern}`,
            (value) => {
              if (!input.required && !Boolean(value)) {
                return true;
              // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
              } else return new RegExp(input.pattern).test(value);
            }
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
          yupValidationArray.push(["yup.emailWithCustomProperty"], ["yup.typeError", "Enter a valid email"]);
        else yupValidationArray.push(["yup.email", "Enter a valid email"]);
      }

      if (inputType === TEXT_INPUT_TYPES.URL) {
        if (allowCustomPropertySyntax)
          yupValidationArray.push(["yup.urlWithCustomProperty"], ["yup.typeError", "Enter a valid URL"]);
        else yupValidationArray.push(["yup.url", "Enter a valid URL"]);
      }
    }

    if (inputType === TEXT_INPUT_TYPES.NUMBER) {
      yupValidationArray.push(["yup.number", "Enter a number"]);
    }

    if (inputType === BOOLEAN_TYPES.BOOLEAN) {
      yupValidationArray.push(["yup.boolean"]);
    }

    if (
      inputType === MULTI_SELECT_TYPES.MULTI_SELECT ||
      inputType === CREATABLE_TYPES.CREATABLE_SINGLE ||
      inputType === CREATABLE_TYPES.CREATABLE_SINGLE_NON_DELETABLE ||
      inputType === CREATABLE_TYPES.CREATABLE_PAIR ||
      inputType === CREATABLE_TYPES.CREATABLE_PAIR_NON_DELETABLE ||
      inputType === CHECKBOX_TYPES.CHECKBOX
    ) {
      if (useCSVforArrays) {
        yupValidationArray.push(["yup.string"]);

        if (input.pattern) {
          addCustomValidator(
            `${input.key}-matches`,
            Yup.string().test(
              `${input.key}-matches`,
              input.patternInvalidText || `Enter values that matches pattern: ${input.pattern}`,
              (csv) => {
                const regexTester = new RegExp(input.pattern);
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                return csv.split(",").every((val) => regexTester.test(val));
              }
            )
          );
          yupValidationArray.push([`${input.key}-matches`]);
        }
      } else {
        yupValidationArray.push(["yup.array"]);

        if (input.pattern) {
          addCustomValidator(
            `${input.key}-matches`,
            Yup.array().test(
              `${input.key}-matches`,
              input.patternInvalidText || `Enter values that matches pattern: ${input.pattern}`,
              (values) => {
                const regexTester = new RegExp(input.pattern);
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                return values.every((val) => regexTester.test(val));
              }
            )
          );
          yupValidationArray.push([`${input.key}-matches`]);
        }
      }
    }

    if (
      Object.values(TEXT_INPUT_TYPES).includes(inputType) ||
      inputType === TEXT_AREA_TYPES.TEXT_AREA ||
      inputType === TEXT_EDITOR_TYPES.TEXT_EDITOR
    ) {
      if (inputType === TEXT_INPUT_TYPES.NUMBER) {
        if (input.min) {
          yupValidationArray.push(["yup.min", input.min, `Enter value greater than ${input.min}`]);
        }

        if (input.max) {
          yupValidationArray.push(["yup.max", input.max, `Enter value less than ${input.max}`]);
        }
      } else {
        if (input.min) {
          yupValidationArray.push(["yup.min", input.min, `Enter at least ${input.min} characters`]);
        }

        if (input.max) {
          yupValidationArray.push(["yup.max", input.max, `Enter at most ${input.max} characters`]);
        }
      }
    }

    if (Array.isArray(input.invalidValues)) {
      yupValidationArray.push(["yup.notOneOf", input.invalidValues, `Enter an allowed value`]);
    }

    if (input.required) {
      if (inputType === BOOLEAN_TYPES.BOOLEAN) {
        yupValidationArray.push(["yup.oneOf", [true], "Toggle must be checked"]);
      } else {
        yupValidationArray.push(["yup.required", `Enter a value for ${input.label}`]);
      }
    }

    if (yupValidationArray.length > 0) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      yupShape[input.key] = yupValidationArray;
    }
  });

  return [["yup.object"], ["yup.shape", yupShape]];
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
  customPropertyStartsWithPattern,
  useCSVforArrays,
  validationSchemaExtension
}: any) {
  let validationSchema = transformAll(
    generateYupAst({
      inputs,
      allowCustomPropertySyntax,
      customPropertySyntaxPattern,
      customPropertyStartsWithPattern,
      useCSVforArrays,
    })
  );
  if (validationSchemaExtension) {
    validationSchema = validationSchema.concat(validationSchemaExtension);
  }
  return validationSchema;
}

/**
 * Get initial values of each input in array of inputs
 */
const determineInitialValues = (inputs: any, useCSVforArrays: any) => {
  const values = {};
  inputs.forEach((input: any) => {
    let value = "";
    let valueToCheck = input.value || input.defaultValue;
    const isArrayInput = !useCSVforArrays && Object.values(ARRAY_INPUT_TYPES).includes(input.type);

    if (isArrayInput) {
      valueToCheck = input.value || input.defaultValue || input.values || input.defaultValues;
    }

    if (valueToCheck) {
      switch (valueToCheck) {
        case "false": {
          // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
          value = false;
          break;
        }
        case "true": {
          // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
          value = true;
          break;
        }
        default: {
          value = valueToCheck;
        }
      }
    }

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    values[input.key] = value;
  });
  return values;
};

/**
 * Check if an input X needs to be conditionally rendered
 * If it does, then find an input Y in the same section that has key equal to the input X's requiredForKey
 * If input Y has a value that is present in input X's requiredValueOf array, then render X
 */
const conditionallyRenderInput = (input: any, values: any) => {
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
      if (requiredForValue === requiredForKeyInputValue || requiredForValue === String(requiredForKeyInputValue)) {
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
  [INPUT_GROUPS.CHECKBOX]: (
    // @ts-expect-error TS(7006): Parameter 'formikProps' implicitly has an 'any' ty... Remove this comment to see the full error message
    formikProps,
    {
      key
    }: any,
    // @ts-expect-error TS(7006): Parameter 'inputs' implicitly has an 'any' type.
    inputs,
    // @ts-expect-error TS(7006): Parameter 'useCSVforArrays' implicitly has an 'any... Remove this comment to see the full error message
    useCSVforArrays
  ) => ({
    onChange: (value: any, id: any, event: any, selectedItems: any) => {
      if (useCSVforArrays) {
        formikProps.setFieldValue(`['${key}']`, selectedItems?.join() ?? "");
      } else {
        formikProps.setFieldValue(`['${key}']`, selectedItems);
      }
    }
  }),

  [INPUT_GROUPS.CREATABLE]: (
    // @ts-expect-error TS(7006): Parameter 'formikProps' implicitly has an 'any' ty... Remove this comment to see the full error message
    formikProps,
    {
      key
    }: any,
    // @ts-expect-error TS(7006): Parameter 'inputs' implicitly has an 'any' type.
    inputs,
    // @ts-expect-error TS(7006): Parameter 'useCSVforArrays' implicitly has an 'any... Remove this comment to see the full error message
    useCSVforArrays
  ) => ({
    onChange: (createdItems: any) => {
      formikProps.setFieldTouched(`['${key}']`, true);

      if (useCSVforArrays) {
        formikProps.setFieldValue(`['${key}']`, createdItems?.join() ?? "");
      } else {
        formikProps.setFieldValue(`['${key}']`, createdItems);
      }
    },

    onInputBlur: () => formikProps.setFieldTouched(`['${key}']`, true, true)
  }),

  [INPUT_GROUPS.DATE]: (formikProps: any, {
    key,
    type
  }: any) =>
    type === DATE_TYPES.DATE_RANGE
      ? {
          onChange: (dateArray: any) => formikProps.setFieldValue(
            `['${key}']`,
            dateArray?.map((date: any) => date.toISOString())
          ),
        }
      : {
          onChange: formikProps.handleChange,
          onCalendarChange: (dateArray: any) => formikProps.setFieldValue(`['${key}']`, dateArray[0]?.toISOString()),
        },

  [INPUT_GROUPS.MULTI_SELECT]: (
    // @ts-expect-error TS(7006): Parameter 'formikProps' implicitly has an 'any' ty... Remove this comment to see the full error message
    formikProps,
    {
      key
    }: any,
    // @ts-expect-error TS(7006): Parameter 'inputs' implicitly has an 'any' type.
    inputs,
    // @ts-expect-error TS(7006): Parameter 'useCSVforArrays' implicitly has an 'any... Remove this comment to see the full error message
    useCSVforArrays
  ) => ({
    onChange: async ({
      selectedItems
    }: any) => {
      await formikProps.setFieldTouched(`['${key}']`, true);

      if (useCSVforArrays) {
        formikProps.setFieldValue(
          `['${key}']`,
          selectedItems ? selectedItems.map((item: any) => item && item.value).join() : ""
        );
      } else {
        formikProps.setFieldValue(
          `['${key}']`,
          selectedItems.map((item: any) => item && item.value)
        );
      }
    },

    onInputBlur: () => formikProps.setFieldTouched(`['${key}']`, true, true)
  }),

  [INPUT_GROUPS.RADIO]: (
    // @ts-expect-error TS(7006): Parameter 'formikProps' implicitly has an 'any' ty... Remove this comment to see the full error message
    formikProps,
    {
      key
    }: any
  ) => ({
    onChange: (value: any) => formikProps.setFieldValue(`['${key}']`, value)
  }),

  [INPUT_GROUPS.SELECT]: (formikProps: any, input: any, inputs: any) => {
    const { key } = input;

    let typeProps = {
      onChange: async ({
        selectedItem
      }: any) => {
        await formikProps.setFieldTouched(`['${key}']`, true);
        formikProps.setFieldValue(`['${key}']`, selectedItem ? selectedItem.value : "");
      },
      onInputBlur: () => formikProps.setFieldTouched(`['${key}']`, true, true),
    };

    /**
     * Start Governing Selects logic if input contains governingJsonKey
     */
    if (Boolean(input.governingJsonKey)) {
      const { governingJsonKey, governingKey, jsonKey, jsonLabel } = input;
      const governingJsonInput = inputs.find((input: any) => input.key === governingJsonKey);

      /** Check if governingJson with all governing selects data exists as an array */
      if (Array.isArray(governingJsonInput?.governingJson)) {
        const { governingJson } = governingJsonInput;

        let governingOptions = [];
        let governingDisabled = false;

        /**
         * Select "governingOptions"
         * If current select is the top level governing select, just get the top level options from the json
         */
        if (key === governingJsonKey) {
          governingOptions = governingJson.map((option: any) => ({
            label: option[jsonLabel],
            value: option[jsonKey]
          }));
        } else {
          /** Check if the select that governs this one has a value and disable if it doesn't */
          const governingSelectValue = formikProps.values[governingKey];
          if (Boolean(governingSelectValue)) {
            let governingKeys = getGoverningSelectKeysMap({
              governingKey,
              governingJsonKey,
              governingKeys: [],
              inputs,
            });
            governingOptions = getGoverningSelectDeepOptions({
              formikValues: formikProps.values,
              governingInputJsonObject: governingJson.find(
                (jsonElement: any) => jsonElement[governingJsonInput.jsonKey] === formikProps.values[governingJsonKey]
              ),
              governingKeys: [...governingKeys],
              input,
              inputs,
            });
          } else {
            governingDisabled = true;
          }
        }

        typeProps = {
          ...typeProps,
          onChange: ({ selectedItem }) =>
            handleGoverningSelectChange({ formikProps, input, inputs, selectedItem, isInputBeingChanged: true }),
          // @ts-expect-error TS(2322): Type '{ onChange: ({ selectedItem }: any) => Promi... Remove this comment to see the full error message
          governingOptions,
          governingDisabled,
        };
      }
    }

    return typeProps;
  },

  [INPUT_GROUPS.TEXT_AREA]: (formikProps: any) => ({
    onChange: formikProps.handleChange
  }),

  [INPUT_GROUPS.TEXT_EDITOR]: (formikProps: any) => ({
    onChange: formikProps.handleChange
  }),

  [INPUT_GROUPS.TEXT_INPUT]: (formikProps: any) => ({
    onChange: formikProps.handleChange
  }),

  [INPUT_GROUPS.BOOLEAN]: (
    // @ts-expect-error TS(7006): Parameter 'formikProps' implicitly has an 'any' ty... Remove this comment to see the full error message
    formikProps,
    {
      key
    }: any
  ) => ({
    onChange: (value: any) => {
      formikProps.setFieldTouched(`['${key}']`, true, true);
      formikProps.setFieldValue(`['${key}']`, value);
    }
  }),
};

/**
 *  Determine the addition type props to pass the component
 * @param {string} type - type of input
 * @param {Object} otherProps - additional functions to pass props to inputs
 * @returns {Function}
 */
function determineTypeProps(type: any, otherProps: any) {
  const {
    checkboxListProps,
    creatableProps,
    dateProps,
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

  if (Object.values(DATE_TYPES).includes(type)) {
    return {
      typeProps: TYPE_PROPS[INPUT_GROUPS.DATE],
      additionalTypeProps: dateProps,
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

DynamicFormik.defaultProps = {
  additionalInitialValues: {},
  allowCustomPropertySyntax: false,
  customPropertySyntaxPattern: /\$\{p:([a-zA-Z0-9_.-]+)\}|\$\(([a-zA-Z0-9_.-\s]+)\)/g,
  customPropertyStartsWithPattern: /\$\{|\$\(/g,
  children: () => ({}),
  checkboxListProps: () => ({}),
  creatableProps: () => ({}),
  dateProps: () => ({}),
  multiSelectProps: () => ({}),
  radioProps: () => ({}),
  selectProps: () => ({}),
  textAreaProps: () => ({}),
  textEditorProps: () => ({}),
  textInputProps: () => ({}),
  toggleProps: () => ({}),
  useCSVforArrays: false,
};

type OwnDynamicFormikProps = {
    children: (...args: any[]) => any;
    dataDrivenInputProps?: any;
    customPropertySyntaxPattern?: any; // TODO: PropTypes.instanceOf(RegExp)
    customPropertyStartsWithPattern?: any; // TODO: PropTypes.instanceOf(RegExp)
    additionalInitialValues?: any;
    allowCustomPropertySyntax?: boolean;
    inputProps?: any;
    initialValues?: any;
    inputs: any[];
    onSubmit?: (...args: any[]) => any;
    useCSVforArrays?: boolean;
    validationSchema?: any;
    validationSchemaExtension?: any;
    allProps?: (...args: any[]) => any;
    checkboxListProps?: (...args: any[]) => any;
    creatableProps?: (...args: any[]) => any;
    dateProps?: (...args: any[]) => any;
    multiSelectProps?: (...args: any[]) => any;
    radioProps?: (...args: any[]) => any;
    selectProps?: (...args: any[]) => any;
    textAreaProps?: (...args: any[]) => any;
    textEditorProps?: (...args: any[]) => any;
    textInputProps?: (...args: any[]) => any;
    toggleProps?: (...args: any[]) => any;
};

type DynamicFormikProps = OwnDynamicFormikProps & typeof DynamicFormik.defaultProps;

export default function DynamicFormik({ additionalInitialValues, allowCustomPropertySyntax, customPropertySyntaxPattern, customPropertyStartsWithPattern, children, dataDrivenInputProps, inputProps, initialValues, inputs, onSubmit, useCSVforArrays, validationSchema, validationSchemaExtension, ...otherProps }: DynamicFormikProps) {
  return (
    <Formik
      initialValues={
        (Boolean(initialValues) && initialValues) || {
          ...determineInitialValues(inputs, useCSVforArrays),
          ...additionalInitialValues,
        }
      }
      validationSchema={
        validationSchema ||
        generateYupSchema({
          inputs,
          allowCustomPropertySyntax,
          customPropertySyntaxPattern,
          customPropertyStartsWithPattern,
          useCSVforArrays,
          validationSchemaExtension,
        })
      }
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onSubmit={(values, actions) => onSubmit(values, actions)}
      {...otherProps}
    >
      {(formikProps) => {
        const { values, touched, errors, handleBlur } = formikProps;
        const finalInputs = inputs.filter((input) => conditionallyRenderInput(input, values));

        const dataDrivenInputs = finalInputs.map((input) => {
          const {
            key,
            type,
            value, // eslint-disable-line
            ...otherInputsProps
          } = input;

          const inputValue =
            values[key] !== undefined &&
            values[key] !== null &&
            (Object.values(TEXT_INPUT_TYPES).includes(type) ||
              type === TEXT_AREA_TYPES.TEXT_AREA ||
              type === TEXT_EDITOR_TYPES.TEXT_EDITOR)
              ? values[key].toString()
              : values[key];
          const invalidText = get(errors, key);
          const invalid = invalidText && get(touched, key);

          // @ts-expect-error TS(2339): Property 'typeProps' does not exist on type '(() =... Remove this comment to see the full error message
          const { typeProps = () => {}, additionalTypeProps = () => {} } = determineTypeProps(type, otherProps);

          return (
            <DataDrivenInput
              key={key}
              customComponent={input.customComponent}
              formikProps={formikProps}
              id={`['${key}']`}
              invalid={invalid}
              invalidText={invalidText}
              name={`['${key}']`}
              onBlur={handleBlur}
              type={type}
              value={inputValue}
              {...typeProps(formikProps, input, finalInputs, useCSVforArrays)}
              {...otherInputsProps}
              {...inputProps}
              {...additionalTypeProps({ formikProps, input })}
              {...dataDrivenInputProps}
            />
          );
        });

        return (
          <div className={`${prefix}--bmrg-dynamic-formik`}>{children({ inputs: dataDrivenInputs, formikProps })}</div>
        );
      }}
    </Formik>
  );
}
