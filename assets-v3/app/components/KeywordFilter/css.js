import styled from 'styled-components';

export const KWrapper = styled.div`
  display: inline-block;
  margin-left: 10px;
  font-weight: 500;
  color: #444;
  position: relative;
  cursor: pointer;  
  width: fit-content;
`;

export const AdvancedSearchWrapper = styled.div`
  display: inline-grid;
  margin-bottom: 10px;
  width: 100%;

  label {
    font-size: 12px;
  }

  span {
    color: #9B9B9B;
    font-size: 12px;
    line-height: 17px;
  }

  input {
    width: 100%;
  }

  div {
    .ant-checkbox-wrapper {
      margin-right: 10px;
    }
  }

  .spinner {
    width: fit-content;
    margin: auto;
  }  
`;

export const TagsListWrapper = styled.div`

  .rc-menu {
    padding-left: 0px;
    border: 1px solid #D8D8D8;
    margin-top: -5px;

    .rc-menu-item-group-title {
      margin-top: 2px;
    }

    .rc-menu-item-group-list {
      padding-left: 0px;

      li {
        border-bottom: 1px solid #D8D8D8;
        padding: 3px 0px;

        &:hover {
          background-color: #EDEEF3;
        }

        label {
          cursor: pointer;
          width: 100%;
          padding-left: 15px;
        }
      }
    }
  }

`;
