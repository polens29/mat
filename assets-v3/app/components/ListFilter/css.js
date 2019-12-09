import styled from 'styled-components';

export const ListFilterWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  padding: 4px 8px;
  top: -7px;
  position: relative;
  font-weight: 500;
  padding-left: 5px;

  .select-list {
    width: 100%;
    text-align: left;
  }

  .my-lists-btn {
    background-color: #1B70B1;
    color: white;
    border-radius: 2px !important;
    border: none;
    margin-top: 2px;
    padding: 5px 8px;
    margin-left: 0px !important;

    span {
      vertical-align: middle;
    }

    i {
      color: white;
      font-size: 18px;
      margin-right: 5px;
    }

    &:disabled {
      background-color: #ECECEC !important;
      border: none !important;

      span {
        color: #CACACA !important;
      }

      i {
        color: #CACACA !important;
      }
    }
  }
`;
