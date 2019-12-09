/**
 *
 * PageActions
 *
 */

import React, { PropTypes } from 'react';
import { Button, Menu, Input, Tooltip, Dropdown, Checkbox, Icon, Modal, Select, message } from 'antd';
import { renderActionBtnDatabase, isSafari } from 'utils/helper';
import styled from 'styled-components';

import Salesforce from 'assets/salesforce.png';
import Pipedrive from 'assets/pipedrive.png';
import Hubspot from 'assets/hubspot.png';
import Zoho from 'assets/zoho.png';
import Zendesk from 'assets/zendesk.png';
import _ from 'underscore';

import ConfirmModal from './ConfirmModal';
import { modalInfoText } from './constants';
import { Wrapper } from './css';
import PurchaseListModal from './PurchaseListModal';
import SendMail from 'assets/icons/send.png';
import SendDisabledMail from 'assets/icons/send-disabled.png';
import EditIcon from 'assets/icons/edit.png';
import UnlockGray from 'assets/icons/unlock-grey.png';
import UnlockWhite from 'assets/icons/unlock-white.png';
import SelectList from './SelectList';
import CreateList from 'components/ListFilter/CreateList';
import ListFilter from 'components/ListFilter';
import CSV from 'assets/icons/csv.png';
import CSVGray from 'assets/icons/csv-gray.png';

const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

const StyledIcon = styled(Icon)`
  font-size: 24px;
`;

const StyledImg = styled.img`
  width: 24px;
`;

class PageActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      showList: false,
      modalOptions: {
        ...modalInfoText.unlockContacts,
      },
      initialItems: [],
      items: [],
      checkedListID: null,
      checkedKeys: [],
      checkedKeysId: [],
      query: '',
      showPurchaseList: false,
      showInputText: false,
      showListAdded: false,
      defaultValue: 'Select list',
      prevListLength: null,
      loading: false,
      listUpdated: false,
      listCreated: false,
      lbLists: [],
      onSelect: false,
      creditRequested: false,
      prevCategory: 'contact'
    };

    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.handleShowPurchaseList = this.handleShowPurchaseList.bind(this);
    this.showInputText = this.showInputText.bind(this)
    this.selectDefault = this.selectDefault.bind(this);
    this.getUnlockCredits = this.getUnlockCredits.bind(this);
  }

  componentWillMount() {
    this.setState({ items: this.state.initialItems });
    this.setState({
      prevListLength: this.props.lbLists.length
    })
    this.setState({
      prevCategory: this.props.category
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.prevCategory != nextProps.category){
      this.setState({
        prevCategory: nextProps.category,
        creditRequested: false
      })
    }


    let lbLists = nextProps.lbLists;
    if (!_.isEmpty(nextProps.updatedList) && this.state.listUpdated) {
      for (let x in nextProps.lbLists) {
        if (nextProps.lbLists[x].id == nextProps.updatedList.id) {
          lbLists[x] = nextProps.updatedList;
        }
      }
      this.setState({
        listUpdated: false,
        lbLists
      })
      this.props.getlbLists(this.props.category)
    }
    else {
      this.setState({
        lbLists
      })
    }

    this.setState({
      showList: nextProps.visibleSize
    })

    if(this.state.creditRequested && nextProps.creditCost != -1){
      this.setState({
        creditRequested: false
      })
    }
  }

  componentDidUpdate(prevProps) {
    const selectAllLeads = this.props.selectAllLeads;
    const preSelectAllLeads = prevProps.selectAllLeads;
    if (selectAllLeads && selectAllLeads != preSelectAllLeads) {
      this.props.getCreditCost();
      this.setState({
        creditRequested: true
      })
    }
  }

  onSubmit = (value) => {
    const { category, createlbLists } = this.props;
    let lbLists = this.state.lbLists;
    this.setState({
      inputValue: value
    })
    if (value) {
      createlbLists(value, category)
    }
    this.setState({
      showListAdded: true,
      prevListLength: this.state.lbLists.length,
      loading: true,
      showInputText: false,
      listCreated: true
    })
    let msg = "List " + value + " created";
    message.success(msg);
  };

  onAddLeadsToList = () => {
    this.props.addTolbLists(
      this.props.selectedRows,
      this.props.category,
      this.props.checkedKeys,
      this.props.searchParams,
      this.props.selectAllLeads,
      this.props.total
    );
    this.props.handleHideListDropDown();
    this.setInitialState();

    this.setState({
      showList: false,
      listUpdated: true
    })
  };

  onRemoveLeadsFromList = () => {
    this.props.removeFromlbLists(
      this.props.selectedRows,
      this.props.category,
      this.props.keywords.filter((t) => t.filters === 'list'),
      this.props.searchParams,
      this.props.selectAllLeads,
      this.props.total
    );
  };

  onChange = (e) => {
    //this.props.filterList(e.target.value);
    this.setState({
      query: e.target.value,
    });
  };

  onSelectetList = (e) => {
    this.setState({
      checkedKeys: [...this.state.checkedKeys, e.target.value],
      checkedKeysId: [...this.state.checkedKeysId, e.target.value.id],
    });
    if (e.target.checked) {
      this.setState({
        checkedKeysId: [...this.state.checkedKeysId, e.target.value.id],
      });
    } else {
      this.setState({
        checkedKeysId: this.state.checkedKeysId.filter(
          (t) => t !== e.target.value.id
        ),
      });
    }
  };

  getModalDisplay = () => {
    const {
      selectedRows,
      searchParams,
      category,
      total,
      exportToCsvCount,
      credits,
      creditCost,
      suppressCompanyContacts,
      selectAllLeads
    } = this.props;
    const {
      title,
      okText,
      display,
      modalIcon,
      confirm,
    } = this.state.modalOptions;

    const modalProps = {
      visible: this.state.visible,
      selectedRows,
      confirm,
      handleOk: this.handleOk,
      handleCancel: this.handleCancel,
      searchParams,
      category,
      exportToCsvCount,
      total,
      credits,
      title,
      okText,
      display,
      modalIcon,
      creditCost,
      credentials: this.props.credentials
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

    return <ConfirmModal {...modalProps} suppressCompanyContacts={suppressCompanyContacts}
      totalToUnlock={this.props.totalToUnlock} selectAllLeads={selectAllLeads} total={total} 
     />;
  };

  setInitialState = () => {
    this.setState({
      initialItems: this.state.lbLists,
      items: this.state.lbLists || [],
      query: '',
      checkedKeys: [],
      checkedKeysId: [],
    });
    this.props.filterList('');
  };

  handleVisibleChange = (flag) => {
    this.props.handleShowListDropDown(flag);

    if (!flag) {
      this.setInitialState();
    }
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

  bulkUnlock = () => {
    const {
      unlockContacts,
      selectedRows,
      searchParams,
      category,
      credits,
      total,
      showInfoModal,
    } = this.props;
    unlockContacts(selectedRows, {
      searchParams,
      category,
      unlockAll: true,
      credits,
      total,
      showInfoModal,
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
    const { reportContacts, selectedRows } = this.props;
    reportContacts(selectedRows, checkedList, reportDescription);
  };

  archiveContacts = (request) => {
    const { deleteContacts, selectedRows, searchParams, category, suppressAllCompanyContacts } = this.props;
    deleteContacts(selectedRows, category, searchParams, false, request, suppressAllCompanyContacts);
  };

  unlockContacts = () => {
    const {
      unlockContacts,
      selectedRows,
      searchParams,
      category,
      selectAllLeads,
      credits,
      getCreditCost,
      showInfoModal,
    } = this.props;

    if (selectAllLeads) {
      this.showModal({
        ...modalInfoText.unlockContacts,
        confirm: this.bulkUnlock,
      });
      return;
    }
    unlockContacts(selectedRows, {
      searchParams,
      category,
      credits,
      showInfoModal,
    });
  };

  exportToCsv = () => {
    const {
      category,
      getExportToCsvCount,
      searchParams,
      selectAllLeads,
      selectedRows,
    } = this.props;

    getExportToCsvCount(category, searchParams, selectAllLeads, selectedRows);
    this.showModal({
      ...modalInfoText.exportContacts,
      confirm: this.bulkExport,
    });
  };

  exportData = (e) => {
    if (e.key === 'CSV') {
      this.exportToCsv();
      return;
    }

    const {
      selectedRows,
      category,
      selectAllLeads,
      exportData,
      searchParams,
    } = this.props;

    exportData(
      selectedRows,
      category,
      searchParams.filters,
      selectAllLeads,
      e.key
    );
  };

  showCampaign(e) {
    this.showModal({
      ...modalInfoText.sendCampaign
    });
  }

  onFocus(e) {
    this.props.handleShowListDropDown(true)
    this.setState({
      showList: true
    })
  }

  onBlur(e) {
    this.props.handleHideListDropDown(false)
    this.setState({
      showList: false
    })
  }

  showInputText(e) {
    this.setState({
      showInputText: !this.state.showInputText,
      showListAdded: false,
      query: ""
    })
    this.props.filterList("");
  }

  handleSelect(value) {
    this.setState({
      checkedListID: value,
      checkedKeys: [this.state.lbLists[value]],
      checkedKeysId: [value],
      defaultValue: value,
      onSelect: true
    });

    this.props.setCheckedKeys([this.state.lbLists[value]]);
  }

  manageLists(e) {
    this.props.showManageListsModal(true);
    this.setState({
      showList: false
    })
  }

  handleShowPurchaseList(e) {
    this.setState({
      showPurchaseList: !this.state.showPurchaseList
    })
  }

  selectDefault(value) {
    this.setState({
      checkedListID: value,
      checkedKeys: [this.state.lbLists[value]],
      checkedKeysId: [value],
      loading: false,
      defaultValue: value
    });
    this.props.setCheckedKeys([this.state.lbLists[value]]);
  }

  getTotalUnlockCredits = () => {
    const { selectAllLeads, selectedRows, creditCost } = this.props;
    if (selectAllLeads) {
      return creditCost > -1 ? creditCost : 0;
    }
    else {
      return selectedRows.reduce(function (total, obj) {
        return total = total + obj.credits_required;
      }, 0);
    }
  };

  getUnlockCredits(){
    if(!this.state.creditRequested){
      this.props.getCreditCost();
      this.setState({
        creditRequested: true
      })
    }
  };

  render() {
    const { selectedRows, activeSpecialFilter, searchParams } = this.props;
    const { lbLists , creditRequested} = this.state;
    const { campaign_statuses, campaigns } = searchParams.filters;

    const unlockedRow = selectedRows.find((row) => row.unlocked);
    const lockedRow = selectedRows.find((row) => !row.unlocked);
    const disableWhenLockIncluded = !(unlockedRow && !lockedRow);

    let credentials = this.props.credentials;
    let campaignCredits = credentials.email_delivery_cost;
    // Use to check if client can unlock contact or company
    let can_unlock = credentials.can_unlock;
    can_unlock = true;
    // UnlockCredits total required 
    let unlockCreditsText;
    if(!selectedRows.length){
      unlockCreditsText = 'Unlock';
    }
    else {
      if(creditRequested){
        unlockCreditsText = "Calculating credits..."
      }
      else {
        unlockCreditsText = this.getTotalUnlockCredits() + " Credits to Unlock";
      }
    }
    

    let campaignCreditsText = '';
    if (this.props.selectAllLeads) {
      campaignCreditsText = (this.props.total * campaignCredits).toFixed(2) + " Credits";
    }
    else {
      campaignCreditsText = (this.props.selectedRows.length * campaignCredits).toFixed(2) + " Credits";
    }

    const integrationStyle = {
      width: 220,
      overflow: 'auto',
    };

    const integrationsMenu = (
      <Menu style={integrationStyle} onClick={this.exportData}>
        <MenuItem style={{ margin: '5px 0' }} key="Salesforce">
          <StyledImg className="margin-right-10" src={Salesforce} />Salesforce
        </MenuItem>
        <MenuItem style={{ margin: '5px 0' }} key="Pipedrive">
          <StyledImg className="margin-right-10" src={Pipedrive} /> Pipedrive
        </MenuItem>
        <MenuItem style={{ margin: '5px 0' }} key="Hubspot">
          <StyledImg className="margin-right-10" src={Hubspot} /> HubSpot
        </MenuItem>
        <MenuItem style={{ margin: '5px 0' }} key="Zoho">
          <StyledImg className="margin-right-10" src={Zoho} /> Zoho
        </MenuItem>
        <MenuItem style={{ margin: '5px 0' }} key="Zendesk">
          <StyledImg className="margin-right-10" src={Zendesk} /> Zendesk Sell
        </MenuItem>
      </Menu>
    );

    //Check if purchase/unlock button should be disabled
    let enableUnlockBtn = (can_unlock && lockedRow != undefined && lockedRow.length != 0);
    if(this.props.selectAllLeads){
      enableUnlockBtn = true;
    }
    if (campaign_statuses.length || campaigns.length) {
      enableUnlockBtn = (campaign_statuses.length || campaigns.length) && selectedRows.length;
    }

    let actionBtns = [];

    actionBtns.push({
      title: 'Report Email',
      disableBtn: disableWhenLockIncluded,
      callback: () =>
        this.showModal({
          ...modalInfoText.reportContacts,
          confirm: this.reportContacts,
        }),
      iconType: 'report_problem',
    });

    if (activeSpecialFilter === 'Trash') {
      actionBtns.push({
        title: 'Remove from Do not contact List',
        disableBtn: !selectedRows.length, // !disableWhenLockIncluded,
        callback: () =>
          this.showModal({
            ...modalInfoText.unarchiveContacts,
            confirm: () => this.archiveContacts('/lead/untrash/'),
          }),
        iconType: 'undo',
      });
    }

     else {
      actionBtns.push({
        title: 'Do not contact',
        disableBtn: !selectedRows.length, // disableWhenLockIncluded,
        callback: () =>
          this.showModal({
            ...modalInfoText.archiveContacts,
            confirm: () => this.archiveContacts('/lead/trash/'),
          }),
        iconType: 'not_interested',
      });
    }

    let addListDisabled = true;
    if (selectedRows.length > 0 && this.state.checkedListID != null) {
      addListDisabled = false;
    }

    return (
      <Wrapper>
        {this.getModalDisplay()}
        <div
          className="inline-block page-btns"
          style={{ position: 'relative', top: 5, paddingLeft: '8px', display: 'inline-flex' }}
        >
            
          <CreateList
            createlbLists={this.props.createlbLists}
            category={this.props.category}
            listCreated={this.props.listCreated}
            handleListCreated={this.props.handleListCreated}
            lbLists={this.props.lbLists}
            filterList={this.props.filterList}
          />
          <ListFilter
            keywords={this.props.keywords}
            addKeyword={this.props.addKeyword}
            category={this.props.category}
            clearKeyword={this.props.clearKeyword}
            lbLists={this.props.lbLists}
            createlbLists={this.props.createlbLists}
            addTolbLists={this.props.addTolbLists}
            filterList={this.props.filterList}
            removeKeyword={this.props.removeKeyword}
            deleteList={this.props.deleteList}
            copyList={this.props.copyList}
            renameList={this.props.renameList}
            getlbLists={this.props.getlbLists}
            showManageListsModal={this.props.showManageListsModal}
            listModalVisible={this.props.listModalVisible}
          />

          <SelectList
            lbLists={lbLists}
            handleSelect={this.handleSelect.bind(this)}
            onAddLeadsToList = {this.onAddLeadsToList.bind(this)}
            manageLists={this.manageLists.bind(this)}
            onSubmitList={this.onSubmit.bind(this)}
            updatedList={this.props.updatedList}
            selectedRows={this.props.selectedRows}
            setCheckedKeys={this.props.setCheckedKeys}
            listUpdated={this.props.listUpdated}
            handleListUpdated={this.props.handleListUpdated}
            getlbLists={this.props.getlbLists}
            category={this.props.category}
            listCreated={this.props.listCreated}
            handleListCreated={this.props.handleListCreated}
            visibleSize={this.props.visibleSize}
            handleHideListDropDown={this.props.handleHideListDropDown}
          />

          {
            can_unlock && (
              <Tooltip placement="topLeft" title={unlockCreditsText}>
                <Button onClick={this.unlockContacts} disabled={!enableUnlockBtn}>
                  <i className="material-icons">lock_open</i>
                  {/*<span>Purchase Data</span>*/}
                </Button>
              </Tooltip>
            )
          }

          {
            !can_unlock && (
              <Tooltip placement="topLeft" title="Purchase list">
                <Button onClick={this.handleShowPurchaseList} disabled={!enableUnlockBtn}>
                  <img src={!selectedRows.length ? UnlockGray : UnlockWhite}
                    style={{ "height": "15px" }}
                  />
                </Button>
              </Tooltip>
            )
          }
          {
            this.state.showPurchaseList && (
              <PurchaseListModal
                {...this.props}
                handleShowPurchaseList={this.handleShowPurchaseList}
                showInputText={this.showInputText} />
            )
          }

          {actionBtns.map((action) => renderActionBtnDatabase(action))}

          {this.props.isListSelected && (
            <Tooltip placement="topLeft" title="Remove from list">
              <Button onClick={this.onRemoveLeadsFromList} disabled={!selectedRows.length}>
                <i className="material-icons">remove_circle</i>
              </Button>
            </Tooltip>
              
            )
          }

          <Dropdown
            className="dropdown-action"
            overlay={integrationsMenu}
            disabled={!selectedRows.length}
            placement="bottomCenter"
            style={{
              left: '60px',
            }}
          >
            <Tooltip placement="topLeft" title="Export to CRM">
              <Button disabled={!selectedRows.length}>
                <i className="material-icons">cloud_upload</i>
                {/*<span>CRM Export</span>*/}
              </Button>
            </Tooltip>
          </Dropdown>


          <Tooltip placement="topLeft" title='Export to CSV'>
            <Button onClick={this.exportToCsv} disabled={!selectedRows.length}>
              {
                !selectedRows.length ?
                <img src={CSVGray} style={{"height":"18px"}} />
                :
                <img src={CSV} style={{"height":"18px"}} />
              }
              {/*<span>CSV Export</span>*/}
            </Button>
          </Tooltip>
        </div>
      </Wrapper>
    );
  }
}

PageActions.propTypes = {
  deleteContacts: PropTypes.func,
  unlockContacts: PropTypes.func,
  reportContacts: PropTypes.func,
  credentials: PropTypes.object,
  getExportToCsvCount: PropTypes.func,
  exportData: PropTypes.func,
  createlbLists: PropTypes.func,
  filterList: PropTypes.func,
  addTolbLists: PropTypes.func,
  removeFromlbLists: PropTypes.func,
  getCreditCost: PropTypes.func,
  showInfoModal: PropTypes.func,
  selectedRows: PropTypes.array,
  keywords: PropTypes.array,
  lbLists: PropTypes.array,
  searchParams: PropTypes.object,
  selectAllLeads: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool,
  ]),
  category: PropTypes.string,
  activeSpecialFilter: PropTypes.string,
  csvUrl: PropTypes.string,
  total: PropTypes.number,
  exportToCsvCount: PropTypes.number,
  creditCost: PropTypes.number,
  credits: PropTypes.number,
  isListSelected: PropTypes.bool,
  handleHideListDropDown: PropTypes.func,
  handleShowListDropDown: PropTypes.func,
  visibleSize: PropTypes.bool,
  suppressCompanyContacts: PropTypes.func,
  showManageListsModal: PropTypes.func
};

export default PageActions;