import styled from 'styled-components';
import theme from 'styles/theme';


export const SelectListWrapper = styled.div`
  margin-left: 5px;

  .select-div {
    display: inline-flex;

    label {
      margin-top: 5px;
      margin-right: 10px;
    }

    .divClass {
      background-color: #E8F0F7;
    }

    div {
      height: 30px;
      width: 200px;
      border: 1px solid #ececec;
      padding: 5px;
      text-align: center;
      cursor: pointer;

      .select-text {
        width: 90%;
        overflow-x: hidden;
        padding: 5px;
        border: none;
        height: inherit;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;

        span {
          margin: 0 auto;
        }
      }

      i {
        float: right;
        margin-right: 10px;
        font-size: 20px;
      }
    }

    button {
      margin-left: -5px !important;
      width: 96px !important;
      border-top-left-radius: 0px !important;
      border-bottom-left-radius: 0px !important;

      i {
        margin-right: 5px;
        vertical-align: bottom !important;
      }

      span {
        vertical-align: text-bottom !important;
      }

      &:disabled {
        cursor: not-allowed;
        background-color: #ececec;

        i {
          color: #cacaca;
        }
      }
    }
  }

  .dropdown {
    width: 195px;
    float: right;
    position: absolute;
    margin-left: 75px;
    padding-top: 10px;
    border: 1px solid #ececec;
    z-index: 2;
    background-color: white;

    .create {
      width: 75px;
      height: 20px !important;
      padding: 0px;
      font-size: 12px;
    }

    .manage {
      background-color: white;
      color: #337ab7;
      width: fit-content;
      font-size: 12px;
      height: 20px !important;
      padding: 0px;
      float: right;
      margin-right: 10px;
      margin-bottom: 10px;
    }

    ul {
      list-style-type: none;
      padding-left: 0px;
      margin-bottom: 5px;

      li {
        cursor: pointer;
        padding: 5px 15px;
      }

      li:hover {
        background-color: #D4EDF6;
      }

      li:last-child {
        border-bottom: 1px solid #ececec;
        padding: 0px;
        margin-bottom: 10px;

        &:hover {
          background-color: white;
        }
      }
    }

    .no-list {
      height: 100px;
      border-bottom: 1px solid #ececec;
      margin-bottom: 10px;

      label {
        font-size: 12px;
        margin: auto;
        margin-top: 30px;
        margin-left: 25px;
      }
    }

    .cancel {
      background-color: white;
      color: #444444;
      width: fit-content;
      height: 20px !important;
      padding: 0px;
      margin-left: 30px;
      margin-bottom: 5px;
      font-size: 12px;
    }

    .create2 {
      width: 75px;
      height: 20px !important;
      padding: 0px;
      float: right;
      margin-right: 30px;
      font-size: 12px;

      &:disabled {
        cursor: not-allowed;
      }
    }

    input {
      width: 160px;
      margin-left: 15px;
      border-bottom: 1px solid #ececec;
      margin-bottom: 10px;
      text-align: center;

      &:disabled {
        cursor: not-allowed;
      }
    }
  }
`;


export const Wrapper = styled.div`
  display: inline-block;
  width: 70%;
  button {
    border-radius: 2px !important;
  }
  .list-items:hover {
    background-color: #eff6ff !important;
  }
  .unlock-btn {
    color: ${theme.colorNames.white};
    background-color: #337ab7;
    border-color: initial;
  }

  .page-btns button {
    margin-left: 8px;
    width: 36px;
    height: 30px !important;
    padding: 0px;
    color: ${theme.colorNames.white};
    background-color: #337ab7;
    border-color: initial;
    border-radius: 2px !important;
  }

  .page-btns button > .material-icons {
    font-size: 20px;
    color: ${theme.colorNames.white};
    vertical-align: middle;
  }

  .remove-from-list {
    position: relative;
    margin-left: 5px;
    top: -4px;
  }

  .ant-btn.disabled,
  .ant-btn[disabled],
  .ant-btn[disabled]:hover,
  .disabled {
    background-color: #ececec;
    border-color: #ececec;
    span {
      color: #cacaca;
    }
  }

  .ant-btn.disabled,
  .ant-btn[disabled] > .material-icons,
  .disabled {
    color: #cacaca;
  }

  .create-list-btn {
    width: 95px !important;
    border-radius: 2px !important;
    vertical-align: bottom;
  }

  .add-list-input {
    position: absolute;
    z-index: 5;
    margin-left: 10px;
    margin-top: 35px;
    width: 250px;
    padding-bottom: 20px;
    border: #ebebeb;
    background-color: white;
    padding-top: 10px;
    height: 200px;
    overflow-y: auto;

    input {
      width: 90%;
      margin-left: 12px;
    }

    ul {
      margin-top: 10px;
      padding-left: 25px;

      li {
        list-style: none;
      }
    }

    .manage {
      color: #367BB7;
      float: right;
      margin-right: 10px;
      cursor: pointer;
    }

  }

  .hide-text {
    float: right;
    margin-right: 10px;
    margin-bottom: 5px;
    color: #1b70b1;
    cursor: pointer;
  }

  span.send {
    width: 140px;
    color: white;
    margin-right: 25px;
    margin-left: 9px;
    margin-top: 1px;
    height: 33px !important;
    background-color: #ececec;
    border-color: initial;
    border-radius: 2px !important;
    padding-left: 16px;

    button {
      margin-left: 0px !important;
    }

    button:disabled {
      color: white !important;
      border: none !important;
      height: 33px !important;

      span {
        color: #cacaca !important;
      }
    }
  }

  button.send {
    width: 142px;
    color: white;
    margin-right: 25px;
    margin-left: 8px;
    height: 35px !important;
    color: #FFFFFF;
    background-color: #337ab7;
    border-color: initial;
    border-radius: 2px !important;

    span {
      color: white !important;
    }
  }

  button.send:disabled {
    background-color: #337AB7 !important; 
    border: none !important;
  }

  .add-to-list {
    display: inline-flex;
    height: 35px;
    vertical-align: bottom;
    border-radius: 2px;
    padding-right: 0px;
    margin-left: 5px;

    .option {
      background-color: black;
    }

    .ant-select {
      width: 200px;
    }

    .ant-select-selection {
      height: 33px;
      font-size: 13px;
      padding-top: 4px;
      margin-top: 1px;
      border-radius: 2px !important;

      .ant-select-selection__rendered {
        line-height: 25px;
      }
    }

    .add-btn {
      border: none !important;
      height: 35px !important;
      margin-left: -4px;
      border-bottom-left-radius: 0px !important;
      border-top-left-radius: 0px !important;

      i {
        color: white !important;
      }

      button {
        height: 33px !important;
        border: none !important;
        margin-left: 0px !important;
        margin-top: 1px;
        border-bottom-left-radius: 0px !important;
        border-top-left-radius: 0px !important;
      }

      button:disabled {
        background-color: #ececec !important; 
        border: none !important;
      }
    }

    ul {
      width: 224px;
      overflow: auto;
      position: absolute;
      background-color: white;
      z-index: 1;
      margin-left: -10px;
      margin-top: 30px;
      list-style: none;
      padding-left: 0px;
      padding-top: 10px;
      border: 1px solid #ebebeb;

      li {
        padding-left: 10px;
      }

      .ant-checkbox {
        vertical-align: text-top;
      }

      li:nth-last-child(2) {
        border-bottom: 1px solid #ebebeb;
        padding-bottom: 5px;
      }

      .add-btn {
        float: right;
        margin: 5px 10px;
        height: 27px !important;
        width: 50px;
        border-radius: 0px !important;
      }

      .cancel-btn {
        float: left;
        background-color: white;
        border: none;
        color: #337AB7;
      }

      cancel-btn:hover {
        background-color: white !important;
        color: #337AB7;
      }
    }

    i {
      color: white;
      margin-top: 2px;
    }

    input {
      border: none;
      margin-left: 10px;
      margin-top: 1px;
      height: 25px;
      border-radius: 2px !important;
    }
  }

  .list-disabled {
    background-color: #ececec;
  }
`;
