/**
 *
 * UserProfile
 *
 */
/* eslint-disable camelcase, jsx-a11y/href-no-hash, jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import theme from 'styles/theme';
import {
  Drawer, Row, Col, Input, notification, Modal, Icon
} from 'antd';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import ChangePassword from './ChangePassword';
import UserIcon from "../../assets/svg/UserIcon";

import { Wrapper, Title, Content, StyledButton, BusinessFieldInfo } from './css';

const DescriptionItem = ({ title, name, content, handleChange, isEditable, disable, isPhoneNumber, isBusinessEmailConfirmed, isEmailBusinessEmail }) => (
  <div>
    <Row>
      <Col span={8}>
        <Title>{title}:</Title>
      </Col>
      <Col span={16}>
        <div style={{ height: 70 }}>
          {!isEditable && <Content>{content}</Content>}
          {(isEditable && !isPhoneNumber) &&
            <Input
              value={content}
              onChange={(e) => handleChange(name, e.target.value)}
              disabled={disable} />
          }
          {(isEditable && isPhoneNumber) &&
            <IntlTelInput
              containerClassName="intl-tel-input"
              preferredCountries={['sg']}
              inputClassName="form-control"
              defaultValue={content}
              onPhoneNumberChange={(status, value, countryData, number, id) => handleChange(name, number)}
            />
          }
          {
            (isEditable && !isEmailBusinessEmail && !isBusinessEmailConfirmed && name === 'business_email') && (
              <BusinessFieldInfo>
                Enter business email to get
                    <span style={{ color: theme.colorNames.green }}> 10 credits free </span>
                and
                    <span style={{ color: '#53C41B' }}> add unlimited users </span>
              </BusinessFieldInfo>
            )
          }
        </div>
      </Col>
    </Row>
  </div>
);

const userProfileObj = {
  first_name: '',
  last_name: '',
  email: '',
  business_email: '',
  company_name: '',
  phone_number: '',
  is_social_account: false,
  is_business_email_confirmed: false,
  is_email_business_email: false,
  show_guided_flow: true
}

class UserProfile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      userProfileObject: userProfileObj,
      showConfirmModal: false,
      verificationCode: '',
      visibleChangePassword: false,
      userProfileModal: false,
    };
  }

  componentWillReceiveProps(props) {
    this.checkUserProfile(props);
    this.checkUserProfileLoading(props);
    this.checkEmailVerificationLoading(props);
    this.checkUserProfileModal(props);
  }

  checkUserProfileModal(nextProps) {
    if(nextProps.userProfileModal != undefined && nextProps.userProfileModal != this.state.userProfileModal){
      this.setState({userProfileModal: nextProps.userProfileModal});
    }
  };

  checkUserProfile(props) {
    const userProfile = this.props.userProfile;
    const newUserProfile = props.userProfile;
    if (newUserProfile.id && userProfile.id != newUserProfile.id) {
      this.setState({
        userProfileObject: {
          ...newUserProfile,
        }
      }, () => {
        if (newUserProfile.is_email_business_email) {
          this.setState({
            userProfileObject: { ...this.state.userProfileObject, 
              business_email: newUserProfile.email,
              is_business_email_confirmed: true,
            },
          });
        }
      });
    }
  };

  checkUserProfileLoading(props) {
    const userProfileLoading = this.props.userProfileLoading;
    const newUserProfileLoading = props.userProfileLoading;
    if (newUserProfileLoading === false && userProfileLoading != newUserProfileLoading) {
      this.setState(
        {
          isEditable: false,
          showConfirmModal: false,
          verificationCode: '',
        }
      );
      this.props.getCredentials();
      this.props.fetchPersonalInfo();
    }
  };

  checkEmailVerificationLoading(props) {
    const emailVerificationLoading = this.props.emailVerificationLoading;
    const newEmailVerificationLoading = props.emailVerificationLoading;
    if (newEmailVerificationLoading === false && emailVerificationLoading !== newEmailVerificationLoading) {
      const { verification_code } = props.emailVerificationResponse;
      if (verification_code) {
        this.setState(
          {
            showConfirmModal: true,
          }
        );
      }
    }
  };

  handleChange = (key, value) => {
    return this.setState({
      userProfileObject: { ...this.state.userProfileObject, [key]: value },
    });
  };

  handleClose = () => {
    this.props.hideUserProfileModal();
  };

  handleCancel = () => {
    this.setState(
      {
        isEditable: false,
      }
    );
  };

  handleEdit = () => {
    this.setState(
      {
        isEditable: true,
      }
    );
  };

  updateCode = (e) => {
    this.setState({
      verificationCode: e.currentTarget.value,
    });
  };

  handleSaveUpdate = () => {
    const { userProfile } = this.props;
    let { userProfileObject } = this.state;
    userProfileObject = {
      ...userProfileObject,
      show_guided_flow: userProfile.show_guided_flow
    }
    if (!userProfileObject.business_email) {
      this.props.updateUserProfile(userProfileObject);
    }
    else if (userProfileObject.business_email === userProfile.business_email && userProfileObject.is_business_email_confirmed) {
      this.props.updateUserProfile(userProfileObject);
    }
    else if (userProfileObject.email === userProfileObject.business_email && userProfileObject.is_email_business_email) {
      this.setState({
        userProfileObject: {
          ...this.state.userProfileObject,
          is_business_email_confirmed: true
        },
      }, () => {
        this.props.updateUserProfile(this.state.userProfileObject);
      });
    }
    else {
      const payload = { business_email: userProfileObject.business_email };
      this.props.sendEmailVerificationCode(payload);
    }
  };

  resendCode = () => {
    const { userProfileObject } = this.state;
    const payload = {
      business_email: userProfileObject.business_email,
    };
    this.props.sendEmailVerificationCode(payload);
  };

  handleOk = () => {
    const { verificationCode } = this.state;
    const { emailVerificationResponse, updateUserProfile } = this.props;
    if (emailVerificationResponse.verification_code === verificationCode) {
      this.setState({
        userProfileObject: {
          ...this.state.userProfileObject,
          is_business_email_confirmed: true,
        },
      }, () => {
        updateUserProfile(this.state.userProfileObject);
      }
      );
    }
    else {
      notification.error({
        message: 'Error',
        description: 'Wrong confirmation code',
        placement: 'topRight',
      });
    }
  };

  handleCancelModal = () => {
    this.setState(
      {
        showConfirmModal: false,
      }
    );
  };

  handleChange = (key, value) => {
    return this.setState({
      userProfileObject: { ...this.state.userProfileObject, [key]: value },
    });
  };

  handleClose = () => {
    this.props.hideUserProfileModal();
  };

  handleCancel = () => {
    this.setState(
      {
        isEditable: false,
      }
    );
  };

  handleEdit = () => {
    this.setState(
      {
        isEditable: true,
      }
    );
  };

  handleSave = () => {
    this.props.updateUserProfile(this.state.userProfileObject)
  };

  showPasswordChange = () => {
    this.setState(
      {
        visibleChangePassword: true,
      }
    )
  };

  closePasswordChange = () => {
    this.setState(
      {
        visibleChangePassword: false,
      }
    )
  };

  userProfileModalClose = () => {
    this.setState({userProfileModal: false});
    this.props.hideUserProfileModal();
  };

  render() {
    const { userProfileObject, isEditable, visibleChangePassword } = this.state;
    const { userProfileLoading, emailVerificationLoading, changePassword, passwordLoading } = this.props;
    return (
      <Wrapper>
        <Modal
          title="Business Email Verification code"
          visible={this.state.showConfirmModal}
          onOk={this.handleOk}
          onCancel={this.handleCancelModal}
          okText="Submit"
          cancelText="Cancel"
          wrapClassName="pa-modal-display"
          width={475}
          confirmLoading={userProfileLoading || emailVerificationLoading}
        >
          <div style={{ marginBottom: 20 }}>
            Please check your verification code we have sent to your business email!
            <br /><br />
            <strong>Verification code</strong> <br /><br />
            <Input placeholder="Confirm your verification Code" value={this.state.verificationCode} onChange={this.updateCode} />
            <div style={{ float: "right" }}>
              <a style={{ color: '#108ee9' }} onClick={() => this.resendCode()}>Resend code</a>
            </div>
          </div>
        </Modal>
        <ChangePassword
          visibleChangePassword={visibleChangePassword}
          closePasswordChange={this.closePasswordChange}
          changePassword={changePassword}
          passwordLoading={passwordLoading} />
        <Drawer
          title={
            <span>
                <span 
                className="ant-card-head-title"
                style={{ padding: '0px' }}
                >
                  <UserIcon width="16px" height="16px" />
                  <span style={{ marginLeft: 5, fontSize: 17 }}>
                    User Profile
                  </span>
                </span>
                <button onClick={this.userProfileModalClose} className="custome-close">
                  <i
                    className="material-icons"
                    style={{ color: '#999999' }}
                  >
                    cancel
                  </i>
                </button>
            </span>
            }
          visible={this.state.userProfileModal}
          onClose={() => this.handleClose()}
          width="550"
          style={{ padding: '40px' }}
          closable={false}
        >
          <div>
            <div style={{ height: 30, marginBottom: 20, paddingBottom: 20 }}>
              <a style={{ float: 'right' }} onClick={() => this.handleEdit()}>Edit Profile</a>
            </div>
            <DescriptionItem
              title="First Name"
              name="first_name"
              content={userProfileObject.first_name}
              handleChange={this.handleChange}
              isEditable={isEditable}
              isPhoneNumber={false}
            />
            <DescriptionItem
              title="Last Name"
              name="last_name"
              content={userProfileObject.last_name}
              handleChange={this.handleChange}
              isEditable={isEditable}
              isPhoneNumber={false}
            />
            <DescriptionItem
              title="Company Name"
              name="company_name"
              content={userProfileObject.company_name}
              handleChange={this.handleChange}
              isEditable={isEditable}
              isPhoneNumber={false}
            />
            <DescriptionItem
              title="Email"
              name="email"
              content={userProfileObject.email}
              handleChange={this.handleChange}
              isEditable={isEditable}
              isPhoneNumber={false}
              disable={true}
            />
            <DescriptionItem
              title="Business Email"
              name="business_email"
              content={userProfileObject.business_email}
              handleChange={this.handleChange}
              isEditable={isEditable}
              isPhoneNumber={false}
              isEmailBusinessEmail={userProfileObject.is_email_business_email}
              isBusinessEmailConfirmed={userProfileObject.is_business_email_confirmed}
            />
            <DescriptionItem
              title="Phone Number"
              name="phone_number"
              content={userProfileObject.phone_number}
              handleChange={this.handleChange}
              isEditable={isEditable}
              isPhoneNumber={true}
            />

            <div style={{ marginBottom: 10, fontSize: '14px' }}>
              <a onClick={() => this.showPasswordChange()}>
                Change Password
              </a>
            </div>

            {isEditable && (
              <div className="inline-flex right" style={{ marginTop: '20px' }}>
                <StyledButton
                  style={{ marginRight: '10px' }}
                  onClick={() => this.handleCancel()}>
                  Cancel
                </StyledButton>
                <StyledButton type="primary" onClick={() => this.handleSaveUpdate()}
                  loading={userProfileLoading || emailVerificationLoading}>Save Changes
                </StyledButton>
              </div>
            )
            }
          </div>
        </Drawer>
      </Wrapper>
    )
  }
}

UserProfile.propTypes = {
  hideUserProfileModal: PropTypes.func,
  userProfileModal: PropTypes.bool,
  userProfile: PropTypes.object,
  updateUserProfile: PropTypes.func,
  userProfileLoading: PropTypes.bool,
  sendEmailVerificationCode: PropTypes.func,
  emailVerificationResponse: PropTypes.object,
  emailVerificationLoading: PropTypes.bool,
  getCredentials: PropTypes.func,
  fetchPersonalInfo: PropTypes.func,
  changePassword: PropTypes.func,
  passwordLoading: PropTypes.bool,
};

export default UserProfile;
