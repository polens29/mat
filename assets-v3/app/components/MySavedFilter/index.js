/**
 *
 * MySavedFilter
 *
 */

/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Input, Icon, Dropdown, Modal, Row, Col } from 'antd';
import Menu, { MenuItem, MenuItemGroup, Divider } from 'rc-menu';
import SaveIcon from 'assets/icons/save.png';

import { MySavedFilterWrapper, StyledButton } from './css';

class MySavedFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleModal: false,
      query: '',
    };
    this.search = _.debounce((event, target) => {
      this.props.updateSavedSearchParams('query', target.value);
    }, 500);
  }

  onSubmit = (e) => {
    const { savedSearches } = this.props;
    const { value } = e.target;
    e.preventDefault();
    if (value && savedSearches.length === 0) {
      this.setState({ query: '' });
    }
  };

  onSelectedSavedSearches = (savedSearch) => {
    this.props.clearKeyword(null);
    const { id, filters, metadata } = savedSearch;
    const { keywords } = metadata;
    const selectedKeyword = {
      type: 'savedSearch',
      category: this.props.category,
      filters: 'savedFilter',
      keywords,
      id,
      filtersValue: filters,
    };
    this.props.addKeyword(selectedKeyword);
  };

  onChangeSavedSearchName = (e, savedSearch) => {
    const { target } = e;
    const name = target.innerText;
    if (e.keyCode === 13) {
      e.preventDefault();
      if (name.trim().length === 0) {
        e.preventDefault();
        target.innerText = savedSearch.name.trim();
        target.contentEditable = false;
      }
      e.preventDefault();
      target.innerText = target.innerText.trim();
      target.contentEditable = false;
    }
  };

  onChange = (e) => {
    this.setState({
      query: e.target.value,
    });
    this.search(e, e.currentTarget);
  };


  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  setInitialState = () => {
    this.setState({
      query: '',
    });
  };

  showModal = () => {
    this.setState({
      visibleModal: true,
      visible: false,
      query: '',
    });
  };

  handleOk = () => {
    this.setState({
      visibleModal: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visibleModal: false,
    });
  };

  deleteSavedSearchHandler = (savedSearch) => {
    this.props.deleteSavedSearch(savedSearch);
  };

  copySavedSearchHandler = (savedSearch, index) => {
    this.props.copySavedSearch(savedSearch, index);
  };

  editSavedSearchHandler = (savedSearch) => {
    const { id } = savedSearch;
    const listItem = document.getElementById(id);
    listItem.contentEditable = true;
    listItem.focus();
  };

  renameSavedSearchHandler = (e, savedSearch, index) => {
    const { target } = e;
    const name = target.innerText.trim();
    if (name.length === 0) {
      target.innerText = savedSearch.name.trim();
    } else if (name !== savedSearch.name) {
      this.props.renameSavedSearch(savedSearch, name.trim(), index);
    }
    target.contentEditable = false;
  };

  render() {
    const { savedSearches } = this.props;

    const menuStyle = {
      minWidth: 320,
      paddingBottom: 10,
    };
    let noListStyle = {
      'height': '70px',
      'width': 'fit-content',
      'margin': 'auto',
      'marginTop': '35px'
    }

    const menu = (
      <Menu style={menuStyle}>
        <MenuItemGroup
          title="My saved filters"
          className="list-menu"
        >
          <MenuItem style={{ margin: '5px 0' }}>
            <Input
              className="search-keyword"
              placeholder={'Search or update your filter'}
              onPressEnter={this.onSubmit}
              onChange={this.onChange}
              name="create-list"
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
              <button
                className="select-list"
                onClick={() => this.onSelectedSavedSearches(savedSearch)}
              >
                {savedSearch.name}
              </button>
            </MenuItem>
          ))}
        </MenuItemGroup>
        <Divider />
        <MenuItem style={{ margin: 4 }}>
           <span onClick={this.showModal} style={{ color: '#1973AE' }}>
             Manage filters
           </span>
        </MenuItem>
      </Menu>
    );
    return (
      <MySavedFilterWrapper>
        <Dropdown
          overlay={menu}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
          onClick={this.setInitialState}
          disabled={this.props.savedSearches.length == 0}
        >
          <StyledButton
            type="primary"
            disabled={this.props.savedSearches.length == 0}
          >
            <i className="material-icons">filter_list</i>
            My Filters
          </StyledButton>
        </Dropdown>
        <Modal
          title="My Search Filters"
          visible={this.state.visibleModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Input
            className="search-keyword"
            placeholder={'Search or update your filter'}
            onPressEnter={this.onSubmit}
            onChange={this.onChange}
            name="create-list"
            value={this.state.query}
            style={{ marginBottom: 15 }}
          />
          <div style={{ height: 500, overflow: 'auto' }}>
            {savedSearches.length === 0 &&
              this.state.query.length === 0 && (
                <p
                  style={{
                    margin: '0 auto',
                    width: '83%',
                    marginTop: '30%',
                  }}
                >
                  You currently have no saved filter. Type the name and hit enter
                </p>
              )}
            {savedSearches.length === 0 &&
              this.state.query.length !== 0 && (
                <p
                  style={{
                    margin: '0 auto',
                    width: '83%',
                    marginTop: '30%',
                  }}
                >{`Hit enter to create ${this.state.query} filter`}</p>
              )}
            {savedSearches.map((savedSearch, index) => (
              <div>
                <Row>
                  <Col span={18}>
                    <p
                      style={{
                        display: 'inline-block',
                        margin: 4,
                        minWidth: 150,
                      }}
                      id={savedSearch.id}
                      onBlur={(e) => this.renameSavedSearchHandler(e, savedSearch, index)}
                      onKeyUp={(e) => this.onChangeSavedSearchName(e, savedSearch)}
                    >
                      {savedSearch.name}
                    </p>
                  </Col>
                  <Col span={6}>
                    <p
                      style={{
                        display: 'inline-block',
                        float: 'right',
                        marginRight: 7,
                        marginTop: 4,
                      }}
                    >
                      <i
                        className="material-icons"
                        style={{
                          fontSize: 16,
                          color: '#999999',
                          marginRight: 3,
                          cursor: 'pointer',
                        }}
                        onClick={() => this.editSavedSearchHandler(savedSearch)}
                      >
                        mode_edit
                      </i>
                      <i
                        className="material-icons"
                        style={{
                          fontSize: 16,
                          color: '#999999',
                          marginRight: 3,
                          cursor: 'pointer',
                        }}
                        onClick={() => this.copySavedSearchHandler(savedSearch, index)}
                      >
                        content_copy
                      </i>
                      <i
                        className="material-icons"
                        style={{
                          fontSize: 16,
                          color: '#999999',
                          marginRight: 3,
                          cursor: 'pointer',
                        }}
                        onClick={() => this.deleteSavedSearchHandler(savedSearch)}
                      >
                        delete
                      </i>
                    </p>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </Modal>
      </MySavedFilterWrapper>
    );
  }
}

MySavedFilter.propTypes = {
  savedSearches: PropTypes.array,
  updateSavedSearchParams: PropTypes.func,
  category: PropTypes.string,
  addKeyword: PropTypes.func,
  renameSavedSearch: PropTypes.func,
  deleteSavedSearch: PropTypes.func,
  copySavedSearch: PropTypes.func,
  clearKeyword: PropTypes.func,
};

export default MySavedFilter;
