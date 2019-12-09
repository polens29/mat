export const UPDATE_FROM_ROUTER_STATE = 'app/HomePage/UPDATE_FROM_ROUTER_STATE';
export const FETCH_LIST = 'app/HomePage/FETCH_LIST';
export const FETCH_LIST_SUCCESS = 'app/HomePage/FETCH_LIST_SUCCESS';
export const FETCH_LIST_ERROR = 'app/HomePage/FETCH_LIST_ERROR';

export const ADD_KEYWORDS = 'app/HomePage/ADD_KEYWORDS';
export const REMOVE_KEYWORDS = 'app/HomePage/REMOVE_KEYWORDS';
export const SELECT_CATEGORY = 'app/HomePage/SELECT_CATEGORY';
export const UPDATE_SEARCH_PARAMS = 'app/HomePage/UPDATE_SEARCH_PARAMS';
export const SELECT_SPECIAL_FILTER = 'app/HomePage/SELECT_SPECIAL_FILTER';
export const CLEAR_KEYWORDS = 'app/HomePage/CLEAR_AND_KEYWORDS';
export const SET_KEYWORDS = 'app/HomePage/SET_KEYWORDS';

export const UNLOCK_CONTACT = 'app/HomePage/UNLOCK_CONTACT';
export const UNLOCKED_CONTACT = 'app/HomePage/UNLOCKED_CONTACT';
export const UNLOCK_CONTACT_ERROR = 'app/HomePage/UNLOCK_CONTACT_ERROR';
export const UNLOCK_CONTACTS = 'app/HomePage/UNLOCK_CONTACTS';
export const UNLOCKED_CONTACTS = 'app/HomePage/UNLOCKED_CONTACTS';
export const UNLOCK_CONTACTS_ERROR = 'app/HomePage/UNLOCK_CONTACTS_ERROR';

export const REPORT_CONTACTS = 'app/HomePage/REPORT_CONTACTS';
export const REPORT_CONTACTS_SUCCESS = 'app/HomePage/REPORT_CONTACTS_SUCCESS';
export const EXPORT_TO_CSV_COUNT = 'app/HomePage/EXPORT_TO_CSV_COUNT';
export const EXPORT_TO_CSV_COUNT_SUCCESS =
  'app/HomePage/EXPORT_TO_CSV_COUNT_SUCCESS';
export const DELETE_CONTACTS = 'app/HomePage/DELETE_CONTACTS';

export const SET_SEARCH_VALUE = 'app/HomePage/SET_SEARCH_VALUE';
export const SELECT_ALL_LEAD_RESULTS = 'app/HomePage/SELECT_ALL_LEAD_RESULTS';

export const GET_PERSONAL_INFO = 'app/HomePage/GET_PERSONAL_INFO';
export const GET_PERSONAL_INFO_SUCCESS =
  'app/HomePage/GET_PERSONAL_INFO_SUCCESS';

export const UPDATE_CONTACT_SEARCH_PARAMS =
  'app/HomePage/UPDATE_CONTACT_SEARCH_PARAMS';
export const GET_COMPANY_CONTACTS_SUCCESS =
  'app/HomePage/GET_COMPANY_CONTACTS_SUCCESS';

export const UPDATE_SALESFORCE_FIELDS = 'app/HomePage/UPDATE_SALESFORCE_FIELDS';
export const EXPORT_DATA_THIRD_PARTY = 'app/HomePage/EXPORT_DATA_THIRD_PARTY';

export const GET_SEARCH_SUGGESTIONS = 'app/HomePage/GET_SEARCH_SUGGESTIONS';
export const SET_SEARCH_SUGGESTIONS = 'app/HomePage/SET_SEARCH_SUGGESTIONS';

export const GET_TAGS_SUGGESTIONS = 'app/HomePage/GET_TAGS_SUGGESTIONS';
export const SET_TAGS_SUGGESTIONS = 'app/HomePage/SET_TAGS_SUGGESTIONS';

export const GET_FILTERS = 'app/HomePage/GET_FILTERS';
export const GET_FILTERS_SUCCESS = 'app/HomePage/GET_FILTERS_SUCCESS';

export const SET_SYSTEM_FILTER_SELECTION =
  'app/HomePage/GET_SYSTEM_FILTER_SELECTION';

export const TOGGLE_FAVORITES = 'app/HomePage/TOGGLE_FAVORITES';
export const TOGGLE_FAVORITES_SUCCESS = 'app/HomePage/TOGGLE_FAVORITES_SUCCESS';

export const UPDATE_SELECTED_ROWS = 'app/ContactTable/UPDATE_SELECTED_ROWS';
export const EMPTY_SELECTED_ROWS = 'app/ContactTable/EMPTY_SELECTED_ROWS';

export const GET_CAMPAIGNS = 'app/Campaigns/GET_CAMPAIGNS';
export const GET_CAMPAIGNS_SUCCESS = 'app/Campaigns/GET_CAMPAIGNS_SUCCESS';

export const GET_CREDIT_COST = 'app/HomePage/GET_CREDIT_COST';
export const GET_CREDIT_COST_SUCCESS = 'app/HomePage/GET_CREDIT_COST_SUCCESS';

export const SUPPRESS_COMPANY_CONTACTS = 'app/HomePage/SUPPRESS_COMPANY_CONTACTS';

export const UNLOCK_START = 'app/HomePage/UNLOCK_START';
export const UNLOCK_UPDATE = 'app/HomePage/UNLOCK_UPDATE';
export const UNLOCK_ERROR = 'app/HomePage/UNLOCK_ERROR';


export const pageSize = 50;
export const searchParams = {
  limit: pageSize,
  page: 1,
  order_by: '',
  filters: {
    and_keywords: [],
    company_name: [],
    company_website: [],
    company_keywords: [],
    job_title: [],
    not_keywords: [],
    locations: [],
    industries: [],
    technologies: [],
    employee_size: [],
    revenue_usd: [],
    company_age: [],
    unlocked: false,
    reported: false,
    outdated: false,
    archived: false,
    favorite: false,
    company_lbid: [],
    leadbook_id: [],
    tags: [],
    list: [],
    seniority: [],
    department: [],
    popular_list: [],
    campaign_statuses: [],
    campaigns: [],
    company_type: [],
    business_regions: [],
    has_phone_number: false,
    verified: true,
    seniority_filter: 'and',
    department_filter: 'and',
    org_has_contacts: false,
    business_emails: false,
    company_sin: []
  },
  specialFilterIdentifier: 'Contact',
};
