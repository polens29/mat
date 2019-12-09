import { createSelector } from 'reselect';

/**
 * Direct selector to the integrations state domain
 */
const selectIntegrationsDomain = (state) => state.get('integrations');

/**
 * Other specific selectors
 */

// const makeSelectIntegrations = () =>
//   createSelector(selectIntegrationsDomain, (substate) =>
//     substate.get('integrations').toJS()
//   );

const makeSelectShowModal = () =>
  createSelector(selectIntegrationsDomain, (substate) =>
    substate.get('showModal')
  );

const makeSelectIntegrationType = () =>
  createSelector(selectIntegrationsDomain, (substate) =>
    substate.get('integrationType')
  );

const makeSelectStatus = () =>
  createSelector(selectIntegrationsDomain, (substate) => substate.get('status'));

const makeSelectAllStatus = () =>
  createSelector(selectIntegrationsDomain, (substate) => 
    substate.get('allIntegrationStatus').toJS()
  );

const makeSelectIntegrationObject = () =>
  createSelector(selectIntegrationsDomain, (substate) =>
    substate.get('integrationObject').toJS()
  );

const makeSelectIntegrationFormat = () =>
  createSelector(selectIntegrationsDomain, (substate) =>
    substate.get('integrationFormat').toJS()
  );

const makeSelectLoading = () =>
  createSelector(selectIntegrationsDomain, (substate) => substate.get('loading'));

export {
  selectIntegrationsDomain,
  makeSelectShowModal,
  makeSelectIntegrationType,
  makeSelectStatus,
  makeSelectIntegrationObject,
  makeSelectIntegrationFormat,
  makeSelectLoading,
  makeSelectAllStatus
};
