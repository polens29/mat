import styled from 'styled-components';
import theme from 'styles/theme';

export const FooterWrapper = styled.div`
  display: inline-block;
  background-color: white;
  bottom: 0;
  height: 100px;
  width: 100%;
  padding-top: 5px;
  border-top: 1px solid #D7D7D7;

  .ant-pagination {
    width: fit-content;
    margin: auto;
    margin-top: 10px;

    i {
      vertical-align: middle;
    }
  }

  .ant-pagination-item-link {
    background-color: white !important;
  }

  .numpages {
    margin: auto;
    width: fit-content;
    margin-top: 5px;
    font-size: 11px;
    color: rgba(66,66,66,0.65);
  }

  .ant-select {
    width: 56px;
    right: 30px;
    top: -50px;
    font-size: 13px;
    bottom: 0;
    float: right;

    i {
      font-size: 13px;
    }
  }
}
`;
