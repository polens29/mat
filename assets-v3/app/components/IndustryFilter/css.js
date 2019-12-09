import styled from 'styled-components';

export const IndustryFilterWrapper = styled.div`
  display: inline-block;
  margin-left: 10px;
  color: #444;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  width: fit-content;

  .label-title {
    font-weight: 500;
    margin-bottom: 5;
    margin-top: 20;
    font-size: 14px;
  }

  .ant-select-auto-complete.ant-select .ant-select-selection {
    height: 32px;
  }
  .ant-select-auto-complete.ant-select .ant-input {
    height: 32px;
  }
`;
