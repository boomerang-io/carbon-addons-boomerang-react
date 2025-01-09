/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

let lastId = 0;

function uniqueId(prefix = "id") {
  lastId++;
  return `${prefix}${lastId}`;
}

export default uniqueId;
