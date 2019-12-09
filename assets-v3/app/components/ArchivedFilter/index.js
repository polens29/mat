/**
 *
 * SpecialFilter
 *
 */

import React, { PropTypes } from 'react';
import { Checkbox } from 'antd';
import { UnlockedFilterWrapper } from './css';

class ArchivedFilter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  selectSpecialFilterHandler = (e) => {
    const { category } = this.props;

    const selectedKeyword = {
      type: 'My Archived',
      category,
      filters: 'archived',
      name: 'Archived',
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
          checked={this.props.searchParams.filters.archived}
          onChange={this.selectSpecialFilterHandler}
        >
          Archived
        </Checkbox>
      </UnlockedFilterWrapper>
    );
  }
}

ArchivedFilter.propTypes = {
  addKeyword: PropTypes.func,
  category: PropTypes.string,
  removeKeyword: PropTypes.func,
  searchParams: PropTypes.object,
};

export default ArchivedFilter;
