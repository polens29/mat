/**
 *
 * AddUser
 *
 */
/* eslint-disable camelcase, jsx-a11y/href-no-hash, jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import {
  Row, Col, Input, Icon, Select,
} from 'antd';

import { Title, StyledButton, FieldInfo } from '../css';


const Option = Select.Option;


class AddUser extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { userObject, handleChange, handleBack, handleCancel, handleAddUser, onSave, roles, sendInvitationLoading } = this.props;
    return (
      <div>
        <Title onClick={handleBack}>
          <Icon type="arrow-left" style={{ marginRight: 20 }} />
          <span style={{ color: '#000', fontSize: '16px', fontWeight: 400 }}>Add New User</span>
        </Title>

        <div className="margin-top" style={{ padding: '50px 60px 20px 60px' }}>
          <Row>
            <Col span={8}>
              <Title>First Name</Title>
            </Col>
            <Col span={16}>
              <Input
                style={{ marginBottom: 30 }}
                placeholder='First Name'
                value={userObject.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Title>Last Name</Title>
            </Col>
            <Col span={16}>
              <Input
                style={{ marginBottom: 30 }}
                placeholder='Last Name'
                value={userObject.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Title>Business Email</Title>
            </Col>
            <Col span={16} style={{ marginBottom: 30 }}>
              <Input
                type="email"
                placeholder='Business Email'
                value={userObject.email}
                onChange={(e) => handleChange('email', e.target.value)} />
              {
                (!userObject.email && onSave) && (
                  <FieldInfo>
                    Please enter Business Email
                  </FieldInfo>
                )
              }
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Title>Permission Set</Title>
            </Col>
            <Col span={16}>
              <Select
                defaultValue={roles[1].label}
                style={{ width: 300 }}
                onChange={(value) => handleChange('is_superuser', value)}
              >
                {roles.map((item) => <Option key={item.value}>{item.label}</Option>)}
              </Select>
            </Col>
          </Row>
        </div>

        <div className="inline-flex right" style={{ padding: 20, marginTop: '20px' }}>
          <StyledButton
            style={{ marginRight: '10px' }}
            onClick={() => handleCancel()}>
            Cancel
            </StyledButton>
          <StyledButton type="primary" onClick={() => handleAddUser()}
            loading={sendInvitationLoading}>Send Invite</StyledButton>
        </div>
      </div>
    )
  }
}

AddUser.propTypes = {
  handleBack: PropTypes.func,
  handleCancel: PropTypes.func,
  handleChange: PropTypes.func,
  handleAddUser: PropTypes.func,
  userObject: PropTypes.object,
  onSave: PropTypes.bool,
  roles: PropTypes.array,
  sendInvitationLoading: PropTypes.bool,
};

export default AddUser;
