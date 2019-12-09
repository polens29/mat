/**
 *
 * Integrations
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Col, Row } from 'antd';
import styled from 'styled-components';

import {
  getIntegrationStatus,
  getAllIntegrationStatus,
  updateIntegrationsObject,
  saveIntegrationsMapping,
  authenticateIntegration,
} from './actions';
import IntegrationPicker from './components/IntegrationPicker';
import SalesforceIntegration from './components/SalesforceIntegration';
import PipedriveIntegration from './components/PipedriveIntegration';
import HubspotIntegration from './components/HubspotIntegration';
import ZohoIntegration from './components/ZohoIntegration';
import ZendeskIntegration from './components/ZendeskIntegration';

import {
  makeSelectIntegrationType,
  makeSelectStatus,
  makeSelectAllStatus,
  makeSelectIntegrationObject,
  makeSelectIntegrationFormat,
  makeSelectLoading,
} from './selectors';

import { Wrapper } from './components/css';

const integrationStyle = {
  minHeight: '710px',
  borderRight: '1px solid #ececec',
};

class Integrations extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { chosenIntegration: this.props.chosenIntegration };
  }

  componentWillMount(){
    this.props.getAllIntegrationStatus('contact');
  }

  chooseIntegration = (chosenIntegration) => {
    this.props.getAllIntegrationStatus('contact');
    if(chosenIntegration != ""){
      this.props.getIntegrationStatus('contact', chosenIntegration);
    }
    this.setState({ chosenIntegration });
  };

  render() {
    let chosenIntegration = this.state.chosenIntegration;
    return (
      <Wrapper>
        <div>
          {/*
          <Row>
            <span>Why Integrate?</span>
          </Row>
          */}
          {chosenIntegration == "" && (
            <Row>
              <IntegrationPicker
                {...this.props}
                chooseIntegration={this.chooseIntegration}
                chosenIntegration={this.state.chosenIntegration}
              />
            </Row>
          )}
          {chosenIntegration == "Salesforce" && (
            <Row>
              <SalesforceIntegration
                {...this.props}
                chooseIntegration={this.chooseIntegration}
                chosenIntegration={this.state.chosenIntegration}
              />
            </Row>
          )}
          {chosenIntegration == "Pipedrive" && (
            <Row>
              <PipedriveIntegration
                {...this.props}
                chooseIntegration={this.chooseIntegration}
                chosenIntegration={this.state.chosenIntegration}
              />
            </Row>
          )}
          {chosenIntegration == "Hubspot" && (
            <Row>
              <HubspotIntegration
                {...this.props}
                chooseIntegration={this.chooseIntegration}
                chosenIntegration={this.state.chosenIntegration}
              />
            </Row>
          )}
          {chosenIntegration == "Zoho" && (
            <Row>
              <ZohoIntegration
                {...this.props}
                chooseIntegration={this.chooseIntegration}
                chosenIntegration={this.state.chosenIntegration}
              />
            </Row>
          )}
          {chosenIntegration == "Zendesk" && (
            <Row>
              <ZendeskIntegration
                {...this.props}
                chooseIntegration={this.chooseIntegration}
                chosenIntegration={this.state.chosenIntegration}
              />
            </Row>
          )}
          
        </div>
      </Wrapper>
    )
  }
}

Integrations.propTypes = {
  getIntegrationStatus: PropTypes.func,
  chosenIntegration: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  chosenIntegration: makeSelectIntegrationType(),
  integrationStatus: makeSelectStatus(),
  allIntegrationStatus: makeSelectAllStatus(),
  integrationObject: makeSelectIntegrationObject(),
  integrationFormat: makeSelectIntegrationFormat(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllIntegrationStatus: (leadType) =>
      dispatch(getAllIntegrationStatus(leadType)),

    getIntegrationStatus: (leadType, integrationType, force) =>
      dispatch(getIntegrationStatus(leadType, integrationType, force)),

    updateIntegrationsObject: (leadType, integrationType, objectId, status) =>
      dispatch(
        updateIntegrationsObject(leadType, integrationType, objectId, status)
      ),
    saveIntegrationsMapping: (value, fieldKey, payload) =>
      dispatch(saveIntegrationsMapping(value, fieldKey, payload)),

    authIntegration: (leadType, integrationType, payload) =>
      dispatch(authenticateIntegration(leadType, integrationType, payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Integrations);
