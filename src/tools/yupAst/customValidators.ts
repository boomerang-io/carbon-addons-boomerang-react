// @ts-nocheck
import { object as yupObject } from "yup";

const CUSTOM_VALIDATORS = {};

export function addCustomValidator(name: any, validator: any, binding = false) {
  if (binding !== false) {
    validator = validator.bind(binding);
  }
  CUSTOM_VALIDATORS[name] = validator;
}

export function delCustomValidator(name: any) {
  delete CUSTOM_VALIDATORS[name];
}

export function getCustomValidator(name: any) {
  return CUSTOM_VALIDATORS[name];
}

// Handle the case when we have an array of objects
// but the previous instance of yup.shape is the yup.array
addCustomValidator("yup.shape", yupObject().shape, yupObject());
