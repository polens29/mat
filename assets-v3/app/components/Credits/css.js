import styled from 'styled-components';
import theme from 'styles/theme';
import { Button, Input, Table } from "antd";

export const CreditsWrapper = styled.div`
  display: inline-block;

  button {
    top: -12px;
    border-radius: 4px !important;
    background-color: #1890FF;
    color: white;
    height: 30px !important;
    width: 180px;
    padding: 0px;

    span {
      font-size: 14px;
      vertical-align: middle;
    }

    i {
      font-size: 20px;
      color: white;
      vertical-align: middle;
      margin-left: 5px;
    }

    &:hover {
      top: -12px;
      border-radius: 4px !important;
      background-color: #1890FF;
      color: white;
      height: 30px !important;
      width: 180px;
      padding: 0px;

      span {
        font-size: 14px;
        vertical-align: middle;
      }

      i {
        font-size: 20px;
        color: white;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
  .credit-icon {
    font-size: 14px;
    color: #b2d1e5;
    margin-left: 7px;
    position: relative;
    top: -8px;
    background-color: #2B90FF;
    padding: 5px;
    border-radius: 2px;
  }
  .purchase-credits-btn {
    margin-left: 15px;
    top: -11px;
    border-radius: 2px !important;
    height: 28px;
    font-size: 12px;
    font-weight: 500;

    i{
      color: white;
    }
  }

  table .ant-table-tbody > tr > td,
  table .ant-table-thead > tr > th {
    padding: 12px !important;
  }
  
  .next-btn {
    padding: 20px
    top: -11px;
    border-radius: 2px !important;
    height: 40px;
    width: 180px;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const TableWrapper = styled.div`
  margin-top: 10px;

  .ant-table-tbody > tr > td,
  .ant-table-thead > tr > th {
    padding: 8px 10px !important;
  }
`;

export const PlanWrapper = styled.div`
  text-align: center;

  .ant-radio-inner {
    border-radius: 50% !important;
  }

  .plan-block .plan-radio, .plan-block .plan-details {
    float: none;
    display: inline-block;
    vertical-align: top;  
  }

  .plan-details {
    margin-left: 15px;
  }

  .plan-radio {
    margin-top: 8px;
  }

  .plan-name {
    color: #333333;
    font-weight: 500;
    margin-bottom: 15px;
  }

  .plan-price {
    color: #333333;
    font-size: 16px;
    line-height: 20px;
  }

  .plan-interval {
    color: #333333;
    font-size: 12px;
    margin-bottom: 3px;
  }
  
  .plan-save {
    font-size: 18px;
    color: #09A440;
  }

  .plan-credits {
    font-size: 12px;
    color: #333333;
    margin-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
  }
  
`;

export const Features = styled.div`
  font-size: 12px;
  margin-bottom: 20px;
  color: #333333;
`;

export const TabsWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  height: 600px;
  overflow: auto;
`;

export const TableTitle = styled.div`
  text-align: left;
  margin-bottom: 30px;
  color: #333333;
  font-size: 20px;
  font-family: "PingFang SC";	
  font-weight: 600;	
  line-height: 28px;
`;

export const StyledButton = styled(Button)`
  border-radius: 3px !important;
  width: 180px !important;
  height: 35px !important;
`;

export const FlexibleButton = styled(Button)`
  border-radius: 3px !important;
`;

export const SwitchPlanWrapper = styled.div`
  text-align: center;
  padding-bottom: 20px;
`;

export const BillingButton = styled(Button)`
  border-radius: 2px !important;
  background-color: #2e6089;
  color: #fff;
`;

export const ChangePlanButton = styled(Button)`
  border-radius: 3px !important;
  height: 30px !important;
  width: 150px !important;
`;

export const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 5px;

  .table {
    border: 1px solid #aaa;
  }
  .col-left {
    text-align: 'left'
    border: 1px solid #aaa;
    font-weight: bold;
    font-size: 14px;
    padding: 10px;
  }
  
  .col-right {
    text-align: 'left'
    border: 1px solid #aaa;
    font-size: 14px;
    padding: 10px;
  }

  .calender-card {
    position: relative;
    text-align: center;
  }

  .calender-card-text {
    position: absolute;
    top: 70%;
    left: 55%;
    transform: translate(-70%, -55%);
  }
`;

export const Title = styled.div`
  text-align: left;
  margin-bottom: 10px;
`;

export const WrapperButton = styled.div`
  text-align: center;
  width: 95%;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #EEEEEE;
  border-radius: 3px;
  padding: 15px;
`;

export const Img = styled.img`
  height: 24px;
`;

export const InputCredit = styled(Input)`
  border-radius: 3px !important;
  border: 2px solid #979797 !important;
  width: 164px;
  height: 42px;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const InputPromoCode = styled(Input)`
  border-radius: 3px !important;
  border: 1px solid #979797 !important;
  width: 170px;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const StyledTable = styled(Table)`
  border: 2px solid #979797 !important;
  border-radius: 3px !important;
  margin-bottom: 50px;
`;

export const CreditsTableWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px
  
  .table {
    text-align: center;
    font-size: 10px;
    table-layout: fixed ;
    width: 100% ;
  }

  .table td {
    border: 1px solid #979797;
    padding: 10px;
    width: 33% ;
  }

  .white-color {
    color: #FFF;
    font-weight: 400;
    background-color: #2e6089;
  }
`;

export const DiscountTable = styled(Table)`
  border: 1px solid #979797 !important;
  border-radius: 3px !important;
  margin-bottom: 10px;
  width: 600px;
`;
