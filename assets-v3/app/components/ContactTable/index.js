/**
 *
 * ContactTable
 *
 */

import React, { PropTypes } from 'react';
import { message, Table } from 'antd';
import { toLocaleValue } from 'utils/helper';
import styled from 'styled-components';

import { TableWrapper } from './css';

export const StyledTableWrapper = styled(TableWrapper)`
  
  .deliver{
    font-size:12px;
    top:2px !important;
    left:0px !important;
    position: relative !important;
  }

  
`;



class ContactTable extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  onChangeRoute = (route) => {
    const {
      searchParams,
      category,
      keywords,
      activeSpecialFilter,
    } = this.props;
    const { router } = this.context;
    router.push({
      pathname: router.location.pathname,
      state: { searchParams, category, keywords, activeSpecialFilter },
    });
    router.push({
      pathname: route,
    });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length) {
      message.info(
        `Selected ${selectedRows.length} lead${
          selectedRows.length > 1 ? 's' : ''
        }`,
        1.5
      );
    }
    this.props.selectedRows = selectedRows;
    this.props.updateSelectedRows(selectedRowKeys, selectedRows);
  };

  handleAddition = (tag) => {
    if (!tag) {
      return;
    }
    const tagType = tag.type || 'and_keywords';
    let selectedKeyword = {
      category: this.props.category,
      filters: tagType,
      name: tag.name,
      mode: '',
    };

    // Case when no suggestion is selected
    if (tagType === 'and_keywords') {
      selectedKeyword = {
        type: 'Keyword',
        ...selectedKeyword,
      };
    }

    // if (tagType === 'department') {
    //   selectedKeyword = {
    //     type: 'Contact',
    //     id: tag.leadbook_id,
    //     ...selectedKeyword,
    //     mode: 'Contact',
    //   };
    // }

    if (tagType === 'employee_size') {
      selectedKeyword = {
        type: 'Employee Size',
        code: tag.value.code,
        id: Object.values(tag.value)[0],
        ...selectedKeyword,
      };
    }

    // Case when job_title suggestion is selected
    if (tagType === 'job_title') {
      selectedKeyword = {
        type: 'JOB',
        ...selectedKeyword,
        mode: 'Contact',
      };
    }

    // Case when location suggestion is selected
    if (tagType === 'location') {
      selectedKeyword.filters = 'locations';
      selectedKeyword = {
        type: 'Location',
        code: tag.value,
        id: Object.values(tag.value)[0].toString(),
        ...selectedKeyword,
      };
    }

    // Case when industry suggestion is selected
    if (tagType === 'industry') {
      selectedKeyword = {
        type: 'Industry',
        industry_code: tag.value,
        id: Object.values(tag.value)[0],
        ...selectedKeyword,
      };
    }

    if (tagType === 'technologies') {
      selectedKeyword = {
        type: 'Technologies',
        code: tag.value,
        id: `primary-${Object.values(tag.value)[0]}`,
        ...selectedKeyword,
      };
    }

    // Case when company name suggestion is selected
    if (tagType === 'company_name') {
      selectedKeyword = {
        type: 'Company',
        id: tag.leadbook_id,
        ...selectedKeyword,
      };
    }

    // Case when contact name suggestion is selected
    if (tagType === 'contact_name') {
      selectedKeyword = {
        type: 'Contact',
        id: tag.leadbook_id,
        ...selectedKeyword,
        mode: 'Contact',
      };
    }

    // Case when tag suggestion is selected
    if (tagType === 'tag') {
      selectedKeyword = {
        type: 'Tag',
        ...selectedKeyword,
      };
    }
    this.props.addKeyword(selectedKeyword);
  };

  updateDimensions = () => {
    const w = window;
    const d = document;
    const documentElement = d.documentElement;
    const body = d.getElementsByTagName('body')[0];
    const height =
      w.innerHeight || documentElement.clientHeight || body.clientHeight;

    this.setState({ height });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { updateSearchParams } = this.props;

    if (!Object.prototype.hasOwnProperty.call(sorter, 'order')) {
      updateSearchParams('order_by', '');
      return;
    }

    const { order } = sorter;
    const { sortKey } = sorter.column;

    if (order === 'descend') {
      updateSearchParams('order_by', `-${sortKey}`);
      return;
    }
    updateSearchParams('order_by', sortKey);
  };

  rowClassName = (contact) => contact.status === 'expired' && 'expired-row';

  render() {
    const {
      list,
      loading,
      category,
      selectedRowKeys,
      tableColumns,
      total,
      selectAllLeadFunc,
      selectAllLeads,
      keywords,
    } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      fixed: false,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'all-data',
          text: selectAllLeads
            ? `Deselect All ${toLocaleValue(total)} ${category}s`
            : `Select All ${toLocaleValue(total)} ${category}s`,
          onSelect: () => {
            if (selectAllLeads) {
              message.info(`Deselected All ${total} ${category}s`, 2);
              return selectAllLeadFunc(false);
            }
            message.info(`Selected All ${total} ${category}s`, 2);
            this.props.updateSelectedRows([...list.keys()], list);
            return selectAllLeadFunc(true);
          },
        },
      ],
    };
    const cols = tableColumns(this.props, this.onChangeRoute);
    const width = cols.reduce((accu, col) => accu + col.width, 50);

    return (
      <StyledTableWrapper>
        <Table
          bordered
          loading={loading}
          rowSelection={rowSelection}
          rowClassName={this.rowClassName}
          columns={tableColumns(
            this.props,
            this.onChangeRoute,
            this.handleAddition
          )}
          dataSource={list}
          pagination={false}
          scroll={{
            x: width,
            y: this.state.height - (keywords.length > 5 ? 255 : 235),
          }}
          onChange={this.handleTableChange}
          locale={{
            emptyText: `No ${category.toLowerCase()}s found.`,
            filterConfirm: 'Ok',
            filterReset: 'Cancel',
            filterTitle: 'Options',
          }}
        />
      </StyledTableWrapper>
    );
  }
}

ContactTable.propTypes = {
  activeSpecialFilter: PropTypes.string,
  updateSearchParams: PropTypes.func,
  updateSelectedRows: PropTypes.func,
  tableColumns: PropTypes.func,
  addKeyword: PropTypes.func,
  list: PropTypes.array,
  selectedRowKeys: PropTypes.array,
  keywords: PropTypes.array,
  loading: PropTypes.bool,
  category: PropTypes.string,
  searchParams: PropTypes.object,
  total: PropTypes.number,
  selectAllLeadFunc: PropTypes.func,
  selectAllLeads: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool,
  ]),
  handleShowListDropDown: PropTypes.func,
  selectedRows: PropTypes.array,
};

export default ContactTable;
