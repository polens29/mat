import styled from 'styled-components';
import theme from 'styles/theme';

export const TableWrapper = styled.div`
  a {
    color: #424242 !important;
  }

  .available-btns {
    display: inline-flex;

    button {
      height: 30px;
      padding: 6px 7px;
      border: 1px solid #D5DBDB;
      border-radius: 2px !important;
      background-color: rgba(213,219,219,0.25);
      font-size: 8px;
      margin: 0px 5px;

      i {
        font-size: 15px;
      }

      .name {
        height: 16px;
        width: 43px;
        border: 1px solid #424242;
        border-radius: 2px;
        padding: 2px;

        i {
          font-size: 10px;
          vertical-align: sub;
        }
      }
    }
  }

  

.deliver{
  font-size:12px;
  top:2px !important;
  left:0px !important;
  position: relative !important;
}
  .ant-table {
    color: ${theme.colorNames.black};

    .anticon-down {
      font-weight: 1000;
      color: black;
    }
  }

  .star {
    text-align: center;
    padding: 0 !important;
  }

  .list {
    cursor: pointer;
  }

  .listlength {
    background-color: #1B70B1;
    color: white;
    width: 12px;
    font-size: 8px;
    text-align: center;
    border-radius: 10px;
    position: absolute;
    margin-left: 10px;
    margin-top: -5px;
    cursor: pointer;
  }
  

  .listDD {
    padding: 10px;
    display: inline-grid;

    div {
      cursor: pointer;
      font-size: 12px;
      padding: 0px 7px;

      label {
        color: #E65E5A;
        position: absolute;
        font-size: 12px;
        right: 20px;
        display: none;
        cursor: pointer;
      }
    }

    div:hover {
      border: 1px solid #E65E5A;
      border-radius: 10px;
      color: #E65E5A;
    }
  }

  .material-verified {
    float: left;
    font-size: 16px;
    margin-right: 3px;
  }

  .material-icon-action {
    font-size: 22px;
  }

  .avatar-square {
    border-radius: 2px !important;
    height: 28px !important;
    width: 28px !important;
  }

  .ant-table-thead > tr > th {
    padding: 3px 5px 3px 12px;
    background: #f7f7f7;
  }

  .ant-table-thead > tr {
    padding: 9px 5px 9px 12px;
    line-height: 1.7;
  }

  .ant-table-tbody > tr > td {
    padding: 3px 5px 3px 12px;
    font-size: 12px !important;
  }

  .ant-table-thead > tr > th {
    span {
      font-weight: 400;
    }
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    font-size: 13px;
  }

  .td-email-display a {
    color: #1b70b1 !important;
  }

  .td-email-date {
    font-size: 10px;
    color: ${theme.colorNames.black};
  }

  .td-email-circle {
    color: ${theme.colorNames.green};
    font-size: 13px;
    position: relative;
    top: 3px;
  }

  .ant-table-fixed-header .ant-table-scroll .ant-table-header {
    border-bottom: 1px solid #ececec;
    margin-bottom: -20px !important;
  }

  .ant-table-bordered .ant-table-thead > tr > th {
    border-right: none !important;
  }

  .truncate {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 140px;
  }

  .org-span {
    color: #1b70b1;
    font-weight: 350;
    line-height: 16px;
    cursor: pointer;
  }

  .desc-ellipsis {
    overflow: hidden;
    line-height: 1.2em;
    max-height: 2.4em;
    word-break: break-word;
    width: 180px;
  }

  .break-word {
    word-wrap: break-word;
    word-break: normal;
    word-break: break-word;
  }

  .break-all {
    word-break: break-all;
  }

  .ant-avatar,
  .ant-avatar > * {
    line-height: 29px;
  }

  .ant-avatar-mini > img {
    width: 20px;
    height: 20px;
  }

  .avatar-bkgrnd-img {
    background-size: contain;
    background-position: center;
    background-color: transparent;
    background-repeat: no-repeat;
    border: 1px solid #ececec;
  }

  .disp-image-block {
    margin-right: 8px;
    margin-top: 3px;
    float: left;
  }

  .org-name-container {
    float: none !important;
    display: inline-block;
    vertical-align: middle;
  }

  .disp-image-block > span {
    background: #ccc;
    color: #ffffff;
  }

  .org-container {
    float: none !important;
    display: inline-block;
    vertical-align: middle;
  }

  .company-link {
    color: #1b70b1;
    cursor: pointer;
  }

  .expired-contact {
    background-color: ${theme.colorNames.red};
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 2px;
  }

  .expired-contact-label {
    color: ${theme.colorNames.red};
    font-size: 12px;
  }

  .ant-table-tbody > tr > td.ant-table-selection-column,
  .ant-table-thead > tr > th.ant-table-selection-column {
    min-width: 50px;
    width: 50px;
  }



  .ant-table-tbody > tr > td.ant-table-selection-column {
    padding: 3px 5px;
  }
  
`;
