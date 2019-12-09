import { createSelector } from 'reselect';

/**
 * Direct selector to the lists state domain
 */
const selectLists = (state) => state.get('lists');
const makeSelectLBLists = () =>
  createSelector(selectLists, (substate) => substate.get('lbLists').toJS());
 const makeSelectUpdatedLBLists = () =>
  createSelector(selectLists, (substate) => substate.get('updatedList').toJS());
const makeSelectProgressBar = () =>
  createSelector(selectLists, (substate) => substate.get('progressBar'));
const makeSelectProgress = () =>
  createSelector(selectLists, (substate) => substate.get('progress'));
const makeSelectTotalContact = () =>
  createSelector(selectLists, (substate) => substate.get('totalContact'));
const makeSelectListName = () =>
  createSelector(selectLists, (substate) => substate.get('listName'));
const makeSelectAddLbListsLoading = () =>
  createSelector(selectLists, (substate) => substate.get('addLbListsLoading'));
export { selectLists, makeSelectLBLists, makeSelectProgressBar, makeSelectProgress,
   makeSelectTotalContact, makeSelectListName, makeSelectUpdatedLBLists, makeSelectAddLbListsLoading };
