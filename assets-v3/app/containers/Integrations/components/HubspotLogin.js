/**
 *
 * Hubspot Login
 *
 */
import React, { PropTypes } from 'react';
import { Radio, Form, Icon, Input, Button } from 'antd';
import styled from 'styled-components';

import Hubspot from 'assets/hubspot.png';

import { IntegrationHeader, IntegrationHeaderInfo } from '../constants';
const RadioGroup = Radio.Group;

const FormWrapper = styled.div`

  .ant-form {
    margin: auto;
    padding: 15px;
  }

  .ant-row .ant-form-item {
    margin-bottom: 0px !important;
    width: 300px !important;
  }

  .ant-form-item-with-help {
    margin-bottom: 0px !important;
  }

  .ant-form-explain {
    display: none !important;
  }

  .ant-radio-wrapper {
    width: 100%;
  }
`;

const FormItem = Form.Item;

const radioStyle = {
  display: 'block',
};

// eslint-disable-next-line react/prefer-stateless-function
class HubspotLogin extends React.Component {
  state = {
    token: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { authIntegration, chosenIntegration, leadType } = this.props;
    authIntegration(leadType, chosenIntegration, this.state);
  };

  setToken = (e) => {
    this.setState({
      token: e.target.value
    })
  }

  render() {
    let btnDisabled = false;
    if(this.state.token == '' || this.state.token == null){
      btnDisabled = true;
    }
    return (
      <div className="box-div">
        <img src={Hubspot} />
        <span className="login-span">Please login using your HubSpot API Key</span>
        <FormWrapper>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
                <Input
                  prefix={
                    <Icon
                      type="link"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  placeholder="Enter your HubSpot API Key"
                  onChange={this.setToken.bind(this)}
                />
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={btnDisabled}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </FormWrapper>
      </div>
    );
  }
}

HubspotLogin.propTypes = {
  authIntegration: PropTypes.func,
  chosenIntegration: PropTypes.string,
  leadType: PropTypes.string,
};

export default HubspotLogin;
