/**
*
* SelectedFilter
*
*/

import React, { PropTypes } from 'react';
import { Tag } from 'antd';
import theme from 'styles/theme';

import { FilterContainer } from './css';

function SelectedFilter(props) {
  const removeFilter = (keyword, array) => {
    if (keyword.filters === 'keyword' || array.length === 1) {
      props.setSearchValue('');
    }
    props.removeKeyword(keyword);
  };

  const renderFilters = (keywords) =>
    keywords.map((keyword, index, array) => (
      <Tag
        key={`${keyword.type}: ${keyword.name}`}
        closable
        className={
        keyword.type === 'My unlocked'
          ? 'ant-tag special-tag'
          : 'ant-tag regular-tag'
        }
        afterClose={() => removeFilter(keyword, array)}
      >
        {`${keyword.type}: ${keyword.name}`}
      </Tag>
    ));

  const clearFilter = () => {
    props.keywords.forEach((keyword) => props.removeKeyword(keyword));
    props.setSearchValue('');
    props.toggleSidebarDisplay(false);
  };
  return (
    <FilterContainer keywords={props.keywords}>
      {renderFilters(props.keywords)}
      {props.keywords.length !== 0 && (
        <button onClick={clearFilter}>
          <i
            className="material-icons"
            style={{ color: `${theme.colorNames.grey}`, position: 'relative', top: 8, left: 5 }}
          >
            cancel
          </i>
        </button>
      )}
      {props.keywords.length === 0 && (
        <p className="no-filters-available">
          No filters available. Please use the search above.
        </p>
      )}
    </FilterContainer>
  );
}

SelectedFilter.propTypes = {
  keywords: PropTypes.array,
  setSearchValue: PropTypes.func,
  toggleSidebarDisplay: PropTypes.func,
};

export default SelectedFilter;
