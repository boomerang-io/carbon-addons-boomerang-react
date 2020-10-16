import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class LeftSideNav extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
  };

  leftSideNav = React.createRef();

  componentDidUpdate() {
    if (this.props.isOpen) {
      this.leftSideNav.current.focus();
    }
  }

  render() {
    const {
      className,
      children,
      isOpen, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classNames = classnames(`${prefix}--bmrg-left-side-nav-container`, className);

    return (
      <aside
        aria-label="Left side nav"
        className={classNames}
        ref={this.leftSideNav}
        tabIndex={-1}
        {...other}
      >
        {children}
      </aside>
    );
  }
}
