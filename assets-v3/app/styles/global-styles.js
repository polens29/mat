import { injectGlobal } from 'styled-components';
import theme from 'styles/theme';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #f9f9f9 !important;
    font-family: Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif !important;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
  }

  body {
    margin: 0;
  }

  input, select, textarea, span, img, table, label, td, th, p, button, ul, code, pre, li {
    -webkit-border-radius: 0!important;
    -moz-border-radius: 0!important;
    border-radius: 0!important;
  }

  a {
    text-shadow: none;
    color: #1b70b1;
  }

  label {
    font-weight: 400;
    font-size: ${theme.commonFont.fourteen};
  }

  p,
  label {
    line-height: 1.5em;
  }

  h1 {
    margin: 0;
  }

  .pointer {
    cursor: pointer;
  }

  .not-allowed {
    cursor: not-allowed;
  }

  .break-word {
    word-wrap: break-word;
    word-break: normal;
    word-break: break-word;
  }

  .control-label {
    margin-top: 1px;
  }

  button:focus {
    outline: 0;
  }

  .block {
    display: block;
  }

  .inline-block {
    display: inline-block;
  }

  .inline-flex {
    display: inline-flex;
  }

  .inline {
    display: inline;
  }

  .align-center {
    text-align: center;
  }

  .right {
    float: right;
  }

   .left {
    float: left;
  }

  .nowrap {
    white-space: nowrap;
  }

  .margin-top-0 {
    margin-top: 0px !important;
  }

  .margin-top-5 {
    margin-top: 5px;
  }

  .margin-top-10 {
    margin-top: 10px;
  }

  .margin-btm-10 {
    margin-bottom: 10px !important;
  }

 .margin-btm-20 {
    margin-bottom: 20px;
  }

  .margin-btm-5 {
    margin-bottom: 5px !important;
  }

  .margin-right-5 {
    margin-right: 5px;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

    .margin-right-20 {
    margin-right: 20px;
  }

  .margin-left-5 {
    margin-left: 5px;
  }

  .font-weight-500 {
    font-weight: 500;
  }

  .font-weight-700 {
    font-weight: 700;
    font-size: ${theme.commonFont.fourteen};
    color: #000;
  }

  .font-size-15 {
    font-size: 15px;
  }

  .pa-modal-display .ant-modal-header {
    background-color: #2D618A;
    color: ${theme.colorNames.white};
  }

  .pa-modal-display .ant-modal-title {
    color: ${theme.colorNames.white};
  }

  .pa-modal-display .ant-modal-body {
    padding: ${theme.gutters.large};
  }

  .pa-modal-display .ant-modal-footer > .ant-btn-primary {
    background-color: #1C70B1;
  }

  .pa-modal-icon {
    float: left;
    margin-right:10px;
  }

  .pa-modal-icon > .material-icons {
    font-size: 36px;
    color: #a2a2a2;
  }

  .pa-modal-info {
    font-size: ${theme.commonFont.fourteen};
  }

  .disable-icons {
    color: #E4E4E4 !important;
  }

  .fa-linkedin-square {
    color: #0077B5;
  }

  .fa-facebook-square {
    color: #416BAE;
  }

  .fa-twitter-square {
    color: #1DA1F2;
  }

  .fa-instagram {
    color: ${theme.colorNames.black};
  }

  .fa-youtube-play {
    color: #FF0000;
  }

  .fa-pinterest-square {
    color: #BD081C;
  }

  .icon-instagram {
    position: relative;
    top: -1px;
  }

  .instagram-disabled {
    opacity: 0.5
    filter: grayscale(100%) opacity(50%);
    -webkit-filter: grayscale(100%) opacity(50%);
  }

  .expired-row,
  .expired-row .org-unlocked,
  .expired-row .org-contacts-grid > div,
  .expired-row .org-contacts-grid .sub-info,
  .expired-row .td-email-date,
  .expired-row .social-icon-list > a > .fa  {
    color: #838383 !important;
  }

  .expired-row .avatar-contact > img {
    opacity: 0.3;
    border-radius: 5px !important;
  }

  .expired-row, .expired-row:hover {
    background-color: #FCF5F5 !important;
  }

  .ant-dropdown-menu {
    -webkit-border-radius: 2px!important;
    -moz-border-radius: 2px!important;
    border-radius: 2px!important;
  }

  .ant-table-scroll > .ant-table-header {
    padding-bottom: 3px !important;
    overflow: inherit !important;

    width: 100%;
    z-index: 1;
    background-attachment: fixed;
    -webkit-transform: translate3d(0, 0, 0);
  }

  .ant-table-body {
    max-height: calc(100vh - 200px) !important;
  }

  .ant-table-scroll > .ant-table-body {
    margin-top: ${theme.gutters.medium};
    overflow-y: overlay !important;
    overflow: auto !important;
  }


  .ant-table-scroll > .ant-table-header .ant-table-fixed,
  .ant-table-scroll > .ant-table-body .ant-table-fixed {
    background-attachment: fixed;
    -webkit-transform: translate3d(0, 0, 0);
  }

  .ant-pagination-next .ant-pagination-item-link:after, :root .ant-pagination-prev .ant-pagination-item-link:after {
    font-size: ${theme.gutters.large} !important;
  }

  .ant-pagination-simple .ant-pagination-simple-pager {
    position: relative;
    top: -2px;
    font-size: 13px !important;
    input {
      padding: 0 2px !important;
    }
  }
  .ant-popover {
    z-index: 1 !important;
  }

  .ant-dropdown {
    font-size: 12px !important;
  }

  .ant-dropdown-menu-item {
    background-color: #ffffff !important;
  }

  .ant-dropdown-menu-item:hover {
    background-color: #ffffff;
  }

  .ant-dropdown-menu-item .ant-dropdown-menu-item-selected {
    background-color: #ffffff;
  }

  .ant-dropdown-menu-item.list-items {
    .select-list {
      width: 100%;
      text-align: left;
    }
    &:hover {
      background-color: #e6f7ff !important;
    }
  }

  .list-menu.ant-dropdown-menu-item-group{
    max-height: 400px;
    overflow: auto;
  }

  .ant-dropdown-menu-item-selected {
    span {
      color: #6d6d6d
    }
  }

  .font-size-17 {
    font-size: 17px;
  }

  .ant-modal-header {
    background-color: #2D618A !important;
  }

  .ant-modal-title {
    color: #FFFFFF !important;
  }

  .ant-modal-close-x {
    color: #FFFFFF !important;
  }

  .ant-btn-primary-custom{
    background-color: #2d618a !important;
    color: #fff !important;
    border-color: #2d618a !important;
  }

  .ant-tabs-ink-bar {
    background-color: #2e6089 !important;
  }

  .ant-tabs-nav .ant-tabs-tab-active {
    color: #2e6089 !important;
  }

  .react-tags {
    position: relative;
    border-radius: 1px;
    background-color: #FFFFFF;
    padding: 5px 17px 5px 45px;

    /* shared font styles */
    font-size: 14px;
    line-height: 1.2;

    /* clicking anywhere will focus the input */
    cursor: text;
    &:hover {
      border-color: #49a9ee;
    }

  }

  .react-tags.is-focused {
    border-color: #49a9ee;
  }

  .react-tags__selected {
    display: inline;
  }

  .react-tags__selected-tag {
    display: inline-block;
    box-sizing: border-box;
    padding: 6px 8px;
    margin: 0 3px 3px 0;
    border-radius: 2px;
    height: 28px;
    background-color: #D4EDF6;
    color: #333333;
    font-size: 12px;
    line-height: 14px;
    font-weight: 500;

    .material-icons {
      font-size: 20px;
      margin-top: -5px;
      margin-right: 3px;
      vertical-align: middle;
    }
  }

  .react-tags__selected-tag:after {
    content: '\\2715';
    color: #333333;
    font-size: 10px;
    margin-left: 8px;
  }

  .react-tags__selected-tag:hover,
  .react-tags__selected-tag:focus {
    border-color: #B1B1B1;
  }

  .react-tags__search {
    display: inline-block;

    /* match tag layout */
    padding: 7px;
    margin: 3px 0;

    /* prevent autoresize overflowing the container */
    max-width: 100%;
  }

  .ant-popover-inner-content {
    font-size: 12px;
  }

@media screen and (min-width: 30em) {

  .react-tags__search {
    /* this will become the offsetParent for suggestions */
    position: relative;
  }

}

.react-tags__search input {
  /* prevent autoresize overflowing the container */
  max-width: 100%;

  /* remove styles and layout from this element */
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;

  /* match the font styles */
  font-size: inherit;
  line-height: inherit;
}

.ant-btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 500;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.15;
  padding: 0 15px;
  font-size: 12px !important;
  border-radius: 4px;
  height: 28px !important;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  position: relative;
}

.ant-pagination-next .ant-pagination-item-link:after, :root .ant-pagination-prev .ant-pagination-item-link:after {
  font-size: 15px !important;
}

ul ul, ol ul {
  list-style-type: none;
}

.ant-dropdown-menu-item-group-list {
  padding-left: 0;
}

.ant-tree {
  font-size: 12px !important;
}

.ant-dropdown-menu-item {
  font-size: 12px !important;
}

.ant-dropdown-menu-item-selected {
  color: #595959 !important;
}

.ant-tree li {
  padding: 0 !important;
  cursor: default !important;
}

.ant-tree li .ant-tree-node-content-wrapper{
  cursor: default !important;
}

.ant-tree li .ant-tree-node-content-wrapper:hover {
    background-color: #ffffff !important;
}

.ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title {
  padding: 1px 12px !important;
}

.ant-dropdown-menu-item > .ant-checkbox-wrapper {
  font-size: 12px !important;
  width: 100%;
}

.integrations-modal .ant-modal-header {
  border-bottom: none;
}

.ant-input {
    font-size: 12px !important;
}

  .drawer-display .ant-drawer-header {
    padding: 16px 24px;
    border-radius: 0px;
    background: #2D618A;
    border-bottom: 1px solid #e8e8e8;
  }

  .drawer-display .ant-drawer-close {
    color: #fff !important;
  }

  .drawer-display .ant-drawer-title {
    color: #fff;
  }

  .drawer-display .ant-drawer-close:focus,
  .ant-drawer-close:hover {
    color: #fff !important;
    text-decoration: none;
}

  .spam-drawer-tabs .ant-tabs-bar {
     text-align: center;
  }

  .spam-drawer-tabs .ant-tabs-ink-bar {
    bottom: 9px;
  }

  .purchase-credits-drawer .ant-drawer-title {
    color: #2e6089 !important;
  }

  .purchase-credits-drawer .ant-drawer-close {

  }

  .custome-close{
    float: right;
    padding-top: 0px;
  }


  .purchase-credits-drawer .ant-drawer-close:focus,
  .ant-drawer-close:hover {
    color: #2e6089 !important;
  }

  .purchase-credits-tabs .ant-tabs-nav {
    background: #2e6089 !important;
    color: #fff;
  }

  .purchase-credits-tabs .ant-tabs-bar {
     background: #2e6089 !important;
     border-bottom: 1px solid #2e6089;
     text-align: center;
  }

  .purchase-credits-tabs .ant-tabs-ink-bar {
    background-color: #fff !important;
    height: 1px;
    bottom: 9px;
  }

  .purchase-credits-tabs .ant-tabs-nav .ant-tabs-tab-active {
    color: #fff !important;
    font-weight: 700px;
  }

  .purchase-credits-tabs .ant-tabs-nav .ant-tabs-tab:hover {
    color: #fff !important;
    font-weight: 700px;
  }

  .how-it-works-modal .ant-modal-body {
    padding: 0;
  }

  .how-it-works-modal .ant-modal-footer {
    background-color: #2D618A !important;
  }

  .plan-card .ant-card-head-title {
    color: #fff !important;
    font-size: 14px;
    padding: 14px 0;
  }

  .plan-card .ant-card-head {
    height: 20px;
  }

  .enough-to-reach-out {
    color: #333333;
    font-family: "PingFang SC";
    font-size: 14px;
    font-weight: 500;
    }

  .listDD {
    display: inline-grid;
    min-width: 100px;

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

  .create-dropdown {
    display: grid;
    width: 100%;

    input {
      border: 1px solid #dcdcdc;
      height: 35px;
      margin-bottom: 5px;
      padding-left: 10px;
    }

    label {
      font-size: 12px;
    }

    .divider {
      border-top: 1px solid #dcdcdc;
      padding: 10px;
    }

    .create2 {
      width: 95px;
      height: 28px !important;
      padding: 0px;
      float: right;
      font-size: 12px;
      background-color: #337ab7;
      color: white;
      border-radius: 2px !important;

      &:disabled {
        background-color: #ECECEC !important;
        border: none !important;
        cursor: not-allowed;

        span {
          color: #CACACA !important;
        }

        i {
          color: #CACACA !important;
        }
      }
    }
  }

  .dropdown {

    ul {
      list-style-type: none;
      padding-left: 0px;
      margin-bottom: 5px;
      max-height: 200px;
      overflow-y: auto;

      li {
        cursor: pointer;
        padding: 5px 15px;
      }

      li:hover {
        background-color: #D4EDF6;
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

    .create {
      width: 75px;
      height: 22px !important;
      padding: 0px;
      font-size: 12px;
      background-color: #337ab7;
      color: white;
      border-radius: 2px !important;
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

    .cancel {
      background-color: white;
      color: #444444;
      width: fit-content;
      height: 20px !important;
      padding: 0px;
      margin-left: 20px;
      margin-bottom: 5px;
      font-size: 12px;
    }

    .create2 {
      width: 75px;
      height: 22px !important;
      padding: 0px;
      float: right;
      margin-right: 20px;
      font-size: 12px;
      background-color: #337ab7;
      color: white;
      border-radius: 2px !important;

      &:disabled {
        cursor: not-allowed;
      }
    }

    input {
      width: 100%;
      border-bottom: 1px solid #ececec;
      margin-bottom: 10px;
      text-align: center;

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  .list-dd {
    min-width: 190px !important;
    width: 290px;
  }

  .ul-lists {
    max-height: 200px;
    overflow-y: auto;
  }

  
  .ant-radio-wrapper {
    span {
      font-size: 12px;
    }
  }
  .create-ul-lists {
    padding-left: 5px;
    padding-bottom: 10px;
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
    overflow-x: auto;
  }

  .ant-radio-inner { 
    border-radius: 100px !important; 
  } 
`;
