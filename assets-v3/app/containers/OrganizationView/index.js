/**
 *
 * Organization
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import {
  makeSelectSearchParams,
  makeSelectExportToCsvCount,
  makeSelectCsvUrl,
} from 'containers/HomePage/selectors';
import {
  clearKeywords,
  getExportToCsvCount,
  exportDataThirdParty,
  deleteContacts,
  reportContacts,
  toggleFavorites,
} from 'containers/HomePage/actions';

import { makeSelectCredentials } from 'containers/App/selectors';

import theme from 'styles/theme';
import OrganizationAction from './OrganizationAction';
import OrganizeContactInfo from './OrganizationContactInfo';
import OrganizationDetails, {
  Wrapper as CardWrapper,
} from './OrganizationDetails';
import { getCompanyDetails, unlockContact } from './actions';
import { makeSelectCompanyDetails } from './selectors';

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 15px 40px;
  width: 90%;
  font-size: 13px;
  color: #333333;

  .card-grid,
  .card-grid:hover {
    box-shadow: none;
    -webkit-box-shadow: none;
  }

  a {
    color: #1b70b1 !important;
    font-weight: 600;
  }

  p {
    margin: 0;
  }

  .va-super {
    vertical-align: super;
  }

  .ant-row {
    margin-bottom: 15px;
  }

  .unlock-btn {
    width: 100%;
    margin: 10px 0px 5px 0px;
    background-color: #1c70b1;
    border-radius: 2px !important;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.09);
  }

  .page-btns button {
    margin-left: 5px;
    width: 38px;
    padding: 0;
    color: ${theme.colorNames.white};
    background-color: #337ab7;
    border-color: initial;
    border-radius: 2px !important;
  }

  .page-btns button > .material-icons {
    font-size: 18px;
    color: ${theme.colorNames.white};
    margin-top: 4px;
  }

  .ant-btn.disabled,
  .ant-btn[disabled],
  .ant-btn[disabled]:hover,
  .disabled {
    background-color: #ececec;
    border-color: #ececec;
  }

  .ant-tree li {
    padding: 0px;
  }

  .ant-tree > li:first-child {
    padding-top: 0px;
  }
`;

const tabList = [
  {
    key: 'tab1',
    tab: 'TECHNOLOGY',
  },
];

const displayData = (text) => text || '-';

class Organization extends React.PureComponent {
  componentWillMount() {
    this.props.getCompanyDetails(this.props.routeParams.id);
  }

  render() {
    const { companyDetails } = this.props;
    let companyTechnologies = {};
    if (companyDetails.technologies) {
      companyTechnologies = companyDetails.technologies.reduce(
        (h, a) =>
          Object.assign(h, {
            [a.primary_name]: (h[a.primary_name] || []).concat(a),
          }),
        {}
      );
    }
    const mainTechnologies = Object.keys(companyTechnologies).sort();

    return (
      <Wrapper>
        <Row className="margin-btm-10">
          <OrganizationAction
            companyDetails={companyDetails}
            getExportToCsvCount={this.props.getExportToCsvCount}
            deleteContacts={this.props.deleteContacts}
            reportContacts={this.props.reportContacts}
            exportData={this.props.exportData}
            exportToCsvCount={this.props.exportToCsvCount}
            csvUrl={this.props.csvUrl}
            credentials={this.props.credentials}
            toggleFavorites={this.props.toggleFavorites}
          />
        </Row>
        <Row gutter={{ md: 8 }}>
          <Col lg={8} xs={24}>
            <OrganizeContactInfo
              companyDetails={companyDetails}
              clearKeywords={this.props.clearKeywords}
              unlockContact={this.props.unlockContact}
            />
          </Col>
          <Col lg={16} xs={24}>
            <OrganizationDetails
              companyDetails={companyDetails}
              toggleFavorites={this.props.toggleFavorites}
            />

            {companyDetails.loading ? (
              <CardWrapper loading>load</CardWrapper>
            ) : (
              <CardWrapper tabList={tabList}>
                {mainTechnologies.map((mainTechnology) => (
                  <div className="margin-btm-20">
                    <p className="company-label-title">{mainTechnology}</p>
                    {!companyDetails.unlocked ? (
                      <i>Unlock to view</i>
                    ) : (
                      companyTechnologies[mainTechnology]
                        .sort()
                        .map((secondaryTechnology) => (
                          <div className="inline-block margin-right-20">
                            <p className="company-label">
                              <img
                                className="margin-right-5"
                                src={secondaryTechnology.logo}
                                alt="N/A"
                                height="32"
                                width="32"
                              />
                              <span className="company-label-title">
                                <a href={secondaryTechnology.website}>
                                  {displayData(
                                    secondaryTechnology.secondary_name
                                  )}
                                </a>
                              </span>
                            </p>
                          </div>
                        ))
                    )}
                  </div>
                ))}
              </CardWrapper>
            )}
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

Organization.propTypes = {
  getCompanyDetails: PropTypes.func,
  unlockContact: PropTypes.func,
  clearKeywords: PropTypes.func,
  getExportToCsvCount: PropTypes.func,
  deleteContacts: PropTypes.func,
  reportContacts: PropTypes.func,
  toggleFavorites: PropTypes.func,
  exportData: PropTypes.func,
  exportToCsvCount: PropTypes.number,
  routeParams: PropTypes.object,
  companyDetails: PropTypes.object,
  csvUrl: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  companyDetails: makeSelectCompanyDetails(),
  searchParams: makeSelectSearchParams(),
  exportToCsvCount: makeSelectExportToCsvCount(),
  csvUrl: makeSelectCsvUrl(),
  credentials: makeSelectCredentials(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getExportToCsvCount: (category, searchParams, exportAll, selectedRows) =>
      dispatch(
        getExportToCsvCount(category, searchParams, exportAll, selectedRows)
      ),
    deleteContacts: (
      selectedRows,
      category,
      searchParams,
      fromDeepView,
      request
    ) =>
      dispatch(
        deleteContacts(selectedRows, category, searchParams, true, request)
      ),
    getCompanyDetails: (params) => dispatch(getCompanyDetails(params)),
    clearKeywords: (typeOfKeyword, all) =>
      dispatch(clearKeywords(typeOfKeyword, all)),
    unlockContact: (contact) => dispatch(unlockContact(contact)),
    reportContacts: (leadIds, checkedList, reportDescription) =>
      dispatch(reportContacts(leadIds, checkedList, reportDescription)),
    exportData: (selectedRows, category, filters, selectAllLeads, apiCall) =>
      dispatch(
        exportDataThirdParty(
          selectedRows,
          category,
          filters,
          selectAllLeads,
          apiCall
        )
      ),
    toggleFavorites: (
      lead,
      category,
      activeSpecialFilter,
      searchParams,
      fromDeepView
    ) =>
      dispatch(
        toggleFavorites(
          lead,
          category,
          activeSpecialFilter,
          searchParams,
          fromDeepView
        )
      ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Organization);
