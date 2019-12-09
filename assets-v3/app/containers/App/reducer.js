import { fromJS } from 'immutable';

import {
  GET_PERSONAL_INFO_SUCCESS,
  FETCH_USER_NOTIFICATIONS_SUCCESS,
  READ_USER_NOTIFICATION_SUCCESS,
  SET_COLUMN_DISPLAY,
  GET_CREDENTIALS_SUCCESS,
  TOGGLE_SIDEBAR_DISPLAY,
  GET_TOP_UP_PRICING_LIST_SUCCESS,
  GET_TOP_UP_PRICING_COST_SUCCESS,
  GET_PLANS_SUCCESS,
  SUBSCRIBE_PLAN_SUCCESS,
  GET_SUBSCRIPTION_SUCCESS,
  SUBSCRIBE_PLAN,
  TOP_UP,
  TOP_UP_SUCCESS,
  GET_PAYMENTS_SUCCESS,
  CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_ERROR,
  GET_TOP_UP_CHECKOUT_SESSION,
  GET_TOP_UP_CHECKOUT_SESSION_SUCCESS,
  GET_STRIPE_CONFIG_SUCCESS,
  GET_SUBSCRIPTION_CHECKOUT_SESSION,
  GET_SUBSCRIPTION_CHECKOUT_SESSION_SUCCESS,
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
  GET_CREDITS_USAGE_SUCCESS,
  GET_USERS_INFO_SUCCESS,
  ADD_USER_INVITATION,
  ADD_USER_INVITATION_SUCCESS,
  UPDATE_MANAGE_USER,
  UPDATE_MANAGE_USER_SUCCESS,
  ACTIVATE_OR_DEACTIVATE_MANAGE_USER,
  ACTIVATE_OR_DEACTIVATE_MANAGE_USER_SUCCESS,
  GET_EMAIL_ADDRESSES_SUCCESS,
  ADD_USER_INVITATION_ERROR,
  GET_PLAN_AMOUNT,
  GET_PLAN_AMOUNT_SUCCESS,
  RESET_PLAN_AMOUNT,
} from './constants';

const initialState = fromJS({
  credits: 0,
  credentials: {},
  hasNextPage: false,
  notifications: [],
  notificationPage: 1,
  unreadNotifications: 0,
  displayColumns: {
    Contact: [],
    Organization: [],
  },
  creditCostInfo: {
    cost: 500,
    cost_per_credit: 1,
    discount: 0,
    pricing: {
      discount: 0,
      range: {
        max: 1999,
        min: 500,
      },
    },
  },
  topUpPricingList: [],
  topUpPricingCost: {
    cost: 500,
    base_cost: 500,
    pricing: {
      discount: 0,
    },
  },
  plans: [],
  subscribePlanLoading: false,
  subscribePlanResponse: {
    approval_url: null,
  },
  subscription: {},
  topUpLoading: false,
  topUpResponse: {
    approval_url: null,
  },
  payments: [],
  topUpCheckoutSession: {
    checkout_session: null,
  },
  checkoutLoading: false,
  stripeConfig: {
    publishable_key: null,
  },
  subscriptionCheckoutSession: {
    checkout_session: null,
  },
  cancelLoading: false,
  userProfile: {},
  userProfileLoading: false,
  emailVerificationResponse: {},
  emailVerificationLoading: false,
  passwordLoading: false,
  creditsUsage: [],
  usersInfo: [],
  sendInvitationLoading: false,
  sendInvitationErrorLoading: false,
  updateManageUserLoading: false,
  activateOrDeactivateManageUserLoading: false,
  emailAddresses: [],
  planAmount: {
    total_amount: null,
  },
  planAmountLoading: false,
  fromBtn: false
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PERSONAL_INFO_SUCCESS:
      return state.set('credits', action.credits);

    case GET_CREDENTIALS_SUCCESS:
      return state
        .set('credentials', action.credentials)

    case SET_COLUMN_DISPLAY:
      return state.setIn(['displayColumns', action.category], action.columns);

    case FETCH_USER_NOTIFICATIONS_SUCCESS: {
      const { has_next_page, notifications, page, unread } = action.data;
      return state
        .set('hasNextPage', has_next_page)
        .set('notifications', notifications)
        .set('notificationsPage', page)
        .set('unreadNotifications', unread);
    }
    case READ_USER_NOTIFICATION_SUCCESS:
      return state.set('unreadNotifications', 0);

    case TOGGLE_SIDEBAR_DISPLAY: {
      let display = action.display;
      let fromBtn = false;
      if(action.display == 'helpFromBtn'){
        display = 'help';
        fromBtn = true;
      }
      return state
        .set('sidebarDisplay', display)
        .set('fromBtn', fromBtn)
    }

    case GET_TOP_UP_PRICING_LIST_SUCCESS: {
      return state.set('topUpPricingList', fromJS(action.payload));
    }

    case GET_TOP_UP_PRICING_COST_SUCCESS: {
      return state.set('topUpPricingCost', fromJS(action.payload));
    }

    case GET_PLANS_SUCCESS: {
      return state.set('plans', fromJS(action.payload));
    }

    case SUBSCRIBE_PLAN: {
      return state.set('subscribePlanLoading', true);
    }

    case SUBSCRIBE_PLAN_SUCCESS: {
      return state.set('subscribePlanResponse', fromJS(action.payload))
        .set('subscribePlanLoading', false);
    }

    case GET_SUBSCRIPTION_SUCCESS: {
      return state.set('subscription', fromJS(action.payload.subscription || {}));
    }

    case TOP_UP: {
      return state.set('topUpLoading', true);
    }

    case TOP_UP_SUCCESS: {
      return state.set('topUpResponse', fromJS(action.payload))
        .set('topUpLoading', false);
    }

    case GET_PAYMENTS_SUCCESS: {
      return state.set('payments', fromJS(action.payload));
    }

    case CANCEL_SUBSCRIPTION: {
      return state.set('cancelLoading', true);
    }

    case CANCEL_SUBSCRIPTION_SUCCESS: {
      return state.set('subscription', fromJS({}))
        .set('cancelLoading', false)
    }

    case CANCEL_SUBSCRIPTION_ERROR: {
      return state.set('cancelLoading', false);
    }

    case GET_TOP_UP_CHECKOUT_SESSION: {
      return state.set('checkoutLoading', true);
    }

    case GET_TOP_UP_CHECKOUT_SESSION_SUCCESS: {
      return state.set('topUpCheckoutSession', fromJS(action.payload))
        .set('checkoutLoading', false);
    }

    case GET_STRIPE_CONFIG_SUCCESS: {
      return state.set('stripeConfig', fromJS(action.payload));
    }

    case GET_SUBSCRIPTION_CHECKOUT_SESSION: {
      return state.set('checkoutLoading', true);
    }

    case GET_SUBSCRIPTION_CHECKOUT_SESSION_SUCCESS: {
      return state.set('subscriptionCheckoutSession', fromJS(action.payload))
        .set('checkoutLoading', false);
    }

    case GET_USER_PROFILE_SUCCESS: {
      return state
      .set('userProfile', fromJS(action.payload))
      .setIn(['displayColumns', 'Contact'], action.payload.contact_columns)
      .setIn(['displayColumns', 'Organization'], action.payload.company_columns)
    }

    case UPDATE_USER_PROFILE: {
      return state.set('userProfileLoading', true);
    }

    case UPDATE_USER_PROFILE_SUCCESS: {
      return state.set('userProfileLoading', false)
        .set('userProfile', fromJS(action.payload));
    }

    case UPDATE_USER_PROFILE_ERROR: {
      return state.set('userProfileLoading', false);
    }

    case CHANGE_PASSWORD: {
      return state.set('passwordLoading', true);
    }

    case CHANGE_PASSWORD_SUCCESS: {
      return state.set('passwordLoading', false);
    }

    case CHANGE_PASSWORD_ERROR: {
      return state.set('passwordLoading', false);
    }

    case SEND_EMAIL_VERIFICATION_CODE: {
      return state.set('emailVerificationLoading', true);
    }

    case SEND_EMAIL_VERIFICATION_CODE_SUCCESS: {
      return state.set('emailVerificationLoading', false)
        .set('emailVerificationResponse', fromJS(action.payload));
    }

    case SEND_EMAIL_VERIFICATION_CODE_ERROR: {
      return state.set('emailVerificationLoading', false);
    }

    case GET_CREDITS_USAGE_SUCCESS: {
      return state.set('creditsUsage', fromJS(action.payload));
    }

    case GET_USERS_INFO_SUCCESS: {
      return state.set('usersInfo', fromJS(action.payload));
    }

    case ADD_USER_INVITATION: {
      return state.set('sendInvitationLoading', true);
    }

    case ADD_USER_INVITATION_SUCCESS: {
      return state.set('sendInvitationLoading', false);
    }

    case ADD_USER_INVITATION_ERROR: {
      return state.set('sendInvitationErrorLoading', true)
        .set('sendInvitationLoading', false);
    }

    case UPDATE_MANAGE_USER: {
      return state.set('updateManageUserLoading', true);
    }

    case UPDATE_MANAGE_USER_SUCCESS: {
      return state.set('updateManageUserLoading', false);
    }

    case ACTIVATE_OR_DEACTIVATE_MANAGE_USER: {
      return state.set('activateOrDeactivateManageUserLoading', true);
    }

    case ACTIVATE_OR_DEACTIVATE_MANAGE_USER_SUCCESS: {
      return state.set('activateOrDeactivateManageUserLoading', false);
    }

    case GET_EMAIL_ADDRESSES_SUCCESS: {
      return state.set('emailAddresses', fromJS(action.payload));
    }

    case GET_PLAN_AMOUNT: {
      return state.set('planAmountLoading', true);
    }

    case GET_PLAN_AMOUNT_SUCCESS: {
      return state
        .set('planAmountLoading', false)
        .set('planAmount', fromJS(action.payload));
    }

    case RESET_PLAN_AMOUNT: {
      return state
        .set('planAmount', fromJS({ total_amount: null }));
    }

    default:
      return state;
  }
}

export default authReducer;
