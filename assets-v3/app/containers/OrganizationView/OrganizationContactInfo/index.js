/**
 *
 * Pagination
 *
 */
/* eslint-disable camelcase, no-nested-ternary, react/jsx-indent */
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Card, Col, Avatar, Row, Button, Spin } from 'antd';
import { Link } from 'react-router';
import moment from 'moment';

import { getSocialIcons } from 'utils/helper';
import { searchParams } from 'containers/HomePage/constants';
import theme from 'styles/theme';

const CardGrid = Card.Grid;
const TitleDiv = styled.div`
  color: #333333;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
`;

const StyledLink = styled.a`
  color: #2876bf;
  line-height: 15px;
`;

const gridStyle = {
  width: '100%',
  padding: '12px',
  borderBottom: '1px solid #ECECEC',
};
const avatarStyle = {
  height: '60px',
  width: '60px',
  float: 'left',
  marginRight: '5px',
};

const Wrapper = styled(Card)`
  .ant-tabs-nav .ant-tabs-tab {
    margin: 0 12px 0 0 !important;
  }
  .ant-tabs-tab-active .ant-tabs-tab {
    font-weight: bold;
  }
  .ant-card-body {
    padding: 12px;
  }
`;

const UpdatedDate = styled.div`
  color: #a9a9a9;
  font-size: 13px;
  font-weight: bold;
  line-height: 15px;
  margin-bottom: 5px;
`;

const UnlockedDate = styled.div`
  color: #a9a9a9;
  font-size: 13px;
  line-height: 15px;
`;

function actionText(status) {
  return (
    <Col span={21} style={{ color: '#838383' }}>
      {status ? 'Unlock to view' : '-'}
    </Col>
  );
}

// eslint-disable-next-line react/prefer-stateless-function
class OrganizationContactInfo extends React.Component {
  topDisplay = () => {
    const { companyDetails } = this.props;
    const { logo } = companyDetails;
    return (
      <CardGrid style={gridStyle} className="card-grid">
        <Avatar
          src={logo}
          className="avatar-square avatar-contact"
          shape="square"
          style={avatarStyle}
        >
          <i
            className="material-icons"
            style={{
              marginTop: '10px',
              fontSize: '40px',
              marginLeft: '-5px',
              color: `${theme.colorNames.white}`,
            }}
          >
            business
          </i>
        </Avatar>
        <div style={{ display: 'inline' }}>
          <TitleDiv>{companyDetails.name}</TitleDiv>
          <div>{companyDetails.location}</div>
          <StyledLink target="_blank" href={`http://${companyDetails.website}`}>
            {companyDetails.website}
          </StyledLink>
          <div>
            {getSocialIcons(
              companyDetails.social,
              companyDetails.unlocked,
              'inline'
            )}
          </div>
        </div>
      </CardGrid>
    );
  };

  bottomDisplay = () => {
    const { companyDetails } = this.props;
    const {
      total_contacts,
      email_available,
      emails,
      phone_numbers,
      phone_available,
      unlocked,
    } = companyDetails;

    const newSearchParams = {
      ...searchParams,
      filters: {
        ...searchParams.filters,
        company_lbid: [companyDetails.leadbook_id],
      },
      category: 'Contact',
    };

    const location = {
      pathname: '/app/v3/contact',
      state: {
        searchParams: newSearchParams,
        activeSpecialFilter: 'All',
        category: 'Contact',
        keywords: [
          {
            type: 'Company',
            category: 'Contact',
            filters: 'company_name',
            id: companyDetails.leadbook_id,
            name: companyDetails.name,
          },
        ],
      },
    };

    return (
      <CardGrid
        style={{ ...gridStyle, borderBottom: 'none' }}
        className="card-grid"
      >
        <Row gutter={8}>
          <Col span={3}>
            <i className="material-icons material-icon-action">group</i>
          </Col>
          <Col span={21} style={{ paddingLeft: '0px' }}>
            Total Contacts{' '}
            <Link
              to={location}
              style={{ textDecoration: 'underline' }}
              onClick={() => this.props.clearKeywords(null, true)}
            >
              See all {total_contacts} contacts
            </Link>
          </Col>
        </Row>

        <Row
          gutter={8}
          style={{ marginBottom: `${emails.length > 1 && '0px'}` }}
        >
          <Col span={3}>
            <i className="material-icons material-icon-action">email</i>
          </Col>
          {!unlocked ? (
            actionText(email_available)
          ) : emails.length ? (
            <Col span={21}>
              <a className="company-link" href={`mailto:${emails[0]}`}>
                {emails[0]}
              </a>
            </Col>
          ) : (
            '-'
          )}
        </Row>

        {emails.length > 1 &&
          emails.map(
            (email, index) =>
              index !== 0 && (
                <Row
                  gutter={8}
                  style={{
                    marginBottom: `${index !== email.length - 1 && '0px'}`,
                    marginTop: `${index === 1 && '-10px'}`,
                  }}
                >
                  <Col span={3}>{''}</Col>
                  <Col span={21}>
                    <a className="company-link" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </Col>
                </Row>
              )
          )}

        <Row
          gutter={8}
          style={{ marginBottom: `${phone_numbers.length > 1 && '0px'}` }}
        >
          <Col span={3}>
            <i className="material-icons material-icon-action">phone</i>
          </Col>
          {!unlocked ? (
            actionText(phone_available)
          ) : phone_numbers.length ? (
            <Col span={21}>
              <p>{phone_numbers[0]}</p>
            </Col>
          ) : (
            '-'
          )}
        </Row>
        {phone_numbers.length > 1 &&
          phone_numbers.map(
            (phone, index) =>
              index !== 0 && (
                <Row
                  gutter={8}
                  style={{
                    marginBottom: `${index !== phone_numbers.length - 1 &&
                      '0px'}`,
                    marginTop: `${index === 1 && '-10px'}`,
                  }}
                >
                  <Col span={3}>{''}</Col>
                  <Col span={21}>
                    <p>{phone}</p>
                  </Col>
                </Row>
              )
          )}

        <Row>
          <Col span={3}>
            <i className="material-icons material-icon-action">location_on</i>
          </Col>
          <Col span={21}>
            {companyDetails.location ? companyDetails.location : '-'}
          </Col>
        </Row>
      </CardGrid>
    );
  };

  render() {
    const { companyDetails } = this.props;

    if (companyDetails.loading) {
      return <Wrapper loading>load</Wrapper>;
    }

    return (
      <div>
        {!companyDetails.unlocked && (
          <Wrapper className="margin-btm-10" style={{ fontSize: '13px' }}>
            Please unlock to view more about this company, i.e website, email
            addresses, contact numbers, contact persons, employees etc.
            <div className="align-center">
              {companyDetails.unlocking ? (
                <Spin tip="Unlocking..." />
                ) : (
                <Button
                  onClick={() => this.props.unlockContact(companyDetails)}
                  type="primary"
                  className="unlock-btn"
                >
                  {companyDetails.credits_required} credit{companyDetails.credits_required >
                    1 && 's'}{' '}
                  to unlock
                </Button>
                ) }
            </div>
          </Wrapper>
        )}

        <Wrapper className="margin-btm-10">
          {this.topDisplay()}
          {this.bottomDisplay()}
        </Wrapper>
        <div>
          <UpdatedDate>
            Updated {moment(companyDetails.updated_at).format('ll')}
          </UpdatedDate>
          {companyDetails.unlocked && (
            <UnlockedDate>
              <span className="margin-right-5">
                Unlocked {moment(companyDetails.unlocked_at).format('ll')}
              </span>
              By:{' '}
              {(companyDetails.unlocked_by &&
                companyDetails.unlocked_by.name) ||
                '-'}
            </UnlockedDate>
          )}
        </div>
      </div>
    );
  }
}

OrganizationContactInfo.propTypes = {
  companyDetails: PropTypes.object,
  clearKeywords: PropTypes.func,
  unlockContact: PropTypes.func,
};

export default OrganizationContactInfo;
