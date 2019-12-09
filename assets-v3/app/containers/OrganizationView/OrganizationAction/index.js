/**
 *
 * Pagination
 *
 */
/* eslint-disable camelcase */
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Button, Menu, Dropdown, Tooltip, Icon } from 'antd';
import styled from 'styled-components';

import Salesforce from 'assets/salesforce.png';
import Pipedrive from 'assets/pipedrive.png';

import { isSafari, renderActionBtn } from 'utils/helper';
import { modalInfoText } from 'components/TableComponents/PageActions/constants';
import ConfirmModal from 'components/TableComponents/PageActions/ConfirmModal';

const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

const menuStyle = {
  width: 220,
  overflow: 'auto',
};

const StyledIcon = styled(Icon)`
  font-size: 24px;
`;

const StyledImg = styled.img`
  width: 24px;
`;

// eslint-disable-next-line react/prefer-stateless-function
class OrganizationAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      modalOptions: {
        ...modalInfoText.unlockContacts,
      },
    };
  }

  getModalDisplay = () => {
    const { companyDetails, exportToCsvCount, credentials } = this.props;
    const {
      title,
      okText,
      display,
      modalIcon,
      confirm,
    } = this.state.modalOptions;

    const modalProps = {
      visible: this.state.visible,
      selectedRows: [companyDetails],
      confirm,
      handleOk: this.handleOk,
      handleCancel: this.handleCancel,
      searchParams: {},
      category: 'company',
      exportToCsvCount,
      total: 1,
      title,
      okText,
      display,
      modalIcon,
      credentials,
    };

    if (display === 'exportInfo') {
      modalProps.footer = [
        <Button key="back" onClick={this.handleCancel}>
          Cancel
        </Button>,
        <Button>
          <a href="/api/v3/export/csv/" target="_blank">
            Export
          </a>
        </Button>,
      ];
    }

    return <ConfirmModal {...modalProps} />;
  };

  showModal = (modalOptions) => {
    this.setState({
      visible: true,
      modalOptions,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  exportData = (e) => {
    if (e.key === 'CSV') {
      this.exportToCsv();
      return;
    }
    const { companyDetails, exportData } = this.props;

    exportData([companyDetails], 'company', {}, false, e.key);
  };

  exportToCsv = () => {
    const { companyDetails, getExportToCsvCount } = this.props;

    getExportToCsvCount('company', {}, false, [companyDetails]);
    this.showModal({
      ...modalInfoText.exportContacts,
      confirm: this.bulkExport,
    });
  };

  bulkExport = () => {
    const { csvUrl } = this.props;

    let windowReference;
    if (isSafari) {
      windowReference = window.open('', '_blank');
      windowReference.location = csvUrl;
      return;
    }
    window.open(csvUrl, '_blank');
  };

  reportContacts = ({ checkedList, reportDescription }) => {
    const { reportContacts, companyDetails } = this.props;
    reportContacts([companyDetails], checkedList, reportDescription);
  };

  archiveContacts = (request) => {
    const { deleteContacts, companyDetails } = this.props;
    deleteContacts([companyDetails], 'company', {}, true, request);
  };

  backBtn = (e) => {
    browserHistory.push({
      pathname: '/app/v3/contact'
    });
  }


  render() {
    const { companyDetails } = this.props;

    const actionBtns = [
      // {
      //   title: 'Coming Soon',
      //   disableBtn: true,
      //   callback: () => '',
      //   iconType: 'playlist_add',
      // },
      {
        title: 'Report Invalid Email(s)',
        disableBtn: !companyDetails.unlocked,
        callback: () =>
          this.showModal({
            ...modalInfoText.reportContacts,
            confirm: this.reportContacts,
          }),
        iconType: 'report_problem',
      },
    ];

    const integrationsMenu = (
      <Menu style={menuStyle} onClick={this.exportData}>
        <MenuItem style={{ margin: '5px 0' }} key="CSV">
          <StyledIcon className="margin-right-10" type="export" />{' '}
          <span style={{ position: 'absolute' }}>CSV</span>
        </MenuItem>
        <MenuDivider />
        <MenuItem style={{ margin: '5px 0' }} key="Salesforce">
          <StyledImg className="margin-right-10" src={Salesforce} />Salesforce
        </MenuItem>
        <MenuItem style={{ margin: '5px 0' }} key="Pipedrive">
          <StyledImg className="margin-right-10" src={Pipedrive} /> Pipedrive
        </MenuItem>
      </Menu>
    );

    if (
      companyDetails.lists &&
      companyDetails.lists.find((list) => list.name === 'trash')
    ) {
      actionBtns.push({
        title: 'Remove from Do not contact List',
        disableBtn: false, // !companyDetails.unlocked,
        callback: () =>
          this.showModal({
            ...modalInfoText.unarchiveContacts,
            confirm: () => this.archiveContacts('/lead/untrash/'),
          }),
        iconType: 'undo',
      });
    } else {
      actionBtns.push({
        title: 'Do not contact',
        disableBtn: false, // !companyDetails.unlocked,
        callback: () =>
          this.showModal({
            ...modalInfoText.archiveContacts,
            confirm: () => this.archiveContacts('/lead/trash/'),
          }),
        iconType: 'remove_circle',
      });
    }

    return (
      <div className="inline-block page-btns">
        {this.getModalDisplay()}
        <Tooltip placement="topLeft" title="Back">
          <button onClick = {() => this.backBtn()} style={{
            padding: "3px",
            verticalAlign: "super",
            borderRadius: "0px !important"
          }}>
            <i className="anticon anticon-arrow-left"
              style={{
                fontSize: "16px",
                marginTop: "1px"
              }}
            ></i>
          </button>
        </Tooltip>
        {actionBtns.map((action) => renderActionBtn(action))}
        <Dropdown
          className="dropdown-action"
          overlay={integrationsMenu}
          disabled={!companyDetails.unlocked}
          placement="bottomCenter"
          style={{
            left: '60px',
          }}
        >
          <Tooltip placement="topLeft" title="Export">
            <Button disabled={!companyDetails.unlocked}>
              <i className="material-icons">cloud_upload</i>
            </Button>
          </Tooltip>
        </Dropdown>
        <i
          onClick={() =>
            this.props.toggleFavorites(
              companyDetails,
              'Company',
              '',
              '',
              true
            )
          }
          className="material-icons"
          style={{
            'fontSize': 24,
            'color': '#fec36f',
            'cursor': 'pointer',
            'marginLeft': '5px',
            'verticalAlign': 'sub'
          }}
        >
          {companyDetails.lists && companyDetails.lists.find(
            (list) => list.is_default && list.name === 'favorite'
          )
            ? 'star'
            : 'star_border'}
        </i>
      </div>
    );
  }
}

OrganizationAction.propTypes = {
  companyDetails: PropTypes.object,
  getExportToCsvCount: PropTypes.func,
  deleteContacts: PropTypes.func,
  reportContacts: PropTypes.func,
  exportData: PropTypes.func,
  exportToCsvCount: PropTypes.number,
  csvUrl: PropTypes.string,
  credentials: PropTypes.object,
};

export default OrganizationAction;
