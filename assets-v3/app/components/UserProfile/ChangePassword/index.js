/**
 *
 * UserProfile
 *
 */
/* eslint-disable camelcase, jsx-a11y/href-no-hash, jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import {
  Drawer, Row, Col, Input
} from 'antd';

import { Title, StyledButton, FieldInfo } from '../css';

const InfoPassword = 'Keep your data safe by creating a password  that is complex and long enough. It should be easy for you to remember but hard for others to guess.';

const passwordObj = {
  current_password: '',
  new_password: '',
  confirm_password: '',
};

class ChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      passwordObject: passwordObj,
      onSave: false,
    };
  }

  handleChange = (key, value) => {
    return this.setState({
      passwordObject: { ...this.state.passwordObject, [key]: value },
    });
  };

  handleClose = () => {
    this.props.closePasswordChange();
    this.setState(
      {
        passwordObject: passwordObj,
      }
    );
  };

  handleCancel = () => {
    this.props.closePasswordChange();
    this.setState(
      {
        passwordObject: passwordObj,
        onSave: false,
      }
    );
  };

  handleSave = () => {
    this.setState({ onSave: true });
    const { passwordObject } = this.state;
    const { current_password, new_password, confirm_password } = passwordObject;
    if (current_password && new_password && confirm_password) {
      this.props.changePassword(passwordObject);
      this.setState(
        {
          passwordObject: passwordObj,
          onSave: false,
        }
      );
    }
  };


  render() {
    const { passwordObject, onSave } = this.state;
    return (
      <Drawer
        title="Change Password"
        visible={this.props.visibleChangePassword}
        onClose={() => this.handleClose()}
        width="550"
        style={{ padding: '0px' }}
      >

        <div className="keep-your-data-safe" style={{ padding: 20, marginBottom: '40px' }}>
          {InfoPassword}
        </div>

        <div className="margin-top" style={{ padding: 20 }}>
          <Row>
            <Col span={8}>
              <Title>Current password</Title>
            </Col>
            <Col span={16}>
              <Input
                style={{ marginBottom: 30 }}
                type="password"
                placeholder='Current password'
                value={passwordObject.current_password}
                onChange={(e) => this.handleChange('current_password', e.target.value)} />
              {
                (!passwordObject.current_password && onSave) && (
                  <FieldInfo>
                    Please enter current password
                  </FieldInfo>
                )
              }
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Title>New password</Title>
            </Col>
            <Col span={16}>
              <Input
                style={{ marginBottom: 30 }}
                type="password"
                placeholder='New password'
                value={passwordObject.new_password}
                onChange={(e) => this.handleChange('new_password', e.target.value)} />
              {
                (!passwordObject.new_password && onSave) && (
                  <FieldInfo>
                    Please enter new password
                  </FieldInfo>
                )
              }
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Title>Confirm password</Title>
            </Col>
            <Col span={16}>
              <Input
                style={{ marginBottom: 30 }}
                type="password"
                placeholder='Confirm password'
                value={passwordObject.confirm_password}
                onChange={(e) => this.handleChange('confirm_password', e.target.value)} />
              {
                (!passwordObject.confirm_password && onSave) && (
                  <FieldInfo>
                    Please enter confirm password
                  </FieldInfo>
                )
              }
            </Col>
          </Row>
        </div>

        <div className="inline-flex right" style={{ padding: 20, marginTop: '20px' }}>
          <StyledButton
            style={{ marginRight: '10px' }}
            onClick={() => this.handleCancel()}>
            Cancel
            </StyledButton>
          <StyledButton type="primary" onClick={() => this.handleSave()}
            loading={this.props.passwordLoading}>Change Password</StyledButton>
        </div>
      </Drawer>
    )
  }
}

ChangePassword.propTypes = {
  closePasswordChange: PropTypes.func,
  visibleChangePassword: PropTypes.bool,
  changePassword: PropTypes.func,
  passwordLoading: PropTypes.bool,
};

export default ChangePassword;
