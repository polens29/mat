import styled from 'styled-components';
import theme from 'styles/theme';

export const Wrapper = styled.div`
  display: block;
  height: 5px;
  background-color: ${theme.colorNames.white};
  width: 100%;
  z-index: 1;
  padding-top: 2px;

  .page-numbers {
    display: inline-block;
    height: 40px;
    width: 340px;
    border: 1px solid #f3eaba;
    border-radius: 2px;
    background-color: #fff8c8;
    position: absolute;
    padding: 10px;
    margin-top: 7px;
  }

  .contacts-selected {
    font-size: 13px;
    line-height: 17px;
  }

  @media (max-width: 1025px) {
    .page-numbers {
      display: none;
    }
  }
`;
