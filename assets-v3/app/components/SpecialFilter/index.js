/**
 *
 * SpecialFilter
 *
 */

import React, { PropTypes } from 'react';
import { Tooltip, Dropdown, Modal, Badge, Drawer, Button } from 'antd';
import Menu, { MenuItem, Divider } from 'rc-menu';
import FreshdeskWidget from '@personare/react-freshdesk-widget';
import theme from 'styles/theme';
import Integrations from 'containers/Integrations';

import { SpecialFilterWrapper, BtnWrapper } from './css';
import Credits from '../Credits';
import UserProfile from '../UserProfile';
import CreditsUsage from '../CreditsUsage';
import ManageUsers from '../ManageUsers';
import Book from 'assets/icons/book.png';
import Avatar from 'assets/icons/avatar.png';

class SpecialFilter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    let purchaseModal = false;
    if (window.location.href.includes('subscription=active') ||
        window.location.href.includes('topup=complete')) {
      purchaseModal = true;
    }
    this.state = {
      visible: false,
      purchaseModal,
      dropdown: [],
      selected: '',
      type: 'help',
      showSettingsDropdown: false,
      userProfileModal: false,
      creditsUsageModal: false,
      activeKey: "2",
      manageUsersModal: false,

    };
    this.selectSpecialFilterHandler = this.selectSpecialFilterHandler.bind(
      this
    );
    this.openFaq = this.openFaq.bind(this);
  }

  selectSpecialFilterHandler(category) {
    this.props.specialFilter(category);
    const selectedKeyword = {
      type: 'My unlocked',
      category,
      filters: category,
      name: `${category}s`,
    };
    this.props.addKeyword(selectedKeyword);
  }

  openFaq = () => {
    this.props.toggleSidebarDisplay('faq');
  };

  showPurchaseModal = () => {
    this.setState({
      purchaseModal: true,
    });
  };

  hidePurchaseModal = () => {
    this.setState({
      purchaseModal: false,
    });
  };

  changeActiveKey = (activeKey) => {
    this.setState({
      activeKey: activeKey
    })
  }

  showModal = (type) => {
    this.setState({
      visible: true,
      type,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  toggleSidebarDisplay = () => {
    this.props.toggleSidebarDisplay('notifications');
    this.props.readNotifications();
  };

  showModalIntegration = () => {
    this.setState({
      showSettingsDropdown: !this.state.showSettingsDropdown
    })
    this.props.integrationsModalToggle(true, '');
  };

  hideModalIntegration = () => {
    this.setState({
      showSettingsDropdown: !this.state.showSettingsDropdown
    })
    this.props.integrationsModalToggle(false, '');
  };

  handleOkIntegration = () => {
    this.props.integrationsModalToggle(false, '');
  };
  handleCancelIntegration = () => {
    this.props.integrationsModalToggle(false, '');
  };

  toggleUserSettings = () => {
    this.setState({
      showSettingsDropdown: !this.state.showSettingsDropdown
    })
  }

  showUserProfileModal = () => {
    this.setState({
      userProfileModal: true,
    });
  };

  hideUserProfileModal = () => {
    this.setState({
      userProfileModal: false,
    });
  };

  showCreditsUsageModal = () => {
    this.setState({
      creditsUsageModal: true,
    });
  };

  closeCreditsUsageModal = () => {
    this.setState({
      creditsUsageModal: false,
    });
  };

  closeManageUsersModal = () => {
    this.setState({
      manageUsersModal: false,
    });
  };

  showManageUsersModal = () => {
    this.setState({
      manageUsersModal: true,
    });
  };

  openHelp = () => {
    this.props.toggleSidebarDisplay('helpFromBtn');
  };

  render() {
    const menu = (
      <Menu style={{ width: 185, marginTop: 8 }}>
        <MenuItem>
          <a
            onClick={this.showUserProfileModal}
            style={{ color: `${theme.colorNames.black}` }}
          >
            User Profile
          </a>
        </MenuItem>

        <Divider />

        <MenuItem>
          {!this.props.credentials.is_enterprise && (
            <a
              onClick={() =>this.showPurchaseModal()}
              style={{ color: `${theme.colorNames.black}` }}
            >
              Purchase Credits
            </a>
          )}
          {this.props.credentials.is_enterprise && (
            <button
              style={{ color: `${theme.colorNames.black}`, padding: 0 }}
              onClick={() => this.showModal('credit')}
            >
              Purchase Credits
            </button>
          )}
        </MenuItem>

        <MenuItem>
          <a
             onClick={this.showManageUsersModal}
            style={{ color: `${theme.colorNames.black}` }}
          >
            Manage Users
          </a>
        </MenuItem>

        <MenuItem>
          <a
            onClick={this.showCreditsUsageModal}
            style={{ color: `${theme.colorNames.black}` }}
          >
            Consumption History
          </a>
        </MenuItem>

        <Divider />

        <MenuItem>
          <button
            style={{ color: `${theme.colorNames.black}`, padding: 0 }}
            onClick={this.showModalIntegration}
          >
            Manage Integrations
          </button>
        </MenuItem>

        <MenuItem>
          <button
            style={{ color: `${theme.colorNames.black}`, padding: 0 }}
            onClick={this.openFaq}
          >
            FAQ
          </button>
        </MenuItem>

        <MenuItem>
          <button
            style={{ color: `${theme.colorNames.black}`, padding: 0 }}
            onClick={()=> window.open("https://www.leadbook.com/terms-of-use/", "_blank")}
          >
            Terms of Use
          </button>
        </MenuItem>

        <MenuItem>
          <button
            style={{ color: `${theme.colorNames.black}`, padding: 0 }}
            onClick={()=> window.open("https://www.leadbook.com/data-privacy-and-data-processing-agreement/", "_blank")}
          >
            Data Privacy
          </button>
        </MenuItem>
        
        <MenuItem>
          <a
            href="/accounts/logout/"
            style={{ color: `${theme.colorNames.black}` }}
          >
            Logout
          </a>
        </MenuItem>
      </Menu>
    );

    return (
      <div style={{ display: 'inline-flex', float: 'right' }}>
        <BtnWrapper>
          <Button onClick={this.openHelp}>
            <img src={Book} style={{'verticalAlign':'text-top', 'marginRight':'5px', 'height': '17px'}} />
            How It Works
          </Button>
        </BtnWrapper>
        <ManageUsers
          manageUsersModal={this.state.manageUsersModal}
          closeManageUsersModal={this.closeManageUsersModal}
          usersInfo={this.props.usersInfo}
          getUsersInfo={this.props.getUsersInfo}
          addUserInvitation={this.props.addUserInvitation}
          sendInvitationLoading={this.props.sendInvitationLoading}
          updateManageUser={this.props.updateManageUser}
          updateManageUserLoading={this.props.updateManageUserLoading}
          activateOrDeactivateManageUser={this.props.activateOrDeactivateManageUser}
          activateOrDeactivateManageUserLoading={this.props.activateOrDeactivateManageUserLoading}
          sendInvitationErrorLoading={this.props.sendInvitationErrorLoading}
        />
        <CreditsUsage
          creditsUsage={this.props.creditsUsage}
          getCreditsUsage={this.props.getCreditsUsage}
          creditsUsageModal={this.state.creditsUsageModal}
          closeCreditsUsageModal={this.closeCreditsUsageModal}
          credits={this.props.credits}
          userProfile={this.props.userProfile}
        />
        <UserProfile
          userProfileModal={this.state.userProfileModal}
          hideUserProfileModal={this.hideUserProfileModal}
          userProfile={this.props.userProfile}
          updateUserProfile={this.props.updateUserProfile}
          userProfileLoading={this.props.userProfileLoading}
          sendEmailVerificationCode={this.props.sendEmailVerificationCode}
          emailVerificationResponse={this.props.emailVerificationResponse}
          emailVerificationLoading={this.props.emailVerificationLoading}
          getCredentials={this.props.getCredentials}
          fetchPersonalInfo={this.props.fetchPersonalInfo}
          passwordLoading={this.props.passwordLoading}
          changePassword={this.props.changePassword}
        />
        <Credits
          credits={this.props.credits}
          credentials={this.props.credentials}
          topUpPricingList={this.props.topUpPricingList}
          getTopUpPricingCost={this.props.getTopUpPricingCost}
          topUpPricingCost={this.props.topUpPricingCost}
          getTopUpRequest={this.props.getTopUpRequest}
          showPurchaseModal={this.showPurchaseModal}
          hidePurchaseModal={this.hidePurchaseModal}
          changeActiveKey={this.changeActiveKey}
          purchaseModal={this.state.purchaseModal}
          activeKey={this.state.activeKey}
          plans={this.props.plans}
          subscribeRequest={this.props.subscribeRequest}
          subscribePlan={this.props.subscribePlan}
          subscribePlanResponse={this.props.subscribePlanResponse}
          subscribePlanLoading={this.props.subscribePlanLoading}
          subscription={this.props.subscription}
          topUpResponse={this.props.topUpResponse}
          topUpLoading={this.props.topUpLoading}
          topUp={this.props.topUp}
          payments={this.props.payments}
          cancelSubscription={this.props.cancelSubscription}
          topUpCheckoutSession={this.props.topUpCheckoutSession}
          checkoutLoading={this.props.checkoutLoading}
          getTopUpCheckoutSession={this.props.getTopUpCheckoutSession}
          stripeConfig={this.props.stripeConfig}
          subscriptionCheckoutSession={this.props.subscriptionCheckoutSession}
          getSubscriptionCheckoutSession={this.props.getSubscriptionCheckoutSession}
          cancelLoading={this.props.cancelLoading}
          planAmount={this.props.planAmount}
          getPlanAmount={this.props.getPlanAmount}
          planAmountLoading={this.props.planAmountLoading}
          resetPlanAmount={this.props.resetPlanAmount}
        />
        <SpecialFilterWrapper>
          <Tooltip placement="bottom" title="Get Help">
            <button
              style={{ height: 40 }}
              onClick={() => this.showModal('help')}
            >
              <i
                className="anticon anticon-question-circle"
                style={{
                  color: `${theme.colorNames.white}`,
                  width: '18px',
                  marginLeft: '5px',
                  fontSize: '20px',
                  verticalAlign: 'super'
                }}
              >

              </i>
            </button>
          </Tooltip>
          <Tooltip placement="bottom" title="Notifications">
            <button
              style={{ "height": "40px", "width": "fit-content", "marginRight": "10px","position":"relative" }}
              onClick={() => this.toggleSidebarDisplay()}
            >
              <Badge count={this.props.unreadNotifications} />
              <i
                className="material-icons"
                style={{
                  color: `${theme.colorNames.white}`,
                  width: '18px'
                }}
              >
                notifications
              </i>
            </button>
          </Tooltip>
          <Dropdown size="large"
            overlay={menu}
            trigger={['click']}
            onVisibleChange={() => this.toggleUserSettings()}
          >
            <label style={{"verticalAlign":"text-bottom", "marginBottom":"0px"}}>
              <div className="avatar">
                <img src={Avatar} style={{'height':'30px'}}/>
              </div>
              {this.props.credentials.user_name || ''}<br />
              <div style={{'maxWidth':'200px', 'whiteSpace':'nowrap', 'overflow':'hidden', 'textOverflow':'ellipsis'}}>{this.props.credentials.name || ''}</div>
              {
                this.state.showSettingsDropdown ?
                <i className="anticon anticon-caret-up"></i>
                :
                <i className="anticon anticon-caret-down"></i>
              }

            </label>
          </Dropdown>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[]}
          >
            <FreshdeskWidget
              url="https://leadbook.freshdesk.com"
              formTitle={
                this.state.type === 'credit' ? 'Purchase Credits' : 'Get Help'
              }
            />
          </Modal>
          {this.props.showIntModal && (
            <Drawer
              title={
                <span>
                    <span 
                    className="ant-card-head-title"
                    style={{ padding: '0px' }}
                    >
                      <img src="https://img.icons8.com/metro/100/000000/share.png" height='16px'></img>
                      <span style={{ marginLeft: 5, fontSize: 17 }}>
                      Integration
                      </span>
                    </span>
                    <button onClick={this.hideModalIntegration} className="custome-close">
                      <i
                        className="material-icons"
                        style={{ color: '#999999' }}
                      >
                        cancel
                      </i>
                    </button>
                </span>
                }
              width={720}
              visible={this.props.showIntModal}
              onClose={this.handleCancelIntegration}
              closable={false}
            >
              <Integrations handleOkIntegration={this.handleOkIntegration} />
            </Drawer>
          )}
        </SpecialFilterWrapper>
      </div>
    );
  }
}

SpecialFilter.propTypes = {
  specialFilter: PropTypes.func,
  addKeyword: PropTypes.func,
  toggleSidebarDisplay: PropTypes.func,
  readNotifications: PropTypes.func,
  getIntegrationStatus: PropTypes.func,
  integrationsModalToggle: PropTypes.func,
  credits: PropTypes.number,
  unreadNotifications: PropTypes.number,
  showIntModal: PropTypes.bool,
  credentials: PropTypes.object,
  topUpPricingList: PropTypes.array,
  getTopUpPricingCost: PropTypes.func,
  topUpPricingCost: PropTypes.object,
  getTopUpRequest: PropTypes.func,
  plans: PropTypes.array,
  subscribeRequest: PropTypes.func,
  subscribePlan: PropTypes.func,
  subscribePlanResponse: PropTypes.object,
  subscribePlanLoading: PropTypes.bool,
  subscription: PropTypes.object,
  topUpResponse: PropTypes.object,
  topUpLoading: PropTypes.bool,
  topUp: PropTypes.func,
  payments: PropTypes.array,
  cancelSubscription: PropTypes.func,
  getTopUpCheckoutSession: PropTypes.func,
  checkoutLoading: PropTypes.bool,
  topUpCheckoutSession: PropTypes.object,
  stripeConfig: PropTypes.object,
  subscriptionCheckoutSession: PropTypes.object,
  getSubscriptionCheckoutSession: PropTypes.func,
  cancelLoading: PropTypes.bool,
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
  creditsUsage: PropTypes.array,
  getCreditsUsage: PropTypes.func,
  credits: PropTypes.number,
  usersInfo: PropTypes.object,
  getUsersInfo: PropTypes.func,
  addUserInvitation: PropTypes.func,
  sendInvitationLoading: PropTypes.bool,
  updateManageUser: PropTypes.func,
  updateManageUserLoading: PropTypes.bool,
  activateOrDeactivateManageUser: PropTypes.func,
  activateOrDeactivateManageUserLoading: PropTypes.bool,
  sendInvitationErrorLoading: PropTypes.bool,
  planAmountLoading: PropTypes.bool,
  planAmount: PropTypes.object,
  getPlanAmount: PropTypes.func,
  resetPlanAmount: PropTypes.func,
};

export default SpecialFilter;
