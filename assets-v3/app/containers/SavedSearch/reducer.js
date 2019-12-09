/*
 *
 * SavedSearch reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_SAVED_SEARCHES_SUCCESS,
  CREATE_SAVED_SEARCH_SUCCESS,
  RENAME_SAVED_SEARCH_SUCCESS,
  DELETE_SAVED_SEARCH_SUCCESS,
  COPY_SAVED_SEARCH_SUCCESS,
  UPDATE_SAVED_SEARCH_SUCCESS,
} from './constants';

const initialState = fromJS({
  savedSearches: [],
  savedSearch: {},
});

function savedSearchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SAVED_SEARCHES_SUCCESS: {
      return state
        .set('savedSearches', fromJS(action.saveSearches));
    }

    case CREATE_SAVED_SEARCH_SUCCESS: {
      return state
        .set('savedSearch', fromJS(action.savedSearch));
    }

    case RENAME_SAVED_SEARCH_SUCCESS: {
      return state
        .setIn(['savedSearches', action.index, 'name'], action.savedSearch.name);
    }

    case DELETE_SAVED_SEARCH_SUCCESS: {
      return state
        .updateIn(['savedSearches'], (arr) =>
          arr.filter((t) => t.get('id') !== action.id)
        );
    }

    case COPY_SAVED_SEARCH_SUCCESS: {
      return state
        .set(
          'savedSearches',
          state
            .get('savedSearches')
            .splice(action.index + 1, 0, fromJS(action.savedSearch))
        );
    }

    case UPDATE_SAVED_SEARCH_SUCCESS: {
      return state
        .set('savedSearch', fromJS(action.savedSearch));
    }

    default:
      return state;
  }
}

export default savedSearchReducer;
