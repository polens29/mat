/**
 *
 * ListFilter
 *
 */

/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { PropTypes } from 'react';
import { Input, Icon, Dropdown, Modal, Button } from 'antd';
import Menu, { MenuItem, MenuItemGroup, Divider } from 'rc-menu';

import { ListFilterWrapper } from './css';
import ListIcon from 'assets/icons/list.png';

class ListFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleModal: false,
      query: '',
    };
  }

  onSubmit = (e) => {
    const { category, createlbLists, lbLists } = this.props;
    const { value } = e.target;
    e.preventDefault();
    if (value && lbLists.length === 0) {
      createlbLists(value, category);
      this.setState({ query: '' });
      this.props.filterList('');
    }
  };

  onChange = (e) => {
    this.props.filterList(e.target.value);
    this.setState({
      query: e.target.value,
    });
  };

  onSelectetList = (lbList) => {
    this.props.clearKeyword(null);
    const selectedKeyword = {
      type: 'List',
      category: this.props.category,
      filters: 'list',
      name: lbList.name,
      id: lbList.id,
    };
    this.props.addKeyword(selectedKeyword);
    this.setState({
      visible: false
    })
  };

  onChangeListName = (e, lbList) => {
    const { target } = e;
    const name = target.innerText;
    if (e.keyCode === 13) {
      e.preventDefault();
      if (name.trim().length === 0) {
        e.preventDefault();
        target.innerText = lbList.name.trim();
        target.contentEditable = false;
      }
      e.preventDefault();
      target.innerText = target.innerText.trim();
      target.contentEditable = false;
    }
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  setInitialState = () => {
    this.setState({
      query: '',
    });
    this.props.filterList('');
    this.props.getlbLists(this.props.category);
  };

  showModal = () => {
    this.setState({
      visibleModal: true,
      visible: false,
      query: '',
    });
    this.props.showManageListsModal(true);
    this.props.filterList('');
  };

  handleOk = () => {
    this.setState({
      visibleModal: false,
    });
    this.props.showManageListsModal(false);
  };

  handleCancel = () => {
    this.setState({
      visibleModal: false,
    });
    this.props.showManageListsModal(false);
  };

  deleteListHandler = (lbList) => {
    this.props.deleteList(lbList);
  };

  copyListtHandler = (lbList, index) => {
    this.props.copyList(lbList, index);
  };

  editListtHandler = (lbList) => {
    const { id } = lbList;
    const listItem = document.getElementById(id);
    listItem.contentEditable = true;
    listItem.focus();
  };

  renameListHandler = (e, lbList, index) => {
    const { target } = e;
    const name = target.innerText.trim();
    if (name.length === 0) {
      target.innerText = lbList.name.trim();
    } else if (name !== lbList.name) {
      this.props.renameList(lbList, name.trim(), index);
    }
    target.contentEditable = false;
  };

  render() {
    const { lbLists } = this.props;

    const menuStyle = {
      minWidth: 320,
      paddingBottom: 10,
    };
    const menu = (
      <Menu style={menuStyle}>
        <MenuItemGroup
          title={`${this.props.category} Lists`}
          className="list-menu"
        >
          <MenuItem style={{ margin: '5px 0' }}>
            <Input
              className="search-keyword"
              placeholder={'Seach or create a new list'}
              onPressEnter={this.onSubmit}
              onChange={this.onChange}
              name="create-list"
              value={this.state.query}
            />
          </MenuItem>
          {lbLists.length === 0 &&
            this.state.query.length === 0 && (
              <MenuItem>
                <span>You currently have no lists</span>
                <br />
                <span>Type the list name and hit enter</span>
              </MenuItem>
            )}
          {lbLists.length === 0 &&
            this.state.query.length !== 0 && (
              <MenuItem>
                {`Hit enter to create ${this.state.query} list`}
              </MenuItem>
            )}
          {lbLists.map((lbList) => (
            <MenuItem className="list-items">
              <button
                className="select-list"
                onClick={() => this.onSelectetList(lbList)}
              >
                {lbList.name} ({lbList.total_leads})
              </button>
            </MenuItem>
          ))}
        </MenuItemGroup>
        <Divider />
        <MenuItem style={{ margin: 4 }}>
          <span onClick={this.showModal} style={{ color: '#1973AE' }}>
            Manage lists
          </span>
        </MenuItem>
      </Menu>
    );

    let disabled = lbLists.length == 0;
    return (
      <ListFilterWrapper>
        <Dropdown
          overlay={menu}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
          onClick={this.setInitialState}
          disabled={disabled}
          overlayClassName="list-dd"
        >
          <Button disabled={disabled} className="my-lists-btn" style={{'width':'82px'}}>
            <i className="material-icons">list</i>
            My lists
          </Button>
        </Dropdown>
        <Modal
          title="My lists"
          visible={this.props.listModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Input
            className="search-keyword"
            placeholder={'Seach list to apply'}
            onChange={this.onChange}
            name="create-list"
            value={this.state.query}
            style={{ marginBottom: 15 }}
          />
          <div style={{ height: 500, overflow: 'auto' }}>
            {lbLists.length === 0 &&
              this.state.query.length === 0 && (
                <p
                  style={{
                    margin: '0 auto',
                    width: '83%',
                    marginTop: '30%',
                  }}
                >
                  You currently have no lists. Type the list name and hit enter
                </p>
              )}
            {lbLists.length === 0 &&
              this.state.query.length !== 0 && (
                <p
                  style={{
                    margin: '0 auto',
                    width: '83%',
                    marginTop: '30%',
                  }}
                >{`Hit enter to create ${this.state.query} list`}</p>
              )}
            {lbLists.map((lbList, index) => (
              <div>
                <p
                  style={{
                    display: 'inline-block',
                    margin: 4,
                    minWidth: 150,
                  }}
                  id={lbList.id}
                  onBlur={(e) => this.renameListHandler(e, lbList, index)}
                  onKeyUp={(e) => this.onChangeListName(e, lbList)}
                >
                  {lbList.name}
                </p>
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
                    onClick={() => this.editListtHandler(lbList)}
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
                    onClick={() => this.copyListtHandler(lbList, index)}
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
                    onClick={() => this.deleteListHandler(lbList)}
                  >
                    delete
                  </i>
                </p>
                <p style={{ color: '#999999', fontSize: 11, marginLeft: 4 }}>
                  {lbList.total_leads.toLocaleString()} leads
                </p>
              </div>
            ))}
          </div>
        </Modal>
      </ListFilterWrapper>
    );
  }
}

ListFilter.propTypes = {
  addKeyword: PropTypes.func,
  category: PropTypes.string,
  createlbLists: PropTypes.func,
  filterList: PropTypes.func,
  clearKeyword: PropTypes.func,
  deleteList: PropTypes.func,
  copyList: PropTypes.func,
  renameList: PropTypes.func,
  lbLists: PropTypes.array,
  getlbLists: PropTypes.func,
};

export default ListFilter;
