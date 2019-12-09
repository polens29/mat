import styled from 'styled-components';
import { Button } from 'antd';

export const ApplyBtn = styled(Button)`
  background-color: #1890ff !important;
  color: #fff !important;
  border-color: #1890ff !important;
`;

export const Wrapper = styled.div`
  float: right;

  .column-button {
    background-color: white;
    padding: 1px 2px;
    margin-right: 10px;
    width: 83px;
    border-radius: 2px !important;
    border: 1px solid #D5DBDB;
    height: 24px !important;

    i {
      color: #424242;
      margin-right: 0px;
      font-size: 15px;
      vertical-align: middle;
    }

    label {
      font-size: 13px;
      margin-left: 5px;
      color: #424242;
    }
  }
`;
