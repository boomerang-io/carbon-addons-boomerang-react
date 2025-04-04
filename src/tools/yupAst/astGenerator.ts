/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


// @ts-nocheck
import * as yup from "yup";

import { getCustomValidator } from "./customValidators";

class ValidationError {
  message: any;
  constructor(message: any) {
    this.message = message;
  }
}

/**
 * Searches for {substring} in {string}.
 * If found, returns the {string}, sliced after substring.
 *
 * @param {string} string - String to be sliced.
 * @param {string} substring - String to search for.
 * @returns {string|null} Null if no match found.
 */
function getSubString(string: any, substring: any) {
  if (!string) return null;

  const testedIndex = string.indexOf(substring);

  if (testedIndex > -1) {
    return string.slice(testedIndex + substring.length);
  }

  return null;
}

/**
 * Returns a function from yup, by passing in a function name from our schema.
 * @param {string} functionName - The string to search for a function.
 * @param {Object} previousInstance - Object from previous validator result or yup itself.
 * @returns {Function} Either the found yup function or the default validator.
 */
function getYupFunction(functionName: any, previousInstance = yup) {
  // Make sure we're dealing with a string
  if (functionName instanceof Array) {
    functionName = functionName[0];
  }

  // Attempt to retrieve any custom validators first
  const customValidator = getCustomValidator(functionName);
  if (customValidator) {
    return customValidator;
  }

  const yupName = getSubString(functionName, "yup.");

  if (yupName && previousInstance[yupName] instanceof Function) {
    return previousInstance[yupName].bind(previousInstance);
  }

  if (yupName && yup[yupName] instanceof Function) {
    return yup[yupName].bind(yup);
  }

  throw new ValidationError(`Could not find validator ${functionName}`);
}

/**
 * Here we check to see if a passed array could be a prefix notation function.
 * @param {Array} item - Item to be checked.
 * @param {any} item.functionName - We'll check this, and perhaps it's a prefix function name.
 * @returns {boolean} True if we are actually looking at prefix notation.
 */

function isPrefixNotation([functionName]) {
  if (functionName instanceof Array) {
    if (isPrefixNotation(functionName)) return true;
  }

  if (typeof functionName !== "string") return false;
  if (functionName.indexOf("yup.") < 0) return false;

  return true;
}

/**
 * Ensure that the argument passed is an array.
 * @param {Any} maybeArray - To be checked.
 * @returns {Array} forced to array.
 */
function ensureArray(maybeArray: any) {
  if (maybeArray instanceof Array === false) {
    return [maybeArray];
  }

  return maybeArray;
}

/**
 * Returns true if the passed item is a yup.Schema
 * @param {maybeSchema} item - Item to check
 */
function isSchema(item: any) {
  return [
    // All possible yup schema types
    yup.mixed,
    yup.date,
    yup.array,
    yup.string,
    yup.number,
    yup.object,
    yup.bool,
  ].some((schemaType) => item instanceof schemaType);
}

/**
 * Converts an array of ['yup.number'] to yup.number().
 * @param {[Any]} arrayArgument - The validation array.
 * @param {Object} previousInstance - The result of a call to yup.number()
 * i.e. an object schema validation set
 * @returns {Function} generated yup validator
 */

function convertArray(arrayArgument: any, previousInstance = yup) {
  const [functionName, ...argsToPass] = ensureArray(arrayArgument);

  // Handle the case when we have a previous instance
  // but we don't want to use it for this transformation
  // [['yup.array'], ['yup.of', [['yup.object'], ['yup.shape'] ...]]]
  if (functionName instanceof Array) {
    return transformArray(arrayArgument);
  }

  const gotFunc = getYupFunction(functionName, previousInstance, arrayArgument);

  // Here we'll actually call the function
  // This might be something like yup.number().min(5)
  // We could be passing different types of arguments here
  // so we'll try to transform them before calling the function
  // yup.object().shape({ test: yup.string()}) should also be transformed
  const convertedArguments = transformAll(argsToPass, previousInstance);

  // Handle the case when we've got an array of empty elements
  if (convertedArguments instanceof Array) {
    if (convertedArguments.filter((i) => i).length < 1) {
      if (typeof gotFunc === "function") {
        return gotFunc();
      }
      if (isSchema(gotFunc)) {
        return gotFunc;
      }
    }

    // Spread the array over the function
    return gotFunc(...convertedArguments);
  }

  // Handle the case when we're passing another validator
  return gotFunc(convertedArguments);
}

/**
 * Transforms an array JSON schema to yup array schema.
 *
 * @param {Array} jsonArray - array in JSON to be transformed.
 * @returns {Array} Array with same keys, but values as yup validators.
 */

function transformArray(jsonArray: any, previousInstance = yup) {
  let toReturn = convertArray(jsonArray[0]);

  jsonArray.slice(1).forEach((item: any) => {
    // Found an array, move to prefix extraction
    if (item instanceof Array) {
      toReturn = convertArray(item, toReturn);
      return;
    }

    // Found an object, move to object extraction
    if (item instanceof Object) {
      toReturn = transformObject(item, previousInstance);
      return;
    }

    // Handle an edge case where we have something like
    // [['yup.ref', 'linkName'], 'custom error'], and we don't want
    // to consume 'custom error as a variable yet'
    if (toReturn instanceof Array) {
      toReturn = toReturn.concat(item);
      return;
    }

    toReturn = [toReturn, item];
  });

  return toReturn;
}

/**
 * Transforms an object JSON schema to yup object schema.
 *
 * @param {Object} jsonObject - Object in JSON to be transformed.
 * @returns {Object} Object with same keys, but values as yup validators.
 */
export function transformObject(jsonObject: any, previousInstance = yup) {
  const toReturn = {};

  Object.entries(jsonObject).forEach(([key, value]) => {
    // Found an array move to array extraction
    if (value instanceof Array) {
      toReturn[key] = transformArray(value, previousInstance);
      return;
    }

    // Found an object recursive extraction
    if (value instanceof Object) {
      toReturn[key] = transformObject(value, previousInstance);
      return;
    }

    toReturn[key] = value;
  });

  return toReturn;
}

/**
 * Steps into arrays and objects and resolve the items inside to yup validators.
 * @param {Any} jsonObjectOrArray - Object to be transformed.
 * @returns {yup.Validator}
 */

export function transformAll(jsonObjectOrArray: any, previousInstance = yup) {
  // We're dealing with an array
  // This could be a prefix notation function
  // If so, we'll call the converter
  if (jsonObjectOrArray instanceof Array) {
    if (isPrefixNotation(jsonObjectOrArray)) {
      return transformArray(jsonObjectOrArray, previousInstance);
    }

    return jsonObjectOrArray.map((i) => transformAll(i, previousInstance));
  }

  // If we're dealing with an object
  // we should check each of the values for that object.
  // Some of them may also be prefix notation functiosn
  if (jsonObjectOrArray instanceof Object) {
    return transformObject(jsonObjectOrArray, previousInstance);
  }

  // No case here, just return anything else
  return jsonObjectOrArray;
}

/**
 * Can transform arrays or an object into a single validator.
 * This should be your initial entrypoint.
 *
 * @param {Any} jsonObjectOrArray - Object to be transformed.
 * @returns {yup.Validator}
 */
export function transform(jsonObjectOrArray: any) {
  try {
    if (jsonObjectOrArray instanceof Object) {
      return transformAll([
        // build a custom validator which takes an object as parameter
        // If we don't do this, we'll get back an object of validators
        ["yup.object"],
        ["yup.required"],
        ["yup.shape", jsonObjectOrArray],
      ]);
    }

    // No case here, just return anything else
    return transformAll(jsonObjectOrArray);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new Error(`Could not validate ${JSON.stringify(jsonObjectOrArray, null, 4)}\n${error.message}`);
    }

    throw error;
  }
}
