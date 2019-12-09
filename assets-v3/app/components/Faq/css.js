import styled from 'styled-components';
import theme from 'styles/theme';

export const FaqWrapper = styled.div`
  display: inline-block;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  width: 41%;
  height: 100%;
  box-shadow: 6px 12px 18px -1px ${theme.colorNames.black};

  .ant-card-body {
    overflow-y: scroll;
    height: 80%;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    font-size: 14px;
  }
  ol > li {
    list-style-type: decimal;
    margin-left: 20px;
  }
  p {
    margin-bottom: 3px;
  }
`;
