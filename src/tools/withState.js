/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class WithState extends React.PureComponent {
  static propTypes = {
    initialState: PropTypes.object,
    children: PropTypes.func,
  };

  UNSAFE_componentWillMount() {
    this.setState(this.props.initialState);
  }

  boundSetState = (...args) => this.setState(...args);

  render() {
    return this.props.children({
      state: this.state,
      setState: this.boundSetState,
    });
  }
}
