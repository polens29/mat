import React from 'react';
import { delay } from 'redux-saga';
import {
  take,
  call,
  put,
  cancel,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { postRequest, getRequest, putRequest } from 'utils/request';
import { notification, message, Icon } from 'antd';
import _ from 'lodash';

import {
  fetchUserNotifications,
  fetchPersonalInfo,
  fetchPersonalInfoSuccess,
} from 'containers/App/actions';
import { getCompanyDetails } from 'containers/OrganizationView/actions';
import {
  integrationsModalToggle,
  getIntegrationStatus,
} from 'containers/Integrations/actions';
import {
  fetchLists,
  fetchListSuccess,
  fetchListError,
  unlockedContact,
  unlockedContacts,
  unlockContactError,
  unlockContactsError,
  reportContactsSuccess,
  exportToCsvCountSuccess,
  setSearchSuggestions,
  setTagsSuggestions,
  getFiltersSuccess,
  toggleFavoritesSuccess,
  getCampaignsSuccess,
  getCreditCostSuccess,
} from './actions';

import {
  FETCH_LIST,
  UNLOCK_CONTACT,
  UNLOCK_CONTACTS,
  REPORT_CONTACTS,
  EXPORT_TO_CSV_COUNT,
  DELETE_CONTACTS,
  EXPORT_DATA_THIRD_PARTY,
  GET_SEARCH_SUGGESTIONS,
  GET_TAGS_SUGGESTIONS,
  GET_FILTERS,
  TOGGLE_FAVORITES,
  GET_CAMPAIGNS,
  GET_CREDIT_COST,
  UNLOCK_START,
  UNLOCK_UPDATE,
  UNLOCK_ERROR
} from './constants';

function runBackgroundNotification(notifMessage, type = 'Info') {
  notification[type.toLowerCase()]({
    message: type,
    description: notifMessage,
    placement: 'topRight',
    duration: 3,
  });
}

function runBackgroundNotificationNew(messageTitle, descriptionMessage) {
  notification.open({
    message: messageTitle,
    description: descriptionMessage,
    icon: <Icon type="loading" />,
    placement: 'topRight',
    duration: 0,
  });
}

function* runBackgroundProcessNew(taskid, messageTitle, descriptionMessage) {
  let backgroundcall = yield call(getRequest, `/bgtasks/${taskid}`);
  runBackgroundNotificationNew(messageTitle, descriptionMessage);
  while (backgroundcall.data.status !== 'COMPLETED') {
    yield delay(3000);
    backgroundcall = yield call(getRequest, `/bgtasks/${taskid}`);
  }
  notification.destroy();

  return 'success';
}

const getChildrenTech = (id, data) =>
  data.filter((tech) => tech.parent_id === id);

const addChildrenTech = (tech, data) => {
  const children = getChildrenTech(tech.id, data).map((child) =>
    addChildrenTech(child, data)
  );
  if (children.length === 0) {
    return {
      title: `${tech.name}`,
      key: tech.id,
    };
  }
  return {
    title: `${tech.name}`,
    key: tech.id,
    children,
  };
};

function handleLocations(locations) {
  const sortedList = _.orderBy(locations, ['name'], ['asc']);
  sortedList.push({
    id: 'Undisclosed',
    name: 'Undisclosed',
    parent_id: null,
    type: 'region',
  });
  const list = getChildren(null, sortedList).map((location) =>
    addChildren(location, sortedList)
  );
  return {
    sortedLocations: sortedList,
    locationsHierarchy: list,
  };
}

function handleTechnologies(technologies) {
  const sortedList = _.orderBy(technologies, ['name'], ['asc']).map((i) => {
    let technology = i;
    if ('parent_id' in technology) {
      technology = {
        ...technology,
        parent_id: `primary-${technology.parent_id}`,
      };
    } else {
      technology = {
        ...technology,
        parent_id: null,
      };
    }
    technology = {
      ...technology,
      id: `${technology.type}-${technology.id}`,
    };
    return technology;
  });
  const list = getChildrenTech(null, sortedList).map((tech) =>
    addChildrenTech(tech, sortedList)
  );

  return {
    sortedTechnologies: sortedList,
    technologiesHierarchy: list,
  };
}

export function* getLists(payload) {
  yield delay(500);
  try {
    const { searchParams } = payload;
    let searchResults;
    // let aggregationSearchResults;
    if (payload.apiCall === 'company/search/') {
      const newFilters = _.omit(searchParams.filters, [
        'company_lbid',
        'seniority',
        'campaign_statuses',
        'campaigns',
        'verified',
      ]);
      searchResults = yield call(postRequest, payload.apiCall, {
        ...searchParams,
        filters: { ...newFilters },
      });
      yield put(fetchListSuccess(searchResults.data));
    } else {
      searchResults = yield call(postRequest, payload.apiCall, searchParams);
      yield put(fetchListSuccess(searchResults.data));
    }
  } catch (err) {
    runBackgroundNotification(
      'Something went wrong, please try again.',
      'Error'
    );
    yield put(fetchListError());
  }
}

export function* watchGetList() {
  const watcher = yield takeLatest(FETCH_LIST, getLists);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* unlockContact({
  contact,
  searchParams,
  unlockCall,
  showInfoModal,
}) {
  try {
    const payload = {
      leadbook_ids: [contact.leadbook_id],
      filters: searchParams.filters,
    };
    const { data } = yield call(postRequest, unlockCall, payload);
    yield put(fetchPersonalInfoSuccess(data.credits));
    if (searchParams.unlockCall && searchParams.category === 'Organization') {
      yield put(unlockedContact(data.results[0]));
    }
    if (searchParams.unlockCall === 'contact/unlock/') {
      yield put(unlockedContact(data.results[0], true));
      return;
    }
    message.success(`Successfully unlocked  ${searchParams.category}.`, 1.0);
    yield put(unlockedContact(data.results[0]));
  } catch (err) {
    showInfoModal();
    yield put(unlockContactError(contact, err.data.detail));
  }
}

export function* watchUnlockContact() {
  const watcher = yield takeLatest(UNLOCK_CONTACT, unlockContact);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
// unlock_all
export function* unlockContacts({
  contacts,
  searchParams,
  unlockCall,
  unlockAll,
  category,
  total,
  showInfoModal,
}) {
  try {
    /* eslint-disable camelcase */
    const getLockedIds = contacts.map(({ leadbook_id }) => leadbook_id);
    /* eslint-disable camelcase */
    if (!getLockedIds.length && !unlockAll) {
      runBackgroundNotification(`${category}s are already unlocked`, 'Info');
      yield put(fetchListError());
      return;
    }
    let newFilters = searchParams.filters;
    if (category !== 'Contact') {
      newFilters = _.omit(searchParams.filters, [
        'company_lbid',
        'seniority',
        'campaign_statuses',
        'campaigns',
        'verified'
      ]);
    }
    const payload = {
      leadbook_ids: getLockedIds,
      filters: newFilters,
      unlock_all: unlockAll,
    };
    

    if(unlockAll){
      if(!unlockAll){
        total = getLockedIds.length;
      }
      yield put({type: UNLOCK_START, data: {totalContactUnlock: total}});
      const { data } = yield call(postRequest, unlockCall, payload);
      const { task_id } = data;
      yield updateProgressUnlock(task_id);
      
    } else{
      const { data } = yield call(postRequest, unlockCall, payload);
      message.success('Successfully unlocked selected contacts.', 2);
      yield put(fetchPersonalInfoSuccess(data.credits));
      yield put(unlockedContacts(data.results, unlockAll));
      return;
    }
    yield put(fetchUserNotifications());
    yield put(fetchPersonalInfo());
    yield put(fetchLists(searchParams, category));

    notification.success({
      message: 'Success',
      description: `Unlocked ${total} ${total > 1 ? `${category}s` : category}`,
      placement: 'topRight',
    });
  } catch (err) {
    let message = (err.status == 402) ? "Not enough credits to unlock" : "Error";
    yield put({type: UNLOCK_ERROR, data: {error: message}})
    showInfoModal();
    yield put(unlockContactsError(contacts, err.data.detail));
  }
}

export function* watchUnlockContacts() {
  const watcher = yield takeLatest(UNLOCK_CONTACTS, unlockContacts);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* reportContacts({
  selectedRows,
  checkedList,
  reportDescription,
  fromDeepView,
}) {
  try {
    const expired = selectedRows.find(({ status }) => status === 'expired');
    if (expired) {
      runBackgroundNotification(
        'Reporting of expired contacts is not allowed',
        'Error'
      );
      return;
    }

    /* eslint-disable camelcase */
    const leadIds = selectedRows.map(({ leadbook_id }) => leadbook_id);
    /* eslint-disable camelcase */
    const payload = {
      leadbook_ids: leadIds,
      fields: checkedList,
      message: reportDescription,
    };
    yield call(postRequest, '/lead/report/', payload);

    if (fromDeepView) {
      yield put(getCompanyDetails(selectedRows[0].leadbook_id));
    } else {
      yield put(reportContactsSuccess(selectedRows));
    }
  } catch (err) {
    runBackgroundNotification(
      'Something went wrong, please try again.',
      'Error'
    );
  }
}

export function* watchReportContacts() {
  const watcher = yield takeLatest(REPORT_CONTACTS, reportContacts);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* exportToCsvCount({
  category,
  searchParams,
  exportAll,
  selectedRows,
}) {
  try {
    const payload = {
      filters: searchParams.filters,
      lead_type: category,
      export_all: exportAll,
    };

    if (!exportAll) {
      const leadIds = selectedRows.map(({ leadbook_id }) => leadbook_id);
      payload.leadbook_ids = leadIds;
    }

    const { data } = yield call(postRequest, '/export/csv/', payload);
    yield put(exportToCsvCountSuccess(data.count, data.download_url));
  } catch (err) {
    yield put(exportToCsvCountSuccess(err.data.detail));
    runBackgroundNotification(err.data.detail, 'Error');
  }
}

export function* watchExportToCsvCount() {
  const watcher = yield takeLatest(EXPORT_TO_CSV_COUNT, exportToCsvCount);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* deleteContacts({
  selectedRows,
  category,
  searchParams,
  fromDeepView,
  request,
  suppressAllCompanyContacts
}) {
  try {
    /* eslint-disable camelcase */
    const leadbookIds = selectedRows.map(({ leadbook_id }) => leadbook_id);
    /* eslint-disable camelcase */
    const payload = {
      leadbook_ids: leadbookIds,
      lead_type: category,
      suppress_company_contacts: suppressAllCompanyContacts
    };

    yield call(putRequest, request, payload);
    if (fromDeepView) {
      yield put(getCompanyDetails(leadbookIds[0]));
    } else {
      yield put(fetchLists(searchParams, category));
    }

    if (request === '/lead/trash/') {
      message.info('Lead has been suppressed.', 1.0);
      return;
    }
    message.info('Lead has been restored.', 1.0);
  } catch (err) {
    runBackgroundNotification(
      'Something went wrong, please try again.',
      'Error'
    );
  }
}

export function* watchDeleteContact() {
  const watcher = yield takeLatest(DELETE_CONTACTS, deleteContacts);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* exportThirdPartyData({
  selectedRows,
  category,
  filters,
  selectAllLeads,
  integrationType,
}) {
  try {
    /* eslint-disable camelcase */
    const unlocked = selectedRows.filter((contact) => contact.unlocked);
    /* eslint-disable camelcase */

    if (!unlocked.length) {
      runBackgroundNotification(
        `${category}s must be unlocked to export`,
        'Info'
      );
      return;
    }

    const leadIds = unlocked.map(({ leadbook_id }) => leadbook_id);
    const leadType = category === 'Contact' ? 'contact' : 'company';
    const { data } = yield call(
      getRequest,
      `export/${integrationType.toLowerCase()}/status/${leadType}`
    );

    if (data.status === 'NOT_AUTHENTICATED') {
      yield put(getIntegrationStatus('contact', integrationType));
      yield put(integrationsModalToggle(true, integrationType));
      runBackgroundNotification(
        `Please authenticate your ${integrationType} account and try again.`,
        'Error'
      );
      return;
    } else if (data.status === 'NO_MAPPINGS') {
      yield put(getIntegrationStatus('contact', integrationType));
      yield put(integrationsModalToggle(true, integrationType));
      runBackgroundNotification(
        `Please set ${integrationType} mapping and try again.`,
        'Error'
      );
      return;
    }

    const payload = {
      leadbook_ids: leadIds,
      lead_type: leadType,
      filters,
      export_all: selectAllLeads,
    };
    yield call(
      postRequest,
      `/export/${integrationType.toLowerCase()}/`,
      payload
    );
    runBackgroundNotification(
      'Exporting data might take some time, you will be notified once exporting is finished.',
      'Success'
    );
  } catch (err) {
    runBackgroundNotification(
      'Something went wrong, please try again.',
      'Error'
    );
  }
}

export function* watchExportThirdPartyData() {
  const watcher = yield takeLatest(
    EXPORT_DATA_THIRD_PARTY,
    exportThirdPartyData
  );

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchSearchSuggestions({ query, leadType }) {
  yield call(delay, 500);
  const url = `/${leadType}/search-suggestion/?query=${query}`;
  try {
    const { data } = yield call(getRequest, url);
    yield put(setSearchSuggestions(data.suggestions));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchFetchSearchSuggestions() {
  const watcher = yield takeLatest(
    GET_SEARCH_SUGGESTIONS,
    fetchSearchSuggestions
  );

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* fetchTagsSuggestions({ query }) {
  yield call(delay, 500);
  const url = `/search-suggestion/tag/?query=${query}`;
  try {
    const { data } = yield call(getRequest, url);
    yield put(setTagsSuggestions(data.suggestions));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchFetchTagsSuggestions() {
  const watcher = yield takeLatest(
    GET_TAGS_SUGGESTIONS,
    fetchTagsSuggestions
  );

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

const getChildren = (id, data) =>
  data.filter((location) => location.parent_id === id);

const addChildren = (location, data) => {
  const children = getChildren(location.id, data).map((child) =>
    addChildren(child, data)
  );
  if (children.length === 0) {
    return {
      title: `${location.name}`,
      key: location.id,
    };
  }
  return {
    title: `${location.name}`,
    key: location.id,
    children,
  };
};

export function* getFiltersSaga() {
  try {
    const { data } = yield call(getRequest, 'filters/');
    const {
      locations,
      industries,
      popular_list_groups,
      popular_lists,
      seniorities,
      technologies,
      departments,
      business_regions,
    } = data;

    const { sortedLocations, locationsHierarchy } = handleLocations(locations);
    const { sortedTechnologies, technologiesHierarchy } = handleTechnologies(
      technologies
    );

    const filters = {
      sortedLocations,
      locationsHierarchy,
      sortedTechnologies,
      technologiesHierarchy,
      industries,
      seniorities,
      departments,
      business_regions,
      lists: { popular_lists, popular_list_groups },
    };

    yield put(getFiltersSuccess(filters));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetFiltersSaga() {
  const watcher = yield takeLatest(GET_FILTERS, getFiltersSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* toggleFavoritesSaga({
  lead,
  category,
  activeSpecialFilter,
  searchParams,
  fromDeepView,
}) {
  try {
    let url = 'lead/favorite/';
    const categoryType = category === 'Contact' ? 'contact' : 'company';
    if (lead.lists.find((list) => list.is_default && list.name === 'favorite')) {
      url = 'lead/unfavorite/';
    }
    const payload = {
      leadbook_ids: [lead.leadbook_id],
      lead_type: categoryType,
    };
    const { data } = yield call(putRequest, url, payload);
    const isfavorite = url === 'lead/favorite/';

    if (fromDeepView) {
      yield put(getCompanyDetails(lead.leadbook_id));
      return;
    }

    if (activeSpecialFilter === 'Favorites') {
      yield put(fetchLists(searchParams, category));
      return;
    }
    const lists = lead.lists.filter((t) => t.name !== 'favorite');
    if (isfavorite) {
      yield put(toggleFavoritesSuccess(lead, [...lists, data.list]));
      return;
    }
    yield put(toggleFavoritesSuccess(lead, lists));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchtToggleFavoritesSaga() {
  const watcher = yield takeLatest(TOGGLE_FAVORITES, toggleFavoritesSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getCampaigns({ status, query, page, pageSize }) {
  try {
    //const { data } = yield call(
    //  getRequest,
    //  `mailer/campaigns/?status=${status}&query=${query}&page=${page}&page_size=${pageSize}`
    //);
    //yield put(getCampaignsSuccess(data.results, data.count));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetCampaigns() {
  const watcher = yield takeLatest(GET_CAMPAIGNS, getCampaigns);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getCreditCost() {
  try {
    const getHomepage = (state) => state.toJS();
    const { homePage } = yield select(getHomepage);
    const { data } = yield call(
      postRequest,
      `/${(homePage.category.toLowerCase()== 'organization') ? 'company' : 'contact'}/credits-for-unlock/`,
      {
        filters: homePage.searchParams.filters,
        unlock_all: true,
      }
    );
    yield put(getCreditCostSuccess(data.required));
  } catch (err) {
    notification.error({
      message: 'Error',
      description: err,
      placement: 'topRight',
    });
  }
}

export function* watchGetCreditCost() {
  const watcher = yield takeLatest(GET_CREDIT_COST, getCreditCost);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateProgressUnlock(taskId){
  try{
    let response = yield call(getRequest, `/bgtasks/unlock-tasks/${taskId}`);
    let status = true;
    while (response.data.status !== 'completed') {
      yield delay(1000);
      response = yield call(getRequest, `/bgtasks/unlock-tasks/${taskId}`);
      yield put({ type: UNLOCK_UPDATE, data: {progressBarUnlock: status, progressUnlock: response.data.percentage} })
    }
    yield put({ type: UNLOCK_UPDATE, data: {progressBarUnlock: status, progressUnlock: 100} })
    yield delay(3000);
    status = false;
    yield put({ type: UNLOCK_UPDATE, data: {progressBarUnlock: status, progressUnlock: 100} })

  } catch(err){
    throw err;
  }
}

// Sagas to be loaded
export default [
  watchGetList,
  watchUnlockContact,
  watchUnlockContacts,
  watchReportContacts,
  watchExportToCsvCount,
  watchDeleteContact,
  watchExportThirdPartyData,
  watchFetchSearchSuggestions,
  watchFetchTagsSuggestions,
  watchGetFiltersSaga,
  watchtToggleFavoritesSaga,
  watchGetCampaigns,
  watchGetCreditCost,
];
