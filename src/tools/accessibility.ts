/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


/**
 * Determine if keydown event is accessible
 * @param {Object} event the first array
 * @param {Array} arr2 the second array
 * @returns {boolean} true if both arrays have the same contents, otherwise false
 */

export const isAccessibleKeyDownEvent = (evt: any) => {
  return evt.which === 13 || evt.which === 32 || evt.type === "click";
};
