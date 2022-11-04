import { object as yupObject } from 'yup';

const CUSTOM_VALIDATORS = {};

export function addCustomValidator(name: any, validator: any, binding = false) {
  if (binding !== false) {
    validator = validator.bind(binding);
  }
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  CUSTOM_VALIDATORS[name] = validator;
}

export function delCustomValidator(name: any) {
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  delete CUSTOM_VALIDATORS[name];
}

export function getCustomValidator(name: any) {
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return CUSTOM_VALIDATORS[name];
}

// Handle the case when we have an array of objects
// but the previous instance of yup.shape is the yup.array
// @ts-expect-error TS(2345): Argument of type 'OptionalObjectSchema<ObjectShape... Remove this comment to see the full error message
addCustomValidator('yup.shape', yupObject().shape, yupObject());
