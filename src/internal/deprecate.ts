// @ts-expect-error TS(7016): Could not find a declaration file for module 'warn... Remove this comment to see the full error message
import warning from "warning";

const didWarnAboutDeprecation = {};

export default function deprecate(propType: any, message: any) {
  function checker(props: any, propName: any, componentName: any, ...rest: any[]) {
    if (props[propName] === undefined) {
      return;
    }

    if (
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      !didWarnAboutDeprecation[componentName] ||
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      !didWarnAboutDeprecation[componentName][propName]
    ) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      didWarnAboutDeprecation[componentName] = {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        ...didWarnAboutDeprecation[componentName],
        [propName]: true,
      };

      warning(
        false,
        message ||
          `The prop \`${propName}\` has been deprecated for the ` +
            `${componentName} component. It will be removed in the next major ` +
            `release`
      );
    }

    return propType(props, propName, componentName, ...rest); // eslint-disable-line
  }

  return checker;
}
