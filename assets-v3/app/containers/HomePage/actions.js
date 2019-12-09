import {
  FETCH_LIST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_ERROR,
  ADD_KEYWORDS,
  REMOVE_KEYWORDS,
  SELECT_CATEGORY,
  UPDATE_SEARCH_PARAMS,
  SELECT_SPECIAL_FILTER,
  UNLOCK_CONTACT,
  UNLOCKED_CONTACT,
  UNLOCK_CONTACT_ERROR,
  UNLOCK_CONTACTS,
  UNLOCKED_CONTACTS,
  UNLOCK_CONTACTS_ERROR,
  CLEAR_KEYWORDS,
  REPORT_CONTACTS,
  REPORT_CONTACTS_SUCCESS,
  DELETE_CONTACTS,
  SET_SEARCH_VALUE,
  SELECT_ALL_LEAD_RESULTS,
  EXPORT_TO_CSV_COUNT,
  EXPORT_TO_CSV_COUNT_SUCCESS,
  EXPORT_DATA_THIRD_PARTY,
  UPDATE_FROM_ROUTER_STATE,
  GET_SEARCH_SUGGESTIONS,
  SET_SEARCH_SUGGESTIONS,
  GET_TAGS_SUGGESTIONS,
  SET_TAGS_SUGGESTIONS,
  GET_FILTERS,
  GET_FILTERS_SUCCESS,
  SET_SYSTEM_FILTER_SELECTION,
  TOGGLE_FAVORITES,
  TOGGLE_FAVORITES_SUCCESS,
  UPDATE_SELECTED_ROWS,
  GET_CAMPAIGNS,
  GET_CAMPAIGNS_SUCCESS,
  GET_CREDIT_COST,
  GET_CREDIT_COST_SUCCESS,
  SUPPRESS_COMPANY_CONTACTS,
  EMPTY_SELECTED_ROWS,
  SET_KEYWORDS,
} from './constants';

function getUnlockCall(category) {
  if (category === 'Organization') {
    return 'company/unlock/';
  }
  return 'contact/unlock/';
}

function getCategoryRequest(category) {
  if (category === 'Contact') {
    return 'contact';
  }
  return 'company';
}

export function updateFromRouterState(
  searchParams,
  category,
  keywords,
  organizationID,
  activeSpecialFilter
) {
  return {
    type: UPDATE_FROM_ROUTER_STATE,
    searchParams,
    category,
    keywords,
    organizationID,
    activeSpecialFilter,
  };
}

export function updateSearchParams(key, value) {
  return {
    type: UPDATE_SEARCH_PARAMS,
    key,
    value,
  };
}

export function fetchLists(searchParams, category) {
  let apiCall = 'company/search/';
  let aggregationApiCall = 'company/search-aggregation/';
  if (category.toUpperCase() === 'CONTACT') {
    apiCall = 'contact/search/';
    aggregationApiCall = 'contact/search-aggregation/';
  }
  return {
    type: FETCH_LIST,
    searchParams,
    category,
    apiCall,
    aggregationApiCall,
  };
}

export function fetchListSuccess({ results, total }) {
  return {
    type: FETCH_LIST_SUCCESS,
    results,
    total,
  };
}

export function fetchListError(err) {
  return {
    type: FETCH_LIST_ERROR,
    err,
  };
}

export function addKeywords(keyword) {
  return {
    type: ADD_KEYWORDS,
    keyword,
  };
}

export function removeKeywords(keyword, searchParams) {
  return {
    type: REMOVE_KEYWORDS,
    keyword,
    searchParams,
  };
}

export function selectCategories(category) {
  return {
    type: SELECT_CATEGORY,
    category,
  };
}

export function specialFilters(category, activeSpecialFilter = true) {
  return {
    type: SELECT_SPECIAL_FILTER,
    category,
    activeSpecialFilter,
  };
}

export function unlockContact(
  contact,
  searchParams,
  category,
  unlockCall,
  showInfoModal
) {
  const apiCall = unlockCall || getUnlockCall(category);
  return {
    type: UNLOCK_CONTACT,
    contact,
    searchParams: { ...searchParams, category, unlockCall },
    unlockCall: apiCall,
    showInfoModal,
  };
}

export function unlockedContact(contact, fromSlider) {
  return {
    type: UNLOCKED_CONTACT,
    contact,
    fromSlider,
  };
}

export function unlockContactError(contact, error) {
  return {
    type: UNLOCK_CONTACT_ERROR,
    contact,
    error,
  };
}

export function unlockContacts(
  contacts,
  searchParams,
  category,
  unlockAll,
  unlockCall,
  total,
  showInfoModal
) {
  const apiCall = unlockCall || getUnlockCall(category);
  return {
    type: UNLOCK_CONTACTS,
    contacts,
    searchParams,
    unlockCall: apiCall,
    unlockAll,
    category,
    total,
    showInfoModal,
  };
}

export function unlockedContacts(contacts, unlockAll) {
  return {
    type: UNLOCKED_CONTACTS,
    contacts,
    unlockAll,
  };
}

export function unlockContactsError(contacts, error) {
  return {
    type: UNLOCK_CONTACTS_ERROR,
    contacts,
    error,
  };
}

export function clearKeywords(typeOfKeyWord, all) {
  return {
    type: CLEAR_KEYWORDS,
    typeOfKeyWord,
    all,
  };
}

export function reportContacts(
  selectedRows,
  checkedList,
  reportDescription,
  fromDeepView
) {
  return {
    type: REPORT_CONTACTS,
    selectedRows,
    checkedList,
    reportDescription,
    fromDeepView,
  };
}

export function reportContactsSuccess(selectedRows) {
  return {
    type: REPORT_CONTACTS_SUCCESS,
    selectedRows,
  };
}

export function getExportToCsvCount(
  category,
  searchParams,
  exportAll,
  selectedRows
) {
  return {
    type: EXPORT_TO_CSV_COUNT,
    category: getCategoryRequest(category),
    searchParams,
    exportAll,
    selectedRows,
  };
}

export function exportToCsvCountSuccess(count, csvUrl) {
  return {
    type: EXPORT_TO_CSV_COUNT_SUCCESS,
    count,
    csvUrl,
  };
}

export function deleteContacts(
  selectedRows,
  category,
  searchParams,
  fromDeepView,
  request,
  suppressAllCompanyContacts
) {
  return {
    type: DELETE_CONTACTS,
    selectedRows,
    category: getCategoryRequest(category),
    searchParams,
    fromDeepView,
    request,
    suppressAllCompanyContacts
  };
}

export function suppressCompanyContacts(value) {
  return {
    type: SUPPRESS_COMPANY_CONTACTS,
    value
  }
}

export function setSearchValue(value) {
  return {
    type: SET_SEARCH_VALUE,
    value,
  };
}

export function selectAllLeadResults(value) {
  return {
    type: SELECT_ALL_LEAD_RESULTS,
    value,
  };
}

export function exportDataThirdParty(
  selectedRows,
  category,
  filters,
  selectAllLeads,
  integrationType
) {
  return {
    type: EXPORT_DATA_THIRD_PARTY,
    selectedRows,
    category,
    filters,
    selectAllLeads,
    integrationType,
  };
}

export function getSearchSuggestions(query, leadType) {
  return {
    type: GET_SEARCH_SUGGESTIONS,
    query,
    leadType,
  };
}

export function setSearchSuggestions(suggestions) {
  return {
    type: SET_SEARCH_SUGGESTIONS,
    suggestions,
  };
}

export function getTagsSuggestions(query) {
  return {
    type: GET_TAGS_SUGGESTIONS,
    query,
  };
}

export function setTagsSuggestions(tagsSuggestions) {
  return {
    type: SET_TAGS_SUGGESTIONS,
    tagsSuggestions,
  };
}

export function getFilters() {
  return {
    type: GET_FILTERS,
  };
}

export function getFiltersSuccess(filters) {
  const {
    sortedLocations,
    locationsHierarchy,
    sortedTechnologies,
    technologiesHierarchy,
    industries,
    seniorities,
    lists,
    departments,
    business_regions,
  } = filters;

  return {
    type: GET_FILTERS_SUCCESS,
    sortedLocations,
    locationsHierarchy,
    sortedTechnologies,
    technologiesHierarchy,
    industries,
    seniorities,
    lists,
    departments,
    business_regions,
  };
}

export function setSystemFilter(filter) {
  return {
    type: SET_SYSTEM_FILTER_SELECTION,
    filter,
  };
}

export function toggleFavorites(
  lead,
  category,
  activeSpecialFilter,
  searchParams,
  fromDeepView
) {
  return {
    type: TOGGLE_FAVORITES,
    lead,
    category,
    activeSpecialFilter,
    searchParams,
    fromDeepView,
  };
}

export function toggleFavoritesSuccess(lead, list, isfavorite) {
  return {
    type: TOGGLE_FAVORITES_SUCCESS,
    lead,
    list,
    isfavorite,
  };
}

export function updateSelectedRows(selectedRowKeys, selectedRows) {
  return {
    type: UPDATE_SELECTED_ROWS,
    selectedRows,
    selectedRowKeys,
  };
}

export function emptySelectedRows() {
  return {
    type: EMPTY_SELECTED_ROWS,
  };
}

export function getCampaigns({ status, query, page, pageSize }) {
  return {
    type: GET_CAMPAIGNS,
    status,
    query,
    page,
    pageSize,
  };
}

export function getCampaignsSuccess(campaigns, total) {
  return {
    type: GET_CAMPAIGNS_SUCCESS,
    campaigns,
    total,
  };
}

export function getCreditCost() {
  return {
    type: GET_CREDIT_COST,
  };
}

export function getCreditCostSuccess(creditCost) {
  return {
    type: GET_CREDIT_COST_SUCCESS,
    creditCost,
  };
}

export function setKeywords(keywords, searchParams) {
  return {
    type: SET_KEYWORDS,
    keywords,
    searchParams,
  };
}

