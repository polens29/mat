/**
 *
 * Pagination
 *
 */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

import About from './About';
// import MoreDetails from './MoreDetails';
// import Technology from './Technology';

export const Wrapper = styled(Card)`
  .company-label {
    margin-top: 10px;
    margin-bottom: 7px;
    font-size: 13px;
    line-height: 18px;
  }

  .company-label > .company-label-title {
    color: #333333;
    font-weight: 500;
  }

  .company-description {
    font-size: 13px;
  }

  .company-link {
    color: #1b70b1;
    cursor: pointer;
  }

  .ant-card-extra {
    top: -4px;
    right: 10px;
    position: absolute;
  }
`;

const tabList = [
  {
    key: 'tab1',
    tab: 'ABOUT',
  },
  // {
  //   key: 'tab2',
  //   tab: 'MORE DETAILS',
  // },
  // {
  //   key: 'tab3',
  //   tab: 'TECHNOLOGY',
  // },
];

class OrganizationDetails extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    key: 'tab1',
    noTitleKey: 'article',
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    const { companyDetails } = this.props;
    const contentList = {
      tab1: <About companyDetails={companyDetails} />,
      // tab2: <MoreDetails companyDetails={companyDetails} />,
      // tab3: <Technology companyDetails={companyDetails} />,
    };

    if (companyDetails.loading) {
      return <Wrapper loading>load</Wrapper>;
    }

    return (
      <div style={{ marginBottom: '20px' }}>
        <Wrapper
          tabList={tabList}
          onTabChange={(key) => {
            this.onTabChange(key, 'key');
          }}
        >
          {contentList[this.state.key]}
        </Wrapper>
      </div>
    );
  }
}

OrganizationDetails.propTypes = {
  companyDetails: PropTypes.object,
  toggleFavorites: PropTypes.func,
};

export default OrganizationDetails;
