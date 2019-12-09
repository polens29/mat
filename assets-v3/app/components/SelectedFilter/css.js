import styled from 'styled-components';
import theme from 'styles/theme';

export const FilterContainer = styled.div`
  background-color: ${theme.colorNames.white};
  border-bottom: 1px solid #ececec;
  padding: 7px 18px;
  width: 100%;
  .token {
    background-color: #658ca9;
    border: 0;
    border-radius: 1px;
    color: ${theme.colorNames.white}
    display: inline-block;
    line-height: 15px;
    height: 27px;
    margin: 10px 5px;
    padding: 6px 7px;
    position: relative;
  }
  .token-removeable {
    cursor: pointer;
    padding-right: 21px;
  }
  .close-button {
    bottom: 0;
    padding: 6px 7px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .ant-tag {
    height: 29px;
    border-radius: 1px;
    padding: 3px 7px;
    margin: 1px;
    font-weight: 600;
    font-size: 11px;
    border: 1px solid ${theme.colorNames.white};
  }
  .ant-tag.regular-tag {
    color: ${theme.colorNames.darkBlue};
    background: ${theme.colorNames.skyBlue};
  }
  .ant-tag.special-tag {
    color: ${theme.colorNames.white};
    background: #0098ce;
  }
  .no-filters-available {
    height: 15px;
    width: 500px;
    color: ${theme.colorNames.grey};
    font-size: 13px;
    font-weight: 300;
    line-height: 15px;
    margin: 14px 23px;
  }
`;
