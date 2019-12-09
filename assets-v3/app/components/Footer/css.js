import styled from 'styled-components';
import theme from 'styles/theme';

export const FooterWrapper = styled.div`
  display: inline-block;
  background-color: #ececec;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 5px;
  border-top: 1px solid #D7D7D7;

  .ant-pagination-item-link {
    background-color: #ececec !important;
  }
}
`;
