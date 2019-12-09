/**
 *
 * SpecialFilter
 *
 */

import React, { PropTypes } from 'react';
import { Checkbox } from 'antd';
import { UnlockedFilterWrapper } from './css';

class OutdatedFilter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  selectSpecialFilterHandler = (e) => {
    const { category } = this.props;

    const selectedKeyword = {
      type: 'My Outdated',
      category,
      filters: 'outdated',
      name: 'Outdated',
    };
    if (e.target.checked) {
      this.props.addKeyword(selectedKeyword);
    } else {
      this.props.removeKeyword(selectedKeyword);
    }
  };
  render() {
    return (
      <UnlockedFilterWrapper>
        <Checkbox
          checked={this.props.searchParams.filters.outdated}
          onChange={this.selectSpecialFilterHandler}
        >
          Outdated
        </Checkbox>
      </UnlockedFilterWrapper>
    );
  }
}

OutdatedFilter.propTypes = {
  addKeyword: PropTypes.func,
  category: PropTypes.string,
  removeKeyword: PropTypes.func,
  searchParams: PropTypes.object,
};

export default OutdatedFilter;
