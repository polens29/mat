/**
 *
 * PipedriveIntegration
 *
 */
import React, { PropTypes } from 'react';
import { Radio, Form, Icon, Input, Button } from 'antd';
import styled from 'styled-components';

import Pipedrive from 'assets/pipedrive_logo.png';

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
class PipedriveLogin extends React.Component {
  state = {
    value: 1,
    username: '',
    password: ''
  };

  componentWillMount(){
    this.props.form.setFieldsValue({
      email: null,
      password: null
    });
  }

  onChange = (e) => {
    this.props.form.resetFields();
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { authIntegration, chosenIntegration, leadType } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let new_values = {};
        for (var key in values) {
          if(values[key] != null){
            new_values[key] = values[key];
          }
        }
        authIntegration(leadType, chosenIntegration, new_values);
      }
    });
  };

  setValue = (value, e) => {
    this.setState({
      value
    })

    if(value == 1){
      this.props.form.setFieldsValue({
        email: null,
        password: null,
      });
    }
  }

  setFields(field, e){
    if(field=='username'){
      this.setState({
        username: e.target.value
      })
    }
    else {
      this.setState({
        password: e.target.value
      })
    }
    
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let btnDisabled = false;
    if(this.state.username == '' || this.state.password == ''){
      btnDisabled = true;
    }
    return (
      <div className="box-div">
        <img src={Pipedrive} />
        <span className="login-span">Please login using your Pipedrive Access Token or enter your Username and Password</span>
        <FormWrapper>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem style={{"marginBottom":"10px"}}>
              {getFieldDecorator('email', { 
                rules: [{ required: this.state.value === 2 }], 
              })(
                <Input
                  prefix={
                    <Icon
                      type="user"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  placeholder=" Email"
                  onClick={this.setValue.bind(this, 2)}
                  onChange={this.setFields.bind(this, 'username')}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', { 
                rules: [{ required: this.state.value === 2 }], 
              })(
                <Input
                  prefix={
                    <Icon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  type="password"
                  placeholder=" Password"
                  onClick={this.setValue.bind(this, 2)}
                  onChange={this.setFields.bind(this, 'password')}
                />
              )}
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

PipedriveLogin.propTypes = {
  form: PropTypes.object,
  authIntegration: PropTypes.func,
  chosenIntegration: PropTypes.string,
  leadType: PropTypes.string,
};

const PipedriveLoginForm = Form.create()(PipedriveLogin);

export default PipedriveLoginForm;
