/**
 *
 * ZohoLogin
 *
 */
import React, { PropTypes } from 'react';
import { Radio, Form, Icon, Input, Button } from 'antd';
import styled from 'styled-components';

import Zoho from 'assets/zoho.png';

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
class ZohoLogin extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      'username': null,
      'password': null
    }
  }

  onChange(field, e){
    switch(field){
      case 'username': this.setState({
        username: e.target.value
      }); break;

      case 'password': this.setState({
        password: e.target.value
      }); break;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { authIntegration, chosenIntegration, leadType } = this.props;
    authIntegration(leadType, chosenIntegration, this.state);
  };


  render() {
    let btnDisabled = false;
    if(this.state.username == '' || this.state.password == ''){
      btnDisabled = true;
    }
    return (
      <div className="box-div">
        <img src={Zoho} />
        <span className="login-span">Please login using your Username and Password</span>
        <FormWrapper>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem style={{"marginBottom":"10px"}}>
              <Input
                prefix={
                  <Icon
                    type="user"
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />
                }
                placeholder=" Email"
                onChange={this.onChange.bind(this, 'username')}
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={
                  <Icon
                    type="lock"
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />
                }
                type="password"
                placeholder=" Password"
                onChange={this.onChange.bind(this, 'password')}
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

ZohoLogin.propTypes = {
  form: PropTypes.object,
  authIntegration: PropTypes.func,
  chosenIntegration: PropTypes.string,
  leadType: PropTypes.string,
};

export default ZohoLogin;
