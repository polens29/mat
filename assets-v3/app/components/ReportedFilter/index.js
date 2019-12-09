/**
 *
 * SpecialFilter
 *
 */

import React, { PropTypes } from 'react';
import { Checkbox } from 'antd';
import { UnlockedFilterWrapper } from './css';

class ReportedFilter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  selectSpecialFilterHandler = (e) => {
    const { category } = this.props;

    const selectedKeyword = {
      type: 'My Reported',
      category,
      filters: 'reported',
      name: 'Reported',
    };
    if (e.target.checked) {
      // this.props.specialFilter(category);
      this.props.addKeyword(selectedKeyword);
    } else {
      this.props.removeKeyword(selectedKeyword);
    }
  };
  render() {
    return (
      <UnlockedFilterWrapper>
        <Checkbox
          checked={this.props.searchParams.filters.reported}
          onChange={this.selectSpecialFilterHandler}
        >
          Reported
        </Checkbox>
      </UnlockedFilterWrapper>
    );
  }
}

ReportedFilter.propTypes = {
  addKeyword: PropTypes.func,
  category: PropTypes.string,
  removeKeyword: PropTypes.func,
  searchParams: PropTypes.object,
};

export default ReportedFilter;
