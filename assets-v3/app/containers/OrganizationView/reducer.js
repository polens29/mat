import { fromJS } from 'immutable';
import {
  UNLOCK_CONTACT,
  UNLOCKED_CONTACT,
  GET_COMPANY_PROFILE,
  INITIALIZE_COMPANY_PROFILE,
} from './constants';

const initialState = fromJS({
  companyDetails: {
    loading: true,
    unlocking: false,
  },
});

function organizationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_PROFILE:
      return state.set('companyDetails', fromJS({ loading: true }));

    case INITIALIZE_COMPANY_PROFILE:
      return state.set('companyDetails', fromJS({ ...action.data }));

    case UNLOCK_CONTACT:
      return state.setIn(['companyDetails', 'unlocking'], true);

    case UNLOCKED_CONTACT:
      return state.set('companyDetails', fromJS({ ...action.contact }));

    default:
      return state;
  }
}

export default organizationReducer;
