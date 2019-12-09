/**
 *
 * List
 *
 */

import React, { PropTypes } from 'react';
import { Dropdown, Button, Icon } from 'antd';
import Menu from 'antd/lib/menu';
import { ListWrapper, MenuItemWrapper } from './css';

import Star from 'assets/icons/star.png';
import Invalid from 'assets/icons/invalid.png';
import Outdated from 'assets/icons/outdated.png';
import Unlock from 'assets/icons/unlock.png';
import DND from 'assets/icons/dnd.png';
import User from 'assets/icons/all_contacts.png';
import Company from 'assets/icons/company_black.png';

class List extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

   constructor(props){
    super(props);

     this.selectSpecialFilterHandler = this.selectSpecialFilterHandler.bind(this)
  }

  selectSpecialFilterHandler = (e) => {
    let value = e.key;
    const { category } = this.props;
    const unlockedKeyword = {
      category,
      filters: 'unlocked',
      name: 'Unlocked',
      type: 'Unlocked'
    };
    const reportedKeyword = {
      category,
      filters: 'reported',
      name: 'Reported',
      type: 'Reported'
    };
    const outdatedKeyword = {
      category,
      filters: 'outdated',
      name: 'Outdated',
      type: 'Outdated'
    };
    const archivedKeyword = {
      category,
      filters: 'trash',
      name: 'Trash',
      type: 'Trash'
    };
    const favoriteKeyword = {
      category,
      filters: 'favorites',
      name: 'Favorites',
      type: 'Favorites'
    };

    let name = value;
    if(value == 'Trash'){
      name = "Do not contact";
    }
    else if(value == 'Unlocked'){
      name = "Unlocked";
    }
    const selectedKeyword = {
      category,
      filters: value == 'Unlocked' ? 'unlocked' : value.toLowerCase(),
      name: name,
      type: value
    };

    if (e.key === 'all') {
      this.props.setSystemFilter('All');
    } else {
      this.props.addKeyword(selectedKeyword);
    }
  };
  render() {
    const menu = (
      <Menu onClick={this.selectSpecialFilterHandler} style={{ paddingTop: 8 }}>
        <Menu.Item key="Unlocked">
          <MenuItemWrapper>
            <i className="material-icons menu-item-icon">
              lock_open
            </i>
            <span className="menu-item-text">
              Unlocked
            </span>
          </MenuItemWrapper>
        </Menu.Item>
        <Menu.Item key="Favorites">
          <MenuItemWrapper className="favourites">
            <i className="material-icons menu-item-icon">
              star_border
            </i>
            <span className="menu-item-text">
              Favorites
            </span>
          </MenuItemWrapper>
        </Menu.Item>
        <Menu.Item key="Trash">
          <MenuItemWrapper>
            <i className="material-icons menu-item-icon">
              not_interested
            </i>
            <span className="menu-item-text">
              Do not contact
            </span>
          </MenuItemWrapper>
        </Menu.Item>
        <Menu.Item key="Reported">
          <MenuItemWrapper className="reported">
            <i className="material-icons menu-item-icon">
              report_problem
            </i>
            <span className="menu-item-text">
              Reported
            </span>
          </MenuItemWrapper>
        </Menu.Item>
        <Menu.Item key="Outdated">
          <MenuItemWrapper className="outdated">
            <i className="material-icons menu-item-icon">
              event_busy
            </i>
            <span className="menu-item-text">
              Outdated
            </span>
          </MenuItemWrapper>
        </Menu.Item>
      </Menu>
    );

    const specialFilterClass =
      this.props.activeSpecialFilter &&
      this.props.activeSpecialFilter.toLowerCase();

    const filterStatus = {
      Unlocked: 'Unlocked',
      Reported: 'Reported',
      Outdated: 'Outdated',
      Trash: 'Suppression List',
      Favorites: 'Favorites',
    };
    
    return (
      <ListWrapper categoryValue={this.props.category}>
        <Dropdown size="large" overlay={menu} trigger={['click']}>
          <span>
            <i className="material-icons">
              touch_app
            </i>
            Action Filters
            <Icon type="down" />
          </span>
        </Dropdown>
      </ListWrapper>
    );

    return (
      <ListWrapper>
        {/*
        <div onClick={this.selectSpecialFilterHandler.bind(this, 'All')}>
          {
            this.props.category === 'Contact' ?
            <img src={User} style={{'verticalAlign':'top', 'marginRight':'5px', 'height': '15px'}} />
            :
            <img src={Company} style={{'verticalAlign':'top', 'marginRight':'5px'}} />
          }
          <span className="menu-item-text">
            {this.props.category === 'Contact' && 'All Contacts'}
            {this.props.category === 'Organization' && 'All Organizations'}
          </span>
        </div>
        */}
        <div onClick={this.selectSpecialFilterHandler.bind(this, 'Purchased')}>
          <img src={Unlock} style={{'verticalAlign':'top', 'marginRight':'5px', 'marginLeft':'8px', 'height': '14px'}} />
          <span className="menu-item-text">
            Purchased
          </span>
        </div>
        <div onClick={this.selectSpecialFilterHandler.bind(this, 'Favorites')} className="favourites">
          <img src={Star} style={{'verticalAlign':'top', 'marginRight':'5px', 'marginLeft':'8px', 'height': '15px'}} />
          <span className="menu-item-text">
            Favorites
          </span>
        </div>
        <div onClick={this.selectSpecialFilterHandler.bind(this, 'Trash')}>
          <img src={DND} style={{'verticalAlign':'top', 'marginRight':'5px', 'marginLeft':'8px', 'height': '14px'}} />
          <span className="menu-item-text">
            Do not contact
          </span>
        </div>
        <div  onClick={this.selectSpecialFilterHandler.bind(this, 'Reported')} className="reported">
          <img src={Invalid} style={{'verticalAlign':'top', 'marginRight':'5px', 'marginLeft':'8px', 'height': '14px'}} />
          <span className="menu-item-text">
            Reported
          </span>
        </div>
        <div onClick={this.selectSpecialFilterHandler.bind(this, 'Outdated')} className="outdated">
          <img src={Outdated} style={{'verticalAlign':'top', 'marginRight':'5px', 'marginLeft':'8px', 'height': '14px'}} />
          <span className="menu-item-text">
            Outdated
          </span>
        </div>
      </ListWrapper>
    )
  }
}

List.propTypes = {
  addKeyword: PropTypes.func,
  category: PropTypes.string,
  activeSpecialFilter: PropTypes.string,
  removeKeyword: PropTypes.func,
  setSystemFilter: PropTypes.func,
};

export default List;
