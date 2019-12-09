/**
 *
 * ConfirmModal
 *
 */

import React, { PropTypes } from 'react';
import { Modal, Col, Row, Input, Button, Icon, Checkbox } from 'antd';
import ColumnModal from 'components/TableComponents/ColumnModal';
import { IntegrationLoader } from 'containers/Integrations/constants';
import { toLocaleValue } from 'utils/helper';
import theme from 'styles/theme';
import styled from 'styled-components';
import FreshdeskWidget from '@personare/react-freshdesk-widget';
import { contactColumns, companyColumns } from './constants';
const { TextArea } = Input;
import { Wrapper } from './css';

export const StyledIcon = styled.i`
  float: left;
  margin-right: 10px;
`;

const ReportEmailButtons = styled.div`
  width: 50%;
  margin: 0px auto;
`;
const CancelReportEmail = styled.div`
  width: 100px;
  margin-right: 10px;
  float: left;
`;
const ConfirmReportEmail = styled.div`
  width: 100px;
  float: left;
`;

const IconWrapper = styled.i`
  display: inline-block;
  width:30px;
  margin-right: 10px;
  text-align: center;
  font-size: 16px;
`;

class ConfirmModal extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      checkedList: [],
      reportDescription: '',
      showFreshDesk: false,
      showReportSuccess: false,
      suppressAllCompanyContacts: true
    };

    this.handleSuppressCompanyContacts = this.handleSuppressCompanyContacts.bind(this);
  }

  onCheck = (checkedList) => {
    this.setState({
      checkedList,
    });
  };

  onInputText = (e) => {
    this.setState({
      reportDescription: e.target.value,
    });
  };

  handleOk = (indicator) => {
    if (indicator === 'freshdesk') {
      this.setState({
        showFreshDesk: false,
      });
      return;
    }

    if(indicator === 'reportEmail') {
      this.setState({
        showReportSuccess: true,
      });
    }
    this.props.confirm(this.state);
    this.props.handleOk();
    this.clearState();
  };

  handleCancel = (indicator) => {
    if (indicator === 'freshdesk') {
      this.setState({
        showFreshDesk: false,
      });
      return;
    }
    if(indicator === 'reportEmail') {
      this.setState({
        showReportSuccess: false,
      });
    }

    this.clearState();
    this.props.handleCancel();
  };

  clearState = () => {
    this.setState({
      checkedList: [],
      reportDescription: '',
    });
  };

  reportInfoSuccess = () => {
    return(
        <Col className="pa-modal-info" style={{ textAlign: "center" }}>
          <IconWrapper>
            <Icon type="check-circle" theme="filled" style={{ color:"#52c41a", display: "inline"}} />
          </IconWrapper>
          <span style={{ fontSize: "20px"}}>Successfully reported.</span>
        </Col>
    );
  }

  reportInfo = () => {
    let selectedRows = this.props.selectedRows;
    if(selectedRows.length == 1){
      let row = selectedRows[0];
      if(row.invalid_email_reported){
        return (
          <Col className="pa-modal-info" style={{textAlign: "center"}}>
            Selected contact(s) has already been reported.
          </Col>
        )
      }
    }
    else{
      let report = false;
      for(let i=0;i<selectedRows.length;i++){
        if(!selectedRows[i].invalid_email_reported){
          return (
            <Col className="pa-modal-info">
              <ReportEmailButtons>
                <CancelReportEmail>
                  <Button onClick={this.handleCancel}>Cancel</Button>
                </CancelReportEmail>
                <ConfirmReportEmail>
                  <Button type="primary" onClick={ () => this.handleOk('reportEmail')}>Report</Button>
                </ConfirmReportEmail>
              </ReportEmailButtons>
            </Col>
          );
        }
      }
      return (
        <Col className="pa-modal-info" style={{textAlign: "center"}}>
          Selected contact(s) has already been reported.
        </Col>
      )
    }
    return (
      <Col className="pa-modal-info">
        <ReportEmailButtons>
          <CancelReportEmail>
            <Button onClick={this.handleCancel}>Cancel</Button>
          </CancelReportEmail>
          <ConfirmReportEmail>
            <Button type="primary" onClick={ () => this.handleOk('reportEmail')}>Report</Button>
          </ConfirmReportEmail>
        </ReportEmailButtons>
      </Col>
    );   
  };

  exportInfo = () => {
    const { category, exportToCsvCount } = this.props;

    if (exportToCsvCount < 0) {
      return <Col className="pa-modal-info">{IntegrationLoader()}</Col>;
    }

    if (typeof exportToCsvCount === 'string') {
      return (
        <Col className="pa-modal-info">
          {exportToCsvCount} To increase this limit{' '}
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              this.handleCancel();
              this.setState({ showFreshDesk: true });
            }}
          >
            contact us
          </a>{' '}
          or email us at{' '}
          <a href={'mailto:customer_success@leadbook.com'}>
            customer_success@leadbook.com
          </a>
        </Col>
      );
    }

    return (
      <Col className="pa-modal-info">
        <div>
          You are about to export{' '}
          <span className="font-weight-700">
            {toLocaleValue(exportToCsvCount)} unlocked {category.toLowerCase()}s.
          </span>
        </div>
        <div style={{ fontSize: '10px', marginTop: '5px' }}>
          Note: Only unlocked {category.toLowerCase()}s can be exported.
        </div>
      </Col>
    );
  };

  handleSuppressCompanyContacts(){
    const { suppressCompanyContacts } = this.props;
    this.setState({
        suppressAllCompanyContacts: !this.state.suppressAllCompanyContacts } ,
    () => { suppressCompanyContacts(this.state.suppressAllCompanyContacts);
    } );
  }

  archiveInfo() {
    const { selectedRows, category, selectAllLeads, total } = this.props;
    const organisationConfirmation = (<Col className="pa-modal-info" style={{ marginTop: 20}}>
      <Checkbox checked={this.state.suppressAllCompanyContacts}
        onChange={this.handleSuppressCompanyContacts} >
         Include all contacts from the organization(s) to the List "Do not contact"
      </Checkbox>
    </Col>);
    return (
      <Col className="pa-modal-info">
        Adding {' '}
        <span className="font-weight-700">{
          selectAllLeads ?
          total
          :
          selectedRows.length
        }</span>{' '}
        {category}{selectedRows.length > 1 ? 's': ''} to the List "Do not contact"
        {category === 'Organization' ? organisationConfirmation: ''}
      </Col>
    );
  }

  unArchiveInfo() {
    const { selectedRows, category } = this.props;
    return (
      <Col className="pa-modal-info">
        Are you sure you want to remove <span className="font-weight-700">
          {toLocaleValue(selectedRows.length)}
        </span>{' '}
        {category}{selectedRows.length > 1 ? 's': ''} from Do not contact List{' '}?
      </Col>
    );
  }

  unlockInfo() {
    const { total, category, creditCost, selectedRows, totalToUnlock } = this.props;
    if (creditCost < 0) {
      return <Col className="pa-modal-info">{IntegrationLoader()}</Col>;
    }

    return (
      <Col className="pa-modal-info">
        Unlocking will cost{' '}
        <span className="font-weight-700">
          {toLocaleValue(creditCost)} credits
        </span>. Are you sure you want to unlock all{' '}
        <span className="font-weight-700">{toLocaleValue(totalToUnlock)}</span>{' '}
        {category}{total > 1 ? 's': ''}?
      </Col>
    );
  }

  sendCampaign() {
    return (
      <Col className="pa-modal-info">
        <ul style={{'paddingLeft': '25px'}}>
          <li style={{'margin': '20px 0px'}}>
            <span><b>Create a list</b> by clicking <span style={{ color: `${theme.colorNames.blue}` }}>
              <i className="material-icons" style={{ fontSize: '15px' }}>
                playlist_add
            </i> Add to List
            </span>
             </span>
          </li>
          <li style={{'margin': '20px 0px'}}>
            Click on <b>'Campaigns'</b> and look for <span style={{ color: `${theme.colorNames.blue}` }}>
              <i className="material-icons" style={{ fontSize: '15px' }}>mode_edit</i>
               New Campaign</span> to send an
            outreach mail to created list
          </li>
        </ul>
      </Col>
    );
  }


  render() {
    const { display, title, okText, modalIcon, category, selectedRows } = this.props;

    const titleDisplay = (
      <div>
        <StyledIcon className="material-icons">{modalIcon}</StyledIcon>
        {
          title == 'Do not contact' || title == 'Remove from do not contact list' || title == 'Confirmation' || title == 'Report Invalid Email(s)'?
          <span>{title}</span>
          :
          <span>{title} {category == 'company' ? 'Organization' :category }{selectedRows.length > 1 ? 's': ''}</span>
        }
        
      </div>
    );

    const modalOptions = {
      title: titleDisplay,
      visible: this.props.visible,
      onOk: this.handleOk,
      onCancel: this.handleCancel,
      okText,
      cancelText: 'Cancel',
      wrapClassName: 'pa-modal-display',
      width: 475,
    };

    const reportSuccessModalOptions = {
      title: titleDisplay,
      visible: this.state.showReportSuccess,
      onCancel: () => this.handleCancel('reportEmail'),
      wrapClassName: 'pa-modal-display',
      width: 475,
      footer: null
    }

    if (
      typeof this.props.exportToCsvCount === 'string' &&
      display === 'exportInfo'
    ) {
      modalOptions.footer = null;
    }

    if (display === 'reportInfo' || display === 'sendCampaign') {
      modalOptions.footer = null;
    }

    return (
      <div>
        <Modal
          visible={this.state.showFreshDesk}
          onCancel={() => this.handleCancel('freshdesk')}
          footer={[]}
        >
          <FreshdeskWidget url="https://leadbook.freshdesk.com" />
        </Modal>
        <Modal  {...reportSuccessModalOptions}>
          <Row>{this.reportInfoSuccess()}</Row>
        </Modal>
        <Modal {...modalOptions}>
          <Row>{this[display]()}</Row>
        </Modal>
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
  okText: PropTypes.string,
  display: PropTypes.string,
  modalIcon: PropTypes.string,
  exportToCsvCount: PropTypes.number,
  creditCost: PropTypes.number,
  total: PropTypes.number,
  handleOk: PropTypes.func,
  confirm: PropTypes.func,
  handleCancel: PropTypes.func,
  selectedRows: PropTypes.array,
  visible: PropTypes.bool,
  suppressCompanyContacts: PropTypes.func,
  credentials: PropTypes.object,
};

export default ConfirmModal;
