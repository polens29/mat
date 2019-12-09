import styled from 'styled-components';
import theme from 'styles/theme';

export const SearchWrapper = styled.div`
  display: inline-block;
  background-color: white;
  width: 100%;

  .material-icons {
    margin-top: -2px !important;
  }

  .search-selection {
    box-sizing: border-box;
    height: 36px;
    width: 175px;
    border: 1px solid ${theme.colorNames.darkBlue};
    border-radius: 2px !important;
    background-color: ${theme.colorNames.white};
    margin-right: 18px;
    span {
      position: relative;
      left: ${(props) =>
        props.categoryValue === 'Organization' ? '-13px;' : '-28px'};
      top: 0px;
      height: 17px;
      width: 83px;
      color: ${theme.colorNames.black};
      font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
        sans-serif;
    }
  }

  .saved {
    float: right;
    position: absolute;
    right: 0;
    margin-top: 5px;
  }

  .ant-btn {
    font-size: 14px;
  }
  .ant-input {
    font-size: 14px;
  }
  .search-keyword {
    height: 36px;
    width: 508px;
    background-color: ${theme.colorNames.white};
    margin-left: 21px;
    margin-bottom: 5px;
  }
  .advanced {
    color: ${theme.colorNames.antdBlue};
    line-height: 17px;
    cursor: pointer;
    font-size: 13px;
    padding: ${theme.gutters.xxSmall} 10px 8px 10px;
    font-weight: 500;
    font-size: 13px;
    &:hover {
      color: ${theme.colorNames.blueHover};
    }
    span {
      text-decoration: underline;
    }
  }
  .selected {
    background-color: ${theme.colorNames.selectedBlue};
  }
  
  .tags-selected-exclude {
    background-color: ${theme.colorNames.red};
    color: ${theme.colorNames.white};
  }

  .react-tags {
    font-size: 13px;
    margin-bottom: 5px;
    width: 85%;
    max-height: ${(props) => props.queryValue ? '100%' : '100px'};
    overflow-y: ${(props) => props.queryValue ? 'visible' : 'auto'};
    min-height: 43px;
    padding: 3px 17px 0px 45px;
  }

  @media (max-width: 1027px) {
    display: block;
    .search-keyword {
      width: 96%;
    }
  }

  .react-tags__suggestions {
    z-index: 1000;

    mark {
      padding: 0;
    }
  }
  .react-tags__search input::-ms-clear {
    display: none;
  }

  .react-tags__suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
  }

  @media screen and (min-width: 30em) {
    .react-tags__suggestions {
      width: 340px;
    }
  }

  .react-tags__suggestions ul {
    margin: 4px -1px;
    padding: 0;
    list-style: none;
    background: white;
    border: 1px solid #d1d1d1;
    border-radius: 2px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .react-tags__suggestions li {
    border-bottom: 1px solid #ddd;
    padding: 6px 8px;
  }

  .react-tags__suggestions li mark {
    text-decoration: underline;
    background: none;
    font-weight: 600;
  }

  .react-tags__suggestions li:hover {
    cursor: pointer;
    background: #eee;
  }

  .react-tags__suggestions li.is-active {
    background: #b7cfe0;
  }

  .react-tags__suggestions li.is-disabled {
    opacity: 0.5;
    cursor: auto;
  }

  .disabled-tag {
    display: inline-block;
    box-sizing: border-box;
    padding: 6px 8px;
    margin: 0 3px 3px 0;
    border-radius: 2px;
    height: 28px;
    background-color: #ececec;
    color: #cacaca;
    font-size: 12px;
    line-height: 14px;
    font-weight: 500;
    cursor: default;

    .material-icons {
      font-size: 20px;
      margin-top: -5px;
      margin-right: 3px;
      vertical-align: middle;
    }
  }
  .react-tags{
    padding: 5px 17px 5px 0px !important;
  }
  .search-icon{
    margin-top:11px !important;
  }

  .react-tags-wrapper {
    border: 1px solid #979797;
    border-radius: 2px !important;
    width: 100%;
    display: inline-flex;
    margin-bottom: 10px;
  }
`;

export const NavWrapper = styled.div`
  background-color: rgba(213,219,219,0.25);
  border: 1px solid #D5DBDB;
  padding: 20px 30px 0px;
  font-family: 'Open Sans', sans-serif;

  button {
    width: 122px;
    height: 32px;
    font-size: 13px;

  }

  .active {
    background-color: white;
    border-top: 2px solid #003366;
  }
`;

export const FilterNameWrapper = styled.div`
  display: inline-flex;
  padding: 10px 15px;
  width: 100%;

  div {
    display: grid;
    
  }
  
  div:nth-child(1){
    width: 30%;
    margin-right: 20px;
  }
  div:nth-child(2){
    width: 70%;
  }

  span {
    height: 26px;
  }

  input {
    height: 44px;
    padding-left: 15px;
    border: 1px solid #979797;
    border-radius: 2px !important;
    color: #424242;
  }

`;
