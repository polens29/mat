import styled from 'styled-components';

export const CategorySelectWrapper = styled.div`
  display: inline-block;
  position: absolute;
  top: -11px;

  .category {
    height: 54px;
    width: 120px;
    span {
      color: #ffffff;
      font-size: 14px;
    }
  }

  .selected {
    background-color: #103252;
  }

  .services,
  .campaigns,
  .exchange {
    border-left: 2px solid #3a5d7d;
    padding-left: 0;
  }
`;
