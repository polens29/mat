import styled from 'styled-components';

export const LocationFilterWrapper = styled.div`
  display: inline-block;
  margin-left: 10px;
  font-weight: 500;
  color: #444;
  position: relative;
  cursor: pointer;
  width: fit-content;

  .label-title {
    font-weight: 500;
    margin-bottom: 5;
    font-size: 14px;
  }

  i {
    font-size: 20px;
    vertical-align: bottom;
  }

  .anticon-down {
    vertical-align: middle;
  }
`;
