/* eslint-disable react/prop-types, consistent-return */
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { postRequest, getRequest } from 'utils/request';
import { notification } from 'antd';

import {
  getIntegrationStatus,
  setIntegrationStatus,
  setIntegrationObject,
  setIntegrationFormat,
  getAllIntegrationStatus,
  setAllIntegrationStatus
} from './actions';

import {
  GET_INTEGRATION_STATUS,
  GET_ALL_INTEGRATION_STATUS,
  UPDATE_INTEGRATIONS_OBJECT,
  SAVE_INTEGRATIONS_MAPPING,
  AUTH_INTEGRATION,
} from './constants';

export function* getIntStatus({ leadType, integrationType, force }) {
  try {
    let url = 'export/' +integrationType.toLowerCase() + '/status/' + leadType;
    const { data: integrationStatus } = yield call(
      getRequest, url
    );

    if (
      !integrationStatus.status.includes('NOT_AUTHENTICATED') &&
      integrationType === 'salesforce'
    ) {
      const { data: integrationObject } = yield call(
        getRequest,
        `export/${integrationType}/object/${leadType}`
      );
      const { data: integrationFormat } = yield call(
        getRequest,
        `export/${integrationType}/format/${leadType}`
      );
      yield put(setIntegrationObject(integrationObject));
      yield put(setIntegrationFormat(integrationFormat));
      return;
    }
    if (
      !integrationStatus.status.includes('NOT_AUTHENTICATED') &&
      integrationType === 'pipedrive'
    ) {
      let url = `export/${integrationType}/format/${leadType}`;
      if (force) {
        url += '?force=true';
      }
      const { data: integrationFormat } = yield call(getRequest, url);
      yield put(setIntegrationFormat(integrationFormat));
      return;
    }


    if (!integrationStatus.status.includes('NOT_AUTHENTICATED')){
      if(integrationType === 'hubspot' || integrationType === 'zoho' || integrationType === 'zendesk'){
        let url = `export/${integrationType}/format/${leadType}`;
        if (force) {
          url += '?force=true';
        }
        const { data: integrationFormat } = yield call(getRequest, url);
        yield put(setIntegrationFormat(integrationFormat));
        return;
      }
    }

    return yield put(setIntegrationStatus(integrationStatus.status));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: 'Something went wrong, please try again.',
      placement: 'topRight',
    });
  }
}

export function* watchGetIntegrationStatus() {
  const watcher = yield takeLatest(GET_INTEGRATION_STATUS, getIntStatus);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getAllIntStatus({ leadType }) {
  try {
    const { data: integrationStatus } = yield call(
      getRequest,
      `export/all/status/${leadType}`
    );

    return yield put(setAllIntegrationStatus(integrationStatus));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: 'Something went wrong, please try again.',
      placement: 'topRight',
    });
  }
}

export function* watchGetAllIntegrationStatus() {
  const watcher = yield takeLatest(GET_ALL_INTEGRATION_STATUS, getAllIntStatus);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateIntegrationsObject({
  leadType,
  integrationType,
  objectId,
}) {
  try {
    const payload = {
      object_id: objectId,
    };
    yield call(
      postRequest,
      `export/${integrationType}/object/${leadType}/`,
      payload
    );
    const { data: integrationFormat } = yield call(
      getRequest,
      `export/${integrationType}/format/${leadType}`
    );
    yield put(setIntegrationFormat(integrationFormat));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: 'Something went wrong, please try again.',
      placement: 'topRight',
    });
  }
}

export function* watchUpdateIntegrationsObject() {
  const watcher = yield takeLatest(
    UPDATE_INTEGRATIONS_OBJECT,
    updateIntegrationsObject
  );

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* saveIntegrationsMapping({
  leadType,
  integrationType,
  payload,
}) {
  try {
    yield call(
      postRequest,
      `export/${integrationType}/format/${leadType}/`,
      payload
    );
    notification.success({
      message: 'Success',
      description: `Successfully updated ${integrationType} mapping`,
      placement: 'topRight',
    });
  } catch (err) {
    notification.error({
      message: 'Error',
      description: 'Something went wrong, please try again.',
      placement: 'topRight',
    });
  }
}

export function* watchSaveIntegrationsMapping() {
  const watcher = yield takeLatest(
    SAVE_INTEGRATIONS_MAPPING,
    saveIntegrationsMapping
  );

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* authIntegration({ leadType, integrationType, payload }) {
  let { data } = yield call(postRequest, `auth/${integrationType}/token/`, payload);

  let integrations = {
    'pipedrive': 'Pipedrive',
    'zoho': 'Zoho',
    'zendesk': 'Zendesk Sell',
    'hubspot': 'HubSpot'
  }

  if(data.hasOwnProperty('error')){
    notification.error({
      message: 'Error',
      description: 'Integration was not successfully integrated. Please check your credentials.',
      placement: 'topRight',
    });
  }

  if(data.hasOwnProperty('result')){
    yield put(getIntegrationStatus(leadType, integrationType));
    yield call(getAllIntStatus, payload);

    if(data.result == 'disconnected'){
      notification.success({
        message: 'Success',
        description: `Successfully disconnected to ${integrations[integrationType]} integration`,
        placement: 'topRight',
      });
    }
    else{
      notification.success({
        message: 'Success',
        description: `Successfully authenticated to ${integrations[integrationType]} account`,
        placement: 'topRight',
      });
    }
  }
}

export function* watchAuthIntegration() {
  const watcher = yield takeLatest(AUTH_INTEGRATION, authIntegration);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Sagas to be loaded
export default [
  watchGetIntegrationStatus,
  watchGetAllIntegrationStatus,
  watchUpdateIntegrationsObject,
  watchSaveIntegrationsMapping,
  watchAuthIntegration,
];
