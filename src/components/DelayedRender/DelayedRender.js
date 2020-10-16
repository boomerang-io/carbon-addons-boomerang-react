import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

DelayedRender.defaultProps = {
  delay: 300,
};

DelayedRender.propTypes = {
  children: PropTypes.node.isRequired,
  /** Time to delay in milliseconds before rendering the component */
  delay: PropTypes.number,
};

function DelayedRender({ children, delay }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (shouldRender) {
    return children;
  }

  return null;
}

export default DelayedRender;
