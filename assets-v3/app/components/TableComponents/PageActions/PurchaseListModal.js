/**
 *
 * PurchaseListModal
 *
 */

import React, { PropTypes } from 'react';
import { Modal, Col, Row, Input, Button, Icon, Checkbox, Select } from 'antd';
import theme from 'styles/theme';
import styled from 'styled-components';
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

class PurchaseListModal extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      selected: []
    };

    this.handleCancel = this.handleCancel.bind(this);
  }


  handleCancel(){
    this.setState({
      visible: false
    })

    this.props.handleShowPurchaseList();
  }

  handleChange(value){
    console.log(value)
    let selected = [];
    for (let v of value){
      console.log(v);
      for (let list of this.props.lbLists) {
        if(list.id == v){
          selected.push(list);
        }
      }
    }

    this.setState({
      selected: selected
    })

    console.log(this.state.selected);
  }


  handleSubmit(){
    let payload = {
      list: this.state.selected
    }

    this.props.purchaselbLists(payload)
    this.props.handleShowPurchaseList();
  }

  openCreate(){
    this.props.showInputText()
    this.props.handleShowPurchaseList();
  }


  render() {

    let Option = Select.Option;
    let list = [];
    for (let l of this.props.lbLists) {
      if(l.total_leads > 0){
        list.push(l);
      }
    }

    let btnDisabled = true;
    if(this.state.selected.length > 0){
      btnDisabled = false;
    }

    return (
      <div style={{"display":"inline-flex"}}>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          title="Purchase List(s)"
          footer={[
            <span style={{"fontSize":"10px", "float":"left", "marginTop":"7px"}}>
              To enable 'instant purchase', <a href="mailto:marketing@leadbook.com?Subject=Request%20for%20Instant%20Purchase" target="_top">contact us.</a>
            </span>,
            <button onClick={this.handleSubmit.bind(this)}
              style={{
                "backgroundColor":"#337ab7",
                "padding":"2px 10px",
                "color":"white",
                "borderRadius": "4px"
              }}
              disabled={btnDisabled}
            >
              Submit for Quote
            </button>
          ]}
        >
          <div style={{"display":"grid"}}>
            <span style={{"fontSize":"12px"}}>Note: Create a list by clicking <a onClick={this.openCreate.bind(this)}>here</a></span>
            <span style={{"fontSize":"20px"}}>Select the list</span>
            <span style={{"fontSize":"12px"}}>you can select more than one list</span>
            <Select mode="tags" style={{ width: '300px', 'margin': '10px 0px' }}
              onChange={this.handleChange.bind(this)}
            >
              {
                list.map((lbList) => (
                  <Option key={lbList.id}>{lbList.name}</Option>
                ))
              }
            </Select>
            {
              this.state.selected.length > 0 && (
                <span>You have selected {this.state.selected.length} list(s):</span>
              )
            }
            <ul>
            {
              this.state.selected.map((list)=>(
                <li>{list.name} ({list.total_leads})</li>
              ))
            }
            </ul>
          </div>

        </Modal>
      </div>
    );
  }
}

PurchaseListModal.propTypes = {
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
};

export default PurchaseListModal;
