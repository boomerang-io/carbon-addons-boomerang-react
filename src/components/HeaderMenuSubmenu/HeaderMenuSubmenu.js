import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import HeaderListItem from '../Header/HeaderListItem';
import { ChevronDown16 } from '@carbon/icons-react';

import { settings } from 'carbon-components';

const { prefix } = settings;

class HeaderMenuSubmenu extends React.Component {
  
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
  
  handleClickOnSubmenuParent = () => {
    this.setState({
      isActiveSubmenu: !this.state.isActiveSubmenu
    });
  };
  
  handleClickOutsideOfSubmenu = () => {
    this.setState({
      isActiveSubmenu: false
    });
  };

  render() {
    const { name, options } = this.props;
    
    return (
      <>
        <HeaderListItem
          isIcon
          className={cx(`${prefix}--bmrg-header-menu-item-submenu`, {
            '--is-active': this.state.isActiveSubmenu
          })}
          onClick={this.handleClickOnSubmenuParent}
        >
          {name}
          <ChevronDown16 className={`${prefix}--bmrg-header-menu-item-submenu-dropdown-icon`} />
        </HeaderListItem>
        <ul
          className={cx(`${prefix}--bmrg-header-menu-item-submenu-dropdown`, {
            '--is-active': this.state.isActiveSubmenu
          })}
        >
          {Array.isArray(options) &&
            options.map((link, i) => (
              <li key={`${link.url}-${i}`}>
                <HeaderListItem href={link.url}>
                  {link.name}
                </HeaderListItem>
              </li>
            ))}
        </ul>
      </>
    );   
  }
   
};

export default HeaderMenuSubmenu;