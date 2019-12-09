/**
 *
 * SalesforceIntegration
 *
 */

import React, { PropTypes } from 'react';
import { Tabs, Icon } from 'antd';

import FieldMapping from './FieldMapping';
import Salesforce from 'assets/salesforce.png';

import {
  IntegrationHeader,
  IntegrationHeaderInfo,
  IntegrationLoader,
  tabPanes,
} from '../constants';

import { IntegrationWrapper } from './css';

const TabPane = Tabs.TabPane;

// eslint-disable-next-line react/prefer-stateless-function
class SalesforceIntegration extends React.Component {
  getStatus = (key) => {
    this.props.getIntegrationStatus(key, 'salesforce');
  };

  render() {
    return (
      <IntegrationWrapper>
        <i className="anticon anticon-arrow-left" onClick={() => this.props.chooseIntegration('')}></i>
        {this.props.integrationStatus === 'NOT_AUTHENTICATED' ? (
          <div className="box-div">
            <img src={Salesforce} />
            <a
              href="/api/v3/auth/salesforce/login/"
              target="_blank"
              onClick={this.props.handleOkIntegration}
            >
              Login
            </a>
          </div>
        ) : (
          <Tabs defaultActiveKey="contact" onChange={this.getStatus}>
            {
              tabPanes.map((tabPane) => (
                <TabPane tab={tabPane.tab} key={tabPane.key}>
                  {this.props.loading ? (
                    IntegrationLoader()
                  ) : (
                    <FieldMapping
                      {...this.props}
                      leadType={tabPane.key}
                      onRefresh={() => (null)}
                    />
                  )}
                </TabPane>
              ))
            }
          </Tabs>
        )}
      </IntegrationWrapper>
    );
  }
}

SalesforceIntegration.propTypes = {
  getIntegrationStatus: PropTypes.func,
  handleOkIntegration: PropTypes.func,
  integrationStatus: PropTypes.string,
  loading: PropTypes.bool,
  chooseIntegration: PropTypes.func,
};

export default SalesforceIntegration;
