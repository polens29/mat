import styled from 'styled-components';
import theme from 'styles/theme';

export const FlowWrapper = styled.div`
  width: 560px;
  margin: 100px auto;
  text-align: center;

  .text1 {
    position: absolute;
    margin-top: -30px;
    width: 55px;
    font-size: 12px;
    margin-left: 115px;
    line-height: 14px;
  }

  .text2 {
    position: absolute;
    margin-top: 105px;
    width: 55px;
    font-size: 12px;
    margin-left: 119px;
    line-height: 14px;
  }

  .icon {
    background-color: #E9EDF1;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: auto;
    margin-bottom: 10px;

    .material-icons {
      font-size: 28px;
      margin-top: 15px;
      color: #333333;
      opacity: 0.85;
    }

    img {
      height: 25px;
      margin-top: 15px;
    }
  }

  .search-db {
    width: 110px;
    position: absolute;
    margin-top: 25px;
    margin-left: -145px;
  }

  .export {
    position: absolute;
    margin-top: 20px;
    margin-left: 165px;
    width: 100px;
  }

  .divider1{
    border-left: 1px solid gray;
    border-bottom: 1px solid gray;
    position: absolute;
    margin-left: 105px;
    height: 170px;
    width: 125px;
  }

  .divider2{
    border-bottom: 1px solid gray;
    position: absolute;
    margin-top: -75px;
    margin-left: 460px;
    height: 10px;
    width: 55px;
  }

  .middle-group {
    border-top: 1px solid gray;
    height: 120px;

    .upper {
      width: 110px;
      position: absolute;
      margin-top: -30px;
    }

    .upper:nth-child(1) {
      margin-left: -55px;
    }

    .upper:nth-child(2) {
      margin-left: 170px;
    }

    .upper:nth-child(3) {
      margin-left: 330px;
    }

    .upper:last-child {
      right: 0;
      margin-right: 60px;
    }

    .bottom {
      width: 110px;
      position: absolute;
      margin-top: 90px;
      margin-left: 170px;
    }
  }

  

  label {
    color: rgba(51,51,51,0.85);
    font-size: 12px;
    line-height: 14px;
    color: #1B70B1;
    cursor: pointer;
  }
`;
