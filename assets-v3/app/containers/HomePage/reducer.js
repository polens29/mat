/*
 *
 * HomePage reducer
 *
 */

import { List, fromJS } from 'immutable';

import _ from 'lodash';

import {
  contactColumns,
  companyColumns,
} from 'components/ContactTable/constants';

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
  REPORT_CONTACTS_SUCCESS,
  SET_SEARCH_VALUE,
  SELECT_ALL_LEAD_RESULTS,
  EXPORT_TO_CSV_COUNT,
  EXPORT_TO_CSV_COUNT_SUCCESS,
  UPDATE_FROM_ROUTER_STATE,
  pageSize,
  searchParams,
  SET_SEARCH_SUGGESTIONS,
  SET_TAGS_SUGGESTIONS,
  GET_FILTERS_SUCCESS,
  SET_SYSTEM_FILTER_SELECTION,
  TOGGLE_FAVORITES_SUCCESS,
  UPDATE_SELECTED_ROWS,
  GET_CAMPAIGNS_SUCCESS,
  GET_CREDIT_COST,
  GET_CREDIT_COST_SUCCESS,
  SUPPRESS_COMPANY_CONTACTS,
  UNLOCK_START,
  UNLOCK_UPDATE,
  UNLOCK_ERROR,
  EMPTY_SELECTED_ROWS,
  SET_KEYWORDS,
} from './constants';

function getTableColumn(category) {
  if (category === 'Contact') {
    return contactColumns;
  }
  return companyColumns;
}

function findIndex(list, contact) {
  if (list) {
    return list.findIndex(
      (listItem) => listItem.get('leadbook_id') === contact.leadbook_id
    );
  }
  return '';
}

function addLoadingToList(listItems, actionContacts) {
  if (listItems) {
    return listItems.map((listItem) => {
      const matched = _.find(
        actionContacts,
        (contact) =>
          listItem.get('leadbook_id') === contact.leadbook_id &&
          !listItem.get('unlocked')
      );
      if (matched) {
        return listItem.set('loading', true);
      }
      return listItem;
    });
  }
  return [];
}

function removeLoadingFromList(listItems, actionContacts) {
  if (listItems) {
    return listItems.map((listItem) => {
      const matched = _.find(
        actionContacts,
        (contact) => listItem.get('leadbook_id') === contact.leadbook_id
      );
      if (matched) {
        return listItem.set('loading', false);
      }
      return listItem;
    });
  }
  return [];
}

function updateContacts(listItems, actionContacts) {
  if (listItems) {
    return listItems.map((listItem) => {
      const matched = _.find(
        actionContacts,
        (contact) => listItem.get('leadbook_id') === contact.leadbook_id
      );
      if (matched) {
        return fromJS(matched);
      }
      return listItem;
    });
  }
  return [];
}

function reportContacts(listItems, selectedRows) {
  if (listItems) {
    return listItems.map((listItem) => {
      const matched = _.find(
        selectedRows,
        (contact) => listItem.get('leadbook_id') === contact.leadbook_id
      );
      if (matched) {
        return fromJS({
          ...listItem.toJS(),
          invalid_reported: true,
        });
      }
      return listItem;
    });
  }
  return [];
}

const aggregations = {};

const initialState = fromJS({
  list: [],
  category: 'Contact',
  tableColumns: contactColumns,
  searchParams,
  total: pageSize,
  aggregations,
  keywords: [],
  fetching: false,
  activeSpecialFilter: 'All',
  selectedRows: [],
  selectedRowKeys: [],
  searchValue: '',
  selectAllLeads: false,
  exportToCsvCount: 0,
  csvUrl: '',
  suggestions: [],
  tagsSuggestions: [],
  departments: [],
  locations: [],
  locationsHierarchy: [],
  technologies: [],
  technologiesHierarchy: [],
  industries: [],
  seniority: [],
  regions: [],
  popularList: [],
  lbLists: [],
  lbListsCopy: [],
  isListSelected: false,
  campaigns: [],
  creditCost: 0,
  totalToUnlock: 0,
  errorMsg: '',
  suppressAllCompanyContacts: true,
  progressBarUnlock: false,
  progressUnlock: 0,
  displayColumns: []
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FROM_ROUTER_STATE: {
      return state
        .set('activeSpecialFilter', action.activeSpecialFilter)
        .set('category', action.category)
        .set('tableColumns', getTableColumn(action.category))
        .set('keywords', List([...action.keywords]))
        .set('searchParams', fromJS({ ...action.searchParams }));
    }

    case SET_KEYWORDS: {
      return state
        .set('keywords', List([...action.keywords]))
        .set('searchParams', fromJS({ ...action.searchParams }));
    }

    case FETCH_LIST:
      return state
        .set('fetching', true)
        .set('list', fromJS([]))
        .set('total', 0)
        .set('selectedRowKeys', fromJS([]))
        .set('selectedRows', fromJS([]))
        .set('selectAllLeads', false);

    case FETCH_LIST_SUCCESS:
      return state
        .set('fetching', false)
        .set('list', fromJS(action.results))

        .set('total', action.total);

    case FETCH_LIST_ERROR:
      return state.set('fetching', false);

    case UPDATE_SEARCH_PARAMS:
      return state.setIn(['searchParams', action.key], action.value);

    case ADD_KEYWORDS:
      /**
       *
       * if type of filter is not keyword then it should not update and_keyword
       */
      if (action.keyword.filters === 'and_keywords') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'and_keywords'], (arr) =>
            arr
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword.name)
          );
      } else if (action.keyword.filters === 'company_name') {
        if (action.keyword.category === 'Contact' && action.keyword.id) {
          return state
            .set(
              'keywords',
              state
                .get('keywords')
                .filter((t) => t.name !== action.keyword.name)
                .push(action.keyword)
            )
            .setIn(['searchParams', 'page'], 1)
            .updateIn(['searchParams', 'filters', 'company_lbid'], (arr) =>
              arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
            );
        } else if (
          action.keyword.category === 'Organization' &&
          action.keyword.id
        ) {
          return state
            .set(
              'keywords',
              state
                .get('keywords')
                .filter((t) => t.name !== action.keyword.name)
                .push(action.keyword)
            )
            .setIn(['searchParams', 'page'], 1)
            .updateIn(['searchParams', 'filters', 'leadbook_id'], (arr) =>
              arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
            );
        }
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_name'], (arr) =>
            arr.filter((t) => t !== action.keyword.name).push(action.keyword.name)
          );
      }
      else if (action.keyword.filters === 'company_website') {
        if (action.keyword.category === 'Contact' && action.keyword.id) {
          return state
            .set(
              'keywords',
              state
                .get('keywords')
                .filter((t) => t.name !== action.keyword.name)
                .push(action.keyword)
            )
            .setIn(['searchParams', 'page'], 1)
            .updateIn(['searchParams', 'filters', 'company_lbid'], (arr) =>
              arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
            );
        } else if (
          action.keyword.category === 'Organization' &&
          action.keyword.id
        ) {
          return state
            .set(
              'keywords',
              state
                .get('keywords')
                .filter((t) => t.name !== action.keyword.name)
                .push(action.keyword)
            )
            .setIn(['searchParams', 'page'], 1)
            .updateIn(['searchParams', 'filters', 'leadbook_id'], (arr) =>
              arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
            );
        }
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_website'], (arr) =>
            arr.filter((t) => t !== action.keyword.name).push(action.keyword.name)
          );
      }
      else if (action.keyword.filters === 'unlocked') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .set('activeSpecialFilter', 'Unlocked')
          .setIn(['searchParams', 'filters', 'unlocked'], true)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'reported') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .set('activeSpecialFilter', 'Reported')
          .setIn(['searchParams', 'filters', 'reported'], true)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'favorites') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .set('activeSpecialFilter', 'Favorites')
          .setIn(['searchParams', 'filters', 'favorite'], true)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'trash') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .set('activeSpecialFilter', 'Trash')
          .setIn(['searchParams', 'filters', 'archived'], true)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'outdated') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .set('activeSpecialFilter', 'Outdated')
          .setIn(['searchParams', 'filters', 'outdated'], true)
          .setIn(['searchParams', 'filters', 'unlocked'], true)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'company_keywords') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_keywords'], (arr) =>
            arr.filter((t) => t !== action.keyword.name).push(action.keyword.name)
          );
      } else if (action.keyword.filters === 'job_title') {
        if (action.keyword.mode && action.keyword.category === 'Contact') {
          return state
            .set(
              'keywords',
              state
                .get('keywords')
                .filter((t) => t.name !== action.keyword.name)
                .push(action.keyword)
            )
            .setIn(['searchParams', 'page'], 1)
            .updateIn(['searchParams', 'filters', 'job_title'], (arr) =>
              arr
                .filter((t) => t !== action.keyword.name)
                .push(action.keyword.name)
            );
        }
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'contact_name') {
        if (action.keyword.mode && action.keyword.category === 'Contact') {
          return state
            .set(
              'keywords',
              state
                .get('keywords')
                .filter((t) => t.name !== action.keyword.name)
                .push(action.keyword)
            )
            .setIn(['searchParams', 'page'], 1)
            .updateIn(['searchParams', 'filters', 'leadbook_id'], (arr) =>
              arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
            );
        }
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'not_keywords') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'not_keywords'], (arr) =>
            arr.filter((t) => t !== action.keyword.name).push(action.keyword.name)
          );
      } else if (action.keyword.filters === 'list') {
        return state
          .set('keywords', fromJS([]))
          .set('searchParams', fromJS({ ...searchParams }))
          .set('isListSelected', true)
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'list'], (arr) =>
            arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
          );
      } else if (action.keyword.filters === 'seniority') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'seniority'], (arr) =>
            arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
          );
      } else if (action.keyword.filters === 'department') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'department'], (arr) =>
            arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
          );
      } else if (action.keyword.filters === 'business_regions') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'business_regions'], (arr) =>
            arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
          );
      } else if (action.keyword.filters === 'campaign_statuses') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'campaign_statuses'], (arr) =>
            arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
          );
      } else if (action.keyword.filters === 'company_type') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_type'], (arr) =>
            arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
          );
      } else if (action.keyword.filters === 'campaigns') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'campaigns'], (arr) =>
            arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
          );
      } else if (action.keyword.filters === 'popular_list') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'popular_list'], (arr) =>
            arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
          );
      } else if (action.keyword.filters === 'tag') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'tags'], (arr) =>
            arr.filter((t) => t !== action.keyword.name).push(action.keyword.name)
          );
      } else if (action.keyword.filters === 'locations') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'locations'], (arr) =>
            arr
              .filter((t) => t.country_code !== action.keyword.code)
              .push(action.keyword.code)
          );
      } else if (action.keyword.filters === 'technologies') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'technologies'], (arr) =>
            arr
              .filter((t) => t.code !== action.keyword.code)
              .push(action.keyword.code)
          );
      } else if (action.keyword.filters === 'industry') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'industries'], (arr) =>
            arr
              .filter((t) => t.industry_code !== action.keyword.industry_code)
              .push(action.keyword.industry_code)
          );
      } else if (action.keyword.filters === 'employee_size') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'employee_size'], (arr) =>
            arr.filter((t) => t !== action.keyword.code).push(action.keyword.code)
          );
      } else if (action.keyword.filters === 'revenue_usd') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'revenue_usd'], (arr) =>
            arr.filter((t) => t !== action.keyword.code).push(action.keyword.code)
          );
      } else if (action.keyword.filters === 'company_age') {
        return state
          .set('keywords', state.get('keywords').push(action.keyword))
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_age'], (arr) =>
            arr
              .filter((t) => t !== action.keyword.code)
              .concat(action.keyword.code)
          );
      } else if (action.keyword.filters === 'company_lbid') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t !== action.keyword)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_lbid'], (arr) =>
            arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
          );
      } else if (action.keyword.filters === 'savedFilter') {
        return state
          .set('keywords', state.get('keywords').concat(action.keyword.keywords))
          .set('searchParams', fromJS({ ...searchParams }))
          .setIn(['searchParams', 'page'], 1)
          .setIn(['searchParams', 'filters'], fromJS(action.keyword.filtersValue));
      } else if (action.keyword.filters === 'has_phone_number') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'filters', 'has_phone_number'], true)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'seniority_filter') {
        return state
          .setIn(['searchParams', 'filters', 'seniority_filter'], action.keyword.name)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'department_filter') {
        return state
          .setIn(['searchParams', 'filters', 'department_filter'], action.keyword.name)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'org_has_contacts') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'filters', 'org_has_contacts'], true)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'business_emails') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.name !== action.keyword.name)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'filters', 'business_emails'], true)
          .setIn(['searchParams', 'page'], 1);

      } else if (action.keyword.filters === 'company_sin') {
        return state
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t !== action.keyword)
              .push(action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_sin'], (arr) =>
            arr.filter((t) => t !== action.keyword.id).push(action.keyword.id)
          );
        }
      return state
        .set(
          'keywords',
          state
            .get('keywords')
            .filter((t) => t.type !== 'Keyword')
            .push(action.keyword)
        )
        .setIn(['searchParams', 'page'], 1);

    case REMOVE_KEYWORDS:
      /**
       * if type of filter is special filter "My unlocked" then it should set unlocked back to false in order to get all data.
       * if type of filter is keyword than it should be removed from and_keyword field in order to return all data.
       * all filters should be removed from keyword state when deleting a filter.
       */
      if (action.keyword.filters === 'unlocked') {
        return state
          .setIn(['searchParams', 'filters', 'unlocked'], false)
          .set('activeSpecialFilter', 'All')
          .setIn(['searchParams', 'page'], 1)
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          );
      } else if (action.keyword.filters === 'reported') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .set('activeSpecialFilter', 'All')
          .setIn(['searchParams', 'filters', 'reported'], false)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'favorites') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .set('activeSpecialFilter', 'All')
          .setIn(['searchParams', 'filters', 'favorite'], false)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'trash') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .set('activeSpecialFilter', 'All')
          .setIn(['searchParams', 'filters', 'archived'], false)
          .setIn(['searchParams', 'filters', 'unlocked'], false)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'outdated') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .set('activeSpecialFilter', 'All')
          .setIn(['searchParams', 'filters', 'outdated'], false)
          .setIn(['searchParams', 'page'], 1);
      } else if (action.keyword.filters === 'job_title') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'job_title'], (arr) =>
            arr.filter((t) => t !== action.keyword.name)
          );
      } else if (action.keyword.filters === 'contact_name') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'leadbook_id'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      } else if (action.keyword.filters === 'company_name') {
        if (action.keyword.category === 'Contact' && action.keyword.id) {
          return state
            .set(
              'keywords',
              state.get('keywords').filter((t) => t !== action.keyword)
            )
            .setIn(['searchParams', 'page'], 1)
            .updateIn(['searchParams', 'filters', 'company_lbid'], (arr) =>
              arr.filter((t) => t !== action.keyword.id)
            );
        } else if (
          action.keyword.category === 'Organization' &&
          action.keyword.id
        ) {
          return state
            .set(
              'keywords',
              state.get('keywords').filter((t) => t !== action.keyword)
            )
            .setIn(['searchParams', 'page'], 1)
            .updateIn(['searchParams', 'filters', 'leadbook_id'], (arr) =>
              arr.filter((t) => t !== action.keyword.id)
            );
        }
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_name'], (arr) =>
            arr.filter((t) => t !== action.keyword.name)
          );
      } else if (action.keyword.filters === 'company_keywords') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_keywords'], (arr) =>
            arr.filter((t) => t !== action.keyword.name)
          );
      } else if (action.keyword.filters === 'not_keywords') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'not_keywords'], (arr) =>
            arr.filter((t) => t !== action.keyword.name)
          );
      } else if (action.keyword.filters === 'list') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .set('isListSelected', false)
          .updateIn(['searchParams', 'filters', 'list'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      } else if (action.keyword.filters === 'seniority') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'seniority'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      } else if (action.keyword.filters === 'department') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'department'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      } else if (action.keyword.filters === 'business_regions') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'business_regions'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      } else if (action.keyword.filters === 'campaign_statuses') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'campaign_statuses'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      } else if (action.keyword.filters === 'company_type') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_type'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      } else if (action.keyword.filters === 'campaigns') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'campaigns'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      } else if (action.keyword.filters === 'popular_list') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'popular_list'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      } else if (action.keyword.filters === 'tag') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'tags'], (arr) =>
            arr.filter((t) => t !== action.keyword.name)
          );
      } else if (action.keyword.filters === 'and_keywords') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'and_keywords'], (arr) =>
            arr.filter((t) => t !== action.keyword.name)
          );
      } else if (action.keyword.filters === 'locations') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'locations'], (arr) =>
            arr.filter((t) => {
              if (t && t.size) {
                const keyword = t.toJS();
                return (
                  keyword.country_code !== action.keyword.code.country_code ||
                  keyword.region_code !== action.keyword.code.region_code ||
                  keyword.city_code !== action.keyword.code.city_code ||
                  keyword.state_code !== action.keyword.code.state_code
                );
              }

              return (
                t.country_code !== action.keyword.code.country_code ||
                t.region_code !== action.keyword.code.region_code ||
                t.city_code !== action.keyword.code.city_code ||
                t.state_code !== action.keyword.code.state_code
              );
            })
          );
      } else if (action.keyword.filters === 'industry') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => (t !== action.keyword))
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'industries'], (arr) =>
            arr.filter((t) => {
              if (t && t.size) {
                const keyword = t.toJS();
                return (
                  keyword.industry_code !==
                  action.keyword.industry_code.industry_code ||
                  keyword.sub_industry_code !==
                  action.keyword.industry_code.sub_industry_code
                );
              }
              return (
                t.industry_code !==
                action.keyword.industry_code.industry_code ||
                t.sub_industry_code !==
                action.keyword.industry_code.sub_industry_code
              );
            })
          );
      } else if (action.keyword.filters === 'technologies') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'technologies'], (arr) =>
            arr.filter((t) => {
              if (t && t.size) {
                const keyword = t.toJS();
                return (
                  keyword.primary !== action.keyword.code.primary ||
                  keyword.secondary !== action.keyword.code.secondary
                );
              }

              return (
                t.primary !== action.keyword.code.primary ||
                t.secondary !== action.keyword.code.secondary
              );
            })
          );
      } else if (action.keyword.filters === 'employee_size') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'employee_size'], (arr) =>
            arr.filter((t) => t !== action.keyword.code)
          );
      } else if (action.keyword.filters === 'revenue_usd') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'revenue_usd'], (arr) =>
            arr.filter((t) => t !== action.keyword.code)
          );
      } else if (action.keyword.filters === 'company_age') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_age'], (arr) =>
            arr.filter((t) => t !== action.keyword.code)
          );
      } else if (action.keyword.filters === 'company_lbid') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_lbid'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      } else if (action.keyword.filters === 'has_phone_number') {
        return state
          .setIn(['searchParams', 'filters', 'has_phone_number'], false)
          .set('activeSpecialFilter', 'All')
          .setIn(['searchParams', 'page'], 1)
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          );
      } else if (action.keyword.filters === 'org_has_contacts') {
        return state
          .setIn(['searchParams', 'filters', 'org_has_contacts'], false)
          .set('activeSpecialFilter', 'All')
          .setIn(['searchParams', 'page'], 1)
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          );
      } else if (action.keyword.filters === 'business_emails') {
        return state
          .setIn(['searchParams', 'filters', 'business_emails'], false)
          .set('activeSpecialFilter', 'All')
          .setIn(['searchParams', 'page'], 1)
          .set(
            'keywords',
            state.get('keywords').filter((t) => t.name !== action.keyword.name)
          );
      } else if (action.keyword.filters === 'company_sin') {
        return state
          .set(
            'keywords',
            state.get('keywords').filter((t) => t !== action.keyword)
          )
          .setIn(['searchParams', 'page'], 1)
          .updateIn(['searchParams', 'filters', 'company_sin'], (arr) =>
            arr.filter((t) => t !== action.keyword.id)
          );
      }

      return state
        .set(
          'keywords',
          state.get('keywords').filter((t) => t !== action.keyword)
        )
        .setIn(['searchParams', 'page'], 1)
        .setIn(['searchParams', 'filters', 'keyword'], '');

    case SELECT_CATEGORY: {
      searchParams.filters.job_title = [];
      if (action.category === 'Organization') {
        delete searchParams.filters.job_title;
        return state
          .set('category', action.category)
          .set('keywords', fromJS([]))
          .set('activeSpecialFilter', 'All')
          .set('searchParams', fromJS({ ...searchParams }))
          .set('isListSelected', false)
          .set('tableColumns', getTableColumn(action.category));
      }

      return state
        .set('category', action.category)
        .set('keywords', fromJS([]))
        .set('activeSpecialFilter', 'All')
        .set('searchParams', fromJS({ ...searchParams }))
        .set('isListSelected', false)
        .set('tableColumns', getTableColumn(action.category));
    }
    case SELECT_SPECIAL_FILTER: {
      /**
       * displays all unlocked data depending on the category (company || contact) when selected it should clear all keywords/filters and thus shoudl clear
       * company_name field also.
       * specialFilterIdentifier is used to set between category or company.
       */

      if (action.category === 'Organization') {
        delete searchParams.filters.job_title;
        return state
          .set('category', action.category)
          .set('tableColumns', getTableColumn(action.category))
          .setIn(['searchParams', 'specialFilterIdentifier'], action.category)
          .set('activeSpecialFilter', 'Unlocked')
          .setIn(['searchParams', 'filters', 'unlocked'], true);
      }
      searchParams.filters.job_title = [];
      return state
        .set('category', action.category)
        .set('tableColumns', getTableColumn(action.category))
        .setIn(['searchParams', 'specialFilterIdentifier'], action.category)
        .set('activeSpecialFilter', 'Unlocked')
        .setIn(['searchParams', 'filters', 'unlocked'], true);
    }

    case UPDATE_SELECTED_ROWS: {
      if (state.get('selectAllLeads') && action.selectedRows.length !== 50) {
        return state
          .set('selectAllLeads', false)
          .set('selectedRows', fromJS(action.selectedRows))
          .set('selectedRowKeys', fromJS(action.selectedRowKeys));
      }

      return state
        .set('selectedRows', fromJS(action.selectedRows))
        .set('selectedRowKeys', fromJS(action.selectedRowKeys));
    }

    case UNLOCK_CONTACT: {
      const indexOfRow = findIndex(state.get('list'), action.contact);
      return state.setIn(['list', indexOfRow, 'loading'], true);
    }

    case UNLOCKED_CONTACT: {
      const indexOfRow = findIndex(state.get('list'), action.contact);
      const indexContactValue = fromJS(action.contact);

      if (state.get('selectedRows').toJS().length) {
        const indexOfSelectedRow = findIndex(
          state.get('selectedRows'),
          action.contact
        );
        return state
          .setIn(['list', indexOfRow], indexContactValue)
          .setIn(['selectedRows', indexOfSelectedRow], indexContactValue);
      }

      return state.setIn(['list', indexOfRow], indexContactValue);
    }

    case UNLOCK_CONTACT_ERROR: {
      const indexOfRow = findIndex(state.get('list'), action.contact);
      return state
        .setIn(['list', indexOfRow, 'loading'], false)
        .set('errorMsg', action.error);
    }

    case UNLOCK_CONTACTS: {
      const updatedListItems = addLoadingToList(
        state.get('list'),
        action.contacts
      );

      if (action.unlockAll) {
        return state.set('fetching', true);
      }

      return state.set('list', updatedListItems);
    }

    case UNLOCKED_CONTACTS: {
      const updatedListItems = updateContacts(
        state.get('list'),
        action.contacts
      );
      const updatedSelectedRows = updateContacts(
        state.get('selectedRows'),
        action.contacts
      );
      if (action.unlockAll) {
        return state
          .set('list', updatedListItems)
          .set('selectedRows', updatedSelectedRows)
          .set('fetching', false);
      }

      return state
        .set('list', updatedListItems)
        .set('selectedRows', updatedSelectedRows);
    }

    case UNLOCK_CONTACTS_ERROR:
      return state
        .set('list', removeLoadingFromList(state.get('list'), action.contacts))
        .set('fetching', false)
        .set('errorMsg', action.error);

    case CLEAR_KEYWORDS: {
      if (action.all) {
        return state
          .set('category', 'Contact')
          .set('isListSelected', false)
          .set('keywords', fromJS([]))
          .set('searchParams', fromJS({ ...searchParams }));
      }

      if (action.typeOfKeyWord === null) {
        return state
          .set('activeSpecialFilter', 'All')
          .set('isListSelected', false)
          .set('keywords', fromJS([]))
          .set('searchParams', fromJS({ ...searchParams }));
      }

      if (action.typeOfKeyWord === 'company_lbid') {
        return state
          .setIn(['searchParams', 'filters', action.typeOfKeyWord], null)
          .set(
            'keywords',
            state
              .get('keywords')
              .filter((t) => t.filters !== action.typeOfKeyWord)
          );
      }

      return state
        .setIn(['searchParams', 'filters', action.typeOfKeyWord], fromJS([]))
        .set(
          'keywords',
          state.get('keywords').filter((t) => t.filters !== action.typeOfKeyWord)
        );
    }

    case REPORT_CONTACTS_SUCCESS:
      return state
        .set('list', reportContacts(state.get('list'), action.selectedRows))
        .set('selectedRowKeys', fromJS([]))
        .set('selectedRows', fromJS([]));

    case SET_SEARCH_VALUE:
      return state.set('searchValue', action.value);

    case SELECT_ALL_LEAD_RESULTS:
      if (action.value) {
        return state.set('selectAllLeads', action.value);
      }

      return state
        .set('selectAllLeads', action.value)
        .set('selectedRowKeys', fromJS([]))
        .set('selectedRows', fromJS([]));

    case EXPORT_TO_CSV_COUNT:
      return state.set('exportToCsvCount', -1).set('csvUrl', '');

    case EXPORT_TO_CSV_COUNT_SUCCESS:
      return state
        .set('exportToCsvCount', action.count)
        .set('csvUrl', action.csvUrl);

    case SET_SEARCH_SUGGESTIONS:
      return state.set('suggestions', fromJS(action.suggestions));

    case SET_TAGS_SUGGESTIONS:
      return state.set('tagsSuggestions', fromJS(action.tagsSuggestions));

    case GET_FILTERS_SUCCESS: {
      return state
        .set('departments', fromJS(action.departments))
        .set('locations', fromJS(action.sortedLocations))
        .set('locationsHierarchy', fromJS(action.locationsHierarchy))
        .set('technologies', fromJS(action.sortedTechnologies))
        .set('technologiesHierarchy', fromJS(action.technologiesHierarchy))
        .set('industries', fromJS(action.industries))
        .set('seniority', fromJS(action.seniorities))
        .set('popularList', fromJS(action.lists))
        .set('regions', fromJS(action.business_regions));
    }

    case SET_SYSTEM_FILTER_SELECTION:
      return state.set('activeSpecialFilter', fromJS(action.filter));

    case TOGGLE_FAVORITES_SUCCESS: {
      const indexOfRow = findIndex(state.get('list'), action.lead);
      return state.setIn(['list', indexOfRow, 'lists'], action.list);
    }

    case GET_CAMPAIGNS_SUCCESS: {
      return state.set('campaigns', fromJS(action.campaigns));
    }

    case GET_CREDIT_COST: {
      return state.set('creditCost', -1);
    }

    case GET_CREDIT_COST_SUCCESS: {
      return state
        .set('creditCost', action.creditCost.total)
        .set('totalToUnlock', action.creditCost.breakdown[0].count)
    }

    case SUPPRESS_COMPANY_CONTACTS: {
      return state.set('suppressAllCompanyContacts', action.value);
    }

    case UNLOCK_START: {
      return state
        .set('progressBarUnlock', true)
        .set('progressUnlock', 0)
        .set('totalContactUnlock', action.data.totalContactUnlock)
    }

    case UNLOCK_UPDATE: {
      return state
        .set('progressBarUnlock', action.data.progressBarUnlock)
        .set('progressUnlock', action.data.progressUnlock)

    }

    case UNLOCK_ERROR: {
      return state
        .set('progressBarUnlock', false)
        .set('progressUnlock', 0)
        .set('errorMsg', action.data.error)
    }

    case EMPTY_SELECTED_ROWS: {
      return state
        .set('selectAllLeads', false)
        .set('selectedRows', fromJS([]))
        .set('selectedRowKeys', fromJS([]));
    }

    default:
      return state;
  }
}

export default homePageReducer;
