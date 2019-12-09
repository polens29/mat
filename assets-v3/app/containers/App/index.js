/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Faq from 'components/Faq';

import {
  makeSelectList,
  makeSelectKeywords,
  makeSelectSearchParams,
  makeSelectCategories,
  makeSelectActiveSpecialFilter,
  makeSelectSearchValue,
  makeSelectTotal,
  makeSelectCampaigns,
} from 'containers/HomePage/selectors';
import { makeSelectShowModal } from 'containers/Integrations/selectors';

import {
  getIntegrationStatus,
  integrationsModalToggle,
} from 'containers/Integrations/actions';

import { getlbLists } from 'containers/Lists/actions';

import {
  specialFilters,
  selectCategories,
  setSearchValue,
  addKeywords,
  removeKeywords,
  setKeywords,
} from 'containers/HomePage/actions';

import {
  fetchPersonalInfo,
  getCredentials,
  toggleSidebarDisplay,
  readUserNotifications,
  fetchUserNotifications,
  getTopUpPricingList,
  getTopUpPricingCost,
  getTopUpRequest,
  getPlans,
  subscribeRequest,
  subscribePlan,
  getSubscription,
  topUp,
  getPayments,
  cancelSubscription,
  getTopUpCheckoutSession,
  getStripeConfig,
  getSubscriptionCheckoutSession,
  getUserProfile,
  updateUserProfile,
  sendEmailVerificationCode,
  changePassword,
  getCreditsUsage,
  getUsersInfo,
  addUserInvitation,
  updateManageUser,
  activateOrDeactivateManageUser,
  getPlanAmount,
  resetPlanAmount,
} from './actions';

import {
  makeSelectCredentials,
  makeSelectSidebarDisplay,
  makeSelectCredits,
  makeSelectNotifications,
  makeSelectUnreadNotifications,
  makeSelectTopUpPricingList,
  makeSelectTopUpPricingCost,
  makeSelectPlans,
  makeSelectSubscribePlanResponse,
  makeSelectSubscribePlanLoading,
  makeSelectSubscription,
  makeSelectTopUpResponse,
  makeSelectTopUpLoading,
  makeSelectPayments,
  makeSelectCheckoutLoading,
  makeSelectTopUpCheckoutSession,
  makeSelectStripeConfig,
  makeSelectSubscriptionCheckoutSession,
  makeSelectCancelLoading,
  makeSelectUserProfile,
  makeSelectUserProfileLoading,
  makeSelectEmailVerificationResponse,
  makeSelectEmailVerificationLoading,
  makeSelectPasswordLoading,
  makeSelectCreditsUsage,
  makeSelectUsersInfo,
  makeSelectSendInvitationLoading,
  makeSelectUpdateManageUserLoading,
  makeSelectActivateOrDeactivateManageUserLoading,
  makeSelectSendInvitationErrorLoading,
  makeSelectPlanAmount,
  makeSelectPlanAmountLoading,
  makeSelectfromBtn
} from './selectors';

export class App extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  componentDidMount() {
    // Fetch credentials and remaining credits on page load
    this.props.getCredentials();
    this.props.fetchPersonalInfo();
    this.props.fetchNotfications();
    this.props.getTopUpPricingList();
    this.props.getPlans();
    this.props.getSubscription();
    this.props.getPayments();
    this.props.getStripeConfig();
    this.props.getUserProfile();

    // polling to request every minute
    this.interval = setInterval(this.props.fetchNotfications, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { sidebarDisplay } = this.props;

    return (
     
        <div>
         
          {React.Children.toArray(this.props.children)}
        </div>
      
    );
  }
}

App.propTypes = {
  fetchPersonalInfo: PropTypes.func,
  fetchNotfications: PropTypes.func,
  getCredentials: PropTypes.func,
  toggleSidebarDisplay: PropTypes.func,
  sidebarDisplay: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  getTopUpPricingList: PropTypes.func,
  getPlans: PropTypes.func,
  getSubscription: PropTypes.func,
  getPayments: PropTypes.func,
  getStripeConfig: PropTypes.func,
  getUserProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  credentials: makeSelectCredentials(),
  sidebarDisplay: makeSelectSidebarDisplay(),
  topUpPricingList: makeSelectTopUpPricingList(),
  topUpPricingCost: makeSelectTopUpPricingCost(),
  unreadNotifications: makeSelectUnreadNotifications(),
  showIntModal: makeSelectShowModal(),
  notifications: makeSelectNotifications(),
  credits: makeSelectCredits(),
  list: makeSelectList(),
  keywords: makeSelectKeywords(),
  category: makeSelectCategories(),
  activeSpecialFilter: makeSelectActiveSpecialFilter(),
  searchValue: makeSelectSearchValue(),
  total: makeSelectTotal(),
  campaigns: makeSelectCampaigns(),
  plans: makeSelectPlans(),
  subscribePlanResponse: makeSelectSubscribePlanResponse(),
  subscribePlanLoading: makeSelectSubscribePlanLoading(),
  subscription: makeSelectSubscription(),
  topUpResponse: makeSelectTopUpResponse(),
  topUpLoading: makeSelectTopUpLoading(),
  payments: makeSelectPayments(),
  topUpCheckoutSession: makeSelectTopUpCheckoutSession(),
  checkoutLoading: makeSelectCheckoutLoading(),
  stripeConfig: makeSelectStripeConfig(),
  subscriptionCheckoutSession: makeSelectSubscriptionCheckoutSession(),
  cancelLoading: makeSelectCancelLoading(),
  userProfile: makeSelectUserProfile(),
  userProfileLoading: makeSelectUserProfileLoading(),
  emailVerificationResponse: makeSelectEmailVerificationResponse(),
  emailVerificationLoading: makeSelectEmailVerificationLoading(),
  passwordLoading: makeSelectPasswordLoading(),
  creditsUsage: makeSelectCreditsUsage(),
  usersInfo: makeSelectUsersInfo(),
  sendInvitationLoading: makeSelectSendInvitationLoading(),
  sendInvitationErrorLoading: makeSelectSendInvitationErrorLoading(),
  updateManageUserLoading: makeSelectUpdateManageUserLoading(),
  activateOrDeactivateManageUserLoading: makeSelectActivateOrDeactivateManageUserLoading(),
  planAmount: makeSelectPlanAmount(),
  planAmountLoading: makeSelectPlanAmountLoading(),
  searchParams: makeSelectSearchParams(),
  fromBtn: makeSelectfromBtn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchNotfications: () => dispatch(fetchUserNotifications()),
    readNotifications: () => dispatch(readUserNotifications()),
    toggleSidebarDisplay: (display) => {
      dispatch(toggleSidebarDisplay(display));
    },
    fetchPersonalInfo: () => dispatch(fetchPersonalInfo()),
    getCredentials: () => dispatch(getCredentials()),
    getlbLists: () => dispatch(getlbLists()),

    addKeyword: (keyword) => dispatch(addKeywords(keyword)),
    removeKeyword: (list, params) => dispatch(removeKeywords(list, params)),

    specialFilter: (category, activeSpecialFilter) =>
      dispatch(specialFilters(category, activeSpecialFilter)),
    selectCategory: (category) => dispatch(selectCategories(category)),
    setSearchValue: (value) => dispatch(setSearchValue(value)),
    getIntegrationStatus: (leadType, integrationType) =>
      dispatch(getIntegrationStatus(leadType, integrationType)),
    integrationsModalToggle: (status, integrationType) =>
      dispatch(integrationsModalToggle(status, integrationType)),
    getTopUpPricingList: () => dispatch(getTopUpPricingList()),
    getTopUpPricingCost: (credits) => dispatch(getTopUpPricingCost(credits)),
    getTopUpRequest: (payload) => dispatch(getTopUpRequest(payload)),
    getPlans: () => dispatch(getPlans()),
    subscribeRequest: (payload) => dispatch(subscribeRequest(payload)),
    subscribePlan: (payload) => dispatch(subscribePlan(payload)),
    getSubscription: () => dispatch(getSubscription()),
    topUp: (payload) => dispatch(topUp(payload)),
    getPayments: () => dispatch(getPayments()),
    cancelSubscription: (payload) => dispatch(cancelSubscription(payload)),
    getTopUpCheckoutSession: (payload) => dispatch(getTopUpCheckoutSession(payload)),
    getStripeConfig: () => dispatch(getStripeConfig()),
    getSubscriptionCheckoutSession: (payload) => dispatch(getSubscriptionCheckoutSession(payload)),
    getUserProfile: () => dispatch(getUserProfile()),
    updateUserProfile: (payload) => dispatch(updateUserProfile(payload)),
    sendEmailVerificationCode: (payload) => dispatch(sendEmailVerificationCode(payload)),
    changePassword: (payload) => dispatch(changePassword(payload)),
    getCreditsUsage: () => dispatch(getCreditsUsage()),
    getUsersInfo: (is_active) => dispatch(getUsersInfo(is_active)),
    addUserInvitation: (payload) => dispatch(addUserInvitation(payload)),
    updateManageUser: (payload) => dispatch(updateManageUser(payload)),
    activateOrDeactivateManageUser: (payload) => dispatch(activateOrDeactivateManageUser(payload)),
    setKeywords: (keywords, searchParams) => dispatch(setKeywords(keywords, searchParams)),
    getPlanAmount: (payload) => dispatch(getPlanAmount(payload)),
    resetPlanAmount: () => dispatch(resetPlanAmount()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
