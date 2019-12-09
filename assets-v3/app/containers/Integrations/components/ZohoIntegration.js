/**
 *
 * ZohoIntegration
 *
 */

import React, { PropTypes } from 'react';
import { Tabs } from 'antd';

import FieldMapping from './FieldMapping';
import ZohoLogin from './ZohoLogin';

import {
  IntegrationHeader,
  IntegrationHeaderInfo,
  IntegrationLoader,
  tabPanes,
} from '../constants';

import { IntegrationWrapper } from './css';

const TabPane = Tabs.TabPane;

// eslint-disable-next-line react/prefer-stateless-function
class ZohoIntegration extends React.Component {
  getStatus = (key, force = false) => {
    this.props.getIntegrationStatus(key, 'zoho', force);
  };

  render() {
    return (
      <IntegrationWrapper>
        <i className="anticon anticon-arrow-left" onClick={() => this.props.chooseIntegration('')}></i>
        {this.props.integrationStatus === 'NOT_AUTHENTICATED' ? (
          <ZohoLogin {...this.props} leadType="contact" />
        ) : 
        (
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
                    canRefresh
                    onRefresh={() => this.getStatus(tabPane.key, true)}
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

ZohoIntegration.propTypes = {
  getIntegrationStatus: PropTypes.func,
  integrationStatus: PropTypes.string,
  loading: PropTypes.bool,
  chooseIntegration: PropTypes.func
};

export default ZohoIntegration;
