import {
  UNLOCK_CONTACT,
  UNLOCKED_CONTACT,
  GET_COMPANY_PROFILE,
  INITIALIZE_COMPANY_PROFILE,
} from './constants';

export function getCompanyDetails(id) {
  return {
    type: GET_COMPANY_PROFILE,
    id,
  };
}

export function initializeCompanyDetails(data) {
  return {
    type: INITIALIZE_COMPANY_PROFILE,
    data,
  };
}

export function unlockContact(contact) {
  return {
    type: UNLOCK_CONTACT,
    contact,
  };
}

export function unlockedContact(contact) {
  return {
    type: UNLOCKED_CONTACT,
    contact,
  };
}
