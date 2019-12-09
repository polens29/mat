import styled from 'styled-components';

export const ListWrapper = styled.div`
  margin-right: 15px;
  display: inline-block;
  position: relative;
  color: #444;
  padding-left: 10px;
  margin-left: 10px;
  border-left: 2px solid #D7D7D7;
  font-weight: 500;

  span {
    cursor: pointer;
  }

  div {
    margin-left: 18px;
    cursor: pointer;
    width: fit-content;
    display: flex;
  }

  div:nth-child(1){
    margin-left: 0px;
  }

  div:nth-child(3){
    width: 110px !important;
  }

  .system-list-selection {
    border: 1px solid #d7d7d7;
    color: #333;
    padding-left: 4px;
    padding-right: 4px;
    text-align: left;
    text-transform: capitalize;
    width: 200px;
  }
`;

export const MenuItemWrapper = styled.div`
  .menu-item-text {
    color: #333;
    font-weight: normal;
    padding-left: 4px;
    vertical-align: middle;
  }
  .menu-item-icon {
    color: #333;
    font-size: 18px;
    text-align: center;
    vertical-align: middle;
    width: 20px;
  }
  .menu-arrow {
    font-size: 18px;
    position: absolute;
    right: 4px;
  }

  &.favourites {
    .menu-item-icon {
      color: #FEC36F;
    }
  }
`;
