/**
 *
 * IntegrationPicker
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import _ from 'underscore';

import Salesforce from 'assets/salesforce.png';
import Pipedrive from 'assets/pipedrive_logo.png';
import Hubspot from 'assets/hubspot.png';
import Zoho from 'assets/zoho.png';
import Zendesk from 'assets/zendesk.png';

import { StyledList, IntegrationButton } from './css';

const integrationLists = [
  {
    name: 'Salesforce',
    imagePath: Salesforce,
    key: 'salesforce'
  },
  {
    name: 'Pipedrive',
    imagePath: Pipedrive,
    key: 'pipedrive'
  },
  {
    name: 'Hubspot',
    imagePath: Hubspot,
    key: 'hubspot'
  },
  {
    name: 'Zoho',
    imagePath: Zoho,
    key: 'zoho'
  },
  {
    name: 'Zendesk',
    imagePath: Zendesk,
    key: 'zendesk'
  },
];

// eslint-disable-next-line react/prefer-stateless-function
class IntegrationPicker extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showDisconnectBtn: {
        salesforce: false,
        pipedrive: false,
        hubspot: false
      },
      noDisconnect: ['salesforce']
    }
  }

  toggleDisconnectBtn(key, e){
    let showDisconnectBtn = this.state.showDisconnectBtn;
    showDisconnectBtn[key] = !showDisconnectBtn[key];
    this.setState({
      showDisconnectBtn
    })
  }

  disconnectIntegration(key, e){
    if(key === 'hubspot' || key === 'zendesk'){
      let values = {
        token: null
      }
      this.props.authIntegration('contact', key, values);
      this.props.getAllIntegrationStatus('contact');
    }
    if(key === 'zoho' || key === 'pipedrive'){
      let values = {
        username: null
      }
      this.props.authIntegration('contact', key, values);
      this.props.getAllIntegrationStatus('contact');
    }
  }

  render() {
    
    const { chooseIntegration, chosenIntegration, allIntegrationStatus } = this.props;

    return (
      <StyledList>
        {integrationLists.map((t) => (
          <Col span={8}>
            <div className="image-box">
              <img src={t.imagePath} onClick={() => chooseIntegration(t.name)}/>
            </div>
            {
              !_.isEmpty(allIntegrationStatus) && allIntegrationStatus[t.key] === 'NOT_AUTHENTICATED' ?
              <IntegrationButton onClick={() => chooseIntegration(t.name)} >Connect</IntegrationButton>
              :
              [
                <IntegrationButton green onClick={this.toggleDisconnectBtn.bind(this, t.key)} >
                  Connected  
                  {!this.state.noDisconnect.includes(t.key) && (
                    <i className="anticon anticon-caret-down"></i>
                  )}
                </IntegrationButton>,
                <div>
                  {
                    this.state.showDisconnectBtn[t.key] && !this.state.noDisconnect.includes(t.key) && (
                      <div className="disconnect" onClick={this.disconnectIntegration.bind(this, t.key)}>
                        Disconnect
                      </div>
                    )
                  }
                </div>
              ]
            }
          </Col>
        ))}
      </StyledList>
    );
  }
}

IntegrationPicker.propTypes = {
  chooseIntegration: PropTypes.func,
  chosenIntegration: PropTypes.string,
};

export default IntegrationPicker;
