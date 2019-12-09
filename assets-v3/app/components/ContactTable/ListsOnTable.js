/**
 *
 * ListsOnTable
 *
 */

import React, { PropTypes } from 'react';
import { Dropdown } from 'antd';
import Menu, { MenuItem, MenuItemGroup } from 'rc-menu';
import ListBlue from 'assets/icons/list-blue.png';
import _ from 'underscore';

class ListsOnTable extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props){
    super(props);

    this.state = {
      ddOpened: false
    }

    this.checkIfFavorite = this.checkIfFavorite.bind(this)
  }

  openLists(){
    if(this.props.obj.lists.length != 0){
      this.setState({
        ddOpened: !this.state.ddOpened
      })
    }
  }

  onHoverList(index, e){
    let elements = document.getElementsByClassName(index);
    for(var i=0, len=elements.length; i<len; i++)
    {
        elements[i].style.display = 'inline-flex';
    }
  }

  onMouseLeaveList(index, e){
    let elements = document.getElementsByClassName(index);
    for(var i=0, len=elements.length; i<len; i++)
    {
        elements[i].style.display = 'none';
    }
  }

  removeFromList(list, e){
    this.props.removeFromlbLists(
      [this.props.obj],
      this.props.category,
      [list],
      this.props.searchParams,
      this.props.selectAllLeads,
      this.props.total
    );
  }

  checkIfFavorite(list, index){
    if(list.name != 'favorite') {
      return (
        <div
          onMouseOver={this.onHoverList.bind(this, index)}
          onMouseLeave={this.onMouseLeaveList.bind(this, index)}
          onClick={this.removeFromList.bind(this, list)}
        >
          {list.name} <label className={index} style={{"display": "none"}}>x</label>
        </div>
      )
    }

    return null
  }

  render() {
    let obj = this.props.obj;
    let isFavorite = false;
    for(let x in obj.lists){
      if(obj.lists[x].name == 'favorite'){
        isFavorite = true;
      }
    }

    let menu = (
      <Menu>
        <MenuItem>
          <div className="listDD">
          {
            obj.lists.map((list, index) => (
              this.checkIfFavorite(list, index)               
            ))
          }
          </div>
        </MenuItem>
      </Menu>
    );


    return (
      <div>
        <Dropdown
          overlay={menu}
          placement="bottomLeft"
          trigger={['click']}
          disabled={obj.lists.length == 0}
        >
          <div>
            <img src={ListBlue} style={{height:"15px"}} />
            <div className="listlength">
              {
                isFavorite ? 
                obj.lists.length - 1
                :
                obj.lists.length
              }
            </div>
          </div>
        </Dropdown>
      </div>
    );

    
  }
}

ListsOnTable.propTypes = {
};

export default ListsOnTable;
