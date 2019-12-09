import styled from 'styled-components';

export const OrganizationFilterWrapper = styled.div`
  display: inline-block;
  margin-left: 10px;
  font-weight: 500;
  color: #444;
  position: relative;
  cursor: pointer;
  width: fit-content;

  i {
    font-size: 20px;
    vertical-align: bottom;
  }

  .anticon-down {
    vertical-align: middle;
  }

  input:disabled {
    background-color: #ececec;
    cursor: not-allowed;
  }
`;
