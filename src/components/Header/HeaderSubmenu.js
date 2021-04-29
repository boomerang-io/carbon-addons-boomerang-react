import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import HeaderListItem from './HeaderListItem';
import {
  ChevronDown16,
  Checkmark16
} from '@carbon/icons-react';

import { settings } from 'carbon-components';

const { prefix } = settings;

class HeaderSubmenu extends React.Component {
  
  static propTypes = {
    name: PropTypes.string,
    options: PropTypes.array
  };
  
  constructor(props){
    super(props);
    this.state = {
        isActiveSubmenu: false
    }
  }
  
  dropdownRef = React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  
  handleKeyDown = (event) => {
    if (event.which === 27) {
      this.handleClickOnSubmenuParent();
    }
  };
  
  handleClickOutside = (event) => {
    if (this.dropdownRef && !this.dropdownRef.current?.contains(event.target)) {
      this.handleClickOutsideOfSubmenu();
    }
  };
  
  handleClickOnSubmenuParent = () => {
    this.setState({
      isActiveSubmenu: !this.state.isActiveSubmenu
    });
  };
  
  handleKeyDownOnSubmenuParent = (event) => {
    if (event.which === 13 || event.which === 32) {
      this.handleClickOnSubmenuParent();
    }
  };
  
  handleClickOutsideOfSubmenu = () => {
    this.setState({
      isActiveSubmenu: false
    });
  };

  render() {
    const { name, options } = this.props;
    
    return (
      <span ref={this.dropdownRef}>
        <HeaderListItem
          isIcon
          className={cx(`${prefix}--bmrg-header-list__item-submenu`, {
            '--is-active': this.state.isActiveSubmenu
          })}
          onClick={this.handleClickOnSubmenuParent}
          onKeyPress={this.handleKeyDownOnSubmenuParent}
        >
          {name}
          <ChevronDown16 className={`${prefix}--bmrg-header-list__item-submenu-dropdown-icon`} />
        </HeaderListItem>
        <ul
          className={cx(`${prefix}--bmrg-header-list__item-submenu-dropdown`, {
            '--is-active': this.state.isActiveSubmenu
          })}
        >
          {Array.isArray(options) &&
            options.map((link, i) => (
              <li key={`${link.url}-${i}`}>
                <HeaderListItem href={link.url}>
                  {link.name}
                  {window.location && window.location.href && link.url && window.location.href.startsWith(link.url) ? <Checkmark16 className={`${prefix}--bmrg-header-list__link-icon`} /> : null}
                </HeaderListItem>
              </li>
            ))}
        </ul>
      </span>
    );   
  }
   
};

export default HeaderSubmenu;