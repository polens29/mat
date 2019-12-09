import styled from 'styled-components';

export const FeaturedFilterWrapper = styled.div`
  display: inline-block;
  margin-left: 10px;
  color: #444;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  width: fit-content;

  .keyword-filter-label {
    margin-bottom: 5px;
  }

  .search-keyword {
    margin-bottom: 15px;
  }
`;

export const FeaturedFilterWrapperSafari = styled.div`
  display: inline-block;
  margin-left: 10px;
  color: #444;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  width: fit-content;
  float: right;

  .keyword-filter-label {
    margin-bottom: 5px;
  }

  .search-keyword {
    margin-bottom: 15px;
  }
`;
