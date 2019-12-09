/**
 *
 * LocationFilter
 *
 */

import React, { PropTypes } from 'react';
import { Icon, Dropdown, Tree, Input, Checkbox } from 'antd';
import Menu, { MenuItem, MenuItemGroup } from 'rc-menu';
import { filterHierarchy, isMatch } from 'utils/helper';
import _ from 'lodash';

import styled from 'styled-components';
import { LocationFilterWrapper } from './css';
import Location from 'assets/icons/location.png';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const Spacer = styled.p`
  display: block:
  width: 100%;
  color: red;
  padding: 0px 3px 0px 3px;
  float: right;
  font-size: 9px;
  text-align: right;
  margin-top: -4px;
  margin-left: -2px;
`;


class LocationFilter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      autoExpandParent: true,
      expandedKeys: [],
      checkedKeys: [],
      selectedKeys: [],
      treeData: [],
      list: [],
      checkedRegionIds: [],
      query: '',
    };
  }

  onCheck = (checkedKeys) => {
    // this.setState({ checkedKeys });
    this.setState({ checkedKeys: checkedKeys.checked });
    this.props.clearKeyword('locations');
    const Undisclosed = {
      id: 'Undisclosed',
      name: 'Undisclosed',
      parent_id: null,
      type: 'region',
    };
    checkedKeys.checked.forEach((value) => {
      const locationObject =
        value === 'Undisclosed'
          ? Undisclosed
          : _.find(this.props.locations, {
            id: value,
          });
      const { type, id, name } = locationObject;
      const typeOfLocation = {
        region: { region_code: id },
        country: { country_code: id },
        city: { city_code: id },
        state: { state_code: id },
      };
      const selectedKeyword = {
        type: 'Location',
        category: this.props.category,
        filters: 'locations',
        name,
        id,
        code: value === 'Undisclosed' ? {} : typeOfLocation[type],
      };
      // not sure why it was previously here, so i'm leaving it here
      // incase something breaks. XD
      // if (selectedKeyword.code.country_code) {
      this.props.addKeyword(selectedKeyword);
      // }
    });
  };

  onExpand = (expandedKeys) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = (e) => {
    this.setState({ query: e.target.value });
    const newList = filterHierarchy({
      items: this.state.list,
      query: e.target.value.toLowerCase(),
    });

    this.setState({
      treeData: newList,
      expandedKeys: this.props.locations
        .filter(
          (t) => isMatch(t.name, e.target.value) && e.target.value.length > 0
        )
        .map((i) => i.parent_id),
    });
  };

  onSelectedRegion = (e) => {
    this.setState({
      checkedRegionIds: [...this.state.checkedRegionIds, e.target.value.id],
    });
    const { name, id } = e.target.value;
    const selectedKeyword = {
      type: 'Region',
      category: this.props.category,
      filters: 'business_regions',
      mode: 'Contact',
      name,
      id,
    };
    if (e.target.checked) {
      this.props.addKeyword(selectedKeyword);
    } else {
      this.setState({
        checkedRegionIds: this.state.checkedRegionIds.filter(
          (t) => t !== e.target.value.id
        ),
      });
      this.props.removeKeyword(selectedKeyword);
    }
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  setInitialState = () => {
    this.setState({
      query: '',
      expandedKeys: [],
      checkedRegionIds: this.props.keywords
        .filter((t) => t.type === 'Region')
        .map((t) => t.id),
    });

    const list = this.props.locationsHierarchy;

    // set selected checkbox base on the keyword state where type is location
    this.setState({
      checkedKeys: this.props.keywords
        .filter((t) => t.type === 'Location')
        .map((t) => t.id),
    });
    // add the list aggregation for countries
    this.setState({
      treeData: list,
      list,
    });
  };

  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            className={item.hide ? 'hide' : null}
            title={item.title}
            key={item.key}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode className={item.hide ? 'hide' : null} {...item} />;
    });

  render() {
    const menuStyle = {
      minWidth: 320,
      maxHeight: 400,
      overflow: 'auto',
      paddingBottom: 10,
    };

    const aggregations = this.props.aggregations.seniority || {};

    const menu = (
      <Menu style={menuStyle}>
        <MenuItem className="location-component">
          <Search
            style={{ margin: '8px 0' }}
            placeholder="Search"
            onChange={this.onChange}
            value={this.state.query}
            ref={(input) => {
              this.filterQuery = input;
            }}
          />
          <Tree
            checkable
            checkStrictly
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(this.state.treeData)}
          </Tree>
        </MenuItem>
        <MenuItemGroup title="Regions">
          {this.props.regions.map((t) => (
            <MenuItem className="list-items">
              <Checkbox
                value={t}
                onChange={this.onSelectedRegion}
                checked={this.state.checkedRegionIds.includes(t.id)}
              >
                {t.name}
                {aggregations && typeof aggregations[t.id] === 'undefined'
                  ? ''
                  : ` (${aggregations[t.id].toLocaleString()})`}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuItemGroup>
      </Menu>
    );
    return (
      <LocationFilterWrapper>
        <Dropdown
          style={{ width: 300 }}
          overlay={menu}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
          onClick={this.setInitialState}
        >
          <span style={{ height: 50 }}>
            <i className="material-icons">room</i>
            Location
            <Icon type="down" />
            <br />
            <Spacer />
          </span>
        </Dropdown>
      </LocationFilterWrapper>
    );
  }
}

LocationFilter.propTypes = {
  addKeyword: PropTypes.func,
  removeKeyword: PropTypes.func,
  clearKeyword: PropTypes.func,
  category: PropTypes.string,
  keywords: PropTypes.array,
  locations: PropTypes.array,
  regions: PropTypes.array,
  locationsHierarchy: PropTypes.array,
  aggregations: PropTypes.object,
};

export default LocationFilter;
