import {
  GET_PERSONAL_INFO,
  GET_PERSONAL_INFO_SUCCESS,
  SET_COLUMN_DISPLAY,
  FETCH_USER_NOTIFICATIONS,
  FETCH_USER_NOTIFICATIONS_SUCCESS,
  READ_USER_NOTIFICATIONS,
  READ_USER_NOTIFICATION_SUCCESS,
  GET_CREDENTIALS,
  GET_CREDENTIALS_SUCCESS,
  TOGGLE_SIDEBAR_DISPLAY,
  GET_TOP_UP_PRICING_LIST,
  GET_TOP_UP_PRICING_LIST_SUCCESS,
  GET_TOP_UP_PRICING_COST,
  GET_TOP_UP_PRICING_COST_SUCCESS,
  GET_TOP_UP_REQUEST,
  GET_PLANS,
  GET_PLANS_SUCCESS,
  SUBSCRIBE_REQUEST,
  SUBSCRIBE_PLAN,
  SUBSCRIBE_PLAN_SUCCESS,
  GET_SUBSCRIPTION,
  GET_SUBSCRIPTION_SUCCESS,
  TOP_UP,
  TOP_UP_SUCCESS,
  GET_PAYMENTS,
  GET_PAYMENTS_SUCCESS,
  CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_ERROR,
  GET_TOP_UP_CHECKOUT_SESSION,
  GET_TOP_UP_CHECKOUT_SESSION_SUCCESS,
  GET_STRIPE_CONFIG,
  GET_STRIPE_CONFIG_SUCCESS,
  GET_SUBSCRIPTION_CHECKOUT_SESSION,
  GET_SUBSCRIPTION_CHECKOUT_SESSION_SUCCESS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_ERROR,
  SEND_EMAIL_VERIFICATION_CODE,
  SEND_EMAIL_VERIFICATION_CODE_SUCCESS,
  SEND_EMAIL_VERIFICATION_CODE_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  GET_CREDITS_USAGE,
  GET_CREDITS_USAGE_SUCCESS,
  GET_USERS_INFO,
  GET_USERS_INFO_SUCCESS,
  ADD_USER_INVITATION,
  ADD_USER_INVITATION_SUCCESS,
  UPDATE_MANAGE_USER,
  UPDATE_MANAGE_USER_SUCCESS,
  ACTIVATE_OR_DEACTIVATE_MANAGE_USER,
  ACTIVATE_OR_DEACTIVATE_MANAGE_USER_SUCCESS,
  GET_EMAIL_ADDRESSES,
  GET_EMAIL_ADDRESSES_SUCCESS,
  ADD_USER_INVITATION_ERROR,
  GET_PLAN_AMOUNT,
  GET_PLAN_AMOUNT_SUCCESS,
  RESET_PLAN_AMOUNT,
} from './constants';

export function fetchPersonalInfo() {
  return {
    type: GET_PERSONAL_INFO,
  };
}

export function fetchPersonalInfoSuccess(credits) {
  return {
    type: GET_PERSONAL_INFO_SUCCESS,
    credits,
  };
}

export function setColumnDisplay(category, columns, modalEdit, email) {
  return {
    type: SET_COLUMN_DISPLAY,
    category,
    columns,
    modalEdit,
    email
  };
}

export function fetchUserNotifications() {
  return {
    type: FETCH_USER_NOTIFICATIONS,
  };
}

export function fetchUserNotificationsSuccess(data) {
  return {
    type: FETCH_USER_NOTIFICATIONS_SUCCESS,
    data,
  };
}

export function readUserNotifications() {
  return {
    type: READ_USER_NOTIFICATIONS,
  };
}

export function readUserNotificationsSuccess() {
  return {
    type: READ_USER_NOTIFICATION_SUCCESS,
  };
}

export function getCredentials() {
  return {
    type: GET_CREDENTIALS,
  };
}

export function getCredentialsSuccess(credentials) {
  return {
    type: GET_CREDENTIALS_SUCCESS,
    credentials,
  };
}

export function toggleSidebarDisplay(display) {
  return {
    type: TOGGLE_SIDEBAR_DISPLAY,
    display,
  };
}

// Top-up related actions
export function getTopUpPricingList() {
  return {
    type: GET_TOP_UP_PRICING_LIST,
  };
}

export function getTopUpPricingListSuccess(payload) {
  return {
    type: GET_TOP_UP_PRICING_LIST_SUCCESS,
    payload,
  };
}

export function getTopUpPricingCost(credits) {
  return {
    type: GET_TOP_UP_PRICING_COST,
    credits,
  };
}

export function getTopUpPricingCostSuccess(payload) {
  return {
    type: GET_TOP_UP_PRICING_COST_SUCCESS,
    payload,
  };
}

export function getTopUpRequest(payload) {
  return {
    type: GET_TOP_UP_REQUEST,
    payload,
  };
}

export function getPlans() {
  return {
    type: GET_PLANS,
  };
}

export function getPlansSuccess(payload) {
  return {
    type: GET_PLANS_SUCCESS,
    payload,
  };
}

export function subscribeRequest(payload) {
  return {
    type: SUBSCRIBE_REQUEST,
    payload,
  };
}

export function subscribePlan(payload) {
  return {
    type: SUBSCRIBE_PLAN,
    payload,
  };
}

export function subscribePlanSuccess(payload) {
  return {
    type: SUBSCRIBE_PLAN_SUCCESS,
    payload,
  };
}

export function getSubscription() {
  return {
    type: GET_SUBSCRIPTION,
  };
}

export function getSubscriptionSuccess(payload) {
  return {
    type: GET_SUBSCRIPTION_SUCCESS,
    payload,
  };
}

export function topUp(payload) {
  return {
    type: TOP_UP,
    payload,
  };
}

export function topUpSuccess(payload) {
  return {
    type: TOP_UP_SUCCESS,
    payload,
  };
}

export function getPayments() {
  return {
    type: GET_PAYMENTS,
  };
}

export function getPaymentsSuccess(payload) {
  return {
    type: GET_PAYMENTS_SUCCESS,
    payload,
  };
}

export function cancelSubscription(payload) {
  return {
    type: CANCEL_SUBSCRIPTION,
    payload,
  };
}

export function cancelSubscriptionSuccess() {
  return {
    type: CANCEL_SUBSCRIPTION_SUCCESS,
  };
}

export function cancelSubscriptionError() {
  return {
    type: CANCEL_SUBSCRIPTION_ERROR,
  };
}

export function getTopUpCheckoutSession(payload) {
  return {
    type: GET_TOP_UP_CHECKOUT_SESSION,
    payload,
  };
}

export function getTopUpCheckoutSessionSuccess(payload) {
  return {
    type: GET_TOP_UP_CHECKOUT_SESSION_SUCCESS,
    payload,
  };
}

export function getStripeConfig() {
  return {
    type: GET_STRIPE_CONFIG,
  };
}

export function getStripeConfigSuccess(payload) {
  return {
    type: GET_STRIPE_CONFIG_SUCCESS,
    payload,
  };
}

export function getSubscriptionCheckoutSession(payload) {
  return {
    type: GET_SUBSCRIPTION_CHECKOUT_SESSION,
    payload,
  };
}

export function getSubscriptionCheckoutSessionSuccess(payload) {
  return {
    type: GET_SUBSCRIPTION_CHECKOUT_SESSION_SUCCESS,
    payload,
  };
}

export function getUserProfile() {
  return {
    type: GET_USER_PROFILE,
  };
}

export function getUserProfileSuccess(payload) {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload,
  };
}

export function updateUserProfile(payload) {
  return {
    type: UPDATE_USER_PROFILE,
    payload,
  };
}

export function updateUserProfileSuccess(payload) {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload,
  };
}

export function updateUserProfileError() {
  return {
    type: UPDATE_USER_PROFILE_ERROR,
  };
}

export function sendEmailVerificationCode(payload) {
  return {
    type: SEND_EMAIL_VERIFICATION_CODE,
    payload,
  };
}

export function changePassword(payload) {
  return {
    type: CHANGE_PASSWORD,
    payload,
  };
}

export function sendEmailVerificationCodeSuccess(payload) {
  return {
    type: SEND_EMAIL_VERIFICATION_CODE_SUCCESS,
    payload,
  };
}
export function changePasswordSuccess(payload) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload,
  };
}

export function sendEmailVerificationCodeError() {
  return {
    type: SEND_EMAIL_VERIFICATION_CODE_ERROR,
  };
}

export function changePasswordError() {
  return {
    type: CHANGE_PASSWORD_ERROR,
  };
}

export function getCreditsUsage() {
  return {
    type: GET_CREDITS_USAGE,
  };
}

export function getCreditsUsageSuccess(payload) {
  return {
    type: GET_CREDITS_USAGE_SUCCESS,
    payload,
  };
}

export function getUsersInfo(is_active) {
  return {
    type: GET_USERS_INFO,
    is_active,
  };
}

export function getUsersInfoSuccess(payload) {
  return {
    type: GET_USERS_INFO_SUCCESS,
    payload,
  };
}

export function addUserInvitation(payload) {
  return {
    type: ADD_USER_INVITATION,
    payload,
  };
}

export function addUserInvitationSuccess() {
  return {
    type: ADD_USER_INVITATION_SUCCESS,
  };
}

export function addUserInvitationError() {
  return {
    type: ADD_USER_INVITATION_ERROR,
  };
}

export function updateManageUser(payload) {
  return {
    type: UPDATE_MANAGE_USER,
    payload,
  };
}

export function updateManageUserSuccess() {
  return {
    type: UPDATE_MANAGE_USER_SUCCESS,
  };
}

export function activateOrDeactivateManageUser(payload) {
  return {
    type: ACTIVATE_OR_DEACTIVATE_MANAGE_USER,
    payload,
  };
}

export function activateOrDeactivateManageUserSuccess() {
  return {
    type: ACTIVATE_OR_DEACTIVATE_MANAGE_USER_SUCCESS,
  };
}

export function getEmailAddresses() {
  return {
    type: GET_EMAIL_ADDRESSES,
  };
}

export function getEmailAddressesSuccess(payload) {
  return {
    type: GET_EMAIL_ADDRESSES_SUCCESS,
    payload,
  };
}

export function getPlanAmount(payload) {
  return {
    type: GET_PLAN_AMOUNT,
    payload,
  };
}

export function getPlanAmountSuccess(payload) {
  return {
    type: GET_PLAN_AMOUNT_SUCCESS,
    payload,
  };
}

export function resetPlanAmount() {
  return {
    type: RESET_PLAN_AMOUNT,
  };
}
