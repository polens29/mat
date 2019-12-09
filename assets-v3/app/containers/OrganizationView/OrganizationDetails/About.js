/**
 *
 * About
 *
 */

import React, { PropTypes } from 'react';
import { Col, Row, Tree } from 'antd';
import { displayRange, abbreviateNumber } from 'utils/helper';
const TreeNode = Tree.TreeNode;

const displayData = (text) => text || '-';

const displayTickerSymbol = (tickerSymbols) => {
  if (!tickerSymbols || !tickerSymbols.length) {
    return '-';
  }

  const symbols = tickerSymbols.map(
    ({ exchange, symbol }) => (exchange ? `${exchange}:${symbol}` : symbol)
  );

  const firstRow = (
    <span style={{ fontSize: '11px' }}>{symbols.join(', ')}</span>
  );

  if (symbols.length < 3) {
    return firstRow;
  }

  const content = (
    <div className="break-word" style={{ fontSize: '11px' }}>
      {symbols.join(', ')}
    </div>
  );

  return <div style={{ fontSize: '11px' }}>{content}</div>;
};

// eslint-disable-next-line react/prefer-stateless-function
class About extends React.Component {
  render() {
    const { companyDetails } = this.props;
    const { industries } = companyDetails;

    const industryExpandedKeys = industries.map(
      // eslint-disable-next-line camelcase
      ({ industry_code }) => industry_code
    );

    let descriptionDisplay = displayData(companyDetails.description);
    if (!companyDetails.unlocked && descriptionDisplay !== '-') {
      descriptionDisplay = `${companyDetails.description.substring(
        0,
        30
      )}.....`;
    }

    return (
      <div>
        <p className="company-label margin-btm-10">
          <span className="company-label-title">Description:</span>
        </p>

        <div className="margin-btm-10">{descriptionDisplay}</div>

        <p className="company-label margin-btm-10">
          <span className="company-label-title">Address:</span>
        </p>

        <div className="margin-btm-10">
          {displayData(companyDetails.address)}
        </div>

        {companyDetails.unlocked && (
          <div>
            <p className="company-label margin-btm-10">
              <span className="company-label-title">Ticker Symbols:</span>
            </p>

            <div className="margin-btm-10">
              {displayTickerSymbol(companyDetails.ticker_symbols)}
            </div>
          </div>
        )}

        <Row gutter={24} style={{ marginBottom: 0 }}>
          <Col className="gutter-row" span={8}>
            <p className="company-label margin-btm-10 margin-top-0">
              <span className="company-label-title">Employee size:</span>
            </p>
            <div className="margin-btm-10">
              {displayRange(companyDetails.employees)}
            </div>
            <p className="company-label margin-btm-10 margin-top-0">
              <span className="company-label-title">Year founded:</span>
            </p>
            <div className="margin-btm-10">
              {displayData(companyDetails.founded)}
            </div>
            <p className="company-label margin-btm-10 margin-top-0">
              <span className="company-label-title">Revenue (USD):</span>
            </p>
            <div className="margin-btm-10">
              {companyDetails.revenue && companyDetails.revenue.max ? (
                <span>
                  {abbreviateNumber(companyDetails.revenue.min)}-
                  {abbreviateNumber(companyDetails.revenue.max)}
                </span>
              ) : (
                <span>-</span>
              )}
            </div>
          </Col>
          <Col className="gutter-row" span={16}>
            <p className="company-label margin-btm-10 margin-top-0">
              <span className="company-label-title">Company type:</span>
            </p>
            <div className="margin-btm-10">
              {displayData(companyDetails.type)}
            </div>
            <p className="company-label margin-btm-10 margin-top-0">
              <span className="company-label-title">Leadbook ID:</span>
            </p>
            <div className="margin-btm-10">{companyDetails.leadbook_id}</div>
            <p className="company-label margin-btm-10 margin-top-0">
              <span className="company-label-title">D-U-N-S</span>
            </p>
            <div className="margin-btm-10">-</div>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-row">
            <p className="company-label margin-top-0">
              <span className="company-label-title">Industry:</span>
            </p>
            {industries.length ? (
              <Tree showLine defaultExpandedKeys={industryExpandedKeys}>
                {industries.map((industry) => (
                  <TreeNode
                    showLine
                    isLeaf
                    title={industry.industry_name}
                    key={industry.industry_code}
                  >
                    <TreeNode
                      showLine
                      isLeaf
                      title={industry.sub_industry_name}
                      key={industry.sub_industry_code}
                    />
                  </TreeNode>
                ))}
              </Tree>
            ) : (
              '-'
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

About.propTypes = { companyDetails: PropTypes.object };

export default About;
