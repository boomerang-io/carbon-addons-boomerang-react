import React from 'react';
import PropTypes from 'prop-types';
import ErrorDragon from '../ErrorDragon';
import ErrorPageCore from '../ErrorPageCore';

export default function ErrorFullPage(props) {
  return props?.theme === 'boomerang' ? (
    <ErrorDragon {...props} />
  ) : (
    <ErrorPageCore {...props} />
  );
}

ErrorFullPage.defaultProps = {
  theme: 'core',
};

ErrorFullPage.propTypes = {
  theme: PropTypes.oneOf(['core', 'boomerang'])
};
