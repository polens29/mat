/**
 *
 * UserProfile
 *
 */
/* eslint-disable camelcase, jsx-a11y/href-no-hash, jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import {
  Drawer, Select, Table, Pagination, Icon
} from 'antd';

import { Wrapper, WrapperBalance, WrapperContent } from './css';
import { creditsUsageColumns } from './constants'

const Option = Select.Option;

class CreditsUsage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      creditsUsageByUser: [],
      creditsUsageByUserPage: [],
      index: 0,
      page: 0,
      creditsUsageModal: false,
    };
  }

  componentWillMount() {
    this.props.getCreditsUsage();
  }

  componentWillReceiveProps(props) {
    this.checkCreditsUsage(props);
    this.checkCreditsUsageModal(props);
  }

  checkCreditsUsage(props) {
    const newCreditsUsage = props.creditsUsage;
    const { index } = this.state;
    if (newCreditsUsage.length !== 0) {
      this.setState({
        creditsUsageByUser: newCreditsUsage[index].credits_usage,
        page: 1,
      }, () => {
        this.handlePageChange(this.state.page);
      });
    }
  };

  checkCreditsUsageModal(nextProps) {
    if(nextProps.creditsUsageModal != undefined && nextProps.creditsUsageModal != this.state.creditsUsageModal){
      this.setState({creditsUsageModal: nextProps.creditsUsageModal});
    }
  }

  handleClose = () => {
    this.props.closeCreditsUsageModal();
  };

  handleUserNameChange = (index) => {
    this.setState({
      creditsUsageByUser: this.props.creditsUsage[index].credits_usage,
      index,
      page: 1,
    }, () => {
      this.handlePageChange(this.state.page);
    });
  };

  handlePageChange = (current) => {
    const pageSize = 8 ;
    const { creditsUsageByUser } = this.state;
     const total = creditsUsageByUser.length;
     const totalPage = total / pageSize;
     const start = total - (totalPage - current + 1) * pageSize;
     let end = start + pageSize;
     if (end > total) {
       end = total;
     }
     const creditsUsageByUserPage = creditsUsageByUser.slice(start, end);
     this.setState({
      creditsUsageByUserPage,
      page: current,
    });
  };

  creditsUsageModalClose = () => {
    this.setState({creditsUsageModal: false})
    this.handleClose()
  }

  render() {
    const { creditsUsage, userProfile } = this.props;
    const { creditsUsageByUser, index, creditsUsageByUserPage, page } = this.state;

    const columns = creditsUsageColumns(userProfile);

    const width = columns.reduce((accu, col) => accu + col.width, 50);
    return (
      <Wrapper>
        <Drawer
          title={
            <span>
                <span 
                className="ant-card-head-title"
                style={{ padding: '0px' }}
                >
                  <Icon type="credit-card" />
                  <span style={{ marginLeft: 5, fontSize: 17 }}>
                      Consumption History
                  </span>
                </span>
                <button onClick={this.creditsUsageModalClose} className="custome-close">
                  <i
                    className="material-icons"
                    style={{ color: '#999999' }}
                  >
                    cancel
                  </i>
                </button>
            </span>
            }
          visible={this.state.creditsUsageModal}
          width="650"
          style={{ padding: '20px' }}
          closable={false}
        >
          <WrapperBalance>
            <span>
             Credit Balance:{' '}
              {this.props.credits ? this.props.credits.toLocaleString() : 0}
            </span>
          </WrapperBalance>

          <WrapperContent>
            <div style={{ marginBottom: 40 }}>
              <div className="inline-flex left">
                {
                  creditsUsage.length > 0 && (
                    <Select
                      defaultValue={creditsUsage[0].user_name}
                      style={{ width: 200 }}
                      onChange={this.handleUserNameChange}
                    >
                      {creditsUsage.map((item, index) => <Option key={index}>{item.user_name}</Option>)}
                    </Select>
                  )
                }
              </div>
              <div className="inline-flex right">
                <Pagination
                  simple
                  size={'large'}
                  pageSize={8}
                  current={page}
                  total={creditsUsageByUser.length}
                  defaultCurrent={creditsUsageByUser.length > 0 ? index : 0}
                  onChange={this.handlePageChange}
                />
              </div>
            </div>
            <div style={{ marginBottom: 30 }}>

              <Table
                columns={columns}
                dataSource={creditsUsageByUserPage}
                pagination={false}
                scroll={{
                  x: width,
                }}
                locale={{
                  emptyText: 'No credits usage.',
                  filterConfirm: 'Ok',
                  filterReset: 'Cancel',
                  filterTitle: 'Options',
                }}
              />
            </div>
          </WrapperContent>
        </Drawer>
      </Wrapper>
    )
  }
}

CreditsUsage.propTypes = {
  closeCreditsUsageModal: PropTypes.func,
  creditsUsageModal: PropTypes.bool,
  creditsUsage: PropTypes.object,
  getCreditsUsage: PropTypes.func,
  credits: PropTypes.number,
  userProfile: PropTypes.object,
};

export default CreditsUsage;
