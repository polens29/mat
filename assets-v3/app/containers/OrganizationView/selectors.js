import { createSelector } from 'reselect';

/**
 * Direct selector to the companyDetails state domain
 */
const selectOrganizationView = (state) => state.get('organizationView');

const makeSelectCompanyDetails = () =>
  createSelector(selectOrganizationView, (substate) =>
    substate.get('companyDetails').toJS()
  );

/**
 * Other specific selectors
 */

export { selectOrganizationView, makeSelectCompanyDetails };
