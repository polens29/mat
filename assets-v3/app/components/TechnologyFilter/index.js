/**
 *
 * LocationFilter
 *
 */

import React, { PropTypes } from 'react';
import { Icon, Dropdown, Tree, Input, Badge } from 'antd';
import Menu, { MenuItem } from 'rc-menu';
import { filterHierarchy, isMatch } from 'utils/helper';
import _ from 'lodash';

import styled from 'styled-components';
import { LocationFilterWrapper, TechnologyFilterWrapperSafari } from './css';
import TechIcon from 'assets/icons/technology.png';
import { determineBrowser } from 'utils/helper';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const BetaSign = styled.span`
    color: red !important;
`;

class TechnologyFilter extends React.Component {
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
      query: '',
    };
  }

  componentWillMount(){
    this.setInitialState()
  }

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
    // this.setState({ checkedKeys: checkedKeys.checked });
    this.props.clearKeyword('technologies');
    checkedKeys.forEach((value) => {
      // checkedKeys.checked.forEach((value) => {
      const techlogyObject = _.find(this.props.technologies, { id: value });
      const { type, id, name } = techlogyObject;
      const typeOfLocation = {
        primary: { primary_id: Number(id.split('-')[1]) },
        secondary: { secondary_id: Number(id.split('-')[1]) },
      };
      const selectedKeyword = {
        type: 'Technologies',
        category: this.props.category,
        filters: 'technologies',
        name,
        id,
        code: typeOfLocation[type],
      };
      // not sure why it was previously here, so i'm leaving it here
      // incase something breaks. XD
      // if (selectedKeyword.id.includes('secondary')) {
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
      expandedKeys: this.props.technologies
        .filter(
          (t) => isMatch(t.name, e.target.value) && e.target.value.length > 0
        )
        .map((i) => i.parent_id),
    });
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  setInitialState = () => {
    this.setState({ query: '', expandedKeys: [] });

    const list = this.props.technologiesHierarchy;

    // set selected checkbox base on the keyword state where type is location
    this.setState({
      checkedKeys: this.props.keywords
        .filter((t) => t.type === 'Technologies')
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
    return (
      <LocationFilterWrapper>
        <div style={{'display':'grid'}}>
          <label>Technologies <BetaSign>Beta</BetaSign></label>
          <Search
            style={{ margin: '0' }}
            placeholder="Search for web technology used by the organization"
            onChange={this.onChange}
            value={this.state.query}
            ref={(input) => {
              this.filterQuery = input;
            }}
          />
        </div>
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
      </LocationFilterWrapper>
    );
  }
}

TechnologyFilter.propTypes = {
  addKeyword: PropTypes.func,
  clearKeyword: PropTypes.func,
  category: PropTypes.string,
  keywords: PropTypes.array,
  technologies: PropTypes.array,
  technologiesHierarchy: PropTypes.array,
};

export default TechnologyFilter;
