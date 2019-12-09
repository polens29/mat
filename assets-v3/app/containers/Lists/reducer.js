/*
 *
 * Lists reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_LB_LISTS_SUCCESS,
  CREATE_LB_LISTS_SUCCESS,
  REMOVE_FROM_LB_LISTS_SUCCESS,
  FILTER_LIST,
  DELETE_LIST_SUCCESS,
  COPY_LIST_SUCCESS,
  RENAME_LIST_SUCCESS,
  PROGRESS_BAR_START,
  PROGRESS_BAR_UPDATE,
  ADD_TO_LB_LISTS_SUCCESS,
  ADD_TO_LB_LISTS,
} from './constants';

const initialState = fromJS({
  lbLists: [],
  lbListsCopy: [],
  progressBar: false,
  progress: 0,
  totalContact: 0,
  listName: '',
  updatedList: {},
  addLbListsLoading: false,
});

function listsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_LB_LISTS: {
      return state
        .set('addLbListsLoading', true);
    }
    
    case ADD_TO_LB_LISTS_SUCCESS: {
      return state
        .set('updatedList', fromJS(action.lbLists.lists[0]))
        .set('addLbListsLoading', false);
    }

    case GET_LB_LISTS_SUCCESS: {
      return state
        .set('lbLists', fromJS(action.lbLists))
        .set('lbListsCopy', fromJS(action.lbLists));
    }

    case CREATE_LB_LISTS_SUCCESS: {
      return state
        .set('lbLists', state.get('lbLists').push(fromJS(action.lbList.list)))
        .set(
          'lbListsCopy',
          state.get('lbListsCopy').push(fromJS(action.lbList.list))
        );
    }

    case REMOVE_FROM_LB_LISTS_SUCCESS: {
      return state.set(
        'lbLists',
        state.get('lbLists').filter((t) => {
          const exist = action.leadIds.find(
            (leadID) => leadID === t.get('leadbook_id')
          );
          return !exist;
        })
      );
    }

    case DELETE_LIST_SUCCESS: {
      return state
        .updateIn(['lbLists'], (arr) =>
          arr.filter((t) => t.get('id') !== action.id)
        )
        .updateIn(['lbListsCopy'], (arr) =>
          arr.filter((t) => t.get('id') !== action.id)
        );
    }

    case COPY_LIST_SUCCESS: {
      /**
      need to insert the copied list next to the original source
      so passing in the index array + 1 for the after position and 0 is fir the items
      deleted for splice
       */

      return state
        .set(
          'lbLists',
          state
            .get('lbLists')
            .splice(action.index + 1, 0, fromJS(action.list.list))
        )
        .set(
          'lbListsCopy',
          state
            .get('lbListsCopy')
            .splice(action.index + 1, 0, fromJS(action.list.list))
        );
    }

    case RENAME_LIST_SUCCESS: {
      return state
        .setIn(['lbLists', action.index, 'name'], action.list.name)
        .setIn(['lbListsCopy', action.index, 'name'], action.list.name);
    }

    case FILTER_LIST: {
      const lbListsCopy = state.get('lbListsCopy').filter((list) =>
        list
          .get('name')
          .toLowerCase()
          .includes(action.query.toLowerCase())
      );
      return state.set('lbLists', lbListsCopy);
    }

    case PROGRESS_BAR_START: {

      return state
        .set('progressBar', true)
        .set('progress', 0)
        .set('totalContact', action.data.totalContact)
        .set('listName', action.data.listName)
    }

    case PROGRESS_BAR_UPDATE: {
      return state
        .set('progressBar', action.data.progressBar)
        .set('progress', action.data.progress)

    }

    default:
      return state;
  }
}

export default listsReducer;
