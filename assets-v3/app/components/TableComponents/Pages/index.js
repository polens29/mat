/**
 *
 * Pagination
 *
 */

import React, { PropTypes } from 'react';
import ColumnModal from 'components/TableComponents/ColumnModal';
import {
  contactColumns,
  companyColumns,
} from 'components/TableComponents/ColumnModal/constants';
import {
  getPageRangeStart,
  getPageRangeEnd,
  pageRangeDisplay,
} from 'utils/helper';


import { Pagination, Tooltip, Button, Modal } from 'antd';

import { Wrapper, ApplyBtn } from './css';

const pageSize = 50;

class Pages extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      edited: false
    }
    let checkedList = this.props.displayColumns[this.props.category];
    const tableColumns =
      this.props.category === 'Contact' ? contactColumns : companyColumns;
    this.state = {
      category: this.props.category,
      visible: false,
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < tableColumns.length,
      checkAll: checkedList.length === tableColumns.length,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      checkedList: nextProps.displayColumns[this.props.category]
    })
  }

  onChangePage = (page) => {
    const { updateSearchParams } = this.props;
    updateSearchParams('page', page);
  };

  onCheck = (checkedList) => {
    const tableColumns =
      this.props.category === 'Contact' ? contactColumns : companyColumns;
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < tableColumns.length,
      checkAll: checkedList.length === tableColumns.length,
    });
  };

  checkedListByCategory(tableColumns, category) {
    if (category === 'Contact') {
      return tableColumns.filter((column) => column.value != 'social').map((column) => column.value);
    }
    return tableColumns.map((column) => column.value)
  };

  onCheckAllChange = (e) => {
    const tableColumns =
      this.props.category === 'Contact' ? contactColumns : companyColumns;
    this.setState({
      checkedList: e.target.checked
        ? this.checkedListByCategory(tableColumns, this.props.category)
        : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  handleOk = (category, columns) => {
    this.setState({
      visible: false,
      checkedList: columns,
      edited: true
    },
    function() { this.props.setColumnDisplay(category, columns, true, this.props.userProfile.email) }
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      checkedList: this.props.displayColumns[this.props.category],
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { total, searchParams, loading, category } = this.props;
    const { checkedList, indeterminate, checkAll } = this.state;

    if (loading) {
      return null;
    }

    if (this.state.category !== category) {
      this.setState({
        category,
        checkedList: this.props.displayColumns[category],
      });
    }

    const tableColumns =
      category === 'Contact' ? contactColumns : companyColumns;

    const pageRangeStart = getPageRangeStart(searchParams.page, pageSize);
    const pageRangeEnd = getPageRangeEnd(searchParams.page, pageSize, total);

    return (
      <Wrapper>

        <Tooltip placement="top" title="Add/Edit columns">
          <Button className="column-button" onClick={this.showModal}>
            <i className="material-icons">view_column</i>
            <label>Columns</label>
          </Button>
        </Tooltip>
      {/*
        <div className="inline" style={{ verticalAlign: 'super' }}>
          <span
            style={{
              lineHeight: '17px',
              fontSize: '13px',
              position: 'relative',
              top: -2,
            }}
          >
            {pageRangeDisplay(total, pageRangeStart, pageRangeEnd)}
          </span>
        </div>
        <div className="inline-flex" style={{ verticalAlign: 'super' }}>
          <Pagination
            simple
            size={'large'}
            pageSize={pageSize}
            total={total}
            defaultCurrent={total > 0 ? searchParams.page : 0}
            onChange={this.onChangePage}
          />
        </div>
      */}
        <Modal
          title={`${category} Columns`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          wrapClassName="pa-modal-display"
          footer={null}
        >
          <ColumnModal
            category={category}
            tableColumns={tableColumns}
            checkedList={checkedList}
            indeterminate={indeterminate}
            checkAll={checkAll}
            onCheck={this.onCheck}
            onCheckAllChange={this.onCheckAllChange}
            type="column-picker"

          />
          <div style={{ textAlign: 'center' }}>
            <ApplyBtn
              className="apply-changes-btn"
              onClick={() => this.handleOk(category, checkedList)}
            >
              Apply Changes
            </ApplyBtn>
          </div>
        </Modal>
      </Wrapper>
    );
  }
}

Pages.propTypes = {
  updateSearchParams: PropTypes.func,
  setColumnDisplay: PropTypes.func,
  searchParams: PropTypes.object,
  total: PropTypes.number,
  loading: PropTypes.bool,
  category: PropTypes.string,
  displayColumns: PropTypes.array,
  keywords: PropTypes.array,
  addKeyword: PropTypes.func,
  removeKeyword: PropTypes.func,
  clearKeyword: PropTypes.func,
  specialFilter: PropTypes.func,
  activeSpecialFilter: PropTypes.func,
  setSystemFilter: PropTypes.func,
};

export default Pages;
