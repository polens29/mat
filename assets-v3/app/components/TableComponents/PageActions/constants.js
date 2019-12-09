export const modalInfoText = {
  unlockContacts: {
    title: 'Confirmation',
    okText: 'Unlock All',
    display: 'unlockInfo',
    modalIcon: 'lock_open',
  },
  exportContacts: {
    title: 'Confirm bulk action',
    okText: 'Export',
    display: 'exportInfo',
    modalIcon: 'description',
  },
  reportContacts: {
    title: 'Report Invalid Email(s)',
    okText: '',
    display: 'reportInfo',
    modalIcon: 'report_problem',
  },
  reportEmailSuccess: {
    title: 'Report Invalid Email(s)',
    okText: '',
    display: 'reportInfoSuccess',
    modalIcon: 'report_problem',
  },
  archiveContacts: {
    title: 'Do not contact',
    okText: 'OK',
    display: 'archiveInfo',
    modalIcon: 'delete',
  },
  unarchiveContacts: {
    title: 'Remove from do not contact list',
    okText: 'OK',
    display: 'unArchiveInfo',
    modalIcon: 'undo',
  },
  sendCampaign: {
    title: 'Send Campaign',
    display: 'sendCampaign',
    modalIcon: 'send',
  }
};

export const contactColumns = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'job_title', label: 'Job Title' },
  { value: 'company', label: 'Organization' },
  { value: 'industry', label: 'Industry' },
  // { value: 'company_location', label: 'Company Location' },
  // { value: 'company_employees', label: 'Organization Size' },
  { value: 'linkedin', label: 'Linkedin' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'location', label: 'Location' },
  { value: 'company_employees', label: 'Organization size' },
  { value: 'seniorities', label: 'Seniority' },
];

export const companyColumns = [
  { value: 'name', label: 'Name' },
  { value: 'location', label: 'Location' },
  { value: 'industry', label: 'Industry' },
  { value: 'employees', label: 'Employee Size' },
  // { value: 'revenue', label: 'Revenue (USD)' },
  { value: 'founded', label: 'Founded' },
  { value: 'website', label: 'Website' },
  { value: 'emails', label: 'Emails' },
  { value: 'phone_numbers', label: 'Contact Numbers' },
  { value: 'description', label: 'Description' },
  // { value: 'address', label: 'Address' },
  { value: 'linkedin', label: 'Linkedin' },
  { value: 'facebook', label: 'Facebook' },
  // { value: 'type', label: 'Company Type' },
];
