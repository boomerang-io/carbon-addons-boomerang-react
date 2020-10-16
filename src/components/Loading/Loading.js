import React from 'react';
import PropTypes from 'prop-types';
import { Loading as CarbonLoading } from 'carbon-components-react';
import DelayedRender from '../DelayedRender';

Loading.propTypes = {
  /** Time to delay in milliseconds before rendering the component */
  delay: PropTypes.number,
};

function Loading({ delay, ...rest }) {
  return (
    <DelayedRender delay={delay}>
      <CarbonLoading {...rest} />
    </DelayedRender>
  );
}

export default Loading;
