/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";

export default class WithState extends React.PureComponent {
  static propTypes = {
    initialState: PropTypes.object,
    children: PropTypes.func,
  };

  UNSAFE_componentWillMount() {
    this.setState((this.props as any).initialState);
  }

  // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
  boundSetState = (...args: any[]) => this.setState(...args);

  render() {
    // @ts-expect-error TS(2723): Cannot invoke an object which is possibly 'null' o... Remove this comment to see the full error message
    return this.props.children({
      state: this.state,
      setState: this.boundSetState,
    });
  }
}
