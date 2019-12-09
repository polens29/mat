/**
 *
 * ConfirmTopUp
 *
 */
/* eslint-disable camelcase, jsx-a11y/href-no-hash, jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import {
  Icon, Card, Spin, Row, Col,
} from 'antd';

import PaypalIcon from 'assets/paypal.png';
import BankTransferText from 'assets/bank-transfer.png';
import BankTransferLogo from 'assets/bank-transfer-logo.png';
import VisaLogo from 'assets/visa.png';
import AmexLogo from 'assets/amex.png';
import MasterCardLogo from 'assets/mastercard.png';
import { Wrapper, WrapperButton, Title, Img } from '../css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

// eslint-disable-next-line react/prefer-stateless-function
class ConfirmTopUp extends React.PureComponent {

  render() {
    const {
      value,
      topUpPricingCost,
      handleTopUp,
      topUpLoading,
      handleBankTransfer,
      handleTopUpCheckout,
      checkoutLoading,
      } = this.props;
    const { cost, pricing } = topUpPricingCost;
    return (
      <Wrapper>
        <Title>
          <span style={{ color: '#444444', fontSize: '16px', fontWeight: 400 }}>Confirm your purchase of credits</span>
        </Title>

        <Card
          style={{
            backgroundColor: '#F6F6F6',
            marginTop: 30,
            marginBottom: 30,
            borderRadius: 1,
            fontSize: 16,
            color: '#444444',
          }}
          bodyStyle={{  paddingLeft: 50, paddingRight: 50 }}
        >
          <Row style={{ marginBottom: 30 }}>
            <Col span={12}>
              <div style={{ textAlign: 'left' }}>
                Plan
              </div>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: 'right' }}>
                Price
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: 30 }}>
            <Col span={12}>
              <div style={{ textAlign: 'left' }}>
                One Time ({value} credits)
              </div>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: 'right' }}>
                {cost.toLocaleString()} USD
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: 30 }}>
            <Col span={24}>
              <div style={{ textAlign: 'left' }}>
                (Save {pricing.discount}%)
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: 30 }}>
            <Col span={24}>
              <div style={{ textAlign: 'right', fontSize: 16 }}>
                <span style={{ marginRight: 80 }}>
                  Total
               </span>
                {cost.toLocaleString()} USD
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div style={{ textAlign: 'right', fontSize: 16 }}>
                 (GST Included)
              </div>
            </Col>
          </Row>
        </Card>
        <div style={{ textAlign: 'center', color: '#444444', fontSize: 16, fontWeight: 500, marginBottom: 30 }}>
          Select your payment method
        </div>

        <Card
          style={{
            textAlign: 'center',
            width: '80%',
            margin: '0 auto',
            backgroundColor: '#F6F6F6',
            marginBottom: 20,
            borderRadius: 1,
          }}
          bodyStyle={{  padding: 30 }}
        >
          <WrapperButton onClick={handleTopUpCheckout} style={{ marginBottom: 20 }}>
            {
              checkoutLoading && <Spin indicator={antIcon} style={{ float: "left" }}/>
            }
            <span style={{ padding: 5 }}>
              <Img src={VisaLogo} style={{ marginRight: 5 }} />
              <Img src={MasterCardLogo} style={{ marginRight: 5 }} />
              <Img src={AmexLogo} />
            </span>
          </WrapperButton>
          <WrapperButton onClick={handleTopUp} style={{ marginBottom: 20 }}>
            {
              topUpLoading && <Spin indicator={antIcon} style={{ float: "left" }}/>
            }
            <span style={{ padding: 5 }}>
              <Img src={PaypalIcon} />
            </span>
          </WrapperButton>
          <WrapperButton onClick={() => handleBankTransfer(5)}>
            <span style={{ padding: 5 }}>
              <Img src={BankTransferLogo} style={{ marginRight: 10 }} />
              <Img src={BankTransferText} style={{ height: 12 }} />
            </span>
          </WrapperButton>
        </Card>
      </Wrapper>
    );
  }

}

ConfirmTopUp.propTypes = {
  value: PropTypes.number,
  topUpLoading: PropTypes.bool,
  handleTopUp: PropTypes.func,
  handleBankTransfer: PropTypes.func,
  topUpPricingCost: PropTypes.object,
  handleTopUpCheckout: PropTypes.func,
  checkoutLoading: PropTypes.bool,
};

export default ConfirmTopUp;
