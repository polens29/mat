import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = (state) => state.get('homePage');

/**
 * Other specific selectors
 */
const makeSelectList = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('list').toJS());

const makeSelectSearchParams = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('searchParams').toJS()
  );

const makeSelectTotal = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('total'));

// for selected filter list
const makeSelectKeywords = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('keywords').toJS()
  );

const makeSelectCategories = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('category'));

const makeSelectFetching = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('fetching'));

const makeSelectSpecialFIlter = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('category'));

const makeSelectTableColumns = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('tableColumns')
  );

const makeSelectRows = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('selectedRows').toJS()
  );

const makeSelectRowKeys = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('selectedRowKeys').toJS()
  );

const makeSelectAllLeads = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('selectAllLeads')
  );

const makeSelectActiveSpecialFilter = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('activeSpecialFilter')
  );

const makeSelectIsListSelected = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('isListSelected')
  );

const makeSelectSearchValue = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('searchValue'));

const makeSelectExportToCsvCount = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('exportToCsvCount')
  );

const makeSelectCsvUrl = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('csvUrl'));

const makeSelectAggregations = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('aggregations').toJS()
  );

const makeSelectSearchSuggestions = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('suggestions').toJS()
  );


const makeSelectTagsSuggestions = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('tagsSuggestions').toJS()
  );


const makeSelectGetLocations = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('locations').toJS()
  );

const makeSelectGetLocationsHierarchy = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('locationsHierarchy').toJS()
  );

const makeSelectGetTechnologies = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('technologies').toJS()
  );

const makeSelectGetTechnologiesHierarchy = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('technologiesHierarchy').toJS()
  );

const makeSelectGetIndustries = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('industries').toJS()
  );

const makeSelectGetSeniority = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('seniority').toJS()
  );

const makeSelectGetDepartments = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('departments').toJS()
  );

const makeSelectGetRegions = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('regions').toJS()
  );

const makeSelectGetPopularList = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('popularList').toJS()
  );

const makeSelectCampaigns = () =>
  createSelector(selectHomePageDomain, (substate) =>
    substate.get('campaigns').toJS()
  );

const makeSelectCreditCost = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('creditCost'));

const makeSelectTotalToUnlock = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('totalToUnlock'));

const makeSelectErrorMsg = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('errorMsg'));

const makeSelectSuppressAllCompanyContacts = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('suppressAllCompanyContacts'));

const makeSelectProgressBarUnlock = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('progressBarUnlock'));

const makeSelectProgressUnlcok = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('progressUnlock'));

const makeSelectTotalContactUnlock = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('totalContactUnlock'));

const makeSelectSuccessfullContactUnlock = () =>
  createSelector(selectHomePageDomain, (substate) => substate.get('successfullContactUnlock'));

export {
  selectHomePageDomain,
  makeSelectList,
  makeSelectSearchParams,
  makeSelectTotal,
  makeSelectKeywords,
  makeSelectFetching,
  makeSelectCategories,
  makeSelectSpecialFIlter,
  makeSelectTableColumns,
  makeSelectRows,
  makeSelectRowKeys,
  makeSelectAllLeads,
  makeSelectActiveSpecialFilter,
  makeSelectSearchValue,
  makeSelectExportToCsvCount,
  makeSelectCsvUrl,
  makeSelectAggregations,
  makeSelectSearchSuggestions,
  makeSelectTagsSuggestions,
  makeSelectGetLocations,
  makeSelectGetLocationsHierarchy,
  makeSelectGetTechnologies,
  makeSelectGetTechnologiesHierarchy,
  makeSelectGetIndustries,
  makeSelectIsListSelected,
  makeSelectGetDepartments,
  makeSelectGetSeniority,
  makeSelectGetPopularList,
  makeSelectGetRegions,
  makeSelectCampaigns,
  makeSelectCreditCost,
  makeSelectErrorMsg,
  makeSelectSuppressAllCompanyContacts,
  makeSelectProgressBarUnlock,
  makeSelectProgressUnlcok,
  makeSelectTotalContactUnlock,
  makeSelectSuccessfullContactUnlock,
  makeSelectTotalToUnlock
};
