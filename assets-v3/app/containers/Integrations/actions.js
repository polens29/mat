import {
  UPDATE_INTEGRATION_STATUS,
  GET_INTEGRATION_STATUS,
  UPDATE_ALL_INTEGRATION_STATUS,
  GET_ALL_INTEGRATION_STATUS,
  INTEGRATIONS_MODAL_TOGGLE,
  UPDATE_INTEGRATIONS_OBJECT,
  SET_INTEGRATION_OBJECT,
  SET_INTEGRATION_FORMAT,
  SAVE_INTEGRATIONS_MAPPING,
  AUTH_INTEGRATION,
} from './constants';

export function getAllIntegrationStatus(leadType) {
  return {
    type: GET_ALL_INTEGRATION_STATUS,
    leadType: leadType.toLowerCase()
  };
}

export function setAllIntegrationStatus(response) {
  return {
    type: UPDATE_ALL_INTEGRATION_STATUS,
    response,
  };
}

export function getIntegrationStatus(leadType, integrationType, force=false) {
  return {
    type: GET_INTEGRATION_STATUS,
    leadType: leadType.toLowerCase(),
    integrationType: integrationType.toLowerCase(),
    force
  };
}

export function setIntegrationStatus(status) {
  return {
    type: UPDATE_INTEGRATION_STATUS,
    status,
  };
}

export function integrationsModalToggle(status, integrationType) {
  return {
    type: INTEGRATIONS_MODAL_TOGGLE,
    status,
    integrationType,
  };
}

export function updateIntegrationsObject(leadType, integrationType, objectId) {
  return {
    type: UPDATE_INTEGRATIONS_OBJECT,
    leadType,
    integrationType: integrationType.toLowerCase(),
    objectId,
  };
}

export function setIntegrationObject(integrationObject) {
  return {
    type: SET_INTEGRATION_OBJECT,
    integrationObject,
  };
}

export function setIntegrationFormat(integrationFormat) {
  return {
    type: SET_INTEGRATION_FORMAT,
    integrationFormat,
  };
}

export function saveIntegrationsMapping(leadType, integrationType, payload) {
  return {
    type: SAVE_INTEGRATIONS_MAPPING,
    leadType,
    integrationType: integrationType.toLowerCase(),
    payload,
  };
}

export function authenticateIntegration(leadType, integrationType, payload) {
  return {
    type: AUTH_INTEGRATION,
    leadType,
    integrationType: integrationType.toLowerCase(),
    payload,
  };
}
