/*
 *
 * SalesForce reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_INTEGRATION_STATUS,
  UPDATE_INTEGRATION_STATUS,
  INTEGRATIONS_MODAL_TOGGLE,
  UPDATE_INTEGRATIONS_OBJECT,
  SET_INTEGRATION_OBJECT,
  SET_INTEGRATION_FORMAT,
  UPDATE_ALL_INTEGRATION_STATUS
} from './constants';

const integrationObject = {
  choices: [],
  selected: '',
};

const integrationFormat = {
  application: '',
  mappings: {
    fields: {},
  },
  lead_type: '',
  application_fields: [],
  application_object: [],
  leadbook_fields: [],
};

const initialState = fromJS({
  integrationObject: {},
  integrationFormat: {},
  status: 'NOT_AUTHENTICATED',
  showModal: false,
  loading: false,
  integrationType: '',
  allIntegrationStatus: {}
});

function salesforceReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ALL_INTEGRATION_STATUS: {
      return state
        .set('allIntegrationStatus', fromJS(action.response))
    }

    case INTEGRATIONS_MODAL_TOGGLE: {
      return state
        .set('showModal', action.status)
        .set('integrationType', action.integrationType);
    }

    case GET_INTEGRATION_STATUS:
      return state
        .set('status', '')
        .set('loading', true)
        .set('integrationObject', fromJS(integrationObject))
        .set('integrationFormat', fromJS(integrationFormat));

    case UPDATE_INTEGRATION_STATUS:
      return state.set('status', action.status).set('loading', false);

    case UPDATE_INTEGRATIONS_OBJECT:
      return state
        .set('loading', true)
        .setIn(['integrationObject', 'selected'], action.objectId);

    case SET_INTEGRATION_OBJECT:
      return state.set('integrationObject', fromJS(action.integrationObject));

    case SET_INTEGRATION_FORMAT:
      return state
        .set('integrationFormat', fromJS(action.integrationFormat))
        .set('loading', false);

    default:
      return state;
  }
}

export default salesforceReducer;
