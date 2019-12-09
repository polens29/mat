import {
  GET_LB_LISTS,
  GET_LB_LISTS_SUCCESS,
  CREATE_LB_LISTS,
  ADD_TO_LB_LISTS,
  ADD_TO_LB_LISTS_SUCCESS,
  CREATE_LB_LISTS_SUCCESS,
  REMOVE_FROM_LB_LISTS,
  REMOVE_FROM_LB_LISTS_SUCCESS,
  FILTER_LIST,
  DELETE_LIST,
  DELETE_LIST_SUCCESS,
  COPY_LIST,
  COPY_LIST_SUCCESS,
  RENAME_LIST,
  RENAME_LIST_SUCCESS,
  PROGRESS_BAR_START,
  PROGRESS_BAR_UPDATE,
  PURCHASE_LIST,
  PURCHASE_LIST_SUCCESS
} from './constants';

export function getlbLists(category) {
  const type = category === 'Organization' ? 'company' : 'contact';
  return {
    type: GET_LB_LISTS,
    category: type,
  };
}

export function getlbListsSuccess(lbLists) {
  return {
    type: GET_LB_LISTS_SUCCESS,
    lbLists,
  };
}

export function createlbLists(name, category) {
  return {
    type: CREATE_LB_LISTS,
    name,
    category,
  };
}

// push to array from reducer lbLists
export function createlbListsSuccess(lbList) {
  return {
    type: CREATE_LB_LISTS_SUCCESS,
    lbList,
  };
}

export function addTolbLists(
  leads,
  category,
  lbLists,
  searchParams,
  addAll,
  total
) {
  return {
    type: ADD_TO_LB_LISTS,
    leads, // selectedRows..
    category,
    lbLists,
    searchParams,
    addAll,
    total,
  };
}

export function addTolbListsSuccess(lbLists, index) {
  return {
    type: ADD_TO_LB_LISTS_SUCCESS,
    lbLists,
    index,
  };
}
export function removeFromlbLists(
  leads,
  category,
  lbLists,
  searchParams,
  addAll,
  total
) {
  return {
    type: REMOVE_FROM_LB_LISTS,
    leads, // selectedRows..
    category,
    lbLists,
    searchParams,
    addAll,
    total,
  };
}

export function removeFromlbListsSuccess(leadIds) {
  return {
    type: REMOVE_FROM_LB_LISTS_SUCCESS,
    leadIds,
  };
}

export function filterList(query) {
  return {
    type: FILTER_LIST,
    query,
  };
}
export function deleteList(list) {
  return {
    type: DELETE_LIST,
    list,
  };
}

export function deleteListSuccess(id) {
  return {
    type: DELETE_LIST_SUCCESS,
    id,
  };
}

export function copyList(list, index) {
  return {
    type: COPY_LIST,
    list,
    index,
  };
}

export function copyListSuccess(list, index) {
  return {
    type: COPY_LIST_SUCCESS,
    list,
    index,
  };
}

export function renameList(list, newName, index) {
  return {
    type: RENAME_LIST,
    list,
    newName,
    index,
  };
}

export function renameListSuccess(list, index) {
  return {
    type: RENAME_LIST_SUCCESS,
    list,
    index,
  };
}

export function purchaseList(payload) {
  return {
    type: PURCHASE_LIST,
    payload,
  };
}
