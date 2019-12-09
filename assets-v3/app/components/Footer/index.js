/**
 *
 * Footer
 *
 */

import React, { PropTypes } from 'react';
import { FooterWrapper } from './css';
import {
  getPageRangeStart,
  getPageRangeEnd,
  pageRangeDisplay,
} from 'utils/helper';

import { Pagination, Tooltip, Button, Modal,Select } from 'antd';

const pageSize = 50;

class Footer extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  onChangePage = (page) => {
    const { updateSearchParams } = this.props;
    updateSearchParams('page', page);
  };

  handleChange = (value) => {
    this.props.updateSearchParams('limit', parseInt(value));
  }

  render() {
    const { total, searchParams, loading, category } = this.props;

    const pageRangeStart = getPageRangeStart(searchParams.page, pageSize);
    const pageRangeEnd = getPageRangeEnd(searchParams.page, pageSize, total);
    let pageTotal = total/searchParams.limit;
    if(pageTotal % 1 != 0){
      pageTotal = pageTotal + 1;
      pageTotal = Math.trunc(pageTotal)
    }

    return (
      <FooterWrapper>
        
          {
            !loading && (
              <div>
                <Pagination
                  size={'large'}
                  defaultCurrent={total > 0 ? searchParams.page : 0}
                  onChange={this.onChangePage}
                  pageSize={searchParams.limit}
                  total={total}
                />
                <div className="numpages">
                  {total} items, {pageTotal} pages
                </div>
                <Select defaultValue={searchParams.limit} onChange={this.handleChange}>
                  <Option value="10">10</Option>
                  <Option value="20">20</Option>
                  <Option value="30">30</Option>
                  <Option value="40">40</Option>
                  <Option value="50">50</Option>
                  <Option value="60">60</Option>
                  <Option value="70">70</Option>
                  <Option value="80">80</Option>
                  <Option value="90">90</Option>
                  <Option value="100">100</Option>
                </Select>

                {/*
                <div className="inline" style={{ verticalAlign: 'super' }}>
                  <label
                    style={{
                      lineHeight: '17px',
                      fontSize: '13px',
                      position: 'relative',
                      top: -2,
                      borderRight: '1px solid #d7d7d7',
                      marginRight: '10px',
                      paddingRight: '10px'
                    }}
                  >
                    {pageRangeDisplay(total, pageRangeStart, pageRangeEnd)}
                    {' '}Verified {category}s
                  </label>
                </div>
                <div className="inline-flex" style={{ verticalAlign: 'super' }}>
                  <Pagination
                    simple
                    size={'large'}
                    pageSize={pageSize}
                    total={total}
                    defaultCurrent={total > 0 ? searchParams.page : 0}
                    onChange={this.onChangePage}
                  />
                </div>
                */}
              </div>
            )
          }
          
      </FooterWrapper>
    )
  }
}

export default Footer;
