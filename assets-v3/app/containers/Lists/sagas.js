/* eslint-disable camelcase */
import React from 'react';
import { delay } from 'redux-saga';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from 'utils/request';
import { notification, Icon, Progress } from 'antd';
import _ from 'lodash';

import { fetchLists } from 'containers/HomePage/actions';

import {
  createlbListsSuccess,
  addTolbListsSuccess,
  removeFromlbListsSuccess,
  deleteListSuccess,
  copyListSuccess,
  renameListSuccess,
} from './actions';

import {
  CREATE_LB_LISTS,
  ADD_TO_LB_LISTS,
  REMOVE_FROM_LB_LISTS,
  DELETE_LIST,
  COPY_LIST,
  RENAME_LIST,
  PROGRESS_BAR_START,
  PROGRESS_BAR_UPDATE,
  PURCHASE_LIST
} from './constants';

function runBackgroundNotificationNew(taskId, percentage) {
  notification.open({
    key: taskId,
    message: 'Add To List',
    description: <Progress percent={percentage} />,
    // icon: <Icon type="loading" />,
    placement: 'topRight',
    duration: 0,
    btn: ""
  });
}

// function updateNotification(notification){

// }

function* runBackgroundProcessNew(taskid, messageTitle, descriptionMessage) {
  runBackgroundNotificationNew(taskid, 0);
  let backgroundcall = yield call(getRequest, `/bgtasks/${taskid}`);
  while (backgroundcall.data.status !== 'completed') {
    yield delay(1000);
    backgroundcall = yield call(getRequest, `/bgtasks/${taskid}`);
    runBackgroundNotificationNew(taskid, backgroundcall.data.percentage);
  }
  notification.destroy();

  return 'success';
}

export function* createLBlistsSaga({ name, category }) {
  try {
    const payload = {
      name,
      lead_type: category === 'Contact' ? 'contact' : 'company',
    };
    const { data } = yield call(postRequest, '/list/', payload);
    yield put(createlbListsSuccess(data));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchCreateLBlistsSaga() {
  const watcher = yield takeLatest(CREATE_LB_LISTS, createLBlistsSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* addLBTolistsSaga({
  leads,
  category,
  lbLists,
  searchParams,
  addAll,
  total,
}) {
  try {
    const leadbookIds = leads.map(({ leadbook_id }) => leadbook_id);
    const listIds = lbLists.map(({ id }) => id);
    const listName = lbLists.map(({ name }) => name).join(', ');

    const payload = {
      leadbook_ids: leadbookIds,
      lead_type: category === 'Contact' ? 'contact' : 'company',
      list_ids: listIds,
      filters:
        category === 'Contact'
          ? searchParams.filters
          : _.omit(searchParams.filters, [
            'seniority',
            'campaign_statuses',
            'campaigns',
            'verified'
          ]),
      add_all: addAll,
    };
    if (addAll || leadbookIds.length > 100) {
      yield put({type: PROGRESS_BAR_START, data: {totalContact: total, listName: listName}});
      const { data } = yield call(putRequest, '/list/add/', payload);
      const { task_id } = data;
      yield updateProgress(task_id);
      yield put(addTolbListsSuccess(data));
    } else {
      const { data } = yield call(putRequest, '/list/add/', payload);
      yield put(addTolbListsSuccess(data));
      notification.success({
        message: 'Success',
        description: `Added ${addAll ? total : leadbookIds.length} ${
          leadbookIds.length > 1 ? `${category}s` : category
        } to ${listName}`,
        placement: 'topRight',
      });
    }

  } catch (err) {
    notification.error({
      message: 'Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchAddLBTolistsSaga() {
  const watcher = yield takeLatest(ADD_TO_LB_LISTS, addLBTolistsSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* removeLBFromlistsSaga({
  leads,
  category,
  lbLists,
  searchParams,
  addAll,
  total,
}) {
  try {
    const leadbookIds = leads.map(({ leadbook_id }) => leadbook_id);
    const listIds = lbLists.map(({ id }) => id);
    const payload = {
      leadbook_ids: leadbookIds,
      lead_type: category === 'Contact' ? 'contact' : 'company',
      list_ids: listIds,
      filters:
        category === 'Contact'
          ? searchParams.filters
          : _.omit(searchParams.filters, [
            'seniority',
            'campaign_statuses',
            'campaigns',
          ]),
      remove_all: addAll,
    };
    const { data } = yield call(putRequest, '/list/remove/', payload);
    const { task_id } = data;
    if (addAll) {
      yield runBackgroundProcessNew(
        task_id,
        'Removing from list in progress...',
        `Removing ${total.toLocaleString()} ${category.toLowerCase()}s from the list. This might take a while.`
      );
    }
    yield put(removeFromlbListsSuccess(leadbookIds));
    yield put(fetchLists(searchParams, category));
    notification.success({
      message: 'Success',
      description: `Removed ${addAll ? total : leadbookIds.length} ${
        leadbookIds.length > 1 ? `${category}s` : category
      } from the list`,
      placement: 'topRight',
    });
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err.data.detail,
      placement: 'topRight',
    });
  }
}

export function* watchRemoveLBFromlistsSaga() {
  const watcher = yield takeLatest(REMOVE_FROM_LB_LISTS, removeLBFromlistsSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* deleteListSaga({ list }) {
  const { id, name } = list;
  try {
    yield call(deleteRequest, `/list/${id}/`);
    yield put(deleteListSuccess(id));
    notification.success({
      message: 'Success',
      description: `Deleted ${name} list.`,
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

export function* watchDeleteListSaga() {
  const watcher = yield takeLatest(DELETE_LIST, deleteListSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* copyListSaga({ list, index }) {
  const { id, name } = list;
  const payload = {
    name: `Copy of ${name}`,
    list_id: id,
  };
  try {
    const { data } = yield call(putRequest, '/list/copy/', payload);
    yield put(copyListSuccess(data, index));
    notification.success({
      message: 'Success',
      description: `Copied ${name} list.`,
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

export function* watchCopyListSaga() {
  const watcher = yield takeLatest(COPY_LIST, copyListSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* renameListSaga({ list, newName, index }) {
  const { id } = list;
  const payload = {
    name: newName,
  };
  try {
    const { data } = yield call(putRequest, `/list/${id}/`, payload);
    yield put(renameListSuccess(data, index));
    notification.success({
      message: 'Success',
      description: 'Updated list name',
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

export function* watchRenameListSaga() {
  const watcher = yield takeLatest(RENAME_LIST, renameListSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateProgress(taskId){
  try{
    let response = yield call(getRequest, `/bgtasks/add-to-list-tasks/${taskId}`);
    let status = true;
    while (response.data.status !== 'completed') {
      yield delay(1000);
      response = yield call(getRequest, `/bgtasks/add-to-list-tasks/${taskId}`);
      yield put({ type: PROGRESS_BAR_UPDATE, data: {progressBar: status, progress: response.data.percentage } })
    }
    yield put({ type: PROGRESS_BAR_UPDATE, data: {progressBar: status, progress: 100 } })
    yield delay(3000);
    status = false;
    yield put({ type: PROGRESS_BAR_UPDATE, data: {progressBar: status, progress: 100 } })

  } catch(err){
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* purchaseListAPI(payload) {
  notification.success({
      message: 'Sending request for quote to purchase list',
      description: '',
      placement: 'topRight',
    });
  try {
    const { data } = yield call(
      postRequest,
      `/purchase-list/`,
      payload
    );
    notification.success({
      message: 'A request for quote to purchase list has been submitted',
      description: '',
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

export function* watchPurchaseList() {
  const watcher = yield takeLatest(PURCHASE_LIST, purchaseListAPI);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// Sagas to be loaded
export default [
  watchCreateLBlistsSaga,
  watchAddLBTolistsSaga,
  watchRemoveLBFromlistsSaga,
  watchDeleteListSaga,
  watchCopyListSaga,
  watchRenameListSaga,
  watchPurchaseList
];
