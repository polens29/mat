import styled from 'styled-components';
import theme from 'styles/theme';

export const BtnWrapper = styled.div`
  button {
    margin-right: 10px;
    top: -13px;
    background-color: #214B6C !important;
    border: 1px solid white;
    color: white;
    border-radius: 2px !important;
    height: 30px !important;
    width: 122px;
    padding: 0px;

    &:hover {
      background-color: #214B6C !important;
      border: 1px solid white;
      color: white;
    }

    &:focus {
      background-color: #214B6C;
      color: white;
    }

    span {
      vertical-align: sub;
      font-size: 14px;
    }
  }
`;

export const Wrapper = styled.div`
  display: inline-block;
  float: right;
`;

export const SpecialFilterWrapper = styled.div`
  height: 50px;
  padding-right: 19px;
  padding-top: 3px;
  float: right;
  position: relative;
  top: -7px;

  .active {
    padding: 4px 27px 4px 4px;
    margin-right: 23px;
    background-color: ${theme.colorNames.darkBlue};
    border-radius: 2px;
  }

  .avatar {
    position: absolute;
    left: 0;
    margin-left: 5px;
    background-color: #E9EDF1;
    width: 28px;
    height: 28px;
    border-radius: 50px;

    i {
      color: #4D4E4E;
      font-size: 28px;
      position: relative;
      margin-top: 5px;
    }
    
  }

  .ant-badge {
    position: absolute;
    top: 5px;
    right: -5px;
    line-height: 0;
  }

  .ant-badge-count {
    height: 18px;
    min-width: 15px;
  }

  label {
    color: white;
    position: relative;
    font-size: 14px;
    cursor: pointer;
    border-left: 1px solid #40678a;
    padding: 0px 20px 0px 40px;
    line-height: 15px;
    text-align: left;

    i {
      font-size: 10px;
      position: absolute;
      margin-top: -18px;
      right: 0;
    }
  }
`;
