/* eslint-disable camelcase */

import { call, cancel, put, take, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from 'utils/request';
import { notification } from 'antd';

import {
  getSavedSearchesSuccess,
  createSavedSearchSuccess,
  renameSavedSearchSuccess,
  deleteSavedSearchSuccess,
  copySavedSearchSuccess,
  updateSavedSearchSuccess,
} from './actions';

import {
  GET_SAVED_SEARCHES,
  CREATE_SAVED_SEARCH,
  RENAME_SAVED_SEARCH,
  DELETE_SAVED_SEARCH,
  COPY_SAVED_SEARCH,
  UPDATE_SAVED_SEARCH,
} from './constants';

export function* getSavedSearches({ leadType, query, page, pageSize }) {
  try {
    const { data } = yield call(
      getRequest,
      `saved-search/?lead_type=${leadType}&query=${query}&page=${page}&page_size=${pageSize}`
    );
    yield put(getSavedSearchesSuccess(data.results, data.count));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetSavedSearches() {
  const watcher = yield takeLatest(GET_SAVED_SEARCHES, getSavedSearches);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* createSavedSearch({ name, category, filters, keywords }) {
  try {
    const payload = {
      name,
      lead_type: category === 'Contact' ? 'contact' : 'company',
      filters,
      metadata: {
        keywords,
      },
    };
    const { data } = yield call(postRequest, 'saved-search/', payload);
    yield put(createSavedSearchSuccess(data));
    notification.success({
      message: 'Success',
      description: `Created ${name} filter.`,
      placement: 'topRight',
    });
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchCreateSavedSearch() {
  const watcher = yield takeLatest(CREATE_SAVED_SEARCH, createSavedSearch);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* renameSavedSearch({ savedSearch, newName, index }) {
  const { id } = savedSearch;
  const payload = {
    name: newName,
  };
  try {
    const { data } = yield call(putRequest, `saved-search/${id}/`, payload);
    yield put(renameSavedSearchSuccess(data, index));
    notification.success({
      message: 'Success',
      description: 'Updated saved filter name',
      placement: 'topRight',
    });
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchRenameSavedSearch() {
  const watcher = yield takeLatest(RENAME_SAVED_SEARCH, renameSavedSearch);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* deleteSavedSearch({ savedSearch }) {
  const { id, name } = savedSearch;
  try {
    yield call(deleteRequest, `saved-search/${id}/`);
    yield put(deleteSavedSearchSuccess(id));
    notification.success({
      message: 'Success',
      description: `Deleted ${name} filter.`,
      placement: 'topRight',
    });
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchDeleteSavedSearch() {
  const watcher = yield takeLatest(DELETE_SAVED_SEARCH, deleteSavedSearch);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* copySavedSearch({ savedSearch, index }) {
  const { id, name } = savedSearch;
  const payload = {
    name: `Copy of ${name}`,
  };
  try {
    const { data } = yield call(postRequest, `saved-search/${id}/copy/`, payload);
    yield put(copySavedSearchSuccess(data, index));
    notification.success({
      message: 'Success',
      description: `Copied ${name} filter.`,
      placement: 'topRight',
    });
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchCopySavedSearch() {
  const watcher = yield takeLatest(COPY_SAVED_SEARCH, copySavedSearch);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateSavedSearch({ savedSearch, filters, keywords }) {
  const { id, name } = savedSearch;
  const payload = {
    name,
    filters,
    metadata: {
      keywords,
    },
  };
  try {
    const { data } = yield call(putRequest, `saved-search/${id}/`, payload);
    yield put(updateSavedSearchSuccess(data));
    notification.success({
      message: 'Success',
      description: 'Updated saved filter',
      placement: 'topRight',
    });
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchUpdateSavedSearch() {
  const watcher = yield takeLatest(UPDATE_SAVED_SEARCH, updateSavedSearch);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Sagas to be loaded
export default [
  watchGetSavedSearches,
  watchCreateSavedSearch,
  watchRenameSavedSearch,
  watchDeleteSavedSearch,
  watchCopySavedSearch,
  watchUpdateSavedSearch,
];
