import styled from 'styled-components';

export const AdvanceWrapper = styled.div`
  font-size: 12px;
  height: 32px;
  width: 100%;
  padding: 8px 15px;
  border: 1px solid #d7d7d7;
  background-color: rgba(233, 237, 241, 0.72);

  @media (max-width: 1100px) {
    height: 55px !important;
  }

  i {
    font-size: 20px;
    vertical-align: bottom;
    margin-right: 5px;
  }

  .anticon-down {
    vertical-align: middle;
  }

  .pages {
    position: absolute;
    right: 20px;
    top: -2px;
  }


  .contacts {
    cursor: pointer;
    padding: 6px 8px;
    top: -9px;
    position: relative;
  }
  .organizations {
    padding: 6px 8px;
    border-right: 2px solid #d7d7d7;
    cursor: pointer;
    position: relative;
    top: -9px;
  }
  .active {
    color: #ffffff;
    background-color: #337ab7;
    cursor: default;
  }
  .cat-icon {
    font-size: 18px;
    position: relative;
    top: 4px;
    margin-right: 3px;
  }

  .list-filter {
    width: fit-content;
    display: inline-block;
    position: relative;
    cursor: pointer;
    margin-left: 10px;
  }

  .unlocked{
    border-left: 2px solid #d7d7d7;
    padding-left: 12px;
    margin-left: 12px;
  }

  .favorites {
    i {
      color: #FBC885;
    }
  }

  .filtersClass {
    display: inline-flex;
    vertical-align: super;
    width: 95%;
    height: fit-content;
    margin-top: -3px;
    position: absolute;
  }
`;

export const AdvanceWrapper2 = styled.div`
  font-size: 12px;
  height: 45px;
  width: 100%;
  padding: 8px 15px;
  border: 1px solid #d7d7d7;
  background-color: rgba(233, 237, 241, 0.72);
`;

export const FilterWrapper = styled.div`
  display: inline-block;
  margin-left: 20px;
  margin-top: -3px;
  position: absolute;
  text-align: center;
  width: fit-content;
  height: 10px;
`;

export const MyDataWrapper = styled.div`
  display: inline-block;
  padding: 4px 8px;
  top: -7px;
  position: relative;
  font-weight: 500;
`;

