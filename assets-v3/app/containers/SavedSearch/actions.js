import {
  GET_SAVED_SEARCHES,
  GET_SAVED_SEARCHES_SUCCESS,
  CREATE_SAVED_SEARCH,
  CREATE_SAVED_SEARCH_SUCCESS,
  RENAME_SAVED_SEARCH,
  RENAME_SAVED_SEARCH_SUCCESS,
  DELETE_SAVED_SEARCH,
  DELETE_SAVED_SEARCH_SUCCESS,
  COPY_SAVED_SEARCH,
  COPY_SAVED_SEARCH_SUCCESS,
  UPDATE_SAVED_SEARCH,
  UPDATE_SAVED_SEARCH_SUCCESS,
} from './constants';

export function getSavedSearches({ leadType, query, page, pageSize }) {
  return {
    type: GET_SAVED_SEARCHES,
    leadType,
    query,
    page,
    pageSize,
  };
}

export function getSavedSearchesSuccess(saveSearches, total) {
  return {
    type: GET_SAVED_SEARCHES_SUCCESS,
    saveSearches,
    total,
  };
}

export function createSavedSearch(name, category, filters, keywords) {
  return {
    type: CREATE_SAVED_SEARCH,
    name,
    category,
    filters,
    keywords,
  };
}

export function createSavedSearchSuccess(savedSearch) {
  return {
    type: CREATE_SAVED_SEARCH_SUCCESS,
    savedSearch,
  };
}

export function renameSavedSearch(savedSearch, newName, index) {
  return {
    type: RENAME_SAVED_SEARCH,
    savedSearch,
    newName,
    index,
  };
}

export function renameSavedSearchSuccess(savedSearch, index) {
  return {
    type: RENAME_SAVED_SEARCH_SUCCESS,
    savedSearch,
    index,
  };
}

export function deleteSavedSearch(savedSearch) {
  return {
    type: DELETE_SAVED_SEARCH,
    savedSearch,
  };
}

export function deleteSavedSearchSuccess(id) {
  return {
    type: DELETE_SAVED_SEARCH_SUCCESS,
    id,
  };
}

export function copySavedSearch(savedSearch, index) {
  return {
    type: COPY_SAVED_SEARCH,
    savedSearch,
    index,
  };
}

export function copySavedSearchSuccess(savedSearch, index) {
  return {
    type: COPY_SAVED_SEARCH_SUCCESS,
    savedSearch,
    index,
  };
}

export function updateSavedSearch(savedSearch, filters, keywords) {
  return {
    type: UPDATE_SAVED_SEARCH,
    savedSearch,
    filters,
    keywords,
  };
}

export function updateSavedSearchSuccess(savedSearch) {
  return {
    type: UPDATE_SAVED_SEARCH_SUCCESS,
    savedSearch,
  };
}
