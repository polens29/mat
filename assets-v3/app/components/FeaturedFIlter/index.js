/**
 *
 * JobTitleFilter
 *
 */

import React, { PropTypes } from 'react';
import { Icon, Dropdown, Checkbox, Badge } from 'antd';
import Menu, { MenuItem, MenuItemGroup } from 'rc-menu';
import styled from 'styled-components';
import { FeaturedFilterWrapper, FeaturedFilterWrapperSafari } from './css';
import FeatIcon from 'assets/icons/featured.png';
import { determineBrowser } from 'utils/helper';

const BetaSign = styled.div`
  font-size: 9px;
  position: absolute;
  color: red;
  right: 0;
  margin-top: -5px;
  margin-bottom: 0px !important;
`;

const BetaSignSafari = styled.div`
  font-size: 9px;
  position: absolute;
  color: red;
  right: 0;
  margin-top: -5px;
  margin-bottom: 0px !important;
`;

class FeaturedFilter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      checkedKeysId: [],
    };
  }

  onSelectetList = (e) => {
    this.setState({
      checkedKeysId: [...this.state.checkedKeysId, e.target.value.id],
    });
    const { name, id } = e.target.value;
    const selectedKeyword = {
      type: 'Featured',
      category: this.props.category,
      filters: 'popular_list',
      name,
      id,
    };
    if (e.target.checked) {
      this.props.addKeyword(selectedKeyword);
    } else {
      this.setState({
        checkedKeysId: this.state.checkedKeysId.filter(
          (t) => t !== e.target.value.id
        ),
      });
      this.props.removeKeyword(selectedKeyword);
    }
  };

  setInitialState = () => {
    this.setState({
      checkedKeysId: this.props.keywords
        .filter((t) => t.type === 'Featured')
        .map((t) => t.id),
    });
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  render() {
    const aggregations = this.props.aggregations.popular_list || {};
    const filteredList =
      typeof this.props.popularList.popular_lists !== 'undefined'
        ? this.props.popularList.popular_lists
        : [];
    const menuStyle = {
      maxHeight: 400,
      overflow: 'auto',
      paddingBottom: 10,
    };
    let menu = (
      <Menu style={menuStyle}>
        {typeof this.props.popularList.popular_list_groups !== 'undefined' &&
          this.props.popularList.popular_list_groups.map((list) => {
            const filteredGroupList = list.lists.map((t) =>
              filteredList.find((item) => item.id === t)
            );
            // .filter(Boolean); // filter Boolean returns all true value, need to remove undefined values

            // if (filteredGroupList.length === 0) {
            //   return '';
            // }
            return (
              <MenuItemGroup title={list.name}>
                {filteredGroupList.map((value) => (
                  <MenuItem className="list-items">
                    <Checkbox
                      value={value}
                      onChange={this.onSelectetList}
                      checked={this.state.checkedKeysId.includes(value.id)}
                    >
                      {value.name}
                      {aggregations &&
                      typeof aggregations[value.id] !== 'undefined' &&
                      aggregations[value.id] !== 0
                        ? ` (${aggregations[value.id].toLocaleString()})`
                        : ''}
                    </Checkbox>
                  </MenuItem>
                ))}
              </MenuItemGroup>
            );
          })}
      </Menu>
    );
    // empty view
    if (filteredList.length === 0) {
      menu = (
        <Menu>
          <MenuItemGroup title="Featured">
            <MenuItem>
              <p>No list available.</p>
            </MenuItem>
          </MenuItemGroup>
        </Menu>
      );
    }

    let browser = determineBrowser();

    let Wrapper = FeaturedFilterWrapper;
    if(browser=='safari'){
      Wrapper = FeaturedFilterWrapperSafari;
    }

    return (
      <Wrapper>
        <Dropdown
          overlay={menu}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          onClick={this.setInitialState}
          visible={this.state.visible}
        >
          <span>
            <img src={FeatIcon} style={{'verticalAlign':'middle', 'marginRight':'5px', 'height': '18px'}} />
            Featured
            <Icon type="down" />  
          </span>

        </Dropdown>
      </Wrapper>
    );
  }
}

FeaturedFilter.propTypes = {
  addKeyword: PropTypes.func,
  removeKeyword: PropTypes.func,
  category: PropTypes.string,
  popularList: PropTypes.array,
  keywords: PropTypes.array,
  aggregations: PropTypes.object,
};

export default FeaturedFilter;
