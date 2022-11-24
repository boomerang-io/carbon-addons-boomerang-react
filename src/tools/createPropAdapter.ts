/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Create an adapter that converts an object of props with potentially deprecated
 * prop names to the replacement prop names in a newer version. Useful for guarding
 * against breaking changes when a prop has been renamed
 *
 * @param {Array} spec - an array of options which specify a text or regex
 * matcher alongside a replacement if there is a match
 * @returns {Function}
 */
function createPropAdapter(spec: any) {
  // if props aren't passed in we should default the prop to empty object
  return (input = {}) => {
    const output = {};
    Object.keys(input).forEach((key) => {
      // @ts-expect-error TS(7031): Binding element 'regex' implicitly has an 'any' ty... Remove this comment to see the full error message
      const match = spec.find(([regex]) => {
        return key.match(regex);
      });
      if (match) {
        const [regex, replacer] = match;
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        output[key.replace(regex, replacer)] = input[key];
        return;
      }
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      output[key] = input[key];
    });
    return output;
  };
}

/**
 * TODO: REMOVE IN v11
 * props staring with "default..." were changed to "initial..." in Downshift v3
 *
 * @see https://github.com/downshift-js/downshift/releases/tag/v3.0.0
 */
const mapDownshiftProps = createPropAdapter([[/^default/g, "initial"]]);

export { mapDownshiftProps };