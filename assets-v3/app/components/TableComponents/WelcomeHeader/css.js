import styled from 'styled-components';
import theme from 'styles/theme';

export const Wrapper = styled.div`
  margin: 0px 20px 0;
  .welcome-to-leadbook {
    height: 22px;
    color: ${theme.colorNames.black};
    font-size: 18px;
    font-weight: 500;
    line-height: 23px;
  }
  .start-your-search {
    height: 66px;
    width: 432px;
    color: ${theme.colorNames.black};
    font-size: 14px;
    line-height: 22px;
    font-weight: 300;
  }
  .feel-free-to-access {
    height: 22px;
    width: 432px;
    color: ${theme.colorNames.black};
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
  }
  .verified-numbers {
    height: 22px;
    width: 91px;
    color: ${theme.colorNames.black};
    font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-weight: bold;
    letter-spacing: 1px;
    line-height: 23px;
    position: relative;
    top: -21px;
    font-size: 18px;
    left: 3px;
  }
  .verified-label {
    height: 16px;
    width: 135px;
    color: ${theme.colorNames.grey};
    font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    position: relative;
    font-size: 10px;
    top: -6px;
  }
  .verified-contact {
    left: -97px;
  }
  .verified-company {
    left: -86px;
  }
`;
