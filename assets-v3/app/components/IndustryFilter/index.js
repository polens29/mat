/**
 *
 * IndustryFilter
 *
 */
/* eslint-disable no-underscore-dangle */
import React, { PropTypes } from 'react';
import {Icon, Dropdown, Tree, Input, Checkbox} from 'antd';
import Menu, { MenuItem } from 'rc-menu';
import { filterHierarchy, isMatch } from 'utils/helper';
import _ from 'lodash';

import styled from 'styled-components';
import { IndustryFilterWrapper } from './css';
import Industry from 'assets/icons/industry.png';

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

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

class IndustryFilter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData: [],
      list: [],
      expandedKeys: [],
      query: '',
      showPrimaryOnly: false,
    };

    this.handleShowPrimaryOnly = this.handleShowPrimaryOnly.bind(this);
  }

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
    // this.setState({ checkedKeys: checkedKeys.checked });
    this.props.clearKeyword('industry');
    this.props.clearKeyword('industries');
    const Undisclosed = {
      id: 'Undisclosed',
      name: 'Undisclosed',
      parent_id: null,
      type: 'industry',
    };

    checkedKeys.forEach((value) => {
      // checkedKeys.checked.forEach((value) => {
      const industryObject =
        value === 'Undisclosed'
          ? Undisclosed
          : _.find(this.props.industries, { id: value });
      const { type, id, name } = industryObject;
      const typeOfIndustry = {
        industry: { industry_code: id },
        sub_industry: { sub_industry_code: id },
      };
      const selectedKeyword = {
        type: 'Industry',
        category: this.props.category,
        filters: 'industry',
        name,
        id,
        industry_code: value === 'Undisclosed' ? {} : typeOfIndustry[type],
      };
      // not sure why it was previously here, so i'm leaving it here
      // incase something breaks. XD
      // if (selectedKeyword.industry_code.sub_industry_code) {
      // }
      if(this.state.showPrimaryOnly){
        if(!value.includes('-')){
          this.props.addKeyword(selectedKeyword);
        }
      }
      else {
        this.props.addKeyword(selectedKeyword);
      }
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
      expandedKeys: this.props.industries
        .filter(
          (t) => isMatch(t.name, e.target.value) && e.target.value.length > 0
        )
        .map((i) => i.parent_id),
    });
  };

  setInitialState = (fromChecked=false, e) => {

    const sortedList = _.orderBy(this.props.industries, ['name'], ['asc']);
    let aggregation = {};

    if (this.props.aggregations.industries) {
      aggregation = Object.assign(
        this.props.aggregations.industries.industries,
        this.props.aggregations.industries.sub_industries,
        {
          Undisclosed: this.props.aggregations.industries.__missing__,
        }
      );
    }

    this.setState({ query: '', expandedKeys: [] });
    if (aggregation.Undisclosed !== 0) {
      sortedList.push({
        id: 'Undisclosed',
        name: 'Undisclosed',
        parent_id: null,
        type: 'industry',
      });
    }

    const getChildren = (id, data) =>
      data.filter((industries) => industries.parent_id === id);

    const addChildren = (industries, data) => {
      const children = getChildren(industries.id, data)
        // exclude 0 value from lits seems to take a lot of time so commenting it out for now
        .map((child) => addChildren(child, data));

      if(fromChecked === true && !this.state.showPrimaryOnly) {
        return {
          title: `${industries.name} ${
            aggregation[industries.id]
              ? `(${aggregation[industries.id].toLocaleString()})`
              : ''
          }`,
          key: industries.id,
        };


      } else {

        if (children.length === 0) {
          return {
            title: `${industries.name} ${
              aggregation[industries.id]
                ? `(${aggregation[industries.id].toLocaleString()})`
                : ''
            }`,
            key: industries.id,
          };
        }

        return {
          title: `${industries.name} ${
            aggregation[industries.id]
              ? `(${aggregation[industries.id].toLocaleString()})`
              : ''
          }`,

          key: industries.id,
          children,
        };
      }
    };

    const list = getChildren(null, sortedList)
      /** I cant remeber what this filter is commenting it out for now */
      // .filter((t) => typeof aggregation[t.id] !== 'undefined')
      .map((industries) => addChildren(industries, sortedList));

    this.setState({ treeData: list, list });
    // check state from what keywords were selected before and match with selected checkbox
    this.setState({
      checkedKeys: this.props.keywords
        .filter((t) => t.type === 'Industry')
        .map((t) => t.id),
    });
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  handleShowPrimaryOnly(e){
    this.setState({
      showPrimaryOnly: e.target.checked
    });

    this.setInitialState(true);
  }

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
    const menu = (
      <Menu style={menuStyle}>
        <MenuItem>
          <span style={{ float: 'right', textAlign: 'right' }}>
            Show Primary Industry Only <Checkbox
            onChange={this.handleShowPrimaryOnly} />
          </span>
        </MenuItem>
        <MenuItem>
          <Search
            style={{ margin: '8px 0' }}
            autoFocus
            placeholder="Search"
            onChange={this.onChange}
            value={this.state.query}
          />
          <Tree
            checkable
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
      </Menu>
    );
    return (
      <IndustryFilterWrapper>
        <Dropdown
          style={{ width: 300 }}
          overlay={menu}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
          onClick={this.setInitialState}
        >
          <span>
            <img src={Industry} style={{'verticalAlign':'top', 'marginRight':'5px', 'height': '18px'}} />
            Industry
            <Icon type="down" />
            <br />
            <Spacer />
          </span>
        </Dropdown>
      </IndustryFilterWrapper>
    );
  }
}

IndustryFilter.propTypes = {
  addKeyword: PropTypes.func,
  clearKeyword: PropTypes.func,
  category: PropTypes.string,
  keywords: PropTypes.array,
  aggregations: PropTypes.object,
  industries: PropTypes.array,
};

export default IndustryFilter;
