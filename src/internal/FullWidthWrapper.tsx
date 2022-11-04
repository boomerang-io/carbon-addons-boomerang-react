import React from 'react';

type OwnProps = {
    children?: React.ReactNode;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof FullWidthWrapper.defaultProps;

// Utility component that is used to render stories at full width
// @ts-expect-error TS(7022): 'FullWidthWrapper' implicitly has type 'any' becau... Remove this comment to see the full error message
const FullWidthWrapper = ({ children }: Props) => (
  <div
    style={
      children && children.type && children.type.name !== 'DeprecationNotice'
        ? { width: 'calc(100vw - 6rem)' }
        : {}
    }
  >
    {children}
  </div>
);

FullWidthWrapper.defaultProps = {
  children: null,
};

export default FullWidthWrapper;
