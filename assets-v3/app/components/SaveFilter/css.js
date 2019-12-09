import styled from 'styled-components';
import { Button } from 'antd';

export const SaveFilterWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  margin-top: 4px;
  margin-right: 10px;
  position: relative;
  font-weight: 600;
`;

export const StyledButton = styled(Button)`
  border-radius: 2px !important;
  line-height: 26px;
  padding: 0px 5px;
  background-color: #1B70B1;
  color: white !important;
  height: 30px;
  width: 95px;

  &:hover {
    background-color: #1B70B1 !important;
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

  span {
    color: white !important;
  }

  i {
  	font-size: 15px;
    vertical-align: sub;
    margin-right: 2px;
  }
`;
