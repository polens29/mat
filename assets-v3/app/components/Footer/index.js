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


import { Pagination, Tooltip, Button, Modal } from 'antd';

const pageSize = 50;

class Footer extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  onChangePage = (page) => {
    const { updateSearchParams } = this.props;
    updateSearchParams('page', page);
  };

  render() {
    const { total, searchParams, loading, category } = this.props;

    const pageRangeStart = getPageRangeStart(searchParams.page, pageSize);
    const pageRangeEnd = getPageRangeEnd(searchParams.page, pageSize, total);

    return (
      <FooterWrapper>
        
          {
            !loading && (
              <div style={{"float":"right"}}>
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
                Unique Organizations
              </div>
            )
          }
          
      </FooterWrapper>
    )
  }
}

export default Footer;
