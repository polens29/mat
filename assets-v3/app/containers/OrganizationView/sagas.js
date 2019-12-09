import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { postRequest, getRequest } from 'utils/request';
import { notification, message } from 'antd';

import { fetchPersonalInfoSuccess } from 'containers/App/actions';

import { initializeCompanyDetails, unlockedContact } from './actions';

import { UNLOCK_CONTACT, GET_COMPANY_PROFILE } from './constants';

function runBackgroundNotification(notifMessage, type = 'Info') {
  notification[type.toLowerCase()]({
    message: type,
    description: notifMessage,
    placement: 'topRight',
    duration: 3,
  });
}

export function* getCompanyProfileDetail({ id }) {
  try {
    const { data } = yield call(getRequest, `/company/${id}/`);
    yield put(initializeCompanyDetails(data));
  } catch (err) {
    runBackgroundNotification(
      'Something went wrong, please try again.',
      'Error'
    );
  }
}

export function* watchGetCompanyProfile() {
  const watcher = yield takeLatest(
    GET_COMPANY_PROFILE,
    getCompanyProfileDetail
  );

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* unlockContact({ contact }) {
  try {
    const payload = {
      leadbook_ids: [contact.leadbook_id],
    };
    const { data } = yield call(postRequest, 'company/unlock/', payload);
    yield put(fetchPersonalInfoSuccess(data.credits));
    yield put(unlockedContact(data.results[0]));
    message.success('Successfully unlocked organization.', 1.0);
    return;
  } catch (err) {
    runBackgroundNotification(
      'Something went wrong, please try again.',
      'Error'
    );
  }
}

export function* watchUnlockContact() {
  const watcher = yield takeLatest(UNLOCK_CONTACT, unlockContact);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [watchGetCompanyProfile, watchUnlockContact];
