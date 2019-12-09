/**
 *
 * SpecialFilter
 *
 */

import React, { PropTypes } from 'react';
import { Checkbox } from 'antd';
import { UnlockedFilterWrapper } from './css';

class UnlockedFilter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  selectSpecialFilterHandler = (e) => {
    const { category } = this.props;

    const selectedKeyword = {
      type: 'My unlocked',
      category,
      filters: category,
      name: 'Unlocked',
    };
    if (e.target.checked) {
      this.props.specialFilter(category);
      this.props.addKeyword(selectedKeyword);
    } else {
      this.props.removeKeyword(selectedKeyword);
    }
  };
  render() {
    return (
      <UnlockedFilterWrapper>
        <Checkbox
          checked={this.props.searchParams.filters.unlocked}
          onChange={this.selectSpecialFilterHandler}
        >
          Show Unlocked Only
        </Checkbox>
      </UnlockedFilterWrapper>
    );
  }
}

UnlockedFilter.propTypes = {
  specialFilter: PropTypes.func,
  addKeyword: PropTypes.func,
  category: PropTypes.string,
  removeKeyword: PropTypes.func,
  searchParams: PropTypes.object,
};

export default UnlockedFilter;
