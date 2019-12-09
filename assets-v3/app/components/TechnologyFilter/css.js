import styled from 'styled-components';

export const LocationFilterWrapper = styled.div`
  
  ul {
    height: 80px;
    overflow-y: auto;
  }

  label {
    font-size: 12px;
  }

  span {
    color: #9B9B9B;
    font-size: 12px;
    line-height: 0px;
    margin-top: 5px;
  }
`;

export const TechnologyFilterWrapperSafari = styled.div`
  display: inline-block;
  margin-left: 10px;
  font-weight: 500;
  color: #444;
  position: absolute;
  cursor: pointer;
  width: fit-content;

  .label-title {
    font-weight: 500;
    margin-bottom: 5;
    font-size: 14px;
  }
`;
