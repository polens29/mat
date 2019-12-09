/* eslint-disable camelcase, jsx-a11y/no-static-element-interactions */
import React from 'react';
import moment from 'moment';
import {
  Avatar,
  Row,
  Col,
  Spin,
  Tooltip,
  Popconfirm,
  Tag,
  Popover,
  message
} from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router';
import theme from 'styles/theme';
import { toLocaleValue, displayRange, getSocialIcons } from 'utils/helper';
import ListsOnTable from './ListsOnTable';

export const OutdatedIcon = styled.i`
  color: ${theme.colorNames.red};
  margin-right: 3px;
  font-size: 14px;
  cursor: pointer;
`;

export const ReportIcon = styled.i`
  color: #756ad6;
  font-size: 14px;
  margin-top: ${(props) => props.status === 'expired' && '2px;'};
  position: ${(props) => props.status === 'expired' && 'absolute;'};
`;

export const Icon = styled.i`
  font-size: 12px;
`;

const unlockToView = (
  <span style={{ color: `${theme.colorNames.grey}` }}>
    <i>Unlock to view</i>
  </span>
);

const popoverStyle = {
  padding: '0px 2px',
  fontSize: '10px',
  marginBottom: '3px',
};

const displayEmailSpan = (obj) => (
  <div>
    <div className="td-email-display">
      <span className="font-weight-500">
        {obj.email ? (
          <a href={`mailto:${obj.email}`} style={{ color: '#1b70b1 !important;' }}>{obj.email}</a>
        ) : (
            'Unavailable'
          )}
      </span>
    </div>
    {obj.email_verified_date ? (
      <span className="td-email-date">
        Unlocked on {moment(obj.unlocked_at).format('ll')}
      </span>
    ) : (
        <span className="td-email-date">Unavailable</span>
      )}
  </div>
);

const getAvatarDisplay = (image, type) => {
  if (type === 'contact') {
    return (
      <Avatar
        className="avatar-square avatar-contact"
        shape="square"
        icon="user"
        src={image}
      />
    );
  }
  return (
    <Avatar src={image} className="avatar-square avatar-contact" shape="square">
      <i className="material-icons" style={{ marginTop: '2px' }}>
        business
      </i>
    </Avatar>
  );
};

const showloader = (obj, tableOps) => {
  if (!tableOps) {
    return '';
  }
  const { unlockContact, searchParams, category, credits } = tableOps;

  if (obj.loading) {
    return <Spin size="small" />;
  }
  return (
    <i
      className="material-icons material-icon-action"
      style={{ color: `${theme.colorNames.red}`, cursor: 'pointer' }}
      onClick={() =>
        unlockContact(obj, {
          searchParams,
          category,
          credits,
          showInfoModal: tableOps.showInfoModal,
        })
      }
    >
      lock
    </i>
  );
};

function displayColumnArrs(obj, key, keyFlag) {
  if (!obj[keyFlag]) {
    return '-';
  }
  if (!obj.unlocked) {
    return unlockToView;
  }

  return <span className="break-word">{obj[key] && obj[key][0]}</span>;
}

function displayEmails(obj) {
  if (!obj.email_available && !obj.unlocked) {
    return '-';
  }
  if (obj.email_available && !obj.unlocked) {
    return unlockToView;
  }

  if (!obj.email_available && obj.unlocked) {
    return displayEmailSpan({ ...obj, email: '' });
  }

  return displayEmailSpan(obj);
}

const archiveConfirm = (row, category, searchParams, callback) => {
  callback([row], category, searchParams);
};

const getKeywordFormat = (obj, type, code, name) => ({
  type,
  value: {
    [code]: obj[code],
  },
  name: obj[name],
  text: obj[name],
});

const displayIndustry = (obj, handleAddition) => {
  const objIndustries = obj.filter((industryObject) => industryObject !== null);

  if (!objIndustries.length) {
    return '-';
  }

  const renderIndustries = (industry) => (
    <span>
      <a
        onClick={() =>
          handleAddition(
            getKeywordFormat(
              industry,
              'industry',
              'industry_code',
              'industry_name'
            )
          )
        }
      >
        {
          industry.industry_name
        }
      </a>{' '}
      {'>'}{' '}
      <a
        onClick={() =>
          handleAddition(
            getKeywordFormat(
              industry,
              'industry',
              'sub_industry_code',
              'sub_industry_name'
            )
          )
        }
      >
        {industry.sub_industry_name}
      </a>
    </span>
  );

  const firstRow = (
    <span style={{ fontSize: '11px' }}>
      {renderIndustries(objIndustries[0])}
    </span>
  );

  if (objIndustries.length === 1) {
    return firstRow;
  }

  return (
    <div style={{ fontSize: '11px' }}>
      <div className="margin-btm-5">{firstRow}</div>
    </div>
  );
};

const displaySecondaryIndustry = (obj, handleAddition) => {
  const objIndustries = obj.filter((industryObject) => industryObject !== null);

  if (objIndustries.length === 1) {
    return '-';
  }

  if (objIndustries.length > 1) {
    const renderIndustries = (industry) => (
      <span>
        <a
          onClick={() =>
            handleAddition(
              getKeywordFormat(
                industry,
                'industry',
                'industry_code',
                'industry_name'
              )
            )
          }
        >
          {
            industry.industry_name
          }
        </a>{' '}
        {'>'}{' '}
        <a
          onClick={() =>
            handleAddition(
              getKeywordFormat(
                industry,
                'industry',
                'sub_industry_code',
                'sub_industry_name'
              )
            )
          }
        >
          {industry.sub_industry_name}
        </a>
      </span>
    );

    const firstRow = (
      <span style={{ fontSize: '11px' }}>
        {renderIndustries(objIndustries[1])}
      </span>
    );

    if(objIndustries.length === 3){
      const secondRow = (
        <span style={{ fontSize: '11px' }}>
          {renderIndustries(objIndustries[2])}
        </span>
      );

      return (
        <div style={{ fontSize: '11px' }}>
          <div className="margin-btm-5">{firstRow}, <br/>{secondRow}</div>
        </div>
      );
    }

    return (
      <div style={{ fontSize: '11px' }}>
        <div className="margin-btm-5">{firstRow}</div>
      </div>
    );
  }
}

const mapHeirarchyToTag = (obj, code) => ({
  type: 'location',
  value: {
    [code]: obj.code,
  },
  name: obj.name,
  text: obj.name,
});

const displayLocations = (obj, handleAddition) => {
  if (!obj.length) {
    return '-';
  }

  const locationCodes = {
    region: 'region_code',
    country: 'country_code',
    state: 'state_code',
    city: 'city_code',
  };

  const renderHeirarchies = (heirarchies) =>
    heirarchies.map((heirarchy, index) => (
      <span>
        <a
          onClick={() =>
            handleAddition(
              mapHeirarchyToTag(heirarchy, locationCodes[heirarchy.type])
            )
          }
        >
          {heirarchy.name}
        </a>
        {index < heirarchies.length - 1 && ' > '}
      </span>
    ));

  const firstRow = (
    <span style={{ fontSize: '11px' }}>
      {renderHeirarchies(obj[0].hierarchy_with_code)}
    </span>
  );

  if (obj.length === 1) {
    return firstRow;
  }

  const content = (
    <div>
      {obj.map((location) => (
        <div style={{ fontSize: '11px' }}>
          {renderHeirarchies(location.hierarchy_with_code)}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ fontSize: '11px' }}>
      <div className="margin-btm-5">{firstRow}</div>
      <Popover content={content} trigger="click">
        <Tag style={popoverStyle}>{obj.length} locations</Tag>
      </Popover>
    </div>
  );
};

const displayGroupDataObj = (data, name, objectKeys, handleAddition) => {
  if (!data.length) {
    return '-';
  }

  let rowData = data;

  if (rowData.length > 5) {
    rowData = rowData.slice(0, 5);
  }

  const firstRowData = rowData.slice(0, 2);

  const firstRow = (
    <span style={{ fontSize: '11px' }}>
      {firstRowData.map((dataObj, index) => (
        <a
          onClick={() =>
            handleAddition(
              getKeywordFormat(dataObj, name, objectKeys.id, objectKeys.name)
            )
          }
        >
          {dataObj[objectKeys.name]}
          {index < firstRowData.length - 1 && ', '}
        </a>
      ))}
    </span>
  );

  if (rowData.length < 3) {
    return firstRow;
  }

  const content = (
    <div className="break-word" style={{ fontSize: '11px' }}>
      {rowData.map((dataObj, index) => (
        <a
          onClick={() =>
            handleAddition(
              getKeywordFormat(dataObj, name, objectKeys.id, objectKeys.name)
            )
          }
        >
          {dataObj[objectKeys.name]}
          {index < rowData.length - 1 && ', '}
        </a>
      ))}
    </div>
  );

  return (
    <div style={{ fontSize: '11px' }}>
      <div className="margin-btm-5">{firstRow}</div>
      <Popover content={content} trigger="click">
        <Tag style={popoverStyle}>
          {rowData.length} {name}
        </Tag>
      </Popover>
    </div>
  );
};

const displayGroupData = (data, name, handleAddition) => {
  if (!data.length) {
    return '-';
  }

  let rowData = data;

  if (rowData.length > 5) {
    rowData = rowData.slice(0, 5);
  }

  const firstRowData = rowData.slice(0, 2);

  const firstRow = (
    <span style={{ fontSize: '11px' }}>
      {firstRowData.map((dataName, index) => (
        <a
          onClick={() =>
            handleAddition(
              getKeywordFormat(
                { name: dataName, code: dataName },
                name,
                'code',
                'name'
              )
            )
          }
        >
          {dataName}
          {index < firstRowData.length - 1 && ', '}
        </a>
      ))}
    </span>
  );

  if (rowData.length < 3) {
    return firstRow;
  }

  const content = (
    <div className="break-word" style={{ fontSize: '11px' }}>
      {rowData.map((dataName, index) => (
        <a
          onClick={() =>
            handleAddition(
              getKeywordFormat(
                { name: dataName, code: dataName },
                name,
                'code',
                'name'
              )
            )
          }
        >
          {dataName}
          {index < rowData.length - 1 && ', '}
        </a>
      ))}
    </div>
  );

  return (
    <div style={{ fontSize: '11px' }}>
      <div className="margin-btm-5">{firstRow}</div>
      <Popover content={content} trigger="click">
        <Tag style={popoverStyle}>
          {rowData.length} {name}
          {name === 'tag' && 's'}
        </Tag>
      </Popover>
    </div>
  );
};

const displayLists = (obj) => {
  if (!obj.lists.length) {
    return '-';
  }
  return obj.lists
    .filter((list) => !list.is_default)
    .map(({ name }) => name)
    .join(', ');
};

const displaySIN = (obj) => {
  if(!obj.unlocked){
    return unlockToView;
  }

  if(obj == 'undefined'){
    return '-';
  }

  if(!obj.hasOwnProperty('business_ids')){
    return '-';
  }

  if(Object.keys(obj.business_ids).length == 0){
    return '-';
  }

  let value = '';
  for(let x in obj.business_ids){
    value = value + x + ':' + obj.business_ids[x] + ' ';
  }
  return value;
};

const toggleFavorites = (obj, props) => {
  props.toggleFavorites(
    obj,
    props.category,
    props.activeSpecialFilter,
    props.searchParams
  );
};

const onClickAddToList = (obj, props) => {
  const listIndex = _.findIndex(props.list, obj);
  const rowIndex = _.indexOf(props.selectedRowKeys, listIndex);

  if (rowIndex === -1) {
    props.selectedRowKeys.push(listIndex);
    props.selectedRows.push(obj);
    props.updateSelectedRows(props.selectedRowKeys, props.selectedRows);
  }

  props.handleShowListDropDown(true);

  if (props.checkedKeys.length > 0) {
    props.addTolbLists(
      props.selectedRows,
      props.category,
      props.checkedKeys,
      props.searchParams,
      props.selectAllLeads,
      props.total
    );
    props.handleListUpdated(true)
  }
  else {
    message.warning(`Please select a list`, 3);
  }

};

export const contactColumns = (props, onChangeRoute, handleAddition) => {
  const { searchParams, category, deleteContacts, displayColumns } = props;
  const { campaign_statuses, campaigns } = searchParams.filters;

  const selectedColumns = [
    {
      title: 'Name | Email | Phone',
      width: 200,
      render: (obj) => {
        if (!obj.unlocked) {
          return (
            (campaign_statuses.length || campaigns.length) ? (
              <Row>
                <div className="disp-image-block">{showloader(obj, props)}</div>
                <Col xs={18} className="margin-top-5">
                  <i>
                    {obj.credits_required} credit
                {obj.credits_required > 1 && 's'} to purchase
              </i>
                </Col>
              </Row>
            ) : (
                <Row>
                  <div className="available-btns">
                    <Tooltip title="Available">
                      <button>
                        <div className="name">
                          <i className="material-icons">
                            person
                          </i>
                          Name
                        </div>
                      </button>
                    </Tooltip>
                    {
                      obj.email_available && (
                        <Tooltip title="Available">
                          <button>
                            <i className="material-icons">
                              mail
                            </i>
                          </button>
                        </Tooltip>
                      )
                    }
                    {
                      obj.phone_available && (
                        <Tooltip title="Available">
                          <button>
                            <i className="material-icons">
                              phone
                            </i>
                          </button>
                        </Tooltip>
                      )
                    }
                  </div>
                </Row>
              )
          );

        }

        let email_invalid = false;
        if (obj.invalid_reported) {
          if (obj.email_no_bounce == false || obj.email_no_bounce == null) {
            email_invalid = true;
          }
        }

        return (
          <Row>
            <div className="disp-image-block org-name-container">
              {getAvatarDisplay(obj.profile_picture, 'contact')}
            </div>
            <Col xs={18} className="org-container">
              <span className="break-word font-weight-500">{obj.name}</span>
              <div>
                {obj.status === 'expired' && (
                  <Tooltip
                    placement="top"
                    title={`Outdated - ${moment(obj.outdated_at).format('ll')}`}
                  >
                    <Popconfirm
                      placement="topLeft"
                      title="Moved to a new organization"
                      onConfirm={() =>
                        archiveConfirm(
                          obj,
                          category,
                          searchParams,
                          deleteContacts
                        )
                      }
                      okText="Trash"
                      cancelText="Cancel"
                    >
                      <OutdatedIcon
                        className="fa fa-calendar-times-o"
                        aria-hidden="true"
                      />
                    </Popconfirm>
                  </Tooltip>
                )}
                {email_invalid && (
                  <Tooltip placement="top" title="Reported">
                    <ReportIcon
                      className="material-icons"
                      aria-hidden="true"
                      status={obj.status}
                    >
                      report_problem
                    </ReportIcon>
                  </Tooltip>
                )}
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      title: 'Job Title',
      sorter: true,
      sortKey: 'job_title',
      dataIndex: 'job_title',
      key: 'job_title',
      width: 200,
      className: 'break-word',
      render: (title) => (
        <a
          onClick={() =>
            handleAddition(
              getKeywordFormat(
                { name: title, code: title },
                'job_title',
                'code',
                'name'
              )
            )
          }
        >
          {title}
        </a>
      ),
    },
  ];

  if (
    category === 'Contact' &&
    (campaign_statuses.length || campaigns.length)
  ) {
    selectedColumns.splice(1, 0, {
      title: 'Campaign Results',
      width: 140,
      align: 'center',
      render: (contact) => {
        let openedCampaign = 0;
        let clickedCampaign = 0;
        let unsubsribedCampaign = 0;
        if (contact.edm_stats && contact.edm_stats.length) {
          openedCampaign = contact.edm_stats
            .map(({ opens }) => (opens ? 1 : 0))
            .reduce((x, y) => x + y);
          clickedCampaign = contact.edm_stats
            .map(({ clicks }) => (clicks ? 1 : 0))
            .reduce((x, y) => x + y);
          unsubsribedCampaign = contact.edm_stats
            .map(({ unsubscribes }) => (unsubscribes ? 1 : 0))
            .reduce((x, y) => x + y);
        }

        return (
          <div>
            <span className="margin-right-10">
              <Icon
                className="material-icons deliver"
                aria-hidden="true"
                style={{ color: "#8D8ADA", 
                top:"2px !important",
                left:"0px !important",
                position: "relative !important"}}
              >
                drafts
              </Icon>{' '}
              {openedCampaign}
            </span>
            <span className="margin-right-10">
              <Icon
                className="fa fa-check-square"
                aria-hidden="true"
                style={{ color: '#7EC078',fontSize:'12px !important' }}
              />{' '}
              {clickedCampaign}
            </span>
            <span className="margin-right-10">
              <Icon
                className="fa fa-window-close"
                aria-hidden="true"
                style={{ color: '#E65E5A',fontSize:'12px !important' }}
              />{' '}
              {unsubsribedCampaign}
            </span>
          </div>
        );
      },
    });
  }

  const columns = {
    locations: {
      title: 'Location',
      dataIndex: 'locations',
      key: 'locations',
      width: 150,
      sorter: true,
      className: 'break-word',
      render: (obj) => displayLocations(obj, handleAddition),
    },
    social: {
      title: 'Social',
      width: 85,
      render: (obj) => getSocialIcons(obj.social, obj.unlocked, 'font-size-17'),
    },
    organization: {
      title: 'Organization',
      sortKey: 'company',
      sorter: true,
      width: 200,
      className: 'break-word',
      render: (obj) => (
        <Row>
          <div className="disp-image-block org-name-container">
            {getAvatarDisplay(obj.company_logo, obj.type)}
          </div>
          <Col xs={18} className="org-container">
            <span
              className="org-span font-weight-500"
              onClick={() =>
                onChangeRoute(`/app/v3/organization/${obj.company_leadbook_id}`)
              }
            >
              {obj.company}
            </span>
          </Col>
        </Row>
      ),
    },
    industry: {
      title: 'Primary Industry',
      dataIndex: 'industries',
      key: 'industries',
      width: 180,
      className: 'break-word',
      render: (obj) => displayIndustry(obj, handleAddition),
    },
    secondary_industry: {
      title: 'Secondary Industry',
      dataIndex: 'industries',
      key: 'secondary_industry',
      width: 180,
      className: 'break-word',
      render: (obj) => displaySecondaryIndustry(obj, handleAddition),
    },
    company_employees: {
      title: 'Org Size',
      dataIndex: 'company_employees',
      key: 'company_employees',
      sortKey: 'employee_size',
      sorter: true,
      width: 92,
      className: 'break-word',
      render: (range) =>
        displayRange(range, handleAddition, getKeywordFormat, true),
    },
    tags: {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 150,
      className: 'break-word',
      render: (tags) => displayGroupData(tags, 'tag', handleAddition),
    },
    technologies: {
      title: 'Technologies',
      width: 150,
      className: 'break-word',
      render: (obj) =>
        displayGroupDataObj(
          obj.technologies,
          'technologies',
          {
            id: 'primary_id',
            name: 'primary_name',
          },
          handleAddition
        ),
    },
    lists: {
      title: 'Lists',
      width: 150,
      className: 'break-word',
      render: (obj) => displayLists(obj),
    },
    seniorities: {
      title: 'Seniority',
      width: 150,
      className: 'break-word',
      render: (obj) => (obj.seniorities ? obj.seniorities.join(', ') : '-'),
    },
    departments: {
      title: 'Departments',
      width: 150,
      className: 'break-word',
      render: (obj) => (obj.departments ? obj.departments.join(', ') : '-'),
    },
    unlocked_by: {
      title: 'Unlocked by',
      dataIndex: 'unlocked_by',
      key: 'unlocked_by',
      width: 100,
      className: 'break-word',
      render: (obj) => (obj && obj.name) || '-',
    },
  };

  displayColumns.Contact.forEach((contactColumn) => {

    if (contactColumn === 'secondary_industry') {
      selectedColumns.splice(9, 0, columns[contactColumn])
    } else {
      if (columns[contactColumn]) {
        selectedColumns.push(columns[contactColumn]);
      }
    }
  });

  return selectedColumns;
};

const avatarCompanyProfile = (
  obj,
  toggleSidebarDisplay,
  searchParams,
  props,
  category,
  deleteContacts
) => (
    <Row>
      <div className="disp-image-block org-name-container">
        {getAvatarDisplay(obj.logo)} {obj.name}
      </div>
      <div className="available-btns">
        {
          obj.email_available && (
            <Tooltip title="Available">
              <button>
                <i className="material-icons">
                  mail
                </i>
              </button>
            </Tooltip>
          )
        }
        {
          obj.phone_available && (
            <Tooltip title="Available">
              <button>
                <i className="material-icons">
                  phone
                </i>
              </button>
            </Tooltip>
          )
        }
      </div>

      {/*<Col xs={14} className="break-word org-container">
        <span className={`org-span ${obj.unlocked && 'font-weight-500'}`}>
          <Link to={`/app/v3/organization/${obj.leadbook_id}`}>{obj.name}</Link>
          <div>
            {obj.status === 'expired' && (
              <Tooltip
                placement="top"
                title={`Outdated - ${moment(obj.outdated_at).format('ll')}`}
              >
                <Popconfirm
                  placement="topLeft"
                  title="Moved to a new organization"
                  onConfirm={() =>
                    archiveConfirm(obj, category, searchParams, deleteContacts)
                  }
                  okText="Trash"
                  cancelText="Cancel"
                >
                  <OutdatedIcon
                    className="fa fa-calendar-times-o"
                    aria-hidden="true"
                  />
                </Popconfirm>
              </Tooltip>
            )}
            {obj.invalid_reported && (
              <Tooltip placement="top" title="Reported">
                <ReportIcon
                  className="material-icons"
                  aria-hidden="true"
                  status={obj.status}
                >
                  report_problem
              </ReportIcon>
              </Tooltip>
            )}
          </div>
        </span>
      </Col>
    */}
    </Row>
  );

const displayCompanyEmails = (obj) => {
  if (!obj.email_available && !obj.unlocked) {
    return '-';
  }

  if (obj.email_available && !obj.unlocked) {
    return unlockToView;
  }

  return obj.emails ? (
    <div>
      {obj.emails.map((email) => (
        <div className="td-email-display">
          <a href={`mailto:${email}`} style={{ color: '#1b70b1 !important;' }}>
            {email}
          </a>
        </div>
      ))}
    </div>
  ) : (
      '-'
    );
};

export const companyColumns = (props, onChangeRoute, handleAddition) => {
  const {
    toggleSidebarDisplay,
    searchParams,
    displayColumns,
    category,
    deleteContacts,
  } = props;

  const selectedColumns = [
    {
      title: 'Name | Email | Phone',
      sortKey: 'name',
      sorter: true,
      width: 400,
      render: (obj) =>
        avatarCompanyProfile(
          obj,
          toggleSidebarDisplay,
          searchParams,
          props,
          category,
          deleteContacts
        ),
    },
  ];

  const columns = {
    locations: {
      title: 'Location',
      dataIndex: 'locations',
      key: 'locations',
      width: 150,
      className: 'break-word',
      render: (obj) => displayLocations(obj, handleAddition),
    },
    description: {
      title: 'Description',
      dataIndex: 'description',
      width: 200,
      className: 'break-word',
      render: (obj) => (
        <div className="desc-ellipsis">
          <span>{obj || '-'}</span>
        </div>
      ),
    },

    website: {
      title: 'Website',
      width: 200,
      className: 'break-all',
      render: (obj) => {
        const websiteDisplay = obj.website && (
          <a
            target="_blank"
            className="company-link"
            href={`http://${obj.website}`}
          >
            {obj.website}
          </a>
        );
        return obj.unlocked ? websiteDisplay : unlockToView;
      },
    },
    social: {
      title: 'Social',
      width: 85,
      className: 'align-center',
      render: (obj) => getSocialIcons(obj.social, obj.unlocked, 'font-size-17'),
    },
    total_contacts: {
      title: 'Contacts',
      sortKey: 'total_contacts',
      dataIndex: 'total_contacts',
      key: 'total_contacts',
      sorter: true,
      width: 100,
      className: 'break-word',
      render: (value) => (value ? toLocaleValue(value) : '-'),
    },
    industry: {
      title: 'Primary Industry',
      dataIndex: 'industries',
      key: 'industries',
      width: 180,
      className: 'break-word',
      render: (obj) => displayIndustry(obj, handleAddition),
    },
    secondary_industry: {
      title: 'Secondary Industry',
      dataIndex: 'industries',
      key: 'secondary_industry',
      width: 180,
      className: 'break-word',
      render: (obj) => displaySecondaryIndustry(obj, handleAddition),
    },
    employees: {
      title: 'Size',
      dataIndex: 'employees',
      key: 'employees.range',
      sortKey: 'employee_size',
      sorter: true,
      width: 70,
      render: (range) =>
        displayRange(range, handleAddition, getKeywordFormat, true),
    },
    founded: {
      title: 'Founded',
      sortKey: 'founded',
      dataIndex: 'founded',
      key: 'founded',
      sorter: true,
      width: 100,
      className: 'break-word',
    },

    tags: {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 150,
      className: 'break-word',
      render: (tags) => displayGroupData(tags, 'tag', handleAddition),
    },
    technologies: {
      title: 'Technologies',
      width: 150,
      className: 'break-word',
      render: (obj) =>
        displayGroupDataObj(
          obj.technologies,
          'technologies',
          {
            id: 'primary_id',
            name: 'primary_name',
          },
          handleAddition
        ),
    },
    lists: {
      title: 'Lists',
      width: 150,
      className: 'break-word',
      render: (obj) => displayLists(obj),
    },
    unlocked_by: {
      title: 'Unlocked by',
      dataIndex: 'unlocked_by',
      key: 'unlocked_by',
      width: 100,
      className: 'break-word',
      render: (obj) => (obj && obj.name) || '-',
    },
    business_ids: {
      title: 'Standard Identification Number',
      width: 150,
      className: 'break-word',
      render: (obj) => displaySIN(obj),
    },
  };

  displayColumns.Organization.forEach((organizationColumn) => {
    if (columns[organizationColumn]) {
      if (organizationColumn === 'secondary_industry') {
        selectedColumns.splice(9, 0, columns[organizationColumn])
      } else {
        if (columns[organizationColumn]) {
          selectedColumns.push(columns[organizationColumn]);
        }
      }
    }
  });

  return selectedColumns;
};
/* eslint-disable camelcase, jsx-a11y/no-static-element-interactions */
