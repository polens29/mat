import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getRequest, postRequest } from 'utils/request';
import { notification } from 'antd';

import { GET_LB_LISTS } from 'containers/Lists/constants';
import { getlbListsSuccess } from 'containers/Lists/actions';

import {
  fetchPersonalInfoSuccess,
  fetchUserNotificationsSuccess,
  readUserNotificationsSuccess,
  getCredentialsSuccess,
  getTopUpPricingListSuccess,
  getTopUpPricingCostSuccess,
  getPlansSuccess,
  subscribePlanSuccess,
  getSubscriptionSuccess,
  topUpSuccess,
  getPaymentsSuccess,
  cancelSubscriptionSuccess,
  cancelSubscriptionError,
  getTopUpCheckoutSessionSuccess,
  getStripeConfigSuccess,
  getSubscriptionCheckoutSessionSuccess,
  getUserProfileSuccess,
  updateUserProfileSuccess,
  updateUserProfileError,
  sendEmailVerificationCodeSuccess,
  sendEmailVerificationCodeError,
  changePasswordSuccess,
  changePasswordError,
  getCreditsUsageSuccess,
  getUsersInfoSuccess,
  addUserInvitationSuccess,
  updateManageUserSuccess,
  activateOrDeactivateManageUserSuccess,
  getEmailAddressesSuccess,
  addUserInvitationError,
  getPlanAmountSuccess,
} from './actions';

import {
  GET_PERSONAL_INFO,
  FETCH_USER_NOTIFICATIONS,
  READ_USER_NOTIFICATIONS,
  SET_COLUMN_DISPLAY,
  GET_CREDENTIALS,
  GET_TOP_UP_PRICING_LIST,
  GET_TOP_UP_PRICING_COST,
  GET_TOP_UP_REQUEST,
  GET_PLANS,
  SUBSCRIBE_REQUEST,
  SUBSCRIBE_PLAN,
  GET_SUBSCRIPTION,
  TOP_UP,
  GET_PAYMENTS,
  CANCEL_SUBSCRIPTION,
  GET_TOP_UP_CHECKOUT_SESSION,
  GET_STRIPE_CONFIG,
  GET_SUBSCRIPTION_CHECKOUT_SESSION,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  SEND_EMAIL_VERIFICATION_CODE,
  CHANGE_PASSWORD,
  GET_CREDITS_USAGE,
  GET_USERS_INFO,
  ADD_USER_INVITATION,
  UPDATE_MANAGE_USER,
  ACTIVATE_OR_DEACTIVATE_MANAGE_USER,
  GET_EMAIL_ADDRESSES,
  GET_PLAN_AMOUNT,
} from './constants';

export function* getPersonalInfo() {
  try {
    //const { data } = yield call(getRequest, '/remaining-credits/');
    //yield put(fetchPersonalInfoSuccess(data.remaining_credits));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchPersonalInfo() {
  const watcher = yield takeLatest(GET_PERSONAL_INFO, getPersonalInfo);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getCredentialsSaga() {
  try {
    //const { data } = yield call(getRequest, '/client-details/');
    //yield put(getCredentialsSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetCredentialsSaga() {
  const watcher = yield takeLatest(GET_CREDENTIALS, getCredentialsSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getLBlists({ category }) {
  try {
    //const { data } = yield call(getRequest, '/list/');
    //yield put(
    //  getlbListsSuccess(data.results.filter((t) => t.lead_type === category))
    //);
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetLists() {
  const watcher = yield takeLatest(GET_LB_LISTS, getLBlists);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* setColumnDisplay({ category, columns, modalEdit, email }) {
  let payload = {
      'updateColumns': {
        'category': category,
        'columns': columns
      },
      'email': email
    }

  try {
    if (modalEdit) {
      //const { data } = yield call(postRequest, '/user-profile-details/', payload);
      /*
      const currentColumns = JSON.parse(sessionStorage.getItem('tableColumns'));
      const columnCategory =
        category === 'Contact'
          ? 'defaultContactColumns'
          : 'defaultCompanyColumns';
      currentColumns[columnCategory] = columns;
      sessionStorage.setItem('tableColumns', JSON.stringify(currentColumns));
      */
    }
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchSetColumnDisplay() {
  const watcher = yield takeLatest(SET_COLUMN_DISPLAY, setColumnDisplay);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchNotifications() {
  try {
    //const { data } = yield call(getRequest, '/notifications/inbox/?limit=12');
    //yield put(fetchUserNotificationsSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchFetchUserNotifications() {
  const watcher = yield takeLatest(
    FETCH_USER_NOTIFICATIONS,
    fetchNotifications
  );

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* readNotifications() {
  try {
    yield call(postRequest, '/notifications/mark-all-as-read/');
    yield put(readUserNotificationsSuccess());
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchReadNotifications() {
  const watcher = yield takeLatest(READ_USER_NOTIFICATIONS, readNotifications);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Watcher for top-up related sagas
export function* getTopUpPricingList() {
  try {
    //const { data } = yield call(getRequest, '/pricing/topup/list/');
    //yield put(getTopUpPricingListSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Couldn\'t fetch pricing',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetTopUpPricingList() {
  const watcher = yield takeLatest(
    GET_TOP_UP_PRICING_LIST, getTopUpPricingList);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getTopUpPricingCost({ credits }) {
  try {
    const { data } = yield call(
      getRequest, `/pricing/topup/cost/?credits=${credits}`);
    yield put(getTopUpPricingCostSuccess(data));
  } catch (err) {
    notification.error({
      message: 'An error occurred while fetching the cost',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetTopUpPricingCost() {
  const watcher = yield takeLatest(
    GET_TOP_UP_PRICING_COST, getTopUpPricingCost);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getTopUpRequest({ payload }) {
  try {
    yield call(postRequest, '/pricing/topup/request/', payload);
    notification.success({
      message: 'Success',
      description:
        'Your request has been submitted. We will contact you shortly.',
      placement: 'topRight',
    });
  } catch (err) {
    notification.error({
      message: 'An error occured while submitting your request',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchTopUpRequest() {
  const watcher = yield takeLatest(GET_TOP_UP_REQUEST, getTopUpRequest);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Watcher for subscription related sagas
export function* getPlans() {
  try {
    //const { data } = yield call(getRequest, '/pricing/plans/');
    //yield put(getPlansSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Couldn\'t fetch plans',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetPlans() {
  const watcher = yield takeLatest(GET_PLANS, getPlans);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getPlanAmount({ payload }) {
  try {
    const { data } = yield call(postRequest, '/pricing/plan/amount/', payload);
    yield put(getPlanAmountSuccess(data));
  } catch (err) {
    yield put(getPlanAmountSuccess({total_amount: null}));
    notification.error({
      message: 'An error occured while applying promo code',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetPlanAmount() {
  const watcher = yield takeLatest(GET_PLAN_AMOUNT, getPlanAmount);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* subscribeRequest({ payload }) {
  try {
    yield call(postRequest, '/pricing/subscribe/request/', payload);
    notification.success({
      message: 'Success',
      description:
        'Your request has been submitted. We will contact you shortly.',
      placement: 'topRight',
    });
  } catch (err) {
    notification.error({
      message: 'An error occured while submitting your request',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchSubscribeRequest() {
  const watcher = yield takeLatest(SUBSCRIBE_REQUEST, subscribeRequest);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* subscribePlan({ payload }) {
  try {
    const { data } = yield call(postRequest, '/pricing/subscribe/paypal/', payload);
    yield put(subscribePlanSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Subscription Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchSubscribePlan() {
  const watcher = yield takeLatest(SUBSCRIBE_PLAN, subscribePlan);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getSubscription() {
  try {
    //const { data } = yield call(getRequest, '/pricing/subscription/');
    //yield put(getSubscriptionSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Subscription Error',
      description: 'Error while fetching the subscription',
      placement: 'topRight',
    });
  }
}

export function* watchGetSubscription() {
  const watcher = yield takeLatest(GET_SUBSCRIPTION, getSubscription);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* cancelSubscription({ payload }) {
  try {
    yield call(postRequest, '/pricing/subscription/cancel/', payload);
    yield put(cancelSubscriptionSuccess());
    notification.success({
      message: 'Success',
      description: 'Your subscription has been cancelled.',
      placement: 'topRight',
    });
  } catch (err) {
    yield put(cancelSubscriptionError());
    notification.error({
      message: 'Cancel Subscription Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchCancelSubscription() {
  const watcher = yield takeLatest(CANCEL_SUBSCRIPTION, cancelSubscription);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* topUp({ payload }) {
  try {
    const { data } = yield call(postRequest, '/pricing/topup/paypal/', payload);
    yield put(topUpSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Top Up Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchTopUp() {
  const watcher = yield takeLatest(TOP_UP, topUp);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getTopUpCheckoutSession({ payload }) {
  try {
    const { data } = yield call(postRequest, '/pricing/topup/stripe/checkout/', payload);
    yield put(getTopUpCheckoutSessionSuccess(data));
  } catch (err) {
    yield put(getTopUpCheckoutSessionSuccess({
      checkout_session: null,
    }));
    notification.error({
      message: 'Top Up Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchGetTopUpCheckoutSession() {
  const watcher = yield takeLatest(GET_TOP_UP_CHECKOUT_SESSION, getTopUpCheckoutSession);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getSubscriptionCheckoutSession({ payload }) {
  try {
    const { data } = yield call(postRequest, '/pricing/subscription/stripe/checkout/', payload);
    yield put(getSubscriptionCheckoutSessionSuccess(data));
  } catch (err) {
    yield put(getSubscriptionCheckoutSessionSuccess({
      checkout_session: null,
    }));
    notification.error({
      message: 'Subscription Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchGetSubscriptionCheckoutSession() {
  const watcher = yield takeLatest(GET_SUBSCRIPTION_CHECKOUT_SESSION, getSubscriptionCheckoutSession);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getStripeConfig() {
  try {
    //const { data } = yield call(getRequest, '/pricing/stripe/config/');
    //yield put(getStripeConfigSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchStripeConfig() {
  const watcher = yield takeLatest(GET_STRIPE_CONFIG, getStripeConfig);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Watcher for payments related sagas
export function* getPayments() {
  try {
    //const { data } = yield call(getRequest, '/pricing/payments/');
    //const { payments } = data;
    //yield put(getPaymentsSuccess(payments));
  } catch (err) {
    notification.error({
      message: 'Couldn\'t fetch payments',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetPayments() {
  const watcher = yield takeLatest(GET_PAYMENTS, getPayments);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Watcher for user profile related sagas
export function* getUserProfile() {
  try {
    //const { data } = yield call(getRequest, '/user-profile-details/');
    //yield put(getUserProfileSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetUserProfile() {
  const watcher = yield takeLatest(GET_USER_PROFILE, getUserProfile);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateUserProfile({ payload }) {
  try {
    //const { data } = yield call(postRequest, '/user-profile-details/', payload);
    //yield put(updateUserProfileSuccess(data));
    notification.success({
      message: 'Success',
      description: 'Profile updated.',
      placement: 'topRight',
    });
  } catch (err) {
    yield put(updateUserProfileError());
    notification.error({
      message: 'Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchUpdateUserProfile() {
  const watcher = yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* sendEmailVerificationCode({ payload }) {
  try {
    const { data } = yield call(postRequest, '/business-email-verification/', payload);
    yield put(sendEmailVerificationCodeSuccess(data));
    notification.success({
      message: 'Success',
      description: 'Code verification sent successfully! Please verify your email account',
      placement: 'topRight',
    });
  } catch (err) {
    yield put(sendEmailVerificationCodeError());
    notification.error({
      message: 'Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchSendEmailVerificationCode() {
  const watcher = yield takeLatest(SEND_EMAIL_VERIFICATION_CODE, sendEmailVerificationCode);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);

}

export function* changePassword({ payload }) {
  try {
    const { data } = yield call(postRequest, '/user-password-change/', payload);
    yield put(changePasswordSuccess(data));
    notification.success({
      message: 'Success',
      description: 'Password changed.',
      placement: 'topRight',
    });
  } catch (err) {
    yield put(changePasswordError());
    notification.error({
      message: 'Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchChangePassword() {
  const watcher = yield takeLatest(CHANGE_PASSWORD, changePassword);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Watcher for credits usage related sagas
export function* getCreditsUsage() {
  try {
    const { data } = yield call(getRequest, '/credits-usage/');
    yield put(getCreditsUsageSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetCreditsUsage() {
  const watcher = yield takeLatest(GET_CREDITS_USAGE, getCreditsUsage);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Watcher for email addresses related sagas
export function* getEmailAddresses() {
  try {
    const { data } = yield call(getRequest, '/list-email-address/');
    yield put(getEmailAddressesSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetEmailAddresses() {
  const watcher = yield takeLatest(GET_EMAIL_ADDRESSES, getEmailAddresses);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Watcher for manage users related sagas
export function* getUsersInfo({ is_active }) {
  let url = '/users-info/';
  if (is_active == true || is_active == false) url = `/users-info/?is_active=${is_active}`;
  try {
    const { data } = yield call(getRequest, url);
    yield put(getUsersInfoSuccess(data));

  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetUsersInfo() {
  const watcher = yield takeLatest(GET_USERS_INFO, getUsersInfo);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Watcher for add user by invitation related sagas
export function* addUserInvitation({ payload }) {
  try {
    yield call(postRequest, '/add-user-invitation/', payload);
    yield put(addUserInvitationSuccess());
    notification.success({
      message: 'Success',
      description: 'Invitation sent successfully.',
      placement: 'topRight',
    });
  } catch (err) {
    yield put(addUserInvitationError());
    notification.error({
      message: 'Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchAddUserInvitation() {
  const watcher = yield takeLatest(ADD_USER_INVITATION, addUserInvitation);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Watcher for update manage user related sagas
export function* updateManageUser({ payload }) {
  try {
    yield call(postRequest, '/update-manage-user/', payload);
    yield put(updateManageUserSuccess());
    notification.success({
      message: 'Success',
      description: 'User updated successfully.',
      placement: 'topRight',
    });
  } catch (err) {
    yield put(updateManageUserSuccess());
    notification.error({
      message: 'Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchUpdateManageUser() {
  const watcher = yield takeLatest(UPDATE_MANAGE_USER, updateManageUser);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Watcher for deactivate manage user related sagas
export function* activateOrDeactivateManageUser({ payload }) {
  try {
    yield call(postRequest, '/activate-or-deactivate-user/', payload);
    yield put(activateOrDeactivateManageUserSuccess());
    notification.success({
      message: 'Success',
      description: 'User status changed successfully.',
      placement: 'topRight',
    });
  } catch (err) {
    yield put(activateOrDeactivateManageUserSuccess());
    notification.error({
      message: 'Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchActivateOrDeactivateManageUser() {
  const watcher = yield takeLatest(ACTIVATE_OR_DEACTIVATE_MANAGE_USER, activateOrDeactivateManageUser);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Sagas to be loaded
export default [
  watchPersonalInfo,
  watchSetColumnDisplay,
  watchFetchUserNotifications,
  watchReadNotifications,
  watchGetCredentialsSaga,
  watchGetLists,
  watchGetTopUpPricingList,
  watchGetTopUpPricingCost,
  watchTopUpRequest,
  watchGetPlans,
  watchSubscribeRequest,
  watchSubscribePlan,
  watchGetSubscription,
  watchTopUp,
  watchGetPayments,
  watchCancelSubscription,
  watchGetTopUpCheckoutSession,
  watchStripeConfig,
  watchGetSubscriptionCheckoutSession,
  watchGetUserProfile,
  watchUpdateUserProfile,
  watchSendEmailVerificationCode,
  watchChangePassword,
  watchGetCreditsUsage,
  watchGetUsersInfo,
  watchAddUserInvitation,
  watchUpdateManageUser,
  watchActivateOrDeactivateManageUser,
  watchGetEmailAddresses,
  watchGetPlanAmount,
];
