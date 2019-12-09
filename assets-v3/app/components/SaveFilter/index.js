/**
 *
 * SaveFilter
 *
 */

/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Input, Dropdown, Checkbox } from 'antd';
import Menu, { MenuItem, MenuItemGroup, Divider } from 'rc-menu';

import { SaveFilterWrapper, StyledButton } from './css';

class SaveFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      query: '',
      checkedSavedSearches: [],
      disabled: true,
    };
    this.search = _.debounce((event, target) => {
      this.props.updateSavedSearchParams('query', target.value);
    }, 500);
    this.refresh = _.debounce(() => {
      const { query } = this.state;
      this.props.updateSavedSearchParams('query', query);
    }, 500);
  }

  onSubmit = (e) => {
    const { savedSearches, category, createSavedSearch, searchParams, keywords } = this.props;
    const { filters } = searchParams;
    const { value } = e.target;
    e.preventDefault();
    if (value && savedSearches.length === 0) {
      createSavedSearch(value, category, filters, keywords);
      this.setState({ query: '' }, () => {
        this.refresh();
      });
    }
  };

  onSave = () => {
    const { savedSearches, category, createSavedSearch, searchParams, keywords, updateSavedSearch } = this.props;
    const { filters } = searchParams;
    const { query, checkedSavedSearches } = this.state;
    if (query && savedSearches.length === 0) {
      createSavedSearch(query, category, filters, keywords);
      this.setState({ query: '' }, () => {
        this.refresh();
      });
    } else if (keywords && checkedSavedSearches) {
      updateSavedSearch(checkedSavedSearches[0], filters, keywords);
      this.setState({ checkedSavedSearches: [] }, () => {
        this.refresh();
      });
    }
  };

  onSelectedSavedSearches = (e) => {
    this.setState({
      checkedSavedSearches: [...this.state.checkedSavedSearches, e.target.value.id],
    });
    if (e.target.checked) {
      this.setState({
        checkedSavedSearches: [e.target.value],
        disabled: false,
      });
    } else {
      this.setState({
        checkedSavedSearches: [],
        disabled: true,
      });
    }
  };

  onChange = (e) => {
    const { savedSearches } = this.props;
    this.setState({
      query: e.target.value,
      disabled: e.target.value.length === 0,
      checkedSavedSearches: savedSearches.length === 0 ? [] : this.state.checkedSavedSearches,
    });
    this.search(e, e.currentTarget);
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  setInitialState = () => {
    this.setState({
      query: '',
      disabled: true,
    });
  };

  render() {
    const { savedSearches, keywords } = this.props;
    let noListStyle = {
      'height': '70px',
      'width': 'fit-content',
      'margin': 'auto',
      'marginTop': '35px'
    }
    const menu = (
      <Menu style={{ width: 300, paddingBottom: 10 }}>
        <MenuItemGroup
          title="Save Filter"
          className="list-menu"
        >
          <MenuItem style={{ margin: '5px 0' }}>
            <Input
              className="search-keyword"
              placeholder={'Search or create a new filter'}
              onPressEnter={this.onSubmit}
              onChange={this.onChange}
              name="create-saved-search"
              value={this.state.query}
            />
          </MenuItem>
          {savedSearches.length === 0 &&
          this.state.query.length === 0 && (
            <MenuItem>
              <div style={noListStyle}>
                <span>You currently have no saved filter</span>
              </div>
            </MenuItem>
          )}
          {savedSearches.length === 0 &&
          this.state.query.length !== 0 && (
            <MenuItem>
              {`Hit enter to create ${this.state.query} filter`}
            </MenuItem>
          )}
          {savedSearches.map((savedSearch) => (
            <MenuItem className="list-items">
              <Checkbox
                value={savedSearch}
                onChange={this.onSelectedSavedSearches}
                checked={this.state.checkedSavedSearches.includes(savedSearch)}
                disabled={this.state.checkedSavedSearches.length !== 0 && !this.state.checkedSavedSearches.includes(savedSearch)}
              >
                {savedSearch.name}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuItemGroup>
        <Divider />
        <MenuItem style={{ margin: 4, textAlign: 'right' }}>
          <StyledButton
            onClick={this.onSave}
            disabled={this.state.disabled}
          >
            {
              this.state.checkedSavedSearches.length == 0 ?
              'Save'
              :
              'Update'
            }
          </StyledButton>
        </MenuItem>
      </Menu>
    );
    return (
      <SaveFilterWrapper>
        <Dropdown
          style={{ width: 300 }}
          overlay={menu}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
          onClick={this.setInitialState}
          placement="bottomLeft"
          disabled={keywords.length==0}
        >
          <StyledButton
            type="primary"
            disabled={keywords.length==0}
          >
            <i className="material-icons">save</i>
            Save Filter
          </StyledButton>
        </Dropdown>
      </SaveFilterWrapper>
    );
  }
}

SaveFilter.propTypes = {
  savedSearches: PropTypes.array,
  updateSavedSearchParams: PropTypes.func,
  category: PropTypes.string,
  createSavedSearch: PropTypes.func,
  searchParams: PropTypes.object,
  keywords: PropTypes.array,
  updateSavedSearch: PropTypes.func,
};

export default SaveFilter;
