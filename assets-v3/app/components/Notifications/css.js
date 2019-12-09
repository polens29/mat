import styled from 'styled-components';
import theme from 'styles/theme';

export const Wrapper = styled.div`
  display: inline-block;
  position: fixed;
  right: 0;
  z-index: 100;
  width: 600px;
  height: 100%;
  box-shadow: 6px 12px 18px -1px ${theme.colorNames.black};

  .org-prof-card {
    background-color: #f9f9f9;
  }

  .org-prof-card > .ant-card-body {
    overflow-y: scroll;
    height: 90%;
    background-attachment: fixed;
    -webkit-transform: translate3d(0, 0, 0);
  }

  .ant-card-grid:hover,
  .ant-card:not(.ant-card-no-hovering):hover {
    box-shadow: none;
  }

  .ant-card:not(.ant-card-no-hovering):hover {
    border-color: #e9e9e9;
  }

  .notification-header {
    color: ${theme.colorNames.black};
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
  }

  .notification-details {
    color: ${theme.colorNames.grey};
    font-size: 14px;
    line-height: 16px;
  }

  .notification-timestamp {
    color: ${theme.colorNames.grey};
    font-size: 12px;
    float: right;
    font-weight: 500;
    line-height: 15px;
  }
`;
