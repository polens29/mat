import { createSelector } from 'reselect';

/**
 * Direct selector to the saved search state domain
 */
const selectSavedSearchDomain = (state) => state.get('savedSearch');
const makeSelectSavedSearches = () =>
  createSelector(selectSavedSearchDomain, (substate) =>
    substate.get('savedSearches').toJS()
  );
export { selectSavedSearchDomain, makeSelectSavedSearches };
