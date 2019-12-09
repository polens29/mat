import { createSelector } from 'reselect';
// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectGlobal = (state) => state.get('global');

const makeSelectCredits = () =>
  createSelector(selectGlobal, (substate) => substate.get('credits'));

const makeSelectCredentials = () =>
  createSelector(selectGlobal, (substate) => substate.get('credentials'));

const makeSelectDisplayColumns = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('displayColumns').toJS()
  );
const makeSelectHasNextPage = () =>
  createSelector(selectGlobal, (substate) => substate.get('hasNextPage'));

const makeSelectNotifications = () =>
  createSelector(selectGlobal, (substate) => substate.get('notifications'));

const makeSelectNotificationPage = () =>
  createSelector(selectGlobal, (substate) => substate.get('notificationPage'));

const makeSelectUnreadNotifications = () =>
  createSelector(selectGlobal, (substate) => substate.get('unreadNotifications'));

const makeSelectSidebarDisplay = () =>
  createSelector(selectGlobal, (substate) => substate.get('sidebarDisplay'));

const makeSelectfromBtn = () =>
  createSelector(selectGlobal, (substate) => substate.get('fromBtn'));


const makeSelectTopUpPricingList = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('topUpPricingList').toJS()
  );

const makeSelectTopUpPricingCost = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('topUpPricingCost').toJS()
  );

const makeSelectPlans = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('plans').toJS()
  );

const makeSelectSubscribePlanResponse = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('subscribePlanResponse').toJS()
  );

const makeSelectSubscribePlanLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('subscribePlanLoading')
  );

const makeSelectSubscription = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('subscription').toJS()
  );

const makeSelectTopUpResponse = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('topUpResponse').toJS()
  );

const makeSelectTopUpLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('topUpLoading')
  );

const makeSelectPayments = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('payments').toJS()
  );

const makeSelectTopUpCheckoutSession = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('topUpCheckoutSession').toJS()
);

const makeSelectCheckoutLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('checkoutLoading')
);

const makeSelectStripeConfig = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('stripeConfig').toJS()
);

const makeSelectSubscriptionCheckoutSession = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('subscriptionCheckoutSession').toJS()
);

const makeSelectCancelLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('cancelLoading')
);

const makeSelectUserProfile = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('userProfile').toJS()
);

const makeSelectUserProfileLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('userProfileLoading')
);

const makeSelectEmailVerificationResponse = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('emailVerificationResponse').toJS()
);

const makeSelectEmailVerificationLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('emailVerificationLoading')
);

const makeSelectPasswordLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('passwordLoading')
);

const makeSelectCreditsUsage = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('creditsUsage').toJS()
);

const makeSelectUsersInfo = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('usersInfo').toJS()
);

const makeSelectSendInvitationLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('sendInvitationLoading')
);

const makeSelectUpdateManageUserLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('updateManageUserLoading')
);

const makeSelectActivateOrDeactivateManageUserLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('activateOrDeactivateManageUserLoading')
);

const makeSelectEmailAddresses = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('emailAddresses').toJS()
);

const makeSelectSendInvitationErrorLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('sendInvitationErrorLoading')
);

const makeSelectPlanAmount = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('planAmount').toJS()
);

const makeSelectPlanAmountLoading = () =>
  createSelector(selectGlobal, (substate) =>
    substate.get('planAmountLoading')
);

export {
  makeSelectLocationState,
  selectGlobal,
  makeSelectCredits,
  makeSelectDisplayColumns,
  makeSelectHasNextPage,
  makeSelectNotifications,
  makeSelectNotificationPage,
  makeSelectUnreadNotifications,
  makeSelectCredentials,
  makeSelectSidebarDisplay,
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
  makeSelectEmailAddresses,
  makeSelectSendInvitationErrorLoading,
  makeSelectPlanAmount,
  makeSelectPlanAmountLoading,
  makeSelectfromBtn
};
